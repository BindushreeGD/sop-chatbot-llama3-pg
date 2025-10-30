import { motion } from 'framer-motion';
import ApplicationCard from './enhanced/ApplicationCard';
import { DASHBOARD_CONFIG, APPLICATION_STATUS } from '@/lib/constants';

interface Application {
  id: string;
  type: string;
  status: string;
  applicant: string;
  branch: string;
}

interface StaffDashboardProps {
  role: string;
  applications: Application[];
  onUpdateStatus: (id: string, newStatus: string) => void;
  onViewDocs: (application: Application) => void;
  onBack: () => void;
}

const getDashboardConfig = (role: string) => {
  return DASHBOARD_CONFIG[role as keyof typeof DASHBOARD_CONFIG] || {
    title: 'Dashboard',
    description: '',
    icon: '📊',
    filterStatus: '',
    nextStatus: '',
    actionLabel: '',
    emptyMessage: 'No applications found',
    gradient: 'from-blue-600 to-violet-500'

  };
};

export default function StaffDashboard({ 
  role, 
  applications, 
  onUpdateStatus, 
  onViewDocs, 
  onBack 
}: StaffDashboardProps) {
  const config = getDashboardConfig(role);
  const filteredApplications = applications.filter(app => app.status === config.filterStatus);

  const getStatistics = () => {
    const total = applications.length;
    const pending = filteredApplications.length;
    const processed = applications.filter(app => 
      role === 'Branch Staff' ? app.status !== APPLICATION_STATUS.BRANCH_STAFF :
      role === 'Operations Team' ? !([APPLICATION_STATUS.BRANCH_STAFF, APPLICATION_STATUS.OPERATIONS_TEAM].includes(app.status)) :
      app.status === APPLICATION_STATUS.COMPLETED
    ).length;

    return { total, pending, processed };
  };

  const stats = getStatistics();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className={`bg-gradient-to-r ${config.gradient} text-white p-8`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <motion.button
              onClick={onBack}
              className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center mr-6 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ←
            </motion.button>
            <div className="flex items-center">
              <motion.div 
                className="text-4xl mr-6"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                {config.icon}
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{config.title}</h1>
                <p className="text-white/90 text-lg">{config.description}</p>
              </div>
            </div>
          </div>
          
          {/* Live status indicator */}
          <motion.div
            className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium">Live Updates</span>
          </motion.div>
        </div>

        {/* Enhanced Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{stats.total}</div>
                <div className="text-white/80 text-sm">Total Applications</div>
              </div>
              <div className="text-2xl opacity-70">📊</div>
            </div>
          </motion.div>
          
          <motion.div
            className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{stats.pending}</div>
                <div className="text-white/80 text-sm">Pending Action</div>
              </div>
              <div className="text-2xl opacity-70">⏳</div>
            </div>
          </motion.div>
          
          <motion.div
            className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{stats.processed}</div>
                <div className="text-white/80 text-sm">Completed</div>
              </div>
              <div className="text-2xl opacity-70">✅</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Applications Grid */}
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        <div className="max-w-7xl mx-auto">
          {filteredApplications.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {filteredApplications.map((application, index) => (
                <motion.div
                  key={application.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <ApplicationCard
                    application={application}
                    onViewDocs={onViewDocs}
                    actions={{
                      primary: {
                        label: config.actionLabel,
                        action: () => onUpdateStatus(application.id, config.nextStatus)
                      }
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                All Caught Up!
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {config.emptyMessage}. New applications will appear here automatically.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-card border-t border-border p-4 text-center">
        <p className="text-sm text-muted-foreground">
          🔒 Secure Processing • RBI Compliant • Real-time Updates
        </p>
      </div>
    </div>
  );
}