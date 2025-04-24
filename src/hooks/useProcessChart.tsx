import { useState, useEffect } from 'react';
import { ProcessStep, ProcessChart as ChartType, ChartResults } from '@/utils/processTypes';
import { calculateResults } from '@/utils/calculations';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/hooks/use-toast";

export const useProcessChart = () => {
  const [chart, setChart] = useState<ChartType>({
    id: uuidv4(),
    title: 'Flow Process Chart',
    steps: [],
  });
  
  const [results, setResults] = useState<ChartResults | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStep, setEditingStep] = useState<ProcessStep | undefined>(undefined);
  const [history, setHistory] = useState<ChartType[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isCalculated, setIsCalculated] = useState(false);
  
  const { toast } = useToast();
  
  useEffect(() => {
    if (historyIndex === history.length - 1) {
      setHistory(prev => [...prev, chart]);
      setHistoryIndex(prev => prev + 1);
    }
  }, [chart.steps, chart.title]);
  
  useEffect(() => {
    if (chart.steps.length > 0) {
      const newResults = calculateResults(chart);
      setResults(newResults);
      setIsCalculated(true);
    } else {
      setResults(null);
      setIsCalculated(false);
    }
  }, [chart.steps]);
  
  const handleAddStep = () => {
    setEditingStep(undefined);
    setIsFormOpen(true);
  };
  
  const handleEditStep = (stepId: string) => {
    const step = chart.steps.find(s => s.id === stepId);
    if (step) {
      setEditingStep(step);
      setIsFormOpen(true);
    }
  };
  
  const handleStepSubmit = (step: ProcessStep) => {
    if (editingStep) {
      setChart(prev => ({
        ...prev,
        steps: prev.steps.map(s => (s.id === step.id ? step : s)),
      }));
      toast({
        title: "Step Updated",
        description: `"${step.name}" has been updated.`
      });
    } else {
      setChart(prev => ({
        ...prev,
        steps: [...prev.steps, step],
      }));
      toast({
        title: "Step Added",
        description: `"${step.name}" has been added to the process.`
      });
    }
    setIsFormOpen(false);
  };
  
  const handleDeleteStep = (stepId: string) => {
    setChart(prev => ({
      ...prev,
      steps: prev.steps.filter(s => s.id !== stepId),
    }));
    toast({
      title: "Step Deleted",
      description: "The process step has been removed."
    });
  };
  
  const handleMoveStep = (index: number, direction: 'up' | 'down') => {
    const newSteps = [...chart.steps];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= newSteps.length) return;
    
    const temp = newSteps[index];
    newSteps[index] = newSteps[newIndex];
    newSteps[newIndex] = temp;
    
    setChart(prev => ({
      ...prev,
      steps: newSteps,
    }));
  };
  
  const handleTitleChange = (title: string) => {
    setChart(prev => ({
      ...prev,
      title,
    }));
  };
  
  const handleVideoUpload = (videoUrl: string) => {
    setChart(prev => ({
      ...prev,
      videoUrl,
    }));
  };
  
  const handleCalculate = () => {
    if (chart.steps.length === 0) {
      toast({
        title: "No Steps",
        description: "Add process steps before calculating results.",
        variant: "destructive"
      });
      return;
    }
    
    const newResults = calculateResults(chart);
    setResults(newResults);
    setIsCalculated(true);
    
    toast({
      title: "Calculations Complete",
      description: `VA: ${newResults.vaPercentage.toFixed(1)}%, NVA: ${newResults.nvaPercentage.toFixed(1)}%`
    });
  };
  
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setChart(history[historyIndex - 1]);
      setIsCalculated(false);
    }
  };
  
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setChart(history[historyIndex + 1]);
      setIsCalculated(false);
    }
  };
  
  const handleReorderSteps = (newSteps: ProcessStep[]) => {
    setChart(prev => ({
      ...prev,
      steps: newSteps
    }));
    setIsCalculated(false);
  };
  
  return {
    chart,
    results,
    isFormOpen,
    editingStep,
    isCalculated,
    historyIndex,
    history,
    handleAddStep,
    handleEditStep,
    handleStepSubmit,
    handleDeleteStep,
    handleMoveStep,
    handleTitleChange,
    handleVideoUpload,
    handleCalculate,
    handleUndo,
    handleRedo,
    handleReorderSteps,
    setIsFormOpen,
  };
};
