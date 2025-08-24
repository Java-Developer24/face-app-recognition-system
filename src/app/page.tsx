'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, UserPlus, Video } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // In a real app, you'd handle face scanning here.
    // For this demo, we'll just navigate to the dashboard.
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-md shadow-2xl animate-in fade-in-50 zoom-in-95 duration-500">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4 border-4 border-primary/20">
            <Stethoscope className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold text-primary font-headline">FaceCheck Hospital</CardTitle>
          <CardDescription>Sign in with your Face ID to access your portal.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border-2 border-dashed bg-muted">
            <div className="flex h-full w-full flex-col items-center justify-center text-muted-foreground">
              <Video className="h-16 w-16" />
              <p className="mt-2 text-sm">Webcam feed inactive</p>
            </div>
          </div>
          <Button onClick={handleLogin} className="w-full" size="lg">
            Scan Face to Log In
          </Button>
          <div className="text-center text-sm">
            <Link href="#" className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <UserPlus className="h-4 w-4" />
              <span>Don't have an account? Register here</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
