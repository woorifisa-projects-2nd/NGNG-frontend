import { Metadata, ResolvingMetadata } from "next";
import React from "react";
import TestCount from "./_compoents/TestCount";

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
  const userInfo = await fetch(`http://localhost:8080/user/${id}`).then((res) =>
    res.json()
  );

  return {
    // title: userInfo.name + "이야",
    openGraph: {
      description: userInfo.name + "입니다.",
    },
  };
}

const delayFetch = (url: any, options?: any) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(fetch(url, options));
    }, options.delay);
  });

export default async function Page({ params, searchParams }: Props) {
  const userInfo = await delayFetch(
    `http://localhost:8080/user/${params.userId}`,
    {
      delay: 2000,
    }
  ).then((res: any) => res.json());

  return (
    <div>
      <p>User hi {userInfo.name}</p>
      <TestCount />
    </div>
  );
}
