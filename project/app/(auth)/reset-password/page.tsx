'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthLayout, Button, Input, Label, Lock } from '@/components/auth/auth-layout';
import { Eye, EyeOff } from 'lucide-react';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout
      title="Set a new password"
      subtitle="Choose a strong password for your account."
      altLink={{ text: 'Ready to sign in?', href: '/login', label: 'Sign in' }}
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          router.push('/login');
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="password">New password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter new password"
              className="pl-9 pr-9"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm">Confirm password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="confirm"
              type="password"
              placeholder="Confirm new password"
              className="pl-9"
              required
            />
          </div>
        </div>
        <Button type="submit" className="w-full">
          Reset Password
        </Button>
      </form>
    </AuthLayout>
  );
}
