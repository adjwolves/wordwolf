export default () => ({
  port: parseInt(process.env.PORT ?? "3000", 10) || 3000, // NestJSのサーバが起動するポート
  dynamodb: {
    region: process.env.DYNAMODB_REGION ?? "ap-northeast-1",
    endpoint: process.env.DYNAMODB_ENDPOINT,
  },
});
