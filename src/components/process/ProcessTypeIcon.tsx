
import React from 'react';
import { Square, Circle, ArrowRight } from 'lucide-react';
import { ProcessType } from '@/utils/processTypes';
import { cn } from '@/lib/utils';

interface ProcessTypeIconProps {
  type: ProcessType;
  showBackground?: boolean;
}

export const getTypeColor = (type: ProcessType) => {
  switch (type) {
    case 'operation':
      return 'bg-cyan-100';
    case 'transport':
      return 'bg-green-100';
    case 'inspection':
      return 'bg-purple-100';
    case 'delay':
      return 'bg-pink-100';
    case 'storage':
      return 'bg-yellow-100';
    default:
      return 'bg-gray-100';
  }
};

const ProcessTypeIcon: React.FC<ProcessTypeIconProps> = ({
  type,
  showBackground = false
}) => {
  const getIconForType = (type: ProcessType) => {
    switch (type) {
      case 'operation':
        return <Circle className="h-5 w-5" strokeWidth={1.5} />;
      case 'transport':
        return <ArrowRight className="h-5 w-5" strokeWidth={1.5} />;
      case 'inspection':
        return <Square className="h-5 w-5" strokeWidth={1.5} />;
      case 'delay':
        return (
          <div className="h-5 w-5 relative">
            <div className="absolute inset-0 border-2 border-current rounded-tl-full rounded-tr-full rounded-br-none rounded-bl-none" style={{ transform: 'rotate(270deg)' }} />
          </div>
        );
      case 'storage':
        return (
          <div className="h-5 w-5 flex items-center justify-center">
            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-t-[12px] border-t-current border-r-[10px] border-r-transparent" />
          </div>
        );
      default:
        return <Circle className="h-5 w-5" />;
    }
  };

  const icon = getIconForType(type);
  
  return (
    <div className={cn("flex justify-center", showBackground && getTypeColor(type))}>
      {icon}
    </div>
  );
};

export default ProcessTypeIcon;

