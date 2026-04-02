import clsx from 'clsx';

export default function IconActionButton({
  Icon,
  wrapperProps,
  iconProps
}: {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  wrapperProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  iconProps?: React.SVGProps<SVGSVGElement>;
}) {
  return (
    <button
      {...wrapperProps}
      className={clsx(
        'flex items-center rounded-lg bg-white p-2 hover:bg-black/10 shadow-sm transition',
        wrapperProps?.className
      )}
    >
      <Icon
        height={iconProps?.height ?? 14}
        width={iconProps?.width ?? 14}
        className={clsx('text-primary-dark text-[10px]', iconProps?.className)}
        {...iconProps}
      />
    </button>
  );
}
