
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ProcessStep, ProcessType } from '@/utils/processTypes';
import { X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface ProcessFormProps {
  step?: ProcessStep;
  onSubmit: (step: ProcessStep) => void;
  onCancel: () => void;
  isOpen: boolean;
}

interface FormValues {
  name: string;
  description: string;
  type: ProcessType;
  distance: string;
  time: string;
  valueAdded: boolean;
}

const ProcessForm: React.FC<ProcessFormProps> = ({
  step,
  onSubmit,
  onCancel,
  isOpen
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const form = useForm<FormValues>({
    defaultValues: {
      name: step?.name || '',
      description: step?.description || '',
      type: step?.type || 'operation',
      distance: step?.distance?.toString() || '',
      time: step?.time?.toString() || '',
      valueAdded: step?.valueAdded || false,
    },
  });

  const handleSubmit = (values: FormValues) => {
    const newStep: ProcessStep = {
      id: step?.id || uuidv4(),
      name: values.name,
      description: values.description,
      type: values.type,
      distance: values.distance ? parseFloat(values.distance) : undefined,
      time: values.time ? parseFloat(values.time) : undefined,
      valueAdded: values.valueAdded,
    };

    onSubmit(newStep);
    form.reset();
  };

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white rounded-xl shadow-elevated max-w-lg w-full transform transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">{step ? 'Edit Step' : 'Add New Step'}</h2>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="p-4 space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Process Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Material Inspection" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the process step..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Step Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="operation">Operation</SelectItem>
                        <SelectItem value="transport">Transport</SelectItem>
                        <SelectItem value="inspection">Inspection</SelectItem>
                        <SelectItem value="delay">Delay</SelectItem>
                        <SelectItem value="storage">Storage</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="valueAdded"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 space-y-0 rounded-md border p-3">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">Value-Added Step</FormLabel>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time (minutes)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.1" placeholder="e.g. 120" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="distance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Distance (meters)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.1" placeholder="e.g. 10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-2">
              <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
              <Button type="submit">Save Step</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProcessForm;
