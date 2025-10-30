// NRI Banking Assistant - Constants & Configuration

export const APPLICATION_STATUS = {
  CUSTOMER: 'Awaiting Document Upload',
  BRANCH_STAFF: 'Pending Verification by Branch',
  OPERATIONS_TEAM: 'Submitted for Back-End Processing',
  COMPLIANCE_TEAM: 'Pending Compliance Review',
  COMPLETED: 'Account Opened & Welcome Kit Dispatched'
} as const;

export const ACCOUNT_TYPES = {
  NRE: 'NRE',
  NRO: 'NRO', 
  FCNR: 'FCNR'
} as const;

export const ROLES = [
  {
    id: 'Customer',
    title: 'Customer',
    description: 'Open an NRI account or check status',
    icon: '👤',
    gradient: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'Branch Staff',
    title: 'Branch Staff',
    description: 'Verify documents and applications',
    icon: '🏦',
    gradient: 'from-amber-500 to-orange-600'
  },
  {
    id: 'Operations Team',
    title: 'Operations Team',
    description: 'Process and setup new accounts',
    icon: '⚙️',
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'Compliance Team',
    title: 'Compliance Team',
    description: 'Review and approve applications',
    icon: '✅',
    gradient: 'from-emerald-500 to-green-600'
  }
];

export const DUMMY_APPLICATIONS = [
  { id: 'NRI100234', type: 'NRE', status: APPLICATION_STATUS.BRANCH_STAFF, applicant: 'Rajesh Kumar', branch: 'New Delhi', submittedDate: '2024-01-15' },
  { id: 'NRI100567', type: 'FCNR', status: APPLICATION_STATUS.OPERATIONS_TEAM, applicant: 'Priya Sharma', branch: 'Mumbai', submittedDate: '2024-01-14' },
  { id: 'NRI100890', type: 'NRO', status: APPLICATION_STATUS.COMPLIANCE_TEAM, applicant: 'Amit Patel', branch: 'Bengaluru', submittedDate: '2024-01-13' },
  { id: 'NRI100112', type: 'NRE', status: APPLICATION_STATUS.COMPLETED, applicant: 'Sania Gupta', branch: 'Chennai', submittedDate: '2024-01-10' },
  { id: 'NRI100445', type: 'NRO', status: APPLICATION_STATUS.BRANCH_STAFF, applicant: 'Vikram Singh', branch: 'Pune', submittedDate: '2024-01-16' },
  { id: 'NRI100778', type: 'FCNR', status: APPLICATION_STATUS.OPERATIONS_TEAM, applicant: 'Deepa Nair', branch: 'Hyderabad', submittedDate: '2024-01-12' },
];

// Chat flow content
export const SOP_CONTENT = {
  start: {
    text: "Hello! I'm your personal NRI Banking Assistant. 🙏\n\nI'm here to make your account opening journey as smooth as possible. How can I help you today?",
    options: ["Open an NRI Account", "Learn about NRI Accounts", "Check Application Status"],
  },
  selectAccountType: {
    text: "Perfect! Let me help you choose the right NRI account. Each account type serves different purposes:",
    options: ["NRE (Non-Resident External)", "NRO (Non-Resident Ordinary)", "FCNR (Foreign Currency)", "Compare all account types"],
  },
  nreInfo: {
    text: "🏦 **NRE Account** - Your gateway to India\n\n✅ For income earned outside India\n✅ Maintained in Indian Rupees (INR)\n✅ Fully repatriable (principal + interest)\n✅ Tax-free in India\n✅ Joint account with resident Indians allowed\n\nThis is perfect if you earn abroad and want to save in India with full flexibility to transfer funds back.",
    options: ["Check Document Requirements", "Start Account Opening", "Compare with other accounts"],
  },
  nroInfo: {
    text: "🏦 **NRO Account** - Manage your India income\n\n✅ For income earned in India\n✅ Maintained in Indian Rupees (INR)\n✅ Limited repatriation (up to $1 million per year)\n✅ Suitable for rent, dividends, pension\n✅ Can receive foreign inward remittances\n\nIdeal if you have ongoing income sources in India like property rent or investments.",
    options: ["Check Document Requirements", "Start Account Opening", "Compare with other accounts"],
  },
  fcnrInfo: {
    text: "🏦 **FCNR Account** - Foreign currency protection\n\n✅ Fixed deposit in foreign currencies\n✅ Available in USD, GBP, EUR, JPY, AUD, CAD\n✅ Fully repatriable\n✅ No exchange rate risk\n✅ Attractive interest rates\n✅ Minimum 1 year term\n\nBest for preserving wealth in foreign currency while earning competitive returns.",
    options: ["Check Document Requirements", "Start Account Opening", "Compare with other accounts"],
  },
  compareAccounts: {
    text: "📊 **Quick Comparison**\n\n**NRE**: Foreign income → INR → Fully repatriable\n**NRO**: India income → INR → Limited repatriation\n**FCNR**: Foreign currency → Same currency → No forex risk\n\nMost NRIs start with NRE for maximum flexibility. Which interests you most?",
    options: ["NRE (Non-Resident External)", "NRO (Non-Resident Ordinary)", "FCNR (Foreign Currency)"],
  },
  docRequirements: {
    text: "📋 **Document Checklist**\n\nTo open your account, please prepare:\n\n**Essential Documents:**\n✅ Account Opening Form (we'll provide this)\n✅ Valid Passport with current Visa/Work Permit\n✅ Overseas Address Proof (utility bill/bank statement)\n✅ Indian Address Proof (can be family/friend's)\n✅ Recent passport-size photographs (2 copies)\n✅ PAN Card (or Form 60 if no PAN)\n\n**Additional (if applicable):**\n• Employment letter/contract\n• Income proof from overseas\n• Tax Residency Certificate\n\nOnce you have these ready, the process takes just 3-5 business days!",
    options: ["I have all documents ready", "Upload via DigiLocker", "I need help with documents"],
  },
  uploadOptions: {
    text: "🚀 **Choose your upload method**\n\nFor your convenience, we offer two secure options:",
    options: ["📱 Standard Upload", "🔐 DigiLocker (Recommended)"],
  },
  digilockerUpload: {
    text: "🔐 **DigiLocker Integration**\n\nDigiLocker is the government's secure digital document platform. Benefits:\n\n✅ Instantly verified documents\n✅ No physical document upload needed\n✅ Government-backed authentication\n✅ Faster processing time\n\n[🔗 Connect to DigiLocker](https://digilocker.gov.in)\n\nOnce connected, your verified documents will be automatically shared with us securely.",
    options: ["Documents uploaded via DigiLocker"],
  },
  standardUpload: {
    text: "📎 **Secure Document Upload**\n\nPlease upload your documents using our secure portal:\n\n[🔗 Upload Documents Here](https://secure.nribanking.com/upload)\n\n**Upload Guidelines:**\n• Supported: PDF, JPG, PNG\n• Max size: 5MB per document\n• Ensure documents are clear and complete\n• Upload both sides for ID documents\n\nYour documents are encrypted and securely stored.",
    options: ["Documents uploaded successfully"],
  },
  statusCheck: {
    text: "🔍 **Application Status Check**\n\nPlease provide your unique tracking number. It should look like 'NRI123456'.\n\nDon't have your tracking number? No worries! Check your email or SMS for the confirmation message we sent when you submitted your application.",
    options: [],
  },
  helpWithDocs: {
    text: "🤝 **Document Assistance**\n\nNeed help with your documents? Here are your options:\n\n📞 **Call our NRI Helpline:** 1800-XXX-XXXX (24/7)\n💬 **WhatsApp Support:** +91-XXXXX-XXXXX\n🌐 **Visit:** www.nribanking.com/document-help\n📧 **Email:** nri.documents@bank.com\n🏦 **Visit any branch** - Our staff will assist you\n\nOur document specialists can help you:\n• Understand specific requirements\n• Verify document acceptability\n• Guide you through attestation process",
    options: ["I have all documents now", "Contact support team", "Start over"],
  }
};

