import express from "express";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, update } from "firebase/database";

const cors = require("cors");

const firebaseConfig = {
  apiKey: "AIzaSyBU-515LpoouRXRzltgKVi8PSUCj00pte0",
  authDomain: "instagram-78503.firebaseapp.com",
  projectId: "instagram-78503",
  storageBucket: "instagram-78503.appspot.com",
  messagingSenderId: "984193148709",
  appId: "1:984193148709:web:bc41625c8fa07c41031ccc",
  measurementId: "G-0WGZJYJKCD",
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const app = express();
app.use(express.json());
app.use(cors());
app.post("/resetpassword", (req, res) => {
  const { email, username } = req.body;

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetLink = `https://resetpasswordinstagram1.vercel.app/resetpassword/${resetToken}`;

  const resetRef = ref(database, `passwordResets/${resetToken}`);
  set(resetRef, { username, email, resetToken })
    .then(() => {
      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "metalninjas1@gmail.com",
          pass: "xuli pnbs abhb rrni",
        },
      });

      let mailDetails = {
        from: "metalninjas1@gmail.com",
        to: email,
        subject: "Reset password",
        text: `Hi ${username}. \n\n Please reset your account using the following link:\n\n${resetLink}`,
      };

      mailTransporter.sendMail(mailDetails, (err) => {
        if (err) {
          console.log("Error Occurs", err);
          return res.status(500).send("Error occurred while sending email");
        } else {
          console.log("Email sent successfully");
          return res
            .status(200)
            .send("Reset link has been sent to your email.");
        }
      });
    })
    .catch((error) => {
      console.error("Error writing to database", error);
      res.status(500).send("Error writing to database");
    });
});

app.get("/resetpassword/:token", (req, res) => {
  const { token } = req.params;
  const resetRef = ref(database, `passwordResets/${token}`);
  console.log(get(resetRef));
  get(resetRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        return res.send(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Password</title>
            <style>
              body {
                background-color: #f0f2f5;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                font-family: Arial, sans-serif;
              }

              .reset-container {
                background-color: white;
                padding: 40px;
                border-radius: 10px;
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                width: 100%;
                max-width: 400px;
              }

              h2 {
                text-align: center;
                color: #333;
                margin-bottom: 30px;
              }

              label {
                font-weight: bold;
                color: #555;
              }

              input[type="password"] {
                width: 100%;
                padding: 10px;
                margin: 10px 0;
                borvder: 1px solid #ddd;
                border-radius: 5px;
              }

              button {
                width: 100%;
                padding: 10px;
                background-color: #1877f2;
                color: white;
                border: none;
                border-radius: 5px;
                font-size: 16px;
                cursor: pointer;
                margin-top: 20px;
              }

              button:hover {
                background-color: #166fe5;
              }

              .message {
                text-align: center;
                margin-top: 20px;
                font-size: 14px;
                color: #777;
              }
            </style>
          </head>
          <body>
            <div class="reset-container">
              <h2>Reset Password</h2>
              <form id="resetForm">
                <input type="hidden" id="token" value="${req.params.token}">
                <label for="password">New Password:</label><br>
                <input type="password" id="password" name="password" required><br><br>
                <label for="newPassword">Confirm New Password:</label><br>
                <input type="password" id="newPassword" name="newPassword" required><br><br>
                <button type="submit">Reset Password</button>
              </form>
              <div class="message" id="message"></div>
            </div>

            <script>
              document.getElementById("resetForm").addEventListener("submit", function(event) {
                event.preventDefault();

                const password = document.getElementById("password").value;
                const newPassword = document.getElementById("newPassword").value;
                const token = document.getElementById("token").value;

                if(password !== newPassword) {
                  document.getElementById("message").innerText = "Passwords do not match!";
                  return;
                }

                fetch(\`/resetpassword/\${token}\`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({ password, newPassword })
                })
                .then(response => response.text())
                .then(data => {
                  document.getElementById("message").innerText = "Password has been reset successfully.";
                })
                .catch(error => {
                  console.error("Error:", error);
                  document.getElementById("message").innerText = "An error occurred while resetting your password.";
                });
              });
            </script>
          </body>
          </html>
        `);
      } else {
        return res.send("<h1>Invalid link</h1>");
      }
    })
    .catch((error) => {
      console.error("Error reading from database", error);
      return res.status(500).send("Error reading from database");
    });
});

app.post("/resetpassword/:token", (req, res) => {
  const { token } = req.params;
  const { password, newPassword } = req.body;

  if (!password || !newPassword) {
    return res.status(400).send("Both password fields are required.");
  }

  const resetRef = ref(database, `passwordResets/${token}`);

  get(resetRef)
    .then((snapshot) => {
      if (snapshot.exists() && snapshot.val().resetToken === token) {
        if (password === newPassword) {
          const userRef = ref(database, `users/${snapshot.val().username}`);

          update(userRef, { password: newPassword })
            .then(() => {
              set(resetRef, null);
              res.status(200).send("Password has been reset successfully.");
            })
            .catch((error) => {
              console.error("Error updating password", error);
              res.status(500).send("Error updating password");
            });
        } else {
          res.status(400).send("Passwords do not match.");
        }
      } else {
        res.status(400).send("Invalid or expired reset token.");
      }
    })
    .catch((error) => {
      console.error("Error reading from database", error);
      res.status(500).send("Error reading from database");
    });
});

app.listen(5000, () => {
  console.log("Server is running on port 3000");
});
