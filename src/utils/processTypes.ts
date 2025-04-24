
export type ProcessType = 'operation' | 'transport' | 'inspection' | 'delay' | 'storage';

export interface ProcessStep {
  id: string;
  name: string;
  description: string;
  type: ProcessType;
  distance?: number; // in meters
  time?: number; // in minutes 
  valueAdded: boolean;
}

export interface ProcessChart {
  id: string;
  title: string;
  steps: ProcessStep[];
  videoUrl?: string;
}

export interface ChartResults {
  totalVA: number;
  totalNVA: number;
  vaTime: number;
  nvaTime: number;
  vaPercentage: number;
  nvaPercentage: number;
  totalDistance: number;
  leadTime: number;
  typeCount: Record<ProcessType, number>;
}
