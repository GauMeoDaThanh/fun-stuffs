import { cn } from '@/lib/utils';

type AnchorProps = {
  href: string;
  name: string;
  variant?: 'dark' | 'light';
  className?: string;
};

export default function Anchor({
  href,
  name,
  variant = 'dark',
  className,
}: AnchorProps) {
  return (
    <a
      href={href}
      className={cn(
        'rounded-[7px] border-black p-[6px] text-sm font-semibold transition-colors duration-200 hover:border-gray-500',
        variant === 'dark' &&
          'border-2 bg-black text-gray-400 hover:bg-gray-800 hover:text-white',
        variant === 'light' && 'border-3 bg-white text-black hover:bg-white'
      )}>
      {name}
    </a>
  );
}
