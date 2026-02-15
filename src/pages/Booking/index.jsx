import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaCalendar, FaClock, FaUser, FaStar, FaCheck,
  FaShieldAlt, FaArrowLeft, FaArrowRight,
  FaRegClock, FaRegCalendar, FaMapMarkerAlt, FaPhone,
  FaEnvelope, FaExclamationCircle, FaFileAlt,
  FaPlus, FaRegFile, FaRegCreditCard, FaRegUser,
  FaInfoCircle, FaCheckCircle, FaTimesCircle, FaGift,
  FaPercent, FaWallet, FaRegHeart, FaShare, FaFlag,
  FaChevronLeft
} from 'react-icons/fa'
import { MdVerified, MdOutlineDeliveryDining } from 'react-icons/md'
import { RiTeamLine, RiCustomerServiceLine } from 'react-icons/ri'

const Booking = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const serviceId = searchParams.get('service')

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    serviceId: serviceId || '',
    package: 'basic',
    date: null,
    time: '',
    requirements: '',
    contactInfo: {
      name: '',
      email: '',
      phone: '',
      alternativePhone: ''
    },
    address: {
      city: '',
      district: '',
      street: '',
      building: '',
      landmark: ''
    },
    additionalServices: [],
    notes: '',
    agreeTerms: false,
    newsletter: false
  })
  const [errors, setErrors] = useState({})
  const [showRequirementsModal, setShowRequirementsModal] = useState(false)
  const [availableTimes, setAvailableTimes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [dragActive, setDragActive] = useState(false)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)

  // Mock service data (would come from API)
  const serviceData = {
    id: 1,
    title: 'هوية بصرية متكاملة للشركات الناشئة',
    description: 'تصميم هوية بصرية احترافية تعكس شخصية علامتك التجارية وتجذب عملاءك المثاليين',
    provider: {
      name: 'أحمد محمد',
      avatar: 'https://via.placeholder.com/50x50',
      rating: 4.9,
      reviews: 124,
      level: 'خبير معتمد',
      completed: 356,
      responseTime: 'خلال ساعة',
      verified: true
    },
    price: 250,
    category: 'تصميم جرافيك',
    packages: {
      basic: {
        name: 'الباقة الأساسية',
        price: 250,
        delivery: '٣ أيام',
        revisions: 2,
        features: [
          'شعار احترافي (٣ مفاهيم)',
          'دليل ألوان',
          'ملفات مصدرية',
          'تسليم سريع'
        ],
        popular: false
      },
      standard: {
        name: 'الباقة المتقدمة',
        price: 450,
        delivery: '٥ أيام',
        revisions: 4,
        features: [
          'كل ما في الباقة الأساسية',
          'هوية متكاملة (٥ عناصر)',
          'بطاقات عمل',
          'دليل استخدام',
          'حقائب تسويقية'
        ],
        popular: true
      },
      premium: {
        name: 'الباقة الاحترافية',
        price: 750,
        delivery: '٧ أيام',
        revisions: 8,
        features: [
          'كل ما في الباقة المتقدمة',
          'استراتيجية العلامة التجارية',
          'مواد تسويقية متكاملة',
          'دعم لمدة شهر',
          'جلسة استشارية'
        ],
        popular: false
      }
    },
    requirements: [
      { id: 1, text: 'وصف الشركة ورؤيتها', required: true },
      { id: 2, text: 'الألوان المفضلة (إن وجدت)', required: false },
      { id: 3, text: 'أمثلة على تصاميم مشابهة', required: true },
      { id: 4, text: 'شعارات سابقة (إن وجدت)', required: false },
      { id: 5, text: 'الجمهور المستهدف', required: true },
      { id: 6, text: 'المنافسين الرئيسيين', required: false }
    ],
    images: [
      'https://via.placeholder.com/800x400',
      'https://via.placeholder.com/800x400'
    ],
    stats: {
      views: 1234,
      saved: 89,
      shared: 45
    }
  }

  const additionalServicesList = [
    { 
      id: 1, 
      name: 'تسليم عاجل (٢٤ ساعة)', 
      price: 100, 
      icon: <FaRegClock />,
      description: 'استلم خدمتك خلال ٢٤ ساعة بدلاً من المدة الطبيعية'
    },
    { 
      id: 2, 
      name: 'تعديلات إضافية (٣ تعديلات)', 
      price: 75, 
      icon: <FaPlus />,
      description: 'احصل على ٣ تعديلات إضافية على التصميم النهائي'
    },
    { 
      id: 3, 
      name: 'ملفات مصدرية إضافية', 
      price: 50, 
      icon: <FaRegFile />,
      description: 'استلام جميع الملفات المصدرية بصيغ مختلفة'
    },
    { 
      id: 4, 
      name: 'ضمان لمدة شهر', 
      price: 150, 
      icon: <FaShieldAlt />,
      description: 'ضمان لمدة شهر على الخدمة مع دعم فوري'
    }
  ]

  const cities = [
    { id: 1, name: 'الرياض', regions: ['المركز', 'الشمال', 'الشرق', 'الغرب', 'الجنوب'] },
    { id: 2, name: 'جدة', regions: ['الشمال', 'الجنوب', 'الشرق', 'الغرب', 'الوسط'] },
    { id: 3, name: 'مكة المكرمة', regions: ['العزيزية', 'الشرائع', 'النوارية', 'الكعكية'] },
    { id: 4, name: 'المدينة المنورة', regions: ['المركز', 'قباء', 'العوالي', 'بني خدرة'] },
    { id: 5, name: 'الدمام', regions: ['الخليج', 'البديعة', 'الناصرية', 'الجامعيين'] }
  ]

  const timeSlots = [
    { time: '٠٩:٠٠ صباحاً', available: true },
    { time: '١٠:٠٠ صباحاً', available: true },
    { time: '١١:٠٠ صباحاً', available: false },
    { time: '١٢:٠٠ ظهراً', available: true },
    { time: '٠١:٠٠ مساءً', available: true },
    { time: '٠٢:٠٠ مساءً', available: false },
    { time: '٠٣:٠٠ مساءً', available: true },
    { time: '٠٤:٠٠ مساءً', available: true },
    { time: '٠٥:٠٠ مساءً', available: true }
  ]

  // Generate available times based on selected date
  useEffect(() => {
    if (formData.date) {
      // Simulate fetching available times
      setAvailableTimes(timeSlots.filter(slot => slot.available))
    }
  }, [formData.date])

  const validateStep = (step) => {
    const newErrors = {}

    switch (step) {
      case 1:
        if (!formData.serviceId) {
          newErrors.serviceId = 'يرجى اختيار الخدمة'
        }
        if (!formData.package) {
          newErrors.package = 'يرجى اختيار الباقة'
        }
        break

      case 2:
        if (!formData.date) {
          newErrors.date = 'يرجى اختيار التاريخ'
        }
        if (!formData.time) {
          newErrors.time = 'يرجى اختيار الوقت'
        }
        break

      case 3:
        if (!formData.requirements.trim()) {
          newErrors.requirements = 'يرجى إدخال متطلبات الخدمة'
        }
        break

      case 4:
        if (!formData.contactInfo.name) {
          newErrors['contactInfo.name'] = 'الاسم مطلوب'
        }
        if (!formData.contactInfo.email) {
          newErrors['contactInfo.email'] = 'البريد الإلكتروني مطلوب'
        } else if (!/\S+@\S+\.\S+/.test(formData.contactInfo.email)) {
          newErrors['contactInfo.email'] = 'البريد الإلكتروني غير صحيح'
        }
        if (!formData.contactInfo.phone) {
          newErrors['contactInfo.phone'] = 'رقم الجوال مطلوب'
        } else if (!/^05\d{8}$/.test(formData.contactInfo.phone)) {
          newErrors['contactInfo.phone'] = 'رقم الجوال غير صحيح'
        }
        break

      case 5:
        if (!formData.agreeTerms) {
          newErrors.agreeTerms = 'يجب الموافقة على الشروط والأحكام'
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 6))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async () => {
    if (validateStep(5)) {
      setIsLoading(true)
      setShowSuccessAnimation(true)
      
      try {
        await new Promise(resolve => setTimeout(resolve, 2000))
        navigate('/checkout')
      } catch (error) {
        console.error('Booking failed:', error)
        setShowSuccessAnimation(false)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const calculateTotal = () => {
    let total = serviceData.packages[formData.package]?.price || 0
    formData.additionalServices.forEach(id => {
      const service = additionalServicesList.find(s => s.id === id)
      if (service) total += service.price
    })
    return total
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFiles = (files) => {
    const newFiles = Array.from(files).map(file => ({
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      uploaded: false
    }))
    setUploadedFiles([...uploadedFiles, ...newFiles])
    
    // Simulate upload progress
    newFiles.forEach((_, index) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setUploadedFiles(prev => 
          prev.map((f, i) => 
            i === uploadedFiles.length + index 
              ? { ...f, progress, uploaded: progress >= 100 }
              : f
          )
        )
        if (progress >= 100) clearInterval(interval)
      }, 200)
    })
  }

  const steps = [
    { number: 1, name: 'اختر الباقة', icon: <FaRegCreditCard />, description: 'اختر الباقة المناسبة لك' },
    { number: 2, name: 'التاريخ والوقت', icon: <FaRegCalendar />, description: 'حدد موعد تنفيذ الخدمة' },
    { number: 3, name: 'المتطلبات', icon: <FaFileAlt />, description: 'أخبرنا بمتطلباتك' },
    { number: 4, name: 'معلومات التواصل', icon: <FaRegUser />, description: 'أكمل بياناتك للتواصل' },
    { number: 5, name: 'المراجعة', icon: <FaCheckCircle />, description: 'راجع بيانات الحجز' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      {/* Success Animation Overlay */}
      <AnimatePresence>
        {showSuccessAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center max-w-md mx-4"
            >
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-4xl text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">تم تأكيد الحجز!</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                جاري تحويلك إلى صفحة الدفع الآمن...
              </p>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2 }}
                  className="h-full bg-gradient-to-l from-primary-600 to-primary-400"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        {/* Header with breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Link to="/" className="text-gray-900 dark:text-white font-medium hover:text-primary-600">الرئيسية</Link>
                  <FaChevronLeft className="text-gray-400 mx-2 text-xs" />

            <Link to="/services" className="text-gray-900 dark:text-white font-medium hover:text-primary-600">الخدمات</Link>
              <FaChevronLeft className="text-gray-400 mx-2 text-xs" />

            <Link to={`/service/${serviceId}`} className="text-gray-900 dark:text-white font-medium hover:text-primary-600">{serviceData.title}</Link>
              <FaChevronLeft className="text-gray-400 mx-2 text-xs" />

            <span className="text-gray-900 dark:text-white font-medium">حجز الخدمة</span>
          </div>

          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-l from-primary-600 to-primary-400 bg-clip-text text-transparent">
              حجز الخدمة
            </h1>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <FaRegHeart />
              </button>
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <FaShare />
              </button>
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <FaFlag />
              </button>
            </div>
          </div>
        </div>

        {/* Service Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
            <div className="text-2xl font-bold text-primary-600">{serviceData.stats.views}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">مشاهدة</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
            <div className="text-2xl font-bold text-primary-600">{serviceData.stats.saved}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">تم الحفظ</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
            <div className="text-2xl font-bold text-primary-600">{serviceData.stats.shared}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">مشاركة</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Booking Form */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex justify-between relative">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex-1 text-center relative z-10">
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{ 
                        scale: step.number === currentStep ? 1.1 : 1,
                        backgroundColor: step.number < currentStep ? '#3b82f6' : 
                                      step.number === currentStep ? '#3b82f6' : '#e5e7eb'
                      }}
                      className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-white font-bold mb-2 shadow-lg ${
                        step.number < currentStep 
                          ? 'bg-primary-600'
                          : step.number === currentStep
                          ? 'bg-primary-600 ring-4 ring-primary-200 dark:ring-primary-900'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      {step.number < currentStep ? <FaCheck /> : step.number}
                    </motion.div>
                    <span className="text-sm font-medium hidden md:block">{step.name}</span>
                    <span className="text-xs text-gray-500 hidden md:block">{step.description}</span>
                    
                    {/* Progress Line */}
                    {index < steps.length - 1 && (
                      <div className={`absolute top-6 right-[60%] w-[70%] h-1 ${
                        step.number < currentStep 
                          ? 'bg-primary-600' 
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`} style={{ right: '60%', width: '70%' }} />
                    )}
                  </div>
                ))}
              </div>
              
              {/* Mobile step indicator */}
              <div className="md:hidden text-center mt-4">
                <span className="text-sm text-gray-500">الخطوة {currentStep} من {steps.length}</span>
                <h2 className="font-bold text-lg mt-1">{steps[currentStep - 1].name}</h2>
                <p className="text-sm text-gray-500">{steps[currentStep - 1].description}</p>
              </div>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
              >
                {/* Step 1: Service & Package */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                        <FaRegCreditCard className="text-primary-600" />
                      </div>
                      <h2 className="text-2xl font-bold">اختر الباقة المناسبة</h2>
                    </div>
                    
                    {/* Service Summary Card */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl p-4 border border-primary-200 dark:border-primary-800"
                    >
                      <div className="flex gap-4">
                        <img 
                          src={serviceData.images[0]} 
                          alt={serviceData.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">{serviceData.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {serviceData.description}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <div className="flex items-center gap-1">
                              <FaUser className="text-gray-400" />
                              <span>{serviceData.provider.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaStar className="text-yellow-400" />
                              <span>{serviceData.provider.rating}</span>
                              <span className="text-gray-500">({serviceData.provider.reviews})</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Packages */}
                    <div className="space-y-4">
                      {Object.entries(serviceData.packages).map(([key, pkg], index) => (
                        <motion.label
                          key={key}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`
                            block relative overflow-hidden cursor-pointer
                            border-2 rounded-xl transition-all duration-300
                            ${formData.package === key
                              ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 shadow-lg'
                              : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 hover:shadow-md'
                            }
                          `}
                        >
                          {pkg.popular && (
                            <div className="absolute top-0 left-0 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-1 rounded-bl-xl rounded-tr-xl text-sm font-medium flex items-center gap-1">
                              <FaGift className="text-xs" />
                              الأكثر طلباً
                            </div>
                          )}
                          
                          <input
                            type="radio"
                            name="package"
                            value={key}
                            checked={formData.package === key}
                            onChange={(e) => setFormData({...formData, package: e.target.value})}
                            className="hidden"
                          />
                          
                          <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h4 className="text-xl font-bold mb-1">{pkg.name}</h4>
                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                  <span className="flex items-center gap-1">
                                    <MdOutlineDeliveryDining />
                                    {pkg.delivery}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <FaPlus />
                                    {pkg.revisions} تعديلات
                                  </span>
                                </div>
                              </div>
                              <div className="text-left">
                                <div className="text-3xl font-bold text-primary-600">
                                  {pkg.price} <span className="text-sm font-normal text-gray-500">ر.س</span>
                                </div>
                              </div>
                            </div>
                            
                            <ul className="space-y-2">
                              {pkg.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm">
                                  <FaCheckCircle className="text-green-500 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.label>
                      ))}
                    </div>
                    
                    {errors.package && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500 flex items-center gap-1"
                      >
                        <FaExclamationCircle />
                        {errors.package}
                      </motion.p>
                    )}
                  </div>
                )}

                {/* Step 2: Date & Time */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                        <FaRegCalendar className="text-primary-600" />
                      </div>
                      <h2 className="text-2xl font-bold">اختر التاريخ والوقت</h2>
                    </div>
                    
                    {/* Date Picker */}
                    <div>
                      <label className="block text-sm font-medium mb-2">التاريخ</label>
                      <div className="relative">
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                        />
                        <FaCalendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                      {errors.date && (
                        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                          <FaExclamationCircle />
                          {errors.date}
                        </p>
                      )}
                    </div>

                    {/* Time Slots */}
                    {formData.date && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                      >
                        <label className="block text-sm font-medium mb-3">الوقت المتاح</label>
                        <div className="grid grid-cols-3 gap-3">
                          {timeSlots.map((slot, index) => (
                            <motion.button
                              key={slot.time}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              onClick={() => slot.available && setFormData({...formData, time: slot.time})}
                              disabled={!slot.available}
                              className={`
                                relative p-3 rounded-xl border-2 text-center transition-all
                                ${!slot.available && 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800'}
                                ${formData.time === slot.time
                                  ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-600 ring-2 ring-primary-200'
                                  : slot.available
                                  ? 'border-gray-200 dark:border-gray-700 hover:border-primary-300 hover:shadow-md'
                                  : 'border-gray-200 dark:border-gray-700'
                                }
                              `}
                            >
                              <FaClock className="mx-auto mb-1" />
                              <span className="text-sm">{slot.time}</span>
                              {!slot.available && (
                                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                  <FaTimesCircle className="text-white text-xs" />
                                </span>
                              )}
                            </motion.button>
                          ))}
                        </div>
                        
                        {errors.time && (
                          <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                            <FaExclamationCircle />
                            {errors.time}
                          </p>
                        )}
                      </motion.div>
                    )}

                    {/* Timezone Info */}
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                      <div className="flex items-start gap-3">
                        <FaInfoCircle className="text-blue-500 text-xl flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-1">معلومات التوقيت</h4>
                          <p className="text-sm text-blue-600 dark:text-blue-300">
                            جميع الأوقات بتوقيت المملكة العربية السعودية (الرياض)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Requirements */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                        <FaFileAlt className="text-primary-600" />
                      </div>
                      <h2 className="text-2xl font-bold">متطلبات الخدمة</h2>
                    </div>
                    
                    {/* Requirements Checklist */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <FaCheckCircle className="text-primary-600" />
                        المتطلبات الموصى بها:
                      </h3>
                      <div className="space-y-2">
                        {serviceData.requirements.map((req) => (
                          <div key={req.id} className="flex items-start gap-2 text-sm">
                            {req.required ? (
                              <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                            ) : (
                              <FaPlus className="text-gray-400 mt-0.5 flex-shrink-0" />
                            )}
                            <span className={req.required ? 'font-medium' : 'text-gray-600 dark:text-gray-400'}>
                              {req.text}
                              {req.required && <span className="text-red-500 mr-1">*</span>}
                            </span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => setShowRequirementsModal(true)}
                        className="mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1"
                      >
                        <FaInfoCircle />
                        عرض نموذج المتطلبات التفصيلي
                      </button>
                    </div>

                    {/* Requirements Input */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        اكتب متطلباتك بالتفصيل
                        <span className="text-red-500 mr-1">*</span>
                      </label>
                      <textarea
                        value={formData.requirements}
                        onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                        rows="6"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                        placeholder="اكتب هنا متطلبات الخدمة بالتفصيل..."
                      />
                      {errors.requirements && (
                        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                          <FaExclamationCircle />
                          {errors.requirements}
                        </p>
                      )}
                    </div>

                    {/* File Upload */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        إرفاق ملفات (اختياري)
                      </label>
                      <div
                        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                          dragActive
                            ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        <input
                          type="file"
                          multiple
                          className="hidden"
                          id="file-upload"
                          onChange={(e) => handleFiles(e.target.files)}
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <div className="text-4xl mb-3 text-primary-600">
                            <FaUpload className="mx-auto" />
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-1">
                            اسحب الملفات هنا أو <span className="text-primary-600 font-medium">اضغط للرفع</span>
                          </p>
                          <p className="text-xs text-gray-500">الحد الأقصى: ٢٠ ميجابايت • صيغ مدعومة: PDF, JPG, PNG, ZIP</p>
                        </label>
                      </div>

                      {/* Uploaded Files */}
                      {uploadedFiles.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <FaRegFile className="text-primary-600" />
                                <div>
                                  <p className="text-sm font-medium">{file.name}</p>
                                  <p className="text-xs text-gray-500">
                                    {(file.size / 1024).toFixed(1)} KB
                                  </p>
                                </div>
                              </div>
                              {file.uploaded ? (
                                <FaCheckCircle className="text-green-500" />
                              ) : (
                                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${file.progress}%` }}
                                    className="h-full bg-primary-600"
                                  />
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 4: Contact Info */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                        <FaRegUser className="text-primary-600" />
                      </div>
                      <h2 className="text-2xl font-bold">معلومات التواصل</h2>
                    </div>
                    
                    <div className="grid gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          الاسم كامل
                          <span className="text-red-500 mr-1">*</span>
                        </label>
                        <div className="relative">
                          <FaUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            value={formData.contactInfo.name}
                            onChange={(e) => setFormData({
                              ...formData,
                              contactInfo: {...formData.contactInfo, name: e.target.value}
                            })}
                            placeholder="أدخل اسمك الكامل"
                            className="w-full pr-12 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                          />
                        </div>
                        {errors['contactInfo.name'] && (
                          <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                            <FaExclamationCircle />
                            {errors['contactInfo.name']}
                          </p>
                        )}
                      </div>

                      {/* Email & Phone */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            البريد الإلكتروني
                            <span className="text-red-500 mr-1">*</span>
                          </label>
                          <div className="relative">
                            <FaEnvelope className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="email"
                              value={formData.contactInfo.email}
                              onChange={(e) => setFormData({
                                ...formData,
                                contactInfo: {...formData.contactInfo, email: e.target.value}
                              })}
                              placeholder="example@domain.com"
                              className="w-full pr-12 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                            />
                          </div>
                          {errors['contactInfo.email'] && (
                            <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                              <FaExclamationCircle />
                              {errors['contactInfo.email']}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            رقم الجوال
                            <span className="text-red-500 mr-1">*</span>
                          </label>
                          <div className="relative">
                            <FaPhone className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="tel"
                              value={formData.contactInfo.phone}
                              onChange={(e) => setFormData({
                                ...formData,
                                contactInfo: {...formData.contactInfo, phone: e.target.value}
                              })}
                              placeholder="05XXXXXXXX"
                              className="w-full pr-12 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                            />
                          </div>
                          {errors['contactInfo.phone'] && (
                            <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                              <FaExclamationCircle />
                              {errors['contactInfo.phone']}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Alternative Phone */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          رقم جوال بديل (اختياري)
                        </label>
                        <div className="relative">
                          <FaPhone className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            value={formData.contactInfo.alternativePhone}
                            onChange={(e) => setFormData({
                              ...formData,
                              contactInfo: {...formData.contactInfo, alternativePhone: e.target.value}
                            })}
                            placeholder="05XXXXXXXX"
                            className="w-full pr-12 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                          />
                        </div>
                      </div>

                      {/* Location Section */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          <FaMapMarkerAlt className="text-primary-600" />
                          الموقع (للخدمات الحضورية)
                        </h3>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">المدينة</label>
                            <select
                              value={formData.address.city}
                              onChange={(e) => setFormData({
                                ...formData,
                                address: {...formData.address, city: e.target.value}
                              })}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                            >
                              <option value="">اختر المدينة</option>
                              {cities.map(city => (
                                <option key={city.id} value={city.name}>{city.name}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">الحي</label>
                            <input
                              type="text"
                              value={formData.address.district}
                              onChange={(e) => setFormData({
                                ...formData,
                                address: {...formData.address, district: e.target.value}
                              })}
                              placeholder="اسم الحي"
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">الشارع</label>
                            <input
                              type="text"
                              value={formData.address.street}
                              onChange={(e) => setFormData({
                                ...formData,
                                address: {...formData.address, street: e.target.value}
                              })}
                              placeholder="اسم الشارع"
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">رقم المبنى</label>
                            <input
                              type="text"
                              value={formData.address.building}
                              onChange={(e) => setFormData({
                                ...formData,
                                address: {...formData.address, building: e.target.value}
                              })}
                              placeholder="رقم المبنى"
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Additional Notes */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          ملاحظات إضافية (اختياري)
                        </label>
                        <textarea
                          value={formData.notes}
                          onChange={(e) => setFormData({...formData, notes: e.target.value})}
                          rows="3"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                          placeholder="أي ملاحظات إضافية لمقدم الخدمة..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Review & Confirm */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                        <FaCheckCircle className="text-primary-600" />
                      </div>
                      <h2 className="text-2xl font-bold">مراجعة وتأكيد الحجز</h2>
                    </div>
                    
                    {/* Service Summary */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl p-4"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-lg">{serviceData.title}</h3>
                        <div className="flex items-center gap-1">
                          <MdVerified className="text-blue-500" />
                          <span className="text-xs text-blue-600">مقدم خدمة موثوق</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <FaUser className="text-gray-400" />
                          <span>{serviceData.provider.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaStar className="text-yellow-400" />
                          <span>{serviceData.provider.rating}</span>
                          <span className="text-gray-500">({serviceData.provider.reviews})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaRegClock className="text-gray-400" />
                          <span>{serviceData.provider.responseTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <RiTeamLine className="text-gray-400" />
                          <span>{serviceData.provider.completed}+ خدمة</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Booking Details */}
                    <div className="grid grid-cols-2 gap-4">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4"
                      >
                        <div className="text-sm text-gray-500 mb-1">الباقة المختارة</div>
                        <div className="font-bold text-lg">{serviceData.packages[formData.package]?.name}</div>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          <span>{serviceData.packages[formData.package]?.delivery}</span>
                          <span>•</span>
                          <span>{serviceData.packages[formData.package]?.revisions} تعديلات</span>
                        </div>
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4"
                      >
                        <div className="text-sm text-gray-500 mb-1">التاريخ والوقت</div>
                        <div className="font-bold">{formData.date}</div>
                        <div className="text-sm text-gray-600 mt-1">{formData.time}</div>
                      </motion.div>
                    </div>

                    {/* Contact Info Summary */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4"
                    >
                      <h3 className="font-semibold mb-3">معلومات التواصل</h3>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-500">الاسم:</span>
                          <span className="mr-2">{formData.contactInfo.name}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">البريد:</span>
                          <span className="mr-2">{formData.contactInfo.email}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">الجوال:</span>
                          <span className="mr-2">{formData.contactInfo.phone}</span>
                        </div>
                        {formData.address.city && (
                          <div>
                            <span className="text-gray-500">الموقع:</span>
                            <span className="mr-2">{formData.address.city}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>

                    {/* Requirements Summary */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4"
                    >
                      <h3 className="font-semibold mb-2">متطلبات الخدمة</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                        {formData.requirements || 'لم يتم إدخال متطلبات'}
                      </p>
                    </motion.div>

                    {/* Price Summary */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4"
                    >
                      <h3 className="font-semibold mb-3">تفاصيل السعر</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>قيمة الخدمة</span>
                          <span className="font-medium">{serviceData.packages[formData.package]?.price} ر.س</span>
                        </div>
                        {formData.additionalServices.map(id => {
                          const service = additionalServicesList.find(s => s.id === id)
                          return service && (
                            <div key={id} className="flex justify-between text-gray-600">
                              <span>{service.name}</span>
                              <span>+ {service.price} ر.س</span>
                            </div>
                          )
                        })}
                        <div className="border-t border-gray-300 dark:border-gray-600 pt-2 mt-2">
                          <div className="flex justify-between font-bold text-lg">
                            <span>الإجمالي</span>
                            <span className="text-primary-600">{calculateTotal()} ر.س</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Terms Agreement */}
                    <label className="flex items-start gap-3 cursor-pointer p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <input
                        type="checkbox"
                        checked={formData.agreeTerms}
                        onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                        className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        أوافق على{' '}
                        <Link to="/terms" className="text-primary-600 hover:text-primary-700 font-medium">
                          الشروط والأحكام
                        </Link>
                        {' '}و{' '}
                        <Link to="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
                          سياسة الخصوصية
                        </Link>
                      </span>
                    </label>
                    {errors.agreeTerms && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <FaExclamationCircle />
                        {errors.agreeTerms}
                      </p>
                    )}

                    {/* Newsletter */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.newsletter}
                        onChange={(e) => setFormData({...formData, newsletter: e.target.checked})}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        أرغب في استلام العروض والتحديثات عبر البريد الإلكتروني
                      </span>
                    </label>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  {currentStep > 1 && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePrevStep}
                      className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <FaArrowRight />
                      السابق
                    </motion.button>
                  )}
                  
                  {currentStep < steps.length ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNextStep}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white rounded-xl shadow-lg mr-auto"
                    >
                      التالي
                      <FaArrowLeft />
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-xl shadow-lg mr-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          جاري التأكيد...
                        </>
                      ) : (
                        <>
                          تأكيد الحجز
                          <FaCheck />
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Summary Card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FaWallet className="text-primary-600" />
                  ملخص الحجز
                </h3>

                {/* Selected Package */}
                <div className="bg-gradient-to-l from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-sm text-gray-500">الباقة المختارة</div>
                      <div className="font-bold text-lg">{serviceData.packages[formData.package]?.name}</div>
                    </div>
                    <div className="text-2xl font-bold text-primary-600">
                      {serviceData.packages[formData.package]?.price}
                      <span className="text-sm font-normal text-gray-500 mr-1">ر.س</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <MdOutlineDeliveryDining />
                      {serviceData.packages[formData.package]?.delivery}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <FaPlus />
                      {serviceData.packages[formData.package]?.revisions} تعديلات
                    </span>
                  </div>
                </div>

                {/* Additional Services */}
                <div className="mb-4">
                  <h4 className="font-medium mb-3">خدمات إضافية</h4>
                  <div className="space-y-2">
                    {additionalServicesList.map(service => (
                      <label
                        key={service.id}
                        className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.additionalServices.includes(service.id)
                            ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.additionalServices.includes(service.id)}
                            onChange={(e) => {
                              const newServices = e.target.checked
                                ? [...formData.additionalServices, service.id]
                                : formData.additionalServices.filter(id => id !== service.id)
                              setFormData({...formData, additionalServices: newServices})
                            }}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <div>
                            <span className="text-sm font-medium flex items-center gap-1">
                              {service.icon}
                              {service.name}
                            </span>
                            <p className="text-xs text-gray-500">{service.description}</p>
                          </div>
                        </div>
                        <span className="text-sm text-primary-600 font-medium">+{service.price} ر.س</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Selected Date/Time */}
                {(formData.date || formData.time) && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4">
                    <h4 className="font-medium mb-2">التاريخ والوقت</h4>
                    {formData.date && (
                      <div className="flex items-center gap-2 text-sm mb-1">
                        <FaRegCalendar className="text-gray-400" />
                        <span>{formData.date}</span>
                      </div>
                    )}
                    {formData.time && (
                      <div className="flex items-center gap-2 text-sm">
                        <FaRegClock className="text-gray-400" />
                        <span>{formData.time}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>قيمة الخدمة</span>
                    <span className="font-medium">{serviceData.packages[formData.package]?.price} ر.س</span>
                  </div>
                  {formData.additionalServices.map(id => {
                    const service = additionalServicesList.find(s => s.id === id)
                    return service && (
                      <div key={id} className="flex justify-between text-sm text-gray-600">
                        <span>{service.name}</span>
                        <span>+ {service.price} ر.س</span>
                      </div>
                    )
                  })}
                  <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-2 mt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>الإجمالي</span>
                      <span className="text-primary-600">{calculateTotal()} ر.س</span>
                    </div>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium">
                    <FaPercent />
                    هل لديك كود خصم؟
                  </button>
                </div>
              </motion.div>

              {/* Provider Info */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
              >
                <h4 className="font-semibold mb-4">مقدم الخدمة</h4>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={serviceData.provider.avatar} 
                      alt={serviceData.provider.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary-200"
                    />
                    {serviceData.provider.verified && (
                      <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                        <MdVerified className="text-white text-xs" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-lg">{serviceData.provider.name}</div>
                    <div className="flex items-center gap-1 text-sm">
                      <FaStar className="text-yellow-400" />
                      <span className="font-medium">{serviceData.provider.rating}</span>
                      <span className="text-gray-500">({serviceData.provider.reviews} تقييم)</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <span>{serviceData.provider.completed}+ خدمة</span>
                      <span>{serviceData.provider.responseTime}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Trust Badges */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-green-100 dark:border-green-900/30"
              >
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <FaShieldAlt className="text-green-600" />
                  حماية وأمان
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <FaCheckCircle className="text-green-500" />
                    <span>معلوماتك مشفرة بتقنية SSL</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FaCheckCircle className="text-green-500" />
                    <span>ضمان استرداد الأموال</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FaCheckCircle className="text-green-500" />
                    <span>دعم فني على مدار الساعة</span>
                  </div>
                </div>
              </motion.div>

              {/* Support Card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 text-center"
              >
                <RiCustomerServiceLine className="text-3xl text-primary-600 mx-auto mb-2" />
                <h4 className="font-medium mb-1">تحتاج مساعدة؟</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  فريق الدعم متاح لمساعدتك على مدار الساعة
                </p>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  تواصل مع الدعم
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Requirements Template Modal */}
      <AnimatePresence>
        {showRequirementsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowRequirementsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">نموذج متطلبات الخدمة</h3>
                  <button
                    onClick={() => setShowRequirementsModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimesCircle className="text-2xl" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-400">
                      هذا نموذج إرشادي للمتطلبات. يمكنك تعديله حسب احتياجك الخاص.
                    </p>
                  </div>

                  {serviceData.requirements.map((req, index) => (
                    <motion.div
                      key={req.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-r-4 border-primary-600 pr-4"
                    >
                      <h4 className="font-semibold mb-2">{req.text}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {req.required ? 'مطلوب' : 'اختياري'} - {getRequirementDescription(req.id)}
                      </p>
                    </motion.div>
                  ))}

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => {
                        setShowRequirementsModal(false)
                        // Auto-fill requirements template
                        const template = serviceData.requirements
                          .map(r => r.text)
                          .join('\n')
                        setFormData({...formData, requirements: template})
                      }}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-medium transition-colors"
                    >
                      استخدام هذا النموذج
                    </button>
                    <button
                      onClick={() => setShowRequirementsModal(false)}
                      className="flex-1 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 rounded-xl font-medium transition-colors"
                    >
                      إغلاق
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Helper function for requirement descriptions
const getRequirementDescription = (id) => {
  const descriptions = {
    1: 'قدم وصفاً مفصلاً لشركتك، رؤيتها، رسالتها، والقيم التي تمثلها',
    2: 'حدد الألوان المفضلة لديك مع ذكر سبب اختيارها (إن وجد)',
    3: 'أرفق أمثلة على تصاميم مشابهة تعجبك لتوضيح الاتجاه المطلوب',
    4: 'إذا كان لديك شعار سابق، يرجى إرفاقه للاستفادة منه',
    5: 'صف بالتفصيل الفئة المستهدفة من خدماتك أو منتجاتك',
    6: 'اذكر أهم المنافسين في مجالك لدراسة السوق'
  }
  return descriptions[id] || ''
}

export default Booking