import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { motion } from 'framer-motion'
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaClock, 
  FaQuestionCircle,
  FaHeadset, 
  FaWhatsapp, 
  FaTwitter, 
  FaLinkedinIn, 
  FaFacebookF,
  FaPaperPlane,
  FaRegClock,
  FaRegEnvelope,
  FaRegBuilding,
  FaGlobe,
  FaCheckCircle
} from 'react-icons/fa'
import Breadcrumb from '../../components/ui/Breadcrumb'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Alert from '../../components/ui/Alert'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitted(true)
    setIsLoading(false)
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  const contactInfo = [
    {
      icon: <FaRegEnvelope />,
      title: 'البريد الإلكتروني',
      details: ['support@servicemarket.com', 'info@servicemarket.com'],
      action: 'ارسل رسالة',
      gradient: 'from-primary-600 to-secondary-600',
      link: 'mailto:support@servicemarket.com'
    },
    {
      icon: <FaPhone />,
      title: 'رقم الهاتف',
      details: ['+966 123 456 789', '+966 987 654 321'],
      action: 'اتصل الآن',
      gradient: 'from-primary-600 to-secondary-600',
      link: 'tel:+966123456789'
    },
    {
      icon: <FaRegBuilding />,
      title: 'العنوان',
      details: ['الرياض، المملكة العربية السعودية', 'حي الملقا، شارع العليا'],
      action: 'عرض الخريطة',
      gradient: 'from-primary-600 to-secondary-600',
      link: 'https://maps.google.com'
    },
    {
      icon: <FaRegClock />,
      title: 'ساعات العمل',
      details: ['الأحد - الخميس: ٩ص - ٦م', 'الجمعة - السبت: مغلق'],
      action: 'موعد مسبق',
      gradient: 'from-primary-600 to-secondary-600',
      link: '#'
    }
  ]

  const socialLinks = [
    { icon: <FaWhatsapp />, link: '#', label: 'واتساب', color: 'hover:bg-[#25D366]' },
    { icon: <FaTwitter />, link: '#', label: 'تويتر', color: 'hover:bg-[#1DA1F2]' },
    { icon: <FaLinkedinIn />, link: '#', label: 'لينكد إن', color: 'hover:bg-[#0A66C2]' },
    { icon: <FaFacebookF />, link: '#', label: 'فيسبوك', color: 'hover:bg-[#1877F2]' }
  ]

  const faqs = [
    {
      question: 'كم من الوقت تستغرق الرد على الاستفسارات؟',
      answer: 'نقوم بالرد على جميع الاستفسارات خلال ٢٤ ساعة كحد أقصى.'
    },
    {
      question: 'هل تقدمون دعماً فنياً بعد ساعات العمل؟',
      answer: 'نعم، فريق الدعم متاح على مدار الساعة عبر البريد الإلكتروني والواتساب.'
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
            { label: 'اتصل بنا', path: '/contact' }
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
              <FaHeadset className="text-5xl" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              تواصل معنا
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl max-w-2xl mx-auto opacity-90 mb-8"
            >
              فريقنا متخصص في تقديم أفضل الحلول للهوية البصرية. 
              نحن هنا للإجابة على جميع استفساراتك.
            </motion.p>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold">٢٤/٧</div>
                <div className="text-sm opacity-80">دعم فني</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold"><FaRegClock className="inline ml-1" /> ٣٠د</div>
                <div className="text-sm opacity-80">متوسط الرد</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">+٥٠٠٠</div>
                <div className="text-sm opacity-80">عميل سعيد</div>
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

        {/* Contact Info Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactInfo.map((info, index) => (
            <motion.a
              key={index}
              href={info.link}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft hover:shadow-premium transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              {/* Icon with gradient background */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${info.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <div className="text-2xl">{info.icon}</div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
                {info.title}
              </h3>
              
              {info.details.map((detail, i) => (
                <p key={i} className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  {detail}
                </p>
              ))}
              
              <div className="mt-4 flex items-center text-primary-600 font-medium group-hover:gap-2 transition-all">
                <span className="text-sm">{info.action}</span>
                <FaPaperPlane className="text-xs mr-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-soft hover:shadow-medium transition-shadow duration-300 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-500 p-6">
                <h2 className="text-2xl font-bold text-white mb-2">أرسل لنا رسالة</h2>
                <p className="text-white/80 text-sm">نحن هنا للإجابة على جميع استفساراتك في أقرب وقت</p>
              </div>

              {/* Form Body */}
              <div className="p-6 md:p-8">
                {isSubmitted ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 bg-success/10 rounded-2xl flex items-center justify-center">
                      <FaCheckCircle className="text-5xl text-success" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">تم إرسال رسالتك بنجاح!</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      سنتواصل معك في أقرب وقت ممكن. شكراً لتواصلك معنا.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsSubmitted(false)}
                    >
                      إرسال رسالة أخرى
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="الاسم الكامل"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="أدخل اسمك الكامل"
                        required
                      />
                      
                      <Input
                        label="البريد الإلكتروني"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@domain.com"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="رقم الجوال"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+966 5X XXX XXXX"
                        required
                      />
                      
                      <Input
                        label="الموضوع"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="ما هو موضوع رسالتك؟"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        الرسالة
                        <span className="text-red-500 mr-1">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="6"
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 dark:bg-gray-900 dark:text-white transition-all resize-none"
                        placeholder="اكتب رسالتك هنا..."
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg" 
                      fullWidth
                      loading={isLoading}
                      icon={<FaPaperPlane />}
                      iconPosition="left"
                    >
                      إرسال الرسالة
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Sidebar - Takes 1 column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Map Card */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-soft overflow-hidden group">
              <div className="h-64 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.890682114674!2d46.67564031500182!3d24.71313728411671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ3LjMiTiA0NsKwNDAnNDAuNCJF!5e0!3m2!1sen!2ssa!4v1620000000000!5m2!1sen!2ssa"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Office Location"
                  className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-primary-600" />
                    <span className="text-sm font-medium">الرياض، المملكة العربية السعودية</span>
                  </div>
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    عرض الخريطة
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-soft p-6">
              <h3 className="text-xl font-bold mb-4 text-center">تواصل معنا عبر</h3>
              <div className="flex justify-center gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700
                      flex items-center justify-center text-gray-600 dark:text-gray-300
                      transition-all duration-300 ${social.color} hover:text-white
                    `}
                    aria-label={social.label}
                  >
                    <span className="text-xl">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 md:p-12">
            <FaGlobe className="text-5xl text-primary-600 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3">نحن هنا لمساعدتك</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              سواء كان لديك استفسار أو تحتاج إلى مساعدة، فريقنا جاهز لدعمك على مدار الساعة
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="tel:+966123456789">
                <Button variant="outline" size="lg">
                  <FaPhone className="ml-2" />
                  اتصل بنا
                </Button>
              </a>
              <a href="mailto:support@servicemarket.com">
                <Button variant="primary" size="lg">
                  <FaEnvelope className="ml-2" />
                  راسلنا
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact