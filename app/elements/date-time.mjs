export default function DateTime ({ html, state }) {
  const { attrs } = state
  const { date } = attrs

  const timeIndex = date.indexOf('T')
  const formattedDate = `${date.substring(0, timeIndex).replaceAll('-', '/')}`

  return html`
    <style>
      :host {
        display: block;
        margin-bottom: var(--space-l);
      }
    </style>
    <p class='text-center'>
      <time datetime='${date}' class='dt-published'>
        ${formattedDate}
      </time>
    </p>
  `
}
