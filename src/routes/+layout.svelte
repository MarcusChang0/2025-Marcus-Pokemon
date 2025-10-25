<script>
  import "../app.css";

  /** @type {{children: import('svelte').Snippet}} */
  let { children } = $props();
</script>

<div class="min-h-screen flex flex-col">
  <div class="navbar bg-base-100 shadow-sm">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg"
          class="h-8"
        />
        Poke Game Planner</a
      >
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li><a href="/">Home</a></li>
        <li><a href="/game-select">Game Selection</a></li>
        <li><a href="/guides">Guides</a></li>
      </ul>
    </div>
  </div>

  <main>
    {@render children()}
  </main>
</div>
