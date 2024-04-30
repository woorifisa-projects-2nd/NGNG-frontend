"use client";
import useMainPageProductSWR, {
  MainPageProduct,
} from "./_hooks/useMainPageProduct";
import Up from "./_design/SVG/ArrowCircleUp.svg";
import Skelleton from "./_components/Skelleton";
import { useCallback } from "react";
import BannerAndItems from "./_components/BannerAndItems";

export default function Main() {
  const { data, isLoading } = useMainPageProductSWR();

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []); // 의존성 배열이 비어있으므로 이 함수는 컴포넌트가 처음 마운트될 때만 생성됩니다.

  if (isLoading || data === undefined) {
    return <Skelleton />;
  }

  // 데이터를 8개씩 잘라서 배열에 넣고 각각을 렌더링
  const renderData = () => {
    const chunks: MainPageProduct[][] = [];
    const chunkSize = 8;
    const length = data.length;
    for (let i = 0; i < length; i += chunkSize) {
      chunks.push(data.slice(i, i + chunkSize));
    }
    return chunks.map((chunk, index) =>
      BannerAndItems({ dataChunk: chunk, index, key: `${index}` })
    );
  };

  return (
    <div className="w-full px-5 md:px-32 flex justify-center">
      <div className="pb-20">
        <div className="max-w-[1024px] w-full">
          <>{renderData()}</>
        </div>
        <Up
          className="fixed bottom-10 right-10 cursor-pointer fill-black dark:fill-white z-10"
          onClick={scrollToTop}
        />
      </div>
    </div>
  );
}
