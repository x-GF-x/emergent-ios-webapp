## Replication in Svelte of the Emergent iPad app.

# Copyright 2023 G Fiorenzo / Emergent

I am leveraging the use of "< svelte:component >" in several places throughout the code base. One quirk of this approach is that not all generated components use the props passed to them. To prevent linter / Typescript warnings, unused props are still received by the component, then set equal to themselves. ie "export let allCollapsed", followed by "allCollapsed = allCollapsed." I argue that the benefits gained from using < svelte:component > (minimizing verbosity) are worth this minor inconvenience.
