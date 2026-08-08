import { prisma } from "@/lib/prisma";

// This route uses keyword matching across transcript, summary, and action items
// instead of a live LLM call, since no Anthropic API credit is available yet.
// To switch to a real AI call, install @anthropic-ai/sdk and use the anthropic.messages.create() streaming pattern with meeting.transcript as context.

function scoreText(text: string, questionWords: string[]): number {
  const lower = text.toLowerCase();
  return questionWords.filter((word) => lower.includes(word)).length;
}

function buildAnswer(
  question: string,
  meeting: {
    title: string;
    transcript: string;
    summary: string;
    actionItems: { text: string; assignee: string; dueDate: string }[];
  }
): string {
  const questionWords = question
    .toLowerCase()
    .replace(/[?.,!]/g, "")
    .split(" ")
    .filter((w) => w.length > 2);

  const summaryScore = scoreText(meeting.summary, questionWords);

  const matchedActionItems = meeting.actionItems.filter(
    (item) => scoreText(item.text, questionWords) > 0
  );

  const transcriptLines = meeting.transcript.split("\n").filter(Boolean);
  const matchedLines = transcriptLines
    .map((line) => ({ line, score: scoreText(line, questionWords) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((s) => s.line.replace(/^\[\d{2}:\d{2}\]\s*/, ""));

  const parts: string[] = [];

  if (summaryScore > 0) {
    parts.push(meeting.summary);
  }

  if (matchedActionItems.length > 0) {
    const actionText = matchedActionItems
      .map((item) => `${item.assignee} is responsible for "${item.text}" (due ${item.dueDate})`)
      .join("; ");
    parts.push(`Related action item: ${actionText}.`);
  }

  if (matchedLines.length > 0 && parts.length === 0) {
    parts.push(`From the transcript: ${matchedLines.join(" ")}`);
  }

  if (parts.length === 0) {
    return `I couldn't find anything about that in "${meeting.title}". This meeting covered: ${meeting.summary}`;
  }

  return parts.join(" ");
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { question } = await req.json();

  const meeting = await prisma.meeting.findUnique({
    where: { id: params.id },
    include: { actionItems: true },
  });

  if (!meeting) {
    return new Response("Meeting not found", { status: 404 });
  }

  const answer = buildAnswer(question, meeting);
  const encoder = new TextEncoder();
  const words = answer.split(" ");

  const stream = new ReadableStream({
    async start(controller) {
      for (const word of words) {
        controller.enqueue(encoder.encode(word + " "));
        await new Promise((resolve) => setTimeout(resolve, 40));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

