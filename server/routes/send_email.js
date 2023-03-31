import { Router } from "express";
import sgMail from "@sendgrid/mail";

export const emailRouter = Router();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// @route   POST api/feedback
// @desc    Send email
// @access  Private
emailRouter.post("/", async (req, res) => {
  try {
    console.log("Print reqBody", req.body);
    const userEmail = req.body.userEmail;
    const feedback = req.body.feedbackData;
    console.log("Print subject", feedback.subject);
    console.log("Print feedback", feedback.feedback);
    console.log(userEmail);
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
        //console.log("Email sent");
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
