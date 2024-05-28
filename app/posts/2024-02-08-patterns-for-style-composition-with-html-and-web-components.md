---
title: Patterns for Style Composition with HTML and Web Components 
date: 2024-02-08
excerpt: "A detailed documentation of how I approach the challenges of design engineering"
---

Back in 2016, Brent Jackson wrote an article that greatly informed my approach to authoring UI components for the web, entitled [Patterns for Style Composition in React](https://jxnblk.com/blog/patterns-for-style-composition-in-react/). Jackson — along with [Kristofer Joseph](https://kristoferjoseph.com/) and [Adam Morse](https://mrmrs.cc/) — was among a small group of folks who brought [the functional CSS paradigm](https://normalflow.pub/posts/2023-01-10-past-informs-the-present-begins-approach-to-css) to the masses, and he was also the author of several React centric styling libraries like [Styled System](https://github.com/styled-system/styled-system), which I used liberally during my days of authoring React apps.

The web has come a long way since 2016, though, and my practices for styling UI components are a fair bit different than they were back then, too. Meanwhile, many of the underlying principles have remained the same. With this in mind, I thought it’d be a good exercise to formally document the approaches and patterns I use today when styling web pages and UI components.

These approaches and patterns are ones I’ve used both on personal sites and in professional production environments. I hope they serve you well, or at the very least, give you an alternative and battle tested perspective on how to approach design engineering challenges on the web.

## Establishing objectives

Before we dive in, I want to establish what objectives these approaches and patterns are designed to solve for. If you find these objectives aren’t met after trying things out for yourself, you should absolutely feel free to modify or disregard these approaches and patterns. In my experience however, these objectives and outcomes have been very well aligned using the techniques we’ll discuss.

### First objective: performance

Everything we do as engineers on the web must first and foremost solve a problem or provide meaning and value to a user. Design engineering is the craft of writing code in the service of design, and design is a means of servicing a user’s needs via a positive outcome. One of the most important metrics to consider in our work is that of time: specifically, the time it takes for a user to reach a positive outcome. Therefore, as design engineers, our code should be highly performant. It should both reach the user quickly (via small sizes when sent over the wire) and execute quickly (with a minimum of render blocking time or other delays between code evaluation and completion).

### Second objective: resiliency

We often talk about ‘stability’ in software engineering, but in my work, I’ve found it more helpful to talk about ‘resiliency.’ Design is a frequent subject of iteration, whether via aesthetics, function, or code. Brand language evolves or is reinvented, products grow or fragment, interfaces are refined and reorganized. In all of these situations, the nature of a given design is changing in terms of both ‘what’ and ‘how’ — therefore, the code responsible for design needs to be more resilient than stable. That is, our code should be amenable to substantial changes in requirements such that implementing the desired modifications is possible with a minimum of friction while still achieving the desired outcome. Additionally, the degree to which our code is resilient also has impacts on our first objective (performance) and our third objective (versatility).

### Third objective: versatility

In this case, I define versatility as the degree to which our code permits us to explore a broad combinatory space of design parameters and values. Versatile code for design means we have lots of room to iterate on designs without having to write much (if any) new CSS. Versatile code for design will thus inherently be structured in a parametric fashion, while also heeding the demands of performance and resiliency. (For a deeper dive on parametric design code, [check out this article of mine on this very subject](/posts/2022-08-12-an-introduction-to-constraint-based-design-systems).)

With these objectives in mind, let’s start exploring patterns for style composition.

## Parametric global styles via single responsibility classes

I could’ve typed the headline for this section as ‘atomic CSS’ or ‘functional CSS’ or ‘utility CSS’, but in 2024, these terms can mean different things to different people, and I want the focus here to be on rationale and outcome, not specific tools. (Some, like me, might think of tools like [Tachyons](https://tachyons.io/). Others, especially those more recent to design engineering, might think of [Tailwind](https://tailwindcss.com). I don’t care for Tailwind, but I do believe Tachyons and the philosophy behind it was and remains an excellent example of writing CSS that is performant, resilient, and versatile.)

The use of parametric global styles via single responsibility classes has been the backbone of my approach to writing code for design since roughly 2015 (and the technique has been around since before that time). For those who may be unfamiliar with this approach, it can be visualized in brief with the following snippets of CSS and HTML:

```css
.mi-auto   { margin-inline: auto; }
.p0        { padding: var(--space-0); }
.font-bold { font-weight: bold; }
.tracking1 { letter-spacing: var(--tracking-1); }
.uppercase { text-transform: uppercase; }
```

```html
<button class="mi-auto p0 font-bold tracking1 uppercase">
  I'm a button with tracked out uppercase text
</button>
```

I won’t be defending or throughly explaining this sort of CSS architecture or philosophy in this post — if you’d like to read such an article, you can [do so here](https://normalflow.pub/posts/2023-01-10-past-informs-the-present-begins-approach-to-css). However, I do want go over why using single responsibility classes satisfies the objectives I’ve outlined.

First, single responsibility classes are incredibly versatile. They are traditionally generated from a styleguide ([see how this works with Enhance Styles](https://github.com/enhance-dev/enhance-styles#readme), for example) which will define important parameters such as font families, type scales, space scales, individual colour swatches or colour scales, and so forth. From this styleguide, we generate single responsibility classes for the resulting combinatory space, for example classes for setting padding in each direction for each step in our spacing scale. As a result, we end up with a very well defined, parametric space of composable styles that can be used on any page or component in our site or application. This leads to incredible versatility without needing to write any new CSS (at least as far as global styles are concerned). We can iterate on designs easily in the browser, swapping out margins, padding, colours, typographic and spacing decisions, and more, without ever touching a stylesheet. In my book, this level of versatility is pretty tough to beat.

This approach also lends itself well to resiliency. If our brand language evolves, that evolution becomes codified in our styleguide, which in turn updates our generated CSS classes. Our entire suite of global styles can be iterated on via a single point of entry. True, the various compositions of our classes may change in tandem with designs, but that process is in my experience rarely as or more painful than the alternative of writing new CSS rulesets and migrating old code towards them. (We recently overhauled the design language for [Begin](https://begin.com); as a result, I had to update the design language of [our blog](https://begin.com/blog) to match. The changes I needed to file were largely limited to find and replace operations on class names or compositions, and I spent perhaps an hour or so doing that. Not bad, right?)

Lastly, single responsibility CSS classes are phenomenal when it comes to performance. Given that our global styles are defined out of the gate and used liberally across our pages and components, our baseline CSS bundle size rarely fluctuates much. Furthermore, the level of repetition in the resultant stylesheets leads to incredible results when applying compression over the wire. For example, the entirety of our [Enhance Styles library](https://enhance.dev/docs/enhance-styles/) usually comes in at around 60kb on disk and only 9kb over the wire. As I’ve configured it for this blog (which admittedly is minimal in its design), the Enhance Styles bundle comes in at 4kb over the wire. These kinds of results aren’t limited to Enhance Styles, either — Tachyons’ minified bundle comes in at just under 14kb.

### Composing single responsibility classes

A common complaint levelled at the use of single responsibility classes is that it can be tiresome to repeatedly declare lengthy compositions of classes on HTML elements. For example, writing out the following markup every time you want to use an H1 could be considered annoying and error prone:

```html
<h1 class="text5 leading1 font-bold tracking-2 mbs2 mbe-1">
  On the Nature of Headings
</h1>
```

This is where the use of templates comes in handy. By stashing this composition away in a reusable piece of markup, we can leverage the benefits of this approach to styling without worrying about making mistakes or having to remember specific compositions of classes.

My favourite way to do this is using a library like [Enhance](https://enhance.dev) (which, disclaimer, I work on) to create [reusable custom elements](https://enhance.dev/docs/elements/). This technique would also work well for those writing [Web Components from scratch](https://developer.mozilla.org/en-US/docs/Web/API/Web_components).

For example, using Enhance:

```javascript
// app/elements/my-h1.mjs

export default function MyH1 ({ html }) {
  return html`
    <h1 class="text5 leading1 font-bold tracking-2 mbs2 mbe-1">
      <slot></slot>
    </h1>
  `
}
```

In the above example, [the `<slot>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) is used in our custom element definition to mark where the custom element’s instance content should be placed. (Note that Enhance will render that content to the light DOM during [server side custom element expansion](https://enhance.dev/docs/elements/html/), and not the shadow DOM.)

Now that we’ve defined a custom element with our composition of styles, we can use it anywhere else in our app without having to memorize that composition:

```html
<!-- app/pages/index.html -->

<my-h1>
  On the Nature of Headings
</my-h1>

<!-- app/pages/about.html -->

<my-h1>
  About My Headings
</my-h1>
```

We can also create custom elements that compose other custom elements as well as styled generic elements, thus leveraging this pattern recursively:

```javascript
export default function HeroBanner ({ html }) {
  return html`
    <section class="p4 text-center">
      <my-h1>
        Hello World!
      </my-h1>
      <p class="text1 font-semibold">
        Isn’t this just lovely?
      </p>
      <my-button>
        Get started
      </my-button>
    </section>
  `
}
```

In this example (and those that follow), the implementation details specific to Enhance aren’t so important as the concept itself — that is, compositions of global styles being stashed away in reusable custom elements (or ‘components’, if you prefer).

## Scoped custom element styles

Not every design in a website or app can be engineered using reusable, global styles. Sometimes we need something a little more bespoke. And that’s just fine — we have other techniques at our disposal that can and should be used!

In these instances, we can rely on global styles where possible (to avoid adding new CSS for styles that are already defined, and to leverage the consistency afforded by them), and then supplement those with our styles that are pertinent just to the element at hand.

Again, using Enhance, that would look like this:

```html
<my-button>
  <svg slot="icon">
    <use href="#icon-save"></use>
  </svg>
  <span slot="label">Save</span>
</my-button>
```

```javascript
export default function MyButton ({ html }) {
  return html`
    <style>
      button {
        background-color: var(--blue-600);
        color: white;
      }
      
      button:hover {
        background-color: var(--blue-800);
      }
      
      button:focus-visible {
        outline-offset: 0.125em;
      }
      
      [slot="icon"] {
        flex-shrink: 0;
        max-block-size: 1em;
        inline-size: auto;
      }
    </style>
    <button class="inline-flex align-items-center gap0 pi-2 pb-4 radius-pill">
      <slot name="icon"></slot>
      <slot name="label"></slot>
    </button>
  `
}
```

(In the example above, I’m relying on Enhance’s [scoped element styles](https://enhance.dev/docs/enhance-styles/element-styles) feature to automatically scope those button styles to the `my-button` custom element. Without this feature, using `my-button button` and `my-button [slot=“icon"]` element selectors — which is what Enhance’s style transform emits in this case — would accomplish the same scope constraint.)

You can see here that for use cases like pseudoclasses (`:hover`, `:focus-visible`), content derived named selectors (`[slot=“icon”]`), and implementation specific values (`outline-offset: 0.125em`, `max-block-size: 1em`), I’ve opted to use CSS rulesets directly rather than authoring single responsibility classes that are unlikely to be reused (and whose values are highly specific to the component in question). This mixing of single responsibility classes and bespoke rulesets is perfectly fine, and in fact something I’d encourage.

How does this approach line up with our objectives?

In terms of performance, the reuse of the already included global styles offers the advantage of not having to rewrite those styles for each component that uses them, and thus keeps our CSS bundle size small. This also limits the amount of new, bespoke CSS we need to write for any given component.

Resiliency is addressed here by keeping the surface area for each set of bespoke styles as small as possible, in addition to colocating them with the markup of the element. The use of custom properties generated by our styleguide (which also generates the single responsibility classes) also helps here — changing the definition of those properties will thus update the relevant component styles as well. Additionally, because these bespoke styles are scoped to the custom element itself, changes to other custom elements’ styles won’t spill into this one.

In terms of versatility, our only limitation with these bespoke styles is the scope of CSS itself. Obviously, we want to keep these styles in check to aid both performance and resiliency, but our options are practically limitless. We can, however, put some sensible limitations in place by sticking to styles that use custom properties defined via our styleguide whenever possible.

## That’s it

These two patterns make up the bulk of the approach I’ve taken to styling every single web project I’ve touched for the past year of my work, and a large share of my work going back to 2015. While certain aspects of their implementation (such as using Enhance element styles) may be newer, the strategies behind this approach has remained basically unchanged in that time, and thus can be applied to a breadth of tech stacks and tool chains.

These approaches may appear to some to be simple. Indeed, they are. There’s very little in the way of complex methodology or gnarly implementation details, and essentially no requirement in terms of tooling (provided your tooling allows you to write markup and rulesets). This is absolutely intentional. In design engineering, the more flexible and close to the web platform a pattern is, the greater its utility and longevity. This approach has worked exceptionally well for me (and the end users my work has served) for nearly a decade now, and to me, this speaks volumes.

Having said that, I’m not interested in proselytizing or spreading dogma. The approaches I’ve gone over here may be based in science — that is: hypothesis, experimentation, and validation backed by data — but I’m not suggesting this is the only way to do design engineering. There may be cases (such as a simple landing page, or a basic blog layout) where this approach is more than is needed for the task at hand.

However, when authoring projects that exceed a trivial level of complexity, and especially when working within teams, I’ve encountered a lot of success with working this way (providing these methodologies are embraced within said teams).

If you have questions or feedback on any of this, I’d be happy to hear it. Feel free to [connect with me on Mastodon](https://mastodon.online/@colepeters).
