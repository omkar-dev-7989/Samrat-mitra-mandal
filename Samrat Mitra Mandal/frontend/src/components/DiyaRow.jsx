export default function DiyaRow() {
  return (
    <div className="pointer-events-none flex justify-center gap-5 py-4">
      {Array.from({ length: 7 }).map((_, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="diya-flame animate-float" style={{ animationDelay: `${index * 0.25}s` }} />
          <div className="h-3 w-10 rounded-b-full bg-gradient-to-r from-amber-900 via-gold to-amber-900 shadow-gold" />
        </div>
      ))}
    </div>
  );
}
