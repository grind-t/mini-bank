<script lang="ts">
  import { getUserContext } from "$lib/auth/context";
  import type { RouterOutput } from "$lib/trpc";
  import BondListItem from "./BondListItem.svelte";

  const user = getUserContext();

  let {
    selectedBonds,
  }: {
    selectedBonds: RouterOutput["bonds"]["list"];
  } = $props();
</script>

<BondListItem sticky>
  {#if user}
    <div>{selectedBonds.length} шт.</div>
  {/if}
  <div class="line-clamp-1">Наименование</div>
  <div class="line-clamp-1">Рейтинг</div>
  <div class="line-clamp-1">Доходность</div>
  <div class="line-clamp-1">Срок</div>
</BondListItem>
