export const getAccessToken = () => {
  return `${localStorage.getItem("accessToken")?.slice(1, -1)}`;
};
