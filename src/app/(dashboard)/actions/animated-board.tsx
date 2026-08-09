"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type ActionItem = {
  id: string;
  text: string;
  assignee: string;
  dueDate: string;
  meeting: { title: string };
};

type Column = {
  key: string;
  title: string;
  items: ActionItem[];
};

export function AnimatedBoard({ columns }: { columns: Column[] }) {
  let globalIndex = 0;

  return (
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
            {column.items.map((item) => {
              const delay = globalIndex * 0.06;
              globalIndex++;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay, ease: "easeOut" }}
                >
                  <Card>
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
                </motion.div>
              );
            })}
            {column.items.length === 0 && (
              <div className="text-xs text-muted-foreground text-center py-6 border border-dashed border-border rounded-lg">
                No items
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
