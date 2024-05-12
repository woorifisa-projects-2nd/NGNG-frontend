import DefaultLayout from "@/components/layouts/DefaultLayout";
import { Metadata, ResolvingMetadata } from "next";
import { ReactNode } from "react";

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;
  console.log("metadata :", id);

  // fetch data
  const product = (await fetch(
    `${process.env.BACKEND_URL}/products/${id}`
  ).then((res) => res.json())) as Product;

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  console.log(product);

  return {
    title: product.title,
    description: product.content,
    openGraph: {
      images: product.images.map((image) => image.imageURL),
    },
  };
}

export async function generateStaticParams() {
  console.log("staticParams");

  const ssgParmas = [
    {
      id: "2",
    },
    {
      id: "3",
    },
  ];

  // const posts = await fetch('https://.../posts').then((res) => res.json())

  return ssgParmas.map((v) => ({
    id: v.id,
  }));
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
