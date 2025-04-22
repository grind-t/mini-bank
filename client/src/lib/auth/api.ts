export type User = {
  id?: string;
  email?: string;
  name?: string;
  image?: string;
};

export type Session = {
  user?: User;
  expires: string;
};

export async function getSession(): Promise<Session | null> {
  const response = await fetch("/auth/session");

  if (!response.ok) {
    throw new Error("Failed to fetch session");
  }

  return await response.json();
}
