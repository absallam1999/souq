import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const Rating = ({ value, text, color = 'text-yellow-400', size = 'text-sm' }) => {
  const renderStar = (index) => {
    const ratingValue = value
    if (ratingValue >= index + 1) {
      return <FaStar key={index} className={`${color} ${size}`} />
    } else if (ratingValue >= index + 0.5) {
      return <FaStarHalfAlt key={index} className={`${color} ${size}`} />
    } else {
      return <FaRegStar key={index} className={`${color} ${size}`} />
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, index) => renderStar(index))}
      </div>
      {text && <span className="text-gray-600 dark:text-gray-400 text-sm">{text}</span>}
    </div>
  )
}

export default Rating