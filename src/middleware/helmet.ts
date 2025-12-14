import { FastifyPluginAsync } from "fastify";
import helmet from "@fastify/helmet";

const trusted = ["'self'"];
if (process.env.NODE_ENV !== "production") {
  trusted.push("http://localhost:*");
}

export const helmetMiddleware: FastifyPluginAsync = async (app) => {
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-eval'",
          "'unsafe-inline'",
          "https://*.visual-audio.co.uk",
          "https://www.google-analytics.com",
          "https://*.google-analytics.com",
          "https://www.googletagmanager.com",
          "https://*.googletagmanager.com",
          "https://www.google.com",
          "https://*.google.com",
          "https://www.addthis.com",
          "https://*.addthis.com",
        ],
        scriptSrcElem: [
          "'self'",
          "'unsafe-eval'",
          "'unsafe-inline'",
          "https://www.google-analytics.com",
          "https://*.google-analytics.com",
          "https://www.googletagmanager.com",
          "https://*.googletagmanager.com",
          "https://www.google.com",
          "https://*.google.com",
          "https://www.gstatic.com",
          "https://*.gstatic.com",
          "https://www.addthis.com",
          "https://*.addthis.com",
          "https://www.addthisedge.com",
          "https://*.addthisedge.com",
          "https://www.moatads.com",
          "https://*.moatads.com",
          "https://widgets.pinterest.com",
        ],
        childSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "https://*.addthis.com",
          "https://addthis.com",
        ],
        connectSrc: [
          "'self'",
          "'unsafe-eval'",
          "'unsafe-inline'",
          "https://sso.auth.wayfair.com/oauth/token",
          "https://stats.g.doubleclick.net",
          "https://www.google-analytics.com",
          "https://*.google-analytics.com",
          "https://www.googletagmanager.com",
          "https://*.googletagmanager.com",
          "https://www.google.com",
          "https://*.google.com",
          "https://www.addthis.com",
          "https://*.addthis.com",
        ],
        frameSrc: [
          "'self'",
          "'unsafe-eval'",
          "'unsafe-inline'",
          "https://*.google-analytics.com",
          "https://*.googletagmanager.com",
          "https://*.google.com/",
          "https://*.addthis.com",
        ],
        objectSrc: ["'none'"],
        styleSrc: ["'self'", "https: 'unsafe-inline'"],
        fontSrc: [
          "'self'",
          "data:",
          "'unsafe-eval'",
          "'unsafe-inline'",
          "https://*.google-analytics.com",
          "https://*.googletagmanager.com",
          "https://*.google.com/",
          "https://www.gstatic.com",
          "https://*.gstatic.com",
        ],
        imgSrc: [
          "'self'",
          "data:",
          "'unsafe-eval'",
          "'unsafe-inline'",
          "http://www.w3.org/2000/svg",
          "https://visual-audio.co.uk/",
          "https://www.google-analytics.com",
          "https://stats.g.doubleclick.net",
          "https://www.googletagmanager.com",
        ],
      },
      reportOnly: false,
    },
  });
};