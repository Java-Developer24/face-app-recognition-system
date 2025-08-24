import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, HeartPulse, Video } from "lucide-react";
import { medicalRecords, users } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function EmergencyPage() {
    const emergencyPatient = users.find(u => u.id === 'P001')!;
    const patientRecords = medicalRecords.filter(r => r.patientId === 'P001');

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
                <div className="flex h-full w-full flex-col items-center justify-center text-muted-foreground">
                <Video className="h-16 w-16" />
                <p className="mt-2 text-sm">Webcam feed</p>
                </div>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="w-full" variant="destructive">
                        <HeartPulse className="mr-2 h-4 w-4" />
                        Scan Patient & View Records
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src={emergencyPatient.avatarUrl} />
                            <AvatarFallback>{emergencyPatient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {emergencyPatient.name}
                    </DialogTitle>
                    <DialogDescription>
                        Age: {emergencyPatient.age} | Gender: {emergencyPatient.gender}
                    </DialogDescription>
                    </DialogHeader>
                    <Separator />
                    <div className="space-y-4 py-4">
                        <h4 className="font-semibold">Medical History</h4>
                        {patientRecords.map(record => (
                            <div key={record.id} className="text-sm p-3 border rounded-lg">
                                <p><strong>Date:</strong> {record.date}</p>
                                <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                                <p><strong>Prescription:</strong> {record.prescription}</p>
                                <p><strong>Notes:</strong> {record.notes}</p>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
