import nodemailer from "nodemailer";

const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",

    port: 587,

    secure: false,

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },

    tls: {
      rejectUnauthorized: false,
    },
  });
};

export const sendInterviewEmail =
  async ({
    to,
    title,
    date,
    time,
    roomId,
  }) => {
    try {

      console.log(
        "EMAIL USER:",
        process.env.EMAIL_USER
      );

      console.log(
        "EMAIL SENDING..."
      );

      console.log("TO:", to);

      const transporter =
        createTransporter();

      const roomLink =
        `https://interview-platform-two-beta.vercel.app/room/${roomId}`;

      await transporter.sendMail({
        from:
          `"SaileshHire" <${process.env.EMAIL_USER}>`,

        to,

        subject:
          `🚀 Interview Invitation - ${title}`,

        html: `
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />

  <title>
    Interview Invitation
  </title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#050816;
    font-family:Arial,sans-serif;
  "
>

  <table
    width="100%"
    cellspacing="0"
    cellpadding="0"
    style="
      background:
      linear-gradient(
        135deg,
        #050816,
        #0f172a
      );
      padding:40px 0;
    "
  >

    <tr>

      <td align="center">

        <table
          width="650"
          cellspacing="0"
          cellpadding="0"
          style="
            background:#0f172a;
            border-radius:24px;
            overflow:hidden;
            border:1px solid #1e293b;
            box-shadow:
              0 0 40px rgba(34,197,94,0.15);
          "
        >

          <!-- HEADER -->
          <tr>

            <td
              align="center"
              style="
                padding:50px 40px;
                background:
                linear-gradient(
                  135deg,
                  #22c55e,
                  #16a34a
                );
              "
            >

              <h1
                style="
                  margin:0;
                  color:white;
                  font-size:42px;
                  font-weight:900;
                  letter-spacing:-1px;
                "
              >
                SaileshHire
              </h1>

              <p
                style="
                  margin-top:12px;
                  color:#dcfce7;
                  font-size:16px;
                "
              >
                Modern Technical Interview Platform
              </p>

            </td>

          </tr>

          <!-- BODY -->
          <tr>

            <td
              style="
                padding:50px 45px;
                color:white;
              "
            >

              <h2
                style="
                  margin-top:0;
                  font-size:32px;
                  font-weight:800;
                  color:white;
                "
              >
                🚀 Interview Invitation
              </h2>

              <p
                style="
                  color:#cbd5e1;
                  font-size:17px;
                  line-height:1.8;
                  margin-top:20px;
                "
              >
                You have been invited to attend a professional interview session on SaileshHire.
              </p>

              <!-- CARD -->
              <table
                width="100%"
                cellspacing="0"
                cellpadding="0"
                style="
                  margin-top:35px;
                  background:#111827;
                  border-radius:18px;
                  border:1px solid #1f2937;
                "
              >

                <tr>

                  <td
                    style="
                      padding:35px;
                    "
                  >

                    <h2
                      style="
                        margin-top:0;
                        color:#22c55e;
                        font-size:28px;
                      "
                    >
                      ${title}
                    </h2>

                    <table
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      style="
                        margin-top:25px;
                      "
                    >

                      <tr>

                        <td
                          style="
                            padding:12px 0;
                            color:#94a3b8;
                            font-size:16px;
                          "
                        >
                          📅 Date
                        </td>

                        <td
                          align="right"
                          style="
                            padding:12px 0;
                            color:white;
                            font-size:16px;
                            font-weight:bold;
                          "
                        >
                          ${date}
                        </td>

                      </tr>

                      <tr>

                        <td
                          style="
                            padding:12px 0;
                            color:#94a3b8;
                            font-size:16px;
                          "
                        >
                          ⏰ Time
                        </td>

                        <td
                          align="right"
                          style="
                            padding:12px 0;
                            color:white;
                            font-size:16px;
                            font-weight:bold;
                          "
                        >
                          ${time}
                        </td>

                      </tr>

                      <tr>

                        <td
                          style="
                            padding:12px 0;
                            color:#94a3b8;
                            font-size:16px;
                          "
                        >
                          🆔 Room ID
                        </td>

                        <td
                          align="right"
                          style="
                            padding:12px 0;
                            color:#22c55e;
                            font-size:16px;
                            font-weight:bold;
                          "
                        >
                          ${roomId}
                        </td>

                      </tr>

                    </table>

                    <!-- BUTTON -->
                    <table
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      style="
                        margin-top:40px;
                      "
                    >

                      <tr>

                        <td align="center">

                          <a
                            href="${roomLink}"
                            style="
                              display:inline-block;
                              background:
                              linear-gradient(
                                135deg,
                                #22c55e,
                                #16a34a
                              );
                              color:black;
                              text-decoration:none;
                              padding:18px 40px;
                              border-radius:14px;
                              font-size:18px;
                              font-weight:900;
                              box-shadow:
                                0 0 25px rgba(34,197,94,0.4);
                            "
                          >
                            Join Interview →
                          </a>

                        </td>

                      </tr>

                    </table>

                  </td>

                </tr>

              </table>

              <!-- INFO -->
              <p
                style="
                  margin-top:40px;
                  color:#64748b;
                  line-height:1.8;
                  font-size:15px;
                "
              >
                Please join the interview a few minutes before the scheduled time and ensure your microphone and camera are ready.
              </p>

            </td>

          </tr>

          <!-- FOOTER -->
          <tr>

            <td
              align="center"
              style="
                padding:30px;
                background:#020617;
                border-top:1px solid #1e293b;
              "
            >

              <p
                style="
                  margin:0;
                  color:#64748b;
                  font-size:14px;
                "
              >
                © 2026 SaileshHire.
                Built for modern technical interviews.
              </p>

            </td>

          </tr>

        </table>

      </td>

    </tr>

  </table>

</body>

</html>
        `,
      });

      console.log(
        "EMAIL SENT SUCCESSFULLY"
      );

    } catch (err) {

      console.log(
        "EMAIL ERROR:",
        err.message
      );
    }
  };