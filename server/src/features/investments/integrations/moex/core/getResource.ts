export function getMoexResource(
  path: string,
  block: string,
  params: Record<string, string | number | undefined> = {}
) {
  const url = new URL(`https://iss.moex.com/iss/${path}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) return;
    url.searchParams.set(key, value.toString());
  });

  url.searchParams.set("iss.meta", "off");
  url.searchParams.set("iss.only", block);

  return url;
}
