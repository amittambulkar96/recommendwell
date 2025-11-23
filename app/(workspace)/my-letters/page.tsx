import MyLettersGrid from "@/components/workspace/MyLettersGrid";

export default function MyLettersPage() {
  return (
    <div className="container mx-auto h-[calc(100vh-4rem)] px-4 py-8">
      <div className="mb-8">
        <h1 className="text-xl md:text-2xl font-semibold mb-2 text-left">
          My Letters
        </h1>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed text-left max-w-2xl">
          View and manage all your resignation letters. You can continue editing
          any saved letter or create a new one from our template collection.
        </p>
      </div>

      <MyLettersGrid />
    </div>
  );
}
