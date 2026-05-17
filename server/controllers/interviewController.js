import Interview from "../models/Interview.js";
import { sendInterviewEmail } from "../utils/sendEmail.js";
// CREATE INTERVIEW
export const createInterview =
  async (req, res) => {
    try {
      const interview =
        await Interview.create(
          req.body
        );

      // SEND EMAIL
      await sendInterviewEmail({
        to:
          req.body.candidateEmail,

        title:
          req.body.title,

        date:
          req.body.date,

        time:
          req.body.time,

        roomId:
          req.body.roomId,
      });

      res.status(201).json(
        interview
      );
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };

// GET ALL INTERVIEWS
export const getInterviews = async (
  req,
  res
) => {
  try {
    const interviews =
      await Interview.find({
        $or: [
          {
            createdBy: req.query.email,
          },
          {
            candidateEmail:
              req.query.email,
          },
        ],
      }).sort({
        createdAt: -1,
      });

    res.json(interviews);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};