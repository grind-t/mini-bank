<script lang="ts">
  import type { RouterOutput } from "$lib/trpc";
  import dayjs from "dayjs";

  let {
    log,
  }: {
    log: RouterOutput["dcaStrategies"]["logs"][number];
  } = $props();
</script>

<div class="divider">{dayjs(log.timestamp).format("DD.MM.YYYY HH:mm")}</div>

{#each log.orderedAssets as asset}
  <div class="chat chat-start">
    {#if "error" in asset}
      <div class="chat-bubble chat-bubble-error">
        Не удалось приобрести {asset.name} ({asset.error})
      </div>
    {:else}
      <div class="chat-bubble chat-bubble-success">
        Покупка {asset.name}, {asset.quantity} шт. на {(
          asset.currentPrice * asset.quantity
        ).toFixed(2)} руб.
      </div>
    {/if}
  </div>
{/each}
