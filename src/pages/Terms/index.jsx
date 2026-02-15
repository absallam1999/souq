import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from "react-router-dom"
import { 
  FaGavel, 
  FaFileContract, 
  FaUserCheck, 
  FaMoneyBill, 
  FaExclamationTriangle, 
  FaHandshake,
  FaShieldAlt,
  FaClock,
  FaCalendarAlt,
  FaCodeBranch,
  FaCheckCircle,
  FaQuestionCircle,
  FaHeadset
} from 'react-icons/fa'
import Breadcrumb from '../../components/ui/Breadcrumb'
import Accordion from '../../components/ui/Accordion'
import Button from "../../components/ui/Button"

const Terms = () => {
  const [activeSection, setActiveSection] = useState(null)
  const [agreed, setAgreed] = useState(false)

  const termsSections = [
    {
      id: 1,
      title: 'المقدمة والموافقة',
      icon: <FaFileContract />,
      content: `
        باستخدام منصة سيرفس ماركت، أنت توافق على الالتزام بهذه الشروط والأحكام. 
        إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام منصتنا.
      `,
      gradient: 'from-primary-600 to-primary-500'
    },
    {
      id: 2,
      title: 'شروط التسجيل',
      icon: <FaUserCheck />,
      content: `
        للتسجيل في المنصة، يجب أن:
        • تكون فوق 18 سنة
        • تقديم معلومات دقيقة وكاملة
        • الحفاظ على سرية حسابك
        • إبلاغنا فوراً عن أي اختراق أمني
      `,
      gradient: 'from-secondary-600 to-secondary-500'
    },
    {
      id: 3,
      title: 'الخدمات والمدفوعات',
      icon: <FaMoneyBill />,
      content: `
        • جميع الأسعار بالريال السعودي
        • تتم المدفوعات عبر بوابات دفع آمنة
        • نحتفظ بالحق في تغيير الأسعار مع الإشعار المسبق
        • استرداد الأموال يخضع لسياسة الاسترداد المنفصلة
      `,
      gradient: 'from-amber-600 to-amber-500'
    },
    {
      id: 4,
      title: 'حقوق الملكية الفكرية',
      icon: <FaGavel />,
      content: `
        • جميع المحتويات محمية بحقوق النشر
        • لا يجوز نسخ أو إعادة استخدام المحتوى دون إذن
        • العلامات التجارية مسجلة باسم المنصة
      `,
      gradient: 'from-primary-600 to-secondary-600'
    },
    {
      id: 5,
      title: 'المسؤولية والتعويضات',
      icon: <FaExclamationTriangle />,
      content: `
        • المنصة ليست مسؤولة عن الخدمات المقدمة مباشرة
        • في حدود أقصاها قيمة الخدمة المدفوعة
        • نضمن أمان المدفوعات فقط
      `,
      gradient: 'from-amber-600 to-primary-600'
    },
    {
      id: 6,
      title: 'سياسة الإلغاء والاسترداد',
      icon: <FaHandshake />,
      content: `
        • إلغاء الحجز قبل 24 ساعة: استرداد كامل
        • إلغاء أقل من 24 ساعة: 50% استرداد
        • عدم الحضور: لا استرداد
        • يحق للبائع إلغاء الخدمة مع استرداد كامل
      `,
      gradient: 'from-secondary-600 to-amber-600'
    }
  ]

  const accordionItems = termsSections.map(section => ({
    id: section.id,
    title: (
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${section.gradient} flex items-center justify-center text-white shadow-lg`}>
          <span className="text-lg">{section.icon}</span>
        </div>
        <span className="font-bold text-gray-900 dark:text-white">{section.title}</span>
      </div>
    ),
    content: (
      <div className="prose dark:prose-invert max-w-none">
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {section.content}
          </p>
        </div>
      </div>
    )
  }))

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
            { label: 'الشروط والأحكام', path: '/terms' }
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
              <FaGavel className="text-5xl" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              الشروط والأحكام
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl max-w-2xl mx-auto opacity-90 mb-8"
            >
              يرجى قراءة هذه الشروط بعناية قبل استخدام منصتنا
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
                <span>الإصدار: ٢.١.٠</span>
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
          {/* Quick Stats Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          >
            {[
              { 
                label: 'مدة القراءة', 
                value: '٥ دقائق', 
                icon: <FaClock />,
                gradient: 'from-primary-600 to-primary-500',
                description: 'وقت تقديري للقراءة'
              },
              { 
                label: 'آخر تحديث', 
                value: '١٥ فبراير ٢٠٢٤', 
                icon: <FaCalendarAlt />,
                gradient: 'from-secondary-600 to-secondary-500',
                description: 'تاريخ آخر مراجعة'
              },
              { 
                label: 'الإصدار', 
                value: '٢.١.٠', 
                icon: <FaCodeBranch />,
                gradient: 'from-amber-600 to-amber-500',
                description: 'رقم الإصدار الحالي'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${item.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{item.label}</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{item.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-500">{item.description}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Terms Accordion */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-soft hover:shadow-medium transition-shadow duration-300 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-primary-600 to-primary-500 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <FaFileContract />
                بنود الاتفاقية
              </h2>
              <p className="text-white/80 text-sm mt-2">
                يرجى قراءة كل بند بعناية لفهم حقوقك ومسؤولياتك
              </p>
            </div>
            
            <div className="p-6 md:p-8">
              <Accordion 
                items={accordionItems} 
                allowMultiple={false}
                variant="bordered"
                iconType="chevron"
              />
            </div>
          </motion.div>

          {/* Acceptance Section */}
          <motion.div
            variants={itemVariants}
            className="mt-8"
          >
            <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl p-8 border border-green-200 dark:border-green-800 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-start gap-6">
                <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-green-600/30">
                  <FaHandshake className="text-3xl" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    موافقتي على الشروط
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    باستمرارك في استخدام المنصة، أنت تقر بأنك قرأت وفهمت ووافقت على جميع 
                    الشروط والأحكام المذكورة أعلاه. ننصحك بالاحتفاظ بنسخة من هذه الشروط 
                    للرجوع إليها مستقبلاً.
                  </p>
                  
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`
                        w-6 h-6 rounded-lg border-2 transition-all duration-300
                        ${agreed 
                          ? 'bg-green-600 border-green-600' 
                          : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 group-hover:border-green-500'
                        }
                      `}>
                        {agreed && <FaCheckCircle className="text-white text-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />}
                      </div>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      أوافق على جميع الشروط والأحكام
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Support Section */}
          <motion.div
            variants={itemVariants}
            className="mt-8"
          >
            <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-3xl p-8 text-white overflow-hidden relative">
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                    <FaQuestionCircle className="text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">لديك استفسار؟</h3>
                    <p className="text-white/80">
                      فريق الدعم متاح للإجابة على جميع استفساراتك حول الشروط والأحكام
                    </p>
                  </div>
                </div>
                
                <Link to="/contact">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white text-white hover:bg-white/20 min-w-[200px]"
                    icon={<FaHeadset />}
                    iconPosition="right"
                  >
                    تواصل معنا
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Last Updated Note */}
          <motion.div
            variants={itemVariants}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500 dark:text-gray-500">
              آخر تحديث للشروط والأحكام: ١٥ فبراير ٢٠٢٤. 
              نحن نحتفظ بالحق في تحديث هذه الشروط من وقت لآخر.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Terms