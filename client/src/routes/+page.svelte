<script lang="ts">
  import { onMount } from "svelte";
  import { getBonds } from "$lib/api";

  onMount(async () => {
    //const greetMsg = await invoke("greet", { name: "world" });
    //console.log(greetMsg);
  });
</script>

<main class="flex flex-col">
  <input
    class="input m-2"
    type="text"
    placeholder="Сумма на {Intl.DateTimeFormat('ru-RU', {
      month: 'long',
    }).format(Date.now())}"
  />

  {#await getBonds()}
    ...
  {:then bonds}
    <ul class="list">
      {#each bonds as bond}
        <li class="list-row">{bond.name} {bond.yield}%</li>
      {/each}
    </ul>
  {/await}
</main>
