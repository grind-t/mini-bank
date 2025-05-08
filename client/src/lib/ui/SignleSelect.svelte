<script lang="ts" generics="V">
  import Select, { type Item } from "./Select.svelte";

  let {
    items,
    value = $bindable(),
  }: {
    items: Item<V>[];
    value?: V;
  } = $props();

  let select = $state<Select<V>>();

  let selectedItems = $derived(items.filter((item) => item.value === value));

  function onItemChecked(item: Item<V>) {
    value = item.value;
    select?.hidePopover();
  }

  function onItemUnchecked(_item: Item<V>) {
    value = undefined;
    select?.hidePopover();
  }
</script>

<Select
  bind:this={select}
  {items}
  {selectedItems}
  {onItemChecked}
  {onItemUnchecked}
/>
