import url from 'node:url'
import { Arcdown } from 'arcdown'
import { URL } from 'url'
import { dirname, join } from 'node:path'
import { readFileSync } from 'node:fs'

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

  const here = dirname(url.fileURLToPath(import.meta.url))
  const hCardPath = join(here, '..', 'h-card.json')
  const hCard = JSON.parse(readFileSync(hCardPath, 'utf-8'))

  return {
    json: {
      post,
      hCard,
    }
  }
}
