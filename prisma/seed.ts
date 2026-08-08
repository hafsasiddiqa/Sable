import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "jordan@sable.app" },
    update: {},
    create: {
      clerkId: "temp_clerk_id",
      name: "Jordan Diaz",
      email: "jordan@sable.app",
      role: "Product Manager",
    },
  });

  const meeting1 = await prisma.meeting.create({
    data: {
      title: "Q3 Roadmap Sync",
      date: new Date("2026-08-04"),
      duration: "42 min",
      status: "Completed",
      transcript: `[00:00] JD: Alright, let's kick off the Q3 roadmap sync. First up — mobile redesign timeline.
[00:14] AK: We're on track for the Aug 20th internal demo. Design handoff finished last week.
[00:29] JD: Great. What about the API rate limiting work?
[00:41] AK: Still in progress. We found an edge case with burst traffic that needs another day.
[01:02] JD: Okay, let's flag that as a risk. Can you own a fix by end of week?
[01:10] AK: Yes, I'll have it done by Friday.
[01:18] JD: Perfect. Last item — Q3 OKR check-in scheduled for next Monday.`,
      summary:
        "The team confirmed the mobile redesign is on track for its Aug 20th demo. API rate limiting has an unresolved edge case with burst traffic, which AK will fix by Friday. A Q3 OKR check-in is scheduled for next Monday.",
      ownerId: user.id,
      actionItems: {
        create: [
          { text: "Fix API rate limiting edge case", assignee: "AK", dueDate: "Fri, Aug 8", status: "todo" },
          { text: "Prepare Q3 OKR check-in deck", assignee: "JD", dueDate: "Mon, Aug 11", status: "done" },
        ],
      },
    },
  });

  await prisma.meeting.create({
    data: {
      title: "Client Onboarding Call",
      date: new Date("2026-08-04"),
      duration: "28 min",
      status: "Completed",
      transcript: "[00:00] AK: Welcome to Sable! Let's walk through your onboarding.",
      summary: "Onboarding call covering initial setup and account configuration.",
      ownerId: user.id,
      actionItems: {
        create: [
          { text: "Follow up with client on contract terms", assignee: "AK", dueDate: "Mon, Aug 11", status: "todo" },
        ],
      },
    },
  });

  await prisma.meeting.create({
    data: {
      title: "Design Review",
      date: new Date("2026-08-03"),
      duration: "55 min",
      status: "Action Items Pending",
      transcript: "[00:00] MS: Let's review the updated design system tokens.",
      summary: "Reviewed spacing, color, and typography tokens for the new design system.",
      ownerId: user.id,
      actionItems: {
        create: [
          { text: "Update design system tokens", assignee: "MS", dueDate: "Wed, Aug 6", status: "in-progress" },
        ],
      },
    },
  });

  await prisma.meeting.create({
    data: {
      title: "Weekly Standup",
      date: new Date("2026-08-03"),
      duration: "15 min",
      status: "Completed",
      transcript: "[00:00] JD: Quick round of updates from everyone.",
      summary: "Standard weekly standup covering individual progress updates.",
      ownerId: user.id,
      actionItems: {
        create: [
          { text: "Share standup notes with team", assignee: "JD", dueDate: "Aug 3, 2026", status: "done" },
        ],
      },
    },
  });

  console.log("Seed complete:", { user, meeting1 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
