import { User } from "@/providers/UserContext";

export const getAccessToken = async () => {
  if (typeof window !== "undefined") {
    let token = localStorage.getItem("accessToken")?.replaceAll('"', "");

    const response = await fetch("/api/users", {
      headers: {
        Authorization: token || "",
      },
    });

    if (response.status === 401) {
      alert("유효하지 않은 인증 정보입니다.");

      return "";
    }

    setAccessToken(response);

    token = localStorage.getItem("accessToken")?.replaceAll('"', "");

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
};
