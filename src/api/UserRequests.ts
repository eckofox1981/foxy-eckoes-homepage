import { getToken, setToken } from "../localstorage/Token";
import { User } from "../models/User";
import {
  GET_ALL_USERS_URL_ADMIN,
  GET_USER_INFO_URL,
  LOGIN_URL,
  REGISTER_USER_URL,
  UPDATE_USER_URL,
} from "./API_URLS";

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

export async function registerUser(
  user: User,
  password: string,
  passwordConfirm: string
) {
  const userCreateDTO = {
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: password,
    passwordConfirm: passwordConfirm,
  };

  try {
    const response = await fetch(REGISTER_USER_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userCreateDTO),
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message);
    }

    const jwtToken: string = await login(
      userCreateDTO.username,
      userCreateDTO.password
    );
    setToken(jwtToken);
    return "Registration completed, you are being directed to your account page.";
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function updateUser(user: User) {
  try {
    const response = await fetch(UPDATE_USER_URL, {
      method: "PUT",
      headers: {
        Authorization: getToken() ?? "",
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
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

//ADMIN

export async function getAllUsers() {
  try {
    const response = await fetch(GET_ALL_USERS_URL_ADMIN, {
      method: "GET",
      headers: {
        Authorization: getToken(),
      },
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message);
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
}
