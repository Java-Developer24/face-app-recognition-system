'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Merge, ShieldX, Users, Bot } from 'lucide-react';
import { findDuplicatesAction } from './actions';
import type { DuplicateAccountOutput } from '@/ai/flows/find-duplicate-accounts';
import { useToast } from '@/hooks/use-toast';

type DuplicatePairs = DuplicateAccountOutput['duplicatePairs'];

export default function DuplicateFinderPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [duplicates, setDuplicates] = useState<DuplicatePairs>([]);
  const [scanCompleted, setScanCompleted] = useState(false);
  const { toast } = useToast();

  const handleFindDuplicates = async () => {
    setIsLoading(true);
    setScanCompleted(false);
    setDuplicates([]);
    const result = await findDuplicatesAction();
    setIsLoading(false);
    setScanCompleted(true);

    if (result.success && result.data) {
      setDuplicates(result.data.duplicatePairs);
      toast({
        className: "bg-accent text-accent-foreground",
        title: 'Scan Complete',
        description: `Found ${result.data.duplicatePairs.length} potential duplicate pairs.`,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold font-headline">AI Duplicate Account Finder</h1>
        <p className="text-muted-foreground">
          Use AI to scan user data and identify potential duplicate accounts based on facial similarity.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Duplicate Account Scan</CardTitle>
          <CardDescription>
            This tool compares face embeddings of all users to find matches. Click the button below to start the scan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleFindDuplicates} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Bot className="mr-2 h-4 w-4" />
                Find Duplicate Accounts
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {isLoading && (
         <div className="text-center p-8 flex flex-col items-center justify-center border-2 border-dashed rounded-lg">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 font-semibold">AI is analyzing user data...</p>
            <p className="text-muted-foreground">This may take a moment.</p>
         </div>
      )}

      {scanCompleted && duplicates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Scan Results</CardTitle>
            <CardDescription>The following pairs of accounts have been identified as potential duplicates.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User 1 ID</TableHead>
                    <TableHead>User 2 ID</TableHead>
                    <TableHead>Similarity Score</TableHead>
                    <TableHead>AI-Generated Reason</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {duplicates.map((pair, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono">{pair.user1Id}</TableCell>
                      <TableCell className="font-mono">{pair.user2Id}</TableCell>
                      <TableCell>
                        <Badge variant={pair.similarityScore > 0.9 ? 'destructive' : 'default'} className="bg-accent text-accent-foreground">
                          {(pair.similarityScore * 100).toFixed(1)}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{pair.reason}</TableCell>
                      <TableCell className="text-right space-x-2">
                          <Button variant="outline" size="sm"><Merge className="mr-2 h-3 w-3"/>Merge</Button>
                          <Button variant="ghost" size="sm"><ShieldX className="mr-2 h-3 w-3"/>Dismiss</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {scanCompleted && !isLoading && duplicates.length === 0 && (
          <Alert>
            <Users className="h-4 w-4" />
            <AlertTitle>No Duplicates Found</AlertTitle>
            <AlertDescription>
                The scan completed successfully and did not find any potential duplicate accounts.
            </AlertDescription>
          </Alert>
      )}
    </div>
  );
}
