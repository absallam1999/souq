import React from 'react'
import { motion } from 'framer-motion'

const Progress = ({
  value = 0,
  max = 100,
  variant = 'primary',
  size = 'md',
  showLabel = false,
  labelPosition = 'right',
  className = '',
  barClassName = ''
}) => {
  const percentage = Math.min((value / max) * 100, 100)

  const variants = {
    primary: 'bg-primary-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    danger: 'bg-red-600',
    info: 'bg-blue-600'
  }

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
    xl: 'h-4'
  }

  return (
    <div className={`w-full ${className}`}>
      {showLabel && labelPosition === 'right' && (
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-600 dark:text-gray-400">التقدم</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {percentage.toFixed(0)}%
          </span>
        </div>
      )}
      
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${sizes[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`
            ${variants[variant]} h-full rounded-full
            transition-all duration-300
            ${barClassName}
          `}
        />
      </div>

      {showLabel && labelPosition === 'bottom' && (
        <div className="mt-1 text-center">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {percentage.toFixed(0)}%
          </span>
        </div>
      )}
    </div>
  )
}

export default Progress