import React from 'react';
import { ChartResults } from '@/utils/processTypes';
import { formatPercentage, formatTime } from '@/utils/calculations';
import { Circle, ArrowRight, Square, Triangle } from 'lucide-react';

interface ResultsTableProps {
  results: ChartResults | null;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  if (!results) return null;

  return (
    <div className="animate-fade-in bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-200 shadow-sm">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-medium text-lg">Process Results</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-px bg-gray-100">
        <div className="bg-white p-4">
          <div className="text-sm font-medium text-muted-foreground mb-1">Total VA's</div>
          <div className="text-2xl font-semibold">{results.totalVA}</div>
        </div>
        <div className="bg-white p-4">
          <div className="text-sm font-medium text-muted-foreground mb-1">Total NVA's</div>
          <div className="text-2xl font-semibold">{results.totalNVA}</div>
        </div>
        
        <div className="bg-white p-4">
          <div className="text-sm font-medium text-muted-foreground mb-1">VA's time</div>
          <div className="text-2xl font-semibold">{formatTime(results.vaTime)}</div>
        </div>
        <div className="bg-white p-4">
          <div className="text-sm font-medium text-muted-foreground mb-1">NVA's time</div>
          <div className="text-2xl font-semibold">{formatTime(results.nvaTime)}</div>
        </div>
        
        <div className="bg-white p-4">
          <div className="text-sm font-medium text-muted-foreground mb-1">VA's percentage</div>
          <div className="text-2xl font-semibold text-green-600">{formatPercentage(results.vaPercentage)}</div>
        </div>
        <div className="bg-white p-4">
          <div className="text-sm font-medium text-muted-foreground mb-1">NVA's percentage</div>
          <div className="text-2xl font-semibold text-amber-500">{formatPercentage(results.nvaPercentage)}</div>
        </div>
        
        <div className="bg-white p-4">
          <div className="text-sm font-medium text-muted-foreground mb-1">Distance Travelled</div>
          <div className="text-2xl font-semibold">{results.totalDistance} m</div>
        </div>
        <div className="bg-white p-4">
          <div className="text-sm font-medium text-muted-foreground mb-1">Lead Time</div>
          <div className="text-2xl font-semibold">{formatTime(results.leadTime)}</div>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50">
        <div className="text-sm font-medium text-muted-foreground mb-3">Process Type Distribution</div>
        <div className="grid grid-cols-5 gap-2">
          <div className="flex flex-col items-center p-2 bg-white rounded-md border border-gray-100">
            <Circle className="h-5 w-5 mb-1 text-gray-600" />
            <div className="text-xs text-muted-foreground">Operation</div>
            <div className="font-semibold">{results.typeCount.operation}</div>
          </div>
          <div className="flex flex-col items-center p-2 bg-white rounded-md border border-gray-100">
            <ArrowRight className="h-5 w-5 mb-1 text-gray-600" />
            <div className="text-xs text-muted-foreground">Transport</div>
            <div className="font-semibold">{results.typeCount.transport}</div>
          </div>
          <div className="flex flex-col items-center p-2 bg-white rounded-md border border-gray-100">
            <Square className="h-5 w-5 mb-1 text-gray-600" />
            <div className="text-xs text-muted-foreground">Inspection</div>
            <div className="font-semibold">{results.typeCount.inspection}</div>
          </div>
          <div className="flex flex-col items-center p-2 bg-white rounded-md border border-gray-100">
            <div className="h-5 w-5 relative mb-1">
              <div className="absolute inset-0 border-2 border-gray-600 rounded-tl-full rounded-tr-full rounded-br-none rounded-bl-none" style={{ transform: 'rotate(270deg)' }} />
            </div>
            <div className="text-xs text-muted-foreground">Delay</div>
            <div className="font-semibold">{results.typeCount.delay}</div>
          </div>
          <div className="flex flex-col items-center p-2 bg-white rounded-md border border-gray-100">
            <Triangle className="h-5 w-5 mb-1 text-gray-600 rotate-180" />
            <div className="text-xs text-muted-foreground">Storage</div>
            <div className="font-semibold">{results.typeCount.storage}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;
