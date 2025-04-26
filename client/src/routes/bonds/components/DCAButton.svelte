<script lang="ts">
  import { trpc } from "$lib/trpc";
  import Toast from "$lib/ui/Toast.svelte";

  let dialog = $state<HTMLDialogElement | null>(null);
  let tInvestAccountId = $state("");
  let tInvestAccountToken = $state("");

  let executeDCAStrategyPromise = $state<Promise<void>>();
</script>

<button
  class="btn btn-circle btn-primary fixed bottom-14 right-6 p-6"
  onclick={() => dialog?.showModal()}>DCA</button
>

<dialog bind:this={dialog} class="modal">
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
        ✕
      </button>
    </form>

    <form
      onsubmit={(e) => {
        e.preventDefault();
        executeDCAStrategyPromise = trpc.dcaStrategies.execute
          .mutate({
            strategyId: "bonds",
            accountId: tInvestAccountId,
            accountToken: tInvestAccountToken,
          })
          .then(() => dialog?.close());
      }}
    >
      <h2>Стратегия DCA</h2>

      <label class="input w-full mt-4">
        <svg viewBox="0 0 24 24" fill="currentColor" class="size-6">
          <path
            d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z"
          />
        </svg>
        <input
          id="tInvestAccountId"
          name="tInvestAccountId"
          autocomplete="username"
          value={tInvestAccountId}
          type="text"
          placeholder="ID счета t-invest"
          onchange={(e) => {
            tInvestAccountId = e.currentTarget.value;
          }}
        />
      </label>

      <label class="input w-full mt-2">
        <svg viewBox="0 0 20 20" fill="currentColor" class="size-5">
          <path
            fill-rule="evenodd"
            d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
            clip-rule="evenodd"
          />
        </svg>

        <input
          id="tInvestAccountToken"
          name="tInvestAccountToken"
          value={tInvestAccountToken}
          type="password"
          autocomplete="current-password"
          placeholder="Токен счета t-invest"
          onchange={(e) => {
            tInvestAccountToken = e.currentTarget.value;
          }}
        />
      </label>

      <button class="btn btn-primary mt-4">
        {#await executeDCAStrategyPromise}
          <span class="loading loading-ring"></span>
        {:then _}
          Запустить
        {:catch e}
          <Toast class="alert alert-error">
            {e?.message}
          </Toast>
        {/await}
      </button>
    </form>
  </div>
</dialog>
