import type { FunctionComponent, SVGProps } from 'react';

import clsx from 'clsx';

interface WriterActionButtonProps {
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  className?: string;
}

export default function WriterActionButton({
  Icon,
  className
}: WriterActionButtonProps) {
  return (
    <div
      className={clsx(
        "hover:bg-btn-bg-primary/10 cursor-pointer rounded-sm p-1 md:rounded-lg lg:[&_img:not([class*='size-'])]:size-5 [&_svg:not([class*='size-'])]:size-3 md:[&_svg:not([class*='size-'])]:size-4 lg:[&_svg:not([class*='size-'])]:size-5",
        className
      )}
    >
      <Icon className="text-btn-bg-primary" />
    </div>
  );
}
