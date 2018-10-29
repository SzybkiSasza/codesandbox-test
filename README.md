# Pager Task

This is a simple implementation of Pager for recruitment Task.

I tried to keep things concise and show pure skill and good practices. I also tried not to over-engineer stuff (hence, I did not use Redux, for example). If this demo is not good enough as a showcase of my skills, I'll gladly add a few elements, though ;)

## Changes in the pager, compared to task

## Why Typescript?

If you wonder why I used TS as the main JS flavour, it's pretty simple - I work with TS on a daily basis and it's already natively supported by Create React App and by React community, so I find it rather stable and better for development purposes :)

## Why Jest?

I think it's natural fit for React app. I also find all of its features really useful - it's somewhat all-in-one solution for testing - it runs in parallel and is blazingly fast, has isolated sandboxes, amazing matchers, snapshots and last but not least: jest functions

Underneath it's still good old Jasmine ;)

## Why not SCSS?

point about SCSS. Mention also classNames

## Why numbering pages from 0?

## What about async data?

Redux Thunk at least, but without redux - just simple mocks

## Why not Redux?

I personally love Redux for both core idea and ease of state management and introduced it to my personal and professionally written apps multiple times (oh, and these amazing dev tools are worth mentioning as well!), but... [I really don't need it yet](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367).

I pesonally think that introducing Redux part-by-part to any existing app is not a hard task to do, hence - I decided not to include it.

## Why such component names?

imports, index simpler, but Intellisense etc.

## JSX/Typescript rules

## Future considerations

- Webpack (or any other bundler)
- Optimizing icons etc.
- Ejecting app (for better configurability) or starting from scratch

## Pager implementation

A bit about the design, inspiration etc.

Fallbacks

Reasoning between array construction

Why separate helpers instead of special data structure? (separate your data from your UI!).
