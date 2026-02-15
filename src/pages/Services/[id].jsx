import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar,
  FaClock,
  FaUser,
  FaShieldAlt,
  FaShare,
  FaHeart,
  FaFlag,
  FaCheck,
  FaWhatsapp,
  FaUserTie,
  FaChevronRight,
  FaRegClock,
  FaRegCalendar,
  FaRegHeart,
  FaRegShareSquare,
  FaCheckCircle,
  FaExclamationCircle,
  FaAward,
  FaRibbon,
  FaMedal,
  FaTrophy,
  FaCamera,
  FaVideo,
  FaFileAlt,
  FaDownload,
  FaRegFilePdf,
  FaRegImage,
  FaRegFileArchive,
  FaChevronLeft,
  FaArrowRight,
  FaRegUser,
  FaBriefcase,
  FaRocket
} from "react-icons/fa";
import { MdVerified, MdOutlineDeliveryDining, MdSecurity, MdEmail } from "react-icons/md";
import { RiTeamLine, RiCustomerServiceLine, RiShieldStarLine } from "react-icons/ri";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi";
import { BsShieldCheck, BsPersonCheck, BsPhone } from "react-icons/bs";
import ServiceCard from "../../components/Common/ServiceCard";
import Button from "../../components/ui/Button";

const Service = () => {
  const [selectedPackage, setSelectedPackage] = useState("standard");
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("packages");

  const service = {
    id: 1,
    title: "هوية بصرية متكاملة للشركات الناشئة",
    provider: {
      name: "أحمد محمد",
      avatar: "https://via.placeholder.com/100x100",
      level: "خبير معتمد",
      rating: 4.9,
      reviewsCount: 124,
      completed: 350,
      joined: "٢٠٢٠",
      verified: true,
      responseRate: 98,
      responseTime: "خلال ساعة"
    },
    rating: 4.9,
    reviewsCount: 124,
    price: 250,
    images: [
      "https://via.placeholder.com/800x400",
      "https://via.placeholder.com/800x400",
      "https://via.placeholder.com/800x400",
      "https://via.placeholder.com/800x400"
    ],
    category: "هوية بصرية",
    deliveryTime: "٣ أيام",
    description: `تصميم هوية بصرية متكاملة لشركتك الناشئة تساعدك على التميز وجذب العملاء المناسبين.`,
    longDescription: `أقدم لك خدمة تصميم هوية بصرية متكاملة تساعدك على بناء علامة تجارية قوية ومتميزة. 
    
    مع خبرة تزيد عن ٧ سنوات في مجال التصميم، سأساعدك على خلق انطباع أول لا يُنسى لعملائك من خلال تصميم احترافي يعكس شخصية وقيم علامتك التجارية.
    
    الخدمة تشمل:
    • شعار احترافي (٣ مفاهيم مختلفة)
    • دليل الهوية البصرية الكامل
    • بطاقات عمل
    • ورق رسمي وأظرف
    • ملفات مصدرية قابلة للتعديل
    • دليل استخدام الهوية
    • حقائب تسويقية رقمية`,
    packages: {
      basic: {
        name: "الباقة الأساسية",
        price: 250,
        delivery: "٣ أيام",
        revisions: 4,
        features: [
          "شعار احترافي (٣ مفاهيم)",
          "دليل ألوان كامل",
          "ملفات مصدرية",
          "تعديلان مجانيان",
          "تسليم سريع"
        ],
        popular: false,
        savings: 0
      },
      standard: {
        name: "الباقة المتقدمة",
        price: 450,
        delivery: "٥ أيام",
        revisions: 8,
        features: [
          "كل ما في الباقة الأساسية",
          "هوية متكاملة (٨ عناصر)",
          "بطاقات عمل (تصميمين)",
          "٤ تعديلات مجانية",
          "دليل استخدام الهوية",
          "حقائب تسويقية رقمية"
        ],
        popular: true,
        savings: 100
      },
      premium: {
        name: "الباقة الاحترافية",
        price: 750,
        delivery: "٧ أيام",
        revisions: "غير محدود",
        features: [
          "كل ما في الباقة المتقدمة",
          "استراتيجية العلامة التجارية",
          "مواد تسويقية متكاملة",
          "تعديلات غير محدودة",
          "دعم لمدة شهر",
          "جلسة استشارية (ساعة)"
        ],
        popular: false,
        savings: 250
      },
    },
    requirements: [
      { id: 1, text: "وصف الشركة ورؤيتها", required: true, icon: FaFileAlt },
      { id: 2, text: "الألوان المفضلة (إن وجدت)", required: false, icon: FaRegImage },
      { id: 3, text: "أمثلة على تصاميم مشابهة", required: true, icon: FaCamera },
      { id: 4, text: "شعارات سابقة (إن وجدت)", required: false, icon: FaRegFileArchive },
    ],
    faqs: [
      {
        question: "كم مرة يمكنني طلب التعديلات؟",
        answer: "يمكنك طلب التعديلات حسب الباقة التي تختارها. جميع التعديلات مجانية ضمن العدد المحدد."
      },
      {
        question: "هل أحصل على الملفات المصدرية؟",
        answer: "نعم، جميع الباقات تتضمن الملفات المصدرية القابلة للتعديل (Ai, PSD, EPS)."
      },
      {
        question: "ماذا لو لم يعجبني التصميم؟",
        answer: "نحن نضمن رضاك التام. إذا لم يعجبك التصميم، سنقوم بتعديله حتى ترضى تماماً."
      }
    ],
    reviews: [
      {
        id: 1,
        user: "سارة المتصور",
        avatar: "https://via.placeholder.com/50x50",
        rating: 5,
        date: "١٥ فبراير ٢٠٢٤",
        comment: "عمل رائع وسهل جداً! أسلوب فني ومحترف. استلمت الهوية قبل الموعد وبجودة فوق التوقعات.",
        helpful: 12
      },
      {
        id: 2,
        user: "خالد بن علي",
        avatar: "https://via.placeholder.com/50x50",
        rating: 5,
        date: "١٠ فبراير ٢٠٢٤",
        comment: "تواصل سهل جداً وفهم طلبي من المرة الأولى. الشعار جاد وقوي في نفس الوقت.",
        helpful: 8
      },
    ],
    relatedServices: [
      {
        id: 2,
        title: "تصميم شعار احترافي",
        provider: "سارة أحمد",
        rating: 4.8,
        reviews: 98,
        price: 180,
        image: "https://via.placeholder.com/300x200",
      },
      {
        id: 3,
        title: "دليل الهوية البصرية",
        provider: "خالد العلي",
        rating: 5.0,
        reviews: 56,
        price: 320,
        image: "https://via.placeholder.com/300x200",
      },
    ],
    stats: {
      views: 1234,
      saved: 89,
      shared: 45
    }
  };

  const tabs = [
    { id: "packages", label: "الباقات", icon: FaRibbon },
    { id: "description", label: "الوصف", icon: FaFileAlt },
    { id: "requirements", label: "المتطلبات", icon: FaCheckCircle },
    { id: "faqs", label: "الأسئلة الشائعة", icon: FaRegCalendar },
    { id: "reviews", label: "التقييمات", icon: FaStar }
  ];

  const getPackageIcon = (key) => {
    switch(key) {
      case 'basic': return FaRegFileArchive;
      case 'standard': return FaAward;
      case 'premium': return FaTrophy;
      default: return FaRibbon;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back to Services */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors group bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
            <span>العودة إلى الخدمات</span>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <motion.div variants={itemVariants} className="relative group overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-800 shadow-xl">
              <img
                src={service.images[selectedImage]}
                alt={service.title}
                className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Action Buttons */}
              <div className="absolute top-4 left-4 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className="p-3 bg-white/90 backdrop-blur rounded-full hover:bg-white shadow-lg transition-all"
                >
                  <FaRegHeart className={`text-xl ${isLiked ? 'text-red-500 fill-current' : 'text-gray-700'}`} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white/90 backdrop-blur rounded-full hover:bg-white shadow-lg transition-all"
                >
                  <FaRegShareSquare className="text-xl text-gray-700" />
                </motion.button>
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium">
                {selectedImage + 1} / {service.images.length}
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 right-4">
                <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  {service.category}
                </span>
              </div>
            </motion.div>

            {/* Thumbnails */}
            <motion.div variants={itemVariants} className="grid grid-cols-4 gap-3">
              {service.images.map((img, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`relative rounded-xl overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-primary-600 shadow-lg' : ''
                  }`}
                >
                  <img
                    src={img}
                    alt={`${service.title} ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                  {selectedImage === index && (
                    <div className="absolute inset-0 bg-primary-600/20" />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Service Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Title */}
            <motion.h1 variants={itemVariants} className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              {service.title}
            </motion.h1>

            {/* Provider Info */}
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={service.provider.avatar}
                  alt={service.provider.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary-200"
                />
                {service.provider.verified && (
                  <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center border-2 border-white">
                    <MdVerified className="text-white text-xs" />
                  </div>
                )}
              </div>
              <div>
                <Link to={`/provider/${service.id}`} className="font-bold text-lg text-gray-900 dark:text-white hover:text-primary-600 transition-colors">
                  {service.provider.name}
                </Link>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <FaUserTie className="text-primary-600" />
                  <span>{service.provider.level}</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full" />
                  <span>عضوية منذ {service.provider.joined}</span>
                </div>
              </div>
            </motion.div>

            {/* Rating & Stats */}
            <motion.div variants={itemVariants} className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400 text-xl" />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{service.rating}</span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">
                  ({service.reviewsCount} تقييم)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MdSecurity className="text-green-500 text-xl" />
                <span className="text-gray-700 dark:text-gray-300">هوية موثقة</span>
              </div>
            </motion.div>

            {/* Quick Stats Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 py-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="text-2xl font-bold text-primary-600">{service.provider.completed}+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">خدمة منجزة</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="text-2xl font-bold text-primary-600">{service.provider.responseRate}%</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">نسبة الاستجابة</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="text-2xl font-bold text-primary-600">{service.deliveryTime}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">وقت التسليم</div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p variants={itemVariants} className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {service.description}
            </motion.p>

            {/* Price & Actions */}
            <motion.div variants={itemVariants} className="flex items-center justify-between pt-4">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">تبدأ الأسعار من</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary-600">{service.price}</span>
                  <span className="text-gray-500 dark:text-gray-400">ريال</span>
                </div>
              </div>
              <div className="flex gap-3">
                <motion.a
                  href={`https://wa.me/?text=${service.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors shadow-lg hover:shadow-xl"
                >
                  <FaWhatsapp className="text-xl" />
                </motion.a>
                <Link to={`/booking?service=${service.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="primary" size="lg" className="px-8 py-4 text-lg font-medium rounded-xl shadow-lg">
                      احجز الآن
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-2 rounded-full shadow-sm">
                <FaShieldAlt className="text-green-500" />
                <span>ضمان استرداد الأموال</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-2 rounded-full shadow-sm">
                <MdOutlineDeliveryDining className="text-primary-600" />
                <span>تسليم سريع</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-2 rounded-full shadow-sm">
                <RiCustomerServiceLine className="text-primary-600" />
                <span>دعم 24/7</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Tabs Navigation */}
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex-1 px-6 py-4 text-sm font-medium rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Icon className="text-lg" />
                    {tab.label}
                  </div>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
          >
            {/* Packages Tab */}
            {activeTab === "packages" && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  اختر الباقة المناسبة
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {Object.entries(service.packages).map(([key, pkg], index) => {
                    const PackageIcon = getPackageIcon(key)
                    const isSelected = selectedPackage === key
                    
                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative cursor-pointer rounded-2xl border-2 transition-all ${
                          isSelected
                            ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 shadow-xl'
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 hover:shadow-lg'
                        }`}
                        onClick={() => setSelectedPackage(key)}
                      >
                        {pkg.popular && (
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap shadow-lg">
                            الأكثر طلباً
                          </div>
                        )}
                        
                        <div className="p-6">
                          {/* Package Header */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                              <PackageIcon className="text-2xl text-primary-600" />
                            </div>
                            {pkg.savings > 0 && (
                              <span className="bg-green-100 dark:bg-green-900/30 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                                وفر {pkg.savings} ر.س
                              </span>
                            )}
                          </div>

                          {/* Package Name & Price */}
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {pkg.name}
                          </h3>
                          <div className="flex items-baseline gap-1 mb-4">
                            <span className="text-3xl font-bold text-primary-600">{pkg.price}</span>
                            <span className="text-gray-500 dark:text-gray-400">ريال</span>
                          </div>

                          {/* Package Details */}
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <FaRegClock className="text-primary-600" />
                              <span>التسليم: {pkg.delivery}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <FaStar className="text-primary-600" />
                              <span>التعديلات: {pkg.revisions}</span>
                            </div>
                          </div>

                          {/* Features */}
                          <ul className="space-y-3 mb-6">
                            {pkg.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Select Button */}
                          <button
                            className={`w-full py-3 rounded-xl font-medium transition-all ${
                              isSelected
                                ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg'
                                : 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                            }`}
                          >
                            {isSelected ? 'الباقة المختارة' : 'اختر الباقة'}
                          </button>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Package Comparison Note */}
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                  <div className="flex gap-3">
                    <FaExclamationCircle className="text-blue-500 text-xl flex-shrink-0" />
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      يمكنك ترقية الباقة في أي وقت قبل بدء العمل. الفرق في السعر يتم احتسابه تلقائياً.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Description Tab */}
            {activeTab === "description" && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  وصف الخدمة
                </h2>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  {service.longDescription.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* What's Included */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    ماذا ستحصل؟
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.packages[selectedPackage]?.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="mt-8 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    معلومات التسليم
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-6">
                    <div className="text-center">
                      <FaRegClock className="text-3xl text-primary-600 mx-auto mb-2" />
                      <div className="font-medium">وقت التسليم</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{service.deliveryTime}</div>
                    </div>
                    <div className="text-center">
                      <FaDownload className="text-3xl text-primary-600 mx-auto mb-2" />
                      <div className="font-medium">طريقة التسليم</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">تحميل مباشر</div>
                    </div>
                    <div className="text-center">
                      <FaRegFilePdf className="text-3xl text-primary-600 mx-auto mb-2" />
                      <div className="font-medium">صيغ الملفات</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">AI, PSD, PDF, JPG</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Requirements Tab */}
            {activeTab === "requirements" && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  متطلبات الخدمة
                </h2>
                
                <p className="text-gray-600 dark:text-gray-400">
                  قبل بدء العمل، يرجى تجهيز المتطلبات التالية:
                </p>

                <div className="space-y-4">
                  {service.requirements.map((req, index) => {
                    const Icon = req.icon
                    return (
                      <motion.div
                        key={req.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                      >
                        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="text-xl text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                            {req.text}
                            {req.required && <span className="text-red-500 mr-1">*</span>}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {req.required ? 'مطلوب لبدء العمل' : 'اختياري - يمكن إضافته لاحقاً'}
                          </p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Info Box */}
                <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800">
                  <div className="flex gap-3">
                    <FaFlag className="text-amber-600 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium text-amber-800 dark:text-amber-400 mb-1">
                        بعد إتمام الحجز
                      </h4>
                      <p className="text-sm text-amber-700 dark:text-amber-300">
                        يمكنك إرسال الملفات والمتطلبات مباشرة لمقدم الخدمة من خلال صفحة المحادثة المخصصة.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FAQs Tab */}
            {activeTab === "faqs" && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  الأسئلة الشائعة
                </h2>
                
                <div className="space-y-4">
                  {service.faqs?.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0"
                    >
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {faq.question}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Contact Support */}
                <div className="mt-6 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl text-center">
                  <RiCustomerServiceLine className="text-4xl text-primary-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    لم تجد إجابة لسؤالك؟
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    فريق الدعم متاح للإجابة على جميع استفساراتك
                  </p>
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
                    تواصل مع الدعم
                  </button>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  تقييمات العملاء
                </h2>

                {/* Rating Summary */}
                <div className="grid md:grid-cols-2 gap-6 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-primary-600 mb-2">
                      {service.rating}
                    </div>
                    <div className="flex justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < Math.floor(service.rating) ? 'text-yellow-400 text-xl' : 'text-gray-300 text-xl'}
                        />
                      ))}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      بناء على {service.reviewsCount} تقييم
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="text-sm w-12">{rating} نجوم</span>
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 rounded-full"
                            style={{ width: `${Math.random() * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-500 w-12">
                          {Math.floor(Math.random() * 100)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {service.reviews.map((review) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={review.avatar}
                          alt={review.user}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {review.user}
                              </h4>
                              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                <div className="flex gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <FaStar
                                      key={i}
                                      className={i < review.rating ? 'text-yellow-400 text-xs' : 'text-gray-300 text-xs'}
                                    />
                                  ))}
                                </div>
                                <span>•</span>
                                <span>{review.date}</span>
                              </div>
                            </div>
                            <button className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
                              مفيد ({review.helpful})
                            </button>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Show More Button */}
                <div className="text-center">
                  <Button variant="outline" size="lg" className="px-8 py-3">
                    عرض جميع التقييمات ({service.reviewsCount})
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Provider Info Section */}
        <motion.section 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mt-12"
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                معلومات مقدم الخدمة
              </h2>
              <Link 
                to={`/provider/${service.id}`}
                className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-2 group"
              >
                <span>عرض الملف الشخصي</span>
                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <FaUserTie className="text-xl text-primary-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">الأعضاء منذ</div>
                  <div className="font-medium">{service.provider.joined}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <FaCheck className="text-xl text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">الخدمات المنجزة</div>
                  <div className="font-medium">{service.provider.completed}+</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                  <FaRegClock className="text-xl text-amber-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">متوسط الرد</div>
                  <div className="font-medium">{service.provider.responseTime}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <RiShieldStarLine className="text-xl text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">نسبة الاستجابة</div>
                  <div className="font-medium">{service.provider.responseRate}%</div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Related Services */}
        <motion.section 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            خدمات مشابهة قد تهمك
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.relatedServices.map((related) => (
              <ServiceCard key={related.id} service={related} />
            ))}
          </div>
        </motion.section>

        {/* Decorative Elements */}
        <div className="absolute -z-10 top-20 right-20 w-64 h-64 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-3xl" />
        <div className="absolute -z-10 bottom-20 left-20 w-64 h-64 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default Service;