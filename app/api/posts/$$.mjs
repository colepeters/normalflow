import { readFileSync } from 'fs'
import { URL } from 'url'
import { Arcdown } from 'arcdown'

export async function get (req) {
  const arcdown = new Arcdown()
  const { path } = req
  const docUrl = new URL(`../..${path}.md`, import.meta.url)

  let docMarkdown
  try {
    docMarkdown = readFileSync(docUrl.pathname, 'utf-8')
  } catch(e) {
    return {
      statusCode: 404
    }
  }

  const post = await arcdown.render(docMarkdown)

  return {
    json: {
      post
    }
  }
}
