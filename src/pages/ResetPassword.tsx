import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { SEOHead } from "@/components/SEOHead";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // The recovery link signs the visitor in with a temporary session
    const isRecovery = window.location.hash.includes("type=recovery");
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || (isRecovery && session)) setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session && isRecovery) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast({ title: "Password too short", description: "Use at least 8 characters.", variant: "destructive" });
      return;
    }
    if (password !== confirm) {
      toast({ title: "Passwords do not match", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast({ title: "Could not update password", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Password updated" });
    navigate("/admin/opportunities", { replace: true });
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-background px-4">
      <SEOHead noIndex title="Reset Password - SHAMS" description="Set a new password for your SHAMS admin account" />
      <main id="main-content" className="w-full max-w-sm">
        {ready ? (
          <form onSubmit={handleSubmit} className="space-y-4 border border-border rounded-lg p-6 bg-card">
            <h1 className="text-xl font-bold text-foreground">Set a new password</h1>
            <div className="space-y-2">
              <Label htmlFor="new-password">New password</Label>
              <Input id="new-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} autoComplete="new-password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm new password</Label>
              <Input id="confirm-password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required minLength={8} autoComplete="new-password" />
            </div>
            <Button type="submit" className="w-full min-h-[44px]" disabled={loading}>
              {loading ? "Saving..." : "Save new password"}
            </Button>
          </form>
        ) : (
          <div className="space-y-3 border border-border rounded-lg p-6 bg-card">
            <h1 className="text-xl font-bold text-foreground">Reset link needed</h1>
            <p className="text-sm text-muted-foreground">
              Open the password reset link from your email to set a new password. Links expire after a short time.
            </p>
            <Button variant="outline" className="w-full min-h-[44px]" onClick={() => navigate("/admin/login")}>
              Back to admin sign in
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ResetPassword;
