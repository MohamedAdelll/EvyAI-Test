import ChevronLeft from 'assets/UI/chevron-left.svg?react';
import clsx from 'clsx';

interface WriterNavigationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
}

export default function WriterNavigation({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  className
}: WriterNavigationProps) {
  return (
    <div className={clsx('mb-4 flex items-center justify-center', className)}>
      <button
        onClick={onPrevious}
        className={clsx(
          'border-primary-border bg-card hover:border-btn-bg-primary left-1 mr-auto flex items-center rounded-full border-2 p-1 [&_svg:not([class*="size-"])]:size-3 md:[&_svg:not([class*="size-"])]:size-4 lg:[&_svg:not([class*="size-"])]:size-5',
          currentPage === 1 ? 'pointer-events-none opacity-0' : ''
        )}
      >
        <ChevronLeft className={clsx('text-btn-bg-primary')} />
      </button>
      <span className="text-sm font-bold md:text-base lg:text-lg">
        AI Writer {totalPages > 1 ? `#${currentPage}` : ''}
      </span>
      <button
        onClick={onNext}
        className={clsx(
          'border-primary-border bg-card hover:border-btn-bg-primary right-1 ml-auto flex items-center rounded-full border-2 p-1 [&_svg:not([class*="size-"])]:size-3 md:[&_svg:not([class*="size-"])]:size-4 lg:[&_svg:not([class*="size-"])]:size-5',
          currentPage === totalPages ? 'pointer-events-none opacity-0' : ''
        )}
      >
        <ChevronLeft className="text-btn-bg-primary rotate-180" />
      </button>
    </div>
  );
}
