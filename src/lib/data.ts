import type { User, Appointment, MedicalRecord, Schedule } from './types';

// This file now contains only type definitions and is kept for reference.
// All data is now fetched from Firestore.

export const users: User[] = [];

export const appointments: Appointment[] = [];

export const medicalRecords: MedicalRecord[] = [];

export const schedules: Schedule[] = [];

export let currentUser: User | null = null;

export function setCurrentUser(user: User | null) {
  currentUser = user;
}
