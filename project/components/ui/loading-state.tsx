import { cn } from '@/lib/utils';
import { Skeleton } from './skeleton';

interface LoadingStateProps {
  className?: string;
  rows?: number;
}

export function LoadingState({ className, rows = 3 }: LoadingStateProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full rounded-xl" />
      ))}
    </div>
  );
}
