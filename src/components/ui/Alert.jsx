import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaInfoCircle, 
  FaExclamationTriangle,
  FaTimes 
} from 'react-icons/fa'

const Alert = ({
  type = 'info',
  message,
  description,
  showIcon = true,
  closable = false,
  onClose,
  autoClose = false,
  duration = 5000,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose?.()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [autoClose, duration, isVisible, onClose])

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
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`
            ${currentType.bg} ${currentType.border} ${currentType.text}
            border rounded-lg p-4 relative
            ${className}
          `}
        >
          <div className="flex items-start gap-3">
            {showIcon && (
              <Icon className={`${currentType.iconColor} text-xl mt-0.5 flex-shrink-0`} />
            )}
            <div className="flex-1">
              {message && (
                <h4 className="font-semibold mb-1">{message}</h4>
              )}
              {description && (
                <p className="text-sm opacity-90">{description}</p>
              )}
            </div>
            {closable && (
              <button
                onClick={() => {
                  setIsVisible(false)
                  onClose?.()
                }}
                className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
              >
                <FaTimes className="text-sm" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Alert