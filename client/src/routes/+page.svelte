<script lang="ts">
  import { onMount } from "svelte";

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

  <ul class="list">
    {#each { length: 8 } as _, i}
      <li class="list-row">Облигация {i + 1}</li>
    {/each}
  </ul>
</main>
