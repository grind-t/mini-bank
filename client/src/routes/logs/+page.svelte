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

    const allBondIds = logs.reduce((set, log) => {
      log.strategy.assets.forEach((v) => {
        set.add(v.id);
      });

      return set;
    }, new Set<string>());

    const bonds = await getBonds({
      filter: {
        whitelist: Array.from(allBondIds),
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
    {#each logs as log}
      <Log {log} assets={bonds} />
    {:else}
      Логи отсутсвуют
    {/each}
  {:catch}
    Ошибка
  {/await}
</div>
