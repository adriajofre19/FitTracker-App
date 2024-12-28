export function ComingSoon({ title }: { title: string }) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-center">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground">
          This feature is coming soon. Stay tuned!
        </p>
      </div>
    );
  }