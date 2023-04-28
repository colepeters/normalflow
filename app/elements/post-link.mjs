export default function PostLink ({ html, state }) {
  const { attrs } = state
  const { date, href } = attrs

  return html`
    <style>
      h2 {
        font-size: var(--text-3);
        font-weight: 400;
        margin-top: var(--space-m);
        margin-bottom: 0;
      }

      a {
        text-decoration: underline;
        text-decoration-style: single;
        text-decoration-thickness: 1px;
      }

      date-time {
        font-size: var(--text--1);
      }
    </style>
    <article>
      <date-time date='${date}' class='tracking3'></date-time>
      <h2 class='text-center'>
        <a href='${href}'>
          <slot></slot>
        </a>
      </h2>
    </article>
  `
}
