
import React from 'react';
import ProcessChart from '@/components/ProcessChart';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  
  React.useEffect(() => {
    // Welcome toast
    toast({
      title: "Welcome to Flow Process Chart Creator",
      description: "Create and analyze process flow charts for work study and ergonomics analysis.",
    });
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight text-center mb-2">
            Flow Process Chart Creation Tool
          </h1>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto">
            Document, visualize, and analyze process steps for work study and ergonomics
          </p>
        </div>
      </header>
      
      <main className="px-4 pb-20">
        <ProcessChart />
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Designed for INE2012 work study and ergonomics classes</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
