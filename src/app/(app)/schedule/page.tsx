import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { schedules, currentUser } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";

export default function SchedulePage() {
  const mySchedule = schedules.filter(s => s.employeeId === currentUser.id);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold font-headline">My Schedule</h1>
        <p className="text-muted-foreground">
          Here are your assigned shifts for the upcoming week.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Shifts</CardTitle>
          <CardDescription>Your schedule from {new Date().toLocaleDateString()} to {new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
              {mySchedule.length > 0 ? mySchedule.map((schedule) => (
                <div key={schedule.id} className="flex items-center p-4 border rounded-lg">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mr-4">
                    <CalendarDays className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{new Date(schedule.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                    <p className="text-sm text-muted-foreground">{schedule.shift}</p>
                  </div>
                  <Badge variant="secondary">{currentUser.name}</Badge>
                </div>
              )) : (
                <p className="text-muted-foreground text-center py-8">No shifts assigned for this period.</p>
              )}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
