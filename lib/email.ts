import type { ContactFormData } from "@/types"

export async function sendContactNotification(data: ContactFormData): Promise<void> {
  const resendApiKey = process.env.RESEND_API_KEY
  const notificationEmail = process.env.NOTIFICATION_EMAIL

  if (!resendApiKey || !notificationEmail) return

  const html = `
    <h2>New Contact Form Submission — Blooms by Beth</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      <tr><td><strong>Name</strong></td><td>${data.firstName} ${data.lastName}</td></tr>
      <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${data.phone}</td></tr>
      <tr><td><strong>Address</strong></td><td>${data.street}, ${data.city}, ${data.state} ${data.zip}</td></tr>
      <tr><td><strong>Property Type</strong></td><td>${data.propertyType}</td></tr>
      <tr><td><strong>Timeframe</strong></td><td>${data.projectTimeframe}</td></tr>
      <tr><td><strong>Budget</strong></td><td>${data.budgetRange}</td></tr>
      <tr><td><strong>Preferred Contact</strong></td><td>${data.contactMethod}</td></tr>
      <tr><td><strong>Message</strong></td><td>${data.message}</td></tr>
    </table>
  `

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Blooms by Beth <noreply@bloomsbybethchs.com>",
      to: [notificationEmail],
      reply_to: data.email,
      subject: `New Inquiry from ${data.firstName} ${data.lastName}`,
      html,
    }),
  })
}
