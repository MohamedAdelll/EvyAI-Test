import clsx from 'clsx';

export default function ActionButton({
  children,
  props
}: {
  children: React.ReactNode;
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}) {
  return (
    <button
      className={clsx(
        'px-3 py-1 sm:px-3 sm:py-2 lg:px-6 lg:py-2 md:text-sm text-[10px] disabled:bg-muted-foreground bg-primary-dark text-white font-medium leading-normal rounded-lg hover:opacity-90 transition',
        props?.className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
