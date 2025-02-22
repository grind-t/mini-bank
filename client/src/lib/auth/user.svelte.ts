export type User = {
  name: string;
  password: string;
  tInvestAccountId: string;
};

export const user = $state<User>(
  JSON.parse(String(localStorage.getItem("user"))) ?? {
    name: "admin",
    password: "",
    tInvestAccountId: "",
  }
);

$effect.root(() => {
  $effect(() => {
    localStorage.setItem("user", JSON.stringify($state.snapshot(user)));
  });
});
