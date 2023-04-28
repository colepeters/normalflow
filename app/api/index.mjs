import url from 'node:url'
import { dirname, join } from 'node:path'
import { readFileSync } from 'node:fs'

export async function get () {
  const here = dirname(url.fileURLToPath(import.meta.url))
  const base = join(here, 'posts.json')
  const posts = JSON.parse(readFileSync(base, 'utf-8')).reverse()

  const hCardPath = join(here, 'h-card.json')
  const hCard = JSON.parse(readFileSync(hCardPath, 'utf-8'))

  return {
    json: {
      title: 'Normal Flow — Dispatches on design & engineering',
      posts,
      hCard,
    }
  }
}
