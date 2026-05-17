import nodemailer from "nodemailer";

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendInterviewEmail = async ({ to, title, date, time, roomId }) => {
  try {
    console.log("EMAIL USER:", process.env.EMAIL_USER);

    console.log("EMAIL PASS:", process.env.EMAIL_PASS);

    console.log("EMAIL SENDING...");
    console.log("TO:", to);

    const transporter = createTransporter();

    const roomLink = `https://interview-platform-two-beta.vercel.app/room/${roomId}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to,

      subject: `Interview Invitation - ${title}`,

      html: `
          <div
            style="
              font-family:Arial;
              background:#111827;
              color:white;
              padding:30px;
            "
          >

            <h1
              style="
                color:#22c55e;
              "
            >
              Interview Invitation
            </h1>

            <p>
              You have been invited
              to an interview session.
            </p>

            <div
              style="
                background:#1f2937;
                padding:20px;
                border-radius:10px;
                margin-top:20px;
              "
            >

              <h2>${title}</h2>

              <p>
                <b>Date:</b> ${date}
              </p>

              <p>
                <b>Time:</b> ${time}
              </p>

              <p>
                <b>Room ID:</b> ${roomId}
              </p>

              <a
                href="${roomLink}"
                style="
                  display:inline-block;
                  padding:12px 20px;
                  margin-top:15px;
                  background:#22c55e;
                  color:black;
                  text-decoration:none;
                  border-radius:8px;
                  font-weight:bold;
                "
              >
                Join Interview
              </a>

            </div>

            <p
              style="
                margin-top:30px;
                color:#9ca3af;
              "
            >
              SaileshHire Platform
            </p>

          </div>
        `,
    });

    console.log("EMAIL SENT SUCCESSFULLY");
  } catch (err) {
    console.log("EMAIL ERROR:", err.message);
  }
};
