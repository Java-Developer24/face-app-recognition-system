'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, UserPlus, Video, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { setCurrentUser } from '@/lib/data';

// A simple similarity function for demo purposes.
// In a real app, this would be a sophisticated face recognition model.
const areFacesSimilar = (embedding1: string, embedding2: string) => {
    // This is a placeholder. A real implementation would compare embeddings.
    // For this demo, we'll consider them similar if they are not empty.
    // This is NOT secure and for demonstration only.
    if (embedding1 && embedding2) {
      // A slightly more complex check for demo to differentiate scans a little.
      // This is still not a real similarity check.
      return embedding1.substring(0, 100) === embedding2.substring(0, 100);
    }
    return false;
};

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
      }
    };
    getCameraPermission();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    if (!videoRef.current || !hasCameraPermission) {
      toast({
        variant: 'destructive',
        title: 'Camera not available',
        description: 'Please enable camera access to log in.',
      });
      setIsLoggingIn(false);
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext('2d');
    if (!context) {
      setIsLoggingIn(false);
      return;
    }
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const capturedEmbedding = canvas.toDataURL('image/png');

    try {
      const usersCollection = collection(db, 'users');
      const querySnapshot = await getDocs(usersCollection);
      
      let foundUser = null;
      
      for (const doc of querySnapshot.docs) {
          const userData = doc.data();
          if (areFacesSimilar(capturedEmbedding, userData.faceEmbedding)) {
              foundUser = { id: doc.id, ...userData };
              break;
          }
      }

      if (foundUser) {
        setCurrentUser(foundUser as any);
        toast({
          title: `Welcome back, ${foundUser.name}!`,
          description: 'You have been successfully logged in.',
          className: "bg-accent text-accent-foreground",
        });
        router.push('/dashboard');
      } else {
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: 'No matching user found. Please register or try again.',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: 'destructive',
        title: 'Login Error',
        description: 'An error occurred during login. Please try again.',
      });
    } finally {
      setIsLoggingIn(false);
    }
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
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
            { !hasCameraPermission && (
                <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center text-muted-foreground bg-background/80">
                <Video className="h-16 w-16" />
                <p className="mt-2 text-sm">Webcam feed inactive</p>
                </div>
            )}
          </div>
          <Button onClick={handleLogin} className="w-full" size="lg" disabled={isLoggingIn || !hasCameraPermission}>
            {isLoggingIn ? <Loader2 className="animate-spin" /> : 'Scan Face to Log In'}
          </Button>
          <div className="text-center text-sm">
            <Link href="/register" className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <UserPlus className="h-4 w-4" />
              <span>Don't have an account? Register here</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
