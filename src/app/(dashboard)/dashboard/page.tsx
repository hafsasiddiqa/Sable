import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const stats = [
  { label: "Total Meetings", value: "128", trend: "+12 this month" },
  { label: "Open Action Items", value: "24", trend: "6 due this week" },
  { label: "This Week's Meetings", value: "9", trend: "3 upcoming" },
];

const recentMeetings = [
  { title: "Q3 Roadmap Sync", date: "Aug 4, 2026", status: "Completed", initials: "JD" },
  { title: "Client Onboarding Call", date: "Aug 4, 2026", status: "Completed", initials: "AK" },
  { title: "Design Review", date: "Aug 3, 2026", status: "Action Items Pending", initials: "MS" },
  { title: "Weekly Standup", date: "Aug 3, 2026", status: "Completed", initials: "JD" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Overview</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back. Here&apos;s what&apos;s happening across your meetings.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Meetings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {recentMeetings.map((meeting) => (
              <div
                key={meeting.title}
                className="flex items-center justify-between px-6 py-3 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {meeting.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{meeting.title}</p>
                    <p className="text-xs text-muted-foreground">{meeting.date}</p>
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
