<script lang="ts">
  import InflationGrid, {
    type Item,
  } from "$lib/inflation/InflationGrid.svelte";
  import {
    trpc,
    type EstateInflation,
    type EstateInflationParams,
  } from "$lib/trpc";
  import GenericLoader from "$lib/ui/GenericLoader.svelte";
  import housingComfortImg from "$lib/inflation/images/housing-comfort.png";
  import housingBusinessImg from "$lib/inflation/images/housing-business.png";
  import GenericError from "$lib/ui/GenericError.svelte";
  import SignleSelect from "$lib/ui/SignleSelect.svelte";

  let region = $state<EstateInflationParams["region"]>("Moscow");

  function fetchData(region: EstateInflationParams["region"]) {
    return Promise.all([
      trpc.inflation.estate.get.query({
        region,
        estateClass: "Business",
      }),
      trpc.inflation.estate.get.query({
        region,
        estateClass: "Comfort",
      }),
    ]);
  }

  function getHousingItems(data: [EstateInflation, EstateInflation]): Item[] {
    const business: Item = {
      id: "business-housing",
      title: "Элитное жилье",
      image: housingBusinessImg,
      yearInflation: data[0].year,
      monthInflation: data[0].month,
    };

    const comfort: Item = {
      id: "comfort-housing",
      title: "Типовое жилье",
      image: housingComfortImg,
      yearInflation: data[1].year,
      monthInflation: data[1].month,
    };

    return [business, comfort];
  }
</script>

<div class="flex flex-col flex-1">
  <div class="select mx-auto mt-4 mb-2 flex-none">
    <SignleSelect
      bind:value={region}
      items={[
        { label: "Москва", value: "Moscow" },
        { label: "Московская область", value: "Moscow Oblast" },
        { label: "Россия", value: "Russia" },
      ]}
    />
  </div>

  {#await fetchData(region)}
    <GenericLoader />
  {:then data}
    <InflationGrid items={getHousingItems(data)} />
  {:catch error}
    <GenericError {error} />
  {/await}
</div>
