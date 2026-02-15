import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaSearch, FaFilter, FaStar, FaClock, FaUserTie,
  FaChevronDown, FaTimes, FaSlidersH, FaSort,
  FaThLarge, FaList, FaEye, FaHeart, FaShare,
  FaCheckCircle, FaRegClock, FaRegStar, FaRegHeart,
  FaRegUser, FaTrophy, FaAward, FaMedal, FaRocket,
  FaBolt, FaFire, FaChartLine, FaCrown, FaGem,
  FaChevronLeft
} from 'react-icons/fa'
import { MdVerified, MdOutlineDeliveryDining, MdSecurity } from 'react-icons/md'
import { RiCustomerServiceLine, RiTeamLine, RiShieldStarLine } from 'react-icons/ri'
import Breadcrumb from '../../components/ui/Breadcrumb'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import ServiceCard from '../../components/Common/ServiceCard'
import Pagination from '../../components/ui/Pagination'

const Services = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('latest')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [selectedLevels, setSelectedLevels] = useState([])
  const [selectedDelivery, setSelectedDelivery] = useState([])

  const categories = [
    { id: 'all', name: 'جميع الخدمات', count: 245, icon: FaThLarge },
    { id: 'design', name: 'تصميم جرافيك', count: 89, icon: FaGem },
    { id: 'branding', name: 'هوية بصرية', count: 67, icon: FaCrown },
    { id: 'marketing', name: 'تسويق رقمي', count: 45, icon: FaChartLine },
    { id: 'web', name: 'تطوير مواقع', count: 34, icon: FaRocket },
    { id: 'photo', name: 'تصوير وفيديو', count: 10, icon: FaEye }
  ]

  const services = [
    {
      id: 1,
      title: 'هوية بصرية متكاملة للشركات الناشئة',
      provider: {
        name: 'أحمد محمد',
        avatar: 'https://via.placeholder.com/50x50',
        level: 'خبير',
        verified: true,
        rating: 4.9,
        reviews: 124
      },
      rating: 4.9,
      reviews: 124,
      price: 250,
      image: 'https://via.placeholder.com/300x200',
      category: 'هوية بصرية',
      deliveryTime: '٣ أيام',
      level: 'خبير',
      tags: ['شعار', 'هوية', 'تصميم'],
      saved: 89,
      featured: true,
      badge: 'معروض خاص'
    },
    {
      id: 2,
      title: 'تصميم شعار احترافي',
      provider: {
        name: 'سارة أحمد',
        avatar: 'https://via.placeholder.com/50x50',
        level: 'متقدم',
        verified: true,
        rating: 4.8,
        reviews: 98
      },
      rating: 4.8,
      reviews: 98,
      price: 180,
      image: 'https://via.placeholder.com/300x200',
      category: 'تصميم',
      deliveryTime: 'يومان',
      level: 'متقدم',
      tags: ['شعار', 'تصميم'],
      saved: 45,
      featured: false
    },
    {
      id: 3,
      title: 'دليل الهوية البصرية',
      provider: {
        name: 'خالد العلي',
        avatar: 'https://via.placeholder.com/50x50',
        level: 'خبير',
        verified: true,
        rating: 5.0,
        reviews: 56
      },
      rating: 5.0,
      reviews: 56,
      price: 320,
      image: 'https://via.placeholder.com/300x200',
      category: 'هوية بصرية',
      deliveryTime: '٥ أيام',
      level: 'خبير',
      tags: ['هوية', 'دليل'],
      saved: 67,
      featured: true,
      badge: 'الأكثر مبيعاً'
    },
    {
      id: 4,
      title: 'تصميم هوية متجر إلكتروني',
      provider: {
        name: 'نورة سعد',
        avatar: 'https://via.placeholder.com/50x50',
        level: 'متقدم',
        verified: false,
        rating: 4.7,
        reviews: 34
      },
      rating: 4.7,
      reviews: 34,
      price: 290,
      image: 'https://via.placeholder.com/300x200',
      category: 'تصميم',
      deliveryTime: '٤ أيام',
      level: 'متقدم',
      tags: ['متجر', 'هوية'],
      saved: 23
    },
    {
      id: 5,
      title: 'استراتيجية العلامة التجارية',
      provider: {
        name: 'محمد العتيبي',
        avatar: 'https://via.placeholder.com/50x50',
        level: 'محترف',
        verified: true,
        rating: 4.9,
        reviews: 78
      },
      rating: 4.9,
      reviews: 78,
      price: 450,
      image: 'https://via.placeholder.com/300x200',
      category: 'تسويق',
      deliveryTime: '٧ أيام',
      level: 'محترف',
      tags: ['استراتيجية', 'تسويق'],
      saved: 92,
      featured: true
    },
    {
      id: 6,
      title: 'تصميم مواد تسويقية',
      provider: {
        name: 'فاطمة الزهراء',
        avatar: 'https://via.placeholder.com/50x50',
        level: 'مبتدئ',
        verified: false,
        rating: 4.6,
        reviews: 42
      },
      rating: 4.6,
      reviews: 42,
      price: 150,
      image: 'https://via.placeholder.com/300x200',
      category: 'تصميم',
      deliveryTime: 'يومان',
      level: 'مبتدئ',
      tags: ['مواد', 'تسويق'],
      saved: 34
    }
  ]

  const levels = [
    { id: 'beginner', name: 'مبتدئ', count: 45, icon: FaRegUser },
    { id: 'intermediate', name: 'متقدم', count: 89, icon: FaMedal },
    { id: 'expert', name: 'خبير', count: 67, icon: FaTrophy },
    { id: 'professional', name: 'محترف', count: 44, icon: FaCrown }
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
  }, [searchQuery, selectedCategory, sortBy])

  const clearFilters = () => {
    setSelectedCategory('all')
    setPriceRange({ min: 0, max: 1000 })
    setSelectedLevels([])
    setSelectedDelivery([])
    setSortBy('latest')
  }

  const getLevelIcon = (level) => {
    switch(level) {
      case 'مبتدئ': return FaRegUser
      case 'متقدم': return FaMedal
      case 'خبير': return FaTrophy
      case 'محترف': return FaCrown
      default: return FaRegUser
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">
              الرئيسية
            </a>
              <FaChevronLeft className="text-gray-400 mx-2 text-xs" />
            <span className="text-gray-900 dark:text-white font-medium">الخدمات</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800">
          {/* Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10 py-16 px-4 text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              خدماتنا المميزة
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl max-w-2xl mx-auto mb-8 opacity-90"
            >
              اختر من بين أكثر من ٢٤٥ خدمة احترافية لبناء هويتك البصرية وتطوير أعمالك
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن خدمة، تصنيف، أو مقدم خدمة..."
                  icon={<FaSearch />}
                  className="bg-white/10 border-white/20 text-white placeholder-white/70 focus:bg-white/20"
                />
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center gap-8 mt-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold">٢٤٥+</div>
                <div className="text-sm opacity-80">خدمة احترافية</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">٥٠+</div>
                <div className="text-sm opacity-80">مقدم خدمة</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">٤.٩</div>
                <div className="text-sm opacity-80">تقييم عام</div>
              </div>
            </motion.div>

            {/* Popular Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-2 mt-8"
            >
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">شعار</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">هوية</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">تسويق</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">تصميم</span>
            </motion.div>
          </div>
        </div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              التصنيفات
            </h2>
            <Button 
              variant="ghost" 
              size="sm" 
              icon={<FaSlidersH />}
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              تصفية
            </Button>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all
                    ${selectedCategory === category.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <Icon className="text-sm" />
                  <span>{category.name}</span>
                  <span className={`text-sm ${
                    selectedCategory === category.id 
                      ? 'bg-white/20' 
                      : 'bg-gray-200 dark:bg-gray-700'
                  } px-2 py-0.5 rounded-full`}>
                    {category.count}
                  </span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence mode="wait">
            {(showFilters || window.innerWidth >= 1024) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="lg:col-span-1"
              >
                <div className="sticky top-24 space-y-6">
                  {/* Filter Header */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <FaFilter className="text-primary-600" />
                        تصفية النتائج
                      </h3>
                      <button
                        onClick={clearFilters}
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        إعادة ضبط
                      </button>
                    </div>

                    {/* Price Range */}
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                        نطاق السعر
                      </h4>
                      <div className="space-y-2">
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value)})}
                          className="w-full accent-primary-600"
                        />
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                          <span>٠ ر.س</span>
                          <span>{priceRange.max} ر.س</span>
                        </div>
                      </div>
                    </div>

                    {/* Level Filter */}
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                        مستوى الخبير
                      </h4>
                      <div className="space-y-2">
                        {levels.map((level) => {
                          const Icon = level.icon
                          return (
                            <label key={level.id} className="flex items-center justify-between cursor-pointer">
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
                                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                />
                                <Icon className="text-gray-500" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">{level.name}</span>
                              </div>
                              <span className="text-sm text-gray-500">({level.count})</span>
                            </label>
                          )
                        })}
                      </div>
                    </div>

                    {/* Delivery Time */}
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                        وقت التسليم
                      </h4>
                      <div className="space-y-2">
                        {deliveryTimes.map((time) => (
                          <label key={time.id} className="flex items-center justify-between cursor-pointer">
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
                                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                              />
                              <span className="text-sm text-gray-700 dark:text-gray-300">{time.name}</span>
                            </div>
                            <span className="text-sm text-gray-500">({time.count})</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Verified Only */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <MdVerified className="text-primary-600" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">مقدمي خدمة موثقين فقط</span>
                    </label>
                  </div>

                  {/* Trust Badges */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-green-100 dark:border-green-900/30">
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
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Services Grid */}
          <div className="lg:col-span-3">
            {/* Sort and View Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <FaSort className="text-gray-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="latest">الأحدث</option>
                      <option value="price_asc">السعر: الأقل أولاً</option>
                      <option value="price_desc">السعر: الأعلى أولاً</option>
                      <option value="rating">التقييم الأعلى</option>
                      <option value="popularity">الأكثر طلباً</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1 border-r border-gray-200 dark:border-gray-700 pr-4">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-primary-600 text-white' 
                          : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <FaThLarge />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-primary-600 text-white' 
                          : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <FaList />
                    </button>
                  </div>
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-400">
                  عرض ١-٦ من <span className="font-bold text-gray-900 dark:text-white">٢٤٥</span> نتيجة
                </div>
              </div>

              {/* Active Filters */}
              {(selectedCategory !== 'all' || selectedLevels.length > 0 || selectedDelivery.length > 0) && (
                <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-500">التصفية النشطة:</span>
                  {selectedCategory !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-full text-sm">
                      {categories.find(c => c.id === selectedCategory)?.name}
                      <button onClick={() => setSelectedCategory('all')}>
                        <FaTimes className="text-xs" />
                      </button>
                    </span>
                  )}
                  {selectedLevels.map(level => (
                    <span key={level} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                      {levels.find(l => l.id === level)?.name}
                      <button onClick={() => setSelectedLevels(selectedLevels.filter(l => l !== level))}>
                        <FaTimes className="text-xs" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Services Grid/List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 gap-6' 
                : 'space-y-4'
              }
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  {viewMode === 'grid' ? (
                    <ServiceCard service={service} />
                  ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-48 h-48 relative">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                          {service.featured && (
                            <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                              مميز
                            </div>
                          )}
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                              {service.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <button className="text-gray-400 hover:text-red-500 transition-colors">
                                <FaRegHeart />
                              </button>
                              <button className="text-gray-400 hover:text-primary-600 transition-colors">
                                <FaShare />
                              </button>
                            </div>
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
                              <FaStar className="text-yellow-400 text-xs" />
                              <span className="text-sm font-medium">{service.rating}</span>
                              <span className="text-xs text-gray-500">({service.reviews})</span>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                            {service.title} - خدمة احترافية من {service.provider.name}
                          </p>

                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1 text-gray-500">
                              <FaRegClock />
                              {service.deliveryTime}
                            </span>
                            <span className="flex items-center gap-1 text-gray-500">
                              <FaUserTie />
                              {service.level}
                            </span>
                          </div>

                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <div>
                              <span className="text-2xl font-bold text-primary-600">{service.price}</span>
                              <span className="text-sm text-gray-500 mr-1">ريال</span>
                            </div>
                            <Button variant="primary" size="sm">
                              عرض التفاصيل
                            </Button>
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
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
      </div>
    </div>
  )
}

export default Services