import mongoose from "mongoose";
import express from "express";
import PDFDocument from "pdfkit";
import ExcelJS from "exceljs";

import internetaccessSchema from "../../models/userforms/internetaccessModel.js"


let router = express.Router();

//create a stock 

router.route("/create-internetaccess").post(async (req, res, next) => {
  await internetaccessSchema
    .create(req.body)
    .then((result) => {
      res.json({
        data: result,
        message: "user created successfully",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});



router.route("/").get(async (req, res, next) => {
  await internetaccessSchema
    .find()
    .then((result) => {
      res.json({
        data: result,
        message: "control mapped successfully done",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});
export { router as internetaccessRoutes }