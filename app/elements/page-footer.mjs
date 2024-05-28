export default function PageFooter({ html }) {
  return html`
    <style>
      footer {
        border-top: 1px solid var(--dark-fade);
      }
    </style>
    <footer class="mb7 pbs7">
      <p class="text-center text-1">
        You’ve reached the bottom. Thanks for reading! <br />
        Care to go <a href="/">back to the front page</a>?
      </p>
    </footer>
  `
}
