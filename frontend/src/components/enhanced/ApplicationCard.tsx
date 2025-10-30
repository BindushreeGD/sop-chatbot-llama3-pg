import { motion } from 'framer-motion';
import { StatusChip } from '@/components/ui/status-chip';
import { ProgressStepper } from '@/components/ui/progress-stepper';

interface Application {
  id: string;
  type: string;
  status: string;
  applicant: string;
  branch: string;
  submittedDate?: string;
}

interface ApplicationCardProps {
  application: Application;
  onViewDocs: (application: Application) => void;
  actions?: {
    primary?: {
      label: string;
      action: () => void;
    };
    secondary?: {
      label: string;
      action: () => void;
    };
  };
}

export default function ApplicationCard({ application, onViewDocs, actions }: ApplicationCardProps) {
  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'NRE': return 'from-blue-500 to-indigo-600';
      case 'NRO': return 'from-green-500 to-emerald-600';
      case 'FCNR': return 'from-purple-500 to-violet-600';
      default: return 'from-gray-500 to-slate-600';
    }
  };

  const getAccountTypeDescription = (type: string) => {
    switch (type) {
      case 'NRE': return 'Non-Resident External Account';
      case 'NRO': return 'Non-Resident Ordinary Account';
      case 'FCNR': return 'Foreign Currency Account';
      default: return type;
    }
  };

  return (
    <motion.div
      className="banking-card-hover p-6 group relative overflow-hidden"
      whileHover={{ 
        scale: 1.02,
        y: -4,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Header with applicant info and account type */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAccountTypeColor(application.type)} flex items-center justify-center text-white font-bold text-sm shadow-lg`}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {application.type}
            </motion.div>
            <div>
              <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                {application.applicant}
              </h3>
              <p className="text-xs text-muted-foreground">
                {getAccountTypeDescription(application.type)}
              </p>
            </div>
          </div>
        </div>
        
        <StatusChip status={application.status} />
      </div>

      {/* Application details */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Application ID:</span>
          <span className="font-medium text-foreground font-mono">{application.id}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Branch:</span>
          <span className="font-medium text-foreground">{application.branch}</span>
        </div>
        
        {application.submittedDate && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Submitted:</span>
            <span className="font-medium text-foreground">
              {new Date(application.submittedDate).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* Progress indicator */}
      <div className="mb-6">
        <ProgressStepper currentStatus={application.status} className="scale-75 origin-left" />
      </div>

      {/* Action buttons */}
      <div className="space-y-2">
        <motion.button
          onClick={() => onViewDocs(application)}
          className="w-full text-center py-3 px-4 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-xl text-sm font-medium transition-all duration-200 border border-transparent hover:border-border"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          📄 View Documents
        </motion.button>
        
        {actions?.primary && (
          <motion.button
            onClick={actions.primary.action}
            className="w-full btn-banking text-sm py-3 px-4 rounded-xl font-medium"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {actions.primary.label}
          </motion.button>
        )}
        
        {actions?.secondary && (
          <motion.button
            onClick={actions.secondary.action}
            className="w-full text-center py-2 px-4 text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {actions.secondary.label}
          </motion.button>
        )}
      </div>

      {/* Hover effect overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
      />
      
      {/* Subtle border highlight on hover */}
      <motion.div
        className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-2xl transition-colors duration-300 pointer-events-none"
      />
    </motion.div>
  );
}