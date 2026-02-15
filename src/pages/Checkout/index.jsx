import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaApple, FaCcVisa, FaCcMastercard, FaLock,
  FaShieldAlt, FaCheckCircle, FaCreditCard, 
  FaMobile, FaWallet, FaPercent, FaTag,
  FaArrowLeft, FaInfoCircle, FaRegClock,
  FaStar, FaUser, FaCalendar, FaMapMarkerAlt
} from 'react-icons/fa'
import { SiStripe, SiPaypal, SiGooglepay } from 'react-icons/si'
import { MdPayment, MdSecurity } from 'react-icons/md'
import { RiSecurePaymentLine, RiBankCardLine } from 'react-icons/ri'

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [saveCard, setSaveCard] = useState(false)
  const [showDiscountInput, setShowDiscountInput] = useState(false)
  const [discountCode, setDiscountCode] = useState('')
  const [discountApplied, setDiscountApplied] = useState(false)
  const [couponError, setCouponError] = useState('')
  const [processing, setProcessing] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  })

  const bookingSummary = {
    id: 'BK-2024-001',
    service: 'خدمة تنظيم المنازل الاحترافية',
    provider: {
      name: 'سارة أحمد',
      avatar: null,
      rating: 4.9,
      reviews: 124,
      completed: 356
    },
    location: 'الرياض - حي النرجس',
    date: '24 أكتوبر 2024',
    time: '10:00 صباحاً',
    duration: '3 ساعات',
    subtotal: 324.00,
    fee: 15.00,
    discount: 50.25,
    total: 385.25,
    currency: 'ر.س'
  }

  const paymentMethods = [
    {
      id: 'card',
      name: 'بطاقة ائتمان / مدى',
      icon: <RiBankCardLine className="text-2xl" />,
      subIcons: [<FaCcVisa key="visa" />, <FaCcMastercard key="master" />],
      description: 'ادفع باستخدام فيزا أو ماستركارد أو مدى'
    },
    {
      id: 'apple',
      name: 'Apple Pay',
      icon: <FaApple className="text-2xl" />,
      description: 'ادفع بسرعة وأمان باستخدام Apple Pay'
    },
    {
      id: 'google',
      name: 'Google Pay',
      icon: <SiGooglepay className="text-2xl" />,
      description: 'ادفع بنقرة واحدة باستخدام Google Pay'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: <SiPaypal className="text-2xl text-blue-600" />,
      description: 'ادفع بأمان باستخدام حساب PayPal'
    }
  ]

  const handleApplyDiscount = () => {
    if (discountCode.toLowerCase() === 'SAVE15') {
      setDiscountApplied(true)
      setCouponError('')
    } else {
      setCouponError('كود الخصم غير صالح')
    }
  }

  const handlePayment = async () => {
    setProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false)
      // Handle success/error
    }, 2000)
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold bg-gradient-to-l from-primary-600 to-primary-400 bg-clip-text text-transparent">
              إتمام الحجز
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
              <span>من</span>
              <span className="text-gray-900 dark:text-white font-medium">3 خطوات</span>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: '66%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-l from-primary-600 to-primary-400 rounded-full"
            />
          </div>
          
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-primary-600 font-medium">تفاصيل الحجز</span>
            <span className="text-primary-600 font-medium">الدفع</span>
            <span className="text-gray-400">التأكيد</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Summary Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {bookingSummary.service.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {bookingSummary.service}
                    </h2>
                    <span className="text-sm bg-primary-100 dark:bg-primary-900/30 text-primary-600 px-3 py-1 rounded-full">
                      {bookingSummary.id}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">مقدم الخدمة</div>
                      <div className="font-medium flex items-center gap-1">
                        <FaUser className="text-gray-400 text-xs" />
                        {bookingSummary.provider.name}
                      </div>
                      <div className="flex items-center gap-1 text-sm mt-1">
                        <FaStar className="text-yellow-400 text-xs" />
                        <span>{bookingSummary.provider.rating}</span>
                        <span className="text-gray-500 text-xs">({bookingSummary.provider.reviews})</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">الموقع</div>
                      <div className="font-medium flex items-center gap-1">
                        <FaMapMarkerAlt className="text-gray-400 text-xs" />
                        {bookingSummary.location}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">التاريخ والوقت</div>
                      <div className="font-medium flex items-center gap-1">
                        <FaCalendar className="text-gray-400 text-xs" />
                        {bookingSummary.date}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <FaRegClock className="text-xs" />
                        {bookingSummary.time} ({bookingSummary.duration})
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">رقم الحجز</div>
                      <div className="font-mono text-sm">{bookingSummary.id}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Methods */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-2 mb-6">
                <MdPayment className="text-2xl text-primary-600" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">طريقة الدفع</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`relative p-4 rounded-xl border-2 transition-all text-right ${
                      paymentMethod === method.id
                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 shadow-lg'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    {paymentMethod === method.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center"
                      >
                        <FaCheckCircle className="text-white text-sm" />
                      </motion.div>
                    )}
                    
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`text-2xl ${
                        paymentMethod === method.id ? 'text-primary-600' : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {method.icon}
                      </div>
                      <div>
                        <div className="font-medium">{method.name}</div>
                        {method.subIcons && (
                          <div className="flex gap-1 mt-1 text-gray-600 dark:text-gray-400">
                            {method.subIcons.map((icon, idx) => (
                              <span key={idx} className="text-lg">{icon}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 pr-10">
                      {method.description}
                    </p>
                  </button>
                ))}
              </div>

              {/* Card Details Form */}
              <AnimatePresence mode="wait">
                {paymentMethod === 'card' && (
                  <motion.div
                    key="card-form"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-2">اسم حامل البطاقة</label>
                          <input
                            type="text"
                            value={cardDetails.name}
                            onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                            placeholder="الاسم على البطاقة"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                            dir="ltr"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-2">رقم البطاقة</label>
                          <div className="relative">
                            <input
                              type="text"
                              value={cardDetails.number}
                              onChange={(e) => setCardDetails({...cardDetails, number: formatCardNumber(e.target.value)})}
                              placeholder="0000 0000 0000 0000"
                              maxLength="19"
                              className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                              dir="ltr"
                            />
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex gap-1">
                              <FaCcVisa className="text-blue-600 text-xl" />
                              <FaCcMastercard className="text-orange-600 text-xl" />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">تاريخ الانتهاء</label>
                          <input
                            type="text"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                            placeholder="MM / YY"
                            maxLength="5"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                            dir="ltr"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">رمز الأمان (CVV)</label>
                          <input
                            type="password"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                            placeholder="123"
                            maxLength="3"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                            dir="ltr"
                          />
                        </div>
                      </div>

                      <label className="flex items-center gap-2 mt-4 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={saveCard}
                          onChange={(e) => setSaveCard(e.target.checked)}
                          className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-600 transition-colors">
                          حفظ تفاصيل البطاقة لعمليات الدفع المستقبلية
                        </span>
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Apple Pay Button */}
              {paymentMethod === 'apple' && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full bg-black text-white py-4 rounded-xl flex items-center justify-center gap-2 text-lg font-medium hover:bg-gray-900 transition-colors"
                >
                  <FaApple className="text-2xl" />
                  الدفع باستخدام Apple Pay
                </motion.button>
              )}

              {/* Google Pay Button */}
              {paymentMethod === 'google' && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full bg-black text-white py-4 rounded-xl flex items-center justify-center gap-2 text-lg font-medium hover:bg-gray-900 transition-colors"
                >
                  <SiGooglepay className="text-2xl" />
                  الدفع باستخدام Google Pay
                </motion.button>
              )}

              {/* PayPal Button */}
              {paymentMethod === 'paypal' && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full bg-[#0070ba] text-white py-4 rounded-xl flex items-center justify-center gap-2 text-lg font-medium hover:bg-[#005ea6] transition-colors"
                >
                  <SiPaypal className="text-2xl" />
                  الدفع باستخدام PayPal
                </motion.button>
              )}
            </motion.div>

            {/* Security & Trust Badges */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-green-100 dark:border-green-900/30"
            >
              <div className="flex items-center gap-2 mb-4">
                <MdSecurity className="text-2xl text-green-600" />
                <h3 className="font-semibold text-gray-900 dark:text-white">ضمان أمان الدفع</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FaLock className="text-green-600 text-xl" />
                  </div>
                  <p className="text-sm font-medium">مشفّر بالكامل</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SSL 256-bit</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                    <SiStripe className="text-blue-600 text-xl" />
                  </div>
                  <p className="text-sm font-medium">معالج Stripe</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">معتمد عالمياً</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FaShieldAlt className="text-purple-600 text-xl" />
                  </div>
                  <p className="text-sm font-medium">PCI Compliant</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">المعايير الأمنية</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                    <RiSecurePaymentLine className="text-orange-600 text-xl" />
                  </div>
                  <p className="text-sm font-medium">حماية المشتري</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">استرداد 100%</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-24 space-y-6"
            >
              {/* Summary Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FaWallet className="text-primary-600" />
                  ملخص الحجز
                </h2>
                
                <div className="space-y-4">
                  {/* Service Details */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">{bookingSummary.service}</div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <FaUser className="text-gray-400" />
                        <span>{bookingSummary.provider.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCalendar className="text-gray-400" />
                        <span>{bookingSummary.date} - {bookingSummary.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600 dark:text-gray-400">المجموع الفرعي</span>
                      <span className="font-medium">{bookingSummary.subtotal.toFixed(2)} {bookingSummary.currency}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600 dark:text-gray-400">رسوم الخدمة</span>
                      <span className="font-medium">{bookingSummary.fee.toFixed(2)} {bookingSummary.currency}</span>
                    </div>
                    
                    {/* Discount Section */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                      <button
                        onClick={() => setShowDiscountInput(!showDiscountInput)}
                        className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        <FaTag className="text-sm" />
                        <span className="text-sm font-medium">هل لديك كود خصم؟</span>
                      </button>
                      
                      <AnimatePresence>
                        {showDiscountInput && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mt-3"
                          >
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                                placeholder="أدخل كود الخصم"
                                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700"
                              />
                              <button
                                onClick={handleApplyDiscount}
                                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                              >
                                تطبيق
                              </button>
                            </div>
                            {couponError && (
                              <p className="text-sm text-red-500 mt-1">{couponError}</p>
                            )}
                            {discountApplied && (
                              <p className="text-sm text-green-500 mt-1 flex items-center gap-1">
                                <FaCheckCircle /> تم تطبيق الخصم بنجاح!
                              </p>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {discountApplied && (
                        <div className="flex justify-between py-2 text-green-600">
                          <span>خصم (15%)</span>
                          <span>-{bookingSummary.discount.toFixed(2)} {bookingSummary.currency}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between py-3 text-lg font-bold border-t-2 border-gray-200 dark:border-gray-700">
                      <span>الإجمالي</span>
                      <span className="text-primary-600">
                        {discountApplied 
                          ? (bookingSummary.total).toFixed(2) 
                          : (bookingSummary.subtotal + bookingSummary.fee).toFixed(2)
                        } {bookingSummary.currency}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={processing}
                  className="w-full mt-6 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      جاري معالجة الدفع...
                    </>
                  ) : (
                    <>
                      تأكيد الحجز والدفع
                      <FaArrowLeft className="mr-2" />
                    </>
                  )}
                </button>

                {/* Trust Badge */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
                    <FaLock className="text-green-500" />
                    معلومات الدفع مشفرة وآمنة 100%
                  </p>
                </div>
              </div>

              {/* Support Card */}
              <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 border border-primary-100 dark:border-primary-800">
                <div className="flex items-start gap-3">
                  <FaInfoCircle className="text-primary-600 text-xl flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">تحتاج مساعدة؟</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      فريق الدعم متاح على مدار الساعة لمساعدتك
                    </p>
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      تواصل مع الدعم
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout