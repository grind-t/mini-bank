<script lang="ts">
  import { getUserContext } from "$lib/auth/context";

  const user = getUserContext();
</script>

<div class="flex flex-col h-full">
  {#if user}
    <div class="flex mt-4 mx-2">
      <div class="avatar">
        <div class="w-12 rounded-full">
          <img src={user.image} alt="" />
        </div>
      </div>
      <div class="flex flex-col ml-2">
        <div class="text-md text-left">{user.name}</div>
        <div class="text-sm text-left">{user.email}</div>
      </div>
    </div>

    <a href="/auth/signout" class="btn btn-ghost mt-auto text-error">Выйти</a>
  {:else}
    <a class="btn m-auto" href="/auth/signin">Войти</a>
  {/if}
</div>
