type AccountStatus =
  | "ACCOUNT_STATUS_UNSPECIFIED"
  | "ACCOUNT_STATUS_NEW"
  | "ACCOUNT_STATUS_OPEN"
  | "ACCOUNT_STATUS_CLOSED"
  | "ACCOUNT_STATUS_ALL";

export function tbankFetch(
  path: string,
  method: string,
  body?: Record<string, unknown>,
) {
  return fetch(
    `https://invest-public-api.tinkoff.ru/rest/${path}`,
    {
      method,
      headers: {
        "accept": "application/json",
        "Authorization": `Bearer ${Deno.env.get("TBANK_TOKEN")}`,
        "Content-Type": "application/json",
      },
      body: body && JSON.stringify(body),
    },
  );
}

export async function getAccounts(status: AccountStatus) {
  try {
    const response = await tbankFetch(
      "tinkoff.public.invest.api.contract.v1.SandboxService/GetSandboxAccounts",
      "POST",
      { status },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return {};
  }
}

export async function openSandboxAccount(name: string) {
  const response = await tbankFetch(
    "tinkoff.public.invest.api.contract.v1.SandboxService/OpenSandboxAccount",
    "POST",
    { name },
  );

  return response.json();
}
