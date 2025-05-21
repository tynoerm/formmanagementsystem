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
router.put("/update-changeofcontrol/:id", async (req, res) => {
  const { id } = req.params;
  console.log("UPDATE BODY", req.body); // Debug

  try {
    const updated = await changeofcontrolSchema.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.json({ message: "Form updated", data: updated });
  } catch (err) {
    console.error("Update error", err);
    res.status(500).json({ message: "Server error" });
  }
});


export { router as changeofcontrolRoutes }