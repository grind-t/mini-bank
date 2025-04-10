<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";

  let props: { children: Snippet; sticky?: boolean } = $props();
</script>

<li
  class={[
    "list-row [&&]:grid-cols-[3rem_3fr_2fr_2fr_2fr] [&&]:gap-4",
    props.sticky && "[&&]:sticky [&&]:top-0 [&&]:bg-base-100 [&&]:z-10",
  ]}
>
  {@render props.children()}
</li>
