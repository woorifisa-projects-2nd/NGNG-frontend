import { Metadata, ResolvingMetadata } from "next";
import React from "react";

type Props = {
  params: { userId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params

  const id = params.userId;

  // fetch data
  const userInfo = await fetch(
    `${process.env.BACKEND_URL}/products/${id}`
  ).then((res) => res.json());

  return {
    // title: userInfo.name + "이야",
    openGraph: {
      description: userInfo.name + "입니다.",
    },
  };
}

export async function generateStaticParams() {
  // console.log(process.env.TEST);

  // const posts = await fetch('https://.../posts').then((res) => res.json())

  return [
    {
      userId: process.env.TEST,
    },
  ];
}

const delayFetch = (url: any, options?: any) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(fetch(url, options));
    }, options.delay);
  });

export default async function Page({ params, searchParams }: Props) {
  const userInfo = await delayFetch(`/products/${params.userId}`, {
    delay: 2000,
  }).then((res: any) => res.json());

  return (
    <div>
      <p>User hi {userInfo.title}</p>
    </div>
  );
}
