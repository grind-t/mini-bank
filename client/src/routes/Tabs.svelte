<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/state";
  import { getUserContext } from "$lib/auth/context";

  const profileUrl = `${base}/`;
  const bondsUrl = `${base}/bonds`;
  const logsUrl = `${base}/logs`;

  const user = getUserContext();
</script>

<div
  role="tablist"
  class="tabs tabs-border sticky left-0 bottom-0 right-0 bg-base-100 flex-none"
>
  <a
    role="tab"
    class="tab"
    href={profileUrl}
    class:tab-active={page.url.pathname === profileUrl}
  >
    Профиль
  </a>
  <a
    role="tab"
    class="tab"
    href={bondsUrl}
    class:tab-active={page.url.pathname === bondsUrl}
  >
    Облигации
  </a>
  {#if user}
    <a
      role="tab"
      class="tab"
      href={logsUrl}
      class:tab-active={page.url.pathname === logsUrl}
    >
      Логи
    </a>
  {/if}
</div>
