<script lang="ts">
  let props: { error: unknown } = $props();

  function getErrorText(e: unknown) {
    if (typeof e === "string") {
      return e;
    }

    if (e instanceof Error) {
      return e.message;
    }

    return String(e);
  }
</script>

<div class="flex flex-col h-full items-center justify-center p-4">
  Ошибка ({getErrorText(props.error)})
</div>
