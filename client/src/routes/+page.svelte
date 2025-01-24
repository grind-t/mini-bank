<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";
  import { onMount } from "svelte";

  onMount(async () => {
    const greetMsg = await invoke("greet", { name: "world" });
    console.log(greetMsg);
  });
</script>

<main class="flex flex-col">
  <input class="btn w-fit m-2" type="radio" name="asset-type" value="bonds" aria-label="Облигации" />  

  <select class="select m-2">
    <option disabled selected>Счет</option>
  </select>

  <input class="input m-2" type="text" placeholder="Сумма" />

  <input class="input m-2" type="datetime-local" placeholder="Конец"/>

  <ul class="list">
    {#each {length: 8} as _, i}
      <li class="list-row">Облигация {i + 1}</li>
    {/each}
  </ul>
</main>