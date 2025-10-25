<script>
	import '../app.css';

	/** @type {{children: import('svelte').Snippet}} */
	let { children } = $props();
</script>
<div class="min-h-screen flex flex-col">

  <div class="drawer">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div class="navbar bg-accent w-full">
        <div class="flex-none lg:hidden">
          <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block h-6 w-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div class="mx-2 flex-1 px-2">Navigation</div>
        <div class="hidden flex-none lg:block">
          <ul class="menu menu-horizontal hide">
            <!-- Navbar menu content here -->
          </ul>
        </div>
      </div>
      <!-- Page content here -->
    </div>
    <div class="drawer-side">
      <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu bg-base-200 min-h-full w-80 p-4" on:click={() => (document.getElementById('my-drawer-3').checked = false)}>
        <!-- Sidebar content here -->
        <li><a href="/">Home Screen</a></li>
        <li><a href="/game-select">Game Selection</a></li>
        <li><a href="/guides">Guides</a></li>
      </ul>
    </div>
    
  </div>
  {@render children()}
</div>