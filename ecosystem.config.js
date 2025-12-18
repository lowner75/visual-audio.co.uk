module.exports = {
  apps: [
    {
      name: "visual-audio",
      script: "dist/server.js",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};