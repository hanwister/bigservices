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
      restart_delay: 10000,
      cwd: "./node-red",
      env: {
        NODE_ENV: "production"
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
      restart_delay: 10000,
      cwd: "./node-red",
      env: {
        NODE_ENV: "production",
        GRAPHQL_URL: "http://192.168.31.199:4081/graphql"
      }
    }
  ]
};