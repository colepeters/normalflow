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
        :root {
          --text--2: clamp(0.56rem, calc(0.67rem + -0.15vw), 0.64rem);
          --text--1: clamp(0.80rem, calc(0.79rem + 0.06vw), 0.83rem);
          --text-0: clamp(1.00rem, calc(0.91rem + 0.43vw), 1.25rem);
          --text-1: clamp(1.25rem, calc(1.03rem + 1.09vw), 1.88rem);
          --text-2: clamp(1.56rem, calc(1.13rem + 2.17vw), 2.81rem);
          --text-3: clamp(1.95rem, calc(1.17rem + 3.94vw), 4.22rem);
          --text-4: clamp(2.44rem, calc(1.09rem + 6.76vw), 6.33rem);
          --text-5: clamp(3.05rem, calc(0.81rem + 11.20vw), 9.49rem);
          --space-3xs: clamp(0.25rem, calc(0.23rem + 0.11vw), 0.31rem);
          --space-2xs: clamp(0.50rem, calc(0.46rem + 0.22vw), 0.63rem);
          --space-xs: clamp(0.75rem, calc(0.68rem + 0.33vw), 0.94rem);
          --space-s: clamp(1.00rem, calc(0.91rem + 0.43vw), 1.25rem);
          --space-m: clamp(1.50rem, calc(1.37rem + 0.65vw), 1.88rem);
          --space-l: clamp(2.00rem, calc(1.83rem + 0.87vw), 2.50rem);
          --space-xl: clamp(3.00rem, calc(2.74rem + 1.30vw), 3.75rem);
          --space-2xl: clamp(4.00rem, calc(3.65rem + 1.74vw), 5.00rem);
          --space-3xl: clamp(6.00rem, calc(5.48rem + 2.61vw), 7.50rem);
        }

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
          font-size: var(--text-0);
          font-feature-settings: "clig", "kern", "liga", "onum", "pnum", "ss01";
          padding: var(--space-m);
          max-width: 74ch;
          margin-inline: auto;
        }

        h1, h2, h3, h4, h5, h6 {
          font-weight: 700;
          letter-spacing: -0.0375em;
          line-height: 1.25;
        }

        h1 {
          font-size: var(--text-3);
          font-weight: 400;
          margin-block: var(--space-3xl);
        }

        h2 {
          font-size: var(--text-2);
          margin-top: var(--space-l);
        }

        h3 {
          font-size: var(--text-1);
          margin-top: var(--space-s);
        }

        p,
        ul,
        ol,
        dl {
          line-height: 1.6;
        }

        ul,
        ol,
        dl {
          list-style-position: outside;
          padding-left: 3em;
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
          padding: 1em;
        }

        .tbody {
          border: 2px solid var(--dark);
          padding: 1em;
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
          padding-block: 1.6em;
        }

        pre {
          border: 2px double var(--dark);
          padding: 1em;
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
          border-left: 3px double var(--dark-fade);
          font-style: italic;
          padding-left: var(--space-l);
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
  `
}
