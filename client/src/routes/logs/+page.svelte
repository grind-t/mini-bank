<script lang="ts">
  import dayjs from "dayjs";
  import Log from "./components/Log.svelte";
  import { trpc } from "$lib/trpc";

  function getLogs() {
    return trpc.dcaStrategies.logs.query({
      id: "bonds",
      from: dayjs().subtract(1, "week").toDate(),
      to: dayjs().toDate(),
    });
  }
</script>

<div class="flex flex-col h-full">
  {#await getLogs() then logs}
    {#each logs as log}
      <Log {log} />
    {:else}
      Логи отсутсвуют
    {/each}
  {:catch}
    Ошибка
  {/await}
</div>
