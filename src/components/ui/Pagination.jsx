import React from 'react'
import { motion } from 'framer-motion'
import {
  FaChevronRight,
  FaChevronLeft,
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
  FaEllipsisH,
  FaEllipsisV,
  FaArrowRight,
  FaArrowLeft
} from 'react-icons/fa'

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
  variant = 'default',
  size = 'md',
  shape = 'rounded',
  withIcons = true,
  withEdges = true,
  withFirstLast = false,
  showTotal = false,
  showQuickJumper = false,
  showSizeChanger = false,
  pageSizeOptions = [10, 20, 50, 100],
  pageSize = 10,
  onPageSizeChange,
  totalItems,
  disabled = false,
  hideOnSinglePage = true,
  className = '',
  itemClassName = '',
  activeClassName = '',
  prevIcon = <FaChevronRight />,
  nextIcon = <FaChevronLeft />,
  firstIcon = <FaAngleDoubleRight />,
  lastIcon = <FaAngleDoubleLeft />,
  ellipsisIcon = <FaEllipsisH />,
  onChange
}) => {
  // Hide pagination if only one page
  if (hideOnSinglePage && totalPages <= 1) {
    return null
  }

  const range = (start, end) => {
    let length = end - start + 1
    return Array.from({ length }, (_, i) => start + i)
  }

  const getPageNumbers = () => {
    const totalNumbers = siblingCount * 2 + 3 + boundaryCount * 2
    const totalBlocks = totalNumbers + 2

    if (totalPages <= totalBlocks) {
      return range(1, totalPages)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, boundaryCount + 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages - boundaryCount)

    const shouldShowLeftDots = leftSiblingIndex > boundaryCount + 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - (boundaryCount + 1)

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount + boundaryCount
      const leftRange = range(1, leftItemCount)
      return [...leftRange, 'ellipsis', ...range(totalPages - boundaryCount + 1, totalPages)]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount + boundaryCount
      const rightRange = range(totalPages - rightItemCount + 1, totalPages)
      return [...range(1, boundaryCount), 'ellipsis', ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [
        ...range(1, boundaryCount),
        'ellipsis',
        ...middleRange,
        'ellipsis',
        ...range(totalPages - boundaryCount + 1, totalPages)
      ]
    }
  }

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage || disabled) return
    onPageChange?.(page)
    onChange?.(page)
  }

  const handleJumpChange = (e) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value) && value >= 1 && value <= totalPages) {
      handlePageChange(value)
    }
  }

  const variants = {
    default: {
      container: '',
      item: 'bg-white dark:bg-dark-card border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800',
      active: 'bg-primary-600 border-primary-600 text-white hover:bg-primary-700',
      disabled: 'opacity-50 cursor-not-allowed pointer-events-none'
    },
    outlined: {
      container: '',
      item: 'bg-transparent border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800',
      active: 'border-primary-600 text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20',
      disabled: 'opacity-50 cursor-not-allowed pointer-events-none'
    },
    filled: {
      container: '',
      item: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700',
      active: 'bg-primary-600 text-white hover:bg-primary-700',
      disabled: 'opacity-50 cursor-not-allowed pointer-events-none'
    },
    minimal: {
      container: '',
      item: 'bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800',
      active: 'text-primary-600 dark:text-primary-400 font-bold',
      disabled: 'opacity-50 cursor-not-allowed pointer-events-none'
    },
    rounded: {
      container: '',
      item: 'bg-white dark:bg-dark-card border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full',
      active: 'bg-primary-600 border-primary-600 text-white hover:bg-primary-700',
      disabled: 'opacity-50 cursor-not-allowed pointer-events-none'
    }
  }

  const sizes = {
    sm: {
      item: 'w-8 h-8 text-sm',
      icon: 'text-xs',
      text: 'text-sm',
      select: 'text-sm py-1'
    },
    md: {
      item: 'w-10 h-10 text-base',
      icon: 'text-sm',
      text: 'text-base',
      select: 'text-base py-2'
    },
    lg: {
      item: 'w-12 h-12 text-lg',
      icon: 'text-base',
      text: 'text-lg',
      select: 'text-lg py-2'
    }
  }

  const shapes = {
    rounded: 'rounded-lg',
    circular: 'rounded-full',
    square: 'rounded-none'
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {/* First Page Button */}
        {withFirstLast && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1 || disabled}
            className={`
              ${sizes[size].item}
              ${shapes[shape]}
              ${variants[variant].item}
              ${(currentPage === 1 || disabled) ? variants[variant].disabled : ''}
              flex items-center justify-center transition-all duration-200
              ${itemClassName}
            `}
            aria-label="الصفحة الأولى"
          >
            {firstIcon}
          </motion.button>
        )}

        {/* Previous Page Button */}
        {withIcons && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || disabled}
            className={`
              ${sizes[size].item}
              ${shapes[shape]}
              ${variants[variant].item}
              ${(currentPage === 1 || disabled) ? variants[variant].disabled : ''}
              flex items-center justify-center transition-all duration-200
              ${itemClassName}
            `}
            aria-label="الصفحة السابقة"
          >
            {prevIcon}
          </motion.button>
        )}

        {/* Page Numbers */}
        {pageNumbers?.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                className={`
                  ${sizes[size].item}
                  flex items-center justify-center
                  text-gray-500 dark:text-gray-400
                `}
              >
                {ellipsisIcon}
              </span>
            )
          }

          const isActive = page === currentPage

          return (
            <motion.button
              key={page}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageChange(page)}
              disabled={disabled}
              className={`
                ${sizes[size].item}
                ${shapes[shape]}
                ${isActive ? variants[variant].active : variants[variant].item}
                flex items-center justify-center font-medium transition-all duration-200
                ${disabled ? variants[variant].disabled : ''}
                ${isActive ? activeClassName : itemClassName}
              `}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`الصفحة ${page}`}
            >
              {page}
            </motion.button>
          )
        })}

        {/* Next Page Button */}
        {withIcons && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || disabled}
            className={`
              ${sizes[size].item}
              ${shapes[shape]}
              ${variants[variant].item}
              ${(currentPage === totalPages || disabled) ? variants[variant].disabled : ''}
              flex items-center justify-center transition-all duration-200
              ${itemClassName}
            `}
            aria-label="الصفحة التالية"
          >
            {nextIcon}
          </motion.button>
        )}

        {/* Last Page Button */}
        {withFirstLast && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages || disabled}
            className={`
              ${sizes[size].item}
              ${shapes[shape]}
              ${variants[variant].item}
              ${(currentPage === totalPages || disabled) ? variants[variant].disabled : ''}
              flex items-center justify-center transition-all duration-200
              ${itemClassName}
            `}
            aria-label="الصفحة الأخيرة"
          >
            {lastIcon}
          </motion.button>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center gap-4 flex-wrap justify-center">
        {/* Total Items */}
        {showTotal && totalItems && (
          <div className={`${sizes[size].text} text-gray-600 dark:text-gray-400`}>
            إجمالي <span className="font-bold text-primary-600">{totalItems}</span> عنصر
          </div>
        )}

        {/* Quick Jumper */}
        {showQuickJumper && (
          <div className="flex items-center gap-2">
            <span className={`${sizes[size].text} text-gray-600 dark:text-gray-400`}>
              اذهب إلى
            </span>
            <input
              type="number"
              min={1}
              max={totalPages}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleJumpChange(e)
                }
              }}
              disabled={disabled}
              className={`
                w-16 px-2 ${sizes[size].select}
                border border-gray-300 dark:border-dark-border rounded-lg
                bg-white dark:bg-dark-card text-center
                focus:ring-2 focus:ring-primary-500 focus:border-transparent
                transition-all duration-200
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              aria-label="رقم الصفحة"
            />
          </div>
        )}

        {/* Page Size Changer */}
        {showSizeChanger && (
          <div className="flex items-center gap-2">
            <span className={`${sizes[size].text} text-gray-600 dark:text-gray-400`}>
              عرض
            </span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange?.(parseInt(e.target.value))}
              disabled={disabled}
              className={`
                px-2 ${sizes[size].select}
                border border-gray-300 dark:border-dark-border rounded-lg
                bg-white dark:bg-dark-card
                focus:ring-2 focus:ring-primary-500 focus:border-transparent
                transition-all duration-200
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              aria-label="عدد العناصر في الصفحة"
            >
              {pageSizeOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Current Page Info */}
        <div className={`${sizes[size].text} text-gray-600 dark:text-gray-400`}>
          صفحة {currentPage} من {totalPages}
        </div>
      </div>
    </div>
  )
}

