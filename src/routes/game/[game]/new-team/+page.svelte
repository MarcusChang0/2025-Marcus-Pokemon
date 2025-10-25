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

<div class="flex flex-wrap">
  <div class="w-screen flex justify-center">
    <div class="grid grid-cols-6 gap-2 w-full max-w-5xl">
      {#each Array(6) as _, i}
        <div
          class="aspect-square w-full card shadow-sm flex items-center justify-center bg-red-200"
        >
          {#if selected[i] !== undefined}
            <img
              src={pokemon[selected[i]].sprite}
              alt={pokemon[selected[i]].name}
              class="max-h-full max-w-full object-contain"
            />
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <div class="w-1/2 mx-auto flex flex-col items-center">
    <div
      class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 w-full mb-4"
    >
      {#each pokemon.slice((page - 1) * perPage, page * perPage) as v, i}
        <div
          class="card w-full shadow-sm cursor-pointer hover:bg-red-200"
          class:bg-red-200={selected.includes(i + (page - 1) * perPage)}
          onclick={() => handleClick(i + (page - 1) * perPage)}
        >
          <figure>
            <img src={v.sprite} alt={v.name} />
          </figure>
        </div>
      {/each}
    </div>

    <div
      class="join sticky bottom-0 bg-base-100 w-full flex justify-center py-2"
    >
      <button class="join-item btn" onclick={prevPage}>«</button>
      <button class="join-item btn">Page {page}</button>
      <button class="join-item btn" onclick={nextPage}>»</button>
    </div>
  </div>

  <div class="w-1/2 bg-yellow-100 rounded-xl">
    {#if selectedPokemon}
      <div>
        <div class="card w-full shadow-sm">
          <figure>
            <img src={selectedPokemon.sprite} alt="Shoes" />
          </figure>

          <div class="card-body">
            <h2 class="card-title justify-center">
              {toTitleCase(selectedPokemon.name)}
            </h2>

            <div class="justify-center">
              Typing:
              {#each selectedPokemon.types as type}
                {toTitleCase(type) + " "}
              {/each}
            </div>

            <p>
              {#each selectedPokemon.stats as stat}
                <div>
                  {toTitleCase(stat.name)} : {stat.stat}
                  <progress value={stat.stat} max="100" class="duration-2000" />
                </div>
              {/each}
            </p>

            <div class="justify-center">
              Obtain:
              {#if selectedPokemon.locations.find( (lo) => lo.versions.includes(game) )}
                {toTitleCase(
                  selectedPokemon.locations.find((lo) =>
                    lo.versions.includes(game)
                  ).location_area
                )}
              {:else}
                Evolve
              {/if}
            </div>
          </div>

          <button class="btn btn-secondary" onclick={save}>Save Team</button>
        </div>
      </div>
    {/if}
  </div>
</div>
