export default function Index ({ html, state }) {
  const { store } = state
  const { posts } = store

  const postsMarkup = posts.map(post =>
    `<post-link date='${post.frontmatter.date}' href='${post.href}'>${post.frontmatter.title}</post-link>`
  ).join('')

  return html`
    <style>
      section {
        margin-block: var(--space-3xl);
        gap: var(--space-3xl);
      }

      .colophon {
        font-size: var(--text--1);
      }
    </style>

    <mast-head id='#'></mast-head>

    <a href='/colophon' class='colophon block uppercase tracking3 text-center'>
      Colophon
    </a>

    <section class='grid grid-row'>
      ${postsMarkup}
    </section>

    <index-footer></index-footer>
  `
}
