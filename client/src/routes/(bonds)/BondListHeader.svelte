<script lang="ts">
  import type { Bond } from "$lib/common/api";
  import BondListItem from "./BondListItem.svelte";

  let { selectedBonds }: { selectedBonds: Bond[] } = $props();
</script>

<BondListItem sticky>
  <div>{selectedBonds.length} шт.</div>
  <div class="line-clamp-1">Наименование</div>
  <div class="line-clamp-1">Рейтинг</div>
  <div class="line-clamp-1">Доходность</div>
  <div class="line-clamp-1">Срок</div>
</BondListItem>
