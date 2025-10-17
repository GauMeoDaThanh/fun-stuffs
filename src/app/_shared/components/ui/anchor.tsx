import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type AnchorProps = {
  href: string;
  className?: string;
  variant?: 'dark' | 'light';
  children?: ReactNode;
};

export default function Anchor({
  href,
  className,
  variant = 'dark',
  children,
}: AnchorProps) {
  return (
    <a
      href={href}
      className={cn(
        'px-4 py-2 text-sm font-semibold transition-colors duration-200 hover:border-gray-500',
        variant === 'dark' &&
          'rounded-md bg-black text-gray-400 hover:bg-gray-800 hover:text-white',
        variant === 'light' &&
          'rounded-xl border-3 border-black bg-white text-black hover:bg-white',
        className
      )}>
      {children}
    </a>
  );
}
