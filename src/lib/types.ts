export interface User {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  contact: string;
  role: 'Patient' | 'Doctor' | 'Nurse' | 'Admin';
  faceEmbedding: string; // data URI placeholder
  avatarUrl: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  reason: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  date: string;
  diagnosis: string;
  prescription: string;
  notes: string;
}

export interface Schedule {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  shift: 'Morning (8AM-4PM)' | 'Evening (4PM-12AM)' | 'Night (12AM-8AM)';
}
