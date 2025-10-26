<script>
  export let data;
  import { onMount } from "svelte";

  let roster = []; // array of teams

  function getStorageKey() {
    return `teams-${data.game}`; // each game has its own storage key
  }

  function loadTeams() {
    const r = localStorage.getItem(getStorageKey());
    roster = r ? JSON.parse(r) : [];
  }

  onMount(() => {
    loadTeams();
  });

  function deleteTeam(index) {
    roster.splice(index, 1);
    roster = [...roster];
    localStorage.setItem(getStorageKey(), JSON.stringify(roster));
  }

  function toTitleCase(str) {
    return str
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
</script>

<div class="min-h-screen bg-white">
  <div class="container mx-auto px-6 py-8">
    <!-- Header Section -->
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-bold text-black mb-4">
        Pokémon {toTitleCase(data.game)}
      </h1>
      <a
        href={`/game/${data.game}/new-team`}
        class="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
      >
        Create a New Team
      </a>
    </div>

    <!-- Teams Section -->
    <div class="max-w-4xl mx-auto">
      <h2
        class="text-2xl font-semibold text-black mb-6 text-center border-b-2 border-red-600 pb-2"
      >
        Your Teams
      </h2>

      <div class="space-y-6">
        {#if roster.length === 0}
          <div
            class="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
          >
            <p class="text-gray-600 text-lg mb-4">
              You don't have any teams yet.
            </p>
            <a
              href={`/game/${data.game}/new-team`}
              class="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Create Your First Team
            </a>
          </div>
        {/if}

        {#each roster as team, ti}
          <div
            class="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <!-- Team Header -->
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold text-black">Team {ti + 1}</h3>
              <button
                class="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors duration-200"
                onclick={() => deleteTeam(ti)}
              >
                Delete Team
              </button>
            </div>

            <!-- Pokemon Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {#each team as pokemon}
                <div
                  class="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center hover:bg-gray-100 transition-colors duration-200"
                >
                  <div class="mb-2">
                    <img
                      src={pokemon.sprite}
                      alt={toTitleCase(pokemon.name)}
                      class="w-16 h-16 mx-auto object-contain"
                    />
                  </div>
                  <div class="text-sm font-medium text-black">
                    {toTitleCase(pokemon.name)}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>