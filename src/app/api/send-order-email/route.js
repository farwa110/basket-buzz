import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function createOrderEmailHtml({ customer, orderNumber, items, total }) {
  const itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
          ${item.title}
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align:center;">
          ${item.quantity}
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align:right;">
          ${(item.price * item.quantity).toFixed(2)} kr.
        </td>
      </tr>
    `,
    )
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; background:#f9f9f9; padding:40px 20px; color:#333;">
      <div style="max-width:600px; margin:0 auto; background:#fff; border-radius:16px; overflow:hidden; border:1px solid #eee;">
        <div style="background:#F27F3D; padding:24px; text-align:center; color:white;">
          <h1 style="margin:0; font-size:28px;">Buzz Basket</h1>
          <p style="margin:8px 0 0;">Tak for din bestilling</p>
        </div>

        <div style="padding:32px 24px;">
          <h2 style="margin-top:0;">Ordrebekræftelse</h2>
          <p>Hej ${customer.fullName || "kunde"},</p>
          <p>Vi har modtaget din ordre, og den er nu bekræftet.</p>

          <div style="background:#fafafa; border:1px solid #eee; border-radius:12px; padding:16px; margin:24px 0;">
            <p style="margin:0 0 8px;"><strong>Ordrenummer:</strong> ${orderNumber}</p>
            <p style="margin:0;"><strong>Email:</strong> ${customer.email}</p>
          </div>

          <table style="width:100%; border-collapse:collapse; margin-top:16px;">
            <thead>
              <tr>
                <th style="text-align:left; padding-bottom:12px;">Produkt</th>
                <th style="text-align:center; padding-bottom:12px;">Antal</th>
                <th style="text-align:right; padding-bottom:12px;">Pris</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div style="text-align:right; margin-top:24px;">
            <p style="font-size:18px; margin:0;"><strong>Total: ${Number(total).toFixed(2)} kr.</strong></p>
          </div>

          <div style="margin-top:32px;">
            <p style="margin-bottom:6px;"><strong>Leveringsadresse</strong></p>
            <p style="margin:0;">
              ${customer.address}<br/>
              ${customer.postalCode} ${customer.city}
            </p>
          </div>
        </div>

        <div style="padding:20px 24px; background:#fafafa; border-top:1px solid #eee; font-size:14px; color:#666;">
          <p style="margin:0;">Denne email er sendt fra Buzz Basket.</p>
        </div>
      </div>
    </div>
  `;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { customer, orderNumber, items, total } = body;

    const data = await resend.emails.send({
      from: "Buzz Basket <onboarding@resend.dev>",
      to: customer.email,
      subject: `Din ordrebekræftelse - ${orderNumber}`,
      html: createOrderEmailHtml({ customer, orderNumber, items, total }),
    });

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("Email error:", error);
    return Response.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}
