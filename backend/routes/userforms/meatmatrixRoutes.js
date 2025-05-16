import mongoose from "mongoose";
import express from "express";
import PDFDocument from "pdfkit";
import ExcelJS from "exceljs";

import meatmatrixSchema from "../../models/userforms/meatmatrixModel.js"


let router = express.Router();

//create a stock 

router.route("/create-meatmatrix").post(async (req, res, next) => {
  await meatmatrixSchema
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
  await meatmatrixSchema
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
export { router as meatmatrixRoutes }