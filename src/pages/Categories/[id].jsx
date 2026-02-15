import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaStar, FaFilter, FaArrowLeft, FaUserTie,
  FaClock, FaCheck, FaSort, FaThLarge, FaList,
  FaTimes, FaSlidersH, FaChevronLeft, FaChevronRight,
  FaRegClock, FaCheckCircle, FaAward, FaTrophy,
  FaMedal, FaCrown, FaGem, FaRocket, FaChartLine,
  FaEye, FaRegHeart, FaShare, FaUser, FaRegStar,
  FaPaintBrush, FaIdCard, FaNewspaper, FaImage,
  FaPalette, FaBook, FaUsers, FaUserCheck,
  FaArrowRight, FaRegUser
} from 'react-icons/fa'
import { MdVerified, MdOutlineDeliveryDining, MdSecurity, MdEmail } from 'react-icons/md'
import { RiTeamLine, RiCustomerServiceLine, RiShieldStarLine } from 'react-icons/ri'
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi'
import { BsShieldCheck, BsPersonCheck, BsPhone } from 'react-icons/bs'
import Breadcrumb from '../../components/ui/Breadcrumb'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import ServiceCard from '../../components/Common/ServiceCard'
import Pagination from '../../components/ui/Pagination'
import Rating from '../../components/ui/Rating'

