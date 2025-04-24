
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, FileSpreadsheet, RotateCcw, RotateCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToolbarProps {
  title: string;
  onTitleChange: (title: string) => void;
  onAddProcess: () => void;
  onSave: () => void;
  onCalculate: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  isCalculated?: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({
  title,
  onTitleChange,
  onAddProcess,
  onSave,
  onCalculate,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
  isCalculated = false
}) => {
  return (
    <div className="glass border rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
      <Input 
        className="text-xl font-medium border-none bg-transparent focus-visible:ring-0 h-auto py-2 px-3 w-full sm:w-auto sm:flex-1" 
        placeholder="Chart Title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      
      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
        <div className="flex items-center bg-secondary rounded-md">
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("h-8 w-8 rounded-r-none", !canUndo && "opacity-50 cursor-not-allowed")}
            onClick={onUndo}
            disabled={!canUndo}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("h-8 w-8 rounded-l-none", !canRedo && "opacity-50 cursor-not-allowed")}
            onClick={onRedo}
            disabled={!canRedo}
          >
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onSave}
          disabled={!isCalculated}
          className={cn(!isCalculated && "opacity-50 cursor-not-allowed")}
        >
          <Save className="h-4 w-4 mr-1" />
          Save
        </Button>
        
        <Button variant="default" size="sm" onClick={onCalculate}>
          <FileSpreadsheet className="h-4 w-4 mr-1" />
          Calculate
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;

