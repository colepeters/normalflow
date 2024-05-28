const { join, extname } = require('path')
const { brotliCompressSync } = require('zlib')
const base = join(__dirname, '..', '..', 'app', 'posts')

function getHostname() {
  return process.env.SITE_URL ? process.env.SITE_URL : 'http://localhost:3333'
}

async function generate() {
  const { readdir, readFile, writeFile } = require('fs/promises')
  const { Feed } = await import('feed')
  const { Arcdown } = await import('arcdown')

  const arcdown = new Arcdown({})

  const posts = await readdir(base)

  const hostname = getHostname()

  async function render(path) {
    const file = await readFile(`${base}/${path}`, 'utf8')
    let result = await arcdown.render(file)
    return { content: result.html, frontmatter: result.frontmatter }
  }

  async function getData(pathName) {
    const { content, frontmatter } = await render(pathName)
    const filename = pathName.substring(
      0,
      pathName.length - extname(pathName).length
    )
    return {
      href: `${filename}`,
      content,
      frontmatter,
    }
  }

  const items = (
    await Promise.all( // eslint-disable-line
      posts
        .sort((a, b) => (a.post < b.post ? 1 : -1))
        .map(async (post) => await getData(post))
    ).catch(function(err) {
      console.log('ERROR!', err.message); // some coding error in handling happened
    })
  )

  const feed = new Feed({
    title: 'Normal Flow',
    description: 'Dispatches on design & engineering',
    id: hostname,
    link: hostname,
    language: 'en',
    copyright: `All rights reserved ${new Date().getFullYear()}, Cole Peters`,
    generator: hostname + ' via Feed for Node.js',
    author: {
      name: 'Cole Peters',
      link: hostname,
    },
  })

  for (const post of items) {
    feed.addItem({
      title: post.frontmatter.title,
      id: `${hostname}/posts/${post.href}`,
      link: `${hostname}/posts/${post.href}`,
      description: post.frontmatter.description,
      content: post.content,
      date: new Date(post.frontmatter.date),
    })
  }

  let feedXml = feed.rss2()
  let rssFeed = join(__dirname, '..', '..', 'app', 'api', 'rss.xml')
  await writeFile(rssFeed, feedXml)
  let rssBrotli = join(__dirname, '..', '..', 'app', 'api', 'rss.br')
  await writeFile(rssBrotli, Buffer.from(brotliCompressSync(feedXml)).toString('base64'))
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
  (async function() {
    try {
      generate()
    }
    catch (err) {
      console.log(err)
    }
  })()
}
