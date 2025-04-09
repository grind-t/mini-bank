<script lang="ts">
  import type { DCAStrategyLog } from "$lib/common/api";
  import dayjs from "dayjs";

  let {
    log,
    getAssetBody,
  }: { log: DCAStrategyLog; getAssetBody: (isin: string) => { name: string } } =
    $props();

  function getAsset(orderedAsset: (typeof log.orderedAssets)[number]) {
    const idx = log.initialAssets.findIndex((v) => v.id === orderedAsset.id);
    const isin = log.strategy.assets[idx].isin;
    const body = getAssetBody(isin);
    return { ...body, ...orderedAsset };
  }
</script>

<div class="divider">{dayjs(log.timestamp).format("DD.MM.YYYY HH:mm")}</div>

{#each log.orderedAssets as orderedAsset}
  {@const asset = getAsset(orderedAsset)}

  <div class="chat chat-start">
    {#if "error" in orderedAsset}
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
