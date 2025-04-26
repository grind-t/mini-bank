<script lang="ts">
  import type { Snippet } from "svelte";
  import { getSession } from "./api";
  import AuthProvider from "./AuthProvider.svelte";
  import GenericLoader from "$lib/ui/GenericLoader.svelte";
  import GenericError from "$lib/ui/GenericError.svelte";

  const { children }: { children: Snippet } = $props();
</script>

{#await getSession()}
  <GenericLoader />
{:then session}
  <AuthProvider {session}>
    {@render children()}
  </AuthProvider>
{:catch error}
  <GenericError {error} />
{/await}
