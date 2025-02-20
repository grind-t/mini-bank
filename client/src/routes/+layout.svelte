<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/state";
  import "../app.css";

  const bondsUrl = `${base}/`;
  const settingsUrl = `${base}/settings`;
</script>

<div class="flex flex-col h-full">
  <div class="flex flex-col flex-1">
    <slot />
  </div>
  <div
    role="tablist"
    class="tabs tabs-border sticky left-0 bottom-0 right-0 bg-base-100 flex-none"
  >
    <a
      role="tab"
      class="tab"
      href={bondsUrl}
      class:tab-active={page.url.pathname === bondsUrl}
    >
      Облигации
    </a>
    <a
      role="tab"
      class="tab"
      href={settingsUrl}
      class:tab-active={page.url.pathname === settingsUrl}
    >
      Настройки
    </a>
  </div>
</div>
