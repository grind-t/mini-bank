<script lang="ts">
  import { getDCAStrategyLogs } from "$lib/common/api";
  import dayjs from "dayjs";
  import Log from "./Log.svelte";

  function getLogs() {
    return getDCAStrategyLogs({
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
