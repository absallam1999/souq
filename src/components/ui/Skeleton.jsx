import React from 'react'

const Skeleton = ({
  variant = 'text',
  width,
  height,
  rounded = 'md',
  count = 1,
  className = ''
}) => {
  const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700'

  const variants = {
    text: 'h-4',
    circle: 'rounded-full',
    rectangle: '',
    card: 'h-32'
  }

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }

  const style = {
    width: width,
    height: height || variants[variant] || undefined
  }

  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={`
            ${baseClasses}
            ${roundedClasses[rounded]}
            ${variant !== 'circle' ? variants[variant] : ''}
            ${className}
          `}
          style={style}
        />
      ))}
    </>
  )
}

export const SkeletonText = ({ lines = 3, className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {[...Array(lines)].map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? '75%' : '100%'}
        />
      ))}
    </div>
  )
}

export const SkeletonAvatar = ({ size = 'w-12 h-12', className = '' }) => {
  return (
    <Skeleton
      variant="circle"
      className={`${size} ${className}`}
      rounded="full"
    />
  )
}

export default Skeleton