import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { ProcessStep as StepType } from '@/utils/processTypes';
import ProcessStep from '../ProcessStep';
import { useToast } from "@/hooks/use-toast";

interface ProcessStepsDragListProps {
  steps: StepType[];
  onReorderSteps: (items: StepType[]) => void;
  onEditStep: (stepId: string) => void;
  onDeleteStep: (stepId: string) => void;
  onMoveStep: (index: number, direction: 'up' | 'down') => void;
}

const ProcessStepsDragList: React.FC<ProcessStepsDragListProps> = ({
  steps,
  onReorderSteps,
  onEditStep,
  onDeleteStep,
  onMoveStep
}) => {
  const { toast } = useToast();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    
    const items = Array.from(steps);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onReorderSteps(items);
    
    toast({
      title: "Step Reordered",
      description: `"${reorderedItem.name}" has been moved to position ${result.destination.index + 1}.`
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="process-steps">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-1"
          >
            {steps.map((step, index) => (
              <ProcessStep
                key={step.id}
                step={step}
                index={index}
                onEdit={onEditStep}
                onDelete={onDeleteStep}
                onMoveUp={() => onMoveStep(index, 'up')}
                onMoveDown={() => onMoveStep(index, 'down')}
                isFirst={index === 0}
                isLast={index === steps.length - 1}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ProcessStepsDragList;
