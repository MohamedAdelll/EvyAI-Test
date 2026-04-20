import clsx from 'clsx';

interface WriterTextProps {
  text: string;
  className?: string;
}

export default function WriterText({ text, className }: WriterTextProps) {
  return (
    <p
      className={clsx(
        'text-2xs grow whitespace-break-spaces lg:text-base',
        className
      )}
    >
      {text}
    </p>
  );
}
