import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { appointments } from "@/lib/data";
import { PlusCircle } from "lucide-react";

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold font-headline">Appointments</h1>
          <p className="text-muted-foreground">
            View and manage your appointments.
          </p>
        </div>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Book New Appointment
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appt) => (
                <div key={appt.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div>
                    <p className="font-semibold">{appt.reason}</p>
                    <p className="text-sm text-muted-foreground">
                      With {appt.doctorName} on {new Date(appt.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at {appt.time}
                    </p>
                  </div>
                  <Badge variant={appt.status === 'Scheduled' ? 'default' : 'outline'}>
                    {appt.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Select a Date</CardTitle>
                <CardDescription>View appointments for a specific day.</CardDescription>
            </CardHeader>
            <CardContent>
                <Calendar
                    mode="single"
                    selected={new Date()}
                    className="rounded-md border"
                />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
