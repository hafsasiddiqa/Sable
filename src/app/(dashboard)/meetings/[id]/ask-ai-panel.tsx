"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AskAiPanel({ meetingId }: { meetingId: string }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    if (!question.trim() || loading) return;
    setLoading(true);
    setAnswer("");

    const res = await fetch(`/api/meetings/${meetingId}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    if (!res.body) {
      setLoading(false);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      setAnswer((prev) => prev + decoder.decode(value));
    }

    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground min-h-[80px]">
        {answer || 'Ask a question about this meeting — e.g. "What did AK commit to?"'}
        {loading && <span className="animate-pulse">▍</span>}
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Ask about this meeting..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          disabled={loading}
        />
        <Button size="icon" onClick={handleAsk} disabled={loading}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
