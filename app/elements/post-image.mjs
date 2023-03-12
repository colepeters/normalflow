export default function PostImage ({ html, state }) {
  const { attrs } = state
  const { alt, src, loading } = attrs

  return html`
    <enhance-image
      alt='${alt}'
      src='${src}'
      loading='${loading}'
      variant1='(min-width: 64em) 1600'
      variant2='(min-width: 48em) 1200'
      defaultwidth='900'
    ></enhance-image>
  `
}
