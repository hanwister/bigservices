module.exports = {
  apps: [
    {
      name: "node-red-61021",
      script: "node-red",
      args: "-p 61021 --userDir ./data",
      exec_mode: "fork",
      watch: false,
      cwd: "./node-red",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};