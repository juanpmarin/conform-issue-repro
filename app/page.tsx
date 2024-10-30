import { BuggyForm } from "@/components/buggy-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-4">
      <Card className="min-w-96">
        <CardHeader>
          <CardTitle>Steps to reproduce</CardTitle>
          <ol className="list-decimal ml-4 text-sm text-muted-foreground">
            <li>Submit the form without selecting a value from the dropdown</li>
            <li>An error message will appear</li>
            <li>Select a city from the dropdown menu</li>
            <li>The error message does not disappear</li>
          </ol>
        </CardHeader>
        <CardContent>
          <BuggyForm />
        </CardContent>
      </Card>
    </main>
  );
}
