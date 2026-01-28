import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_hgawynv";
const TEMPLATE_ID = "template_557kmya";
const PUBLIC_KEY = "eoPJ5KwYUNr5YwcQL";

export const sendEmail = async (
  email: string,
  message: string,
  name: string,
  origin: "DEV" | "PHOTO" | "BLOG" | "3DPRINT",
) => {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        email: email,
        subject: `[${origin} PORTFOLIO] Contact Form Submission from ${name}`,
        message: message,
        name: name,
      },
      PUBLIC_KEY,
    );
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
