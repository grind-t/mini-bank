<script lang="ts">
  import { getUserContext } from "$lib/auth/context";
  import type { Snippet } from "svelte";

  const user = getUserContext();

  let {
    sticky,
    offsetHeight = $bindable(),
    children,
  }: { sticky?: boolean; offsetHeight?: number; children: Snippet } = $props();
</script>

<li
  bind:offsetHeight
  class={[
    "list-row [&&]:gap-4",
    user
      ? "[&&]:grid-cols-[3rem_3fr_2fr_2fr_2fr]"
      : "[&&]:grid-cols-[3fr_2fr_2fr_2fr]",
    sticky && "[&&]:sticky [&&]:top-0 [&&]:bg-base-100 [&&]:z-10",
  ]}
>
  {@render children()}
</li>
