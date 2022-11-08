const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      "react-native-reanimated/plugin",
      // [
      //   "module-resolver",
      //   {
      //     root: ["./"],
      //     alias: {
      //       "@src": path.resolve(__dirname, "src"),
      //       "@assets": path.resolve(__dirname, "src/@core/assets"),
      //       "@components": path.resolve(__dirname, "src/@core/components"),
      //       "@layouts": path.resolve(__dirname, "src/@core/layouts"),
      //       "@styles": path.resolve(__dirname, "src/@core/scss"),
      //       "@redux": path.resolve(__dirname, "src/redux"),
      //       "@configs": path.resolve(__dirname, "src/configs"),
      //       "@utils": path.resolve(__dirname, "src/utility/Utils"),
      //       "@hooks": path.resolve(__dirname, "src/utility/hooks"),
      //       "@api": path.resolve(__dirname, "src/studio/api"),
      //       "@css": path.resolve(__dirname, "src/assets/css"),
      //       "@views": path.resolve(__dirname, "src/views"),
      //       "@studio": path.resolve(__dirname, "src/studio/components"),
      //     },
      //   },
      // ],
    ],
  };
};
