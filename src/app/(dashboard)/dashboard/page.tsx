import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { prisma } from "@/lib/prisma";
import { AnimatedStats } from "./animated-stats";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default async function DashboardPage() {
  const totalMeetings = await prisma.meeting.count();
  const openActionItems = await prisma.actionItem.count({
    where: { status: { not: "done" } },
  });

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const thisWeekMeetings = await prisma.meeting.count({
    where: { date: { gte: oneWeekAgo } },
  });

  const recentMeetings = await prisma.meeting.findMany({
    take: 4,
    orderBy: { date: "desc" },
    include: { owner: true },
  });

  const stats = [
    { label: "Total Meetings", value: totalMeetings.toString(), trend: `${totalMeetings} total` },
    { label: "Open Action Items", value: openActionItems.toString(), trend: "pending completion" },
    { label: "This Week's Meetings", value: thisWeekMeetings.toString(), trend: "in the last 7 days" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Overview</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back. Here&apos;s what&apos;s happening across your meetings.
        </p>
      </div>

      <AnimatedStats stats={stats} />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Meetings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {recentMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="flex items-center justify-between px-6 py-3 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {getInitials(meeting.owner.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{meeting.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {meeting.date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    meeting.status === "Completed"
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-accent text-accent-foreground"
                  }`}
                >
                  {meeting.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
