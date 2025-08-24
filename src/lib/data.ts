import type { User, Appointment, MedicalRecord, Schedule } from './types';

// In-memory data store for demonstration purposes.
// Data will reset when the application restarts.

export let users: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    age: 34,
    gender: 'Male',
    contact: 'john.doe@example.com',
    role: 'Patient',
    avatarUrl: 'https://placehold.co/100x100/64B5F6/FFFFFF.png?text=JD',
    faceEmbedding: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9mQAAAABJRU5ErkJggg==',
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    age: 45,
    gender: 'Female',
    contact: 'jane.smith@example.com',
    role: 'Patient',
    avatarUrl: 'https://placehold.co/100x100/F664E8/FFFFFF.png?text=JS',
    faceEmbedding: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkuM9QDwADhgGAWjR9mQAAAABJRU5ErkJggg==',
  },
    {
    id: 'user-2-duplicate',
    name: 'Jane Smith',
    age: 45,
    gender: 'Female',
    contact: 'jane.smith.alt@example.com',
    role: 'Patient',
    avatarUrl: 'https://placehold.co/100x100/F664E8/FFFFFF.png?text=JS',
    faceEmbedding: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkuM9QDwADhgGAWjR9mQAAAABJRU5ErkJggg==',
  },
  {
    id: 'user-3',
    name: 'Dr. Emily Carter',
    age: 38,
    gender: 'Female',
    contact: 'emily.carter@hospital.com',
    role: 'Doctor',
    avatarUrl: 'https://placehold.co/100x100/64F6A4/FFFFFF.png?text=EC',
    faceEmbedding: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M8gDwADhgGAWjR9mQAAAABJRU5ErkJggg==',
  },
  {
    id: 'user-4',
    name: 'Michael Brown',
    age: 42,
    gender: 'Male',
    contact: 'michael.brown@hospital.com',
    role: 'Nurse',
    avatarUrl: 'https://placehold.co/100x100/E864F6/FFFFFF.png?text=MB',
    faceEmbedding: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkyM8gDwADhgGAWjR9mQAAAABJRU5ErkJggg==',
  },
   {
    id: 'user-5',
    name: 'Admin User',
    age: 50,
    gender: 'Other',
    contact: 'admin@hospital.com',
    role: 'Admin',
    avatarUrl: 'https://placehold.co/100x100/F6E864/FFFFFF.png?text=AU',
    faceEmbedding: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M+gDwADhgGAWjR9mQAAAABJRU5ErkJggg==',
  },
];

export const appointments: Appointment[] = [
  { id: 'appt-1', patientId: 'user-1', patientName: 'John Doe', doctorName: 'Dr. Carter', date: new Date().toISOString(), time: '10:00 AM', reason: 'Annual Check-up', status: 'Scheduled' },
  { id: 'appt-2', patientId: 'user-2', patientName: 'Jane Smith', doctorName: 'Dr. Carter', date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), time: '02:30 PM', reason: 'Follow-up', status: 'Scheduled' },
];

export const medicalRecords: MedicalRecord[] = [
  { id: 'rec-1', patientId: 'user-1', date: '2023-10-15', diagnosis: 'Hypertension', prescription: 'Lisinopril', notes: 'Patient advised to monitor blood pressure.' },
  { id: 'rec-2', patientId: 'user-2', date: '2023-09-20', diagnosis: 'Allergic Rhinitis', prescription: 'Cetirizine', notes: 'Seasonal allergies.' },
];

export const schedules: Schedule[] = [
    { id: 'sch-1', employeeId: 'user-3', employeeName: 'Dr. Emily Carter', date: new Date().toISOString(), shift: 'Morning (8AM-4PM)' },
    { id: 'sch-2', employeeId: 'user-4', employeeName: 'Michael Brown', date: new Date().toISOString(), shift: 'Evening (4PM-12AM)' },
];

export let currentUser: User | null = users.find(u => u.role === 'Admin') || null;

export function setCurrentUser(user: User | null) {
  currentUser = user;
}

export function addUser(user: Omit<User, 'id'>) {
    const newUser = { ...user, id: `user-${Date.now()}`};
    users.push(newUser);
    return newUser;
}
