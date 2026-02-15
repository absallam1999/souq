import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FaUser, FaEnvelope, FaLock, FaPhone, FaGoogle, 
  FaFacebook, FaTwitter, FaEye, FaEyeSlash, FaCheck,
  FaArrowRight, FaUserPlus, FaRocket, FaShieldAlt,
  FaHeadset, FaCreditCard, FaStar, FaRegUser,
  FaBriefcase, FaRegCheckCircle,
  FaArrowLeft
} from 'react-icons/fa'
import { MdVerified, MdSecurity, MdEmail } from 'react-icons/md'
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi'
import { BsShieldCheck, BsPersonCheck, BsPhone } from 'react-icons/bs'
import { RiCustomerServiceLine, RiShieldStarLine } from 'react-icons/ri'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Progress from '../../components/ui/Progress'

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    accountType: 'client',
    agreeTerms: false
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validateStep1 = () => {
    const newErrors = {}
    if (!formData.name) {
      newErrors.name = 'الاسم مطلوب'
    } else if (formData.name.length < 3) {
      newErrors.name = 'الاسم يجب أن يكون ٣ أحرف على الأقل'
    }
    
    if (!formData.email) {
      newErrors.email = 'البريد الإلكتروني مطلوب'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح'
    }
    
    if (!formData.phone) {
      newErrors.phone = 'رقم الجوال مطلوب'
    } else if (!/^05\d{8}$/.test(formData.phone)) {
      newErrors.phone = 'رقم الجوال غير صحيح (مثال: 05XXXXXXXX)'
    }
    
    return newErrors
  }

  const validateStep2 = () => {
    const newErrors = {}
    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة'
    } else if (formData.password.length < 8) {
      newErrors.password = 'كلمة المرور يجب أن تكون ٨ أحرف على الأقل'
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'كلمة المرور غير متطابقة'
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'يجب الموافقة على الشروط والأحكام'
    }
    
    return newErrors
  }

  const handleNextStep = () => {
    const newErrors = validateStep1()
    if (Object.keys(newErrors).length === 0) {
      setStep(2)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setErrors(newErrors)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (step === 2) {
      const newErrors = validateStep2()
      if (Object.keys(newErrors).length === 0) {
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
          setIsLoading(false)
          console.log('Signup data:', formData)
        }, 1500)
      } else {
        setErrors(newErrors)
      }
    }
  }

  const passwordStrength = () => {
    const password = formData.password
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25
    return strength
  }

  const getStrengthColor = () => {
    const strength = passwordStrength()
    if (strength <= 25) return 'danger'
    if (strength <= 50) return 'warning'
    if (strength <= 75) return 'info'
    return 'success'
  }

  const getStrengthText = () => {
    const strength = passwordStrength()
    if (strength <= 25) return 'ضعيفة'
    if (strength <= 50) return 'متوسطة'
    if (strength <= 75) return 'قوية'
    return 'قوية جداً'
  }

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
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors group bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
            <span>العودة إلى الرئيسية</span>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Signup Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md mx-auto lg:mx-0"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center">
                  <FaUserPlus className="text-primary-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    إنشاء حساب جديد
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    انضم إلى آلاف المستخدمين واستفد من خدماتنا المتميزة
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Progress Steps */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex justify-between mb-2">
                {[
                  { step: 1, label: 'المعلومات الأساسية' },
                  { step: 2, label: 'الأمان والموافقة' }
                ].map((s) => (
                  <div
                    key={s.step}
                    className={`text-sm font-medium ${
                      step >= s.step 
                        ? 'text-primary-600' 
                        : 'text-gray-400'
                    }`}
                  >
                    {s.label}
                  </div>
                ))}
              </div>
              <Progress 
                value={step * 50} 
                max={100} 
                variant="primary" 
                size="md" 
                className="rounded-full"
              />
            </motion.div>

            {/* Signup Form Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700"
            >
              <form onSubmit={handleSubmit}>
                {step === 1 ? (
                  /* Step 1: Basic Info */
                  <div className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        الاسم كامل
                      </label>
                      <div className="relative group">
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary-600 transition-colors">
                          <HiOutlineUser size={20} />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="أدخل اسمك الكامل"
                          className={`w-full pr-12 px-4 py-4 border-2 ${
                            errors.name
                              ? "border-red-500"
                              : "border-gray-200 dark:border-gray-700 group-focus-within:border-primary-600"
                          } rounded-2xl focus:outline-none focus:border-primary-600 dark:bg-gray-700 dark:text-white transition-all`}
                        />
                      </div>
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-500 flex items-center gap-1"
                        >
                          <span>•</span>
                          {errors.name}
                        </motion.p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        البريد الإلكتروني
                      </label>
                      <div className="relative group">
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary-600 transition-colors">
                          <HiOutlineMail size={20} />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="example@domain.com"
                          className={`w-full pr-12 px-4 py-4 border-2 ${
                            errors.email
                              ? "border-red-500"
                              : "border-gray-200 dark:border-gray-700 group-focus-within:border-primary-600"
                          } rounded-2xl focus:outline-none focus:border-primary-600 dark:bg-gray-700 dark:text-white transition-all`}
                          dir="ltr"
                        />
                      </div>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-500 flex items-center gap-1"
                        >
                          <span>•</span>
                          {errors.email}
                        </motion.p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        رقم الجوال
                      </label>
                      <div className="relative group">
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary-600 transition-colors">
                          <BsPhone size={20} />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="05XXXXXXXX"
                          className={`w-full pr-12 px-4 py-4 border-2 ${
                            errors.phone
                              ? "border-red-500"
                              : "border-gray-200 dark:border-gray-700 group-focus-within:border-primary-600"
                          } rounded-2xl focus:outline-none focus:border-primary-600 dark:bg-gray-700 dark:text-white transition-all`}
                          dir="ltr"
                        />
                      </div>
                      {errors.phone && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-500 flex items-center gap-1"
                        >
                          <span>•</span>
                          {errors.phone}
                        </motion.p>
                      )}
                    </div>

                    {/* Account Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        نوع الحساب
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { 
                            value: 'client', 
                            label: 'عميل', 
                            icon: <FaRegUser />,
                            description: 'أبحث عن خدمات'
                          },
                          { 
                            value: 'provider', 
                            label: 'مقدم خدمة', 
                            icon: <FaBriefcase />,
                            description: 'أقدم خدماتي'
                          }
                        ].map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => setFormData({...formData, accountType: type.value})}
                            className={`
                              p-4 rounded-2xl border-2 transition-all text-center
                              ${formData.accountType === type.value
                                ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                              }
                            `}
                          >
                            <div className={`text-2xl mb-2 ${
                              formData.accountType === type.value
                                ? 'text-primary-600'
                                : 'text-gray-500'
                            }`}>
                              {type.icon}
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {type.label}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {type.description}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Next Button */}
                    <Button 
                      type="button" 
                      variant="primary" 
                      size="lg" 
                      fullWidth
                      onClick={handleNextStep}
                      className="mt-4 py-4 text-lg font-medium rounded-2xl"
                    >
                      التالي
                    </Button>
                  </div>
                ) : (
                  /* Step 2: Security & Agreement */
                  <div className="space-y-6">
                    {/* Password Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        كلمة المرور
                      </label>
                      <div className="relative group">
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary-600 transition-colors">
                          <HiOutlineLockClosed size={20} />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="••••••••"
                          className={`w-full pr-12 px-4 py-4 border-2 ${
                            errors.password
                              ? "border-red-500"
                              : "border-gray-200 dark:border-gray-700 group-focus-within:border-primary-600"
                          } rounded-2xl focus:outline-none focus:border-primary-600 dark:bg-gray-700 dark:text-white transition-all`}
                          dir="ltr"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-600 transition-colors"
                        >
                          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </button>
                      </div>
                    </div>

                    {/* Password Strength */}
                    {formData.password && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-3"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            قوة كلمة المرور
                          </span>
                          <span className={`text-sm font-medium ${
                            getStrengthColor() === 'danger' ? 'text-red-500' :
                            getStrengthColor() === 'warning' ? 'text-yellow-500' :
                            getStrengthColor() === 'info' ? 'text-blue-500' :
                            'text-green-500'
                          }`}>
                            {getStrengthText()}
                          </span>
                        </div>
                        <Progress 
                          value={passwordStrength()} 
                          max={100} 
                          variant={getStrengthColor()} 
                          size="sm"
                          className="rounded-full"
                        />
                        
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { label: '٨ أحرف على الأقل', test: formData.password.length >= 8 },
                            { label: 'حرف كبير (A-Z)', test: /[A-Z]/.test(formData.password) },
                            { label: 'رقم (0-9)', test: /[0-9]/.test(formData.password) },
                            { label: 'رمز خاص (!@#)', test: /[^A-Za-z0-9]/.test(formData.password) }
                          ].map((req, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                req.test 
                                  ? 'bg-green-500' 
                                  : 'bg-gray-200 dark:bg-gray-700'
                              }`}>
                                {req.test && <FaCheck className="text-white text-xs" />}
                              </div>
                              <span className={`text-xs ${
                                req.test 
                                  ? 'text-gray-700 dark:text-gray-300' 
                                  : 'text-gray-400'
                              }`}>
                                {req.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Confirm Password Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        تأكيد كلمة المرور
                      </label>
                      <div className="relative group">
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary-600 transition-colors">
                          <HiOutlineLockClosed size={20} />
                        </div>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="••••••••"
                          className={`w-full pr-12 px-4 py-4 border-2 ${
                            errors.confirmPassword
                              ? "border-red-500"
                              : "border-gray-200 dark:border-gray-700 group-focus-within:border-primary-600"
                          } rounded-2xl focus:outline-none focus:border-primary-600 dark:bg-gray-700 dark:text-white transition-all`}
                          dir="ltr"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-600 transition-colors"
                        >
                          {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-500 flex items-center gap-1"
                        >
                          <span>•</span>
                          {errors.confirmPassword}
                        </motion.p>
                      )}
                    </div>

                    {/* Terms Agreement */}
                    <div className="space-y-2">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleChange}
                          className="w-5 h-5 mt-0.5 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500 focus:ring-offset-0"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-primary-600 transition-colors">
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
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-500 flex items-center gap-1"
                        >
                          <span>•</span>
                          {errors.agreeTerms}
                        </motion.p>
                      )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4 mt-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="lg" 
                        onClick={() => setStep(1)}
                        className="flex-1 py-4 text-lg font-medium rounded-2xl"
                      >
                        رجوع
                      </Button>
                      <Button 
                        type="submit" 
                        variant="primary" 
                        size="lg" 
                        loading={isLoading}
                        className="flex-1 py-4 text-lg font-medium rounded-2xl"
                      >
                        {isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
                      </Button>
                    </div>
                  </div>
                )}
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-6 bg-white dark:bg-gray-800 text-gray-500 text-sm font-medium">
                    أو التسجيل باستخدام
                  </span>
                </div>
              </div>

              {/* Social Signup */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center p-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all group"
                >
                  <FaGoogle className="text-red-500 text-2xl group-hover:scale-110 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center p-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
                >
                  <FaFacebook className="text-blue-600 text-2xl group-hover:scale-110 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center p-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
                >
                  <FaTwitter className="text-blue-400 text-2xl group-hover:scale-110 transition-transform" />
                </motion.button>
              </div>

              {/* Login Link */}
              <p className="text-center text-gray-600 dark:text-gray-400">
                لديك حساب بالفعل؟{' '}
                <Link 
                  to="/login" 
                  className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center gap-1 group"
                >
                  <span>تسجيل الدخول</span>
                  <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" />
                </Link>
              </p>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 mt-6"
            >
              {[
                { text: 'أكثر من ١٠٠٠ خدمة', icon: <FaRocket className="text-primary-600 text-xl" /> },
                { text: 'مقدمي خدمات معتمدين', icon: <MdVerified className="text-blue-600 text-xl" /> },
                { text: 'دفع آمن', icon: <MdSecurity className="text-green-600 text-xl" /> },
                { text: 'دعم فوري', icon: <FaHeadset className="text-amber-600 text-xl" /> }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center">
                    {benefit.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Hero Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="hidden lg:block"
          >
            <div className="relative sticky top-24">
              {/* Main Card */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 text-gray-900 dark:text-white shadow-xl border border-gray-100 dark:border-gray-700">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center">
                      <FaRocket className="text-primary-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">
                        انضم إلى
                      </h3>
                      <h2 className="text-2xl font-bold">سيرفس ماركت</h2>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    المنصة الأولى للخدمات الموثوقة في المملكة العربية السعودية. 
                    أكثر من ٥٠٠٠ مستخدم يثقون بنا.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-gray-100 dark:border-gray-700">
                  {[
                    { value: '٥٠٠٠+', label: 'مستخدم' },
                    { value: '١٠٠٠+', label: 'خدمة' },
                    { value: '٥٠٠+', label: 'مقدم' },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-primary-600">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {[
                    { text: 'انضم إلى مجتمع من المستفيدين', icon: <BsPersonCheck className="text-primary-600" /> },
                    { text: 'احصل على عروض حصرية', icon: <FaStar className="text-primary-600" /> },
                    { text: 'دعم فني على مدار الساعة', icon: <FaHeadset className="text-primary-600" /> }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <img
                        src="https://via.placeholder.com/48x48"
                        alt="user"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                    </div>
                    <div>
                      <div className="font-semibold">سارة أحمد</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        عميلة جديدة
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
                    "عملية التسجيل كانت سهلة وسريعة. وجدت أفضل مقدمي الخدمات بكل احترافية."
                  </p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-sm" />
                    ))}
                  </div>
                </div>

                {/* Trust Badge */}
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <MdVerified className="text-primary-600 text-lg" />
                  <span>منصة سعودية مرخصة ومعتمدة</span>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 -top-4 -right-4 w-32 h-32 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-2xl" />
              <div className="absolute -z-10 -bottom-4 -left-4 w-32 h-32 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Signup