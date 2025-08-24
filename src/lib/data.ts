import type { User, Appointment, MedicalRecord, Schedule } from './types';

export const users: User[] = [
  {
    id: 'P001',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    contact: 'john.doe@email.com',
    role: 'Patient',
    faceEmbedding: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    avatarUrl: 'https://placehold.co/100x100/64B5F6/FFFFFF.png',
  },
  {
    id: 'P002',
    name: 'Jane Smith',
    age: 34,
    gender: 'Female',
    contact: 'jane.smith@email.com',
    role: 'Patient',
    faceEmbedding: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
    avatarUrl: 'https://placehold.co/100x100/81C784/FFFFFF.png',
  },
  {
    id: 'E001',
    name: 'Dr. Emily Carter',
    age: 42,
    gender: 'Female',
    contact: 'emily.carter@hospital.com',
    role: 'Doctor',
    faceEmbedding: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR42mNk+M+AARgAI/8Bv5r0aQAAAABJRU5ErkJggg==',
    avatarUrl: 'https://placehold.co/100x100/6495ED/FFFFFF.png',
  },
  {
    id: 'E002',
    name: 'Michael Brown',
    age: 29,
    gender: 'Male',
    contact: 'michael.brown@hospital.com',
    role: 'Nurse',
    faceEmbedding: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8/5/hPwAGtAL+V3+GVAAAAABJRU5ErkJggg==',
    avatarUrl: 'https://placehold.co/100x100/4682B4/FFFFFF.png',
  },
  {
    id: 'A001',
    name: 'Sarah Wilson',
    age: 51,
    gender: 'Female',
    contact: 'sarah.wilson@hospital.com',
    role: 'Admin',
    faceEmbedding: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
    avatarUrl: 'https://placehold.co/100x100/FF6347/FFFFFF.png',
  },
  {
    id: 'P003',
    name: 'Johnathan Doe',
    age: 46,
    gender: 'Male',
    contact: 'john.doe.clone@email.com',
    role: 'Patient',
    faceEmbedding: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    avatarUrl: 'https://placehold.co/100x100/64B5F6/FFFFFF.png',
  }
];

export const appointments: Appointment[] = [
  { id: 'APP001', patientId: 'P001', patientName: 'John Doe', doctorName: 'Dr. Emily Carter', date: '2024-08-15', time: '10:00 AM', reason: 'Annual Checkup', status: 'Scheduled' },
  { id: 'APP002', patientId: 'P002', patientName: 'Jane Smith', doctorName: 'Dr. Emily Carter', date: '2024-08-15', time: '11:00 AM', reason: 'Follow-up', status: 'Scheduled' },
  { id: 'APP003', patientId: 'P001', patientName: 'John Doe', doctorName: 'Dr. Emily Carter', date: '2024-07-20', time: '02:00 PM', reason: 'Flu symptoms', status: 'Completed' },
];

export const medicalRecords: MedicalRecord[] = [
  { id: 'MR001', patientId: 'P001', date: '2024-07-20', diagnosis: 'Influenza', prescription: 'Oseltamivir', notes: 'Patient advised rest and hydration.' },
  { id: 'MR002', patientId: 'P002', date: '2024-06-10', diagnosis: 'Migraine', prescription: 'Sumatriptan', notes: 'Follow-up scheduled.' },
];

export const schedules: Schedule[] = [
    { id: 'S001', employeeId: 'E001', employeeName: 'Dr. Emily Carter', date: '2024-08-15', shift: 'Morning (8AM-4PM)'},
    { id: 'S002', employeeId: 'E002', employeeName: 'Michael Brown', date: '2024-08-15', shift: 'Morning (8AM-4PM)'},
    { id: 'S003', employeeId: 'E001', employeeName: 'Dr. Emily Carter', date: '2024-08-16', shift: 'Morning (8AM-4PM)'},
    { id: 'S004', employeeId: 'E002', employeeName: 'Michael Brown', date: '2024-08-16', shift: 'Evening (4PM-12AM)'},
];

export const currentUser = users.find(u => u.id === 'A001')!; // Default to Admin for full view
