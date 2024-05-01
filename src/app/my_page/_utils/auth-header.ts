export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken")?.replaceAll('\"', "");
    return token !== undefined ? `${token}` : "";
  } else {
    return "";
  }
};
