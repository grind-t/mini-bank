export const user = $state({
  name: "admin",
  password: localStorage.getItem("password") || "",
});

$effect.root(() => {
  localStorage.setItem("password", user.password);
});
