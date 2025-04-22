<script lang="ts">
  import { getUserContext } from "$lib/auth/context";
  import type { Snippet } from "svelte";

  const user = getUserContext();

  let props: { children: Snippet; sticky?: boolean } = $props();
</script>

<li
  class={[
    "list-row [&&]:gap-4",
    user
      ? "[&&]:grid-cols-[3rem_3fr_2fr_2fr_2fr]"
      : "[&&]:grid-cols-[3fr_2fr_2fr_2fr]",
    props.sticky && "[&&]:sticky [&&]:top-0 [&&]:bg-base-100 [&&]:z-10",
  ]}
>
  {@render props.children()}
</li>
