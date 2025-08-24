// src/app/register/page.tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Stethoscope, UserPlus, Video, CheckCircle, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, addDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other' | ''>('');
  const [role, setRole] = useState<'Patient' | 'Doctor' | 'Nurse' | 'Admin'>('Patient');
  const [faceEmbedding, setFaceEmbedding] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  
  const captureFaceEmbedding = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUri = canvas.toDataURL('image/png');
        setFaceEmbedding(dataUri);
        toast({
          title: "Face Captured!",
          description: "Your face has been successfully scanned.",
          className: "bg-accent text-accent-foreground",
        });
      }
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faceEmbedding) {
       toast({
        variant: 'destructive',
        title: 'Registration Error',
        description: 'Please capture your face embedding before registering.',
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "users"), {
        name,
        email,
        age: Number(age),
        gender,
        role,
        faceEmbedding,
        avatarUrl: `https://placehold.co/100x100/64B5F6/FFFFFF.png?text=${name.charAt(0)}`
      });

      toast({
        title: "Registration Successful!",
        description: "Your account has been created. You can now log in.",
      });

      router.push('/');
    } catch (error) {
      console.error("Error adding document: ", error);
       toast({
        variant: 'destructive',
        title: 'Registration Error',
        description: 'Could not create your account. Please try again.',
      });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4 border-4 border-primary/20">
            <UserPlus className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold text-primary font-headline">Create an Account</CardTitle>
          <CardDescription>Fill out the form below to register.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john.doe@example.com" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="30" required />
              </div>
              <div className="space-y-2">
                 <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={(value: any) => setGender(value)} required>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select onValueChange={(value: any) => setRole(value)} defaultValue="Patient" required>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Patient">Patient</SelectItem>
                    <SelectItem value="Doctor">Doctor</SelectItem>
                    <SelectItem value="Nurse">Nurse</SelectItem>
                     <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            <div className="space-y-2">
              <Label>Face Scan</Label>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border-2 border-dashed bg-muted">
                 <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                 { !hasCameraPermission && (
                    <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center text-muted-foreground bg-background/80">
                        <Video className="h-16 w-16" />
                        <p className="mt-2 text-sm">Enable camera access</p>
                    </div>
                 )}
              </div>
              { !hasCameraPermission && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Camera Access Required</AlertTitle>
                  <AlertDescription>
                    Please enable camera permissions in your browser settings to use this feature.
                  </AlertDescription>
                </Alert>
              )}
               <Button type="button" variant="outline" className="w-full" onClick={captureFaceEmbedding} disabled={!hasCameraPermission}>
                {faceEmbedding ? <CheckCircle className="mr-2" /> : <Video className="mr-2" />}
                {faceEmbedding ? 'Face Scanned' : 'Scan Face'}
              </Button>
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting || !faceEmbedding}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
