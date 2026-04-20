export default function PromptTemplateCard({
  children,
  onClick
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="text-typography-accent-strong bg-primary-background border-card-border hover:bg-primary-dark/10 w-full cursor-pointer rounded-lg border p-2 text-[10px] font-semibold transition lg:text-sm"
    >
      {children}
    </div>
  );
}
