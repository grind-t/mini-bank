<script lang="ts">
  import { getDCAStrategyLogs } from "$lib/common/api";
  import dayjs from "dayjs";
</script>

<div class="flex flex-col h-full">
  {#await getDCAStrategyLogs({ id: "bonds", from: dayjs()
      .subtract(1, "week")
      .toDate(), to: dayjs().toDate() }) then logs}
    <div class="mockup-code w-full h-full rounded-none bg-transparent">
      {#each logs as log}
        <pre><code>{JSON.stringify(log, null, 2)}</code></pre>
      {:else}
        <pre><code>Логи отсутсвуют</code></pre>
      {/each}
    </div>
  {:catch}
    Ошибка
  {/await}
</div>
