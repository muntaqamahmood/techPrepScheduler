import { Router } from "express";
import sgMail from "@sendgrid/mail";

export const emailRouter = Router();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// @route   POST api/feedback
// @desc    Send email
// @access  Private
emailRouter.post("/", async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    const feedback = req.body.feedbackData;
    const msg = {
      to: "techprepcheduler@gmail.com", // Change to your recipient
      from: userEmail, // Change to your verified sender
      subject: feedback.subject,
      text: feedback.feedback,
      html: `<strong>${feedback.feedback}</strong>`,
    };
    sgMail
      .send(msg)
      .then(() => {
        return res.status(200).json({ message: "Email sent" });
      })
      .catch((error) => {
        console.error(error);
        console.info();
        return res.status(400).json({ message: "Email not sent" });
      });
  } catch (err) {
    console.log(err);
    console.info();
  }
});
