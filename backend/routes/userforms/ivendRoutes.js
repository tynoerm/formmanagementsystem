import mongoose from "mongoose";
import express from "express";
import PDFDocument from "pdfkit";
import ExcelJS from "exceljs";

import ivendSchema from "../../models/userforms/IvendModel.js"


let router = express.Router();

//create a stock 

router.route("/create-ivenduser").post(async (req, res, next) => {
  await ivendSchema
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
  await ivendSchema
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
export { router as ivendRoutes }