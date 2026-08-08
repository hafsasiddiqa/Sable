import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";
import { AskAiPanel } from "./ask-ai-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function MeetingDetailPage({ params }: { params: { id: string } }) {
  const meeting = await prisma.meeting.findUnique({
    where: { id: params.id },
    include: { owner: true, actionItems: true },
  });

  if (!meeting) {
    notFound();
  }

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
        <h1 className="text-2xl font-semibold">{meeting.title}</h1>
        <p className="text-sm text-muted-foreground">
          {meeting.date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}{" "}
          · {meeting.duration} · Meeting #{meeting.id}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Transcript</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/90">
              {meeting.transcript}
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
                  {meeting.summary}
                </p>
              </TabsContent>

              <TabsContent value="actions">
                <div className="flex flex-col gap-3">
                  {meeting.actionItems.length === 0 && (
                    <p className="text-sm text-muted-foreground">No action items for this meeting.</p>
                  )}
                  {meeting.actionItems.map((item, i) => (
                    <div key={item.id}>
                      {i > 0 && <Separator className="mb-3" />}
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm">{item.text}</p>
                        <div className="flex items-center gap-2 shrink-0">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-[10px]">{item.assignee}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">{item.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="ask">
                <AskAiPanel meetingId={meeting.id} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
