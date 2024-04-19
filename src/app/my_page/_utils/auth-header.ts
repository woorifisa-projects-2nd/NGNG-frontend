export const getAccessToken = () => {
  return `Bearer ${localStorage.getItem("accessToken")?.slice(1, -1)}`;
};
