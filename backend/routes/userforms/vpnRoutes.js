import mongoose from "mongoose";
import express from "express";
import PDFDocument from "pdfkit";
import ExcelJS from "exceljs";

import vpnSchema from "../../models/userforms/vpnModel.js"


let router = express.Router();

//create a stock 

router.route("/create-vpn").post(async (req, res, next) => {
  await vpnSchema
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
  await vpnSchema
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


router.route("/update-vpn/:id").put(async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedForm = await vpnSchema.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedForm) {
      return res.status(404).json({
        message: "Form not found",
        status: 404,
      });
    }

    res.json({
      data: updatedForm,
      message: "Form updated successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      message: "Failed to update the form",
      status: 500,
    });
  }
});

export { router as vpnRoutes }