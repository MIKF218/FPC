
import React from 'react';
import { ProcessStep as StepType } from '@/utils/processTypes';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ProcessStepsHeader from './process/ProcessStepsHeader';
import ProcessStepsEmpty from './process/ProcessStepsEmpty';
import ProcessStepsDragList from './process/ProcessStepsDragList';

interface ProcessStepsListProps {
  steps: StepType[];
  onAddStep: () => void;
  onEditStep: (stepId: string) => void;
  onDeleteStep: (stepId: string) => void;
  onMoveStep: (index: number, direction: 'up' | 'down') => void;
  onReorderSteps: (items: StepType[]) => void;
  printRef: React.RefObject<HTMLDivElement>;
}

const ProcessStepsList: React.FC<ProcessStepsListProps> = ({
  steps,
  onAddStep,
  onEditStep,
  onDeleteStep,
  onMoveStep,
  onReorderSteps,
  printRef
}) => {
  return (
    <div className="glass border rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-lg">Process Steps</h3>
        <Button
          variant="outline"
          size="sm"
          className="button-hover"
          onClick={onAddStep}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Step
        </Button>
      </div>
      
      <div className="space-y-1 max-h-[500px] overflow-y-auto p-1" ref={printRef}>
        {steps.length > 0 ? (
          <>
            <ProcessStepsHeader />
            <ProcessStepsDragList 
              steps={steps}
              onEditStep={onEditStep}
              onDeleteStep={onDeleteStep}
              onMoveStep={onMoveStep}
              onReorderSteps={onReorderSteps}
            />
          </>
        ) : (
          <ProcessStepsEmpty onAddStep={onAddStep} />
        )}
      </div>
    </div>
  );
};

export default ProcessStepsList;
