export const getAccessToken = () => {
    return `${localStorage.getItem("accessToken")?.replaceAll("\"", "")}`;
};