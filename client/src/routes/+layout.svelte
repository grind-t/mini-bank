<script lang="ts">
  import AuthLoader from "$lib/auth/AuthLoader.svelte";
  import ToastHub from "$lib/ui/ToastHub.svelte";
  import Tabs from "./Tabs.svelte";
  import type { Snippet } from "svelte";
  import "../app.css";

  let { children }: { children: Snippet } = $props();
</script>

<AuthLoader>
  <ToastHub>
    <div class="flex flex-col h-full">
      <div class="flex flex-col flex-1">
        {@render children()}
      </div>
      <Tabs />
    </div>
  </ToastHub>
</AuthLoader>
