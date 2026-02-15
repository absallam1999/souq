import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Input = ({
  label,
  type = 'text',
  error,
  success,
  helperText,
  icon,
  iconPosition = 'right',
  required = false,
  disabled = false,
  value,
  onChange,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const inputType = type === 'password' && showPassword ? 'text' : type

  const baseClasses = 'w-full px-4 py-2.5 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 dark:bg-dark-card dark:text-white'
  
  const stateClasses = error
    ? 'border-red-500 focus:ring-red-200 dark:focus:ring-red-800'
    : success
    ? 'border-green-500 focus:ring-green-200 dark:focus:ring-green-800'
    : 'border-gray-300 dark:border-dark-border focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 focus:border-primary-500'

  const iconClasses = icon ? (iconPosition === 'right' ? 'pr-10' : 'pl-10') : ''

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <span className={`absolute top-1/2 -translate-y-1/2 ${iconPosition === 'right' ? 'right-3' : 'left-3'} text-gray-400`}>
            {icon}
          </span>
        )}
        
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            ${baseClasses}
            ${stateClasses}
            ${iconClasses}
            ${disabled ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : ''}
            ${className}
          `}
          {...props}
        />

        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>

      {(error || success || helperText) && (
        <p className={`mt-1 text-sm ${error ? 'text-red-500' : success ? 'text-green-500' : 'text-gray-500'}`}>
          {error || success || helperText}
        </p>
      )}
    </div>
  )
}

export default Input