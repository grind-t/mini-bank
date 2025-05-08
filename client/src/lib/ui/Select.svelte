<script lang="ts" module>
  export type Item<V> = { label: string; value: V };
</script>

<script lang="ts" generics="V">
  const uid = $props.id();

  let {
    items,
    selectedItems,
    onItemChecked,
    onItemUnchecked,
  }: {
    items: Item<V>[];
    selectedItems: Item<V>[];
    onItemChecked: (item: Item<V>) => void;
    onItemUnchecked: (item: Item<V>) => void;
  } = $props();

  let popoverElement = $state<HTMLElement>();

  export function showPopover() {
    popoverElement?.showPopover();
  }

  export function hidePopover() {
    popoverElement?.hidePopover();
  }
</script>

<button
  class="flex items-center h-full w-full line-clamp-1 truncate"
  type="button"
  popovertarget="popover-{uid}"
  style:anchor-name="--anchor-{uid}"
>
  {selectedItems.map((item) => item.label).join(", ")}
</button>

<ul
  bind:this={popoverElement}
  class="dropdown menu h-full max-h-fit w-full max-w-80 rounded-box bg-base-100 shadow-sm overflow-y-auto overflow-x-hidden"
  popover="auto"
  id="popover-{uid}"
  style:position-anchor="--anchor-{uid}"
>
  {#each items as item (item.value)}
    {@const isSelected = selectedItems.includes(item)}

    <li>
      <label class="flex items-center">
        <svg
          viewBox="0 0 16 16"
          fill="currentColor"
          class={["size-4 flex-none", isSelected ? "opacity-100" : "opacity-0"]}
          role="presentation"
        >
          <path
            fill-rule="evenodd"
            d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
            clip-rule="evenodd"
          />
        </svg>

        <input
          class="sr-only"
          bind:checked={
            () => isSelected,
            (checked) => {
              if (checked) {
                onItemChecked(item);
              } else {
                onItemUnchecked(item);
              }
            }
          }
          type="checkbox"
        />
        {item.label}
      </label>
    </li>
  {/each}
</ul>
