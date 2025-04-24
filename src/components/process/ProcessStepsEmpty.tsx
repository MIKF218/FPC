
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ProcessStepsEmptyProps {
  onAddStep: () => void;
}

const ProcessStepsEmpty = ({ onAddStep }: ProcessStepsEmptyProps) => (
  <div className="text-center py-10">
    <h3 className="text-lg font-medium mb-2">No process steps yet</h3>
    <p className="text-muted-foreground mb-4">
      Add steps to your process to begin building your flow chart
    </p>
    <Button onClick={onAddStep}>
      <Plus className="mr-1 h-4 w-4" />
      Add First Step
    </Button>
  </div>
);

export default ProcessStepsEmpty;
