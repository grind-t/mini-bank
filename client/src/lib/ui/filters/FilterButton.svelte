<script lang="ts">
  import FunnelMicro from "$lib/ui/icons/FunnelMicro.svelte";

  let { label, onClick }: { label: string; onClick?: () => void } = $props();
</script>

<button onclick={onClick} aria-label={label} class="w-fit">
  <FunnelMicro />
</button>
