import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FaStar, 
  FaArrowLeft, 
  FaUsers, 
  FaShoppingBag,
  FaPalette,
  FaVectorSquare,
  FaChartLine,
  FaCode,
  FaCamera,
  FaPen,
  FaMusic,
  FaVideo
} from 'react-icons/fa'
import Badge from '../../ui/Badge'

const CategoryCard = ({ category, featured = false, layout = 'grid' }) => {
  // Default icon mapping based on category name or use provided icon
  const getCategoryIcon = (categoryName) => {
    const icons = {
      'تصميم جرافيك': <FaPalette />,
      'هوية بصرية': <FaVectorSquare />,
      'تسويق رقمي': <FaChartLine />,
      'تطوير مواقع': <FaCode />,
      'تصوير وفيديو': <FaCamera />,
      'كتابة وترجمة': <FaPen />,
      'إنتاج موسيقي': <FaMusic />,
      'رسوم متحركة': <FaVideo />
    }
    return icons[categoryName] || <FaShoppingBag />
  }

  const getCategoryColor = (categoryName) => {
    const colors = {
      'تصميم جرافيك': 'from-purple-500 to-pink-500',
      'هوية بصرية': 'from-blue-500 to-cyan-500',
      'تسويق رقمي': 'from-green-500 to-emerald-500',
      'تطوير مواقع': 'from-orange-500 to-red-500',
      'تصوير وفيديو': 'from-yellow-500 to-amber-500',
      'كتابة وترجمة': 'from-indigo-500 to-purple-500',
      'إنتاج موسيقي': 'from-pink-500 to-rose-500',
      'رسوم متحركة': 'from-teal-500 to-cyan-500'
    }
    return colors[categoryName] || 'from-primary-500 to-secondary-500'
  }

  const getCategoryBgColor = (categoryName) => {
    const bgColors = {
      'تصميم جرافيك': 'bg-purple-100 dark:bg-purple-900/20',
      'هوية بصرية': 'bg-blue-100 dark:bg-blue-900/20',
      'تسويق رقمي': 'bg-green-100 dark:bg-green-900/20',
      'تطوير مواقع': 'bg-orange-100 dark:bg-orange-900/20',
      'تصوير وفيديو': 'bg-yellow-100 dark:bg-yellow-900/20',
      'كتابة وترجمة': 'bg-indigo-100 dark:bg-indigo-900/20',
      'إنتاج موسيقي': 'bg-pink-100 dark:bg-pink-900/20',
      'رسوم متحركة': 'bg-teal-100 dark:bg-teal-900/20'
    }
    return bgColors[categoryName] || 'bg-gray-100 dark:bg-gray-800'
  }

  const getCategoryIconColor = (categoryName) => {
    const iconColors = {
      'تصميم جرافيك': 'text-purple-600',
      'هوية بصرية': 'text-blue-600',
      'تسويق رقمي': 'text-green-600',
      'تطوير مواقع': 'text-orange-600',
      'تصوير وفيديو': 'text-yellow-600',
      'كتابة وترجمة': 'text-indigo-600',
      'إنتاج موسيقي': 'text-pink-600',
      'رسوم متحركة': 'text-teal-600'
    }
    return iconColors[categoryName] || 'text-primary-600'
  }

  const icon = category.icon || getCategoryIcon(category.name)
  const gradientColor = getCategoryColor(category.name)
  const bgColor = getCategoryBgColor(category.name)
  const iconColor = getCategoryIconColor(category.name)

  // Grid Layout (default)
  if (layout === 'grid') {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Link to={`/category/${category.id}`}>
          <div className={`
            card relative overflow-hidden group cursor-pointer
            hover:shadow-xl transition-all duration-300
            ${featured ? 'ring-2 ring-primary-600 ring-offset-2 dark:ring-offset-dark-bg' : ''}
          `}>
            {/* Background Gradient on Hover */}
            <div className={`
              absolute inset-0 bg-gradient-to-br ${gradientColor} 
              opacity-0 group-hover:opacity-10 transition-opacity duration-300
            `} />

            {/* Featured Badge */}
            {featured && (
              <div className="absolute top-3 left-3 z-10">
                <Badge variant="primary" size="sm">
                  <span className="flex items-center gap-1">
                    <FaStar className="text-xs" />
                    مميز
                  </span>
                </Badge>
              </div>
            )}

            <div className="relative z-10">
              {/* Icon */}
              <div className={`
                w-16 h-16 rounded-2xl ${bgColor} 
                flex items-center justify-center mb-4
                group-hover:scale-110 transition-transform duration-300
              `}>
                <div className={`text-3xl ${iconColor}`}>
                  {icon}
                </div>
              </div>

              {/* Category Info */}
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                {category.name}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {category.description || `استعرض أحدث الخدمات في مجال ${category.name}`}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <FaShoppingBag className="text-xs" />
                    <span className="font-medium">{category.services || 0}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <FaUsers className="text-xs" />
                    <span className="font-medium">{category.providers || 0}</span>
                  </div>
                </div>
                
                {category.rating && (
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400 text-xs" />
                    <span className="font-medium">{category.rating}</span>
                  </div>
                )}
              </div>

              {/* Subcategories */}
              {category.subcategories && category.subcategories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {category.subcategories.slice(0, 3).map((sub, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400"
                    >
                      {sub}
                    </span>
                  ))}
                  {category.subcategories.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400">
                      +{category.subcategories.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Action Link */}
              <div className="flex items-center text-primary-600 font-medium group-hover:gap-2 transition-all">
                <span>استعرض الخدمات</span>
                <FaArrowLeft className="text-sm group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  // List Layout
  if (layout === 'list') {
    return (
      <motion.div
        whileHover={{ x: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Link to={`/category/${category.id}`}>
          <div className={`
            card relative overflow-hidden group cursor-pointer
            hover:shadow-lg transition-all duration-300
            flex items-center gap-4
            ${featured ? 'ring-2 ring-primary-600 ring-offset-2 dark:ring-offset-dark-bg' : ''}
          `}>
            {/* Background Gradient on Hover */}
            <div className={`
              absolute inset-0 bg-gradient-to-l ${gradientColor} 
              opacity-0 group-hover:opacity-10 transition-opacity duration-300
            `} />

            {/* Icon */}
            <div className={`
              w-16 h-16 rounded-xl ${bgColor} 
              flex items-center justify-center flex-shrink-0
              group-hover:scale-110 transition-transform duration-300
            `}>
              <div className={`text-2xl ${iconColor}`}>
                {icon}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
                {featured && (
                  <Badge variant="primary" size="sm">
                    <span className="flex items-center gap-1">
                      <FaStar className="text-xs" />
                      مميز
                    </span>
                  </Badge>
                )}
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
                {category.description || `استعرض الخدمات في ${category.name}`}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <FaShoppingBag className="text-xs" />
                  <span>{category.services || 0} خدمة</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <FaUsers className="text-xs" />
                  <span>{category.providers || 0} مقدم</span>
                </div>
                {category.rating && (
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400 text-xs" />
                    <span>{category.rating}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Arrow Icon */}
            <FaArrowLeft className="text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
          </div>
        </Link>
      </motion.div>
    )
  }

  // Horizontal Card for featured sections
  if (layout === 'horizontal') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="h-full"
      >
        <Link to={`/category/${category.id}`}>
          <div className={`
            card relative overflow-hidden group cursor-pointer h-full
            hover:shadow-xl transition-all duration-300
            flex flex-col
          `}>
            {/* Background Image with Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-90`} />
            
            {/* Pattern Overlay */}
            <div className="absolute inset-0" />

            {/* Content */}
            <div className="relative z-10 text-white p-6 flex flex-col h-full">
              <div className="flex-1">
                {/* Icon */}
                <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-4 text-3xl">
                  {icon}
                </div>

                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                
                <p className="text-white/90 mb-4 line-clamp-2">
                  {category.description || `اكتشف أفضل الخدمات في ${category.name}`}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-white/80 mb-4">
                  <span>{category.services || 0} خدمة</span>
                  <span>•</span>
                  <span>{category.providers || 0} مقدم</span>
                  {category.rating && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FaStar className="text-yellow-300" />
                        {category.rating}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Button */}
              <div className="mt-4">
                <div className="inline-flex items-center gap-2 text-white border-b-2 border-white/30 pb-1 group-hover:border-white transition-colors">
                  <span>استعرض الخدمات</span>
                  <FaArrowLeft className="text-sm group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  // Mini Card for sidebar or compact views
  if (layout === 'mini') {
    return (
      <Link to={`/category/${category.id}`}>
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
          <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center`}>
            <div className={`text-lg ${iconColor}`}>
              {icon}
            </div>
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-sm group-hover:text-primary-600 transition-colors">
              {category.name}
            </h4>
            <p className="text-xs text-gray-500">
              {category.services || 0} خدمة
            </p>
          </div>
          <FaArrowLeft className="text-xs text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
        </div>
      </Link>
    )
  }
}

export default CategoryCard