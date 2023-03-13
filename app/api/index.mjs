import frontmatter from 'gray-matter'
import { URL } from 'url'
import { readdirSync, readFileSync } from 'fs'

export async function get (req) {
  const { path } = req

  const dirUrl = new URL(`..${path}posts`, import.meta.url)
  const files = readdirSync(dirUrl)

  const posts = files.map(file => {
    const fileContent = readFileSync(`${dirUrl.pathname}/${file}`, 'utf-8')
    const { data } = frontmatter(fileContent)
    const slug = file.replace(/.md$/, '')
    return {
      slug,
      title: data.title,
      date: data.date,
    }
  }).sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

  return {
    json: {
      title: 'Normal Flow — Dispatches on design & engineering',
      posts,
    }
  }
}
