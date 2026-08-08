import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { prisma } from "@/lib/prisma";

const COLUMN_CONFIG = [
  { key: "todo", title: "To Do" },
  { key: "in-progress", title: "In Progress" },
  { key: "done", title: "Done" },
];

export default async function ActionsPage() {
  const actionItems = await prisma.actionItem.findMany({
    include: { meeting: true },
    orderBy: { createdAt: "asc" },
  });

  const columns = COLUMN_CONFIG.map((col) => ({
    ...col,
    items: actionItems.filter((item) => item.status === col.key),
  }));

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
                      {item.meeting.title}
                    </span>
                    <div className="flex items-center justify-between pt-1">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[10px]">{item.assignee}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{item.dueDate}</span>
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
