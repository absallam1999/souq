import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FaLock, FaEye, FaEyeSlash, FaCheckCircle, 
  FaExclamationTriangle, FaArrowLeft, FaShieldAlt 
} from 'react-icons/fa'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Alert from '../../components/ui/Alert'
import Progress from '../../components/ui/Progress'

const ResetPassword = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isTokenValid, setIsTokenValid] = useState(true)

  // Validate token on mount
  useEffect(() => {
    // Simulate token validation
    const validateToken = async () => {
      if (!token) {
        setIsTokenValid(false)
        setError('رابط إعادة تعيين كلمة المرور غير صالح')
        return
      }
      
      try {
        // Simulate API call to validate token
        await new Promise(resolve => setTimeout(resolve, 500))
        // Token is valid
        setIsTokenValid(true)
      } catch (err) {
        setIsTokenValid(false)
        setError('رابط إعادة تعيين كلمة المرور منتهي الصلاحية أو غير صالح')
      }
    }

    validateToken()
  }, [token])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const validateForm = () => {
    if (!formData.password) {
      setError('كلمة المرور مطلوبة')
      return false
    }
    if (formData.password.length < 8) {
      setError('كلمة المرور يجب أن تكون ٨ أحرف على الأقل')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('كلمة المرور غير متطابقة')
      return false
    }
    return true
  }

  const calculatePasswordStrength = () => {
    const password = formData.password
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25
    return strength
  }

  const getPasswordStrengthLabel = () => {
    const strength = calculatePasswordStrength()
    if (strength <= 25) return { label: 'ضعيفة', color: 'text-red-500' }
    if (strength <= 50) return { label: 'متوسطة', color: 'text-yellow-500' }
    if (strength <= 75) return { label: 'جيدة', color: 'text-blue-500' }
    return { label: 'قوية', color: 'text-green-500' }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSuccess(true)
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    } catch (err) {
      setError('حدث خطأ. يرجى المحاولة مرة أخرى')
    } finally {
      setIsLoading(false)
    }
  }

  // If token is invalid, show error state
  if (!isTokenValid) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FaExclamationTriangle className="text-5xl text-red-600" />
          </motion.div>
          
          <h1 className="text-2xl font-bold mb-4">رابط غير صالح</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || 'رابط إعادة تعيين كلمة المرور غير صالح أو منتهي الصلاحية'}
          </p>
          
          <div className="space-y-3">
            <Link to="/forgot-password">
              <Button variant="primary" size="lg" fullWidth>
                طلب رابط جديد
              </Button>
            </Link>
            
            <Link to="/login">
              <Button variant="outline" size="lg" fullWidth>
                العودة لتسجيل الدخول
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FaCheckCircle className="text-5xl text-green-600" />
          </motion.div>
          
          <h1 className="text-2xl font-bold mb-4">تم تغيير كلمة المرور بنجاح!</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            تم تغيير كلمة المرور بنجاح. سيتم تحويلك إلى صفحة تسجيل الدخول...
          </p>
          
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Back to Login Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <FaArrowLeft className="text-sm" />
            <span>العودة لتسجيل الدخول</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-block p-4 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
            <FaLock className="text-4xl text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">إعادة تعيين كلمة المرور</h1>
          <p className="text-gray-600 dark:text-gray-400">
            أدخل كلمة المرور الجديدة لحسابك
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Alert */}
            {error && (
              <Alert
                type="error"
                message="خطأ"
                description={error}
              />
            )}

            {/* New Password */}
            <div className="relative">
              <Input
                label="كلمة المرور الجديدة"
                type={showPassword.password ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                icon={<FaLock />}
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('password')}
                className="absolute left-3 top-[42px] text-gray-500 hover:text-gray-700"
              >
                {showPassword.password ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">قوة كلمة المرور</span>
                  <span className={`text-sm font-medium ${getPasswordStrengthLabel().color}`}>
                    {getPasswordStrengthLabel().label}
                  </span>
                </div>
                <Progress 
                  value={calculatePasswordStrength()} 
                  max={100} 
                  variant={
                    calculatePasswordStrength() <= 25 ? 'danger' :
                    calculatePasswordStrength() <= 50 ? 'warning' :
                    calculatePasswordStrength() <= 75 ? 'info' : 'success'
                  }
                  size="sm"
                />
                
                {/* Password Requirements */}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {[
                    { label: '٨ أحرف على الأقل', test: formData.password.length >= 8 },
                    { label: 'حرف كبير', test: /[A-Z]/.test(formData.password) },
                    { label: 'رقم', test: /[0-9]/.test(formData.password) },
                    { label: 'رمز خاص', test: /[^A-Za-z0-9]/.test(formData.password) }
                  ].map((req, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        req.test ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}>
                        {req.test && <FaCheckCircle className="text-white text-xs" />}
                      </div>
                      <span className={req.test ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Confirm Password */}
            <div className="relative">
              <Input
                label="تأكيد كلمة المرور"
                type={showPassword.confirm ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                icon={<FaLock />}
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute left-3 top-[42px] text-gray-500 hover:text-gray-700"
              >
                {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Password Match Indicator */}
            {formData.confirmPassword && (
              <div className={`flex items-center gap-2 text-sm ${
                formData.password === formData.confirmPassword 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  formData.password === formData.confirmPassword 
                    ? 'bg-green-500' 
                    : 'bg-red-500'
                }`}>
                  {formData.password === formData.confirmPassword ? (
                    <FaCheckCircle className="text-white text-xs" />
                  ) : (
                    <span className="text-white text-xs">!</span>
                  )}
                </div>
                <span>
                  {formData.password === formData.confirmPassword 
                    ? 'كلمة المرور متطابقة' 
                    : 'كلمة المرور غير متطابقة'}
                </span>
              </div>
            )}

            {/* Security Note */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-400 flex items-start gap-2">
                <FaShieldAlt className="mt-0.5 flex-shrink-0" />
                اختر كلمة مرور قوية تحتوي على أحرف كبيرة وصغيرة وأرقام ورموز خاصة للحفاظ على أمان حسابك.
              </p>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              fullWidth
              loading={isLoading}
              disabled={!formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword}
            >
              تغيير كلمة المرور
            </Button>
          </form>
        </motion.div>

        {/* Help Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 space-y-3 text-center"
        >
          <div>
            <Link 
              to="/forgot-password" 
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              طلب رابط جديد
            </Link>
          </div>
          <div>
            <Link 
              to="/contact" 
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 text-sm"
            >
              تواصل مع الدعم الفني
            </Link>
          </div>
        </motion.div>

        {/* Security Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-gray-500">
            باستخدامك لهذه الخدمة، أنت توافق على{' '}
            <Link to="/terms" className="text-primary-600 hover:text-primary-700">
              الشروط والأحكام
            </Link>
            {' '}و{' '}
            <Link to="/privacy" className="text-primary-600 hover:text-primary-700">
              سياسة الخصوصية
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default ResetPassword