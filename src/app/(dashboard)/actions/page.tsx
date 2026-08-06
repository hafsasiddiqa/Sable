import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type ActionItem = {
  id: string;
  text: string;
  meeting: string;
  assignee: string;
  due: string;
};

const columns: { key: string; title: string; items: ActionItem[] }[] = [
  {
    key: "todo",
    title: "To Do",
    items: [
      { id: "1", text: "Fix API rate limiting edge case", meeting: "Q3 Roadmap Sync", assignee: "AK", due: "Fri, Aug 8" },
      { id: "2", text: "Follow up with client on contract terms", meeting: "Client Onboarding Call", assignee: "AK", due: "Mon, Aug 11" },
    ],
  },
  {
    key: "in-progress",
    title: "In Progress",
    items: [
      { id: "3", text: "Update design system tokens", meeting: "Design Review", assignee: "MS", due: "Wed, Aug 6" },
    ],
  },
  {
    key: "done",
    title: "Done",
    items: [
      { id: "4", text: "Prepare Q3 OKR check-in deck", meeting: "Q3 Roadmap Sync", assignee: "JD", due: "Mon, Aug 11" },
      { id: "5", text: "Share standup notes with team", meeting: "Weekly Standup", assignee: "JD", due: "Aug 3, 2026" },
    ],
  },
];

export default function ActionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Action Items</h1>
        <p className="text-sm text-muted-foreground">
          Track commitments made across your meetings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((column) => (
          <div key={column.key} className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-medium text-muted-foreground">{column.title}</h2>
              <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                {column.items.length}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {column.items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="pt-4 flex flex-col gap-2">
                    <p className="text-sm">{item.text}</p>
                    <span className="text-xs text-muted-foreground w-fit bg-secondary rounded-full px-2 py-0.5">
                      {item.meeting}
                    </span>
                    <div className="flex items-center justify-between pt-1">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[10px]">{item.assignee}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{item.due}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {column.items.length === 0 && (
                <div className="text-xs text-muted-foreground text-center py-6 border border-dashed border-border rounded-lg">
                  No items
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
