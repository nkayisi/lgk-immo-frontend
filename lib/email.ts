import { render } from "@react-email/render";
import VerifyEmail from "@/emails/verify-email";
import ResetPassword from "@/emails/reset-password";

const INTERNAL_API_SECRET =
  process.env.INTERNAL_API_SECRET || process.env.BETTER_AUTH_SECRET;
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

async function sendEmailViaAPI(to: string, subject: string, html: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to,
        subject,
        html,
        internalSecret: INTERNAL_API_SECRET,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to send email");
    }

    return data;
  } catch (error) {
    console.error("[Email] Error sending email:", error);
    throw error;
  }
}

export async function sendVerificationEmail(
  email: string,
  verificationUrl: string,
  userName?: string
) {
  const html = await render(VerifyEmail({ verificationUrl, userName }));

  return sendEmailViaAPI(
    email,
    "Vérifiez votre adresse email - LGK Immo",
    html
  );
}

export async function sendPasswordResetEmail(
  email: string,
  resetUrl: string,
  userName?: string
) {
  const html = await render(ResetPassword({ resetUrl, userName }));

  return sendEmailViaAPI(
    email,
    "Réinitialisez votre mot de passe - LGK Immo",
    html
  );
}
