<script lang="ts">
  import { executeDCAStrategy } from "$lib/common/api";
  import { user } from "$lib/auth/user.svelte";
  import Timeout from "$lib/common/components/Timeout.svelte";
  import Toast from "$lib/common/components/Toast.svelte";

  let executeDCAStrategyPromise =
    $state<ReturnType<typeof executeDCAStrategy>>();
</script>

<div class="flex flex-col h-full">
  <label class="input m-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6 mr-2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
      />
    </svg>
    <input
      value={user.password}
      type="password"
      placeholder="Пароль"
      onchange={(e) => {
        user.password = e.currentTarget.value;
      }}
    />
  </label>

  <label class="input m-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="size-6 mr-2"
    >
      <path
        d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z"
      />
    </svg>
    <input
      value={user.tInvestAccountId}
      type="text"
      placeholder="ID счета t-invest"
      onchange={(e) => {
        user.tInvestAccountId = e.currentTarget.value;
      }}
    />
  </label>

  <button
    class="btn btn-primary mt-auto mb-2 mx-2"
    onclick={() => {
      executeDCAStrategyPromise = executeDCAStrategy({
        strategyId: "bonds",
        accountId: user.tInvestAccountId,
      });
    }}
  >
    {#await executeDCAStrategyPromise}
      <span class="loading loading-ring"></span>
    {:then _}
      Запустить DCA
    {:catch e}
      <Toast class="alert alert-error">
        {e?.message}
      </Toast>
    {/await}
  </button>
</div>
