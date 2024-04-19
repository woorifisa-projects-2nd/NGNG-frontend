"use client";
import { Product } from "../[id]/page";
import ImageUploadBox from "./ImageUploadBox";
import { useEffect, useState } from "react";
import Input from "@/components/common/inputs/Input";
import DropDown from "@/components/common/drop_down/DropDown";
import Radio from "@/components/common/inputs/Radio";
import CheckBox from "@/components/common/inputs/CheckBox";
import { CategoryType, categories, status } from "@/utils";

type TabContentProps = {
    data: Product;
    onChangeData: (product: Product) => void;
};
export default function TabContent({ data, onChangeData }: TabContentProps) {
    const [imageId, setImageId] = useState<number>(-1);

    const fullfillSaveCondition: boolean =
        data.images.length > 0 &&
        data.title.length > 0 &&
        data.category.id > 0 &&
        data.status.id > 0 &&
        data.price !== undefined &&
        data.content.length > 0

    useEffect(() => {
        // 상태를 부모 컴포넌트에 전달
        onChangeData({
            ...data,
            isFullfillSaveCondition: fullfillSaveCondition,
        });
    }, [fullfillSaveCondition]);

    const changeImages = (image: File) => {
        if (data.images.length < 10) {
            setImageId(imageId - 1); // 이미지 아이디 업데이트
            onChangeData({
                ...data,
                images: [...data.images, { id: imageId, imageURL: image, visible: true }],
            });
        }
    };

    const deleteImage = (id: number) =>
        onChangeData({
            ...data,
            images: data.images.filter((img) => img.id !== id),
        });

    const changeTitle = (newTitle: string) =>
        onChangeData({
            ...data,
            title: newTitle,
        });

    const changeCategory = (newCategory: CategoryType) =>
        onChangeData({
            ...data,
            category: {
                id: newCategory.id,
                name: newCategory.name
            }
        });


    const changeStatus = (statusId: string) => {
        const selectedStatus = status.find((s) => s.id.toString() === statusId);
        if (selectedStatus) {
            onChangeData({
                ...data,
                status: {
                    id: selectedStatus.id,
                    name: selectedStatus.name
                }
            });
        }
    }



    const changePurchaseAt = (purchaseAt: string) => {
        onChangeData({
            ...data,
            purchaseAt: purchaseAt,
        });
    }

    const changeIsEscrow = (newValue: string) => {
        onChangeData({
            ...data,
            isEscrow: newValue === "true",
        });
    }

    const chanagePrice = (newPrice: string) => {
        onChangeData({
            ...data,
            price: parseFloat(newPrice.replace(/[^0-9.-]+/g, "")),
        });
    }

    const changeContent = (newContent: string) => {
        onChangeData({
            ...data,
            content: newContent,
        });
    }

    const changeDiscountable = () => {
        onChangeData({
            ...data,
            discountable: !data.discountable,
        });
    }

    const changeTags = (newTag: string) => {
        const newTags = newTag.split(",").map(tag => ({ tagName: tag.trim() }));
        onChangeData({
            ...data,
            tags: newTags,
        });
    }

    const changeFreeshipping = () => {
        onChangeData({
            ...data,
            freeShipping: !data.freeShipping,
        });
    }



    return (
        <div className="grid grid-cols-1 gap-4 pb-20">
            <div className="flex  items-start justify-start">
                <div className="text-lg font-medium min-w-24">
                    <div className="flex">
                        상품이미지<p className="text-red-600">*</p>
                    </div>
                    <div className="flex">
                        (<p className="text-point-color">{data.images.length}</p>/10)
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {Array.from(
                        {
                            length:
                                data.images.length < 10
                                    ? data.images.length + 1
                                    : data.images.length,
                        },
                        (_, index) => index
                    ).map((item, index) => (
                        <ImageUploadBox
                            key={index}
                            image={data.images[index]}
                            uploadImage={changeImages}
                            deleteImage={deleteImage}
                        />
                    ))}
                </div>
            </div>
            <div className="flex  items-center justify-start">
                <div className="flex text-lg font-medium min-w-24">
                    상품명<p className="text-red-600">*</p>
                </div>

                <Input
                    value={data.title}
                    onChange={changeTitle}
                    placeholder="한글, 숫자, 영어, 특수문자만 입력하세요."
                    width={684}
                    height={45}
                />
            </div>
            <div className="flex items-center justify-start">
                <div className="flex text-lg font-medium  min-w-24">
                    카테고리<p className="text-red-600">*</p>
                </div>
                <DropDown
                    data={categories.map((category) => {
                        return { id: category.id, name: category.name };
                    })}
                    selected={categories.find(
                        (category) => category.id === data.category.id
                    )}
                    onClickItem={changeCategory}
                    placeholder="카테고리를 선택해주세요."
                />
            </div>
            <div className="flex  items-start justify-start">
                <div className="flex text-lg font-medium  min-w-24">
                    상품상태<p className="text-red-600">*</p>
                </div>
                <div>
                    {status.map((stat) => {
                        return (
                            <div
                                className="flex justify-start items-center mb-4"
                                key={stat.id}
                            >
                                <Radio
                                    name="status"
                                    value={stat.id.toString()}
                                    onChange={changeStatus}
                                    selectedOption={data.status.id.toString()}
                                />
                                {stat.name}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="flex  items-center justify-start">
                <div className="flex text-lg font-medium  min-w-24">구매시기</div>
                <Input
                    width={276}
                    onChange={changePurchaseAt}
                    value={data.purchaseAt ?? ""}
                    placeholder="구매년도를 입력해 주세요."
                />
            </div>
            <div className="flex  items-start justify-start">
                <div className="flex text-lg font-medium  min-w-24">
                    거래방식<p className="text-red-600">*</p>
                </div>
                <div>
                    <div className="flex justify-start items-center mb-4">
                        <Radio
                            name="isEscrow"
                            onChange={changeIsEscrow}
                            selectedOption={data.isEscrow.toString()}
                            value="true"
                        />
                        안심거래
                    </div>
                    <div className="flex justify-start items-center">
                        <Radio
                            name="isEscrow"
                            onChange={changeIsEscrow}
                            selectedOption={data.isEscrow.toString()}
                            value="false"
                        />
                        일반거래
                    </div>
                </div>
            </div>
            <div className="flex  items-center justify-start">
                <div className="flex text-lg font-medium  min-w-24">
                    가격<p className="text-red-600">*</p>
                </div>
                <Input
                    onChange={chanagePrice}
                    value={data.price?.toLocaleString()}
                    placeholder="가격을 입력해 주세요."
                    width={276}
                />
                <span className="text-text-gray relative right-7">원</span>
                <CheckBox
                    onChange={changeDiscountable}
                    checked={data.discountable}
                    label="할인 가능"
                />
                <div className="flex items-center ml-4">
                    <CheckBox
                        onChange={changeFreeshipping}
                        checked={data.freeShipping}
                        label="배송비 포함"
                    />
                </div>
            </div>
            <div className="flex  items-start justify-start">
                <div className="flex text-lg font-medium  min-w-24">
                    설명<span className="text-red-600">*</span>
                </div>
                <textarea
                    className="rounded-md border-[1px] border-black/15  w-full focus:outline-none focus:border-point-color p-4 h-[530px] resize-none"
                    value={data.content}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        changeContent(e.currentTarget.value)
                    }
                    placeholder="상품에 대한 설명을 적어주세요."
                />
            </div>
            <div className="flex  items-center justify-start">
                <div className="flex text-lg font-medium  min-w-24">태그</div>
                <Input
                    onChange={changeTags}
                    placeholder="태그"
                    value={data.tags.map((tag) => tag.tagName).join(", ")}
                />
            </div>
        </div>
    );
}
