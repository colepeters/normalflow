if (!process.env.ARC_ENV) {
  process.env.ARC_ENV = 'testing'
}
const matter = require('gray-matter');
const { join, parse } = require('path')
const base = join(__dirname, '..', '..', 'app', 'posts')

async function generate () {
  const { readdir, readFile, writeFile } = require('fs/promises')

  const files = await readdir(base)
  const posts = files.filter(filename => !filename.startsWith('.'))

  async function render (path) {
    const file = await readFile(join(base, path), 'utf8')
    const result = matter(file)
    return result.data
  }

  async function getData (filePath) {
    const frontmatter = await render(filePath)
    return {
      href: `/posts/${parse(filePath).name}`,
      frontmatter
    }
  }

  const cards = []
  for (let path of posts) {
    let card = await getData(path)
    cards.push(card)
  }

  let postsJson = join(__dirname, '..', '..', 'app', 'api', 'posts.json')
  await writeFile(postsJson, JSON.stringify(cards, null, 2))
}

module.exports = {
  sandbox: {
    start: generate,
    watcher: async (params) => {
      let { filename } = params
      if (!filename.includes(base) || !filename.endsWith('.md')) {
        return
      }
      await generate(params)
    }
  }
}

if (require.main === module) {
  (async function () {
    try {
      generate()
    }
    catch (err) {
      console.log(err)
    }
  })()
}
