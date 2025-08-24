// src/ai/flows/find-duplicate-accounts.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for identifying duplicate user accounts based on facial recognition data.
 *
 * It exports:
 * - `findDuplicateAccounts`: An asynchronous function that initiates the duplicate account finding process.
 * - `DuplicateAccountInput`: The input type for the `findDuplicateAccounts` function.
 * - `DuplicateAccountOutput`: The output type for the `findDuplicateAccounts` function, listing potential duplicate accounts.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the flow.
const DuplicateAccountInputSchema = z.object({
  userData: z.string().describe('A JSON string containing an array of user objects, each including a face embedding (data URI).'),
});
export type DuplicateAccountInput = z.infer<typeof DuplicateAccountInputSchema>;

// Define the output schema for the flow.
const DuplicateAccountOutputSchema = z.object({
  duplicatePairs: z
    .array(
      z.object({
        user1Id: z.string().describe('The ID of the first user in the potential duplicate pair.'),
        user2Id: z.string().describe('The ID of the second user in the potential duplicate pair.'),
        similarityScore: z
          .number()
          .describe('A score indicating the similarity between the face embeddings of the two users.'),
        reason: z.string().describe('Reason why this pair of users has been flagged as potential duplicates')
      })
    )
    .describe('An array of objects, each representing a pair of potentially duplicate accounts.'),
});
export type DuplicateAccountOutput = z.infer<typeof DuplicateAccountOutputSchema>;

// Exported function to initiate the duplicate account finding flow.
export async function findDuplicateAccounts(input: DuplicateAccountInput): Promise<DuplicateAccountOutput> {
  return findDuplicateAccountsFlow(input);
}

const findDuplicateAccountsPrompt = ai.definePrompt({
  name: 'findDuplicateAccountsPrompt',
  input: {schema: DuplicateAccountInputSchema},
  output: {schema: DuplicateAccountOutputSchema},
  prompt: `You are an expert in data analysis and identity resolution. Your task is to identify potential duplicate accounts from a given set of user data.

  The user data is provided as a JSON string. Each user object in the array contains personal details and a face embedding.  A face embedding is a data URI representing the image of the user.

  Your goal is to compare the face embeddings of all users and identify pairs that are highly similar, indicating potential duplicate accounts.  Return a JSON array of duplicate pairs.  Each pair must contain the user IDs, a similarity score (0-1, with 1 being identical), and a short reason why they have been flagged as duplicates.  Consider users duplicates if the similarity score is above 0.85. Do not include the same pair of users twice (e.g. if you include {user1: A, user2: B}, do not also include {user1: B, user2: A}).

  Here is the user data:
  {{{userData}}}
  `,
});


// Define the Genkit flow.
const findDuplicateAccountsFlow = ai.defineFlow(
  {
    name: 'findDuplicateAccountsFlow',
    inputSchema: DuplicateAccountInputSchema,
    outputSchema: DuplicateAccountOutputSchema,
  },
  async input => {
    try {
      const {output} = await findDuplicateAccountsPrompt(input);
      return output!;
    } catch (e) {
      console.error('Error in findDuplicateAccountsFlow: ', e);
      throw e;
    }
  }
);
