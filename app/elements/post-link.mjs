export default function PostLink({ html, state }) {
  const { attrs } = state
  const { date, href } = attrs

  return html`
    <style>
      a {
        text-decoration: underline;
        text-decoration-style: single;
        text-decoration-thickness: 1px;
      }
    </style>
    <article>
      <date-time date="${date}" class="tracking3 text-1"></date-time>
      <h2 class="text-center text4 font-normal mbs0 mbe-none">
        <a href="${href}">
          <slot></slot>
        </a>
      </h2>
    </article>
  `
}
