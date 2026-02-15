import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FaStar, 
  FaClock, 
  FaVectorSquare, 
  FaPalette,
  FaRocket,
  FaUsers,
  FaAward,
  FaArrowLeft,
  FaCheckCircle,
  FaQuoteRight,
  FaChartLine,
  FaBullseye,
  FaHandshake,
  FaEye,
  FaGem
} from 'react-icons/fa'
import ServiceCard from '../../components/Common/ServiceCard'
import CategoryCard from '../../components/Common/CategoryCard'

const Home = () => {
  const featuredServices = [
    {
      id: 1,
      title: 'هوية بصرية متكاملة للشركات الناشئة',
      provider: 'أحمد محمد',
      providerAvatar: 'https://via.placeholder.com/50x50',
      rating: 4.9,
      reviews: 124,
      price: 250,
      image: 'https://via.placeholder.com/300x200',
      category: 'هوية بصرية',
      badge: 'الأكثر طلباً',
      gradient: 'from-primary-600 to-primary-500'
    },
    {
      id: 2,
      title: 'تصميم شعار احترافي مع دليل الألوان',
      provider: 'سارة أحمد',
      providerAvatar: 'https://via.placeholder.com/50x50',
      rating: 4.8,
      reviews: 98,
      price: 180,
      image: 'https://via.placeholder.com/300x200',
      category: 'تصميم',
      badge: 'خصم ٢٠٪',
      gradient: 'from-secondary-600 to-secondary-500'
    },
    {
      id: 3,
      title: 'دليل الهوية البصرية الكامل',
      provider: 'خالد العلي',
      providerAvatar: 'https://via.placeholder.com/50x50',
      rating: 5.0,
      reviews: 56,
      price: 320,
      image: 'https://via.placeholder.com/300x200',
      category: 'هوية بصرية',
      badge: 'جديد',
      gradient: 'from-amber-600 to-amber-500'
    }
  ]

  const categories = [
    { 
      id: 1, 
      name: 'تصميم جرافيك', 
      count: 245, 
      icon: <FaPalette />,
      gradient: 'from-purple-600 to-purple-500',
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      text: 'text-purple-600'
    },
    { 
      id: 2, 
      name: 'هوية بصرية', 
      count: 189, 
      icon: <FaVectorSquare />,
      gradient: 'from-primary-600 to-primary-500',
      bg: 'bg-primary-100 dark:bg-primary-900/30',
      text: 'text-primary-600'
    },
    { 
      id: 3, 
      name: 'تسويق رقمي', 
      count: 320, 
      icon: <FaChartLine />,
      gradient: 'from-secondary-600 to-secondary-500',
      bg: 'bg-secondary-100 dark:bg-secondary-900/30',
      text: 'text-secondary-600'
    },
    { 
      id: 4, 
      name: 'تطوير مواقع', 
      count: 167, 
      icon: <FaRocket />,
      gradient: 'from-amber-600 to-amber-500',
      bg: 'bg-amber-100 dark:bg-amber-900/30',
      text: 'text-amber-600'
    }
  ]

  const stats = [
    { 
      number: '١,٢٠٠+', 
      label: 'خدمة منجزة', 
      icon: <FaRocket />,
      gradient: 'from-primary-600 to-primary-500'
    },
    { 
      number: '٤.٩', 
      label: 'تقييم عام', 
      icon: <FaStar />,
      gradient: 'from-amber-600 to-amber-500'
    },
    { 
      number: '٧+', 
      label: 'سنوات خبرة', 
      icon: <FaClock />,
      gradient: 'from-secondary-600 to-secondary-500'
    },
    { 
      number: '٥٠٠+', 
      label: 'عميل سعيد', 
      icon: <FaUsers />,
      gradient: 'from-primary-600 to-secondary-600'
    }
  ]

  const benefits = [
    {
      icon: <FaAward />,
      title: 'جودة مضمونة',
      description: 'خدمات عالية الجودة من خبراء معتمدين',
      gradient: 'from-primary-600 to-primary-500'
    },
    {
      icon: <FaHandshake />,
      title: 'ضمان استرداد',
      description: 'استرداد كامل خلال ١٤ يوماً',
      gradient: 'from-secondary-600 to-secondary-500'
    },
    {
      icon: <FaEye />,
      title: 'دعم فوري',
      description: 'دعم على مدار الساعة طوال أيام الأسبوع',
      gradient: 'from-amber-600 to-amber-500'
    },
    {
      icon: <FaGem />,
      title: 'أسعار تنافسية',
      description: 'أفضل الأسعار مع أعلى جودة',
      gradient: 'from-primary-600 to-secondary-600'
    }
  ]

  const testimonials = [
    {
      name: 'سارة المتصور',
      position: 'مؤسسة متجر ورد',
      image: 'https://via.placeholder.com/100x100',
      content: 'عمل رائع وسهل جداً! أسلوب فني ومحترف في عملك. استلمت الهوية قبل الموعد وبجودة فوق التوقعات. أنصح بالتعامل معه بشدة.',
      rating: 5,
      gradient: 'from-primary-600 to-primary-500'
    },
    {
      name: 'خالد بن علي',
      position: 'مدير شركة تكافل',
      image: 'https://via.placeholder.com/100x100',
      content: 'التواصل كان سهلاً جداً وفهم طلبي من المرة الأولى. الشعار جاد وقوي في نفس الوقت كما طلبت.',
      rating: 5,
      gradient: 'from-secondary-600 to-secondary-500'
    },
    {
      name: 'لمى القحطاني',
      position: 'مصممة مستقلة',
      image: 'https://via.placeholder.com/100x100',
      content: 'منصة رائعة بكل المقاييس. ساعدتني في تطوير أعمالي والوصول لعملاء جدد.',
      rating: 5,
      gradient: 'from-amber-600 to-amber-500'
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
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <div className="py-8 md:py-12 animate-fade-in">
      <div className="container-custom">
        {/* Hero Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
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
              variants={itemVariants}
              className="inline-block px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm mb-6"
            >
              <FaRocket className="inline ml-2" />
              منصة الخدمات الأولى في المنطقة
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              هوية بصرية احترافية
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-400">
                للشركات الناشئة
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-white/80 max-w-2xl mx-auto mb-8"
            >
              أكثر من ٧ سنوات خبرة في بناء علامات تجارية لا تُنسى 
              مع أكثر من ١٠٠٠ خدمة منجزة وعملاء سعداء
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/services">
                <button className="px-8 py-3 bg-white text-primary-700 rounded-xl font-medium hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  استعرض الخدمات
                </button>
              </Link>
              <Link to="/contact">
                <button className="px-8 py-3 border-2 border-white text-white rounded-xl font-medium hover:bg-white/10 backdrop-blur transition-all transform hover:-translate-y-1">
                  تواصل معنا
                </button>
              </Link>
            </motion.div>

            {/* Floating Stats */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-6 mt-12"
            >
              {stats.slice(0, 2).map((stat, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${stat.gradient} flex items-center justify-center text-white`}>
                    {stat.icon}
                  </div>
                  <span className="font-bold">{stat.number}</span>
                  <span className="text-white/70 text-sm">{stat.label}</span>
                </div>
              ))}
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
        </motion.section>

        {/* Stats Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-soft hover:shadow-medium transition-all overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
              
              <div className={`relative z-10 w-14 h-14 mx-auto bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.section>

        {/* Featured Services */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-primary-600 font-semibold text-sm tracking-wider mb-2 block">
                خدمات مميزة
              </span>
              <h2 className="text-2xl md:text-3xl font-bold">أكثر الخدمات طلباً</h2>
            </div>
            <Link 
              to="/services" 
              className="hidden sm:flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium group"
            >
              <span>عرض الكل</span>
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>

          {/* Mobile view all link */}
          <Link 
            to="/services" 
            className="sm:hidden flex items-center justify-center gap-2 mt-6 text-primary-600 hover:text-primary-700 font-medium"
          >
            <span>عرض جميع الخدمات</span>
            <FaArrowLeft />
          </Link>
        </motion.section>

        {/* Benefits Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-primary-600 font-semibold text-sm tracking-wider mb-2 block">
              لماذا نحن؟
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">مميزات التعامل معنا</h2>
            <p className="text-gray-600 dark:text-gray-400">
              نقدم لك أفضل الخدمات مع ضمان الجودة والرضا التام
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                
                <div className={`w-14 h-14 bg-gradient-to-r ${benefit.gradient} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {benefit.icon}
                </div>
                
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Categories */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-primary-600 font-semibold text-sm tracking-wider mb-2 block">
                تصفح حسب
              </span>
              <h2 className="text-2xl md:text-3xl font-bold">التصنيفات</h2>
            </div>
            <Link 
              to="/categories" 
              className="hidden sm:flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium group"
            >
              <span>عرض الكل</span>
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </div>

          {/* Mobile view all link */}
          <Link 
            to="/categories" 
            className="sm:hidden flex items-center justify-center gap-2 mt-6 text-primary-600 hover:text-primary-700 font-medium"
          >
            <span>عرض جميع التصنيفات</span>
            <FaArrowLeft />
          </Link>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="relative bg-gradient-to-br from-primary-600 to-secondary-600 rounded-3xl overflow-hidden p-8 md:p-12">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="text-center text-white mb-10">
                <FaQuoteRight className="text-5xl md:text-6xl opacity-30 mx-auto mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold mb-3">تقييمات العملاء</h2>
                <p className="text-white/80">ماذا يقول عملاؤنا عن خدماتنا</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white"
                      />
                      <div>
                        <h4 className="font-bold text-white">{testimonial.name}</h4>
                        <p className="text-white/70 text-sm">{testimonial.position}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-amber-400" />
                      ))}
                    </div>
                    
                    <p className="text-white/90 text-sm leading-relaxed">
                      {testimonial.content}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-3xl p-8 md:p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <FaRocket className="text-5xl text-primary-600 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold mb-3">استعد لانطلاق مشروعك</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                انضم إلى آلاف العملاء الذين وثقوا في خدماتنا وابدأ رحلتك نحو هوية بصرية مميزة
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 border-2 border-white dark:border-gray-900" />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  وانضم إلى أكثر من <span className="font-bold text-primary-600">٥٠٠ عميل</span>
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Link to="/services">
                  <button className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    ابدأ الآن
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="px-8 py-3 border-2 border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400 rounded-xl font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all transform hover:-translate-y-1">
                    تواصل معنا
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default Home