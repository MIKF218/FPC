
import { ProcessChart, ChartResults, ProcessStep, ProcessType } from './processTypes';

export const calculateResults = (chart: ProcessChart): ChartResults => {
  // Filter steps for VA and NVA
  const vaSteps = chart.steps.filter(step => step.valueAdded);
  const nvaSteps = chart.steps.filter(step => !step.valueAdded);
  
  // Calculate times
  const vaTime = vaSteps.reduce((total, step) => total + (step.time || 0), 0);
  const nvaTime = nvaSteps.reduce((total, step) => total + (step.time || 0), 0);
  const totalTime = vaTime + nvaTime;
  
  // Calculate percentages
  const vaPercentage = totalTime > 0 ? (vaTime / totalTime) * 100 : 0;
  const nvaPercentage = totalTime > 0 ? (nvaTime / totalTime) * 100 : 0;
  
  // Calculate total distance
  const totalDistance = chart.steps.reduce((total, step) => total + (step.distance || 0), 0);
  
  // Count steps by type
  const typeCount = chart.steps.reduce((counts, step) => {
    counts[step.type] = (counts[step.type] || 0) + 1;
    return counts;
  }, {} as Record<ProcessType, number>);
  
  // Ensure all process types have counts
  const allProcessTypes: ProcessType[] = ['operation', 'transport', 'inspection', 'delay', 'storage'];
  allProcessTypes.forEach(type => {
    if (!typeCount[type]) typeCount[type] = 0;
  });
  
  return {
    totalVA: vaSteps.length,
    totalNVA: nvaSteps.length,
    vaTime,
    nvaTime,
    vaPercentage,
    nvaPercentage,
    totalDistance,
    leadTime: totalTime,
    typeCount
  };
};

export const formatTime = (minutes: number): string => {
  if (minutes < 1) {
    return `${(minutes * 60).toFixed(0)} sec`;
  } else if (minutes < 60) {
    const mins = Math.floor(minutes);
    const secs = Math.round((minutes - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')} min`;
  } else {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}:${mins.toString().padStart(2, '0')} hr`;
  }
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};
