import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const meetings = [
  {
    id: "1",
    title: "Q3 Roadmap Sync",
    date: "Aug 4, 2026",
    duration: "42 min",
    status: "Completed",
    participants: ["JD", "AK"],
  },
  {
    id: "2",
    title: "Client Onboarding Call",
    date: "Aug 4, 2026",
    duration: "28 min",
    status: "Completed",
    participants: ["AK"],
  },
  {
    id: "3",
    title: "Design Review",
    date: "Aug 3, 2026",
    duration: "55 min",
    status: "Action Items Pending",
    participants: ["MS", "JD"],
  },
  {
    id: "4",
    title: "Weekly Standup",
    date: "Aug 3, 2026",
    duration: "15 min",
    status: "Completed",
    participants: ["JD", "AK", "MS"],
  },
];

export default function MeetingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Meetings</h1>
        <p className="text-sm text-muted-foreground">
          All your transcribed and summarized meetings in one place.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {meetings.map((meeting) => (
          <Link key={meeting.id} href={`/meetings/${meeting.id}`}>
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center justify-between py-2">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {meeting.participants.map((initials, i) => (
                      <Avatar key={i} className="h-8 w-8 border-2 border-background">
                        <AvatarFallback className="text-xs">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{meeting.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {meeting.date} · {meeting.duration}
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
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
