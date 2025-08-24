import { collection, query, where, getDocs, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { User, Appointment, MedicalRecord, Schedule } from './types';

// This file now contains functions to interact with Firestore.
// The local data arrays have been removed.

let currentUser: User | null = null; // This will be managed client-side

export function setCurrentUser(user: User | null) {
  // This function is now primarily for client-side state management.
  // In a real app, you'd use React Context or a state management library.
  currentUser = user;
}

export function getCurrentUser(): User | null {
    return currentUser;
}

// --- User Functions ---

export async function getUserById(userId: string): Promise<User | null> {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
        return { id: userDoc.id, ...userDoc.data() } as User;
    }
    return null;
}

export async function findUserByFace(faceEmbedding: string): Promise<User | null> {
    // This is a simplified search. A real implementation would use a more complex
    // query or a dedicated face recognition service. For this demo, we'll
    // assume a simple string match on a portion of the embedding is sufficient.
    const usersRef = collection(db, "users");
    // Firestore doesn't support partial string matching in queries directly.
    // We fetch all users and filter, which is not scalable.
    // A real app would need a different approach (e.g., dedicated search service like Algolia).
    const q = query(usersRef);
    const querySnapshot = await getDocs(q);
    let foundUser: User | null = null;
    querySnapshot.forEach((doc) => {
        const userData = doc.data() as User;
        if (userData.faceEmbedding && userData.faceEmbedding.substring(0, 150) === faceEmbedding.substring(0, 150)) {
            foundUser = { id: doc.id, ...userData };
        }
    });
    return foundUser;
}

export async function addUser(userData: Omit<User, 'id'>): Promise<User> {
    const usersRef = collection(db, "users");
    const docRef = await addDoc(usersRef, userData);
    return { id: docRef.id, ...userData };
}


export async function getAllUsers(): Promise<User[]> {
    const usersCollection = collection(db, "users");
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
    return userList;
}

// --- Appointment Functions ---

export async function getAppointments(): Promise<Appointment[]> {
    const appointmentsCollection = collection(db, "appointments");
    const apptSnapshot = await getDocs(appointmentsCollection);
    return apptSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
}

// --- Medical Record Functions ---
export async function getMedicalRecords(patientId: string): Promise<MedicalRecord[]> {
    const recordsRef = collection(db, "medicalRecords");
    const q = query(recordsRef, where("patientId", "==", patientId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MedicalRecord));
}

// --- Schedule Functions ---
export async function getSchedulesForEmployee(employeeId: string): Promise<Schedule[]> {
    const schedulesRef = collection(db, "schedules");
    const q = query(schedulesRef, where("employeeId", "==", employeeId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Schedule));
}
