import React from 'react'
import { Link } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 space-x-reverse md:space-x-3 md:space-x-reverse">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <FaChevronLeft className="text-gray-400 mx-2 text-xs" />
            )}
            {index === items.length - 1 ? (
              <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb