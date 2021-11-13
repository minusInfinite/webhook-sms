import express from 'express'
import { validate } from '../utils/sms.js'

const webhookRouter = express.Router()

webhookRouter.post("/:id", (req,res) => {
    validate(req.params.id)
    res.sendStatus(200)
})

export default webhookRouter