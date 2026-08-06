import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const settingsNav = ["Profile", "Workspace", "Billing", "Integrations"];

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account and workspace preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
        <nav className="flex flex-row md:flex-col gap-1">
          {settingsNav.map((item, i) => (
            <button
              key={item}
              className={`text-left text-sm rounded-md px-3 py-2 transition-colors ${
                i === 0
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:bg-accent/50"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Full name</label>
              <Input defaultValue="Jordan Diaz" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Email</label>
              <Input defaultValue="jordan@sable.app" type="email" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Role</label>
              <Input defaultValue="Product Manager" />
            </div>
            <Separator />
            <div className="flex justify-end">
              <Button>Save changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
