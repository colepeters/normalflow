export default function Posts ({ html, state }) {
  const { store } = state
  const { post } = store
  const { frontmatter } = post
  const { date, title, canonicalSite, canonicalUrl, excerpt } = frontmatter

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
    <article class='h-entry'>
      <h1 class='text-center p-name'>${title}</h1>
      <date-time class='font-bold' date='${date.toISOString()}'></date-time>
      ${canonicalLink}
      <div class='post grid grid-row e-content'>
        ${post.html}
      </div>
      <p class='p-summary hidden'>${excerpt}</p>
      <my-h-card class='hidden'></my-h-card>
    </article>
    <page-footer></page-footer>
  `
}
