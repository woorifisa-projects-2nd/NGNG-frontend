import ColorMode from "./ColorMode";
import AtferLoginMenu from "./AfterLoginMenu";
import BeforeLoginMenu from "./BeforeLoginMenu";

export default function Menu() {
  // TODO : 로그인여부 확인
  const isLogin = true;

  return (
    <div className="flex justify-between items-center gap-4">
      {isLogin ? <AtferLoginMenu /> : <BeforeLoginMenu />}
      <ColorMode />
    </div>
  );
}
