<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/state";
  import ToastHub from "$lib/common/components/ToastHub.svelte";
  import "../app.css";

  const bondsUrl = `${base}/`;
  const logsUrl = `${base}/logs`;
  const profileUrl = `${base}/profile`;
</script>

<ToastHub>
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
        href={logsUrl}
        class:tab-active={page.url.pathname === logsUrl}
      >
        Логи
      </a>
      <a
        role="tab"
        class="tab"
        href={profileUrl}
        class:tab-active={page.url.pathname === profileUrl}
      >
        Профиль
      </a>
    </div>
  </div>
</ToastHub>
