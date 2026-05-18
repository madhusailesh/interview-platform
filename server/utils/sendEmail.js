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

export const sendInterviewEmail = async ({
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
<html lang="en">

<head>

<meta charset="UTF-8" />

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
/>

<title>
  SaileshHire Interview Invitation
</title>

<style>

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

body{
  background:#020617;
  font-family:Arial,sans-serif;
  color:white;
}

table{
  border-spacing:0;
}

.wrapper{
  width:100%;
  padding:40px 15px;

  background:
    radial-gradient(
      circle at top left,
      rgba(34,197,94,0.15),
      transparent 30%
    ),

    radial-gradient(
      circle at bottom right,
      rgba(59,130,246,0.15),
      transparent 30%
    ),

    linear-gradient(
      135deg,
      #020617,
      #0f172a
    );
}

.container{
  width:100%;
  max-width:700px;
  margin:auto;

  background:
    linear-gradient(
      145deg,
      rgba(15,23,42,1),
      rgba(17,24,39,1)
    );

  border-radius:30px;

  overflow:hidden;

  border:1px solid rgba(255,255,255,0.08);

  box-shadow:
    0 0 60px rgba(34,197,94,0.15),
    0 0 120px rgba(59,130,246,0.08);
}

/* ================= HEADER ================= */

.hero{
  position:relative;

  padding:65px 30px;

  text-align:center;

  overflow:hidden;

  background:
    linear-gradient(
      135deg,
      #22c55e,
      #16a34a,
      #15803d
    );
}

.hero::before{
  content:"";

  position:absolute;

  width:350px;
  height:350px;

  background:
    radial-gradient(
      circle,
      rgba(255,255,255,0.2),
      transparent 70%
    );

  top:-150px;
  left:-100px;
}

.hero::after{
  content:"";

  position:absolute;

  inset:0;

  background:
    radial-gradient(
      circle,
      rgba(255,255,255,0.15) 1px,
      transparent 1px
    );

  background-size:20px 20px;

  opacity:0.3;
}

.logo{
  position:relative;
  z-index:2;

  font-size:48px;
  font-weight:900;

  letter-spacing:-1px;

  color:white;

  text-shadow:
    0 0 20px rgba(255,255,255,0.35);
}

.tagline{
  position:relative;
  z-index:2;

  margin-top:14px;

  color:#dcfce7;

  font-size:17px;

  line-height:1.7;
}

/* ================= BODY ================= */

.body{
  padding:50px 40px;
}

.heading{
  font-size:36px;
  font-weight:900;

  line-height:1.3;

  margin-bottom:22px;

  color:white;
}

.text{
  color:#cbd5e1;

  font-size:17px;

  line-height:1.9;
}

/* ================= CARD ================= */

.card{
  margin-top:40px;

  background:
    linear-gradient(
      145deg,
      rgba(255,255,255,0.05),
      rgba(255,255,255,0.02)
    );

  border:1px solid rgba(255,255,255,0.08);

  border-radius:24px;

  overflow:hidden;
}

.card-inner{
  padding:35px;
}

.interview-title{
  font-size:30px;
  font-weight:900;

  color:#22c55e;

  margin-bottom:30px;

  text-shadow:
    0 0 20px rgba(34,197,94,0.35);
}

.info-table{
  width:100%;
}

.info-row td{
  padding:16px 0;
}

.label{
  color:#94a3b8;
  font-size:15px;
}

.value{
  color:white;
  font-size:16px;
  font-weight:700;
  text-align:right;
}

.room-id{
  color:#22c55e;
}

/* ================= BUTTON ================= */

.button-wrapper{
  text-align:center;
  margin-top:45px;
}

.button{
  display:inline-block;

  padding:18px 42px;

  border-radius:18px;

  text-decoration:none;

  font-size:18px;
  font-weight:900;

  color:black;

  background:
    linear-gradient(
      135deg,
      #22c55e,
      #4ade80
    );

  box-shadow:
    0 0 30px rgba(34,197,94,0.4),
    0 0 60px rgba(34,197,94,0.2);

  transition:all 0.3s ease;
}

/* ================= NOTE ================= */

.note{
  margin-top:40px;

  color:#94a3b8;

  font-size:15px;

  line-height:1.9;
}

/* ================= FOOTER ================= */

.footer{
  padding:30px;

  text-align:center;

  background:#020617;

  border-top:
    1px solid rgba(255,255,255,0.06);
}

.footer-text{
  color:#64748b;

  font-size:14px;

  line-height:1.8;
}

/* ================= MOBILE ================= */

@media screen and (max-width:600px){

  .hero{
    padding:50px 20px;
  }

  .logo{
    font-size:36px;
  }

  .tagline{
    font-size:15px;
  }

  .body{
    padding:35px 22px;
  }

  .heading{
    font-size:28px;
  }

  .text{
    font-size:15px;
  }

  .card-inner{
    padding:25px;
  }

  .interview-title{
    font-size:24px;
  }

  .info-row td{
    display:block;
    width:100%;
    text-align:left;
    padding:7px 0;
  }

  .value{
    text-align:left;
    margin-bottom:12px;
  }

  .button{
    width:100%;
    padding:18px 20px;
    font-size:16px;
  }

}

</style>

</head>

<body>

<div class="wrapper">

  <div class="container">

    <!-- HERO -->

    <div class="hero">

      <div class="logo">
        ⚡ SaileshHire
      </div>

      <div class="tagline">
        Futuristic Real-Time Technical Interview Platform
      </div>

    </div>

    <!-- BODY -->

    <div class="body">

      <div class="heading">
        🚀 Interview Invitation
      </div>

      <p class="text">

        You have been invited to attend a professional interview session on SaileshHire.

        Join a next-generation real-time interview experience with video calling, collaborative coding, and live interaction.

      </p>

      <!-- CARD -->

      <div class="card">

        <div class="card-inner">

          <div class="interview-title">
            ${title}
          </div>

          <table class="info-table">

            <tr class="info-row">

              <td class="label">
                📅 Interview Date
              </td>

              <td class="value">
                ${date}
              </td>

            </tr>

            <tr class="info-row">

              <td class="label">
                ⏰ Interview Time
              </td>

              <td class="value">
                ${time}
              </td>

            </tr>

            <tr class="info-row">

              <td class="label">
                🆔 Room ID
              </td>

              <td class="value room-id">
                ${roomId}
              </td>

            </tr>

          </table>

          <!-- BUTTON -->

          <div class="button-wrapper">

            <a
              href="${roomLink}"
              class="button"
            >
              Join Interview →
            </a>

          </div>

        </div>

      </div>

      <!-- NOTE -->

      <div class="note">

        Please join the interview a few minutes before the scheduled time.

        Make sure your microphone, camera, and internet connection are ready for the best experience.

      </div>

    </div>

    <!-- FOOTER -->

    <div class="footer">

      <div class="footer-text">

        © 2026 SaileshHire <br />

        Built for modern technical interviews.

      </div>

    </div>

  </div>

</div>

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