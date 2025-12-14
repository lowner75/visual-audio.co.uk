// deploy.js

const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const SftpClient = require("ssh2-sftp-client");

dotenv.config();

const sftp = new SftpClient();

async function deploy() {
  try {
    const config = {
      host: process.env.SFTP_HOST,
      port: parseInt(process.env.SFTP_PORT || "22", 10),
      username: process.env.SFTP_USERNAME,
    };

    if (process.env.SFTP_PASSWORD) {
      config.password = process.env.SFTP_PASSWORD;
    } else if (process.env.SFTP_PRIVATE_KEY_PATH) {
      config.privateKey = fs.readFileSync(process.env.SFTP_PRIVATE_KEY_PATH, "utf-8");
    } else {
      throw new Error("You must provide either SFTP_PASSWORD or SFTP_PRIVATE_KEY_PATH in .env");
    }

    await sftp.connect(config);
    console.log("Connected to SFTP server");

    // Upload /dist ...
    console.log("Uploading /dist ...");
    await sftp.uploadDir(path.resolve("./dist"), process.env.SFTP_DIST_PATH || "/dist");

    // Upload /public/build ...
    console.log("Uploading /public/build ...");
    await sftp.uploadDir(path.resolve("./public/build"), process.env.SFTP_BUILD_PATH || "/public/build");

    // Upload /public/css ...
    console.log("Uploading /public/css ...");
    await sftp.uploadDir(path.resolve("./public/css"), process.env.SFTP_CSS_PATH || "/public/css");
    
    // Upload /public/js ...
    console.log("Uploading /public/js ...");
    await sftp.uploadDir(path.resolve("./public/js"), process.env.SFTP_JS_PATH || "/public/js");
    
    // Upload /src/views if required ...
    //console.log("Uploading /src/dist/views ...");
    //await sftp.uploadDir(path.resolve("./dist/views"), process.env.SFTP_VIEWS_PATH || "/views");

    console.log("Deployment complete :)");
  } catch (err) {
    console.error("Deployment failed:", err);
  } finally {
    await sftp.end();
  }
}

deploy();