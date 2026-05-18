// src/modules/vadb/dashboard/dashboard.controller.ts

import { FastifyRequest, FastifyReply } from "fastify";
import { ProductModel } from "../../../models/product.model";
import { UserModel } from "../../../models/user.model";
import { UserLogModel } from "../../../models/user-log.model";

export const dashboardController = {

  renderDashboard: async (request: FastifyRequest, reply: FastifyReply) => {

    const products = await ProductModel.find({}).sort({ name: 1 }).limit(10)
    const productsTotal = await ProductModel.countDocuments({})
    const users = await UserModel.find({}).sort({ firstName: 1 }).limit(10)
    const usersTotal = await UserModel.countDocuments({})
    const userLogs = await UserLogModel.find({}).limit(10)
    
    return reply.view("/vadb/dashboard.pug", {
      pageTitle: "Dashboard | VADB",
      user: request.user || null,
      products: products,
      productsTotal: productsTotal,
      users: users,
      usersTotal: usersTotal,
      userLogs: userLogs,
    });
  },  

};