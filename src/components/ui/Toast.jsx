import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaInfoCircle, 
  FaExclamationTriangle,
  FaTimes 
} from 'react-icons/fa'

const Toast = ({
  id,
  type = 'info',
  message,
  description,
  duration = 5000,
  onClose
}) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose?.(id)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [id, duration, onClose])

  const types = {
    success: {
      icon: FaCheckCircle,
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-800 dark:text-green-400',
      iconColor: 'text-green-500'
    },
    error: {
      icon: FaExclamationCircle,
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-800 dark:text-red-400',
      iconColor: 'text-red-500'
    },
    warning: {
      icon: FaExclamationTriangle,
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-800 dark:text-yellow-400',
      iconColor: 'text-yellow-500'
    },
    info: {
      icon: FaInfoCircle,
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-800 dark:text-blue-400',
      iconColor: 'text-blue-500'
    }
  }

  const currentType = types[type]
  const Icon = currentType.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`
        ${currentType.bg} ${currentType.border} ${currentType.text}
        border rounded-lg shadow-lg p-4 mb-2
        w-80 relative overflow-hidden
      `}
    >
      <div className="flex items-start gap-3">
        <Icon className={`${currentType.iconColor} text-xl mt-0.5 flex-shrink-0`} />
        <div className="flex-1">
          {message && (
            <h4 className="font-semibold mb-1">{message}</h4>
          )}
          {description && (
            <p className="text-sm opacity-90">{description}</p>
          )}
        </div>
        <button
          onClick={() => onClose?.(id)}
          className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
        >
          <FaTimes className="text-sm" />
        </button>
      </div>
      
      {/* Progress Bar */}
      {duration > 0 && (
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: duration / 1000, ease: 'linear' }}
          className={`
            absolute bottom-0 left-0 h-1
            ${currentType.iconColor} opacity-30
          `}
        />
      )}
    </motion.div>
  )
}

// Toast Container
export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 left-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            type={toast.type}
            message={toast.message}
            description={toast.description}
            duration={toast.duration}
            onClose={removeToast}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default Toast