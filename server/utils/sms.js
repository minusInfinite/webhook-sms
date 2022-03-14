import axios from "axios";
import ServiceList from "../models/ServiceList.js";
import User from "../models/User.js";
import { DateTime } from "luxon";

const baseURL = "https://rest.clicksend.com/v3";
const user = process.env.CLICK_SEND_USER;
const key = process.env.CLICK_SEND_KEY;
const buff = Buffer.from(`${user}:${key}`, "utf-8");
const smsAuth = buff.toString("base64");

async function validate(key, body) {
  try {
    let postData = body.message;
    const serviceList = await ServiceList.findOne({ key: key });
    if (serviceList && postData) {
      sendSMS(serviceList, postData);
      return;
    } else if (serviceList) {
      sendSMS(serviceList, undefined);
      return;
    }
    throw new Error("no user found");
  } catch (err) {
    console.error(err);
  }
}

/**
 *
 * @param {ServiceList} serviceList
 */
async function sendSMS(serviceList, postData) {
  const user = await User.findById(serviceList.user);
  const from = user.username;
  const body = postData || serviceList.msgTemplate;
  const send = serviceList.services.map((obj) => {
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
        Authorization: `Basic ${smsAuth}`,
      },
      data: data,
    });

    const result = sms.data.data;
    updateDB(serviceList, result);
  } catch (err) {
    console.error(err);
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
    if (document.services[i].serviceNumber === messages[i].serviceNumber) {
      document.services[i].lastMessage = messages[i].lastMessage;
      document.services[i].lastStatus = messages[i].lastStatus;
      document.services[i].messageCount += 1;
      document.usageCost += messages[i].cost;
    }
  }
  try {
    await document.save();
  } catch (err) {
    console.error(err);
  }
}

export { validate };
