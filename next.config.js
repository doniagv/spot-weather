const nextConfig = {
  env: {
    WEATHER_KEY: process.env.WEATHER_KEY,
  },
  transpilePackages: ["antd", "@ant-design", "rc-util", "rc-pagination", "rc-picker", "rc-notification", "rc-tooltip", "rc-tree", "rc-table"],
};

export default nextConfig;
