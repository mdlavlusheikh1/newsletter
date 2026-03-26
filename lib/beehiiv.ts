const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY!;
const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID!;
const BASE_URL = "https://api.beehiiv.com/v2";

export async function subscribeToBeehiiv(email: string): Promise<{ success: boolean; message: string }> {
  // If API key not configured, return mock success for testing
  if (!BEEHIIV_API_KEY || BEEHIIV_API_KEY === "your_beehiiv_api_key_here") {
    console.log(`[Mock] Subscription for: ${email}`);
    return { success: true, message: "You're subscribed! Check your inbox." };
  }

  try {
    const res = await fetch(`${BASE_URL}/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEEHIIV_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        reactivate_existing: false,
        send_welcome_email: true,
        utm_source: "website",
        utm_medium: "organic",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Subscription failed." };
    }

    return { success: true, message: "You're subscribed! Check your inbox." };
  } catch {
    return { success: false, message: "Something went wrong. Please try again." };
  }
}
