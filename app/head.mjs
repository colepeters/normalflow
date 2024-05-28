import { getLinkTag } from '@enhance/arc-plugin-styles/get-styles'

export default function Head(state) {
  const { store } = state
  const { post } = store

  const title = post ? `${post.title} — Normal Flow` : store.title

  const canonicalMeta = post?.frontmatter.canonicalUrl
    ? `<link rel='canonical' href='${post.frontmatter.canonicalUrl}' />`
    : ''

  const descriptionMeta = post?.frontmatter.excerpt
    ? post.frontmatter.excerpt
    : 'Dispatches on design & engineering'

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="icon" href="/_public/favicon.svg">
      <meta name="image" content="/_public/normal-flow-og-img.jpg" />
      <meta name="og:image" content="/_public/normal-flow-og-img.jpg" />
      ${getLinkTag()}
      ${canonicalMeta}
      <meta name='description' content='${descriptionMeta}' />
      <title>${title}</title>
      <style>
        @font-face {
          font-family: Signifier;
          src: url('https://normalflow.s3.ca-central-1.amazonaws.com/sr.woff2') format('woff2');
          font-weight: 400;
        }

        @font-face {
          font-family: Signifier;
          src: url('https://normalflow.s3.ca-central-1.amazonaws.com/sri.woff2') format('woff2');
          font-weight: 400;
          font-style: italic;
        }

        @font-face {
          font-family: Signifier;
          src: url('https://normalflow.s3.ca-central-1.amazonaws.com/sb.woff2') format('woff2');
          font-weight: 700;
        }

        @font-face {
          font-family: Signifier;
          src: url('https://normalflow.s3.ca-central-1.amazonaws.com/sbi.woff2') format('woff2');
          font-weight: 700;
          font-style: italic;
        }

        html, body {
          font-family: Signifier, Georgia, Times New Roman, serif;
          color: var(--dark);
          background: var(--light);
        }

        body {
          font-feature-settings: "clig", "kern", "liga", "onum", "pnum", "ss01";
          max-width: 74ch;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        h1, h2, h3, h4, h5, h6 {
          font-weight: 700;
          letter-spacing: -0.0375em;
          line-height: 1.25;
        }

        h1 {
          font-size: var(--text-4);
          font-weight: 400;
          margin-block: var(--space-7);
        }

        h2 {
          font-size: var(--text-3);
          margin-block-start: var(--space-4);
        }

        h3 {
          font-size: var(--text-2);
          margin-block-start: var(--space-3);
        }

        ul,
        ol,
        dl {
          list-style-position: outside;
          padding-inline-start: var(--space-3);
        }

        ul li::marker {
          content: "·  ";
        }

        dt {
          font-weight: 700;
        }

        [role='table'] {
          font-size: 0.8em;
        }

        .thead {
          background: var(--dark);
          color: var(--light);
          padding: var(--space-0);
        }

        .tbody {
          border: 2px solid var(--dark);
          padding: var(--space-0);
        }

        @media (prefers-color-scheme: dark) {
          .thead {
            background: var(--light);
            color: var(--dark);
          }

          .tbody {
            border-color: var(--light);
          }
        }

        a {
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 2px;
        }

        figcaption {
          font-style: italic;
          font-size: 0.9em;
          padding-block: var(--space-2);
        }

        pre {
          border: 2px double var(--dark);
          padding-block: var(--space--1) var(--space-0);
          padding-inline: var(--space-0);
          overflow-x: scroll;
        }

        @media (prefers-color-scheme: dark) {
          pre {
            border-color: var(--light);
          }
        }

        code {
          font-family: 'IBM Plex Mono', 'Fira Code', 'Fira Mono', 'Source Code Pro', 'Monaco', 'Menlo', monospace;
          font-size: 0.75em;
        }

        blockquote {
          border-inline-start: 3px double var(--dark-fade);
          font-style: italic;
          padding-inline-start: var(--space-2);
          margin-block: var(--space-0);
        }

        blockquote > * + * {
          margin-block-start: var(--space-0);
        }

        img {
          border: 12px solid var(--dark-fade);
        }

        @media (prefers-color-scheme: dark) {
          html,
          body {
            background: var(--dark);
            color: var(--light);
          }

          blockquote {
            border-color: var(--light-fade);
          }

          img {
            border-color: var(--light-fade);
          }
        }

      </style>
    </head>
    <body class="text0 leading4 p2 mi-auto">
  `
}
