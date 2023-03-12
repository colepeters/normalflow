export default function Masthead ({ html }) {
  return html`
    <style>
      h1 {
        font-weight: 400;
        font-size: var(--text-0);
        letter-spacing: normal;
        margin-top: 0;
      }

      a {
        padding-bottom: var(--space-xs);
        margin-bottom: var(--space-xs);
        border-color: var(--dark-fade);
      }

      span {
        font-size: 0.8em;
      }
    </style>
    <h1 class='text-center'>
      <a href='/' class='no-underline uppercase tracking3 inline-block border-b1 border-solid'>Normal ・ Flow</a>
      <span class='block italic'>Dispatches on design &amp; engineering</span>
    </h1>
  `
}
