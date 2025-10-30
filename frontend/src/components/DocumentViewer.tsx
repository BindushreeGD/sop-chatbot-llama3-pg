import { motion, AnimatePresence } from 'framer-motion';

interface Application {
  id: string;
  type: string;
  status: string;
  applicant: string;
  branch: string;
}

interface DocumentViewerProps {
  application: Application | null;
  onClose: () => void;
}

export default function DocumentViewer({ application, onClose }: DocumentViewerProps) {
  if (!application) return null;

  const documents = [
    { name: 'Account Opening Form', status: '✅ Verified', type: 'PDF' },
    { name: 'Valid Passport', status: '✅ Verified', type: 'PDF' },
    { name: 'Visa/Residency Permit', status: '✅ Verified', type: 'PDF' },
    { name: 'Address Proof (Overseas)', status: '✅ Verified', type: 'PDF' },
    { name: 'Address Proof (India)', status: '✅ Verified', type: 'PDF' },
    { name: 'PAN Card', status: '✅ Verified', type: 'PDF' },
    { name: 'Passport Photos', status: '✅ Verified', type: 'JPG' },
    { name: 'KYC Declaration', status: '⏳ Pending Review', type: 'PDF' }
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="banking-card max-w-4xl w-full max-h-[90vh] overflow-hidden"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-glow p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Document Verification - {application.applicant}
                </h2>
                <p className="text-primary-foreground/80">
                  Application ID: {application.id} • Account Type: {application.type}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                ❌
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {documents.map((doc, index) => (
                <motion.div
                  key={index}
                  className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-foreground">{doc.name}</h3>
                    <span className="text-xs bg-muted px-2 py-1 rounded">
                      {doc.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {doc.status}
                  </p>
                  <button className="text-xs text-primary hover:text-primary-glow underline">
                    View Document →
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Verification Notes */}
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-foreground mb-3">Verification Notes</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• All mandatory documents have been submitted and verified</p>
                <p>• Passport and visa details cross-checked with immigration records</p>
                <p>• Address proofs validated through third-party verification services</p>
                <p>• PAN card authenticity confirmed with Income Tax Department</p>
                <p>• KYC declaration pending final compliance review</p>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <h3 className="font-semibold text-success mb-2">Risk Assessment: LOW RISK</h3>
              <p className="text-sm text-success/80">
                All compliance checks passed. Application ready for final approval.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-muted/30 p-6 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg transition-colors"
            >
              Close
            </button>
            <button className="btn-banking">
              Download All Documents
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}