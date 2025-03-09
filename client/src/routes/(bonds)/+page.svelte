<script lang="ts">
  import { onMount } from "svelte";
  import { getBonds, getDCAStrategy, setDCAStrategy } from "$lib/common/api";
  import {
    getCurrentMonthName,
    getDistanceInYearsText,
  } from "$lib/common/date";
  import { getBondRatingText } from "$lib/bonds/rating";

  let bonds: Awaited<ReturnType<typeof getBonds>>;
  let dcaStrategy: Awaited<ReturnType<typeof getDCAStrategy>>;

  onMount(async () => {
    [bonds, dcaStrategy] = await Promise.all([
      getBonds(),
      getDCAStrategy({ id: "bonds" }),
    ]);

    dcaStrategy ??= {
      id: "bonds",
      currentMonthBudget: 0,
      assets: [],
    };
  });
</script>

<main class="flex flex-col flex-1">
  {#if bonds && dcaStrategy}
    <input
      value={dcaStrategy.currentMonthBudget || ""}
      class="input m-2"
      type="text"
      placeholder="Сумма на {getCurrentMonthName()}"
      onchange={(e) => {
        if (!dcaStrategy) return;

        dcaStrategy.currentMonthBudget =
          Number.parseInt(e.currentTarget.value) || 0;
        setDCAStrategy(dcaStrategy);
      }}
    />
    <ul class="list">
      {#each bonds as bond}
        {@const assetIdx = dcaStrategy.assets.findIndex(
          (a) => a.id == bond.isin
        )}

        <li class="list-row">
          <label>
            <input
              checked={assetIdx !== -1}
              type="checkbox"
              class="checkbox checkbox-xs"
              onchange={(e) => {
                if (!dcaStrategy) return;

                const { checked } = e.currentTarget;

                if (checked) {
                  dcaStrategy?.assets.push({ id: bond.isin, weight: 1 });
                } else {
                  dcaStrategy?.assets.splice(assetIdx, 1);
                }

                setDCAStrategy(dcaStrategy);
              }}
            />
          </label>
          <div class="list-col-grow flex">
            <button
              class="flex-3 flex items-center gap-1"
              onclick={() => navigator.clipboard.writeText(bond.isin)}
            >
              {bond.name}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="size-4"
              >
                <path
                  d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z"
                />
                <path
                  d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z"
                />
              </svg>
            </button>
            <div class="flex-2">{getBondRatingText(bond.rating)}</div>
            <div class="flex-2">{bond.yield}%</div>
            <div class="flex-2">
              {getDistanceInYearsText(new Date(bond.maturityDate))}
            </div>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</main>
