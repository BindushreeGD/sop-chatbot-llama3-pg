import { motion } from 'framer-motion';
import { ROLES } from '@/lib/constants';

interface RoleSelectorProps {
  onRoleSelect: (role: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

export default function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        className="max-w-6xl w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-glow mb-8 text-white text-3xl shadow-lg"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            🏦
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              NRI Banking
            </span>{' '}
            Assistant
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your trusted partner for seamless Non-Resident Indian banking services.{' '}
            <br className="hidden md:block" />
            Seamlessly open and manage your NRI banking journey, guided step-by-step.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {ROLES.map((role, index) => (
            <motion.button
              key={role.id}
              onClick={() => onRoleSelect(role.id)}
              className="banking-card-hover p-8 text-left group relative overflow-hidden"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                y: -8,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <motion.div 
                className="text-5xl mb-6 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                whileHover={{ rotate: 12, scale: 1.1 }}
              >
                {role.icon}
              </motion.div>
              
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {role.title}
              </h3>
              
              <p className="text-muted-foreground text-sm leading-relaxed">
                {role.description}
              </p>
              
              {/* Subtle hover indicator */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-glow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
              />
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="flex items-center justify-center space-x-8 text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span>Bank Grade Security</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <span>RBI Compliant</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-warning rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            <span>24/7 Available</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}