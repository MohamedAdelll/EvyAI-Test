export default function InputContextCard({
  children,
  Icon
}: {
  children: React.ReactNode;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}) {
  return (
    <div className="flex gap-2 items-center bg-white w-full shadow-sm rounded-lg border border-primary-border cursor-pointer p-2 lg:px-4 text-xs font-medium hover:bg-black/10 hover:border-input-border-focused">
      {Icon && <Icon width={12} height={12} className="text-primary-dark" />}
      <p className="text-foreground">{children}</p>
    </div>
  );
}
