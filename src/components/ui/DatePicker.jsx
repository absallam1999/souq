import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaCalendar,
  FaChevronRight,
  FaChevronLeft,
  FaClock,
  FaTimes,
  FaCheck,
  FaCalendarAlt,
  FaCalendarCheck,
  FaCalendarDay,
  FaCalendarWeek,
  FaCalendarTimes
} from 'react-icons/fa'
import Input from './Input'

const DatePicker = ({
  value,
  onChange,
  label,
  placeholder = 'اختر التاريخ',
  error,
  disabled = false,
  required = false,
  minDate,
  maxDate,
  format = 'yyyy/MM/dd',
  showTime = false,
  timeIntervals = 30,
  minTime = '09:00',
  maxTime = '21:00',
  disablePastDates = true,
  disableWeekends = false,
  disabledDates = [],
  highlightedDates = [],
  variant = 'default',
  size = 'md',
  clearable = true,
  showTodayButton = true,
  showWeekNumbers = true,
  firstDayOfWeek = 6, // 6 = Friday (RTL)
  locale = 'ar-SA',
  className = '',
  popperClassName = '',
  onOpen,
  onClose,
  onClear
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(value ? new Date(value) : new Date())
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null)
  const [selectedTime, setSelectedTime] = useState(value ? formatTimeFromDate(new Date(value)) : '')
  const [viewMode, setViewMode] = useState('days') // days, months, years
  const [tempDate, setTempDate] = useState(null)
  
  const containerRef = useRef(null)
  const inputRef = useRef(null)

  // Months names in Arabic
  const months = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ]

  // Days names in Arabic
  const days = [
    'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'
  ]

  // Adjust days order based on firstDayOfWeek
  const orderedDays = [
    ...days.slice(firstDayOfWeek),
    ...days.slice(0, firstDayOfWeek)
  ]

  // Years range
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 20 }, (_, i) => currentYear - 5 + i)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen) {
      onOpen?.()
    } else {
      onClose?.()
    }
  }, [isOpen])

  const formatTimeFromDate = (date) => {
    if (!date) return ''
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  const formatDate = (date) => {
    if (!date) return ''
    
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    
    return format
      .replace('yyyy', year)
      .replace('MM', month)
      .replace('dd', day)
  }

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getMonthDays = () => {
    const days = []
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
    const totalDays = daysInMonth(currentDate)

    // Adjust first day based on firstDayOfWeek
    let startOffset = (firstDay - firstDayOfWeek + 7) % 7

    // Previous month days
    const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    const prevMonthDays = daysInMonth(prevMonthDate)
    
    for (let i = startOffset - 1; i >= 0; i--) {
      const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, prevMonthDays - i)
      days.push({
        date: dayDate,
        day: prevMonthDays - i,
        month: 'prev',
        isCurrentMonth: false
      })
    }

    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
      days.push({
        date: dayDate,
        day: i,
        month: 'current',
        isCurrentMonth: true
      })
    }

    // Next month days
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i)
      days.push({
        date: dayDate,
        day: i,
        month: 'next',
        isCurrentMonth: false
      })
    }

    return days
  }

  const isDateDisabled = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (disablePastDates && date < today) return true
    if (minDate && date < new Date(minDate)) return true
    if (maxDate && date > new Date(maxDate)) return true
    
    if (disableWeekends) {
      const day = date.getDay()
      if (day === 5 || day === 6) return true // Friday or Saturday
    }

    if (disabledDates.some(d => d.toDateString() === date.toDateString())) return true

    return false
  }

  const isDateHighlighted = (date) => {
    return highlightedDates.some(d => d.toDateString() === date.toDateString())
  }

  const isToday = (date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString()
  }

  const handleDateSelect = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    
    if (isDateDisabled(newDate)) return

    setTempDate(newDate)
    
    if (!showTime) {
      setSelectedDate(newDate)
      onChange?.(newDate)
      setIsOpen(false)
    }
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
  }

  const handleConfirm = () => {
    if (tempDate) {
      if (showTime && selectedTime) {
        const [hours, minutes] = selectedTime.split(':')
        tempDate.setHours(parseInt(hours), parseInt(minutes))
      }
      setSelectedDate(tempDate)
      onChange?.(tempDate)
      setIsOpen(false)
    }
  }

  const handleToday = () => {
    const today = new Date()
    setCurrentDate(today)
    setTempDate(today)
    
    if (!showTime) {
      setSelectedDate(today)
      onChange?.(today)
      setIsOpen(false)
    }
  }

  const handleClear = () => {
    setSelectedDate(null)
    setTempDate(null)
    setSelectedTime('')
    onChange?.(null)
    onClear?.()
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const handlePrevYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1))
  }

  const handleNextYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1))
  }

  const generateTimeSlots = () => {
    const slots = []
    const [minHour, minMinute] = minTime.split(':').map(Number)
    const [maxHour, maxMinute] = maxTime.split(':').map(Number)
    
    let current = new Date()
    current.setHours(minHour, minMinute, 0, 0)
    
    const end = new Date()
    end.setHours(maxHour, maxMinute, 0, 0)

    while (current <= end) {
      const hours = current.getHours().toString().padStart(2, '0')
      const minutes = current.getMinutes().toString().padStart(2, '0')
      slots.push(`${hours}:${minutes}`)
      current.setMinutes(current.getMinutes() + timeIntervals)
    }

    return slots
  }

  const variants = {
    default: 'bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border',
    primary: 'bg-white dark:bg-dark-card border-primary-200 dark:border-primary-800',
    success: 'bg-white dark:bg-dark-card border-green-200 dark:border-green-800',
    warning: 'bg-white dark:bg-dark-card border-yellow-200 dark:border-yellow-800',
    danger: 'bg-white dark:bg-dark-card border-red-200 dark:border-red-800'
  }

  const sizes = {
    sm: {
      input: 'text-sm',
      calendar: 'w-64',
      day: 'w-8 h-8 text-sm',
      timeSlot: 'py-1 text-sm'
    },
    md: {
      input: 'text-base',
      calendar: 'w-72',
      day: 'w-10 h-10 text-base',
      timeSlot: 'py-2 text-base'
    },
    lg: {
      input: 'text-lg',
      calendar: 'w-80',
      day: 'w-12 h-12 text-lg',
      timeSlot: 'py-3 text-lg'
    }
  }

  const timeSlots = generateTimeSlots()

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Input Field */}
      <div onClick={() => !disabled && setIsOpen(!isOpen)} ref={inputRef}>
        <Input
          label={label}
          value={selectedDate ? formatDate(selectedDate) + (showTime && selectedTime ? ` ${selectedTime}` : '') : ''}
          placeholder={placeholder}
          error={error}
          disabled={disabled}
          required={required}
          icon={<FaCalendar />}
          readOnly
          className={sizes[size].input}
        />
      </div>

      {/* Clear Button */}
      {clearable && selectedDate && (
        <button
          onClick={handleClear}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          type="button"
        >
          <FaTimes className="text-sm" />
        </button>
      )}

      {/* Calendar Popper */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`
              absolute z-50 mt-2
              ${sizes[size].calendar}
              ${variants[variant]}
              border rounded-lg shadow-xl overflow-hidden
              ${popperClassName}
            `}
          >
            {/* Calendar Header */}
            <div className="p-4 border-b border-gray-200 dark:border-dark-border">
              <div className="flex items-center justify-between">
                <button
                  onClick={viewMode === 'days' ? handlePrevMonth : viewMode === 'months' ? handlePrevYear : handlePrevYear}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <FaChevronRight className="text-gray-600 dark:text-gray-400" />
                </button>

                <button
                  onClick={() => {
                    if (viewMode === 'days') setViewMode('months')
                    else if (viewMode === 'months') setViewMode('years')
                    else setViewMode('days')
                  }}
                  className="font-semibold hover:text-primary-600 transition-colors"
                >
                  {viewMode === 'days' && `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
                  {viewMode === 'months' && currentDate.getFullYear()}
                  {viewMode === 'years' && `${years[0]} - ${years[years.length - 1]}`}
                </button>

                <button
                  onClick={viewMode === 'days' ? handleNextMonth : viewMode === 'months' ? handleNextYear : handleNextYear}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <FaChevronLeft className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Calendar Body */}
            <div className="p-4">
              {/* Days View */}
              {viewMode === 'days' && (
                <>
                  {/* Week Days */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {orderedDays.map(day => (
                      <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-500">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Days Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {getMonthDays().map((item, index) => {
                      const isDisabled = isDateDisabled(item.date)
                      const isHighlighted = isDateHighlighted(item.date)
                      const isTodayDate = isToday(item.date)
                      const isSelectedDate = isSelected(item.date)

                      return (
                        <button
                          key={index}
                          onClick={() => handleDateSelect(item.day)}
                          disabled={isDisabled}
                          className={`
                            ${sizes[size].day}
                            rounded-lg font-medium transition-all
                            ${!item.isCurrentMonth ? 'text-gray-400 dark:text-gray-600' : ''}
                            ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}
                            ${isTodayDate ? 'border-2 border-primary-600 dark:border-primary-400' : ''}
                            ${isSelectedDate ? 'bg-primary-600 text-white hover:bg-primary-700' : ''}
                            ${isHighlighted && !isSelectedDate ? 'bg-yellow-100 dark:bg-yellow-900/30' : ''}
                          `}
                        >
                          {item.day}
                        </button>
                      )
                    })}
                  </div>
                </>
              )}

              {/* Months View */}
              {viewMode === 'months' && (
                <div className="grid grid-cols-3 gap-2">
                  {months.map((month, index) => (
                    <button
                      key={month}
                      onClick={() => {
                        setCurrentDate(new Date(currentDate.getFullYear(), index, 1))
                        setViewMode('days')
                      }}
                      className={`
                        p-2 rounded-lg font-medium
                        ${index === currentDate.getMonth() 
                          ? 'bg-primary-600 text-white' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }
                      `}
                    >
                      {month.slice(0, 3)}
                    </button>
                  ))}
                </div>
              )}

              {/* Years View */}
              {viewMode === 'years' && (
                <div className="grid grid-cols-3 gap-2">
                  {years.map(year => (
                    <button
                      key={year}
                      onClick={() => {
                        setCurrentDate(new Date(year, currentDate.getMonth(), 1))
                        setViewMode('months')
                      }}
                      className={`
                        p-2 rounded-lg font-medium
                        ${year === currentDate.getFullYear() 
                          ? 'bg-primary-600 text-white' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }
                      `}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Time Picker */}
            {showTime && (
              <div className="p-4 border-t border-gray-200 dark:border-dark-border">
                <div className="flex items-center gap-2 mb-3">
                  <FaClock className="text-primary-600" />
                  <span className="font-medium">اختر الوقت</span>
                </div>
                <div className="max-h-40 overflow-y-auto grid grid-cols-3 gap-2">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={`
                        ${sizes[size].timeSlot}
                        rounded-lg font-medium transition-colors
                        ${selectedTime === time
                          ? 'bg-primary-600 text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }
                      `}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Calendar Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-dark-border flex items-center justify-between">
              <div className="flex gap-2">
                {showTodayButton && (
                  <button
                    onClick={handleToday}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    اليوم
                  </button>
                )}
              </div>

              {showTime && (
                <button
                  onClick={handleConfirm}
                  disabled={!tempDate}
                  className="px-4 py-1 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  تأكيد
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Range DatePicker Component
export const DateRangePicker = ({
  startValue,
  endValue,
  onChange,
  label = 'اختر الفترة',
  ...props
}) => {
  const [startDate, setStartDate] = useState(startValue ? new Date(startValue) : null)
  const [endDate, setEndDate] = useState(endValue ? new Date(endValue) : null)
  const [selecting, setSelecting] = useState('start')

  const handleDateSelect = (date) => {
    if (selecting === 'start') {
      setStartDate(date)
      setSelecting('end')
      onChange?.({ start: date, end: endDate })
    } else {
      if (date >= startDate) {
        setEndDate(date)
        setSelecting('start')
        onChange?.({ start: startDate, end: date })
      } else {
        setStartDate(date)
        setEndDate(null)
      }
    }
  }

  return (
    <div className="relative">
      <Input
        label={label}
        value={startDate && endDate ? `${formatDate(startDate)} - ${formatDate(endDate)}` : ''}
        placeholder="اختر تاريخ البداية والنهاية"
        icon={<FaCalendarAlt />}
        readOnly
      />
      
      {/* Custom Range Picker would go here */}
    </div>
  )
}

// TimePicker Component
export const TimePicker = ({
  value,
  onChange,
  label = 'اختر الوقت',
  interval = 30,
  format = '24h',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTime, setSelectedTime] = useState(value || '')

  const generateTimes = () => {
    const times = []
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += interval) {
        const hours = i.toString().padStart(2, '0')
        const minutes = j.toString().padStart(2, '0')
        times.push(`${hours}:${minutes}`)
      }
    }
    return times
  }

  const times = generateTimes()

  const formatDisplayTime = (time) => {
    if (format === '12h') {
      const [hours, minutes] = time.split(':')
      const h = parseInt(hours)
      const period = h >= 12 ? 'مساءً' : 'صباحاً'
      const displayHour = h % 12 || 12
      return `${displayHour}:${minutes} ${period}`
    }
    return time
  }

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>
        <Input
          label={label}
          value={selectedTime ? formatDisplayTime(selectedTime) : ''}
          placeholder="اختر الوقت"
          icon={<FaClock />}
          readOnly
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 mt-2 w-48 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg shadow-xl max-h-60 overflow-y-auto"
          >
            {times.map(time => (
              <button
                key={time}
                onClick={() => {
                  setSelectedTime(time)
                  onChange?.(time)
                  setIsOpen(false)
                }}
                className={`
                  w-full px-4 py-2 text-right hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
                  ${selectedTime === time ? 'bg-primary-600 text-white hover:bg-primary-700' : ''}
                `}
              >
                {formatDisplayTime(time)}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// WeekPicker Component
export const WeekPicker = ({
  value,
  onChange,
  label = 'اختر الأسبوع',
  ...props
}) => {
  const [selectedWeek, setSelectedWeek] = useState(value || '')

  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
  }

  return (
    <div className="relative">
      <Input
        label={label}
        value={selectedWeek}
        placeholder="اختر الأسبوع"
        icon={<FaCalendarWeek />}
        readOnly
      />
    </div>
  )
}

// MonthPicker Component
export const MonthPicker = ({
  value,
  onChange,
  label = 'اختر الشهر',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(value || '')

  const months = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ]

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>
        <Input
          label={label}
          value={selectedMonth}
          placeholder="اختر الشهر"
          icon={<FaCalendarDay />}
          readOnly
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 mt-2 w-48 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg shadow-xl overflow-hidden"
          >
            {months.map(month => (
              <button
                key={month}
                onClick={() => {
                  setSelectedMonth(month)
                  onChange?.(month)
                  setIsOpen(false)
                }}
                className={`
                  w-full px-4 py-2 text-right hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
                  ${selectedMonth === month ? 'bg-primary-600 text-white hover:bg-primary-700' : ''}
                `}
              >
                {month}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// YearPicker Component
export const YearPicker = ({
  value,
  onChange,
  label = 'اختر السنة',
  minYear = 2000,
  maxYear = 2030,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedYear, setSelectedYear] = useState(value || '')

  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => minYear + i
  )

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>
        <Input
          label={label}
          value={selectedYear}
          placeholder="اختر السنة"
          icon={<FaCalendarTimes />}
          readOnly
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 mt-2 w-48 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg shadow-xl max-h-60 overflow-y-auto"
          >
            {years.map(year => (
              <button
                key={year}
                onClick={() => {
                  setSelectedYear(year)
                  onChange?.(year)
                  setIsOpen(false)
                }}
                className={`
                  w-full px-4 py-2 text-right hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
                  ${selectedYear === year ? 'bg-primary-600 text-white hover:bg-primary-700' : ''}
                `}
              >
                {year}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DatePicker