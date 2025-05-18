<script lang="ts" module>
  export type Item = {
    id: string;
    title: string;
    image: string;
    yearInflation: number;
    monthInflation: number;
  };
</script>

<script lang="ts">
  let { items }: { items: Item[] } = $props();

  function getInflationString(item: Item) {
    const year = item.yearInflation.toFixed(2);
    const month = item.monthInflation.toFixed(2);
    const monthSign = item.monthInflation > 0 ? "+" : "";

    return `${year}%, (${monthSign}${month}%)`;
  }
</script>

<ul
  class="grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1 lg:grid-cols-6 flex-1"
>
  {#each items as item (item.id)}
    <li class="p-2">
      <img src={item.image} alt="" class="mx-auto max-h-44" />
      <p class="text-center">
        {item.title}<br />{getInflationString(item)}
      </p>
    </li>
  {/each}
</ul>