const CategoryPage = () => {
  const { id } = useParams()
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('latest')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [selectedSubcategories, setSelectedSubcategories] = useState([])
  const [selectedLevels, setSelectedLevels] = useState([])
  const [selectedDelivery, setSelectedDelivery] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Mock category data based on id
  const categoryData = {
    1: {
      id: 1,
      name: 'تصميم جرافيك',
      icon: <FaPaintBrush className="text-3xl" />,
      description: 'تصاميم إبداعية احترافية لعلامتك التجارية',
      coverImage: 'https://via.placeholder.com/1200x300',
      services: 245,
      providers: 128,
      rating: 4.8,
      subcategories: [
        { id: 1, name: 'شعارات', count: 89, icon: FaGem },
        { id: 2, name: 'بطاقات عمل', count: 56, icon: FaIdCard },
        { id: 3, name: 'بروشورات', count: 45, icon: FaNewspaper },
        { id: 4, name: 'بوسترات', count: 34, icon: FaImage },
        { id: 5, name: 'تصاميم سوشيال ميديا', count: 67, icon: FaShare },
        { id: 6, name: 'كتب ومجلات', count: 23, icon: FaBook }
      ],
      topProviders: [
        { 
          name: 'أحمد محمد', 
          rating: 4.9, 
          jobs: 156, 
          avatar: 'https://via.placeholder.com/50x50',
          level: 'خبير',
          verified: true 
        },
        { 
          name: 'سارة أحمد', 
          rating: 4.8, 
          jobs: 134, 
          avatar: 'https://via.placeholder.com/50x50',
          level: 'محترف',
          verified: true 
        },
        { 
          name: 'خالد العلي', 
          rating: 4.9, 
          jobs: 98, 
          avatar: 'https://via.placeholder.com/50x50',
          level: 'خبير',
          verified: true 
        }
      ]
    },
    2: {
      id: 2,
      name: 'هوية بصرية',
      icon: <FaPalette className="text-3xl" />,
      description: 'بناء هوية بصرية متكاملة لعلامتك التجارية',
      coverImage: 'https://via.placeholder.com/1200x300',
      services: 189,
      providers: 76,
      rating: 4.9,
      subcategories: [
        { id: 1, name: 'شعارات', count: 67, icon: FaGem },
        { id: 2, name: 'دليل الهوية', count: 45, icon: FaBook },
        { id: 3, name: 'بطاقات عمل', count: 34, icon: FaIdCard },
        { id: 4, name: 'قرطاسية', count: 23, icon: FaRegStar }
      ],
      topProviders: [
        { 
          name: 'محمد العتيبي', 
          rating: 5.0, 
          jobs: 112, 
          avatar: 'https://via.placeholder.com/50x50',
          level: 'خبير',
          verified: true 
        }
      ]
    }
  }[id] || {
    id,
    name: 'تصميم جرافيك',
    icon: <FaPaintBrush className="text-3xl" />,
    description: 'تصاميم إبداعية احترافية',
    services: 245,
    providers: 128,
    rating: 4.8
  }

  const services = [
    {
      id: 1,
      title: 'تصميم هوية بصرية متكاملة للشركات الناشئة',
      provider: {
        name: 'أحمد محمد',
        avatar: 'https://via.placeholder.com/50x50',
        level: 'خبير',
        verified: true
      },
      rating: 4.9,
      reviews: 124,
      price: 250,
      image: 'https://via.placeholder.com/300x200',
      category: 'هوية بصرية',
      deliveryTime: '٣ أيام',
      level: 'خبير',
      featured: true,
      tags: ['هوية', 'شعار'],
      saved: 89
    },
    {
      id: 2,
      title: 'تصميم شعار احترافي مع دليل الألوان',
      provider: {
        name: 'سارة أحمد',
        avatar: 'https://via.placeholder.com/50x50',
        level: 'متقدم',
        verified: true
      },
      rating: 4.8,
      reviews: 98,
      price: 180,
      image: 'https://via.placeholder.com/300x200',
      category: 'شعارات',
      deliveryTime: 'يومان',
      level: 'متقدم',
      featured: false,
      tags: ['شعار'],
      saved: 45
    },
    {
      id: 3,
      title: 'تصميم بطاقات عمل وقرطاسية مكتبية',
      provider: {
        name: 'خالد العلي',
        avatar: 'https://via.placeholder.com/50x50',
        level: 'محترف',
        verified: true
      },
      rating: 5.0,
      reviews: 56,
      price: 120,
      image: 'https://via.placeholder.com/300x200',
      category: 'بطاقات عمل',
      deliveryTime: 'يومان',
      level: 'محترف',
      featured: false,
      tags: ['بطاقات'],
      saved: 34
    },
    {
      id: 4,
      title: 'تصميم بروشورات وكتيبات تسويقية',
      provider: {
        name: 'نورة سعد',
        avatar: 'https://via.placeholder.com/50x50',
        level: 'متقدم',
        verified: false
      },
      rating: 4.7,
      reviews: 34,
      price: 190,
      image: 'https://via.placeholder.com/300x200',
      category: 'بروشورات',
      deliveryTime: '٣ أيام',
      level: 'متقدم',
      featured: false,
      tags: ['بروشورات'],
      saved: 23
    },
    {
      id: 5,
      title: 'تصميم بوسترات إعلانية احترافية',
      provider: {
        name: 'محمد العتيبي',
        avatar: 'https://via.placeholder.com/50x50',
        level: 'خبير',
        verified: true
      },
      rating: 4.9,
      reviews: 78,
      price: 150,
      image: 'https://via.placeholder.com/300x200',
      category: 'بوسترات',
      deliveryTime: 'يومان',
      level: 'خبير',
      featured: false,
      tags: ['بوسترات'],
      saved: 56
    },
    {
      id: 6,
      title: 'تصميم تصاميم سوشيال ميديا متكاملة',
      provider: {
        name: 'فاطمة الزهراء',
        avatar: 'https://via.placeholder.com/50x50',
        level: 'محترف',
        verified: false
      },
      rating: 4.6,
      reviews: 42,
      price: 200,
      image: 'https://via.placeholder.com/300x200',
      category: 'سوشيال ميديا',
      deliveryTime: '٣ أيام',
      level: 'محترف',
      featured: false,
      tags: ['سوشيال ميديا'],
      saved: 67
    }
  ]

  const levels = [
    { id: 'beginner', name: 'مبتدئ', count: 45, icon: FaUser },
    { id: 'intermediate', name: 'متوسط', count: 89, icon: FaMedal },
    { id: 'advanced', name: 'متقدم', count: 67, icon: FaTrophy },
    { id: 'expert', name: 'خبير', count: 44, icon: FaCrown }
  ]

  const deliveryTimes = [
    { id: '1day', name: 'يوم واحد', count: 34 },
    { id: '3days', name: '٣ أيام', count: 78 },
    { id: '5days', name: '٥ أيام', count: 67 },
    { id: '7days', name: 'أسبوع', count: 45 },
    { id: 'custom', name: 'حسب الاتفاق', count: 21 }
  ]

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedSubcategories, selectedLevels, selectedDelivery, priceRange, sortBy])

  const handleSubcategoryToggle = (subcatId) => {
    setSelectedSubcategories(prev =>
      prev.includes(subcatId)
        ? prev.filter(id => id !== subcatId)
        : [...prev, subcatId]
    )
  }

  const clearFilters = () => {
    setSelectedSubcategories([])
    setSelectedLevels([])
    setSelectedDelivery([])
    setPriceRange({ min: 0, max: 1000 })
    setSortBy('latest')
  }

  const getLevelIcon = (level) => {
    switch(level) {
      case 'مبتدئ': return FaUser
      case 'متوسط': return FaMedal
      case 'متقدم': return FaTrophy
      case 'خبير': return FaCrown
      case 'محترف': return FaAward
      default: return FaUser
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back to Categories */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors group bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
            <span>العودة إلى التصنيفات</span>
          </Link>
        </motion.div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium"
          >
            <FaSlidersH />
            الفلاتر
          </button>
        </div>

        {/* Category Hero */}
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="relative mb-8 overflow-hidden rounded-3xl shadow-xl"
        >
          <img 
            src={categoryData.coverImage || 'https://via.placeholder.com/1200x300'} 
            alt={categoryData.name}
            className="w-full h-48 md:h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute bottom-0 right-0 left-0 p-6 md:p-8 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-white">
                {categoryData.icon}
              </div>
              <div>
                <h1 className="text-2xl md:text-4xl font-bold mb-2">{categoryData.name}</h1>
                <p className="text-white/90 text-sm md:text-base mb-3">{categoryData.description}</p>
                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm">
                  <span className="flex items-center gap-1 bg-white/20 backdrop-blur px-3 py-1 rounded-full">
                    <FaGem className="text-primary-300" />
                    {categoryData.services} خدمة
                  </span>
                  <span className="flex items-center gap-1 bg-white/20 backdrop-blur px-3 py-1 rounded-full">
                    <FaUsers className="text-primary-300" />
                    {categoryData.providers} مقدم خدمة
                  </span>
                  <span className="flex items-center gap-1 bg-white/20 backdrop-blur px-3 py-1 rounded-full">
                    <FaStar className="text-yellow-400" />
                    {categoryData.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <motion.div 
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <FaFilter className="text-primary-600" />
                    الفلاتر
                  </h3>
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    إعادة ضبط
                  </button>
                </div>

                {/* Subcategories */}
                {categoryData.subcategories && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      التصنيفات الفرعية
                    </h4>
                    <div className="space-y-2">
                      {categoryData.subcategories.map(subcat => {
                        const Icon = subcat.icon
                        return (
                          <label key={subcat.id} className="flex items-center justify-between cursor-pointer group">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={selectedSubcategories.includes(subcat.id)}
                                onChange={() => handleSubcategoryToggle(subcat.id)}
                                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                              />
                              {Icon && <Icon className="text-gray-500 text-sm" />}
                              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-600 transition-colors">
                                {subcat.name}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">({subcat.count})</span>
                          </label>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">نطاق السعر</h4>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="من"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({...priceRange, min: parseInt(e.target.value) || 0})}
                        className="text-sm"
                      />
                      <Input
                        type="number"
                        placeholder="إلى"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value) || 1000})}
                        className="text-sm"
                      />
                    </div>
                    
                    {/* Price Range Slider */}
                    <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div 
                        className="absolute h-full bg-primary-600 rounded-full"
                        style={{ 
                          left: `${(priceRange.min / 1000) * 100}%`, 
                          right: `${100 - (priceRange.max / 1000) * 100}%` 
                        }}
                      />
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({...priceRange, min: parseInt(e.target.value)})}
                        className="absolute w-full -top-1 h-4 opacity-0 cursor-pointer"
                      />
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value)})}
                        className="absolute w-full -top-1 h-4 opacity-0 cursor-pointer"
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>٠ ر.س</span>
                      <span>١٠٠٠ ر.س</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Time */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">وقت التسليم</h4>
                  <div className="space-y-2">
                    {deliveryTimes.map(time => (
                      <label key={time.id} className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedDelivery.includes(time.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedDelivery([...selectedDelivery, time.id])
                              } else {
                                setSelectedDelivery(selectedDelivery.filter(d => d !== time.id))
                              }
                            }}
                            className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <FaRegClock className="text-gray-500 text-sm" />
                          <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-600 transition-colors">
                            {time.name}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">({time.count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Provider Level */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">مستوى مقدم الخدمة</h4>
                  <div className="space-y-2">
                    {levels.map(level => {
                      const Icon = level.icon
                      return (
                        <label key={level.id} className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedLevels.includes(level.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedLevels([...selectedLevels, level.id])
                                } else {
                                  setSelectedLevels(selectedLevels.filter(l => l !== level.id))
                                }
                              }}
                              className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            />
                            <Icon className="text-gray-500 text-sm" />
                            <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-600 transition-colors">
                              {level.name}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">({level.count})</span>
                        </label>
                      )
                    })}
                  </div>
                </div>

                {/* Verified Only */}
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <MdVerified className="text-primary-600 text-lg" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-600 transition-colors">
                    مقدمي خدمة موثقين فقط
                  </span>
                </label>

                {/* Apply Filters */}
                <Button variant="primary" fullWidth className="mt-6 py-3 rounded-xl">
                  تطبيق التصفية
                </Button>
              </motion.div>

              {/* Trust Badges */}
              <motion.div 
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-3xl p-6 border border-green-100 dark:border-green-900/30"
              >
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <MdSecurity className="text-green-600" />
                  حماية وأمان
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FaCheckCircle className="text-green-500 text-xs" />
                    <span>معلوماتك مشفرة بالكامل</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FaCheckCircle className="text-green-500 text-xs" />
                    <span>ضمان استرداد الأموال</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FaCheckCircle className="text-green-500 text-xs" />
                    <span>دعم فني 24/7</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Mobile Filters Modal */}
          <AnimatePresence>
            {showMobileFilters && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                onClick={() => setShowMobileFilters(false)}
              >
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'tween' }}
                  className="absolute top-0 left-0 w-80 h-full bg-white dark:bg-gray-800 shadow-xl overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <FaFilter className="text-primary-600" />
                        الفلاتر
                      </h3>
                      <button
                        onClick={() => setShowMobileFilters(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <FaTimes className="text-xl" />
                      </button>
                    </div>

                    {/* Filter content same as desktop */}
                    {categoryData.subcategories && (
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">التصنيفات الفرعية</h4>
                        <div className="space-y-2">
                          {categoryData.subcategories.map(subcat => (
                            <label key={subcat.id} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={selectedSubcategories.includes(subcat.id)}
                                  onChange={() => handleSubcategoryToggle(subcat.id)}
                                  className="rounded border-gray-300 text-primary-600"
                                />
                                <span className="text-sm">{subcat.name}</span>
                              </div>
                              <span className="text-xs text-gray-500">({subcat.count})</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 mt-6">
                      <Button variant="outline" fullWidth onClick={clearFilters}>
                        إعادة ضبط
                      </Button>
                      <Button variant="primary" fullWidth onClick={() => setShowMobileFilters(false)}>
                        تطبيق
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Services Grid */}
          <div className="lg:col-span-3">
            {/* Top Bar */}
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 mb-6 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === 'grid' 
                          ? 'bg-primary-600 text-white shadow-md' 
                          : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      <FaThLarge />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === 'list' 
                          ? 'bg-primary-600 text-white shadow-md' 
                          : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      <FaList />
                    </button>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-bold text-gray-900 dark:text-white">١٢٨</span> نتيجة
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <FaSort className="text-gray-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  >
                    <option value="latest">الأحدث</option>
                    <option value="price_asc">السعر: من الأقل</option>
                    <option value="price_desc">السعر: من الأعلى</option>
                    <option value="rating">التقييم</option>
                    <option value="popularity">الأكثر طلباً</option>
                  </select>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedSubcategories.length > 0 || selectedLevels.length > 0 || selectedDelivery.length > 0) && (
                <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-500">التصفية النشطة:</span>
                  {selectedSubcategories.map(id => {
                    const subcat = categoryData.subcategories?.find(s => s.id === id)
                    return subcat && (
                      <span key={id} className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-full text-sm">
                        {subcat.name}
                        <button onClick={() => handleSubcategoryToggle(id)}>
                          <FaTimes className="text-xs" />
                        </button>
                      </span>
                    )
                  })}
                  {selectedLevels.map(id => {
                    const level = levels.find(l => l.id === id)
                    return level && (
                      <span key={id} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                        {level.name}
                        <button onClick={() => setSelectedLevels(selectedLevels.filter(l => l !== id))}>
                          <FaTimes className="text-xs" />
                        </button>
                      </span>
                    )
                  })}
                </div>
              )}
            </motion.div>

            {/* Featured Service */}
            {services.filter(s => s.featured).length > 0 && (
              <motion.div 
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="mb-6"
              >
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
                  <div className="flex items-center gap-2 text-amber-600 mb-4">
                    <FaCrown className="text-xl" />
                    <span className="font-semibold">خدمة مميزة</span>
                  </div>
                  <ServiceCard service={services.find(s => s.featured)} />
                </div>
              </motion.div>
            )}

            {/* Services Grid/List */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 gap-6' 
                : 'space-y-4'
              }
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                >
                  {viewMode === 'grid' ? (
                    <ServiceCard service={service} />
                  ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-48 h-48 relative">
                          <img 
                            src={service.image} 
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                          {service.featured && (
                            <div className="absolute top-3 right-3 bg-amber-500 text-white px-3 py-1 rounded-lg text-xs font-medium shadow-lg">
                              مميز
                            </div>
                          )}
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white hover:text-primary-600 transition-colors">
                              <Link to={`/service/${service.id}`}>
                                {service.title}
                              </Link>
                            </h3>
                            <button className="text-gray-400 hover:text-red-500 transition-colors">
                              <FaRegHeart size={20} />
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-2">
                              <img
                                src={service.provider.avatar}
                                alt={service.provider.name}
                                className="w-6 h-6 rounded-full"
                              />
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {service.provider.name}
                              </span>
                              {service.provider.verified && (
                                <MdVerified className="text-primary-600 text-sm" />
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <FaStar className="text-yellow-400 text-sm" />
                              <span className="text-sm font-medium">{service.rating}</span>
                              <span className="text-xs text-gray-500">({service.reviews})</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm mb-4">
                            <span className="flex items-center gap-1 text-gray-500">
                              <FaRegClock />
                              {service.deliveryTime}
                            </span>
                            <span className="flex items-center gap-1 text-gray-500">
                              {service.level === 'خبير' && <FaCrown className="text-primary-600" />}
                              {service.level === 'محترف' && <FaAward className="text-primary-600" />}
                              {service.level === 'متقدم' && <FaTrophy className="text-primary-600" />}
                              {service.level}
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                            <div>
                              <span className="text-2xl font-bold text-primary-600">{service.price}</span>
                              <span className="text-sm text-gray-500 mr-1">ريال</span>
                            </div>
                            <Link to={`/service/${service.id}`}>
                              <Button variant="primary" size="md" className="px-6">
                                عرض التفاصيل
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="mt-8"
            >
              <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
              />
            </motion.div>
          </div>
        </div>

        {/* Top Providers */}
        {categoryData.topProviders && (
          <motion.section 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FaUsers className="text-primary-600" />
              أفضل مقدمي الخدمات في {categoryData.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categoryData.topProviders.map((provider, index) => {
                const LevelIcon = getLevelIcon(provider.level)
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img 
                          src={provider.avatar} 
                          alt={provider.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-primary-200"
                        />
                        {provider.verified && (
                          <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center border-2 border-white">
                            <MdVerified className="text-white text-xs" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                          {provider.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm mb-2">
                          <div className="flex items-center gap-1">
                            <FaStar className="text-yellow-400" />
                            <span className="font-medium">{provider.rating}</span>
                          </div>
                          <span className="w-1 h-1 bg-gray-300 rounded-full" />
                          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                            <LevelIcon className="text-primary-600" />
                            <span>{provider.level}</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {provider.jobs} خدمة منجزة
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <Link 
                        to={`/provider/${provider.name}`}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center justify-between group"
                      >
                        عرض الملف الشخصي
                        <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.section>
        )}

        {/* Decorative Elements */}
        <div className="absolute -z-10 top-40 right-20 w-64 h-64 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-3xl" />
        <div className="absolute -z-10 bottom-40 left-20 w-64 h-64 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-3xl" />
      </div>
    </div>
  )
}

export default CategoryPage