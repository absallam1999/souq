import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from "react-router-dom"
import { 
  FaQuestionCircle, FaBook, FaVideo, FaHeadset, 
  FaFileAlt, FaSearch, FaStar, FaUsers, FaRocket,
  FaShieldAlt, FaCreditCard, FaUserCog, FaArrowRight,
  FaChevronLeft, FaRegClock, FaRegEye, FaDownload,
  FaPlay, FaRegFilePdf, FaRegFileAlt
} from 'react-icons/fa'
import { MdVerified, MdSecurity, MdOutlineDeliveryDining } from 'react-icons/md'
import { RiCustomerServiceLine, RiShieldStarLine } from 'react-icons/ri'
import { HiOutlineMail, HiOutlineUser } from 'react-icons/hi'
import { BsShieldCheck, BsPersonCheck } from 'react-icons/bs'
import Breadcrumb from '../../components/ui/Breadcrumb'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Tabs from '../../components/ui/Tabs'
import Accordion from '../../components/ui/Accordion'

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const faqCategories = [
    {
      id: 'general',
      label: 'عام',
      icon: <FaQuestionCircle />,
      count: 3,
      questions: [
        {
          q: 'ما هي منصة سيرفس هب؟',
          a: 'منصة متكاملة تقدم خدمات الهوية البصرية والحجوزات المهنية للشركات الناشئة والأفراد. نربطك بأفضل مقدمي الخدمات الموثوقين في المملكة.'
        },
        {
          q: 'كيف يمكنني إنشاء حساب؟',
          a: 'يمكنك التسجيل مجاناً باستخدام البريد الإلكتروني أو رقم الجوال، ثم تفعيل حسابك عبر رمز التحقق المرسل إلى بريدك أو جوالك.'
        },
        {
          q: 'هل المنصة مجانية؟',
          a: 'التسجيل في المنصة مجاني بالكامل، وتختلف رسوم الخدمات حسب مقدم الخدمة ونوع الخدمة المطلوبة.'
        }
      ]
    },
    {
      id: 'services',
      label: 'الخدمات',
      icon: <FaRocket />,
      count: 3,
      questions: [
        {
          q: 'كيف أطلب خدمة؟',
          a: 'تصفح الخدمات في التصنيف المناسب، اختر الخدمة التي تناسبك، حدد الباقة والموعد المناسب، ثم أكمل عملية الدفع الآمنة.'
        },
        {
          q: 'كم تستغرق مدة تنفيذ الخدمة؟',
          a: 'تختلف المدة حسب نوع الخدمة وتعقيدها، وتظهر مدة التنفيذ في صفحة تفاصيل كل خدمة. يمكنك أيضاً مناقشة الموعد مع مقدم الخدمة.'
        },
        {
          q: 'هل يمكنني تعديل طلبي بعد التأكيد؟',
          a: 'نعم، يمكنك التواصل مع مقدم الخدمة خلال ٢٤ ساعة من الحجز لتعديل الطلب. بعد ذلك، قد تخضع التعديلات لسياسة مقدم الخدمة.'
        }
      ]
    },
    {
      id: 'payment',
      label: 'المدفوعات',
      icon: <FaCreditCard />,
      count: 3,
      questions: [
        {
          q: 'ما هي طرق الدفع المتاحة؟',
          a: 'نوفر عدة طرق دفع آمنة: بطاقات ائتمان (فيزا، ماستركارد)، مدى، Apple Pay، وتحويل بنكي للحجوزات الكبيرة.'
        },
        {
          q: 'كيف أسترد أموالي؟',
          a: 'سياسة الاسترداد تعتمد على وقت الإلغاء. يمكنك إلغاء الحجز خلال ٢٤ ساعة لاسترداد كامل المبلغ. راجع الشروط في صفحة المساعدة.'
        },
        {
          q: 'هل المدفوعات آمنة؟',
          a: 'نعم، جميع المدفوعات مشفرة عبر تقنية SSL ومتوافقة مع معايير PCI العالمية. نحن نستخدم بوابات دفع موثوقة.'
        }
      ]
    },
    {
      id: 'account',
      label: 'الحساب',
      icon: <FaUserCog />,
      count: 3,
      questions: [
        {
          q: 'كيف أغير كلمة المرور؟',
          a: 'من إعدادات الحساب، اختر "تغيير كلمة المرور" وأدخل كلمة المرور الحالية ثم الجديدة. سيتم تحديث كلمة المرور فوراً.'
        },
        {
          q: 'نسيت كلمة المرور؟',
          a: 'استخدم خيار "نسيت كلمة المرور" في صفحة تسجيل الدخول. سنرسل لك رابط إعادة تعيين كلمة المرور على بريدك الإلكتروني.'
        },
        {
          q: 'كيف أحذف حسابي؟',
          a: 'تواصل مع الدعم الفني لطلب حذف الحساب نهائياً. سيتم حذف جميع بياناتك خلال ١٤ يوماً من تاريخ الطلب.'
        }
      ]
    }
  ]

  const resources = [
    {
      title: 'دليل المستخدم الشامل',
      description: 'شرح مفصل لكيفية استخدام المنصة خطوة بخطوة',
      icon: <FaBook />,
      type: 'PDF',
      size: '٢.٥ ميجابايت',
      pages: 45,
      link: '#',
      downloads: '١.٢ك'
    },
    {
      title: 'فيديوهات تعليمية',
      description: 'شروحات مصورة لجميع الخدمات والميزات',
      icon: <FaVideo />,
      type: 'Video',
      duration: '١٥ دقيقة',
      videos: 8,
      link: '#',
      views: '٥.٦ك'
    },
    {
      title: 'دليل البدء السريع',
      description: 'للبدء مع المنصة في ٥ دقائق فقط',
      icon: <FaRocket />,
      type: 'PDF',
      size: '١ ميجابايت',
      pages: 12,
      link: '#',
      downloads: '٣.٤ك'
    },
    {
      title: 'سياسة الخصوصية',
      description: 'كيف نحمي بياناتك ومعلوماتك الشخصية',
      icon: <FaShieldAlt />,
      type: 'Article',
      readTime: '٣ دقائق',
      link: '/privacy',
      updated: 'يناير ٢٠٢٤'
    },
    {
      title: 'الشروط والأحكام',
      description: 'اتفاقية استخدام المنصة وحقوقك وواجباتك',
      icon: <FaFileAlt />,
      type: 'Article',
      readTime: '٥ دقائق',
      link: '/terms',
      updated: 'يناير ٢٠٢٤'
    },
    {
      title: 'سياسة الاسترداد',
      description: 'شروط وأحكام استرداد المبالغ المالية',
      icon: <FaCreditCard />,
      type: 'Article',
      readTime: '٤ دقائق',
      link: '/refund',
      updated: 'يناير ٢٠٢٤'
    }
  ]

  const tutorials = [
    {
      id: 1,
      title: 'كيف تنشئ هوية بصرية ناجحة لعلامتك التجارية',
      author: 'أحمد محمد',
      authorAvatar: 'https://via.placeholder.com/40x40',
      views: '١.٢ك',
      duration: '١٠:٢٥',
      thumbnail: 'https://via.placeholder.com/300x200',
      level: 'مبتدئ',
      rating: 4.8
    },
    {
      id: 2,
      title: 'دليل اختيار الألوان للعلامات التجارية الناشئة',
      author: 'سارة أحمد',
      authorAvatar: 'https://via.placeholder.com/40x40',
      views: '٨٥٠',
      duration: '١٥:٣٠',
      thumbnail: 'https://via.placeholder.com/300x200',
      level: 'متوسط',
      rating: 4.9
    },
    {
      id: 3,
      title: 'استراتيجيات التسويق الرقمي للشركات الناشئة',
      author: 'خالد العلي',
      authorAvatar: 'https://via.placeholder.com/40x40',
      views: '٢.١ك',
      duration: '٢٠:١٥',
      thumbnail: 'https://via.placeholder.com/300x200',
      level: 'متقدم',
      rating: 5.0
    },
    {
      id: 4,
      title: 'كيف تختار مقدم الخدمة المناسب لمشروعك',
      author: 'نورة سعد',
      authorAvatar: 'https://via.placeholder.com/40x40',
      views: '٦٥٠',
      duration: '١٢:٤٠',
      thumbnail: 'https://via.placeholder.com/300x200',
      level: 'مبتدئ',
      rating: 4.7
    }
  ]

  const faqAccordionItems = faqCategories.flatMap(category =>
    category.questions.map((item, index) => ({
      id: `${category.id}-${index}`,
      title: (
        <div className="flex items-center gap-3">
          <span className="text-primary-600 text-xl">{category.icon}</span>
          <span className="font-medium text-gray-900 dark:text-white">{item.q}</span>
        </div>
      ),
      content: (
        <div className="pr-12 text-gray-600 dark:text-gray-400 leading-relaxed">
          {item.a}
        </div>
      )
    }))
  )

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
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">
              الرئيسية
            </Link>
            <FaChevronLeft className="text-gray-400 text-xs" />
            <span className="text-gray-900 dark:text-white font-medium">المساعدة</span>
          </div>
        </motion.div>

        {/* Hero Section with Search */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 to-primary-800 shadow-2xl"
        >
          {/* Decorative Elements */}
          <div className="absolute inset-0">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 text-white py-16 px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaHeadset className="text-4xl" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">كيف يمكننا مساعدتك؟</h1>
              <p className="text-xl mb-8 opacity-90">
                ابحث في مقالات المساعدة أو تصفح الأسئلة الشائعة
              </p>
              
              <div className="relative max-w-2xl mx-auto">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن إجابة..."
                  icon={<FaSearch />}
                  className="bg-white/10 border-white/20 text-white placeholder-white/70 focus:bg-white/20 py-4 text-lg"
                />
              </div>

              {/* Popular Searches */}
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                <span className="text-sm text-white/70">الأكثر بحثاً:</span>
                {['حساب جديد', 'طرق الدفع', 'إلغاء حجز', 'استرداد مالي'].map((term, index) => (
                  <button
                    key={index}
                    className="px-3 py-1 bg-white/10 backdrop-blur rounded-full text-sm hover:bg-white/20 transition-colors"
                  >
                    {term}
                  </button>
                ))}
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
            </div>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { icon: <FaQuestionCircle />, label: 'أسئلة شائعة', link: '#faq', count: 12 },
            { icon: <FaBook />, label: 'أدلة المستخدم', link: '#resources', count: 6 },
            { icon: <FaVideo />, label: 'فيديوهات', link: '#tutorials', count: 8 },
            { icon: <FaHeadset />, label: 'اتصل بالدعم', link: '/contact', count: '24/7' }
          ].map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 group"
            >
              <div className="text-3xl text-primary-600 mb-3 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="font-bold text-gray-900 dark:text-white mb-1">{item.label}</div>
              <div className="text-sm text-gray-500">{item.count}</div>
            </motion.a>
          ))}
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700"
        >
          <Tabs
            tabs={[
              {
                id: 'faq',
                label: 'الأسئلة الشائعة',
                icon: <FaQuestionCircle />,
                content: (
                  <div className="space-y-8">
                    {/* FAQ Categories */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {faqCategories.map((cat, index) => (
                        <motion.a
                          key={cat.id}
                          href={`#${cat.id}`}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="p-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all group"
                        >
                          <div className="text-2xl text-primary-600 mb-2 group-hover:scale-110 transition-transform">
                            {cat.icon}
                          </div>
                          <div className="font-medium text-gray-900 dark:text-white">{cat.label}</div>
                          <div className="text-xs text-gray-500 mt-1">{cat.count} أسئلة</div>
                        </motion.a>
                      ))}
                    </div>

                    {/* FAQ Accordion */}
                    <div className="space-y-4">
                      {faqCategories.map((category) => (
                        <div key={category.id} className="space-y-3">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            {category.icon}
                            {category.label}
                          </h3>
                          <Accordion 
                            items={category.questions.map((item, idx) => ({
                              id: `${category.id}-${idx}`,
                              title: item.q,
                              content: <p className="text-gray-600 dark:text-gray-400 pr-6">{item.a}</p>
                            }))} 
                            allowMultiple={true}
                            className="border-2 border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Still Need Help */}
                    <motion.div 
                      variants={itemVariants}
                      className="text-center p-8 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl border border-primary-200 dark:border-primary-800"
                    >
                      <div className="w-16 h-16 bg-primary-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <RiCustomerServiceLine className="text-3xl text-primary-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">لم تجد إجابتك؟</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                        فريق الدعم متاح للمساعدة على مدار الساعة طوال أيام الأسبوع
                      </p>
                      <Link to="/contact">
                        <Button variant="primary" size="lg" className="px-8">
                          تواصل معنا
                          <FaArrowRight className="mr-2" />
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                )
              },
              {
                id: 'resources',
                label: 'الموارد',
                icon: <FaBook />,
                content: (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {resources.map((resource, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all cursor-pointer group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center text-2xl text-primary-600 group-hover:scale-110 transition-transform">
                            {resource.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                              {resource.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {resource.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-3 text-xs">
                              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-400">
                                {resource.type}
                              </span>
                              {resource.size && (
                                <>
                                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                  <span className="text-gray-500">{resource.size}</span>
                                </>
                              )}
                              {resource.duration && (
                                <>
                                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                  <span className="text-gray-500">{resource.duration}</span>
                                </>
                              )}
                              {resource.readTime && (
                                <>
                                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                  <span className="text-gray-500">{resource.readTime} قراءة</span>
                                </>
                              )}
                              {resource.downloads && (
                                <>
                                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                  <span className="flex items-center gap-1 text-gray-500">
                                    <FaDownload className="text-xs" />
                                    {resource.downloads}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )
              },
              {
                id: 'tutorials',
                label: 'دروس تعليمية',
                icon: <FaVideo />,
                content: (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tutorials.map((tutorial, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all group"
                      >
                        <div className="relative h-40 overflow-hidden">
                          <img 
                            src={tutorial.thumbnail} 
                            alt={tutorial.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
                            <FaPlay className="text-xs" />
                            <span>{tutorial.duration}</span>
                          </div>
                          <div className="absolute top-2 right-2 px-2 py-1 bg-amber-500 text-white rounded-lg text-xs font-medium">
                            {tutorial.level}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-sm mb-2 line-clamp-2 text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                            {tutorial.title}
                          </h3>
                          <div className="flex items-center gap-2 mb-3">
                            <img 
                              src={tutorial.authorAvatar} 
                              alt={tutorial.author}
                              className="w-5 h-5 rounded-full"
                            />
                            <span className="text-xs text-gray-600 dark:text-gray-400">{tutorial.author}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1">
                              <FaRegEye className="text-gray-400" />
                              <span className="text-gray-500">{tutorial.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaStar className="text-yellow-400" />
                              <span className="text-gray-700 dark:text-gray-300">{tutorial.rating}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )
              }
            ]}
          />
        </motion.div>

        {/* Still Need Help Section */}
        <motion.section
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: <RiCustomerServiceLine className="text-3xl" />,
              title: 'الدعم المباشر',
              description: 'تحدث مع فريق الدعم مباشرة',
              action: 'محادثة فورية',
              link: '/chat'
            },
            {
              icon: <HiOutlineMail className="text-3xl" />,
              title: 'البريد الإلكتروني',
              description: 'راسلنا على البريد الإلكتروني',
              action: 'support@servicehub.com',
              link: 'mailto:support@servicehub.com'
            },
            {
              icon: <FaHeadset className="text-3xl" />,
              title: 'الدعم الهاتفي',
              description: 'اتصل بنا على الرقم الموحد',
              action: '٩٢٠٠٠١٢٣٤',
              link: 'tel:920001234'
            }
          ].map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center mx-auto mb-4 text-primary-600 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{item.description}</p>
              <span className="text-primary-600 font-medium text-sm">{item.action}</span>
            </motion.a>
          ))}
        </motion.section>

        {/* Trust Badges */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: <MdSecurity className="text-2xl" />, label: 'دعم على مدار الساعة', sub: '24/7' },
            { icon: <BsShieldCheck className="text-2xl" />, label: 'معلومات مشفرة', sub: 'SSL Secure' },
            { icon: <RiShieldStarLine className="text-2xl" />, label: 'ضمان الاسترداد', sub: 'خلال 24 ساعة' },
            { icon: <MdVerified className="text-2xl" />, label: 'خدمات موثقة', sub: 'مقدمي معتمدين' }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-100 dark:border-gray-700"
            >
              <div className="text-primary-600 mb-2">{item.icon}</div>
              <div className="font-medium text-sm text-gray-900 dark:text-white">{item.label}</div>
              <div className="text-xs text-gray-500">{item.sub}</div>
            </div>
          ))}
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute -z-10 top-60 right-20 w-64 h-64 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-3xl" />
        <div className="absolute -z-10 bottom-60 left-20 w-64 h-64 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-3xl" />
      </div>
    </div>
  )
}

export default Help