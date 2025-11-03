import { LOGIN_URL } from "./API_URLS";

export async function login(username: string, password: string) {
  const userPassDTO: any = {
    username: `${username}`,
    password: `${password}`,
  };

  try {
    const response = await fetch(`${LOGIN_URL}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: userPassDTO,
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message);
    }

    return await response.text();
  } catch (error: any) {
    throw new Error(error.message);
  }
}
