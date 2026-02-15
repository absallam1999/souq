import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaChevronDown, 
  FaChevronUp, 
  FaPlus, 
  FaMinus,
  FaArrowLeft,
  FaArrowDown
} from 'react-icons/fa'

const Accordion = ({
  items,
  allowMultiple = false,
  defaultOpen = [],
  variant = 'default',
  size = 'md',
  iconPosition = 'right',
  iconType = 'chevron',
  bordered = true,
  divided = true,
  hoverable = true,
  animated = true,
  className = '',
  itemClassName = '',
  headerClassName = '',
  contentClassName = '',
  onChange
}) => {
  const [openItems, setOpenItems] = useState(defaultOpen)

  const toggleItem = (itemId) => {
    let newOpenItems
    if (allowMultiple) {
      newOpenItems = openItems.includes(itemId)
        ? openItems.filter(id => id !== itemId)
        : [...openItems, itemId]
    } else {
      newOpenItems = openItems.includes(itemId) ? [] : [itemId]
    }
    setOpenItems(newOpenItems)
    onChange?.(newOpenItems)
  }

  const getIcon = (isOpen) => {
    if (iconType === 'chevron') {
      return isOpen ? <FaChevronUp /> : <FaChevronDown />
    }
    if (iconType === 'plus') {
      return isOpen ? <FaMinus /> : <FaPlus />
    }
    if (iconType === 'arrow') {
      return isOpen ? <FaArrowDown /> : <FaArrowLeft />
    }
    return null
  }

  const variants = {
    default: {
      container: 'bg-white dark:bg-dark-card',
      header: 'text-gray-900 dark:text-white',
      content: 'text-gray-600 dark:text-gray-400'
    },
    bordered: {
      container: 'border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card',
      header: 'text-gray-900 dark:text-white',
      content: 'text-gray-600 dark:text-gray-400'
    },
    separated: {
      container: 'bg-gray-50 dark:bg-gray-800/50',
      header: 'text-gray-900 dark:text-white',
      content: 'text-gray-600 dark:text-gray-400'
    },
    minimal: {
      container: 'bg-transparent',
      header: 'text-gray-900 dark:text-white',
      content: 'text-gray-600 dark:text-gray-400'
    },
    card: {
      container: 'bg-white dark:bg-dark-card shadow-md rounded-xl',
      header: 'text-gray-900 dark:text-white',
      content: 'text-gray-600 dark:text-gray-400'
    }
  }

  const sizes = {
    sm: {
      container: 'text-sm',
      header: 'p-3',
      icon: 'text-xs',
      content: 'p-3'
    },
    md: {
      container: 'text-base',
      header: 'p-4',
      icon: 'text-sm',
      content: 'p-4'
    },
    lg: {
      container: 'text-lg',
      header: 'p-5',
      icon: 'text-base',
      content: 'p-5'
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openItems.includes(item.id)
        const Icon = item.icon

        return (
          <motion.div
            key={item.id}
            initial={animated ? { opacity: 0, y: -10 } : false}
            animate={animated ? { opacity: 1, y: 0 } : false}
            transition={{ delay: index * 0.05 }}
            className={`
              ${variants[variant].container}
              ${sizes[size].container}
              ${bordered ? 'border border-gray-200 dark:border-dark-border' : ''}
              ${hoverable ? 'hover:shadow-md transition-shadow' : ''}
              rounded-lg overflow-hidden
              ${itemClassName}
            `}
          >
            {/* Header */}
            <button
              onClick={() => toggleItem(item.id)}
              className={`
                w-full flex items-center justify-between
                ${sizes[size].header}
                ${variants[variant].header}
                ${hoverable ? 'hover:bg-gray-50 dark:hover:bg-gray-800/50' : ''}
                transition-colors duration-200
                ${isOpen ? 'bg-gray-50 dark:bg-gray-800/50' : ''}
                ${headerClassName}
              `}
            >
              <div className="flex items-center gap-3 flex-1">
                {/* Custom Icon */}
                {Icon && (
                  <span className={`${sizes[size].icon} text-primary-600`}>
                    {Icon}
                  </span>
                )}
                
                {/* Title and Subtitle */}
                <div className="text-right flex-1">
                  <div className="font-medium">{item.title}</div>
                  {item.subtitle && (
                    <div className="text-sm text-gray-500 dark:text-gray-500 mt-0.5">
                      {item.subtitle}
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                {item.badge && (
                  <span className={`
                    px-2 py-1 text-xs rounded-full
                    ${item.badge.variant === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : ''}
                    ${item.badge.variant === 'warning' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : ''}
                    ${item.badge.variant === 'danger' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : ''}
                    ${item.badge.variant === 'info' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : ''}
                  `}>
                    {item.badge.text}
                  </span>
                )}
              </div>

              {/* Toggle Icon */}
              <span className={`
                ${sizes[size].icon}
                text-gray-500 dark:text-gray-400
                transition-transform duration-300
                ${iconPosition === 'left' ? 'order-first' : ''}
                ${isOpen && iconType === 'chevron' ? 'rotate-180' : ''}
              `}>
                {getIcon(isOpen)}
              </span>
            </button>

            {/* Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={animated ? { height: 0, opacity: 0 } : false}
                  animate={animated ? { height: 'auto', opacity: 1 } : false}
                  exit={animated ? { height: 0, opacity: 0 } : false}
                  transition={animated ? { duration: 0.2 } : false}
                >
                  <div className={`
                    ${sizes[size].content}
                    ${variants[variant].content}
                    ${divided && isOpen ? 'border-t border-gray-200 dark:border-dark-border' : ''}
                    ${contentClassName}
                  `}>
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}

// Compound Components for more complex use cases
export const AccordionGroup = ({ children, className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {children}
    </div>
  )
}

export const AccordionItem = ({
  id,
  title,
  subtitle,
  icon,
  badge,
  children,
  defaultOpen = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={className}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg"
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-primary-600">{icon}</span>}
          <div className="text-right">
            <div className="font-medium">{title}</div>
            {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
          </div>
        </div>
        {badge && (
          <span className={`px-2 py-1 text-xs rounded-full ${badge}`} />
        )}
        <FaChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// FAQ Specific Accordion
export const FAQAccordion = ({ items, className = '' }) => {
  const [openItems, setOpenItems] = useState([])

  const toggleItem = (id) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [id]
    )
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-dark-card rounded-lg shadow-sm overflow-hidden"
        >
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full px-6 py-4 flex items-center justify-between text-right hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{item.question}</h3>
              {item.category && (
                <span className="text-xs text-primary-600 mt-1 block">
                  {item.category}
                </span>
              )}
            </div>
            <div className={`w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center transition-transform duration-300 ${openItems.includes(item.id) ? 'rotate-180' : ''}`}>
              <FaChevronDown className="text-primary-600 text-sm" />
            </div>
          </button>
          
          <AnimatePresence>
            {openItems.includes(item.id) && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

// Nested Accordion
export const NestedAccordion = ({ items, className = '' }) => {
  const [openSections, setOpenSections] = useState([])

  const toggleSection = (sectionId) => {
    setOpenSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((section) => (
        <div key={section.id} className="bg-white dark:bg-dark-card rounded-lg shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full px-6 py-4 flex items-center justify-between bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              {section.icon && (
                <span className="text-2xl text-primary-600">{section.icon}</span>
              )}
              <div className="text-right">
                <h3 className="font-bold text-lg">{section.title}</h3>
                {section.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {section.description}
                  </p>
                )}
              </div>
            </div>
            <FaChevronDown className={`text-primary-600 transition-transform ${openSections.includes(section.id) ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {openSections.includes(section.id) && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 border-t border-gray-200 dark:border-dark-border">
                  <Accordion
                    items={section.items}
                    allowMultiple={true}
                    variant="minimal"
                    bordered={false}
                    divided={true}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

export default Accordion