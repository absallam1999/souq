import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBars,
  FaTimes,
  FaCube,
  FaUser,
  FaSignOutAlt,
  FaCog,
  FaHistory,
  FaHeart,
  FaQuestionCircle,
  FaSearch,
  FaShoppingCart,
  FaBell,
  FaChevronDown,
  FaStore,
  FaTag,
  FaHeadset,
  FaBlog,
  FaStar,
  FaGift,
  FaWallet,
  FaChartLine,
  FaLightbulb,
  FaTools,
  FaRegClock,
  FaRocket,
  FaBuilding,
} from 'react-icons/fa';
import ThemeToggle from '../ui/ThemeToggle';
import Dropdown, { DropdownItem } from '../ui/Dropdown';
import { ThemeContext } from '../../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const { isDark } = useContext(ThemeContext);
  const navbarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Mock user data
  const user = {
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    avatar: null,
    notifications: 3,
    cartItems: 2,
    membership: 'gold',
    walletBalance: 1250,
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check if current route matches any nav link or its children
  const isActiveRoute = (path) => {
    if (location.pathname === path) return true;
    
    // Handle nested routes for services
    if (path === '/services' && location.pathname.startsWith('/service/')) {
      return true;
    }
    
    // Handle nested routes for categories
    if (path === '/categories' && location.pathname.startsWith('/category/')) {
      return true;
    }
    
    return false;
  };

  // Navbar animation variants
  const navbarVariants = {
    hidden: { y: -100 },
    visible: {
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

const navbarBackgroundVariants = {
  scrolled: {
    backgroundColor: isDark ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(12px)',
    boxShadow: isDark 
      ? '0 8px 32px rgba(124, 58, 237, 0.15)' 
      : '0 8px 32px rgba(124, 58, 237, 0.1)',
    borderBottom: isDark 
      ? '1px solid rgba(124, 58, 237, 0.2)' 
      : '1px solid rgba(124, 58, 237, 0.1)',
    transition: { duration: 0.3 },
  },
  top: {
    backgroundColor: 'transparent',
    backdropFilter: 'blur(0px)',
    boxShadow: 'none',
    borderBottom: '1px solid transparent',
    transition: { duration: 0.3 },
  },
};

// Dark mode variants
const darkNavbarBackgroundVariants = {
  scrolled: {
    backgroundColor: 'rgba(17, 24, 39, 0.95)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 8px 32px rgba(124, 58, 237, 0.15)',
    borderBottom: '1px solid rgba(124, 58, 237, 0.2)',
    transition: { duration: 0.3 },
  },
  top: {
    backgroundColor: 'rgba(17, 24, 39, 0)',
    backdropFilter: 'blur(0px)',
    boxShadow: 'none',
    borderBottom: '1px solid transparent',
    transition: { duration: 0.3 },
  },
};

  const navLinks = [
    {
      name: 'الرئيسية',
      path: '/',
      dropdown: false,
    },
    {
      name: 'الخدمات',
      path: '/services',
      dropdown: 'services',
      badge: 'جديد',
      dropdownItems: [
        {
          category: 'للأعمال',
          gradient: 'from-primary-600 to-primary-500',
          items: [
            { label: 'تطوير مواقع', path: '/service/web-dev', icon: FaCube, description: 'مواقع وتطبيقات احترافية' },
            { label: 'تسويق إلكتروني', path: '/service/marketing', icon: FaChartLine, description: 'زيادة المبيعات والوصول' },
            { label: 'تصميم جرافيك', path: '/service/design', icon: FaStar, description: 'هويات بصرية متميزة' },
            { label: 'استشارات', path: '/service/consulting', icon: FaLightbulb, description: 'استشارات خبراء' },
          ],
        },
        {
          category: 'للأفراد',
          gradient: 'from-secondary-600 to-secondary-500',
          items: [
            { label: 'دورات تدريبية', path: '/service/courses', icon: FaHistory, description: 'تطوير المهارات' },
            { label: 'عقارات', path: '/service/commercial', icon: FaBuilding, description: 'مميزة ومخفضة' },
            { label: 'استشارات شخصية', path: '/service/personal', icon: FaUser, description: 'نصائح مخصصة' },
            { label: 'دعم فني', path: '/service/support', icon: FaTools, description: 'مساعدة تقنية فورية' },
          ],
        },
      ],
    },
    {
      name: 'التصنيفات',
      path: '/categories',
      dropdown: 'categories',
      dropdownItems: [
        {
          category: 'الأكثر طلباً',
          gradient: 'from-amber-600 to-amber-500',
          items: [
            { label: 'تقنية', path: '/category/tech', icon: FaCube, description: 'أحدث التقنيات' },
            { label: 'صحة وجمال', path: '/category/beauty', icon: FaHeart, description: 'عناية ورفاهية' },
            { label: 'منزل وحديقة', path: '/category/home', icon: FaStore, description: 'ديكور وتأثيث' },
          ],
        },
        {
          category: 'عروض خاصة',
          gradient: 'from-primary-600 to-amber-600',
          items: [
            { label: 'تخفيضات', path: '/category/sales', icon: FaTag, description: 'خصومات تصل ٧٠٪' },
            { label: 'جديد', path: '/category/new', icon: FaStar, description: 'أحدث الخدمات' },
            { label: 'الأكثر مبيعاً', path: '/category/bestsellers', icon: FaGift, description: 'خدمات مميزة' },
          ],
        },
      ],
    },
    {
      name: 'المدونة',
      path: '/blog',
      dropdown: false,
    },
    {
      name: 'اتصل بنا',
      path: '/contact',
      dropdown: false,
    },
  ];

  const userMenu = (
    <div className="py-2 min-w-[280px]">
      {/* User info header with gradient */}
      <div className="relative px-4 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-t-xl">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-2xl font-bold border-2 border-white/30">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1">
            <p className="font-bold text-lg">{user.name}</p>
            <p className="text-sm text-white/80">{user.email}</p>
          </div>
        </div>

        {/* Membership badge */}
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-lg shadow-lg">
            {user.membership === 'gold' ? 'عضو ذهبي' : ''}
          </span>
        </div>
      </div>

      {/* Wallet balance */}
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaWallet className="text-primary-600" />
            <span className="text-sm text-gray-600 dark:text-gray-400">رصيد المحفظة</span>
          </div>
          <span className="font-bold text-primary-600">{user.walletBalance.toLocaleString()} ر.س</span>
        </div>
      </div>

      {/* Menu items */}
      <div className="py-2">
        <DropdownItem onClick={() => navigate('/profile')} icon={<FaUser />}>
          الملف الشخصي
          <span className="mr-auto bg-primary-100 text-primary-600 text-xs px-2 py-1 rounded-full">مكتمل ٨٠٪</span>
        </DropdownItem>

        <DropdownItem onClick={() => navigate('/bookings')} icon={<FaHistory />}>
          حجوزاتي
          <span className="mr-auto bg-amber-100 text-amber-600 text-xs px-2 py-1 rounded-full">٣</span>
        </DropdownItem>

        <DropdownItem onClick={() => navigate('/favorites')} icon={<FaHeart />}>
          المفضلة
        </DropdownItem>

        <hr className="my-2 border-gray-100 dark:border-gray-800" />

        <DropdownItem onClick={() => navigate('/settings')} icon={<FaCog />}>
          الإعدادات
        </DropdownItem>

        <DropdownItem onClick={() => navigate('/help')} icon={<FaQuestionCircle />}>
          المساعدة
        </DropdownItem>

        <hr className="my-2 border-gray-100 dark:border-gray-800" />

        <DropdownItem onClick={() => setIsLoggedIn(false)} icon={<FaSignOutAlt />} danger>
          تسجيل خروج
        </DropdownItem>
      </div>
    </div>
  );

  const notificationsMenu = (
    <div className="py-2 min-w-[340px]">
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
        <h4 className="font-bold text-gray-900 dark:text-white">الإشعارات</h4>
        <button className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors">
          تحديد الكل كمقروء
        </button>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {[1, 2, 3].map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors relative group"
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white">
                  <FaBell />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">تحديث جديد في الخدمات</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  تم إضافة خدمات جديدة يمكنك الاستفادة منها الآن
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <FaRegClock className="text-xs text-gray-400" />
                  <span className="text-xs text-gray-400">منذ ٥ دقائق</span>
                </div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                <FaTimes className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800">
        <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors">
          عرض كل الإشعارات
        </button>
      </div>
    </div>
  );

  const cartMenu = (
    <div className="py-2 min-w-[340px]">
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
        <h4 className="font-bold text-gray-900 dark:text-white">سلة التسوق</h4>
        <span className="text-sm bg-primary-100 text-primary-600 px-2 py-1 rounded-full">
          {user.cartItems} عناصر
        </span>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {[1, 2].map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center">
                <FaCube className="text-2xl text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">منتج تجريبي {item}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">الكمية: 1</span>
                  <span className="text-xs text-gray-300">•</span>
                  <span className="text-xs text-green-600">متوفر</span>
                </div>
                <p className="text-sm font-bold text-primary-600 mt-1">٢٩٩ ر.س</p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                <FaTimes className="text-gray-400 hover:text-red-500" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-600 dark:text-gray-400">المجموع</span>
          <div className="text-left">
            <span className="font-bold text-lg text-gray-900 dark:text-white">٥٩٨ ر.س</span>
            <span className="text-xs text-gray-500 block">شامل الضريبة</span>
          </div>
        </div>
        <button
          onClick={() => navigate('/checkout')}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          إتمام الشراء
        </button>
      </div>
    </div>
  );

  // Search Modal Component
  const SearchModal = () => {
    if (!showSearchModal) return null;
    return (
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowSearchModal(false)} />
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="relative z-10 w-full max-w-2xl mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <FaSearch className="text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="ابحث عن خدمات، منتجات، تصنيفات..."
                className="flex-1 bg-transparent border-none outline-none text-lg text-gray-900 dark:text-white placeholder-gray-400"
                autoFocus
              />
              <button
                onClick={() => setShowSearchModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
              >
                <FaTimes className="text-gray-500" />
              </button>
            </div>
          </div>
          <div className="p-4">
            <p className="text-center text-gray-500">سيتم إضافة نتائج البحث قريباً...</p>
          </div>
        </motion.div>
      </div>
    );
  };

return (
    <>
   <motion.nav
      ref={navbarRef}
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-50"
    >
<motion.div
  variants={navbarBackgroundVariants}
  animate={isScrolled ? 'scrolled' : 'top'}
  className="transition-all duration-300"
>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30"
                  >
                    <FaCube className="text-white text-xl" />
                  </motion.div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl bg-gradient-to-l from-primary-600 to-primary-400 bg-clip-text text-transparent leading-tight">
                    سيرفس ماركت
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">خدمات احترافية</span>
                </div>
              </Link>

              {/* Desktop Menu  */}
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <div
                    key={link.path}
                    className="relative"
                    onMouseEnter={() => link.dropdown && setActiveDropdown(link.dropdown)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {link.dropdown ? (
                      <>
                        <button
                          className={`
                            flex items-center gap-2 px-5 py-2.5 rounded-xl text-gray-700 dark:text-gray-200 
                            hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-all
                            hover:bg-primary-50 dark:hover:bg-primary-900/20
                            ${activeDropdown === link.dropdown ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20' : ''}
                            ${isActiveRoute(link.path) ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20' : ''}
                            relative group
                          `}
                        >
                          <span className="text-base">{link.name}</span>
                          {link.badge && (
                            <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-amber-500 text-white text-[10px] rounded-full animate-pulse">
                              {link.badge}
                            </span>
                          )}
                          <FaChevronDown className={`text-[10px] mr-1 transition-transform duration-300 ${activeDropdown === link.dropdown ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {activeDropdown === link.dropdown && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-full right-0 mt-2 w-[680px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
                            >
                              <div className="grid grid-cols-2 gap-6 p-6">
                                {link.dropdownItems.map((column, idx) => (
                                  <div key={idx}>
                                    <div className={`bg-gradient-to-r ${column.gradient} p-3 rounded-xl mb-4`}>
                                      <h3 className="font-bold text-white text-sm">{column.category}</h3>
                                    </div>
                                    <div className="space-y-1">
                                      {column.items.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                          <Link
                                            key={item.path}
                                            to={item.path}
                                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all group"
                                            onClick={() => setActiveDropdown(null)}
                                          >
                                            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                                              <Icon className="text-sm" />
                                            </div>
                                            <div className="flex-1">
                                              <span className="text-gray-900 dark:text-white text-sm font-medium group-hover:text-primary-600 transition-colors">
                                                {item.label}
                                              </span>
                                              {item.description && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                  {item.description}
                                                </p>
                                              )}
                                            </div>
                                          </Link>
                                        );
                                      })}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={link.path}
                        className={`
                          flex items-center px-5 py-2.5 rounded-xl text-gray-700 dark:text-gray-200 
                          hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-all
                          hover:bg-primary-50 dark:hover:bg-primary-900/20
                          ${isActiveRoute(link.path) ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20' : ''}
                        `}
                      >
                        <span className="text-base">{link.name}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Right Section - Actions */}
              <div className="flex items-center gap-2">
                {/* Search Icon - Desktop & Mobile */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSearchModal(true)}
                  className="p-2.5 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"
                  title="بحث"
                >
                  <FaSearch className="text-xl" />
                </motion.button>

                {/* Theme Toggle */}
                <div className="hidden sm:block">
                  <ThemeToggle />
                </div>

                {/* Notifications */}
                {isLoggedIn && (
                  <Dropdown
                    trigger={
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="relative p-2.5 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"
                      >
                        <FaBell className="text-xl" />
                        {user.notifications > 0 && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-red-400 text-white text-xs rounded-full flex items-center justify-center shadow-lg"
                          >
                            {user.notifications}
                          </motion.span>
                        )}
                      </motion.button>
                    }
                    placement="bottom-left"
                  >
                    {notificationsMenu}
                  </Dropdown>
                )}

                {/* Cart */}
                <Dropdown
                  trigger={
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="relative p-2.5 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"
                    >
                      <FaShoppingCart className="text-xl" />
                      {user.cartItems > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg"
                        >
                          {user.cartItems}
                        </motion.span>
                      )}
                    </motion.button>
                  }
                  placement="bottom-left"
                >
                  {cartMenu}
                </Dropdown>

                {/* User Menu */}
                {isLoggedIn ? (
                  <Dropdown
                    trigger={
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group"
                      >
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-xl transition-shadow">
                            {user.name.charAt(0)}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                        </div>
                        <div className="hidden lg:block text-right">
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            {user.name.split(' ')[0]}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <FaWallet className="text-primary-500" />
                            <span>{user.walletBalance.toLocaleString()} ر.س</span>
                          </div>
                        </div>
                        <FaChevronDown className="hidden lg:block text-xs text-gray-400 group-hover:text-primary-600 transition-colors" />
                      </motion.button>
                    }
                    placement="bottom-left"
                  >
                    {userMenu}
                  </Dropdown>
                ) : (
                  <div className="hidden sm:flex items-center gap-2">
                    <Link to="/login">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-5 py-2.5 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                      >
                        دخول
                      </motion.button>
                    </Link>
                    <Link to="/signup">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                      >
                        إنشاء حساب
                      </motion.button>
                    </Link>
                  </div>
                )}

                {/* Mobile Menu Button */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden p-2.5 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"
                >
                  <AnimatePresence mode="wait">
                    {isOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90 }}
                        animate={{ rotate: 0 }}
                        exit={{ rotate: 90 }}
                      >
                        <FaTimes className="text-xl" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90 }}
                        animate={{ rotate: 0 }}
                        exit={{ rotate: -90 }}
                      >
                        <FaBars className="text-xl" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
            >
              <div className="py-4 px-4 sm:px-6 lg:px-8">
                {/* Mobile Menu Items */}
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <div key={link.path}>
                      {link.dropdown ? (
                        <>
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === link.dropdown ? null : link.dropdown)}
                            className="flex items-center justify-between w-full p-3 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl font-medium transition-all"
                          >
                            <span className="flex items-center gap-3">
                              <span>{link.name}</span>
                              {link.badge && (
                                <span className="px-2 py-0.5 bg-amber-500 text-white text-xs rounded-full">
                                  {link.badge}
                                </span>
                              )}
                            </span>
                            <FaChevronDown className={`transition-transform duration-300 ${activeDropdown === link.dropdown ? 'rotate-180' : ''}`} />
                          </button>

                          <AnimatePresence>
                            {activeDropdown === link.dropdown && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="pr-4 pb-2 space-y-3 mr-4 border-r-2 border-primary-200 dark:border-primary-800">
                                  {link.dropdownItems.map((column) => (
                                    <div key={column.category} className="pt-2">
                                      <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">
                                        {column.category}
                                      </h4>
                                      <div className="space-y-1">
                                        {column.items.map((item) => {
                                          const Icon = item.icon;
                                          return (
                                            <Link
                                              key={item.path}
                                              to={item.path}
                                              onClick={() => setIsOpen(false)}
                                              className="flex items-center gap-3 p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg transition-colors"
                                            >
                                              <Icon className="text-base text-primary-500" />
                                              <div>
                                                <span className="text-sm font-medium">{item.label}</span>
                                                {item.description && (
                                                  <p className="text-xs text-gray-500">{item.description}</p>
                                                )}
                                              </div>
                                            </Link>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                          className={`
                            flex items-center p-3 rounded-xl font-medium transition-all
                            ${isActiveRoute(link.path)
                              ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20'
                              : 'text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }
                          `}
                        >
                          <span>{link.name}</span>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                {/* Mobile Auth */}
                {!isLoggedIn && (
                  <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <button className="w-full px-4 py-3 border-2 border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 font-medium transition-colors">
                        دخول
                      </button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsOpen(false)}>
                      <button className="w-full px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white rounded-xl font-medium transition-all shadow-lg">
                        إنشاء حساب
                      </button>
                    </Link>
                  </div>
                )}

                {/* Mobile Theme Toggle */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <span className="text-gray-700 dark:text-gray-200 font-medium">الوضع الليلي</span>
                    <ThemeToggle />
                  </div>
                </div>

                {/* Mobile Wallet Info (if logged in) */}
                {isLoggedIn && (
                  <div className="mt-4 p-3 bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FaWallet className="text-xl" />
                        <span className="font-medium">رصيد المحفظة</span>
                      </div>
                      <span className="font-bold">{user.walletBalance.toLocaleString()} ر.س</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Search Modal */}
      <AnimatePresence>
        {showSearchModal && <SearchModal />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;