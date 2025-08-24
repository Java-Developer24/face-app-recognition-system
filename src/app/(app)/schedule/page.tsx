'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { schedules, currentUser } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { Schedule, User } from "@/lib/types";

export default function SchedulePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you might have a more robust way to get the current user.
    // Here we simulate fetching it.
    if (currentUser) {
        setUser(currentUser);
    }
    setIsLoading(false);
  }, []);
  
  const mySchedule = user ? schedules.filter(s => s.employeeId === user.id) : [];

  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-full">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
  }

  if (!user) {
      return (
          <div className="flex justify-center items-center h-full">
              <p>Please log in to see your schedule.</p>
          </div>
      );
  }

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
                  <Badge variant="secondary">{user.name}</Badge>
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
