
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, HeartPulse, Video, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from '@/hooks/use-toast';
import { users, medicalRecords } from '@/lib/data';
import type { User, MedicalRecord } from '@/lib/types';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

// A simple similarity function for demo purposes.
const areFacesSimilar = (embedding1: string, embedding2: string) => {
    if (embedding1 && embedding2) {
      return embedding1.substring(0, 100) === embedding2.substring(0, 100);
    }
    return false;
};


export default function EmergencyPage() {
    const { toast } = useToast();
    const [isScanning, setIsScanning] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [patient, setPatient] = useState<User | null>(null);
    const [records, setRecords] = useState<MedicalRecord[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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

    const handleScan = async () => {
        setIsScanning(true);
        if (!videoRef.current || !hasCameraPermission) {
            toast({
                variant: 'destructive',
                title: 'Camera not available',
                description: 'Please enable camera access to scan.',
            });
            setIsScanning(false);
            return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext('2d');
        if (!context) {
            setIsScanning(false);
            return;
        }
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const capturedEmbedding = canvas.toDataURL('image/png');

        try {
            const patientUsers = users.filter(u => u.role === 'Patient');
            const foundUser = patientUsers.find(u => areFacesSimilar(capturedEmbedding, u.faceEmbedding)) || null;

            if (foundUser) {
                setPatient(foundUser);
                const patientRecords = medicalRecords.filter(r => r.patientId === foundUser.id);
                setRecords(patientRecords);
                setIsDialogOpen(true);
            } else {
                toast({
                variant: 'destructive',
                title: 'Patient Not Found',
                description: 'No matching patient record found in the system.',
                });
            }
        } catch (error) {
            console.error('Scan error:', error);
            toast({
                variant: 'destructive',
                title: 'Scan Error',
                description: 'An error occurred during the scan. Please try again.',
            });
        } finally {
            setIsScanning(false);
        }
    };

  return (
    <div className="space-y-6">
       <header>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
            <AlertCircle className="text-destructive"/>
            Emergency Access
        </h1>
        <p className="text-muted-foreground">
          Instantly recognize patients via face scan and pull up critical medical history.
        </p>
      </header>

      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
            <CardTitle>Patient Identification</CardTitle>
            <CardDescription>Position the patient's face in the camera view to retrieve their records.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
             <div className="relative aspect-video w-full overflow-hidden rounded-lg border-2 border-dashed border-destructive bg-muted">
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center bg-background/80"
                    style={{ display: hasCameraPermission ? 'none' : 'flex' }}
                >
                    <Video className="h-16 w-16 text-muted-foreground" />
                    <p className="mt-2 text-sm">Webcam feed inactive</p>
                </div>
            </div>
             { !hasCameraPermission && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Camera Access Required</AlertTitle>
                <AlertDescription>
                  Please allow camera access to use this feature.
                </AlertDescription>
              </Alert>
            )}
            <Button className="w-full" variant="destructive" onClick={handleScan} disabled={isScanning || !hasCameraPermission}>
                {isScanning ? <Loader2 className="animate-spin" /> : <HeartPulse className="mr-2 h-4 w-4" />}
                {isScanning ? 'Scanning...' : 'Scan Patient & View Records'}
            </Button>
        </CardContent>
      </Card>

       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-md">
                {patient && (
                    <>
                    <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src={patient.avatarUrl} alt={patient.name} />
                            <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {patient.name}
                    </DialogTitle>
                    <DialogDescription>
                        Age: {patient.age} | Gender: {patient.gender}
                    </DialogDescription>
                    </DialogHeader>
                    <Separator />
                    <div className="space-y-4 py-4 max-h-[50vh] overflow-y-auto">
                        <h4 className="font-semibold">Medical History</h4>
                        {records.length > 0 ? records.map(record => (
                            <div key={record.id} className="text-sm p-3 border rounded-lg">
                                <p><strong>Date:</strong> {new Date(record.date).toLocaleDateString()}</p>
                                <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                                <p><strong>Prescription:</strong> {record.prescription}</p>
                                <p><strong>Notes:</strong> {record.notes}</p>
                            </div>
                        )) : (
                            <p className="text-sm text-muted-foreground">No medical records found for this patient.</p>
                        )}
                    </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    </div>
  );
}
