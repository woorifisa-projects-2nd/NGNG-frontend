// import withPWAInit from "@ducanh2912/next-pwa";

// const withPWA = withPWAInit({
//   dest: "public",
// });

export default ({
  // Your Next.js config
  reactStrictMode: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  async rewrites() {
    return {
      fallback: [
        {
          source: "/api/:path*",
          destination: "http://localhost:8080/:path*",
        },
        {
          source: "/products/:path*",
          destination: "http://127.0.0.1:8080/products/:path*",
        },
        {
          source: "/private-chats/:path*",
          destination: "http://localhost:8081/private-chats/:path*",
        },
        {
          source: "/transaction/:path*",
          destination: "http://localhost:8080/transaction/:path*",
        },
      ],
    };
  },
  trailingSlash: true,
  // 랜덤 이미지 가져올떄 허용 사이트로 나중에 삭제예정
  images: {
    minimumCacheTTL: 60,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost:3000",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "api.ngng.site",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "team3-ngng.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "**",
      },
    ],
  },
  //
  reactStrictMode: false,
  output: "standalone",
  basePath: "",
});

// /** @type {import('next').NextConfig} */
// const nextConfig = {

// };

// module.exports = withPWA(nextConfig);
// export default nextConfig;
