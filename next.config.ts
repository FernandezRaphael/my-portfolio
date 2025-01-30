import type { NextConfig } from "next";

const nextConfig = {
  images: {
    domains: [
      'portfolio-backend-production-0ee9.up.railway.app', // Backend de production
      'res.cloudinary.com', // Cloudinary
    ],
  },
};

export default nextConfig;

