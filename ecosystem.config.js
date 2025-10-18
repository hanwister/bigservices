module.exports = {
  apps: [
    {
      name: "node-red-61021",
      script: "node-red",
      // args: "-p 61021 --userDir ./data --safe",
      args: "-p 61021 --userDir ./data",
      exec_mode: "fork",
      watch: false,
      autorestart: true,
      max_restarts: 2,
      restart_delay: 100,
      cwd: "./node-red",
      env: {
        TL_REDIS_URL: "redis://default:anh08091998t@remote1.tolife.me:6379",
        TL_HASURA_URL: "http://remote1.tolife.me:18080",
        TL_POSTGRES_URL: "postgresql://postgres:buuandbee@db1.tolife.me:5432/postgres",
        TL_S3_ACCOUNT_ID: "https://cabeebbd339be94fb532e563a50ffd18.r2.cloudflarestorage.com",
        TL_S3_ACCESS_KEY_ID: "6fb7e17a9d03336755e649f2af7feaa6",
        TL_S3_SECRET_ACCESS_KEY: "797ef419d1d6ecb177cd968c4ce74dcecfaf5af67bd98cc8aac61fd442d84e2c",
        TL_S3_BUCKET_NAME: 'dudu-bucket',
        NODE_ENV: "development",
      },
      env_development: {
        NODE_ENV: "development",
        TL_GRAPHQL_URL: "http://localhost:4081/graphql"
      },
      env_production: {
        NODE_ENV: "production",
        TL_GRAPHQL_URL: "http://192.168.31.199:4081/graphql"
      }
    },
    {
      name: "node-red-60080",
      script: "node-red",
      args: "-p 60080 --userDir ./web_data",
      exec_mode: "fork",
      watch: false,
      autorestart: true,
      max_restarts: 2,
      restart_delay: 100,
      cwd: "./node-red",
      env: {
        TL_REDIS_URL: "redis://default:anh08091998t@remote1.tolife.me:6379",
        TL_HASURA_URL: "http://remote1.tolife.me:18080",
        TL_POSTGRES_URL: "postgresql://postgres:buuandbee@db1.tolife.me:5432/postgres",
        TL_S3_ACCOUNT_ID: "https://cabeebbd339be94fb532e563a50ffd18.r2.cloudflarestorage.com",
        TL_S3_ACCESS_KEY_ID: "6fb7e17a9d03336755e649f2af7feaa6",
        TL_S3_SECRET_ACCESS_KEY: "797ef419d1d6ecb177cd968c4ce74dcecfaf5af67bd98cc8aac61fd442d84e2c",
        TL_S3_BUCKET_NAME: 'dudu-bucket',
        NODE_ENV: "development",
      },
      env_development: {
        NODE_ENV: "development",
        TL_GRAPHQL_URL: "http://localhost:4081/graphql"
      },
      env_production: {
        NODE_ENV: "production",
        TL_GRAPHQL_URL: "http://192.168.31.199:4081/graphql"
      }
    }
  ]
};