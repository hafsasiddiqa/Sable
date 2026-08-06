import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ListChecks, Search } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Summaries",
    description: "Every meeting transcript is distilled into a clear, readable summary in seconds.",
  },
  {
    icon: ListChecks,
    title: "Action Item Tracking",
    description: "Commitments made in meetings become trackable tasks automatically, assigned to the right person.",
  },
  {
    icon: Search,
    title: "Semantic Search",
    description: "Find any decision or discussion across every meeting your team has ever had.",
  },
];

const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    description: "For individuals trying it out",
    features: ["5 meetings/month", "Basic summaries", "1 workspace member"],
  },
  {
    name: "Pro",
    price: "$24",
    description: "For small teams",
    features: ["Unlimited meetings", "AI summaries + action items", "Ask AI chat", "Up to 10 members"],
    highlighted: true,
  },
  {
    name: "Team",
    price: "$59",
    description: "For growing organizations",
    features: ["Everything in Pro", "Unlimited members", "Admin controls", "Priority support"],
  },
];

export default function MarketingPage() {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <span className="text-lg font-semibold">Sable</span>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">Product</Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Docs</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sign In
            </Link>
            <Button asChild size="sm">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 pt-24 pb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Turn every meeting into searchable knowledge
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          Sable transcribes, summarizes, and tracks action items from your meetings automatically —
          so nothing important gets lost again.
        </p>
        <div className="flex items-center gap-3">
          <Button asChild size="lg">
            <Link href="/dashboard">Get Started Free</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#features">Watch Demo</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="rounded-xl border border-border bg-muted/30 p-2 shadow-sm">
          <div className="rounded-lg border border-border bg-background p-8 text-center text-sm text-muted-foreground">
            [ Product screenshot placeholder ]
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="h-5 w-5 text-primary mb-2" />
                <CardTitle className="text-base">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold">Simple, transparent pricing</h2>
          <p className="text-sm text-muted-foreground mt-2">Start free. Upgrade when your team grows.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={tier.highlighted ? "border-primary shadow-md md:-translate-y-2" : ""}
            >
              <CardHeader>
                <CardTitle className="text-base">{tier.name}</CardTitle>
                <div className="text-3xl font-semibold mt-2">
                  {tier.price}
                  <span className="text-sm font-normal text-muted-foreground">/mo</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{tier.description}</p>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <ul className="flex flex-col gap-2">
                  {tier.features.map((f) => (
                    <li key={f} className="text-sm text-muted-foreground">· {f}</li>
                  ))}
                </ul>
                <Button asChild className="mt-2" variant={tier.highlighted ? "default" : "outline"}>
                  <Link href="/dashboard">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-10 text-sm text-muted-foreground text-center">
          © 2026 Sable. Built as a portfolio project.
        </div>
      </footer>
    </div>
  );
}
