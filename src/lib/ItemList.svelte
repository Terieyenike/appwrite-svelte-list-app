<script>
  import { deleteList } from "../utils";

  export let list;

  function handleDeleteListItem() {
    deleteList(list.$databaseId, list.$collectionId, list.$id).then(
      function (response) {
        console.log(`${list.item} successfully deleted`);
        window.location.reload();
      },
      function (error) {
        console.log(error);
      }
    );
  }
</script>

<button type="button" on:click={handleDeleteListItem}>
  {list.item}
</button>
