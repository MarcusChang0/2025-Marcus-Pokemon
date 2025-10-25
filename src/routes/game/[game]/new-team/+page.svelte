<script>
  import pokemons from "../../../../pokemon.json";
  import { goto } from "$app/navigation";

  let { data } = $props();
  let page = $state(1);
  let { game } = data;
  let pokemon = $state(pokemons.filter((v) => v.versions.includes(game)));

  let selectedPokemon = $state(undefined);
  let selected = $state([]);

  $effect(() => {
    console.log(selectedPokemon);
  });

  function handleClick(index) {
    if (!selected.includes(index)) {
      if (selected.length < 6) {
        selected.push(index);
        selectedPokemon = pokemon[index];
      }
    } else {
      selected = selected.filter((v) => v !== index);
    }
  }

  function save() {
    let team = pokemon.filter((_, i) => selected.includes(i));

    let allTeams = JSON.parse(localStorage.getItem("all-teams")) || [];

    allTeams.push(team);

    localStorage.setItem("all-teams", JSON.stringify(allTeams));

    goto(`/game/${game}`);
  }

  const perPage = 30;

  function nextPage() {
    if (page * perPage < pokemon.length) page += 1;
  }

  function prevPage() {
    if (page > 1) page -= 1;
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
  <!-- Header with Team Slots -->
  <div class="bg-black text-white p-6">
    <div class="max-w-4xl mx-auto">
      <div class="grid grid-cols-6 gap-4">
        {#each Array(6) as _, i}
          <div
            class="aspect-square bg-gray-800 border-2 border-gray-600 rounded-lg flex items-center justify-center overflow-hidden"
          >
            {#if selected[i] !== undefined}
              <img
                src={pokemon[selected[i]].sprite}
                alt={pokemon[selected[i]].name}
                class="max-h-full max-w-full object-contain"
              />
            {:else}
              <div class="text-gray-400 text-xs text-center">
                Slot {i + 1}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div class="flex">
    <!-- Pokemon Selection Grid -->
    <div class="w-1/2 p-6">
      <h2 class="text-xl font-semibold text-black mb-4">Select Pokémon</h2>
      <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
        {#each pokemon.slice((page - 1) * perPage, page * perPage) as v, i}
          <div
            class="bg-white border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md overflow-hidden"
            class:border-red-600={selected.includes(i + (page - 1) * perPage)}
            class:bg-red-50={selected.includes(i + (page - 1) * perPage)}
            class:border-gray-200={!selected.includes(i + (page - 1) * perPage)}
            onclick={() => handleClick(i + (page - 1) * perPage)}
          >
            <div class="aspect-square p-2">
              <img
                src={v.sprite}
                alt={v.name}
                class="w-full h-full object-contain"
              />
            </div>
          </div>
        {/each}
      </div>

      <!-- Pagination -->
      <div class="flex justify-center items-center space-x-2">
        <button
          class="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onclick={prevPage}
          disabled={page === 1}
        >
          ← Previous
        </button>
        <span class="text-black font-medium px-4">Page {page}</span>
        <button
          class="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onclick={nextPage}
          disabled={page * perPage >= pokemon.length}
        >
          Next →
        </button>
      </div>
    </div>

    <!-- Pokemon Details Panel -->
    <div class="w-1/2 bg-gray-50 p-6 border-l-2 border-gray-200">
      {#if selectedPokemon}
        <div
          class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <!-- Pokemon Image -->
          <div class="bg-gray-100 p-8 text-center">
            <img
              src={selectedPokemon.sprite}
              alt={selectedPokemon.name}
              class="w-32 h-32 mx-auto object-contain"
            />
          </div>

          <!-- Pokemon Info -->
          <div class="p-6">
            <h3 class="text-2xl font-bold text-black text-center mb-4">
              {toTitleCase(selectedPokemon.name)}
            </h3>

            <!-- Types -->
            <div class="mb-6 text-center">
              <span class="text-sm font-medium text-gray-600 block mb-2"
                >Type</span
              >
              <div class="flex justify-center space-x-2">
                {#each selectedPokemon.types as type}
                  <span
                    class="bg-black text-white px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {toTitleCase(type)}
                  </span>
                {/each}
              </div>
            </div>

            <!-- Stats with Animated Progress Bars -->
            <div class="mb-6">
              <div class="space-y-3">
                {#each selectedPokemon.stats as stat}
                  <div>
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm font-medium text-gray-700">
                        {toTitleCase(stat.name)}
                      </span>
                      <span class="text-sm font-bold text-black"
                        >{stat.stat}</span
                      >
                    </div>
                    <div
                      class="w-full bg-gray-200 rounded-full h-3 overflow-hidden"
                    >
                      <div
                        class="h-full bg-red-600 rounded-full transition-all duration-1000 ease-out"
                        style="width: {Math.min((stat.stat / 150) * 100, 100)}%"
                      ></div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>

            <!-- Location -->
            <div class="mb-6">
              <span class="text-sm font-medium text-gray-600 block mb-2"
                >How to Obtain</span
              >
              <div class="bg-gray-100 rounded-lg p-3">
                <span class="text-sm font-medium text-black">
                  {#if selectedPokemon.locations.find( (lo) => lo.versions.includes(game) )}
                    📍 {toTitleCase(
                      selectedPokemon.locations.find((lo) =>
                        lo.versions.includes(game)
                      ).location_area
                    )}
                  {:else}
                    🔄 Evolution Required
                  {/if}
                </span>
              </div>
            </div>

            <!-- Save Button -->
            <button
              class="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onclick={save}
              disabled={selected.length === 0}
            >
              Save Team ({selected.length}/6)
            </button>
          </div>
        </div>
      {:else}
        <div class="text-center py-16">
          <p class="text-gray-500">
            Click on any Pokémon to see its details and stats
          </p>
        </div>
      {/if}
    </div>
  </div>
</div>
