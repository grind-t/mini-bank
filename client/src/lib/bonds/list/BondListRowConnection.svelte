<script lang="ts">
  import { sum } from "@grind-t/toolkit/array";

  const checkboxTopPadding = 21;
  const checkboxHeight = 16;
  const checkboxBottom = checkboxHeight + checkboxTopPadding;

  let { rowIndex, rowHeights }: { rowIndex: number; rowHeights: number[] } =
    $props();
</script>

{#if rowIndex}
  {@const prevRowIndex = rowIndex - 1}
  {@const prevRowTop = sum(rowHeights.slice(0, prevRowIndex))}
  {@const prevRowHeight = rowHeights[prevRowIndex]}

  <div
    class="absolute w-px left-[23.5px] bg-base-content/10"
    style:top="{prevRowTop + checkboxBottom - 0.5}px"
    style:height="{prevRowHeight - checkboxHeight}px"
  ></div>
{/if}
