# Webhook-SMS

A server designed to make getting a sms notification based on data easy

[Live Demo](https://webhooksms.herokuapp.com/)

## Contents

[Local Deployment](#local-deployment)

[To-Do](#to-do)

[Examples](#examples)

## Local Deployment

This project requires a Mongo Database setup.

As a monorepo the Server is built with [ExpressJS](https://expressjs.com/)
The Client is a UI made with [React](https://reactjs.org/) and [MUI](https://mui.com/)

You will also need an account with [Click Send](https://www.clicksend.com/)

### Download

In your terminal download the repo

```terminal
git clone https://github.com/minusInfinite/webhook-sms.git
```

Once downloaded install the dependencies with NPM

```terminal
npm install
```

You will also need to edit the .env.EXAMPLE file to .env with the following

```ini
MONGODB_URI= #URL to you Mongo DB_
JWT_SECRET= #The Secrect for you Web Token_
CLICK_SEND_USER= #The username for your ClickSend account
CLICK_SEND_KEY= #The API or Password for your ClickSend account
```

Once you .env is setup you will need to build the client

### Client

```terminal
npm build
```

This you can start the server

### Server

```terminal
npm start
```

Or for development you can start a React Dev server

```terminal
cd client
npm start
```

Going back to the root folder, the server with nodemon

```terminal
cd server
npm run dev
```

## To-Do

- A function to edit the message template.
- A method providing monthly invoicing for service cost.
- Make the generated Hook URI save to the clipboard when clicked

## Example

[Live Demo](https://webhooksms.herokuapp.com/)

![Animated Demo GIF](/md/Screenshot_1.png)
