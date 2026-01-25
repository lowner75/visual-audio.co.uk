module.exports = {
  apps: [
    {
      name: "visual-audio",
      script: "dist/start.js",
      env: {
        NODE_ENV: "development",
        PORT: 4000
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
};