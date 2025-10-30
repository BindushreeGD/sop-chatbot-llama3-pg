import { cn } from '@/lib/utils';
import { STATUS_CONFIG } from '@/lib/constants';

interface StatusChipProps {
  status: string;
  className?: string;
}

export function StatusChip({ status, className }: StatusChipProps) {
  const config = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];
  
  if (!config) {
    return (
      <span className={cn("inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border", className)}>
        {status}
      </span>
    );
  }

  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border gap-1",
      config.color,
      className
    )}>
      <span>{config.icon}</span>
      {config.label}
    </span>
  );
}