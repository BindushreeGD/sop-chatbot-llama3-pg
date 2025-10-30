import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RoleSelector from './RoleSelector';
import CustomerChat from './CustomerChat';
import StaffDashboard from './StaffDashboard';
import DocumentViewer from './enhanced/DocumentViewer';
import { DUMMY_APPLICATIONS } from '@/lib/constants';

interface Application {
  id: string;
  type: string;
  status: string;
  applicant: string;
  branch: string;
}

const APPLICATION_STATUS = {
  CUSTOMER: 'Awaiting Document Upload',
  BRANCH_STAFF: 'Pending Verification by Branch',
  OPERATIONS_TEAM: 'Submitted for Back-End Processing',
  COMPLIANCE_TEAM: 'Pending Compliance Review',
  COMPLETED: 'Account Opened & Welcome Kit Dispatched'
};

export default function NRIBankingApp() {
  const [currentRole, setCurrentRole] = useState<string | null>(null);
  const [applications, setApplications] = useState<Application[]>(DUMMY_APPLICATIONS);
  const [viewingDocs, setViewingDocs] = useState<Application | null>(null);

  const handleRoleSelect = (role: string) => {
    setCurrentRole(role);
  };

  const handleBack = () => {
    setCurrentRole(null);
  };

  const handleUpdateStatus = (appId: string, newStatus: string) => {
    setApplications(prevApps =>
      prevApps.map(app => (app.id === appId ? { ...app, status: newStatus } : app))
    );
  };

  const handleViewDocs = (application: Application) => {
    setViewingDocs(application);
  };

  const handleCloseDocs = () => {
    setViewingDocs(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, hsl(var(--secondary-warm)) 0%, transparent 50%)`
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!currentRole ? (
          <motion.div
            key="role-selector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <RoleSelector onRoleSelect={handleRoleSelect} />
          </motion.div>
        ) : (
          <motion.div
            key={currentRole}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-screen"
          >
            <div className="h-full flex flex-col">
              {currentRole === 'Customer' ? (
                <CustomerChat onBack={handleBack} />
              ) : (
                <StaffDashboard
                  role={currentRole}
                  applications={applications}
                  onUpdateStatus={handleUpdateStatus}
                  onViewDocs={handleViewDocs}
                  onBack={handleBack}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Document Viewer Modal */}
      <DocumentViewer application={viewingDocs} onClose={handleCloseDocs} />

      {/* Footer (only visible on role selector) */}
      {!currentRole && (
        <motion.footer
          className="fixed bottom-0 left-0 right-0 p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="text-xs text-muted-foreground space-x-4">
            <span>🔒 Bank Grade Security</span>
            <span>•</span>
            <span>🇮🇳 RBI Compliant</span>
            <span>•</span>
            <span>📱 Available 24/7</span>
            <span>•</span>
            <span>🌍 Global NRI Support</span>
          </div>
        </motion.footer>
      )}
    </div>
  );
}
