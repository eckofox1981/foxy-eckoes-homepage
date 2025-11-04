import { User } from "../models/User";
import { GET_USER_INFO_URL, LOGIN_URL } from "./API_URLS";

export async function login(username: string, password: string) {
  const userPassDTO: any = {
    username: `${username}`,
    password: `${password}`,
  };

  try {
    const response = await fetch(LOGIN_URL, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userPassDTO),
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

export async function getUser(jwtToken: string) {
  try {
    const response = await fetch(GET_USER_INFO_URL, {
      method: "GET",
      headers: {
        Authorization: jwtToken,
      },
    });
    if (!response.ok) {
      const message = await response.text();
      throw new Error(message);
    }

    const json = await response.json();

    return new User(
      json.userId,
      json.username,
      json.firstName,
      json.lastName,
      json.email,
      json.bookings,
      json.role,
      json.openIdProvider
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
}
