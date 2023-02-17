# Replication in Svelte of the Emergent iPad app.

## Copyright 2023 G Fiorenzo / Emergent

### Testing

npm run e2e - Playwright End To End
npm run unit - Vitest Unit

### Notes

I am leveraging the use of "< svelte:component >" in several places throughout the code base. One quirk of this approach is that not all generated components use the props passed to them. To prevent linter / Typescript warnings, unused props are still received by the component, then referenced. ie "export let allCollapsed;", followed by "allCollapsed;" I argue that the benefits gained from using < svelte:component > (minimizing verbosity) are worth this inconvenience.
