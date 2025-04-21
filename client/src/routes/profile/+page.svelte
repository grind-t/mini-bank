<script lang="ts">
  import { user } from "$lib/auth/user.svelte";
  import type { Session } from "@auth/sveltekit";
  import { executeDCAStrategy } from "$lib/common/api";
  import Toast from "$lib/common/components/Toast.svelte";

  let executeDCAStrategyPromise =
    $state<ReturnType<typeof executeDCAStrategy>>();

  async function getSession(): Promise<Session | null> {
    const response = await fetch("/auth/session");
    const data = await response.json();

    return data;
  }
</script>

<div class="flex flex-col h-full p-4">
  {#await getSession() then session}
    {#if session}
      <div class="flex">
        <div class="avatar">
          <div class="w-12 rounded-full">
            <img src={session.user?.image} alt="" />
          </div>
        </div>
        <div class="flex flex-col ml-2">
          <div class="text-md text-left">{session.user?.name}</div>
          <div class="text-sm text-left">{session.user?.email}</div>
        </div>
        <a
          href="/auth/signout"
          aria-label="Выйти"
          class="ml-auto my-auto text-error"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z"
              clip-rule="evenodd"
            />
            <path
              fill-rule="evenodd"
              d="M6 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H6.75A.75.75 0 0 1 6 10Z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </div>

      <label class="input mt-auto w-full">
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
        class="btn btn-primary mt-2"
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
    {:else}
      <div class="flex flex-col items-center justify-center h-full">
        <a class="btn" href="/auth/signin">Войти</a>
      </div>
    {/if}
  {/await}
</div>
