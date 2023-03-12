export default function Posts ({ html, state }) {
  const { store } = state
  const { post } = store
  const { frontmatter } = post
  const { date, title, canonicalSite, canonicalUrl } = frontmatter

  const canonicalLink = canonicalSite
    ? `<p class='canonical text-center italic'>Originally published on <a href='${canonicalUrl}'>${canonicalSite}</a></p>`
    : ''

  return html`
    <style>
      h1 {
        font-weight: 400;
      }

      .post {
        gap: 1.6em;
      }

      article * {
        min-width: 0;
      }

      .canonical {
        margin-bottom: var(--space-l);
      }
    </style>
    <mast-head></mast-head>
    <article>
      <h1 class='text-center'>${title}</h1>
      <date-time class='font-bold' date='${date.toISOString()}'></date-time>
      ${canonicalLink}
      <div class='post grid grid-row'>
        ${post.html}
      </div>
    </article>
  `
}
