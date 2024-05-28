export default function Posts({ html, state }) {
  const { store } = state
  const { post } = store
  const { frontmatter } = post
  const { date, title, canonicalSite, canonicalUrl, excerpt } = frontmatter

  const canonicalLink = canonicalSite
    ? `<p class="mbe2 text-center italic">Originally published on <a href="${canonicalUrl}">${canonicalSite}</a></p>`
    : ''

  return html`
    <style>
      article * {
        min-width: 0;
      }
    </style>
    <mast-head></mast-head>
    <article class="h-entry">
      <h1 class="text-center font-normal p-name">${title}</h1>
      <date-time class="font-bold" date="${date.toISOString()}"></date-time>
      ${canonicalLink}
      <div class="grid grid-row gap2 e-content">
        ${post.html}
      </div>
      <p class="p-summary hidden">${excerpt}</p>
      <my-h-card class="hidden"></my-h-card>
    </article>
    <page-footer></page-footer>
  `
}
