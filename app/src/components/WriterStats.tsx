import clsx from 'clsx';

interface WriterStatsProps {
  text: string;
  className?: string;
}

export default function WriterStats({ text, className }: WriterStatsProps) {
  return (
    <p
      className={clsx(
        'text-2xs text-muted-foreground ml-auto md:text-xs',
        className
      )}
    >
      {text.split(' ').length} Words - {text.length} Characters
    </p>
  );
}
