import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FaStar, FaUser, FaRegHeart, FaHeart, 
  FaClock, FaUserTie, FaCheckCircle, FaEye,
  FaShare, FaRegStar
} from 'react-icons/fa'
import { MdVerified } from 'react-icons/md'

const ServiceCard = ({ service }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  if (!service || typeof service !== 'object') {
    console.error('Invalid service prop:', service)
    return null
  }

  // Handle provider data safely
  const providerName = typeof service.provider === 'object' 
    ? service.provider.name 
    : service.provider || 'مقدم خدمة'

  const providerAvatar = typeof service.provider === 'object' && service.provider.avatar
    ? service.provider.avatar
    : 'https://via.placeholder.com/40x40'

  const providerLevel = typeof service.provider === 'object' && service.provider.level
    ? service.provider.level
    : service.level || 'مقدم خدمة'

  const providerVerified = typeof service.provider === 'object' && service.provider.verified
    ? service.provider.verified
    : false

  const providerRating = typeof service.provider === 'object' && service.provider.rating
    ? service.provider.rating
    : service.rating || 0

  const providerReviews = typeof service.provider === 'object' && service.provider.reviews
    ? service.provider.reviews
    : service.reviews || 0

  // Get level icon
  const getLevelIcon = () => {
    switch(providerLevel) {
      case 'مبتدئ': return '🌱'
      case 'متقدم': return '🚀'
      case 'خبير': return '💎'
      case 'محترف': return '👑'
      default: return '👤'
    }
  }

  const handleLike = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  const handleShare = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // Share functionality
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
    >
      <Link to={`/service/${service.id}`} className="block">
        {/* Image Container */}
        <div className="relative overflow-hidden group">
          <div className="relative h-48">
            <img 
              src={service.image || 'https://via.placeholder.com/300x200'} 
              alt={service.title || 'Service image'}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Category Badge */}
            {service.category && (
              <span className="absolute top-3 right-3 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg z-10">
                {service.category}
              </span>
            )}

            {/* Featured Badge */}
            {service.featured && (
              <span className="absolute top-3 left-3 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg z-10">
                مميز
              </span>
            )}

            {/* Price Tag */}
            <div className="absolute bottom-3 right-3 bg-primary-600 text-white px-3 py-1.5 rounded-lg font-bold shadow-lg z-10">
              {service.price ? `${service.price} ر.س` : 'سعر'}
            </div>

            {/* Delivery Time */}
            {service.deliveryTime && (
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1 z-10">
                <FaClock className="text-xs" />
                <span>{service.deliveryTime}</span>
              </div>
            )}

            {/* Quick Actions - Appear on Hover */}
            <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLike}
                className="p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white shadow-lg transition-colors"
              >
                {isLiked ? (
                  <FaHeart className="text-red-500 text-sm" />
                ) : (
                  <FaRegHeart className="text-gray-700 text-sm" />
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleShare}
                className="p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white shadow-lg transition-colors"
              >
                <FaShare className="text-gray-700 text-sm" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {service.title || 'خدمة غير مسماة'}
          </h3>
          
          {/* Provider Info */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <img 
                src={providerAvatar}
                alt={providerName}
                className="w-6 h-6 rounded-full object-cover"
              />
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {providerName}
                </span>
                {providerVerified && (
                  <MdVerified className="text-primary-600 text-sm" />
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500">{getLevelIcon()}</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {providerLevel}
              </span>
            </div>
          </div>

          {/* Rating and Tags */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400 text-sm" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {providerRating}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                ({providerReviews})
              </span>
            </div>

            {/* Tags */}
            {service.tags && service.tags.length > 0 && (
              <div className="flex gap-1">
                {service.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              {service.views && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <FaEye className="text-xs" />
                  <span>{service.views}</span>
                </div>
              )}
              {service.saved && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <FaRegHeart className="text-xs" />
                  <span>{service.saved}</span>
                </div>
              )}
            </div>
            
            <span className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              عرض التفاصيل
            </span>
          </div>
        </div>
      </Link>

      {/* Hover Info Overlay */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-primary-600/90 text-white p-4 rounded-xl flex flex-col justify-center items-center text-center pointer-events-none"
        >
          <p className="text-sm mb-2">تسليم سريع • دعم فوري</p>
          <p className="text-xs opacity-90">ضمان استرداد الأموال</p>
          <div className="flex items-center gap-2 mt-3">
            <FaCheckCircle className="text-xs" />
            <span className="text-xs">خدمة موثقة</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default ServiceCard