export default function Index({ html, state }) {
  const { store } = state
  const { posts } = store

  const postsMarkup = posts.map(post =>
    `<post-link date="${post.frontmatter.date}" href="${post.href}">${post.frontmatter.title}</post-link>`
  ).join('')

  return html`
    <mast-head id="#"></mast-head>

    <a href="/colophon" class="text-1 block uppercase tracking3 text-center">
      Colophon
    </a>

    <section class="grid grid-row mb7 gap7">
      ${postsMarkup}
    </section>

    <index-footer></index-footer>
  `
}
