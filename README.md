# Pager Task

This is a simple implementation of Pager for recruitment Task.

I tried to keep things concise and show pure skill and good practices. I also tried not to over-engineer stuff (hence, I did not use Redux, for example). If this demo is not good enough as a showcase of my skills, I'll gladly add a few elements, though ;)

## Changes in the pager, compared to task

Compared to the task at hand, as I was implementing a bit more complicated structure, I moved some of the properties to parent component:

- Paging does not know how many elements are out there for each page. That's Pager responsibility
- onChange is not emitted from the topmost component. Instead, it's used inside to navigate through mock data

## Design choices

### Why Typescript?

I chose Typescript I work with it on a daily basis and it's already natively supported by Create React App and by React community, so I find it rather stable and better for development purposes :)

It posed some challenges with CodeSandbox, however, hence - I post my solution as zipped repo **AND** CodeSandbox solution

### Why Jest?

I think it's natural fit for React app. I also find all of its features really useful - it's somewhat all-in-one solution for testing - it runs in parallel and is blazingly fast, has isolated sandboxes, amazing matchers, snapshots and last but not least: jest functions

Underneath it's still good old Jasmine ;)

### Why not SCSS?

I didn't want to overcomplicate the app. SCSS is still not default part of Create React App and there's good explanation for that - well-componentized app does not need composable styles as much as big monolithic onse.

I still tried to use good practices - ordering CSS mostly as in CSSLint, using BEM for component structure and modificators etc.

### Why numbering pages from 0?

I decided to use page numberins as in natural Array ordering in JS. As users expect to see 1-based indexes, I map these numbers to UI-visible values.

The only caveat would be using it with routing - it'd either complicate reverse routing a bit or introduce confusion (as user would save URL, seeing `page: 0` for the first page etc.)

### Why not Redux?

I personally love Redux for both core idea and ease of state management and introduced it to my personal and professionally written apps multiple times (oh, and these amazing dev tools are worth mentioning as well!), but... [I really don't need it yet](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367).

I pesonally think that introducing Redux part-by-part to any existing app is not a hard task to do, hence - I decided not to include it.

### What about async data?

If I were to build a bigger app, I'd probably stick with Redux-Thunk or one of many solutions to introduce asynchronous code to Redux.

Because the app is rather small, I decided to use plain `fetch` calls, with added random delay, to simulate API communication.

### Why such component names?

I initially thought of using `index.tsx` for each component root file. I stuck with `CamelCased` component names instead, as having so many `index.tsx`-es in the App would introduce a lot of confusion for anyone using code completion like Intellisense etc.

### JSX/Typescript rules

I followed good JSX/Typescript practices, using well-defined interfaces and keeping off infamous `any` (apart from tests). A few rules introduced to `tslint.json` are mostly compromise made as the project size is not extremely big.

## Implementation

The app structure is rather straightforward:

```
App/Index
    |
    - Pager
        |
        - (if loading) Spinner
        - (if loaded) PagerItem[]
        - (if loaded) Paging
            |
            - PagingItem[]

```

I decided to skip preparing extensive JSDoc, as TS is self-explanatory thanks for its static analysis.

### Pagination

Pagination is the component directly responsible for switching between pages and displaying current navigation state.

I decided to keep the data that UI is based upon in a separate object, leveraging Typescript types. I personally prefer to keep data as far from UI template as possible. Thanks to that separation, template is much more readable.

It does not switch pages itself, but only emits the event instead. I prefer to follow the KISS rule when designing components - therefore I delegated page management to another component - `Pager`

### Pager

This component downloads initial data and negotiates initial state of the App. Until data is present, it shows simple preloader.

Once data is obtained, it feeds state information to `Pagination` and generates set of items, based on pre-calculated offsets.

## Testing

I begun writing tests using CodeSandbox and it quickly turned out to be as painful as it gets (tests breaking out of nowhere, caching issues and finally - disappearing files...). 

I burned more than a couple of hours on just stabilizing my dev environment, which is not part of the task, so I decided to drop online platform.

Because of that, I decided to steer away from the platform and just write the code on my own machine. I present it on CS as well, but I highly recommend using standalone version.

Tests themselves should cover more than 80% of the code. Misses come mostly from mismatching source maps and the fact that transpiled code does not contain interfaces and types (that's commonly known caveat of using coverage with Typescript).

That might be easily fixed by ejecting and tinkering with source map generation in dev mode, I decided to focus on development for now, though.

## Future considerations (What did I forget? What did I skip?)

There are a few downsides of using CodeSandbox and Create React App without ejecting. If I were to eject the app and spend much more time on it, I'd take car of following:
- Prepare proper Webpack configuration based on ejected one
- Optimize bundles - icons, external libraries etc.
- Refactor some tests to be more streamlined (more on that in [Testing](##Testing)).
- Add solid linter pipeline, build pipeline etc and attach them to some CI (I personally prefer Travis for my own Open-Source projects).
