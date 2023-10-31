<script>
  import { getList, create } from "../utils";
  import { onMount } from "svelte";
  import { data } from "../store";
  import ItemList from "../lib/ItemList.svelte";

  import { Hanko } from "@teamhanko/hanko-elements";
  import { goto } from "$app/navigation";
  import { env } from "$env/dynamic/public";
  const hankoApi = env.PUBLIC_HANKO_API_URL;

  const hanko = new Hanko(hankoApi);
  const logout = () => {
    hanko.user.logout().catch((error) => {
      console.log(error);
    });
    goto("/login");
  };

  let lists = [];

  onMount(() => {
    getList.then(
      function (response) {
        lists = response.documents;
      },
      function (error) {
        console.log(error);
      }
    );
  });

  function addToList(e) {
    if (!$data.name) {
      return;
    } else if (e.key !== "Enter") {
      return;
    }
    create({
      item: $data.name,
    }).then(
      function (response) {
        console.log(response);
        window.location.reload();
      },
      function (error) {
        console.log(error); // Failure
      }
    );
    $data.name = "";
  }
</script>

<div
  class="w-4/5 mx-auto max-w-6xl flex flex-col lg:w-6/12 select-none min-h-screen"
>
  <p class="text-center my-6">Delete an item with a click.</p>
  <button on:click={logout} class="text-slate-500">Logout</button>

  <img
    src="assets/app-launch.svg"
    alt="Launch rocket"
    class="mx-auto w-3/4 lg:w-2/4"
  />
  <input
    type="text"
    placeholder="enter item"
    on:keydown={addToList}
    bind:value={$data.name}
    class="bg-gray-200 p-4 border-0 text-slate-600 rounded-lg text-center text-xl my-3"
  />

  <ul class="flex p-0 flex-wrap gap-3 mt-4">
    {#if lists.length == 0}
      <p class="m-auto mt-8">No data in the database</p>
    {:else}
      {#each lists as list (list.$id)}
        <li
          class="md:text-4xl lg:text-2xl bg-slate-100 p-5 rounded-lg grow text-center shadow hover:bg-orange-200 cursor-pointer"
        >
          <ItemList {list} />
        </li>
      {/each}
    {/if}
  </ul>

  <footer class="mt-auto">
    <div class="mt-10 text-center text-gray-500">
      <address>
        Built by
        <span class="text-blue-600">
          <a href="https://twitter.com/terieyenike" target="_">Teri</a>
        </span>
        &copy; 2023
      </address>
      <div>
        <p>
          Fork, clone, and star this

          <a
            href="https://github.com/Terieyenike/appwrite-svelte-list-app"
            target="_"
            rel="noopener noreferrer"
            class="text-blue-600">repo</a
          >
        </p>
      </div>
      <p class="text-sm">Appwrite x Svelte x Tailwind CSS</p>
    </div>
  </footer>
</div>
