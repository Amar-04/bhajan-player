import nextPwa from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const isDev = process.env.NODE_ENV === 'development';

export default nextPwa({
  dest: 'public',
  disable: isDev,
  register: true,
  skipWaiting: true,
})(nextConfig);
