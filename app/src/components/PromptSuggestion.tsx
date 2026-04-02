export default function PromptSuggestion({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full p-2 rounded-lg font-semibold text-[10px] text-typography-accent-strong bg-primary-background border border-card-border cursor-pointer hover:bg-primary-dark/10 transition lg:text-sm">
      {children}
    </div>
  );
}
