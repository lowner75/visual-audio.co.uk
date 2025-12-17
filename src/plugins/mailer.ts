// src/plugins/mailer.ts

import fp from "fastify-plugin";
import nodemailer, { SentMessageInfo } from "nodemailer";

export default fp(async (fastify) => {

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports ...
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  console.log("Mailer transporter configured.");

  fastify.decorateReply("sendEmail",
    async function (options: {
      to: string;
      subject: string;
      html: string;
      from?: string;
      cc?: string | string[] | null,
      bcc?: string | string[] | null
      attachments?: Array<{ filename: string; path: string }>;
    }): Promise<SentMessageInfo> {
      
      // Only include bcc if it's a string or array — ignore null ...
      const mailOptions: Parameters<typeof transporter.sendMail>[0] = {
        from: options.from || `"Visual Audio" <${process.env.SMTP_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        ...(options.cc ? { cc: options.cc } : {}),
        ...(options.bcc ? { bcc: options.bcc } : {}),
        ...(options.attachments ? { attachments: options.attachments } : {}),
      };

      return transporter.sendMail(mailOptions);
    }
  );

});