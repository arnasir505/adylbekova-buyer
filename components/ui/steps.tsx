import { cn } from '@/lib/utils';
import { FC } from 'react';

interface StepsProps {
  totalSteps: number;
  currentStep: number;
}

const Steps: FC<StepsProps> = ({ totalSteps, currentStep }) => {
  return (
    <div className='flex items-center justify-center'>
      {Array.from({ length: totalSteps }, (_, i) => {
        const isCompleted = i < currentStep;
        return (
          <div key={i} className='flex items-center'>
            <div
              className={cn(
                'w-6 h-6 rounded-full transition-all',
                isCompleted ? 'bg-bleached-orange' : 'bg-gray-300'
              )}
            />
            {i < totalSteps - 1 && (
              <div className='w-7 h-0 border-t-2 border-dashed transition-all border-gray-300 mx-1' />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Steps;
