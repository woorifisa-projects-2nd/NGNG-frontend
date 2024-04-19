import { useState } from "react";
import FirstPage from "./_pages/firstPage";
import SecondPage from "./_pages/secondPage";
import ThirdPage from "./_pages/thirdPage";

interface userInfo {
  name: string;
  email: string;
  password: string;
  nickname: string;
  phoneNumber: String;
};

export default function JoinPage() {


  const [user, setUser] = useState<userInfo>({
    name: "",
    email: "",
    password: "",
    nickname: "",
    phoneNumber: ""
  })

  const [currentPage, setCurrentPage] = useState(1);

  const renderPage = () => {

    switch (currentPage) {
      case 1:

        return (
          <FirstPage currentPage={currentPage} setCurrentPage={setCurrentPage}></FirstPage>
        )
      case 2:

        return (
          <SecondPage user={user} setUser={setUser} currentPage={currentPage} setCurrentPage={setCurrentPage}></SecondPage>
        )
      case 3:

        return (
          <ThirdPage user={user} setUser={setUser} currentPage={currentPage} setCurrentPage={setCurrentPage}></ThirdPage>
        )
      default:
        break;
    }
  }

  return (
    <>
      {renderPage()}
    </>
  )
};
