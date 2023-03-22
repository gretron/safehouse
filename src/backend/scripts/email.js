const Imap = require("imap");
const { simpleParser } = require("mailparser");
const nodemailer = require("nodemailer");

var onInboxReceived;

const imap = new Imap({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  tls: true,
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASS,
  connTimeout: 10000,
  authTimeout: 5000,
});

function openInbox(cb) {
  imap.openBox("INBOX", false, cb);
}

imap.once("ready", function () {
  console.log("Connected to Email Server");

  setInterval(() => {
    openInbox(function (err, box) {
      if (err) throw err;

      imap.search(["UNSEEN"], (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
          console.log("No unseen messages");
          return;
        }

        var f = imap.fetch(results, { bodies: "", markSeen: true });

        // When Message Fetched
        f.on("message", function (msg, seqno) {
          console.log("Message #%d", seqno);
          var prefix = "(#" + seqno + ") ";

          msg.on("body", function (stream, info) {
            console.log(prefix + "Body");

            simpleParser(stream, {}, function (err, parsed) {
              if (err) throw err;

              console.log(
                prefix + "Parsed Email: " + parsed.subject + parsed.text
              );

              onInboxReceived(parsed.text);
            });
          });
        });

        // When Error Occurs
        f.once("error", function (err) {
          console.log("Fetch error: " + err);
        });
      });
    });
  }, 5000);
});

imap.once("error", (error) => {
  console.log(error);
});

imap.once("end", function () {
  console.log("Email Server Connection Ended...");
});

/**
 * To Start Fetching Inbox
 * @param {callback} inboxCallback Callback at Every Inbox Fetched
 */
function inbox(inboxCallback) {
    onInboxReceived = inboxCallback;
    imap.connect();
}

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secureConnection: false,
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: "davidanotrudeau@gmail.com",
  subject: "Safehouse Alert: Temperature",
  text: 'Temperature has reached *****. Would you like to turn a fan on? Reply "yes" to this email.',
};

/**
 * To Send Mail at Specified Email Address
 * @param {string} to Destination Address
 * @param {string} subject Subject of Mail
 * @param {string} text Body Text of Mail 
 */
function sendMail(to, subject, text) {
    mailOptions.to = to;
    mailOptions.subject = subject;
    mailOptions.text = text;

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

// Exports
module.exports = { inbox, sendMail };
