module.exports = {
    apps : [{
        name: "Webhook SMS",
        script: "yarn",
        cwd: "/home/pi/webhook-sms/",
        args: "server start"
    }]
}
