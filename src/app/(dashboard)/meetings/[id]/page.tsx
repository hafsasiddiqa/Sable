import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const transcript = `
[00:00] JD: Alright, let's kick off the Q3 roadmap sync. First up — mobile redesign timeline.
[00:14] AK: We're on track for the Aug 20th internal demo. Design handoff finished last week.
[00:29] JD: Great. What about the API rate limiting work?
[00:41] AK: Still in progress. We found an edge case with burst traffic that needs another day.
[01:02] JD: Okay, let's flag that as a risk. Can you own a fix by end of week?
[01:10] AK: Yes, I'll have it done by Friday.
[01:18] JD: Perfect. Last item — Q3 OKR check-in scheduled for next Monday.
`.trim();

const actionItems = [
  { text: "Fix API rate limiting edge case", assignee: "AK", due: "Fri, Aug 8" },
  { text: "Prepare Q3 OKR check-in deck", assignee: "JD", due: "Mon, Aug 11" },
];

export default function MeetingDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Link
          href="/meetings"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Meetings
        </Link>
        <h1 className="text-2xl font-semibold">Q3 Roadmap Sync</h1>
        <p className="text-sm text-muted-foreground">Aug 4, 2026 · 42 min · Meeting #{params.id}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Transcript</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/90">
              {transcript}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <Tabs defaultValue="summary">
              <TabsList className="w-full">
                <TabsTrigger value="summary" className="flex-1">Summary</TabsTrigger>
                <TabsTrigger value="actions" className="flex-1">Action Items</TabsTrigger>
                <TabsTrigger value="ask" className="flex-1">Ask AI</TabsTrigger>
              </TabsList>

              <TabsContent value="summary">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The team confirmed the mobile redesign is on track for its Aug 20th demo.
                  API rate limiting has an unresolved edge case with burst traffic, which AK
                  will fix by Friday. A Q3 OKR check-in is scheduled for next Monday.
                </p>
              </TabsContent>

              <TabsContent value="actions">
                <div className="flex flex-col gap-3">
                  {actionItems.map((item, i) => (
                    <div key={i}>
                      {i > 0 && <Separator className="mb-3" />}
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm">{item.text}</p>
                        <div className="flex items-center gap-2 shrink-0">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-[10px]">{item.assignee}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">{item.due}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="ask">
                <div className="flex flex-col gap-3">
                  <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                    Ask a question about this meeting — e.g. &quot;What did AK commit to?&quot;
                  </div>
                  <Input placeholder="Ask about this meeting..." />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
