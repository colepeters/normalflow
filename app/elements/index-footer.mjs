export default function IndexFooter({ html }) {
  return html`
    <style>
      footer {
        border-top: 1px solid var(--dark-fade);
      }
    </style>
    <footer class="mb7 pbs7">
      <p class="text-center text-1">
        You’ve reached the bottom.<br />
        Care to read <a href="/colophon">the colophon</a>?
      </p>
    </footer>
  `
}
