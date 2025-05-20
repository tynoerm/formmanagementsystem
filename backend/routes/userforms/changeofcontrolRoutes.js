import mongoose from "mongoose";
import express from "express";
import PDFDocument from "pdfkit";
import ExcelJS from "exceljs";

import changeofcontrolSchema from "../../models/userforms/changeofcontrolModel.js"


let router = express.Router();

//create a stock 

router.route("/create-changeofcontrol").post(async (req, res, next) => {
  await changeofcontrolSchema
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
  await changeofcontrolSchema
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

// Update a domain access form by ID
router.route("/update-changeofcontrol/:id").put(async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedForm = await domainSchema.findByIdAndUpdate(id, req.body, {
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

export { router as changeofcontrolRoutes }