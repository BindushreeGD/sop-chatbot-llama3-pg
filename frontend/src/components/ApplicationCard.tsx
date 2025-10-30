import { motion } from 'framer-motion';

interface Application {
  id: string;
  type: string;
  status: string;
  applicant: string;
  branch: string;
}

interface ApplicationCardProps {
  application: Application;
  onUpdateStatus?: (id: string, newStatus: string) => void;
  onViewDocs?: (application: Application) => void;
  actions?: {
    primary?: {
      label: string;
      action: () => void;
      className?: string;
    };
    secondary?: {
      label: string;
      action: () => void;
    };
  };
}

const getStatusClass = (status: string) => {
  if (status.includes('Pending')) return 'status-pending';
  if (status.includes('Processing') || status.includes('Submitted')) return 'status-processing';
  if (status.includes('Completed') || status.includes('Opened')) return 'status-success';
  return 'status-pending';
};

export default function ApplicationCard({ 
  application, 
  onViewDocs, 
  actions 
}: ApplicationCardProps) {
  return (
    <motion.div
      className="banking-card-hover p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">
            {application.applicant}
          </h3>
          <p className="text-sm text-muted-foreground">
            ID: {application.id}
          </p>
        </div>
        <div className="text-2xl">
          {application.type === 'NRE' ? '💰' : 
           application.type === 'NRO' ? '🏠' : 
           application.type === 'FCNR' ? '💱' : '📄'}
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Account Type:</span>
          <span className="text-sm font-medium text-foreground">{application.type}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Branch:</span>
          <span className="text-sm font-medium text-foreground">{application.branch}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Status:</span>
          <span className={getStatusClass(application.status)}>
            {application.status}
          </span>
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <button
          onClick={() => onViewDocs?.(application)}
          className="w-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground py-3 rounded-xl text-sm font-medium transition-all duration-200 border border-border/30"
        >
          📄 View Documents
        </button>
        
        {actions?.primary && (
          <motion.button
            onClick={actions.primary.action}
            className={`w-full btn-banking text-sm ${actions.primary.className || ''}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {actions.primary.label}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}