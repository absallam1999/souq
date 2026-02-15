import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'

const Dropdown = ({
  trigger,
  children,
  placement = 'bottom-right',
  className = '',
  menuClassName = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const placements = {
    'bottom-right': 'top-full right-0 mt-2',
    'bottom-left': 'top-full left-0 mt-2',
    'top-right': 'bottom-full right-0 mb-2',
    'top-left': 'bottom-full left-0 mb-2',
  }

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger || (
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <span>القائمة</span>
            <FaChevronDown className={`text-sm transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`
              absolute z-50 min-w-[220px]
              bg-white dark:bg-gray-800 rounded-2xl shadow-2xl
              border border-gray-100 dark:border-gray-700
              overflow-hidden
              ${placements[placement]}
              ${menuClassName}
            `}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const DropdownItem = ({ children, onClick, icon, danger = false, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full px-4 py-3 text-right flex items-center gap-3
        hover:bg-gray-50 dark:hover:bg-gray-700/50
        transition-all duration-200 first:rounded-t-2xl last:rounded-b-2xl
        ${danger ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20' : 'text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400'}
        ${className}
      `}
    >
      {icon && <span className={`text-lg ${danger ? 'text-red-500' : 'text-gray-500'}`}>{icon}</span>}
      <span className="flex-1 text-right">{children}</span>
    </button>
  )
}

export default Dropdown