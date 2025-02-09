<script lang="ts">
  import { onMount } from "svelte";
  import { getBonds } from "$lib/api";
  import { getCurrentMonthName, getDistanceInYearsText } from "$lib/date";
  import { getBondRatingText } from "$lib/bonds";

  onMount(async () => {
    //const greetMsg = await invoke("greet", { name: "world" });
    //console.log(greetMsg);
  });
</script>

<main class="flex flex-col">
  <input
    class="input m-2"
    type="text"
    placeholder="Сумма на {getCurrentMonthName()}"
  />

  {#await getBonds()}
    ...
  {:then bonds}
    <ul class="list">
      {#each bonds as bond}
        <li class="list-row">
          <label>
            <input type="checkbox" class="checkbox checkbox-xs" />
          </label>
          <div class="list-col-grow flex">
            <div class="flex-3">{bond.name}</div>
            <div class="flex-2">{getBondRatingText(bond.rating)}</div>
            <div class="flex-2">{bond.yield}%</div>
            <div class="flex-2">
              {getDistanceInYearsText(new Date(bond.maturityDate))}
            </div>
          </div>
        </li>
      {/each}
    </ul>
  {/await}
</main>
