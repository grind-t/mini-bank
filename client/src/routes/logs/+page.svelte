<script lang="ts">
  import { getDCAStrategyLogs } from "$lib/api";
  import dayjs from "dayjs";
</script>

<div class="flex flex-col h-full">
  {#await getDCAStrategyLogs({ id: "bonds", from: dayjs()
      .subtract(1, "week")
      .toDate(), to: dayjs().toDate() })}
    <div class="skeleton w-full, h-32"></div>
  {:then logs}
    <div class="mockup-code">
      {#each logs as log}
        <pre><code>{JSON.stringify(log, null, 2)}</code></pre>
      {/each}
    </div>
  {:catch}
    Ошибка
  {/await}
</div>
