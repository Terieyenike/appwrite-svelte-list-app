<script>
  import { getList, create } from "../utils";
  import { onMount } from "svelte";
  import { data } from "../store";
  import ItemList from "../lib/ItemList.svelte";

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

<div class="w-4/5 mx-auto max-w-6xl flex flex-col lg:w-6/12 select-none">
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
    {#each lists as list (list.$id)}
      <li
        class="md:text-4xl lg:text-2xl bg-slate-100 p-5 rounded-lg grow text-center shadow hover:bg-orange-200 cursor-pointer"
      >
        <ItemList {list} />
      </li>
    {/each}
  </ul>
</div>
