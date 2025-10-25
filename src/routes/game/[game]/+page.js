export const load = ({ params }) => {
  const game = params.game;
  // Fetch data based on the slug, e.g., from an API or database
  return { game }; // Return the slug to be used in +page.svelte
};
