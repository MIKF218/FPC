
import React, { useRef } from 'react';
import ProcessStepsList from './ProcessStepsList';
import Toolbar from './Toolbar';
import ResultsTable from './ResultsTable';
import VideoUpload from './VideoUpload';
import ProcessForm from './ProcessForm';
import { useProcessChart } from '@/hooks/useProcessChart';
import { generateProcessChartPDF } from '@/utils/pdfGenerator';
import { useToast } from "@/hooks/use-toast";

const ProcessChart: React.FC = () => {
  const {
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
    setIsFormOpen
  } = useProcessChart();
  
  const { toast } = useToast();
  const printRef = useRef<HTMLDivElement>(null);
  
  const handleSave = () => {
    if (!isCalculated) {
      toast({
        title: "Calculate First",
        description: "Please calculate the results before saving to PDF.",
        variant: "destructive"
      });
      return;
    }
    
    if (chart.steps.length === 0) {
      toast({
        title: "No Steps to Save",
        description: "Add process steps before saving to PDF.",
        variant: "destructive"
      });
      return;
    }
    
    if (!results) {
      toast({
        title: "Missing Results",
        description: "Please calculate results before saving.",
        variant: "destructive"
      });
      return;
    }

    generateProcessChartPDF(chart, results)
      .then(() => {
        toast({
          title: "PDF Saved",
          description: `"${chart.title}" saved as PDF successfully.`
        });
      })
      .catch((error) => {
        console.error('PDF generation error:', error);
        toast({
          title: "Error Saving PDF",
          description: "There was a problem generating the PDF.",
          variant: "destructive"
        });
      });
  };
  
  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <Toolbar
        title={chart.title}
        onTitleChange={handleTitleChange}
        onAddProcess={handleAddStep}
        onSave={handleSave}
        onCalculate={handleCalculate}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        isCalculated={isCalculated}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
        <div className="lg:col-span-3">
          <ProcessStepsList
            steps={chart.steps}
            onAddStep={handleAddStep}
            onEditStep={handleEditStep}
            onDeleteStep={handleDeleteStep}
            onMoveStep={handleMoveStep}
            onReorderSteps={handleReorderSteps}
            printRef={printRef}
          />
          
          {results && <ResultsTable results={results} />}
        </div>
        
        <div className="lg:col-span-2">
          <VideoUpload 
            onVideoUploaded={handleVideoUpload} 
            currentVideo={chart.videoUrl}
          />
        </div>
      </div>
      
      <ProcessForm
        step={editingStep}
        onSubmit={handleStepSubmit}
        onCancel={() => setIsFormOpen(false)}
        isOpen={isFormOpen}
      />
    </div>
  );
};

export default ProcessChart;
