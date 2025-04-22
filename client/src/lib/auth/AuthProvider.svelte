<script lang="ts">
  import type { Snippet } from "svelte";
  import type { Session } from "./api";
  import { setUserContext } from "./context";

  const { session, children }: { session: Session | null; children: Snippet } =
    $props();

  setUserContext(session?.user ?? null);
</script>

{@render children()}
