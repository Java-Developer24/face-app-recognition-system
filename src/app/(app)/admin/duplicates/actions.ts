'use server';

import { findDuplicateAccounts } from '@/ai/flows/find-duplicate-accounts';
import { getAllUsers } from '@/lib/data';
import type { DuplicateAccountOutput } from '@/ai/flows/find-duplicate-accounts';

type ActionResult = {
    success: boolean;
    data?: DuplicateAccountOutput;
    error?: string;
}

export async function findDuplicatesAction(): Promise<ActionResult> {
  try {
    const users = await getAllUsers();
    const userDataString = JSON.stringify(users.map(u => ({ id: u.id, name: u.name, faceEmbedding: u.faceEmbedding })));
    const result = await findDuplicateAccounts({ userData: userDataString });
    return { success: true, data: result };
  } catch (error) {
    console.error('Error finding duplicate accounts:', error);
    if (error instanceof Error) {
        return { success: false, error: error.message };
    }
    return { success: false, error: 'An unknown error occurred.' };
  }
}
