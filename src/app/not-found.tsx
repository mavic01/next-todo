export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-muted-foreground mt-2">
        The page you’re looking for doesn’t exist.
      </p>
    </div>
  );
}
