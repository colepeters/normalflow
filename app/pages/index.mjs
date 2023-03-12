export default function Index ({ html, state }) {
  const { store } = state
  const { posts } = store

  const postsMarkup = posts.map(post =>
    `<post-link date='${post.date.toISOString()}' href='${post.slug}'>${post.title}</post-link>`
  ).join('')

  return html`
    <style>
      section {
        margin-block: var(--space-3xl);
        gap: var(--space-3xl);
      }
    </style>
    <mast-head></mast-head>

    <section class='grid grid-row'>
      ${postsMarkup}
    </section>
  `
}
