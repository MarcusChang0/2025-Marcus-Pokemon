<script>
  export let data;
  import { onMount } from "svelte";

  let roster = []; // array of teams

  function loadTeams() {
    const r = localStorage.getItem("all-teams");
    roster = r ? JSON.parse(r) : [];
  }

  onMount(() => {
    loadTeams();
  });

  function deleteTeam(index) {
    roster.splice(index, 1);
    roster = [...roster];
    localStorage.setItem("all-teams", JSON.stringify(roster));
  }

  function toTitleCase(str) {
    return str
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
</script>

<div class="container mx-auto">
  <h1 class="text-2xl">Pokémon {toTitleCase(data.game)}</h1>

  <a href={`/game/${data.game}/new-team`} class="btn btn-primary mb-4"
    >Create a new team</a
  >

  <h2 class="mt-4 mb-2 text-xl text-center">List of Teams</h2>

  <div class="flex flex-col gap-6">
    {#if roster.length === 0}
      You dont have any teams yet.
      <a href={`/game/${data.game}/new-team`} class="btn btn-primary mb-4"
        >Create a new team</a
      >
    {/if}
    {#each roster as team, ti}
      <div class="border p-2 rounded">
        <div class="flex justify-between items-center mb-2">
          <h3 class="font-bold">Team {ti + 1}</h3>
          <button class="btn btn-error btn-sm" onclick={() => deleteTeam(ti)}
            >Delete</button
          >
        </div>
        <div class="flex flex-wrap gap-2">
          {#each team as pokemon}
            <div
              class="w-20 card shadow-sm flex flex-col items-center justify-center p-1 bg-gray-100"
            >
              <figure>
                <img
                  src={pokemon.sprite}
                  alt={toTitleCase(pokemon.name)}
                  class="max-h-16 object-contain"
                />
              </figure>
              <div class="text-sm text-center">{toTitleCase(pokemon.name)}</div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>
