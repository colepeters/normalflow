export default function IndexFooter ({ html }) {
  return html`
    <style>
      footer {
        border-top: 1px solid var(--dark-fade);
        margin-block: var(--space-3xl);
        padding-top: var(--space-3xl);
      }

      p {
        font-size: var(--text--1);
      }
    </style>
    <footer>
      <p class='text-center'>
        You’ve reached the bottom.<br />
        Care to read <a href='/colophon'>the colophon</a>?
      </p>
    </footer>
  `
}
