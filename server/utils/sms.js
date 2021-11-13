import axios from "axios";
import User from "../models/User.js";

const baseURL = "https://rest.clicksend.com/v3";
const smsAuth = Buffer.from(
  `${process.env.CLICK_SEND_USER}:${process.env.CLICK_SEND_KEY}`,
  "utf-8"
).toString("base64");

axios.defaults.headers.common["Authorization"] = `Basic ${smsAuth}`;

async function validate(key) {
  try {
    console.log(key);
    const user = await User.findOne({ key: key });
    if (user) {
      sendSMS(user);
      return;
    }
    throw new Error("no user found");
  } catch (err) {
    console.log(err);
  }
}

function sendSMS(user) {
  const from = user.username;
  const body = user.msgTemplate;
  const send = user.serviceList.map((obj) => {
    let sObj = {};
    sObj.body = body;
    sObj.to = obj.serviceNumber;
    sObj.from = from;
    return sObj;
  });

  const data = JSON.stringify({
    messages: send,
  });

  axios({
    method: "post",
    url: `${baseURL}/sms/send`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((res) => {
      console.log(JSON.stringify(res.data));
      
    })
    .catch((err) => console.log(err));
}

export { validate };
