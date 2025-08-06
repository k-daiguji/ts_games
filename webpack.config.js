module.exports = {
  mode: "production",
  entry: "./src/main.ts",
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.ts$/,
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
};
