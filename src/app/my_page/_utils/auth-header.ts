import { jwtDecode } from "jwt-decode";

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    let token = sessionStorage.getItem("accessToken")?.replaceAll('"', "");

    return token !== undefined ? `${token}` : "";
  } else {
    return "";
  }
};

export const setAccessToken = (response: Response) => {
  const token = response.headers.get("Authorization");

  if (token !== null) {
    sessionStorage.setItem("accessToken", JSON.stringify(token));
    const roleToken = getAccessToken();

    document.cookie = `roleToken=${roleToken}`;
  }
};
