'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter
} from '@/components/ui/sidebar';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  LayoutDashboard,
  CalendarCheck,
  HeartPulse,
  LogOut,
  Stethoscope,
  CalendarClock,
  Users,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { currentUser, setCurrentUser } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import type { User } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['Patient', 'Doctor', 'Nurse', 'Admin'] },
  { href: '/appointments', icon: CalendarCheck, label: 'Appointments', roles: ['Patient', 'Doctor', 'Admin'] },
  { href: '/schedule', icon: CalendarClock, label: 'My Schedule', roles: ['Doctor', 'Nurse', 'Admin'] },
  { href: '/emergency', icon: HeartPulse, label: 'Emergency', roles: ['Doctor', 'Nurse', 'Admin'] },
  { href: '/admin/duplicates', icon: Users, label: 'Find Duplicates', roles: ['Admin'] },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(currentUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      router.push('/');
    } else {
      setUser(currentUser);
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    setCurrentUser(null);
    router.push('/');
  };

  if (isLoading) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        </div>
    );
  }
  
  const userRole = user?.role;

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
              <Stethoscope className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-semibold text-primary font-headline">FaceCheck</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.filter(item => userRole && item.roles.includes(userRole)).map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} className="w-full">
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.href)}
                    tooltip={{ children: item.label }}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            {user && (
                <div className="flex items-center gap-3 rounded-md p-2 bg-muted">
                    <Avatar className="h-10 w-10 border-2 border-primary/50">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                        <p className="font-semibold truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.role}</p>
                    </div>
                    <Button variant="ghost" size="icon" title="Logout" onClick={handleLogout}>
                        <LogOut className="h-5 w-5 text-muted-foreground hover:text-destructive" />
                    </Button>
                </div>
            )}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center justify-between border-b bg-card/80 backdrop-blur-sm px-4 lg:px-6 sticky top-0 z-30">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1">
                {/* Could add breadcrumbs or page title here */}
            </div>
             {user && (
                <Avatar>
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
             )}
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-secondary/50">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
