
import React, { useState } from 'react';
import { ProcessStep as ProcessStepType } from '@/utils/processTypes';
import { GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Draggable } from 'react-beautiful-dnd';
import ProcessTypeIcon, { getTypeColor } from './process/ProcessTypeIcon';
import StepActions from './process/StepActions';

interface ProcessStepProps {
  step: ProcessStepType;
  index: number;
  onEdit: (stepId: string) => void;
  onDelete: (stepId: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  isFirst: boolean;
  isLast: boolean;
}

const ProcessStep: React.FC<ProcessStepProps> = ({
  step,
  index,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast
}) => {
  const [isHovering, setIsHovering] = useState(false);

  // Value Added indicator
  const valueAddedText = step.valueAdded ? 'VA' : 'NVA';
  const valueAddedColor = step.valueAdded ? 'text-green-600' : 'text-amber-600';

  return (
    <Draggable draggableId={step.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={cn(
            'animate-slide-up bg-white border border-gray-200 rounded-lg mb-2 shadow-subtle transition-all duration-300',
            isHovering ? 'scale-[1.01] shadow-md' : '',
            snapshot.isDragging ? 'shadow-lg border-dashed border-blue-400 z-10' : ''
          )}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{ 
            ...provided.draggableProps.style,
            animationDelay: `${index * 50}ms` 
          }}
        >
          <div className="p-0 relative">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-100">
                  <td 
                    className="py-2 px-3 w-12 text-center font-medium text-gray-500 border-r border-gray-100"
                    {...provided.dragHandleProps}
                  >
                    <div className="flex items-center justify-center">
                      <GripVertical className="h-4 w-4 mr-1 text-gray-400" />
                      #{index + 1}
                    </div>
                  </td>
                  <td className="py-2 px-3 border-r border-gray-100">
                    <div>
                      <h3 className="text-base font-medium">{step.name}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </td>
                  <td className="py-2 px-3 w-24 text-center border-r border-gray-100">
                    {step.time !== undefined ? `${step.time}m` : '-'}
                  </td>
                  <td className="py-2 px-3 w-24 text-center border-r border-gray-100">
                    {step.distance !== undefined && step.distance > 0 ? `${step.distance}m` : '-'}
                  </td>
                  
                  {/* Process Type Icons */}
                  <td className={cn("w-10 text-center", step.type === 'operation' ? getTypeColor('operation') : '')}>
                    {step.type === 'operation' && <ProcessTypeIcon type="operation" />}
                  </td>
                  <td className={cn("w-10 text-center", step.type === 'transport' ? getTypeColor('transport') : '')}>
                    {step.type === 'transport' && <ProcessTypeIcon type="transport" />}
                  </td>
                  <td className={cn("w-10 text-center", step.type === 'inspection' ? getTypeColor('inspection') : '')}>
                    {step.type === 'inspection' && <ProcessTypeIcon type="inspection" />}
                  </td>
                  <td className={cn("w-10 text-center", step.type === 'delay' ? getTypeColor('delay') : '')}>
                    {step.type === 'delay' && <ProcessTypeIcon type="delay" />}
                  </td>
                  <td className={cn("w-10 text-center", step.type === 'storage' ? getTypeColor('storage') : '')}>
                    {step.type === 'storage' && <ProcessTypeIcon type="storage" />}
                  </td>
                  
                  <td className={cn("py-2 px-3 w-24 text-center font-medium", valueAddedColor)}>
                    {valueAddedText}
                  </td>
                </tr>
              </tbody>
            </table>

            {isHovering && (
              <StepActions
                onEdit={() => onEdit(step.id)}
                onDelete={() => onDelete(step.id)}
                onMoveUp={() => onMoveUp(index)}
                onMoveDown={() => onMoveDown(index)}
                isFirst={isFirst}
                isLast={isLast}
              />
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default ProcessStep;
