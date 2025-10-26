<script>
    import { goto } from "$app/navigation";
  
    export let data;
  
    const game = data.game;
    const teamIndex = parseInt(data.team);
  
    let allTeams = JSON.parse(localStorage.getItem(`teams-${game}`)) || [];
    let team = allTeams[teamIndex] || [];
  
    // Pokémon type colors
    const TYPE_COLORS = {
      normal: "bg-gray-400",
      fire: "bg-red-500",
      water: "bg-blue-500",
      grass: "bg-green-500",
      electric: "bg-yellow-400",
      ice: "bg-cyan-400",
      fighting: "bg-orange-700",
      poison: "bg-purple-500",
      ground: "bg-yellow-600",
      flying: "bg-indigo-400",
      psychic: "bg-pink-500",
      bug: "bg-lime-600",
      rock: "bg-amber-700",
      ghost: "bg-indigo-700",
      dragon: "bg-sky-700",
      dark: "bg-gray-700",
      steel: "bg-slate-500",
      fairy: "bg-pink-400",
    };
  
    // Type effectiveness chart (simplified)
    const TYPE_EFFECTIVENESS = {
      normal: ["rock", "steel", "ghost"],
      fire: ["grass", "ice", "bug", "steel"],
      water: ["fire", "ground", "rock"],
      grass: ["water", "ground", "rock"],
      electric: ["water", "flying"],
      ice: ["grass", "ground", "flying", "dragon"],
      fighting: ["normal", "ice", "rock", "dark", "steel"],
      poison: ["grass", "fairy"],
      ground: ["fire", "electric", "poison", "rock", "steel"],
      flying: ["grass", "fighting", "bug"],
      psychic: ["fighting", "poison"],
      bug: ["grass", "psychic", "dark"],
      rock: ["fire", "ice", "flying", "bug"],
      ghost: ["psychic", "ghost"],
      dragon: ["dragon"],
      dark: ["psychic", "ghost"],
      steel: ["ice", "rock", "fairy"],
      fairy: ["fighting", "dragon", "dark"],
    };
  
    const allTypes = Object.keys(TYPE_COLORS);
  
    // Determine coverage
    function getCoverage(targetType) {
      return team.some((poke) =>
        poke.types.some((t) => TYPE_EFFECTIVENESS[t]?.includes(targetType))
      );
    }
  
    function toTitleCase(str) {
      return str
        .replace(/-/g, " ")
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    }
  </script>
  
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <div class="container mx-auto px-6 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-black">
          Type Coverage — Pokémon {toTitleCase(game)}
        </h1>
        <button
          class="bg-gray-700 hover:bg-gray-800 text-white font-semibold px-5 py-2 rounded-lg transition-colors duration-200"
          on:click={() => goto(`/game/${game}`)}
        >
          ← Back
        </button>
      </div>
  
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Left: Type Coverage Grid -->
        <div>
          <h2
            class="text-2xl font-semibold text-black mb-4 border-b-2 border-gray-300 pb-2"
          >
            Type Coverage
          </h2>
          <div class="grid grid-cols-3 gap-4">
            {#each allTypes as type}
              <div
                class={`p-4 rounded-lg text-white text-center font-semibold shadow-md ${TYPE_COLORS[type]}`}
              >
                <div class="text-lg mb-2">{toTitleCase(type)}</div>
                {#if getCoverage(type)}
                  <div class="bg-white text-black rounded-md py-1 font-medium">
                    ✅ Covered
                  </div>
                {:else}
                  <div class="bg-white text-red-600 rounded-md py-1 font-medium">
                    ❌ No Coverage
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        </div>
  
        <!-- Right: Team Display -->
        <div>
          <h2
            class="text-2xl font-semibold text-black mb-4 border-b-2 border-gray-300 pb-2 text-center"
          >
            Your Team
          </h2>
          <div
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200"
          >
            {#each team as pokemon}
              <div
                class="bg-white border border-gray-200 rounded-lg p-3 flex flex-col items-center justify-between text-center hover:bg-gray-100 transition-colors duration-200 h-40"
              >
                <img
                  src={pokemon.sprite}
                  alt={toTitleCase(pokemon.name)}
                  class="w-16 h-16 object-contain mb-2"
                />
                <div
                  class="text-sm font-semibold text-black leading-tight truncate w-full"
                >
                  {toTitleCase(pokemon.name)}
                </div>
                <div class="flex justify-center flex-wrap gap-1 mt-1">
                  {#each pokemon.types as t}
                    <span
                      class={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${TYPE_COLORS[t.toLowerCase()]}`}
                    >
                      {toTitleCase(t)}
                    </span>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
  