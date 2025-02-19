<script lang="ts">
  import { page } from "$app/state";
  import "../app.css";
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
      href="/"
      class:tab-active={page.url.pathname === "/"}
    >
      Облигации
    </a>
    <a
      role="tab"
      class="tab"
      href="/settings"
      class:tab-active={page.url.pathname === "/settings"}
    >
      Настройки
    </a>
  </div>
</div>
