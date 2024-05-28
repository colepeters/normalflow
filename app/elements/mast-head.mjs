export default function Masthead({ html }) {
  return html`
    <style>
      h1 {
        letter-spacing: normal;
      }

      a {
        border-color: var(--dark-fade);
      }

      @media (prefers-color-scheme: dark) {
        a {
          border-color: var(--light-fade);
        }
      }
    </style>
    <h1 class="text-center font-normal text0 mbs-none">
      <a href="/" class="no-underline uppercase tracking3 pbe-1 mbe-1 inline-block border-be1 border-solid">Normal ・ Flow</a>
      <span class="block italic text-1">Dispatches on design &amp; engineering</span>
    </h1>
  `
}