// Simple Pagination Component
export const SimplePagination = ({
  currentPage,
  totalPages,
  onPageChange,
  ...props
}) => {
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-primary-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors"
      >
        السابق
      </button>
      
      <span className="text-gray-700 dark:text-gray-200">
        صفحة {currentPage} من {totalPages}
      </span>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-primary-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors"
      >
        التالي
      </button>
    </div>
  )
}

// Compact Pagination Component
export const CompactPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  ...props
}) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <FaChevronRight />
      </button>
      
      <span className="px-4 py-2 bg-primary-600 text-white rounded-lg">
        {currentPage}
      </span>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <FaChevronLeft />
      </button>
    </div>
  )
}

// Infinite Scroll Pagination (for loading more)
export const InfinitePagination = ({
  hasMore,
  onLoadMore,
  loading = false,
  ...props
}) => {
  return (
    <div className="flex justify-center py-4">
      {hasMore ? (
        <button
          onClick={onLoadMore}
          disabled={loading}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              جاري التحميل...
            </span>
          ) : (
            'تحميل المزيد'
          )}
        </button>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">لا يوجد المزيد من العناصر</p>
      )}
    </div>
  )
}

// Table Pagination Component
export const TablePagination = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  ...props
}) => {
  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  return (
    <div className="flex items-center justify-between flex-wrap gap-4 p-4 bg-white dark:bg-dark-card border-t border-gray-200 dark:border-dark-border">
      <div className="text-sm text-gray-700 dark:text-gray-300">
        عرض {startItem} - {endItem} من {totalItems} نتيجة
      </div>

      <div className="flex items-center gap-4">
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
          className="px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-card text-sm focus:ring-2 focus:ring-primary-500"
        >
          {pageSizeOptions.map(option => (
            <option key={option} value={option}>
              {option} / صفحة
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-9 h-9 flex items-center justify-center border border-gray-300 dark:border-dark-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <FaChevronRight className="text-sm" />
          </button>
          
          <span className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm">
            {currentPage}
          </span>
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-9 h-9 flex items-center justify-center border border-gray-300 dark:border-dark-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <FaChevronLeft className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Dots Pagination (for sliders/carousels)
export const DotsPagination = ({
  total,
  current,
  onChange,
  size = 'md',
  variant = 'default',
  ...props
}) => {
  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  }

  const variants = {
    default: {
      active: 'bg-primary-600',
      inactive: 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
    },
    light: {
      active: 'bg-white',
      inactive: 'bg-white/50 hover:bg-white/70'
    },
    dark: {
      active: 'bg-gray-900',
      inactive: 'bg-gray-400 hover:bg-gray-600'
    }
  }

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onChange(index + 1)}
          className={`
            ${sizes[size]}
            rounded-full transition-all duration-300
            ${index + 1 === current ? variants[variant].active : variants[variant].inactive}
            ${index + 1 === current ? 'scale-125' : ''}
          `}
          aria-label={`الصفحة ${index + 1}`}
        />
      ))}
    </div>
  )
}

// Progress Pagination (shows progress bar)
export const ProgressPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  ...props
}) => {
  const progress = (currentPage / totalPages) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>صفحة {currentPage} من {totalPages}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary-600 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-primary-600 disabled:text-gray-400 hover:underline"
        >
          السابق
        </button>
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-primary-600 disabled:text-gray-400 hover:underline"
        >
          التالي
        </button>
      </div>
    </div>
  )
}

export default Pagination