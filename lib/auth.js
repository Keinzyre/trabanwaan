import { compare, hash } from "bcryptjs";
import useSWR from "swr";

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export async function createUser(
  firstName,
  lastName,
  email,
  accountType,
  password
) {
  const response = await fetch("api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ firstName, lastName, email, accountType, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

export async function getUser(baseUrl, userId) {
  const response = await fetch(baseUrl + "/api/user/" + userId);

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data || "something went wrong");
  }
  /* console.log(data, "getuser auth file"); */
  return data;
}

export async function updateWorkerAccount(
  worker_id,
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
  confirmPassword
) {
  const response = await fetch("api/updateworker?update=account", {
    method: "PUT",
    body: JSON.stringify({
      worker_id,
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

export async function updateWorkerProfile(
  worker_id,
  avatar,
  introduction,
  service,
  startingCost,
  area
) {
  const response = await fetch("api/updateworker?update=profile", {
    method: "PUT",
    body: JSON.stringify({
      worker_id,
      avatar,
      introduction,
      service,
      startingCost,
      area,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

export async function searchUser(keyword, service, area, rating) {
  const urlApi = `/api/user/search?keyword=${keyword}&service=${service}&area=${area}&rating=${rating}`;
  console.log(urlApi, "url api");
  const response = await fetch(urlApi);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "something went wrong");
  }
  console.log(data, "getuser lib auth file");
  return data;
}

const fetcher = (url) => fetch(url).then((r) => r.json());

export function useUser(id) {
  const { data, error, isValidating, mutate } = useSWR(
    `/api/user/${id}`,
    fetcher
  );
  console.log(isValidating, " isValidating useUser hook");
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    isValidating: isValidating,
    mutate,
  };
}
