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

    // Upload /dist
    console.log("Uploading /dist ...");
    await sftp.uploadDir(path.resolve("./dist"), process.env.SFTP_DIST_PATH || "/dist");

    // Upload /public
    console.log("Uploading /public ...");
    await sftp.uploadDir(path.resolve("./public"), process.env.SFTP_PUBLIC_PATH || "/public");
    
    // Upload /views
    console.log("Uploading /views ...");
    await sftp.uploadDir(path.resolve("./views"), process.env.SFTP_VIEWS_PATH || "/views");

    console.log("Deployment complete :)");
  } catch (err) {
    console.error("Deployment failed:", err);
  } finally {
    await sftp.end();
  }
}

deploy();