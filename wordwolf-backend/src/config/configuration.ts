export default () => ({
  port: parseInt(process.env.PORT ?? "3010", 10) || 3010, // NestJSのサーバが起動するポート
  dynamodb: {
    region: process.env.DYNAMODB_REGION ?? "ap-northeast-1",
    endpoint: process.env.DYNAMODB_ENDPOINT,
  },
});
