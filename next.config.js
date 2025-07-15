
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  ...(isProd && {
    basePath: '/media-agua-colectivos',
    output: 'export',
  }),
};

module.exports = nextConfig;