export const PROGRESS_STEPS = [
  { id: 1, label: 'Document Upload', status: APPLICATION_STATUS.CUSTOMER, icon: '📄' },
  { id: 2, label: 'Branch Verification', status: APPLICATION_STATUS.BRANCH_STAFF, icon: '🏦' },
  { id: 3, label: 'Operations Processing', status: APPLICATION_STATUS.OPERATIONS_TEAM, icon: '⚙️' },
  { id: 4, label: 'Compliance Review', status: APPLICATION_STATUS.COMPLIANCE_TEAM, icon: '✅' },
  { id: 5, label: 'Account Active', status: APPLICATION_STATUS.COMPLETED, icon: '🎉' }
];

export const STATUS_CONFIG = {
  [APPLICATION_STATUS.CUSTOMER]: {
    label: 'Awaiting Upload',
    color: 'text-muted-foreground bg-muted/50 border-muted',
    icon: '📄'
  },
  [APPLICATION_STATUS.BRANCH_STAFF]: {
    label: 'Branch Review',
    color: 'text-warning bg-warning/10 border-warning/30',
    icon: '🏦'
  },
  [APPLICATION_STATUS.OPERATIONS_TEAM]: {
    label: 'Processing',
    color: 'text-primary bg-primary/10 border-primary/30',
    icon: '⚙️'
  },
  [APPLICATION_STATUS.COMPLIANCE_TEAM]: {
    label: 'Final Review',
    color: 'text-destructive bg-destructive/10 border-destructive/30',
    icon: '✅'
  },
  [APPLICATION_STATUS.COMPLETED]: {
    label: 'Completed',
    color: 'text-success bg-success/10 border-success/30',
    icon: '🎉'
  }
};

export const DASHBOARD_CONFIG = {
  'Branch Staff': {
    title: 'Branch Staff Dashboard',
    description: 'Review and verify incoming NRI account applications',
    icon: '🏦',
    filterStatus: APPLICATION_STATUS.BRANCH_STAFF,
    nextStatus: APPLICATION_STATUS.OPERATIONS_TEAM,
    actionLabel: '✅ Verify & Submit to Operations',
    emptyMessage: 'No applications pending branch verification',
    gradient: 'from-warning via-secondary-warm to-warning'
  },
  'Operations Team': {
    title: 'Operations Dashboard',
    description: 'Process verified applications and setup new accounts',
    icon: '⚙️',
    filterStatus: APPLICATION_STATUS.OPERATIONS_TEAM,
    nextStatus: APPLICATION_STATUS.COMPLIANCE_TEAM,
    actionLabel: '🔄 Process & Send to Compliance',
    emptyMessage: 'No applications awaiting operations processing',
    gradient: 'from-primary via-primary-glow to-primary'
  },
  'Compliance Team': {
    title: 'Compliance Dashboard',
    description: 'Review applications for regulatory compliance and final approval',
    icon: '✅',
    filterStatus: APPLICATION_STATUS.COMPLIANCE_TEAM,
    nextStatus: APPLICATION_STATUS.COMPLETED,
    actionLabel: '🎉 Approve & Finalize Account',
    emptyMessage: 'No applications pending compliance review',
    gradient: 'from-success via-primary-glow to-success'
  }
};