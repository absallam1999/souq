import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaPaperPlane,
  FaCube,
  FaHeart,
  FaRocket,
  FaShieldAlt
} from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'من نحن', path: '/about' },
    { name: 'الخدمات', path: '/services' },
    { name: 'التصنيفات', path: '/categories' },
    { name: 'المدونة', path: '/blog' },
    { name: 'اتصل بنا', path: '/contact' },
  ]

  const legalLinks = [
    { name: 'الشروط والأحكام', path: '/terms' },
    { name: 'سياسة الخصوصية', path: '/privacy' },
    { name: 'سياسة الاسترداد', path: '/refund' },
    { name: 'الأسئلة الشائعة', path: '/help' },
  ]

  const socialLinks = [
    { icon: <FaFacebookF />, url: 'https://facebook.com', label: 'فيسبوك', color: 'hover:bg-[#1877f2]' },
    { icon: <FaTwitter />, url: 'https://twitter.com', label: 'تويتر', color: 'hover:bg-[#1da1f2]' },
    { icon: <FaInstagram />, url: 'https://instagram.com', label: 'انستغرام', color: 'hover:bg-[#e4405f]' },
    { icon: <FaLinkedinIn />, url: 'https://linkedin.com', label: 'لينكد إن', color: 'hover:bg-[#0a66c2]' },
  ]

  const stats = [
    { icon: <FaRocket />, value: '١٠٠٠+', label: 'خدمة منجزة' },
    { icon: <FaHeart />, value: '٥٠٠+', label: 'عميل سعيد' },
    { icon: <FaShieldAlt />, value: '٤.٩', label: 'تقييم عام' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <footer className="relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-800 mt-auto overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom relative z-10">
        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-3 gap-4 py-8 border-b border-gray-200 dark:border-gray-800"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl text-primary-600 dark:text-primary-400 mb-2 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Main Footer Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12"
        >
          {/* About Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                <FaCube className="text-white text-lg" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-l from-primary-600 to-primary-400 bg-clip-text text-transparent">
                سيرفس ماركت
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              منصة رائدة لخدمات الهوية البصرية والحجوزات المهنية للشركات الناشئة. 
              نقدم حلولاً إبداعية تجمع بين الحداثة والاحترافية.
            </p>
            
            {/* Newsletter Signup */}
            <div className="pt-4">
              <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                النشرة البريدية
              </h5>
              <div className="relative">
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="w-full px-4 py-2.5 pl-12 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                />
                <button className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  <FaPaperPlane className="text-xs" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-lg relative inline-block">
              روابط سريعة
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-all hover:pr-2 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-lg relative inline-block">
              المعلومات
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-all hover:pr-2 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-lg relative inline-block">
              تواصل معنا
            </h4>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center text-primary-600">
                  <FaMapMarkerAlt className="text-sm" />
                </div>
                <span>الرياض، المملكة العربية السعودية</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center text-primary-600">
                  <FaPhone className="text-sm" />
                </div>
                <span dir="ltr">+966 123 456 789</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center text-primary-600">
                  <FaEnvelope className="text-sm" />
                </div>
                <span>info@servicemarket.com</span>
              </li>
            </ul>

            {/* Social Links */}
            <div>
              <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                تابعنا على
              </h5>
              <div className="flex gap-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 
                      flex items-center justify-center text-gray-600 dark:text-gray-400
                      transition-all duration-300 ${social.color} hover:text-white
                    `}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="relative py-6 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} سيرفس ماركت. جميع الحقوق محفوظة
            </p>
            
            <div className="flex items-center gap-4">
              <Link to="/terms" className="text-xs text-gray-500 dark:text-gray-500 hover:text-primary-600 transition-colors">
                الشروط والأحكام
              </Link>
              <span className="text-gray-300 dark:text-gray-700">|</span>
              <Link to="/privacy" className="text-xs text-gray-500 dark:text-gray-500 hover:text-primary-600 transition-colors">
                سياسة الخصوصية
              </Link>
              <span className="text-gray-300 dark:text-gray-700">|</span>
              <Link to="/sitemap" className="text-xs text-gray-500 dark:text-gray-500 hover:text-primary-600 transition-colors">
                خريطة الموقع
              </Link>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-500">طرق الدفع:</span>
              <div className="flex gap-1">
                <div className="w-8 h-5 bg-gray-200 dark:bg-gray-700 rounded text-[8px] flex items-center justify-center text-gray-600 dark:text-gray-400">VISA</div>
                <div className="w-8 h-5 bg-gray-200 dark:bg-gray-700 rounded text-[8px] flex items-center justify-center text-gray-600 dark:text-gray-400">MC</div>
                <div className="w-8 h-5 bg-gray-200 dark:bg-gray-700 rounded text-[8px] flex items-center justify-center text-gray-600 dark:text-gray-400">MADA</div>
              </div>
            </div>
          </div>  
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer