import { sendContactEmail } from "@/app/src/lib/email"
import { contactSchema } from "@/app/src/lib/validation"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return Response.json(
        {
          error: "Invalid form data",
          fieldErrors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { name, email, message } = result.data

    const { error } = await sendContactEmail({
      name,
      email,
      message,
    })

    if (error) {
      console.error("Resend error:", error)

      return Response.json(
        { error: "Failed to send message" },
        { status: 500 }
      )
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error("Contact API error:", error)

    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}
