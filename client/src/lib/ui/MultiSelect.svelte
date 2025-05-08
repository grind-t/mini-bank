<script lang="ts" generics="V">
  import Select, { type Item } from "./Select.svelte";

  let {
    items,
    value = $bindable(),
  }: {
    items: Item<V>[];
    value?: V[];
  } = $props();

  let selectedItems = $derived(
    items.filter((item) => value?.some((v) => v === item.value))
  );

  function onItemChecked(item: Item<V>) {
    value ??= [];
    value.push(item.value);
  }

  function onItemUnchecked(item: Item<V>) {
    if (!value) return;

    const idx = value.indexOf(item.value);
    value.splice(idx, 1);

    if (!value.length) {
      value = undefined;
    }
  }
</script>

<Select {items} {selectedItems} {onItemChecked} {onItemUnchecked} />
