import axios from "axios";
import User from "../models/User.js";
import { DateTime } from "luxon";

const baseURL = "https://rest.clicksend.com/v3";
const smsAuth = Buffer.from(
  `${process.env.CLICK_SEND_USER}:${process.env.CLICK_SEND_KEY}`,
  "utf-8"
).toString("base64");

axios.defaults.headers.common["Authorization"] = `Basic ${smsAuth}`;

async function validate(key) {
  try {
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

/**
 *
 * @param {User} user
 */
async function sendSMS(user) {
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
  try {
    const sms = await axios({
      method: "post",
      url: `${baseURL}/sms/send`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });

    const result = sms.data.data;
    updateDB(user, result);
  } catch (err) {
    console.log(err);
  }
}

async function updateDB(document, data) {
  const messages = data.messages.map((obj) => {
    let mObj = {};
    mObj.serviceNumber = obj.to;
    mObj.lastMessage = DateTime.fromSeconds(obj.date).toSQL();
    mObj.lastStatus = obj.status;
    mObj.cost = parseFloat(obj.message_price);
    return mObj;
  });

  for (let i = 0; i < messages.length; i++) {
    if (document.serviceList[i].serviceNumber === messages[i].serviceNumber) {
      document.serviceList[i].lastMessage = messages[i].lastMessage;
      document.serviceList[i].lastStatus = messages[i].lastStatus;
      document.serviceList[i].messageCount += 1;
      document.serviceList[i].usageCost += messages[i].cost;
    }
  }
  try {
    await document.save();
  } catch (err) {
    console.log(err);
  }
}

export { validate };
