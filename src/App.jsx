import { SafeIcon } from './components/SafeIcon';
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion'

// Animated counter hook
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime = null
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [isInView, end, duration])

  return { count, ref }
}

// Scroll animation component
const FadeInUp = ({ children, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

// Header Component
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Возможности', href: '#features' },
    { name: 'Демо', href: '#demo' },
    { name: 'Тарифы', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0F1212]/90 backdrop-blur-md border-b border-[#253FF6]/20' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#E1FF01] rounded-lg flex items-center justify-center">
              <span className="text-[#0F1212] font-black text-xl">W</span>
            </div>
            <span className="text-white font-bold text-xl hidden sm:block">Webly AI</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector(link.href).scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-gray-300 hover:text-[#E1FF01] transition-colors text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-white hover:text-[#E1FF01] transition-colors text-sm font-medium">
              Войти
            </button>
            <button className="bg-[#E1FF01] hover:bg-[#d4f200] text-[#0F1212] px-5 py-2.5 rounded-lg font-semibold text-sm transition-all transform hover:scale-105">
              Начать
            </button>
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <SafeIcon name={isMobileMenuOpen ? 'x' : 'menu'} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-[#253FF6]/20"
            >
              <nav className="flex flex-col gap-4 pt-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      setIsMobileMenuOpen(false)
                      document.querySelector(link.href).scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="text-gray-300 hover:text-[#E1FF01] transition-colors text-base font-medium"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

// Hero Section
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-mesh animate-gradient" style={{ backgroundSize: '400% 400%' }} />

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#253FF6]/20 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E1FF01]/10 rounded-full blur-3xl"
          animate={{ y: [0, 20, 0], scale: [1, 0.9, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Floating UI elements */}
        <motion.div
          className="absolute top-1/3 right-10 md:right-20 bg-[#0F1212]/80 backdrop-blur-md border border-[#253FF6]/30 rounded-xl p-4 animate-float hidden lg:block"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#E1FF01] rounded-full flex items-center justify-center">
              <SafeIcon name="zap" size={16} className="text-[#0F1212]" />
            </div>
            <div>
              <div className="text-xs text-gray-400">Сайт создан</div>
              <div className="text-sm font-semibold text-white">за 3 минуты</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 left-10 md:left-20 bg-[#0F1212]/80 backdrop-blur-md border border-[#E1FF01]/30 rounded-xl p-4 animate-float-delayed hidden lg:block"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#253FF6] rounded-full flex items-center justify-center">
              <SafeIcon name="sparkles" size={16} className="text-white" />
            </div>
            <div>
              <div className="text-xs text-gray-400">AI Генерация</div>
              <div className="text-sm font-semibold text-white">Активна</div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#253FF6]/20 border border-[#253FF6]/40 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-[#E1FF01] rounded-full animate-pulse" />
              <span className="text-sm text-gray-300">Новое: AI генерация изображений</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight tracking-tight">
              Создавайте сайты<br />
              <span className="text-[#E1FF01]">силой AI.</span> Мгновенно.
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Превратите идею в готовый веб-сайт за минуты. Без кода, без сложностей — только чистая магия искусственного интеллекта.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                className="w-full sm:w-auto bg-[#E1FF01] hover:bg-[#d4f200] text-[#0F1212] px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SafeIcon name="rocket" size={20} />
                Начать создавать
              </motion.button>
              <motion.button
                className="w-full sm:w-auto bg-transparent border border-[#253FF6] hover:border-[#E1FF01] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SafeIcon name="play" size={20} className="group-hover:text-[#E1FF01]" />
                Смотреть демо
              </motion.button>
            </div>

            <p className="text-sm text-gray-500 mt-4">Кредитная карта не требуется</p>
          </motion.div>
        </div>

        {/* Hero visual - User provided SVG */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[#253FF6]/30 blur-3xl rounded-full" />
            <img
              src="https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_347995964/user-svg-1.svg"
              alt="Webly AI Logo"
              className="relative w-32 h-32 md:w-48 md:h-48 drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Trust Bar
const TrustBar = () => {
  const { count: creatorsCount, ref: creatorsRef } = useCountUp(10000, 2000)
  const { count: sitesCount, ref: sitesRef } = useCountUp(50000, 2500)

  return (
    <section className="py-12 border-y border-[#253FF6]/10 bg-[#0F1212]/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <div ref={creatorsRef} className="text-center">
            <div className="text-4xl md:text-5xl font-black text-[#E1FF01] mb-1">
              {creatorsCount.toLocaleString()}+
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Создателей</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-[#253FF6]/30" />
          <div ref={sitesRef} className="text-center">
            <div className="text-4xl md:text-5xl font-black text-[#253FF6] mb-1">
              {sitesCount.toLocaleString()}+
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Сайтов создано</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-[#253FF6]/30" />
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-white mb-1">4.9</div>
            <div className="flex items-center justify-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <SafeIcon key={i} name="star" size={16} className="text-[#E1FF01] fill-[#E1FF01]" />
              ))}
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Рейтинг</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// What You Can Create Section
const WhatYouCanCreate = () => {
  const items = [
    { icon: 'monitor', title: 'Лендинги', desc: 'Высококонверсионные страницы' },
    { icon: 'shopping-cart', title: 'Интернет-магазины', desc: 'Полноценные e-commerce решения' },
    { icon: 'briefcase', title: 'Портфолио', desc: 'Профессиональные витрины работ' },
    { icon: 'server', title: 'SaaS платформы', desc: 'Сложные веб-приложения' },
  ]

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <FadeInUp>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0F1212] text-center mb-6">
            Создавайте что угодно.<br />
            <span className="text-[#253FF6]">Без ограничений.</span>
          </h2>
        </FadeInUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {items.map((item, index) => (
            <FadeInUp key={item.title} delay={index * 0.1}>
              <motion.div
                className="group bg-[#0F1212] rounded-2xl p-6 md:p-8 border border-transparent hover:border-[#E1FF01] transition-all cursor-pointer"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="w-14 h-14 bg-[#253FF6]/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#E1FF01]/20 transition-colors">
                  <SafeIcon name={item.icon} size={28} className="text-[#E1FF01]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// Features Section (Bento Grid)
const FeaturesSection = () => {
  const features = [
    {
      icon: 'sparkles',
      title: 'Генерация на основе AI',
      desc: 'Опишите своё видение, наблюдайте как оно материализуется в реальном времени',
      size: 'large',
    },
    {
      icon: 'layout-grid',
      title: 'Умная библиотека',
      desc: 'Готовые блоки, которые адаптируются под ваш бренд',
      size: 'small',
    },
    {
      icon: 'zap',
      title: 'Деплой в один клик',
      desc: 'От идеи до живого сайта за минуты',
      size: 'small',
    },
    {
      icon: 'smartphone',
      title: 'Адаптивность',
      desc: 'Идеально на любом экране, автоматически',
      size: 'large',
    },
  ]

  return (
    <section id="features" className="py-20 md:py-32 bg-[#0F1212]">
      <div className="container mx-auto px-4 md:px-6">
        <FadeInUp>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white text-center mb-6">
            AI, который <span className="text-[#E1FF01]">действительно</span><br />
            понимает
          </h2>
        </FadeInUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <FadeInUp key={feature.title} delay={index * 0.1}>
              <motion.div
                className={`bg-[#0F1212] border border-[#253FF6]/30 rounded-3xl p-8 hover:border-[#E1FF01]/50 transition-all group ${feature.size === 'large' ? 'md:col-span-1' : ''}`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-12 h-12 bg-[#253FF6]/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#E1FF01]/20 transition-colors">
                  <SafeIcon name={feature.icon} size={24} className="text-[#E1FF01]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>

                {/* Visual placeholder */}
                <div className="mt-6 h-32 bg-gradient-to-br from-[#253FF6]/10 to-[#E1FF01]/5 rounded-xl border border-[#253FF6]/20" />
              </motion.div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// Interactive Demo Section
const InteractiveDemo = () => {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const handleGenerate = () => {
    if (!prompt.trim()) return
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setShowResult(true)
    }, 2000)
  }

  return (
    <section id="demo" className="py-20 md:py-32 bg-[#0F1212]">
      <div className="container mx-auto px-4 md:px-6">
        <FadeInUp>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white text-center mb-6">
            Попробуйте <span className="text-[#E1FF01]">вживую</span>
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Введите описание вашего сайта и посмотрите, как AI создаёт его в реальном времени
          </p>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <div className="max-w-5xl mx-auto bg-[#0F1212] border border-[#253FF6]/30 rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Input Side */}
              <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-[#253FF6]/30">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <label className="text-sm text-gray-400 mb-2 block">Опишите ваш сайт</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Современный лендинг для стартапа в сфере финтех с синей темой..."
                  className="w-full h-40 bg-[#0F1212] border border-[#253FF6]/30 rounded-xl p-4 text-white placeholder-gray-600 focus:border-[#E1FF01] focus:outline-none transition-colors resize-none"
                />
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full mt-4 bg-[#253FF6] hover:bg-[#1a2fd4] disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Генерация...
                    </>
                  ) : (
                    <>
                      <SafeIcon name="sparkles" size={18} />
                      Сгенерировать
                    </>
                  )}
                </button>
              </div>

              {/* Result Side */}
              <div className="p-6 md:p-8 bg-[#0F1212] min-h-[300px] flex items-center justify-center relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {!showResult ? (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <div className="w-20 h-20 bg-[#253FF6]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <SafeIcon name="box" size={32} className="text-[#253FF6]" />
                      </div>
                      <p className="text-gray-500">Здесь появится результат</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full"
                    >
                      <div className="bg-white rounded-xl p-4 shadow-2xl">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                        <div className="h-3 bg-gray-100 rounded w-full mb-2" />
                        <div className="h-3 bg-gray-100 rounded w-5/6 mb-2" />
                        <div className="h-3 bg-gray-100 rounded w-4/6 mb-4" />
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-20 bg-[#253FF6]/10 rounded" />
                          <div className="h-20 bg-[#E1FF01]/20 rounded" />
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="h-8 w-24 bg-[#E1FF01] rounded" />
                          <div className="h-8 w-8 bg-gray-200 rounded-full" />
                        </div>
                      </div>
                      <p className="text-center text-[#E1FF01] mt-4 text-sm font-medium">
                        ✨ Сайт готов!
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Typing cursor effect */}
                {isGenerating && (
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="w-2 h-4 bg-[#E1FF01] animate-pulse" />
                    <span className="text-[#E1FF01] text-sm">AI пишет код...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}

// Resources Section
const ResourcesSection = () => {
  const resources = [
    {
      icon: 'book-open',
      title: 'Документация',
      desc: 'Полные руководства и справочник API',
      link: 'docs',
    },
    {
      icon: 'layout-grid',
      title: 'Галерея шаблонов',
      desc: 'Начните с проверенных дизайнов',
      link: 'templates',
    },
    {
      icon: 'users',
      title: 'Сообщество',
      desc: 'Присоединяйтесь к создателям по всему миру',
      link: 'community',
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <FadeInUp>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0F1212] text-center mb-6">
            Учитесь. Создавайте.<br />
            <span className="text-[#253FF6]">Масштабируйтесь.</span>
          </h2>
        </FadeInUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
          {resources.map((resource, index) => (
            <FadeInUp key={resource.title} delay={index * 0.1}>
              <motion.div
                className="group bg-[#0F1212] rounded-2xl p-8 border border-transparent hover:border-[#E1FF01] transition-all cursor-pointer h-full"
                whileHover={{ y: -4 }}
              >
                <div className="w-16 h-16 bg-[#253FF6]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#E1FF01]/20 transition-colors">
                  <SafeIcon name={resource.icon} size={32} className="text-[#E1FF01]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{resource.title}</h3>
                <p className="text-gray-400 mb-6">{resource.desc}</p>
                <div className="flex items-center gap-2 text-[#E1FF01] font-semibold group-hover:gap-3 transition-all">
                  Подробнее <SafeIcon name="arrow-right" size={18} />
                </div>
              </motion.div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// Pricing Section
const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false)

  const plans = [
    {
      name: 'Бесплатный',
      price: 0,
      period: '₽',
      description: 'Для знакомства с платформой',
      features: ['5 проектов', 'Базовые шаблоны', 'Поддержка сообщества', 'Брендинг Webly'],
      cta: 'Начать бесплатно',
      popular: false,
    },
    {
      name: 'Pro',
      price: isYearly ? 1990 : 2490,
      period: '₽/мес',
      description: 'Для профессионалов и команд',
      features: ['Неограниченные проекты', 'Продвинутые AI-функции', 'Свои домены', 'Приоритетная поддержка', 'Убрать брендинг'],
      cta: 'Выбрать план',
      popular: true,
    },
    {
      name: 'Enterprise',
      price,
      period: 'Индивидуально',
      description: 'Для крупных организаций',
      features: ['White-label', 'Выделенная поддержка', 'Кастомное обучение AI', 'SLA гарантии'],
      cta: 'Связаться',
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 md:py-32 bg-[#0F1212]">
      <div className="container mx-auto px-4 md:px-6">
        <FadeInUp>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white text-center mb-6">
            Простые, <span className="text-[#E1FF01]">прозрачные</span> тарифы
          </h2>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-medium ${!isYearly ? 'text-white' : 'text-gray-500'}`}>Месяц</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 bg-[#253FF6] rounded-full transition-colors"
            >
              <motion.div
                className="absolute top-1 left-1 w-5 h-5 bg-[#E1FF01] rounded-full"
                animate={{ x: isYearly ? 28 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-white' : 'text-gray-500'}`}>
              Год <span className="text-[#E1FF01] text-xs">-20%</span>
            </span>
          </div>
        </FadeInUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto items-center">
          {plans.map((plan, index) => (
            <FadeInUp key={plan.name} delay={index * 0.1}>
              <motion.div
                className={`relative bg-[#0F1212] rounded-3xl p-8 border transition-all ${plan.popular ? 'border-[#E1FF01] shadow-lg shadow-[#E1FF01]/20 md:scale-105' : 'border-[#253FF6]/30 hover:border-[#253FF6]'}`}
                whileHover={{ y: -4 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#E1FF01] text-[#0F1212] px-4 py-1 rounded-full text-sm font-bold">
                    ПОПУЛЯРНЫЙ
                  </div>
                )}

                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  {plan.price !== null ? (
                    <>
                      <span className="text-4xl font-black text-white">{plan.price.toLocaleString()}</span>
                      <span className="text-gray-400">{plan.period}</span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-white">{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-gray-300">
                      <SafeIcon name="check" size={18} className="text-[#253FF6] flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.popular ? 'bg-[#E1FF01] text-[#0F1212] hover:bg-[#d4f200]' : 'border border-[#253FF6] text-white hover:bg-[#253FF6]/20'}`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Александр К.',
      role: 'Основатель стартапа',
      text: 'Создал лендинг для нашего продукта за 2 часа. То, на что раньше уходила неделя.',
      metric: 'В 10 раз быстрее',
      rating: 5,
    },
    {
      name: 'Мария С.',
      role: 'Фрилансер',
      text: 'Клиенты в восторге от скорости. AI действительно понимает, что нужно.',
      metric: 'Создала 50+ сайтов',
      rating: 5,
    },
    {
      name: 'Дмитрий В.',
      role: 'Product Manager',
      text: 'Используем для быстрого тестирования гипотез. Экономим время и бюджет.',
      metric: 'Экономия 80% времени',
      rating: 5,
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <FadeInUp>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0F1212] text-center mb-6">
            Истории <span className="text-[#253FF6]">успеха</span>
          </h2>
        </FadeInUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <FadeInUp key={testimonial.name} delay={index * 0.1}>
              <motion.div
                className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100 h-full"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <SafeIcon key={i} name="star" size={16} className="text-[#E1FF01] fill-[#E1FF01]" />
                  ))}
                </div>
                <p className="text-[#0F1212] text-lg mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#253FF6] rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-[#0F1212]">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="text-[#253FF6] font-semibold text-sm">{testimonial.metric}</span>
                </div>
              </motion.div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// FAQ Section
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'Что такое Webly AI?',
      answer: 'Webly AI — это платформа для создания сайтов с помощью искусственного интеллекта. Просто опишите, что вам нужно, и AI сгенерирует готовый сайт за минуты.',
    },
    {
      question: 'Нужны ли навыки программирования?',
      answer: 'Нет, Webly AI создан для всех, независимо от технических навыков. Вы просто описываете желаемый результат текстом, а AI делает всё остальное.',
    },
    {
      question: 'Могу ли я использовать свой домен?',
      answer: 'Да, на тарифе Pro и выше вы можете подключить собственный домен. Бесплатный тариф включает поддомен webly.ai.',
    },
    {
      question: 'Как работает AI-генерация?',
      answer: 'Наша AI-модель анализирует ваше описание, выбирает оптимальную структуру, генерирует дизайн и код в реальном времени. Вы можете редактировать результат.',
    },
    {
      question: 'Что включено в бесплатный план?',
      answer: 'Бесплатный план включает 5 проектов, базовые шаблоны и поддержку сообщества. Это отличный способ попробовать платформу.',
    },
    {
      question: 'Могу ли я экспортировать код?',
      answer: 'Да, на тарифе Pro вы можете экспортировать чистый HTML/CSS/JS код вашего сайта и разместить его где угодно.',
    },
    {
      question: 'Есть ли политика возврата средств?',
      answer: 'Да, мы предоставляем 14-дневную гарантию возврата средств на всех платных тарифах. Если вам не понравится — вернём деньги.',
    },
    {
      question: 'Как получить поддержку?',
      answer: 'Бесплатные пользователи получают поддержку через сообщество. Платные тарифы включают email-поддержку и приоритетный чат.',
    },
  ]

  return (
    <section id="faq" className="py-20 md:py-32 bg-[#0F1212]">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <FadeInUp>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white text-center mb-6">
            Вопросы? <span className="text-[#E1FF01]">Ответы здесь.</span>
          </h2>
        </FadeInUp>

        <div className="mt-16 space-y-4">
          {faqs.map((faq, index) => (
            <FadeInUp key={index} delay={index * 0.05}>
              <div className="border-b border-[#253FF6]/20">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full py-6 flex items-center justify-between text-left group"
                >
                  <span className="text-lg font-semibold text-white group-hover:text-[#E1FF01] transition-colors pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <SafeIcon name="plus" size={20} className="text-[#E1FF01]" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// Final CTA Section
const FinalCTA = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInUp>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Готовы создавать <span className="text-[#E1FF01]">будущее?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Присоединяйтесь к тысячам создателей с AI
            </p>
            <motion.button
              className="bg-[#E1FF01] hover:bg-[#d4f200] text-[#0F1212] px-10 py-5 rounded-xl font-bold text-lg transition-all transform hover:scale-105 inline-flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon name="rocket" size={24} />
              Начать создавать бесплатно
            </motion.button>
            <p className="text-sm text-gray-400 mt-4">Кредитная карта не требуется</p>
          </FadeInUp>
        </div>
      </div>
    </section>
  )
}

// Footer
const Footer = () => {
  const footerLinks = {
    product: {
      title: 'Продукт',
      links: ['Возможности', 'Тарифы', 'Шаблоны', 'Обновления'],
    },
    resources: {
      title: 'Ресурсы',
      links: ['Документация', 'Справочник API', 'Туториалы', 'Сообщество'],
    },
    company: {
      title: 'Компания',
      links: ['О нас', 'Блог', 'Карьера', 'Контакты'],
    },
  }

  return (
    <footer className="bg-[#0F1212] border-t border-[#253FF6]/20 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#E1FF01] rounded-lg flex items-center justify-center">
                <span className="text-[#0F1212] font-black text-xl">W</span>
              </div>
              <span className="text-white font-bold text-xl">Webly AI</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Создавайте сайты силой искусственного интеллекта. Быстро, просто, красиво.
            </p>
            <div className="flex gap-4">
              {['twitter', 'github', 'linkedin'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 bg-[#253FF6]/20 rounded-lg flex items-center justify-center hover:bg-[#E1FF01]/20 transition-colors group">
                  <SafeIcon name={social} size={18} className="text-gray-400 group-hover:text-[#E1FF01]" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-[#E1FF01] transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#253FF6]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 Webly AI. Все права защищены.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-[#E1FF01] text-sm transition-colors">Политика конфиденциальности</a>
            <a href="#" className="text-gray-500 hover:text-[#E1FF01] text-sm transition-colors">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-[#0F1212] mobile-safe-container">
      <div className="grain-overlay" />
      <Header />
      <main>
        <HeroSection />
        <TrustBar />
        <WhatYouCanCreate />
        <FeaturesSection />
        <InteractiveDemo />
        <ResourcesSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}

export default App