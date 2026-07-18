import React from 'react';

export default function RootPage(): React.ReactElement {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          RestaurantOS
        </h1>
        <p className="text-sm text-muted-foreground">
          Enterprise Restaurant Management Platform — Foundation Bootstrap Active
        </p>
      </div>
    </main>
  );
}
