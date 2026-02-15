import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FaPalette, FaVectorSquare, FaChartLine, FaCode, 
  FaCamera, FaPen, FaMusic, FaVideo, FaSearch,
  FaArrowLeft, FaStar, FaUserTie, FaWrench,
  FaBolt, FaPaintRoller, FaPlug, FaWater,
  FaTools, FaHammer, FaCouch, FaBroom,
  FaCheckCircle, FaUsers, FaRegStar, FaRocket,
  FaFire, FaCrown, FaMedal, FaAward,
  FaChevronLeft, FaFilter, FaSlidersH,
  FaRegClock, FaShieldAlt, FaRegHeart,
  FaShare, FaEye, FaUserCheck, FaUserPlus,
  FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaThLarge, FaList, FaSort, FaTimes,
  FaRegBuilding, FaRegCalendar, FaRegUser,
  FaGraduationCap, FaBriefcase, FaClock
} from 'react-icons/fa'
import { MdVerified, MdSecurity, MdOutlineDeliveryDining } from 'react-icons/md'
import { RiTeamLine, RiCustomerServiceLine, RiShieldStarLine } from 'react-icons/ri'
import Breadcrumb from '../../components/ui/Breadcrumb'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import ServiceCard from '../../components/Common/ServiceCard'

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('latest')
  const [selectedSubcategories, setSelectedSubcategories] = useState([])
  const [selectedLevels, setSelectedLevels] = useState([])
  const [selectedDelivery, setSelectedDelivery] = useState([])

  const categories = [
    {
      id: 1,
      name: 'تصميم جرافيك',
      icon: <FaPalette />,
      description: 'تصاميم إبداعية احترافية لعلامتك التجارية',
      services: 245,
      providers: 128,
      rating: 4.8,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      iconColor: 'text-purple-600',
      subcategories: ['شعارات', 'بطاقات عمل', 'بروشورات', 'بوسترات']
    },
    {
      id: 2,
      name: 'هوية بصرية',
      icon: <FaVectorSquare />,
      description: 'بناء هوية متكاملة لشركتك الناشئة',
      services: 189,
      providers: 76,
      rating: 4.9,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      iconColor: 'text-blue-600',
      subcategories: ['شعار', 'دليل هوية', 'ألوان', 'طباعة']
    },
    {
      id: 3,
      name: 'تسويق رقمي',
      icon: <FaChartLine />,
      description: 'حلول تسويقية متكاملة لزيادة مبيعاتك',
      services: 320,
      providers: 156,
      rating: 4.7,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      iconColor: 'text-green-600',
      subcategories: ['سوشيال ميديا', 'إعلانات', 'تحسين محركات', 'بريد إلكتروني']
    },
    {
      id: 4,
      name: 'تطوير مواقع',
      icon: <FaCode />,
      description: 'مواقع وتطبيقات بأحدث التقنيات',
      services: 167,
      providers: 89,
      rating: 4.8,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
      iconColor: 'text-orange-600',
      subcategories: ['مواقع شركات', 'متاجر إلكترونية', 'تطبيقات جوال', 'صيانة']
    },
    {
      id: 5,
      name: 'تصوير وفيديو',
      icon: <FaCamera />,
      description: 'تصوير احترافي وإنتاج فيديو',
      services: 98,
      providers: 45,
      rating: 4.6,
      color: 'from-yellow-500 to-amber-500',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      iconColor: 'text-yellow-600',
      subcategories: ['تصوير منتجات', 'فيديوهات تسويقية', 'مونتاج', 'رسوم متحركة']
    },
    {
      id: 6,
      name: 'كتابة وترجمة',
      icon: <FaPen />,
      description: 'محتوى إبداعي وترجمة احترافية',
      services: 156,
      providers: 67,
      rating: 4.8,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/20',
      iconColor: 'text-indigo-600',
      subcategories: ['كتابة محتوى', 'ترجمة', 'تدقيق لغوي', 'صياغة إعلانات']
    },
    {
      id: 7,
      name: 'إنتاج موسيقي',
      icon: <FaMusic />,
      description: 'موسيقى تصويرية ومؤثرات صوتية',
      services: 67,
      providers: 34,
      rating: 4.5,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-100 dark:bg-pink-900/20',
      iconColor: 'text-pink-600',
      subcategories: ['موسيقى تصويرية', 'مؤثرات', 'تلحين', 'هندسة صوت']
    },
    {
      id: 8,
      name: 'رسوم متحركة',
      icon: <FaVideo />,
      description: 'فيديوهات كرتونية وموشن جرافيك',
      services: 78,
      providers: 42,
      rating: 4.7,
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'bg-teal-100 dark:bg-teal-900/20',
      iconColor: 'text-teal-600',
      subcategories: ['موشن جرافيك', 'رسوم ثنائية الأبعاد', 'رسوم ثلاثية الأبعاد', 'إنفوجرافيك']
    },
    // Home Maintenance Categories
    {
      id: 9,
      name: 'صيانة منزلية',
      icon: <FaWrench />,
      description: 'صيانة عامة وإصلاحات منزلية شاملة',
      services: 128,
      providers: 56,
      rating: 4.7,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-100 dark:bg-amber-900/20',
      iconColor: 'text-amber-600',
      subcategories: ['صيانة عامة', 'سباكة', 'كهرباء', 'دهانات']
    },
    {
      id: 10,
      name: 'كهرباء منزلية',
      icon: <FaBolt />,
      description: 'تمديدات كهربائية وإصلاح أعطال',
      services: 89,
      providers: 34,
      rating: 4.8,
      color: 'from-yellow-500 to-amber-500',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      iconColor: 'text-yellow-600',
      subcategories: ['تمديدات', 'إصلاح أعطال', 'لوحات كهربائية', 'إنارة']
    },
    {
      id: 11,
      name: 'دهانات وديكور',
      icon: <FaPaintRoller />,
      description: 'دهانات داخلية وخارجية وديكورات',
      services: 67,
      providers: 28,
      rating: 4.6,
      color: 'from-red-500 to-rose-500',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
      iconColor: 'text-red-600',
      subcategories: ['دهانات داخلية', 'دهانات خارجية', 'ورق جدران', 'ديكورات']
    },
    {
      id: 12,
      name: 'سباكة',
      icon: <FaWater />,
      description: 'إصلاح تسريبات وتمديدات صحية',
      services: 78,
      providers: 32,
      rating: 4.5,
      color: 'from-blue-500 to-sky-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      iconColor: 'text-blue-600',
      subcategories: ['تسريبات', 'تمديدات', 'صيانة سخانات', 'تسليك مجاري']
    },
    {
      id: 13,
      name: 'تنظيف منازل',
      icon: <FaBroom />,
      description: 'تنظيف عام وتعقيم شامل للمنازل',
      services: 112,
      providers: 48,
      rating: 4.7,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      iconColor: 'text-green-600',
      subcategories: ['تنظيف عام', 'تعقيم', 'تنظيف سجاد', 'تنظيف واجهات']
    },
    {
      id: 14,
      name: 'نجارة وأثاث',
      icon: <FaCouch />,
      description: 'تصليح وتجديد الأثاث والنجارة',
      services: 45,
      providers: 19,
      rating: 4.8,
      color: 'from-amber-700 to-amber-900',
      bgColor: 'bg-amber-100 dark:bg-amber-900/20',
      iconColor: 'text-amber-700',
      subcategories: ['تصليح أثاث', 'تركيب مطابخ', 'أبواب وشبابيك', 'باركيه']
    },
    {
      id: 15,
      name: 'أعمال حديدية',
      icon: <FaHammer />,
      description: 'أعمال حدادة ولحام وتشكيل معادن',
      services: 34,
      providers: 15,
      rating: 4.6,
      color: 'from-gray-500 to-slate-500',
      bgColor: 'bg-gray-100 dark:bg-gray-900/20',
      iconColor: 'text-gray-600',
      subcategories: ['أبواب حديد', 'شبابيك', 'درابزين', 'هياكل معدنية']
    },
    {
      id: 16,
      name: 'صيانة أجهزة',
      icon: <FaTools />,
      description: 'صيانة أجهزة منزلية وتكييف',
      services: 95,
      providers: 41,
      rating: 4.5,
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      iconColor: 'text-purple-600',
      subcategories: ['تكييف', 'ثلاجات', 'غسالات', 'أفران']
    }
  ]

  const levels = [
    { id: 'beginner', name: 'مبتدئ', count: 45, icon: FaGraduationCap },
    { id: 'intermediate', name: 'متوسط', count: 89, icon: FaBriefcase },
    { id: 'advanced', name: 'متقدم', count: 67, icon: FaAward },
    { id: 'expert', name: 'خبير', count: 44, icon: FaCrown }
  ]

  const deliveryTimes = [
    { id: '1day', name: 'يوم واحد', count: 34, icon: FaClock },
    { id: '3days', name: '٣ أيام', count: 78, icon: FaClock },
    { id: '5days', name: '٥ أيام', count: 67, icon: FaClock },
    { id: '7days', name: 'أسبوع', count: 45, icon: FaRegCalendar }
  ]

  const featuredCategories = categories.slice(0, 4)

  const clearFilters = () => {
    setSelectedCategory('all')
    setPriceRange({ min: 0, max: 1000 })
    setSelectedSubcategories([])
    setSelectedLevels([])
    setSelectedDelivery([])
    setSortBy('latest')
  }

  return (
<div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb 
          items={[
            { label: 'الرئيسية', path: '/' },
            { label: 'التصنيفات', path: '/categories' }
          ]}
        />

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-12 p-12 overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900">
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            
            {/* Animated orbs */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl"
            />
          </div>

          <div className="relative z-10 py-16 px-4 text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              تصفح التصنيفات
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl max-w-2xl mx-auto mb-8 opacity-90"
            >
              اكتشف أكثر من ١٢ تصنيف رئيسي و١٠٠٠+ خدمة احترافية
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن تصنيف..."
                  icon={<FaSearch />}
                  className="bg-white/10 border-white/20 text-white placeholder-white/70 focus:bg-white/20 focus:ring-4 focus:ring-white/20"
                />
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-8 mt-8"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2">
                <FaCrown className="text-amber-400" />
                <span className="font-bold">١٢</span>
                <span className="text-white/70 text-sm">تصنيف رئيسي</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2">
                <FaRocket className="text-amber-400" />
                <span className="font-bold">١٠٠٠+</span>
                <span className="text-white/70 text-sm">خدمة احترافية</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2">
                <FaUsers className="text-amber-400" />
                <span className="font-bold">٥٠٠+</span>
                <span className="text-white/70 text-sm">مقدم خدمة</span>
              </div>
            </motion.div>
          </div>

          {/* Wave decoration */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
              <path 
                fill="var(--bg-primary)" 
                fillOpacity="1" 
                d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              />
            </svg>
          </div>
        </motion.div>

        {/* Main Content with Filters on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Main Content (3 columns) */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            {/* Results Count and Sort Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6 border border-gray-100 dark:border-gray-700">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 border border-gray-200 dark:border-gray-700 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-primary-600 text-white' 
                          : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      <FaThLarge />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-primary-600 text-white' 
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
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 text-sm"
                  >
                    <option value="latest">الأحدث</option>
                    <option value="price_asc">السعر: من الأقل</option>
                    <option value="price_desc">السعر: من الأعلى</option>
                    <option value="rating">التقييم</option>
                    <option value="popularity">الأكثر طلباً</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Featured Categories - Large Cards */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaCrown className="text-primary-600" />
                تصنيفات مميزة
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={`/category/${category.id}`}>
                      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 group hover:shadow-xl transition-all hover:-translate-y-1">
                        {/* Colored Header */}
                        <div className={`h-2 bg-gradient-to-r ${category.color}`} />
                        
                        <div className="p-6">
                          <div className="flex items-start gap-4">
                            <div className={`w-16 h-16 rounded-2xl ${category.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}>
                              <div className={`text-3xl ${category.iconColor}`}>
                                {category.icon}
                              </div>
                            </div>
                            
                            <div className="flex-1">
                              <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                                {category.name}
                              </h3>
                              
                              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                                {category.description}
                              </p>
                              
                              <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1">
                                  <FaStar className="text-yellow-400" />
                                  <span className="font-medium text-gray-900 dark:text-white">{category.rating}</span>
                                </div>
                                <div className="text-gray-500">
                                  {category.services} خدمة
                                </div>
                                <div className="flex items-center gap-1 text-primary-600 font-medium mr-auto">
                                  <span>استعرض</span>
                                  <FaArrowLeft className="text-xs group-hover:translate-x-1 transition-transform" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* All Categories Section - Restructured */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaMedal className="text-primary-600" />
                جميع التصنيفات
              </h2>
              
              {/* Category Grid with Icons */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.02 }}
                  >
                    <Link to={`/category/${category.id}`}>
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all group hover:border-primary-300 dark:hover:border-primary-700">
                        <div className="flex flex-col items-center text-center">
                          <div className={`w-16 h-16 rounded-2xl ${category.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <div className={`text-3xl ${category.iconColor}`}>
                              {category.icon}
                            </div>
                          </div>
                          
                          <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                            {category.name}
                          </h3>
                          
                          <div className="flex items-center justify-center gap-3 text-xs text-gray-500 mb-3">
                            <div className="flex items-center gap-1">
                              <FaStar className="text-yellow-400 text-xs" />
                              <span>{category.rating}</span>
                            </div>
                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                            <div className="flex items-center gap-1">
                              <FaUsers className="text-xs" />
                              <span>{category.providers}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 justify-center">
                            {category.subcategories.slice(0, 2).map((sub, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full"
                              >
                                {sub}
                              </span>
                            ))}
                            {category.subcategories.length > 2 && (
                              <span className="text-xs text-primary-600">+{category.subcategories.length - 2}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Popular Services Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaFire className="text-primary-600" />
                الخدمات الأكثر طلباً
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
                    <div className="relative h-40">
                      <img 
                        src={`https://via.placeholder.com/400x200`} 
                        alt="خدمة"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-primary-600 text-white px-2 py-1 rounded-lg text-xs">
                        {item === 1 ? 'تنظيف' : item === 2 ? 'صيانة' : 'دهانات'}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-bold mb-2 line-clamp-1">
                        {item === 1 ? 'تنظيف وتعقيم مكافآت شامل' : 
                          item === 2 ? 'صيانة وتأسيس شبكات كهربائية' : 
                          'دهان داخلي وخارجي فاخر'}
                      </h3>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          <span className="font-medium">{item === 1 ? '4.6' : item === 2 ? '4.8' : '4.9'}</span>
                        </div>
                        <span className="text-lg font-bold text-primary-600">
                          {item === 1 ? '١٥٠' : item === 2 ? '٢٠٠' : '٣٠٠'} ر.س
                        </span>
                      </div>
                      
                      <Link to={`/service/${item}`}>
                        <Button variant="outline" size="sm" fullWidth>
                          عرض التفاصيل
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="mb-12">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 p-6 md:p-8 text-center text-white">
                <div className="absolute inset-0">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-600/20 rounded-full blur-3xl" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl md:text-2xl font-bold mb-3">لم تجد التصنيف المناسب؟</h2>
                  <p className="mb-4 opacity-90 max-w-2xl mx-auto text-sm md:text-base">
                    يمكنك طلب خدمة مخصصة حسب احتياجك وسنقوم بتوفير أفضل مقدمي الخدمة لك
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/contact">
                      <Button variant="primary" className="text-primary w-full sm:w-auto">
                        تواصل معنا
                      </Button>
                    </Link>
                    <Link to="/request-service">
                      <Button variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                        طلب خدمة مخصصة
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Filters */}
          <div className="lg:col-span-1 ">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium"
              >
                <FaSlidersH />
                الفلاتر
              </button>
            </div>

            {/* Filters Sidebar */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
              <div className="sticky top-24 space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
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

                  {/* Language Filter */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      اللغة
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500">
                      <option>الكل</option>
                      <option>العربية</option>
                      <option>الإنجليزية</option>
                    </select>
                  </div>

                  {/* Main Category Filter */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      التصنيف الرئيسي
                    </label>
                    <div className="space-y-2">
                      {['صيانة عامة', 'أعمال سياحية', 'الكهرباء', 'التنظيف العميق'].map((cat) => (
                        <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-600 transition-colors">
                            {cat}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Subcategories */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      التصنيفات الفرعية
                    </label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {[
                        'صيانة عامة', 'سباكة', 'كهرباء', 'دهانات',
                        'تكييف', 'نجارة', 'حدادة', 'تنظيف'
                      ].map((sub) => (
                        <label key={sub} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-600 transition-colors">
                            {sub}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      نطاق السعر
                    </label>
                    <div className="space-y-3">
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
                        <span>١٠٠٠+ ر.س</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      التقييم
                    </label>
                    <div className="space-y-2">
                      {[5, 4, 3, 2].map((rating) => (
                        <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <div className="flex items-center gap-1">
                            {[...Array(rating)].map((_, i) => (
                              <FaStar key={i} className="text-yellow-400 text-xs" />
                            ))}
                            <span className="text-sm text-gray-700 dark:text-gray-300 mr-1">فأكثر</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Provider Level */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      مستوى مقدم الخدمة
                    </label>
                    <div className="space-y-2">
                      {levels.map((level) => {
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

                  {/* Delivery Time */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      وقت التسليم
                    </label>
                    <div className="space-y-2">
                      {deliveryTimes.map((time) => {
                        const Icon = time.icon
                        return (
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
                              <Icon className="text-gray-500 text-sm" />
                              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-600 transition-colors">
                                {time.name}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">({time.count})</span>
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

                  {/* Apply Filters Button */}
                  <Button variant="primary" fullWidth className="mt-6">
                    تطبيق التصفية
                  </Button>
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
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Categories