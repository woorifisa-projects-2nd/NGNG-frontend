export const getAccessToken = () => {

  if (typeof window !== "undefined") {

    const token = localStorage.getItem("accessToken")?.replaceAll('\"', "");

    return token !== undefined ? `${token}` : "";
  } else {

    return "";
  }
};

export const setAccessToken = (response: Response) => {

  const token = response.headers.get("Authorization");

  if (token !== null) {

    localStorage.setItem("accessToken", JSON.stringify(token));
  }
}