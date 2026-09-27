import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail({
    name,
    email,
    message,
}: {
    name: string
    email: string
    message: string
}) {
    return resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>",
        to: [process.env.CONTACT_EMAIL!],
        replyTo: email,
        subject: `New portfolio message from ${name}`,

        html: `
    <div style="
      margin: 0;
      padding: 40px 20px;
      background-color: #111111;
      font-family: Arial, Helvetica, sans-serif;
      color: #f5f5f5;
    ">
      <div style="
        max-width: 620px;
        margin: 0 auto;
        background-color: #181818;
        border: 1px solid #2a2a2a;
        overflow: hidden;
      ">

        <!-- Header -->
        <div style="
          padding: 32px;
          border-bottom: 1px solid #2a2a2a;
        ">
          <div style="
            font-size: 12px;
            font-weight: bold;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #a3e635;
            margin-bottom: 12px;
          ">
            Portfolio Contact
          </div>

          <h1 style="
            margin: 0;
            font-size: 32px;
            line-height: 1.1;
            color: #ffffff;
          ">
            New message
          </h1>
        </div>

        <!-- Sender information -->
        <div style="padding: 32px;">

          <div style="
            margin-bottom: 24px;
            padding: 20px;
            background-color: #202020;
            border-left: 3px solid #a3e635;
          ">
            <div style="
              font-size: 11px;
              font-weight: bold;
              letter-spacing: 1.5px;
              text-transform: uppercase;
              color: #999999;
              margin-bottom: 8px;
            ">
              From
            </div>

            <div style="
              font-size: 20px;
              font-weight: bold;
              color: #ffffff;
              margin-bottom: 6px;
            ">
              ${name}
            </div>

            <a
              href="mailto:${email}"
              style="
                font-size: 14px;
                color: #a3e635;
                text-decoration: none;
              "
            >
              ${email}
            </a>
          </div>

          <!-- Message -->
          <div>
            <div style="
              font-size: 11px;
              font-weight: bold;
              letter-spacing: 1.5px;
              text-transform: uppercase;
              color: #999999;
              margin-bottom: 12px;
            ">
              Message
            </div>

            <div style="
              padding: 24px;
              background-color: #202020;
              color: #eeeeee;
              font-size: 16px;
              line-height: 1.7;
              white-space: pre-wrap;
            ">
              ${message}
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div style="
          padding: 20px 32px;
          border-top: 1px solid #2a2a2a;
          color: #666666;
          font-size: 12px;
        ">
          Sent from your portfolio contact form.
        </div>

      </div>
    </div>
  `,

        // Plain-text fallback
        text: `
NEW PORTFOLIO MESSAGE

From: ${name}
Email: ${email}

Message:
${message}

Sent from your portfolio contact form.
  `,
    })
}
