export default function PageFooter ({ html }) {
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
        You’ve reached the bottom. Thanks for reading! <br />
        Care to go <a href='/'>back to the front page</a>?
      </p>
    </footer>
  `
}
