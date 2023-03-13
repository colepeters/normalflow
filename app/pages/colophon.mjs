export default function Colophon({ html }) {
  return html`
    <style>
      p + p {
        margin-top: 1.6em;
      }
    </style>
    <mast-head></mast-head>
    <h1 class='text-center'>Colophon</h1>
    <p>Normal Flow is written by me, Cole Peters. I’m <a href='https://colepeters.com'>a multidisciplinary artist</a>, and a design engineer by trade. For the past 15 years, I’ve been working at the intersection of design and engineering, with an emphasis on design systems, user interfaces, and frontend architecture. This blog documents some of my experience in writing.</p>
    <p>You can also find me on <a href='https://mastodon.online/@colepeters'>Mastodon</a> and <a href='https://github.com/colepeters'>GitHub</a>.</p>
    <p>The term ‘Normal Flow’ refers to <a href='https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flow_Layout'>the algorithm</a> used to display HTML elements on a web page before any styling changes are made.</p>
    <p>This website is built with <a href='https://enhance.dev'>Enhance</a>, deployed with <a href='https://begin.com'>Begin</a>, and typeset in Signifier by <a href='https://klim.co.nz/'>Klim Type Foundry</a>.</p>
    <page-footer></page-footer>
  `
}
