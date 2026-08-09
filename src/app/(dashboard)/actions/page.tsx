import { prisma } from "@/lib/prisma";
import { AnimatedBoard } from "./animated-board";

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

      <AnimatedBoard columns={columns} />
    </div>
  );
}
