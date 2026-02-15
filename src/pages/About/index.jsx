import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FaUsers, 
  FaRocket, 
  FaStar, 
  FaHandshake, 
  FaBullseye, 
  FaEye,
  FaAward,
  FaChartLine,
  FaHeart,
  FaShieldAlt,
  FaQuoteRight,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
  FaClock,
  FaCheckCircle,
  FaLightbulb,
  FaGem
} from 'react-icons/fa'
import Breadcrumb from '../../components/ui/Breadcrumb'
import Button from '../../components/ui/Button'

const About = () => {
  const stats = [
    { 
      number: '٧+', 
      label: 'سنوات خبرة', 
      icon: <FaClock />,
      gradient: 'from-primary-600 to-primary-500',
      description: 'في مجال الهوية البصرية'
    },
    { 
      number: '١,٢٠٠+', 
      label: 'خدمة منجزة', 
      icon: <FaRocket />,
      gradient: 'from-secondary-600 to-secondary-500',
      description: 'بكفاءة واحترافية'
    },
    { 
      number: '٥٠٠+', 
      label: 'عميل سعيد', 
      icon: <FaUsers />,
      gradient: 'from-amber-600 to-amber-500',
      description: 'في جميع أنحاء المنطقة'
    },
    { 
      number: '٤.٩', 
      label: 'تقييم عام', 
      icon: <FaStar />,
      gradient: 'from-primary-600 to-amber-600',
      description: 'من ٥ نجوم'
    }
  ]

  const milestones = [
    {
      year: '٢٠١٧',
      title: 'انطلاق المنصة',
      description: 'تأسيس سيرفس ماركت بهدف ربط المواهب الإبداعية بالشركات الناشئة',
      icon: <FaRocket />,
      gradient: 'from-primary-600 to-primary-500'
    },
    {
      year: '٢٠١٩',
      title: 'أول ١٠٠ عميل',
      description: 'وصلنا إلى ١٠٠ عميل سعيد في عامين فقط',
      icon: <FaUsers />,
      gradient: 'from-secondary-600 to-secondary-500'
    },
    {
      year: '٢٠٢١',
      title: 'التوسع الإقليمي',
      description: 'فتح مكاتب في ٣ دول خليجية',
      icon: <FaGlobe />,
      gradient: 'from-amber-600 to-amber-500'
    },
    {
      year: '٢٠٢٤',
      title: 'جائزة أفضل منصة',
      description: 'حصلنا على جائزة الابتكار في الهوية البصرية',
      icon: <FaAward />,
      gradient: 'from-primary-600 to-secondary-600'
    }
  ]

  const team = [
    {
      name: 'أحمد محمد',
      position: 'المؤسس والمدير التنفيذي',
      image: 'https://via.placeholder.com/400x400',
      bio: 'خبرة ١٠ سنوات في مجال الهوية البصرية وتطوير الأعمال',
      expertise: ['الهوية البصرية', 'تطوير الأعمال', 'القيادة'],
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'سارة أحمد',
      position: 'مديرة التصميم',
      image: 'https://via.placeholder.com/400x400',
      bio: 'مصممة جرافيك حاصلة على جوائز دولية في التصميم',
      expertise: ['التصميم الجرافيكي', 'الهوية البصرية', 'الإبداع'],
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'خالد العلي',
      position: 'مدير التسويق',
      image: 'https://via.placeholder.com/400x400',
      bio: 'خبير في التسويق الرقمي وبناء العلامات التجارية',
      expertise: ['التسويق الرقمي', 'العلامات التجارية', 'استراتيجيات النمو'],
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'نورة سعد',
      position: 'مديرة خدمة العملاء',
      image: 'https://via.placeholder.com/400x400',
      bio: 'متخصصة في تجربة العملاء ورضاهم',
      expertise: ['خدمة العملاء', 'تجربة المستخدم', 'التواصل'],
      social: {
        linkedin: '#',
        twitter: '#'
      }
    }
  ]

  const values = [
    {
      icon: <FaRocket />,
      title: 'التميز',
      description: 'نسعى دائماً لتقديم أفضل الخدمات بجودة عالية تتجاوز توقعات عملائنا',
      gradient: 'from-primary-600 to-primary-500',
      bg: 'bg-primary-100 dark:bg-primary-900/30',
      text: 'text-primary-600'
    },
    {
      icon: <FaHandshake />,
      title: 'الثقة',
      description: 'نبني علاقات طويلة الأمد مع عملائنا على أساس الشفافية والمصداقية',
      gradient: 'from-secondary-600 to-secondary-500',
      bg: 'bg-secondary-100 dark:bg-secondary-900/30',
      text: 'text-secondary-600'
    },
    {
      icon: <FaEye />,
      title: 'الابتكار',
      description: 'نواكب أحدث التقنيات والحلول الإبداعية لتقديم خدمات متميزة',
      gradient: 'from-amber-600 to-amber-500',
      bg: 'bg-amber-100 dark:bg-amber-900/30',
      text: 'text-amber-600'
    },
    {
      icon: <FaGem />,
      title: 'الجودة',
      description: 'نلتزم بأعلى معايير الجودة في جميع خدماتنا ومنتجاتنا',
      gradient: 'from-primary-600 to-secondary-600',
      bg: 'bg-primary-100 dark:bg-primary-900/30',
      text: 'text-primary-600'
    }
  ]

  const testimonials = [
    {
      name: 'عبدالله السلمي',
      position: 'مؤسس شركة تكافل',
      image: 'https://via.placeholder.com/100x100',
      content: 'سيرفس ماركت غيرت مفهوم الهوية البصرية بالنسبة لي. فريق محترف وخدمات استثنائية ساعدتني في بناء علامتي التجارية.',
      rating: 5,
      gradient: 'from-primary-600 to-primary-500'
    },
    {
      name: 'لمى القحطاني',
      position: 'مديرة تسويق في منصة ورد',
      image: 'https://via.placeholder.com/100x100',
      content: 'من أفضل المنصات التي تعاملت معها. احترافية في العمل وإبداع في التصميم. أنصح بها بشدة.',
      rating: 5,
      gradient: 'from-secondary-600 to-secondary-500'
    }
  ]

  const achievements = [
    { icon: <FaAward />, count: '١٢', label: 'جائزة دولية' },
    { icon: <FaUsers />, count: '٥٠٠+', label: 'عميل' },
    { icon: <FaRocket />, count: '١٠٠٠+', label: 'مشروع' },
    { icon: <FaGlobe />, count: '٥', label: 'دول' }
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
        <Breadcrumb 
          items={[
            { label: 'الرئيسية', path: '/' },
            { label: 'من نحن', path: '/about' }
          ]}
        />

        {/* Hero Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative mb-16 md:mb-20 overflow-hidden rounded-3xl"
        >
          {/* Background with animated gradient */}
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
              className="absolute -top-40 -right-40 w-80 h-80 md:w-96 md:h-96 bg-white/10 rounded-full blur-3xl"
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
              className="absolute -bottom-40 -left-40 w-80 h-80 md:w-96 md:h-96 bg-secondary-400/20 rounded-full blur-3xl"
            />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center p-6 md:p-10 lg:p-16">
            {/* Content */}
            <motion.div variants={itemVariants} className="flex-1 text-center lg:text-right">
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur rounded-full text-white/90 text-sm mb-4 md:mb-6">
                <FaShieldAlt className="inline ml-2" />
                نبني قصص نجاح
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
                هوية بصرية
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-400">
                  لا تُنسى
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                منصة سيرفس ماركت تجمع بين الإبداع والاحترافية لمساعدة الشركات الناشئة 
                على بناء هوية بصرية قوية تميزها في السوق.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link to="/services">
                  <Button 
                    variant="primary" 
                    size="lg"
                    className="w-full sm:w-auto text-primary-700 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all"
                  >
                    استعرض خدماتنا
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full sm:w-auto border-white text-white hover:bg-white/10 backdrop-blur"
                  >
                    تواصل معنا
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div variants={itemVariants} className="flex-1">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white/10 backdrop-blur rounded-xl md:rounded-2xl p-4 md:p-6 text-center border border-white/20"
                  >
                    <div className={`inline-flex p-2 md:p-3 rounded-xl bg-gradient-to-r ${stat.gradient} mb-2 md:mb-3 shadow-lg`}>
                      <div className="text-white text-lg md:text-xl">{stat.icon}</div>
                    </div>
                    <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-xs md:text-sm text-white/70 mb-1">{stat.label}</div>
                    <div className="text-[10px] md:text-xs text-white/50">{stat.description}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Wave Decoration */}
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

        {/* Achievements Bar */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-soft hover:shadow-medium transition-all"
            >
              <div className="text-3xl text-primary-600 mb-2">{item.icon}</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{item.count}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Our Story Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="flex-1">
              <span className="text-primary-600 font-semibold text-sm tracking-wider mb-2 block">
                قصتنا
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
                بدأنا بحلم ووصلنا للقمة
              </h2>
              <div className="space-y-3 md:space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  في عام ٢٠١٧، لاحظنا حاجة ملحة في السوق لمنصة تجمع بين الإبداع والاحترافية 
                  في مجال الهوية البصرية. كانت الشركات الناشئة تعاني من صعوبة الوصول إلى 
                  مصممين محترفين بأسعار مناسبة.
                </p>
                <p>
                  قررنا تغيير هذا الواقع. أسسنا سيرفس ماركت ليكون جسراً بين المواهب الإبداعية 
                  والشركات الناشئة. واليوم، نحن فخورون بكوننا المنصة الرائدة في مجال الهوية 
                  البصرية في المنطقة.
                </p>
              </div>

              {/* Milestone Timeline */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {milestones.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="relative group"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity`} />
                    <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-4 text-center shadow-soft group-hover:shadow-medium transition-all">
                      <div className={`w-12 h-12 mx-auto bg-gradient-to-r ${item.gradient} rounded-xl flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
                        {item.icon}
                      </div>
                      <div className="font-bold text-primary-600 text-lg">{item.year}</div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">{item.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{item.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl blur-2xl opacity-20" />
              <img 
                src="https://via.placeholder.com/600x400" 
                alt="Our Story"
                className="relative rounded-3xl shadow-premium hover:shadow-premium transition-shadow w-full"
              />
              
              {/* Floating Award Card */}
              <motion.div
                animate={{
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -bottom-4 md:-bottom-6 -left-2 md:-left-4 bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-premium p-3 md:p-4"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl flex items-center justify-center">
                    <FaAward className="text-xl md:text-2xl text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-sm md:text-base text-gray-900 dark:text-white">أفضل منصة</div>
                    <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">للهوية البصرية ٢٠٢٤</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
            <span className="text-primary-600 font-semibold text-sm tracking-wider mb-2 block">
              قيمنا
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
              المبادئ التي نؤمن بها
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
              نعمل وفق قيم راسخة تضمن تقديم أفضل الخدمات لعملائنا
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                
                <div className={`relative z-10 w-16 h-16 ${value.bg} rounded-xl flex items-center justify-center ${value.text} mb-4 group-hover:scale-110 transition-transform`}>
                  <div className="text-3xl">{value.icon}</div>
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                  {value.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
            <span className="text-primary-600 font-semibold text-sm tracking-wider mb-2 block">
              فريقنا
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
              الخبراء الذين يقودون النجاح
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
              نخبة من أفضل المواهب الإبداعية في المنطقة
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Social Links */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all">
                    <a href={member.social.linkedin} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary-600 hover:bg-primary-600 hover:text-white transition-colors">
                      <FaLinkedin />
                    </a>
                    <a href={member.social.twitter} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary-600 hover:bg-primary-600 hover:text-white transition-colors">
                      <FaTwitter />
                    </a>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-primary-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 text-sm mb-3">{member.position}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {member.bio}
                  </p>
                  
                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs text-gray-600 dark:text-gray-400">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <div className="relative bg-gradient-to-br from-primary-600 to-secondary-600 rounded-3xl overflow-hidden p-8 md:p-12">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="text-center text-white mb-10">
                <FaQuoteRight className="text-5xl md:text-6xl opacity-30 mx-auto mb-4" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                  ماذا يقول عملاؤنا
                </h2>
                <p className="text-white/80 text-sm md:text-base">
                  آراء حقيقية من عملاء سعداء بثقوا في خدماتنا
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-white"
                      />
                      <div>
                        <h4 className="font-bold text-white text-base">{testimonial.name}</h4>
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
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-3xl p-8 md:p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            
            <div className="relative z-10">
              <FaRocket className="text-5xl text-primary-600 mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                انضم إلى قصة نجاحنا
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mb-6 max-w-2xl mx-auto">
                كن جزءاً من مجتمع سيرفس ماركت وابدأ رحلتك نحو هوية بصرية مميزة
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/services">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    استعرض الخدمات
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    تواصل معنا
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default About