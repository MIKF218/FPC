import html2pdf from 'html2pdf.js';
import { ProcessChart, ChartResults } from '@/utils/processTypes';
import { formatTime } from '@/utils/calculations';

const formatTimeForPDF = (seconds: number): string => {
  const minutes = seconds / 60;
  return `${minutes.toFixed(2)} min`;
};

export const generateProcessChartContent = (chart: ProcessChart, results: ChartResults): HTMLDivElement => {
  // Create the PDF content container
  const pdfContent = document.createElement('div');
  pdfContent.style.padding = '20px';
  
  // Add title
  const titleElement = document.createElement('h1');
  titleElement.textContent = chart.title;
  titleElement.style.marginBottom = '20px';
  titleElement.style.fontSize = '24px';
  pdfContent.appendChild(titleElement);
  
  // Add steps table
  const stepsTable = document.createElement('table');
  stepsTable.style.width = '100%';
  stepsTable.style.borderCollapse = 'collapse';
  stepsTable.style.marginBottom = '20px';
  stepsTable.style.fontSize = '10px';
  
  const tableHeader = document.createElement('thead');
  const headerRow = document.createElement('tr');
  
  const headers = [
    'Step #', 'Activity Description', 'Time', 'Distance', 
    'Operation', 'Transport', 'Inspection', 'Delay', 'Storage', 'Value'
  ];
  
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    th.style.padding = '6px';
    th.style.border = '1px solid #ddd';
    th.style.backgroundColor = '#f5f5f5';
    th.style.textAlign = 'center';
    if (headerText === 'Activity Description') {
      th.style.width = '30%';
    } else if (['Operation', 'Transport', 'Inspection', 'Delay', 'Storage'].includes(headerText)) {
      th.style.width = '6%';
    }
    headerRow.appendChild(th);
  });
  
  tableHeader.appendChild(headerRow);
  stepsTable.appendChild(tableHeader);
  
  const tableBody = document.createElement('tbody');
  
  chart.steps.forEach((step, index) => {
    const row = document.createElement('tr');
    
    const stepNumCell = document.createElement('td');
    stepNumCell.textContent = `#${index + 1}`;
    stepNumCell.style.padding = '6px';
    stepNumCell.style.border = '1px solid #ddd';
    stepNumCell.style.textAlign = 'center';
    row.appendChild(stepNumCell);
    
    const descCell = document.createElement('td');
    descCell.innerHTML = `<strong>${step.name}</strong><br/>${step.description || ''}`;
    descCell.style.padding = '6px';
    descCell.style.border = '1px solid #ddd';
    row.appendChild(descCell);
    
    const timeCell = document.createElement('td');
    timeCell.textContent = step.time !== undefined ? formatTimeForPDF(step.time) : '-';
    timeCell.style.padding = '6px';
    timeCell.style.border = '1px solid #ddd';
    timeCell.style.textAlign = 'center';
    row.appendChild(timeCell);
    
    const distanceCell = document.createElement('td');
    distanceCell.textContent = step.distance !== undefined && step.distance > 0 ? `${step.distance}m` : '-';
    distanceCell.style.padding = '6px';
    distanceCell.style.border = '1px solid #ddd';
    distanceCell.style.textAlign = 'center';
    row.appendChild(distanceCell);
    
    const processTypes = ['operation', 'transport', 'inspection', 'delay', 'storage'];
    processTypes.forEach(type => {
      const typeCell = document.createElement('td');
      typeCell.style.padding = '6px';
      typeCell.style.border = '1px solid #ddd';
      typeCell.style.textAlign = 'center';
      
      if (step.type === type) {
        typeCell.textContent = '✓';
        
        switch (type) {
          case 'operation':
            typeCell.style.backgroundColor = '#e0f7fa';
            break;
          case 'transport':
            typeCell.style.backgroundColor = '#e8f5e9';
            break;
          case 'inspection':
            typeCell.style.backgroundColor = '#f3e5f5';
            break;
          case 'delay':
            typeCell.style.backgroundColor = '#fce4ec';
            break;
          case 'storage':
            typeCell.style.backgroundColor = '#fff8e1';
            break;
        }
      }
      
      row.appendChild(typeCell);
    });
    
    const valueCell = document.createElement('td');
    valueCell.textContent = step.valueAdded ? 'VA' : 'NVA';
    valueCell.style.padding = '6px';
    valueCell.style.border = '1px solid #ddd';
    valueCell.style.textAlign = 'center';
    valueCell.style.fontWeight = 'bold';
    valueCell.style.color = step.valueAdded ? '#16a34a' : '#f59e0b';
    row.appendChild(valueCell);
    
    tableBody.appendChild(row);
  });
  
  stepsTable.appendChild(tableBody);
  pdfContent.appendChild(stepsTable);
  
  // Add results summary
  const resultsTitle = document.createElement('h2');
  resultsTitle.textContent = 'Process Analysis Results';
  resultsTitle.style.marginTop = '20px';
  resultsTitle.style.marginBottom = '10px';
  resultsTitle.style.fontSize = '16px';
  pdfContent.appendChild(resultsTitle);
  
  const resultsSummary = document.createElement('div');
  resultsSummary.style.marginBottom = '15px';
  
  const resultsGrid = document.createElement('div');
  resultsGrid.style.display = 'grid';
  resultsGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
  resultsGrid.style.gap = '8px';
  
  const createResultItem = (label: string, value: string, color?: string) => {
    const item = document.createElement('div');
    item.style.padding = '8px';
    item.style.border = '1px solid #eaeaea';
    item.style.borderRadius = '4px';
    
    const labelEl = document.createElement('div');
    labelEl.textContent = label;
    labelEl.style.fontSize = '10px';
    labelEl.style.color = '#666';
    labelEl.style.marginBottom = '3px';
    
    const valueEl = document.createElement('div');
    valueEl.textContent = value;
    valueEl.style.fontSize = '12px';
    valueEl.style.fontWeight = 'bold';
    if (color) valueEl.style.color = color;
    
    item.appendChild(labelEl);
    item.appendChild(valueEl);
    return item;
  };
  
  resultsGrid.appendChild(createResultItem('Total VA\'s', results.totalVA.toString()));
  resultsGrid.appendChild(createResultItem('Total NVA\'s', results.totalNVA.toString()));
  resultsGrid.appendChild(createResultItem('Lead Time', formatTime(results.leadTime)));
  
  resultsGrid.appendChild(createResultItem('VA\'s time', formatTime(results.vaTime)));
  resultsGrid.appendChild(createResultItem('NVA\'s time', formatTime(results.nvaTime)));
  resultsGrid.appendChild(createResultItem('Distance Travelled', `${results.totalDistance} m`));
  
  resultsGrid.appendChild(createResultItem('VA\'s percentage', `${results.vaPercentage.toFixed(1)}%`, '#16a34a'));
  resultsGrid.appendChild(createResultItem('NVA\'s percentage', `${results.nvaPercentage.toFixed(1)}%`, '#f59e0b'));
  
  resultsSummary.appendChild(resultsGrid);
  
  const typeDistTitle = document.createElement('h3');
  typeDistTitle.textContent = 'Process Type Distribution';
  typeDistTitle.style.fontSize = '12px';
  typeDistTitle.style.marginTop = '15px';
  typeDistTitle.style.marginBottom = '8px';
  resultsSummary.appendChild(typeDistTitle);
  
  const typeGrid = document.createElement('div');
  typeGrid.style.display = 'grid';
  typeGrid.style.gridTemplateColumns = 'repeat(5, 1fr)';
  typeGrid.style.gap = '5px';
  
  const createTypeItem = (type: string, count: number) => {
    const item = document.createElement('div');
    item.style.padding = '5px';
    item.style.border = '1px solid #eaeaea';
    item.style.borderRadius = '4px';
    item.style.textAlign = 'center';
    
    const typeEl = document.createElement('div');
    typeEl.textContent = type;
    typeEl.style.fontSize = '10px';
    typeEl.style.color = '#666';
    typeEl.style.marginBottom = '3px';
    
    const countEl = document.createElement('div');
    countEl.textContent = count.toString();
    countEl.style.fontSize = '12px';
    countEl.style.fontWeight = 'bold';
    
    item.appendChild(typeEl);
    item.appendChild(countEl);
    return item;
  };
  
  typeGrid.appendChild(createTypeItem('Operation', results.typeCount.operation));
  typeGrid.appendChild(createTypeItem('Transport', results.typeCount.transport));
  typeGrid.appendChild(createTypeItem('Inspection', results.typeCount.inspection));
  typeGrid.appendChild(createTypeItem('Delay', results.typeCount.delay));
  typeGrid.appendChild(createTypeItem('Storage', results.typeCount.storage));
  
  resultsSummary.appendChild(typeGrid);
  pdfContent.appendChild(resultsSummary);
  
  return pdfContent;
};

export const generateProcessChartPDF = (chart: ProcessChart, results: ChartResults) => {
  const pdfContent = generateProcessChartContent(chart, results);
  
  const options = {
    margin: [10, 10, 10, 10],
    filename: `${chart.title.replace(/\s+/g, '_')}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
  };
  
  return html2pdf().from(pdfContent).set(options).save();
};

export const printProcessChart = (printRef: React.RefObject<HTMLElement>, chartTitle: string) => {
  if (!printRef.current) return;
  
  const originalContents = document.body.innerHTML;
  const printContents = printRef.current.innerHTML;
  
  document.body.innerHTML = `
    <style>
      @media print {
        body { margin: 0; padding: 20px; font-family: system-ui, sans-serif; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { padding: 10px; border: 1px solid #ddd; }
        th { background-color: #f5f5f5; }
        h1 { margin-bottom: 20px; }
        .process-step { margin-bottom: 10px; padding: 10px; border: 1px solid #ddd; }
        .results-table { margin-top: 30px; }
      }
    </style>
    <h1>${chartTitle}</h1>
    ${printContents}
  `;
  
  window.print();
  document.body.innerHTML = originalContents;
  window.location.reload();
};
