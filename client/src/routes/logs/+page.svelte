<script lang="ts">
  import { getBonds, getDCAStrategyLogs } from "$lib/common/api";
  import { toRecord } from "@grind-t/toolkit";
  import dayjs from "dayjs";
  import Log from "./Log.svelte";

  async function getData() {
    const logs = await getDCAStrategyLogs({
      id: "bonds",
      from: dayjs().subtract(1, "week").toDate(),
      to: dayjs().toDate(),
    });

    const whitelist = logs.reduce((set, log) => {
      log.strategy.assets.forEach((v) => {
        set.add(v.isin);
      });

      return set;
    }, new Set<string>());

    const bonds = await getBonds({
      filter: {
        whitelist: Array.from(whitelist),
        yield: {
          lte: -1,
        },
      },
    });

    return [logs, toRecord(bonds, (v) => v.isin)] as const;
  }
</script>

<div class="flex flex-col h-full">
  {#await getData() then [logs, bonds]}
    {@const getAssetBody = (isin: string) => bonds[isin]}

    {#each logs as log}
      <Log {log} {getAssetBody} />
    {:else}
      Логи отсутсвуют
    {/each}
  {:catch}
    Ошибка
  {/await}
</div>
