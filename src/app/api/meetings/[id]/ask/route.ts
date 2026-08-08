
// TODO: swap this out for a real Anthropic API call once you have a key.
// The streaming pattern below is the same shape a real API call would use.

const MOCK_RESPONSE =
  "Based on the meeting, AK committed to fixing the API rate limiting edge case by Friday, and JD is preparing the Q3 OKR check-in deck for Monday's meeting.";

export async function POST() {
  const encoder = new TextEncoder();
  const words = MOCK_RESPONSE.split(" ");

  const stream = new ReadableStream({
    async start(controller) {
      for (const word of words) {
        controller.enqueue(encoder.encode(word + " "));
        await new Promise((resolve) => setTimeout(resolve, 60));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
