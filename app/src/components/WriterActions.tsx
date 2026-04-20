import type { FunctionComponent, SVGProps } from 'react';

import clsx from 'clsx';
import { useAppLogicContext } from 'contexts/AppLogicContext';

import WriterActionButton from './WriterActionButton';

interface WriterActionsProps {
  icons: FunctionComponent<SVGProps<SVGSVGElement>>[];
  currPage: number;
  className?: string;
}

export default function WriterActions({
  icons,
  className,
  currPage
}: WriterActionsProps) {
  const { handleInsert, state } = useAppLogicContext();
  return (
    <div className={clsx('flex items-center justify-between pt-4', className)}>
      <div className="flex items-center gap-1">
        {icons.map((Icon, index) => (
          <WriterActionButton key={index} Icon={Icon} />
        ))}
      </div>
      <button
        onClick={() => handleInsert(state.generatedText[currPage - 1])}
        className='[&_svg]:inline! portal:text-2xs! border-btn-border-primary [&_img:not([class*="size-"])]::size-3 sm: sm:[&_img:not([class*="size-"])]::size-3 md:[38px] md:rounded-lgPlus md:[&_img:not([class*="size-"])]::size-3.5 lg: lg:rounded-lgPlus lg:[&_img:not([class*="size-"])]::size-4 text-btn-text-primary hover:bg-btn-bg-primary/10 relative cursor-pointer justify-center gap-2 whitespace-nowrap rounded-lg border-2 bg-transparent px-3 py-1 text-xs font-bold transition-colors duration-100 hover:opacity-90 focus-visible:outline-none active:scale-[98%] disabled:pointer-events-none disabled:opacity-50 sm:rounded-lg sm:px-3 sm:py-2 sm:text-xs md:px-4 md:py-[10px] md:text-sm lg:px-6 lg:py-2 lg:text-base/4 [&_img]:shrink-0 [&_svg:not([class*="size-"])]:size-3 sm:[&_svg:not([class*="size-"])]:size-3 md:[&_svg:not([class*="size-"])]:size-3.5 lg:[&_svg:not([class*="size-"])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0'
      >
        Insert
      </button>
    </div>
  );
}
