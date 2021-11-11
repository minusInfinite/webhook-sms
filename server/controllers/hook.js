import express from 'express'

const webhookRouter = express.Router()

webhookRouter.post("/:username", (req,res) => {
    const event = req.body
    
    console.log(`Event received against ${req.params} with message\n ${req.body}`)

    res.send(200)
})

export default webhookRouter