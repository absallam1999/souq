import React from 'react'
import { motion } from 'framer-motion'
import { Link } from "react-router-dom"
import { 
  FaShieldAlt, 
  FaLock, 
  FaUserSecret, 
  FaCookie, 
  FaEnvelope, 
  FaDatabase,
  FaCheckCircle,
  FaClock,
  FaCalendarAlt,
  FaCodeBranch,
  FaEye,
  FaBan,
  FaFileContract,
  FaHeadset,
  FaQuestionCircle
} from 'react-icons/fa'
import Breadcrumb from '../../components/ui/Breadcrumb'
import Button from "../../components/ui/Button"

const Privacy = () => {
  const sections = [
    {
      icon: <FaShieldAlt />,
      title: 'المقدمة',
      content: 'نحن في سيرفس ماركت نلتزم بحماية خصوصية معلوماتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك عند استخدام منصتنا.',
      gradient: 'from-primary-500 to-secondary-600'
    },
    {
      icon: <FaDatabase />,
      title: 'المعلومات التي نجمعها',
      content: 'نقوم بجمع المعلومات التالية لتقديم أفضل خدمة لك:',
      list: [
        'معلومات التسجيل الأساسية (الاسم، البريد الإلكتروني، رقم الهاتف)',
        'معلومات الدفع والفوترة (مشفرة بالكامل)',
        'سجل التواصل والدعم الفني',
        'بيانات استخدام المنصة لتحسين تجربتك',
        'تفضيلات الخدمات التي تهمك'
      ],
      gradient: 'from-primary-500 to-secondary-600'
    },
    {
      icon: <FaEye />,
      title: 'كيف نستخدم معلوماتك',
      content: 'نستخدم معلوماتك لتقديم وتحسين خدماتنا، والتواصل معك، ومعالجة مدفوعاتك، وتخصيص تجربتك.',
      list: [
        'تقديم الخدمات المطلوبة بكفاءة عالية',
        'تحسين تجربة المستخدم وتطوير المنصة',
        'إرسال تحديثات وعروض حصرية (بموافقتك)',
        'تحليل أداء المنصة وقياس رضا العملاء',
        'حماية حسابك ومنع الاحتيال'
      ],
      gradient: 'from-primary-500 to-secondary-600'
    },
    {
      icon: <FaLock />,
      title: 'حماية المعلومات',
      content: 'نستخدم أحدث تقنيات التشفير وحماية البيانات لضمان أمان معلوماتك. جميع المعاملات المالية مشفرة باستخدام SSL.',
      features: [
        'تشفير SSL 256-bit لجميع البيانات',
        'خوادم آمنة ومحمية بجدران نارية',
        'نسخ احتياطي منتظم للبيانات',
        'صلاحيات وصول محدودة للموظفين'
      ],
      gradient: 'from-primary-500 to-secondary-600'
    },
    {
      icon: <FaCookie />,
      title: 'ملفات تعريف الارتباط',
      content: 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتذكر تفضيلاتك. يمكنك التحكم في إعدادات cookies من متصفحك.',
      note: 'يمكنك تعطيل ملفات تعريف الارتباط في أي وقت من إعدادات المتصفح، لكن قد يؤثر ذلك على بعض وظائف المنصة.',
      gradient: 'from-primary-500 to-secondary-600'
    },
    {
      icon: <FaEnvelope />,
      title: 'التواصل معنا',
      content: 'للاستفسارات المتعلقة بالخصوصية، فريق الدعم متاح على مدار الساعة:',
      contact: {
        email: 'privacy@servicemarket.com',
        phone: '+966 123 456 789',
        hours: '٢٤/٧',
        response: 'خلال ٢٤ ساعة'
      },
      gradient: 'from-primary-500 to-secondary-600'
    }
  ]

  const highlights = [
    {
      icon: <FaBan className="text-2xl" />,
      title: 'لا نبيع بياناتك',
      description: 'نحن لا نبيع أو نؤجر معلوماتك الشخصية لأي طرف ثالث',
      color: 'text-green-600',
      bg: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      icon: <FaUserSecret className="text-2xl" />,
      title: 'خصوصية تامة',
      description: 'جميع معلوماتك الشخصية تبقى خاصة وآمنة',
      color: 'text-primary-600',
      bg: 'bg-primary-100 dark:bg-primary-900/30'
    },
    {
      icon: <FaEye className="text-2xl" />,
      title: 'شفافية كاملة',
      description: 'نوضح بالتفصيل كيف نستخدم بياناتك',
      color: 'text-amber-600',
      bg: 'bg-amber-100 dark:bg-amber-900/30'
    }
  ]

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <div className="py-8 md:py-12 animate-fade-in">
      <div className="container-custom">
        <Breadcrumb 
          items={[
            { label: 'الرئيسية', path: '/' },
            { label: 'سياسة الخصوصية', path: '/privacy' }
          ]}
        />

        {/* Hero Section with Premium Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-16 overflow-hidden rounded-3xl"
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

          <div className="relative z-10 text-center text-white py-20 px-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="w-24 h-24 mx-auto mb-6 bg-white/10 backdrop-blur rounded-3xl flex items-center justify-center border-2 border-white/20"
            >
              <FaShieldAlt className="text-5xl" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              سياسة الخصوصية
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl max-w-2xl mx-auto opacity-90 mb-8"
            >
              خصوصية بياناتك هي أولويتنا القصوى. تعرف على كيفية جمع وحماية معلوماتك.
            </motion.p>

            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-6"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2">
                <FaClock className="text-amber-400" />
                <span>آخر تحديث: ١٥ فبراير ٢٠٢٤</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2">
                <FaCodeBranch className="text-amber-400" />
                <span>الإصدار: ٣.٠.١</span>
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

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >

          {/* Highlights Section */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color.replace('text-', 'from-')} opacity-0 group-hover:opacity-5 transition-opacity`} />
                
                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  {item.icon}
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Privacy Sections */}
          <motion.div variants={itemVariants} className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden"
              >
                {/* Header with gradient */}
                <div className={`bg-gradient-to-r ${section.gradient} p-6`}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-white text-2xl">
                      {section.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                      {index === 0 && (
                        <p className="text-white/80 text-sm mt-1">نظرة عامة على سياسة الخصوصية</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {section.content}
                  </p>
                  
                  {section.list && (
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mb-4">
                      <ul className="space-y-3">
                        {section.list.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <FaCheckCircle className="text-green-500 text-lg mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {section.features && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {section.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                          <FaLock className="text-primary-600 text-sm" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.note && (
                    <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                      <p className="text-sm text-amber-800 dark:text-amber-400 flex items-start gap-2">
                        <FaEye className="mt-0.5 flex-shrink-0" />
                        {section.note}
                      </p>
                    </div>
                  )}

                  {section.contact && (
                    <div className="mt-6 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white">
                            <FaEnvelope />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">البريد الإلكتروني</div>
                            <div className="font-medium text-sm">{section.contact.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-secondary-600 rounded-xl flex items-center justify-center text-white">
                            <FaHeadset />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">رقم الدعم</div>
                            <div className="font-medium text-sm" dir="ltr">{section.contact.phone}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white">
                            <FaClock />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">وقت الرد</div>
                            <div className="font-medium text-sm">{section.contact.response}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Agreement Section */}
          <motion.div
            variants={itemVariants}
            className="mt-8"
          >
            <div className="relative bg-gradient-to-br from-primary-600 to-secondary-600 rounded-3xl p-8 text-white overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 text-center max-w-2xl mx-auto">
                <FaShieldAlt className="text-6xl opacity-50 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">موافقتك على سياسة الخصوصية</h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  باستخدامك لمنصة سيرفس ماركت، أنت توافق على جمع واستخدام معلوماتك وفقاً 
                  لسياسة الخصوصية هذه. نحن نضمن لك الشفافية الكاملة في التعامل مع بياناتك.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to="/terms">
                    <Button variant="outline" className="border-white text-white hover:bg-white/20">
                      <FaFileContract className="ml-2" />
                      الاطلاع على الشروط
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" className="border-white text-white hover:bg-white/20">
                      <FaQuestionCircle className="ml-2" />
                      لديك استفسار؟
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Last Updated Note */}
          <motion.div
            variants={itemVariants}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500 dark:text-gray-500">
              آخر تحديث لسياسة الخصوصية: ١٥ فبراير ٢٠٢٤. 
              نحن نحتفظ بالحق في تحديث هذه السياسة من وقت لآخر، وسنقوم بإشعارك بأي تغييرات جوهرية.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Privacy