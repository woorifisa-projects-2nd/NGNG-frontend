import ColorMode from "./ColorMode";
import AtferLoginMenu from "./AfterLoginMenu";
import BeforeLoginMenu from "./BeforeLoginMenu";
import { useContext } from "react";
import { UserContext } from "@/providers/UserContext";

export default function Menu() {
  const { getUser } = useContext(UserContext);
  const user = getUser();
  console.log("user", user);

  const isLogin = user !== undefined;

  return (
    <div className="flex justify-between items-center gap-4">
      {isLogin ? <AtferLoginMenu /> : <BeforeLoginMenu />}
      <ColorMode />
    </div>
  );
}
