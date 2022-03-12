import express from "express";
import { validate } from "../utils/sms.js";

const webhookRouter = express.Router();

webhookRouter.post("/:id", (req, res) => {
  if (req.body) {
    validate(req.params.id, req.body);
    res.sendStatus(200);
  } else {
    validate(req.params.id, undefined);
    res.sendStatus(200);
  }
});

export default webhookRouter;
