<script lang="ts">
  import type { DCAStrategyLog } from "$lib/common/api";
  import dayjs from "dayjs";

  let {
    log,
    assets,
  }: { log: DCAStrategyLog; assets: Record<string, { name: string }> } =
    $props();

  function getAssetBody(orederedAssetId: string) {
    const idx = log.initialAssets.findIndex((v) => v.id === orederedAssetId);
    const assetId = log.strategy.assets[idx].id;
    return assets[assetId];
  }
</script>

<div class="divider">{dayjs(log.timestamp).format("DD.MM.YYYY HH:mm")}</div>

{#each log.orderedAssets as orderedAsset}
  {@const asset = { ...getAssetBody(orderedAsset.id), ...orderedAsset }}

  <div class="chat chat-start">
    {#if "error" in orderedAsset}
      <div class="chat-bubble chat-bubble-error">
        Не удалось приобрести {asset.name} ({asset.error})
      </div>
    {:else}
      <div class="chat-bubble chat-bubble-success">
        Покупка {asset.name}, {asset.quantity} шт. на {asset.currentPrice *
          asset.quantity} руб.
      </div>
    {/if}
  </div>
{/each}
