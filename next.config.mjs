/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "your-image-domain.com", // Replace with your actual domain
        pathname: "/path-to-images/**",
      },
    ],
  },
};

export default nextConfig;
