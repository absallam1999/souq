import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaEnvelope, FaArrowLeft, FaShieldAlt, FaCheckCircle, FaArrowRight } from 'react-icons/fa'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Alert from '../../components/ui/Alert'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const validateEmail = () => {
    if (!email) {
      setError('البريد الإلكتروني مطلوب')
      return false
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('البريد الإلكتروني غير صحيح')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!validateEmail()) return
    
    setIsLoading(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsSubmitted(true)
      setSuccess(`تم إرسال رابط استعادة كلمة المرور إلى ${email}`)
    } catch (err) {
      setError('حدث خطأ. يرجى المحاولة مرة أخرى')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSuccess(`تم إعادة إرسال رابط استعادة كلمة المرور إلى ${email}`)
    } catch (err) {
      setError('حدث خطأ. يرجى المحاولة مرة أخرى')
    } finally {
      setIsLoading(false)
    }
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
            <FaArrowRight className="text-sm" />
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
            <FaShieldAlt className="text-4xl text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">نسيت كلمة المرور؟</h1>
          <p className="text-gray-600 dark:text-gray-400">
            لا تقلق! سنرسل لك رابطاً لإعادة تعيين كلمة المرور
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <Input
                  label="البريد الإلكتروني"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@domain.com"
                  icon={<FaEnvelope />}
                  error={error}
                  required
                />
              </div>

              {/* Help Text */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-400">
                  سنرسل لك رابطاً لإعادة تعيين كلمة المرور. الرابط صالح لمدة ٢٤ ساعة.
                </p>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                fullWidth
                loading={isLoading}
              >
                إرسال رابط الاستعادة
              </Button>
            </form>
          ) : (
            /* Success State */
            <div className="space-y-6">
              {success && (
                <Alert
                  type="success"
                  message="تم الإرسال بنجاح"
                  description={success}
                />
              )}

              <div className="text-center p-6">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="text-4xl text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">تحقق من بريدك الإلكتروني</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  لقد أرسلنا رابط استعادة كلمة المرور إلى
                </p>
                <p className="font-semibold text-primary-600 bg-primary-50 dark:bg-primary-900/20 py-2 px-4 rounded-lg inline-block">
                  {email}
                </p>
              </div>

              {/* Resend & Login Options */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  onClick={handleResend}
                  loading={isLoading}
                >
                  إعادة إرسال الرابط
                </Button>

                <Link to="/login">
                  <Button variant="ghost" size="lg" fullWidth>
                    العودة لتسجيل الدخول
                  </Button>
                </Link>
              </div>

              {/* Email Issues */}
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">لم تستلم البريد الإلكتروني؟</p>
                <button 
                  onClick={() => {
                    setEmail('')
                    setIsSubmitted(false)
                  }}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  جرب بريد إلكتروني آخر
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Security Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 space-y-3"
        >
          <div className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-green-600 text-xs">✓</span>
            </div>
            <p>تحقق من مجلد البريد الغير مرغوب (Spam) إذا لم تجد الرسالة</p>
          </div>
          <div className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-green-600 text-xs">✓</span>
            </div>
            <p>رابط استعادة كلمة المرور صالح لمدة ٢٤ ساعة فقط</p>
          </div>
          <div className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-green-600 text-xs">✓</span>
            </div>
            <p>إذا لم تصلك الرسالة، حاول مرة أخرى أو تواصل مع الدعم</p>
          </div>
        </motion.div>

        {/* Support Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400">
            تحتاج مساعدة؟{' '}
            <Link to="/contact" className="text-primary-600 hover:text-primary-700 font-medium">
              تواصل مع الدعم الفني
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default ForgotPassword