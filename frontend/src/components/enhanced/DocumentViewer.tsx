import { motion, AnimatePresence } from 'framer-motion';
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

interface DocumentViewerProps {
  application: Application | null;
  onClose: () => void;
}

const DOCUMENT_CATEGORIES = [
  {
    title: 'Identity Documents',
    documents: [
      { name: 'Valid Passport', status: '✅ Verified', type: 'PDF', pages: 8, verified: true },
      { name: 'Visa/Work Permit', status: '✅ Verified', type: 'PDF', pages: 2, verified: true },
      { name: 'Recent Photographs', status: '✅ Verified', type: 'JPG', pages: 2, verified: true },
    ]
  },
  {
    title: 'Address Verification',
    documents: [
      { name: 'Overseas Address Proof', status: '✅ Verified', type: 'PDF', pages: 3, verified: true },
      { name: 'Indian Address Proof', status: '✅ Verified', type: 'PDF', pages: 2, verified: true },
      { name: 'Utility Bill (Overseas)', status: '✅ Verified', type: 'PDF', pages: 1, verified: true },
    ]
  },
  {
    title: 'Financial & Legal',
    documents: [
      { name: 'Account Opening Form', status: '✅ Verified', type: 'PDF', pages: 4, verified: true },
      { name: 'PAN Card', status: '✅ Verified', type: 'PDF', pages: 1, verified: true },
      { name: 'KYC Declaration', status: '⏳ Under Review', type: 'PDF', pages: 2, verified: false },
      { name: 'Income Proof', status: '✅ Verified', type: 'PDF', pages: 3, verified: true },
    ]
  }
];

const VERIFICATION_NOTES = [
  'All mandatory documents have been submitted and are complete',
  'Passport and visa details cross-verified with immigration database',
  'Address proofs validated through third-party verification services',
  'PAN card authenticity confirmed with Income Tax Department',
  'Document quality assessment: All documents are clear and legible',
  'Signature verification completed against passport signature'
];

export default function DocumentViewer({ application, onClose }: DocumentViewerProps) {
  if (!application) return null;

  const getRiskAssessment = () => {
    const verifiedDocs = DOCUMENT_CATEGORIES.flatMap(cat => cat.documents).filter(doc => doc.verified);
    const totalDocs = DOCUMENT_CATEGORIES.flatMap(cat => cat.documents).length;
    const verificationRate = (verifiedDocs.length / totalDocs) * 100;
    
    if (verificationRate >= 90) return { level: 'LOW RISK', color: 'text-success bg-success/10 border-success/20', icon: '🟢' };
    if (verificationRate >= 75) return { level: 'MEDIUM RISK', color: 'text-warning bg-warning/10 border-warning/20', icon: '🟡' };
    return { level: 'HIGH RISK', color: 'text-destructive bg-destructive/10 border-destructive/20', icon: '🔴' };
  };

  const risk = getRiskAssessment();

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="banking-card max-w-6xl w-full max-h-[95vh] flex flex-col overflow-hidden"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-primary via-primary-glow to-primary text-white p-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    📋
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">
                      Document Verification Portal
                    </h2>
                    <p className="text-primary-foreground/90 text-lg">
                      {application.applicant} • Application {application.id}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-primary-foreground/80">Account Type:</span>
                    <span className="font-semibold bg-white/20 px-3 py-1 rounded-full">{application.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary-foreground/80">Branch:</span>
                    <span className="font-semibold">{application.branch}</span>
                  </div>
                  {application.submittedDate && (
                    <div className="flex items-center gap-2">
                      <span className="text-primary-foreground/80">Submitted:</span>
                      <span className="font-semibold">{new Date(application.submittedDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <motion.button
                onClick={onClose}
                className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </div>
            
            {/* Progress indicator in header */}
            <div className="mt-6">
              <ProgressStepper currentStatus={application.status} className="text-white opacity-80" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-8 space-y-8">
              {/* Document Categories */}
              {DOCUMENT_CATEGORIES.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
                >
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {categoryIndex + 1}
                    </span>
                    {category.title}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.documents.map((doc, docIndex) => (
                      <motion.div
                        key={docIndex}
                        className="banking-card p-5 hover:shadow-lg transition-all duration-200 group cursor-pointer"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: (categoryIndex * 0.1) + (docIndex * 0.05) }}
                        whileHover={{ scale: 1.02, y: -2 }}
                      >
                        {/* Document preview thumbnail */}
                        <div className="w-full h-32 bg-gradient-to-br from-muted to-muted/50 rounded-lg mb-4 flex items-center justify-center group-hover:from-primary/5 group-hover:to-primary-glow/5 transition-all duration-200">
                          <div className="text-center">
                            <div className="text-3xl mb-2">
                              {doc.type === 'PDF' ? '📄' : '🖼️'}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {doc.pages} {doc.pages === 1 ? 'page' : 'pages'}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <h4 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                              {doc.name}
                            </h4>
                            <span className="text-xs bg-muted px-2 py-1 rounded font-medium">
                              {doc.type}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-medium ${doc.verified ? 'text-success' : 'text-warning'}`}>
                              {doc.status}
                            </span>
                            <motion.button 
                              className="text-xs text-primary hover:text-primary-glow underline group-hover:no-underline"
                              whileHover={{ scale: 1.05 }}
                            >
                              View Full →
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Verification Notes */}
              <motion.div
                className="banking-card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  🔍 Verification Notes
                </h3>
                <div className="space-y-3">
                  {VERIFICATION_NOTES.map((note, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 0.6 + index * 0.05 }}
                    >
                      <span className="text-success mt-0.5">✓</span>
                      <span>{note}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Risk Assessment */}
              <motion.div
                className={`banking-card p-6 border ${risk.color}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{risk.icon}</span>
                  <h3 className="font-bold text-lg">
                    Risk Assessment: <span className={risk.color.split(' ')[0]}>{risk.level}</span>
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {risk.level === 'LOW RISK' 
                    ? 'All compliance checks passed successfully. Application meets all regulatory requirements and is ready for processing.' 
                    : 'Some documents require additional review. Please contact the compliance team for more information.'
                  }
                </p>
              </motion.div>
            </div>
          </div>

          {/* Enhanced Footer */}
          <div className="bg-muted/30 p-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-border">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>🔒 Secure Document Portal</span>
              <span>•</span>
              <span>📋 RBI Compliant</span>
              <span>•</span>
              <span>🕐 Last Updated: {new Date().toLocaleString()}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button
                onClick={onClose}
                className="px-6 py-2 bg-muted hover:bg-muted/80 text-muted-foreground rounded-xl transition-colors text-sm font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
              <motion.button 
                className="btn-banking text-sm px-6 py-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                📥 Download All Documents
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}