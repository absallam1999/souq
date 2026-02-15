import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaFacebook,
  FaTwitter,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaCreditCard,
  FaCheckCircle,
  FaHeadset,
  FaArrowRight,
  FaUserPlus,
  FaChartLine,
  FaRocket,
  FaCrown,
  FaGem,
  FaStar,
  FaRegEnvelope,
  FaRegUser,
  FaMobile,
  FaRegClock,
  FaRegCheckCircle,
  FaArrowLeft,
  FaUserCircle,
} from "react-icons/fa";
import {
  MdSecurity,
  MdVerified,
  MdOutlineDeliveryDining,
  MdEmail,
} from "react-icons/md";
import {
  RiCustomerServiceLine,
  RiShieldStarLine,
  RiLockPasswordLine,
} from "react-icons/ri";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { BsShieldCheck, BsPersonCheck } from "react-icons/bs";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
    }
    if (!formData.password) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (formData.password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون ٦ أحرف على الأقل";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        console.log("Login data:", formData);
      }, 1500);
    } else {
      setErrors(newErrors);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

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

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Login Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md mx-auto lg:mx-0"
          >
            {/* Logo and Header */}
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                تسجيل الدخول
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                مرحباً بعودتك! يرجى إدخال بياناتك للوصول إلى حسابك
              </p>
            </motion.div>

            {/* Login Form Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
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
                      type={showPassword ? "text" : "password"}
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
                      {showPassword ? (
                        <FaEyeSlash size={20} />
                      ) : (
                        <FaEye size={20} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center gap-1"
                    >
                      <span>•</span>
                      {errors.password}
                    </motion.p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="w-5 h-5 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500 focus:ring-offset-0"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-primary-600 transition-colors">
                      تذكرني
                    </span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                  >
                    نسيت كلمة المرور؟
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={isLoading}
                  className="mt-4 py-4 text-lg font-medium rounded-2xl"
                >
                  {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-6 bg-white dark:bg-gray-800 text-gray-500 text-sm font-medium">
                    أو الدخول باستخدام
                  </span>
                </div>
              </div>

              {/* Social Login */}
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

              {/* Register Link */}
              <p className="text-center text-gray-600 dark:text-gray-400">
                ليس لديك حساب؟{" "}
                <Link
                  to="/signup"
                  className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center gap-2 group"
                >
                  <span>إنشاء حساب جديد</span>
                  <FaUserPlus className="text-sm group-hover:scale-110 transition-transform" />
                </Link>
              </p>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 mt-6"
            >
              {[
                {
                  text: "دعم 24/7",
                  icon: (
                    <RiCustomerServiceLine className="text-primary-600 text-xl" />
                  ),
                },
                {
                  text: "دفع آمن",
                  icon: <MdSecurity className="text-green-600 text-xl" />,
                },
                {
                  text: "ضمان الاسترداد",
                  icon: <RiShieldStarLine className="text-amber-600 text-xl" />,
                },
                {
                  text: "خدمات موثقة",
                  icon: <MdVerified className="text-blue-600 text-xl" />,
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {feature.text}
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
            <div className="relative">
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
                        مرحباً بك في
                      </h3>
                      <h2 className="text-2xl font-bold">سيرفس ماركت</h2>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    المنصة الأولى للخدمات الموثوقة في المملكة العربية السعودية.
                    نربطك بأفضل مقدمي الخدمات بكل سهولة وأمان.
                  </p>
                </div>

                {/* Stats - Minimal */}
                <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-gray-100 dark:border-gray-700">
                  {[
                    { value: "٥٠٠٠+", label: "مستخدم" },
                    { value: "١٠٠٠+", label: "خدمة" },
                    { value: "٥٠٠+", label: "مقدم" },
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

                {/* Features - Clean List */}
                <div className="space-y-4 mb-8">
                  {[
                    {
                      text: "مقدمي خدمة موثقين",
                      icon: <BsShieldCheck className="text-primary-600" />,
                    },
                    {
                      text: "دفع آمن ومشفر",
                      icon: <FaShieldAlt className="text-primary-600" />,
                    },
                    {
                      text: "دعم فني على مدار الساعة",
                      icon: <FaHeadset className="text-primary-600" />,
                    },
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

                {/* Testimonial - Simple Card */}
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
                      <div className="font-semibold">أحمد محمد</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        مصمم جرافيك
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
                    "منصة ممتازة! ساعدتني في الوصول لعملاء جدد وتطوير أعمالي
                    بشكل احترافي."
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

              {/* Simple Decorative Elements */}
              <div className="absolute -z-10 -top-4 -right-4 w-32 h-32 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-2xl" />
              <div className="absolute -z-10 -bottom-4 -left-4 w-32 h-32 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
