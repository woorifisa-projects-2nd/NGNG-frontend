import React, { useEffect, useRef, useState } from "react";
import { convertEnumToKeyValuesObject } from "../../_utils/convert";
import { imageUrlExtractExtension } from "../../_utils/extract";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PRODUCT_STATUS, PRODUCT_STATUS_SELLER } from "../../_constans/enum";
import ProductDetail from "../../_design/ProductDetail";

//

type Props = {
  product: Product;
  updateDate: (id: number) => void;
  chnageStatus: (status: string) => void;
  deleteProduct: (id: number) => void;
};

export default function SellProductDetail({
  product,
  updateDate,
  chnageStatus,
  deleteProduct,
}: Props) {
  const [productStatus, setProductStatus] = useState<number>(0);
  const transportNumber = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const changeProductStatus = (status: number) => {
    chnageStatus(productStatus + "");
  };
  const onDeleteProduct = () => {
    deleteProduct(product.id);
  };

  const upadteTransportNumber = () => {
    console.log(transportNumber.current?.value);
    changeProductStatus(PRODUCT_STATUS["배송 중"]);
  };

  useEffect(() => {
    setProductStatus(product.transactionDetails?.status?.id || 0);
  }, []);

  const RenderTranscationSatus: { [name: number]: React.JSX.Element } = {
    // [PRODUCT_STATUS_SELLER["입금 대기"]]: <p>입금 대기</p>,
    [PRODUCT_STATUS_SELLER["입금 완료"]]: (
      <div className="flex gap-2">
        <label htmlFor="송장">송장 번호를 입력하세요 </label>
        <input
          className={`rounded-md border-[1px] border-black/15 focus:outline-none focus:border-point-color `}
          type="text"
          id="송장"
          ref={transportNumber}
        />
        <button
          className=" bg-green-900 rounded-md p-2 inline-flex items-center justify-center text-gray-200 hover:text-gray-100 hover:bg-green-700 "
          onClick={() => upadteTransportNumber()}
        >
          발송
        </button>
      </div>
    ),
    // [PRODUCT_STATUS_SELLER["배송중"]]: <div>배송중</div>,
    // [PRODUCT_STATUS_SELLER["배송완료"]]: <div>배송완료</div>,
  };

  return (
    <>
      <div className="flex gap-2 flex-col p-6">
        {/* 버튼 부분 */}
        <div className="flex flex-col gap-2 my-2">
          <div className="flex flex-col gap-2 items-end">
            {product?.transactionDetails?.status?.status ? (
              <>
                {/* 거래가 성사되어 진행 중일떄 */}
                <div className="flex">
                  <span>현재 거래 상태 :</span>
                  <span>{product.transactionDetails?.status?.status}</span>
                </div>
                {/* 상태에 따라 랜더 */}
                {RenderTranscationSatus[product.transactionDetails.status.id]}
                {/* // 거래 성사 된 상품일시 */}
                {/* <div className="flex gap-2 w-full">
                  <select
                    className="px-2 flex-1 w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={productStatus}
                    onChange={(e) => setProductStatus(+e.target.value)}
                  >
                    <option value=""></option>
                    {convertEnumToKeyValuesObject(PRODUCT_STATUS_SELLER).map(
                      (status) => (
                        <option
                          className="disabled:text-red-500"
                          key={status.value}
                          value={status.value}
                          disabled={
                            status.value < product.transactionDetails!.status.id
                          }
                        >
                          {status.key}
                        </option>
                      )
                    )}
                  </select> */}
                {/* <button
                  type="button"
                  className={` bg-blue-900 rounded-md p-2 inline-flex items-center justify-center text-gray-200 hover:text-gray-100 hover:bg-blue-700 `}
                  onClick={() => changeProductStatus()}
                >
                  상태변경
                </button> */}
              </>
            ) : (
              <>
                {/* // 거래 중인 상품일시 */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    className={` bg-red-900 rounded-md p-2 inline-flex items-center justify-center text-gray-200 hover:text-gray-100 hover:bg-red-700 `}
                    onClick={() => onDeleteProduct()}
                  >
                    삭제버튼
                  </button>
                  <button
                    type="button"
                    className={` bg-green-900 rounded-md p-2 inline-flex items-center justify-center text-gray-200 hover:text-gray-100 hover:bg-green-700 `}
                    onClick={() => updateDate(product.id)}
                  >
                    끌어올리기
                  </button>
                  <button
                    type="button"
                    className={` bg-green-900 rounded-md p-2 inline-flex items-center justify-center text-gray-200 hover:text-gray-100 hover:bg-green-700 `}
                    onClick={() => router.push("/my_page/modify/" + product.id)}
                  >
                    수정하기
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        {/* 제품 정보 렌더 */}
        <ProductDetail product={product} />
      </div>
    </>
  );
}
