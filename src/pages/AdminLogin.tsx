import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { SEOHead } from "@/components/SEOHead";

type Mode = "signin" | "signup" | "forgot";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate("/admin/opportunities", { replace: true });
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin/opportunities", { replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      setLoading(false);
      if (error) {
        toast({ title: "Sign-in failed", description: "Check your email and password, and confirm your email if you just signed up.", variant: "destructive" });
      }
      return;
    }
    if (mode === "forgot") {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      setLoading(false);
      if (error) {
        toast({ title: "Could not send reset email", description: "Please try again in a few minutes.", variant: "destructive" });
        return;
      }
      setResetSent(true);
      return;
    }
    if (password.length < 8) {
      setLoading(false);
      toast({ title: "Password too short", description: "Use at least 8 characters.", variant: "destructive" });
      return;
    }
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { emailRedirectTo: `${window.location.origin}/admin/login` },
    });
    setLoading(false);
    if (error) {
      toast({ title: "Could not create account", description: error.message, variant: "destructive" });
      return;
    }
    setCheckEmail(true);
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-background px-4">
      <SEOHead title="Admin Login - SHAMS" description="SHAMS admin sign-in" />
      {resetSent ? (
        <div className="w-full max-w-sm space-y-3 border border-border rounded-lg p-6 bg-card" role="status">
          <h1 className="text-xl font-bold text-foreground">Check your email</h1>
          <p className="text-sm text-muted-foreground">
            If an account exists for {email.trim()}, we sent a link to set a new password.
          </p>
          <Button variant="outline" className="w-full min-h-[44px]" onClick={() => { setResetSent(false); setMode("signin"); }}>
            Back to sign in
          </Button>
        </div>
      ) : checkEmail ? (
        <div className="w-full max-w-sm space-y-3 border border-border rounded-lg p-6 bg-card" role="status">
          <h1 className="text-xl font-bold text-foreground">Check your email</h1>
          <p className="text-sm text-muted-foreground">
            We sent a confirmation link to {email.trim()}. Open it to finish creating your account, then sign in here.
            Admin access is only given to approved SHAMS addresses.
          </p>
          <Button variant="outline" className="w-full min-h-[44px]" onClick={() => { setCheckEmail(false); setMode("signin"); }}>
            Back to sign in
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 border border-border rounded-lg p-6 bg-card">
          <div>
            <h1 className="text-xl font-bold text-foreground">
              {mode === "signin" ? "Admin sign in" : mode === "signup" ? "Create an admin account" : "Reset your password"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Restricted area. Authorized SHAMS administrators only.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" maxLength={255} />
          </div>
          {mode !== "forgot" && (
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={mode === "signup" ? 8 : undefined}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
            />
          </div>
          )}
          <Button type="submit" className="w-full min-h-[44px]" disabled={loading}>
            {loading ? "Please wait..." : mode === "signin" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset link"}
          </Button>
          <button
            type="button"
            className="w-full text-sm text-primary underline-offset-4 hover:underline min-h-[44px]"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          >
            {mode === "signin" ? "First time here? Create an account" : "Already have an account? Sign in"}
          </button>
          {mode === "signin" && (
            <button
              type="button"
              className="w-full text-sm text-muted-foreground underline-offset-4 hover:underline min-h-[44px]"
              onClick={() => setMode("forgot")}
            >
              Forgot your password?
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default AdminLogin;
