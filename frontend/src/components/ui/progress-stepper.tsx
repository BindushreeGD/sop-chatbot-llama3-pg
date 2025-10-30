import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PROGRESS_STEPS, APPLICATION_STATUS } from '@/lib/constants';

interface ProgressStepperProps {
  currentStatus: string;
  className?: string;
}

export function ProgressStepper({ currentStatus, className }: ProgressStepperProps) {
  const getCurrentStepIndex = () => {
    const step = PROGRESS_STEPS.find(step => step.status === currentStatus);
    return step ? step.id : 1;
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className={cn("flex items-center justify-between", className)}>
      {PROGRESS_STEPS.map((step, index) => {
        const isCompleted = step.id < currentStepIndex;
        const isCurrent = step.id === currentStepIndex;
        const isUpcoming = step.id > currentStepIndex;

        return (
          <div key={step.id} className="flex items-center">
            {/* Step Circle */}
            <motion.div
              className={cn(
                "relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300",
                isCompleted && "bg-success border-success text-success-foreground",
                isCurrent && "bg-primary border-primary text-primary-foreground shadow-lg",
                isUpcoming && "bg-muted border-border text-muted-foreground"
              )}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {isCompleted ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  ✓
                </motion.div>
              ) : (
                <span className="text-sm font-medium">{step.icon}</span>
              )}
              
              {isCurrent && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/20"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>

            {/* Step Label */}
            <div className="ml-3 hidden sm:block">
              <p className={cn(
                "text-sm font-medium transition-colors",
                isCompleted && "text-success",
                isCurrent && "text-primary",
                isUpcoming && "text-muted-foreground"
              )}>
                {step.label}
              </p>
            </div>

            {/* Connector Line */}
            {index < PROGRESS_STEPS.length - 1 && (
              <motion.div
                className={cn(
                  "flex-1 h-0.5 mx-4 transition-colors duration-500",
                  step.id < currentStepIndex ? "bg-success" : "bg-border"
                )}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}