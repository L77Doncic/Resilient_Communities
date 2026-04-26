import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const { t } = useAppContext();

  return (
    <div className="bg-[#FAF9F6] text-[#333] font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-center items-start">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="bg-white/90 backdrop-blur-sm p-8 md:p-12 max-w-2xl"
          >
            <p className="text-[12px] md:text-[13px] tracking-[0.28em] text-[#222]/80 font-serif mb-6">
              {t('SMART EMERGENCY', '智慧应急')}
            </p>
            <h2 className="text-[28px] md:text-[44px] font-bold leading-[1.35] tracking-widest mb-8 text-[#222]">
              {t('城市、自然与我们。', '城市、自然与我们。')}<br />
              {t('共筑气候韧性。', '共筑气候韧性。')}
            </h2>
            <p className="text-[15px] md:text-[16px] leading-[2.1] text-[#555] max-w-xl">
              {t(
                'Climate change is not just a future threat; it is happening now. By understanding the risks and preparing together, we can build a community that not only survives but thrives in the face of adversity.',
                '气候变化不仅是未来的威胁，它正在发生。通过了解风险并共同准备，我们可以建立一个不仅能生存下来，而且能在逆境中繁荣发展的社区。'
              )}
            </p>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
          <span className="text-white text-[12px] tracking-[0.2em] mb-4 font-serif">SCROLL</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-[1px] h-12 bg-white"
          />
        </div>
      </section>

      {/* 2. LEAD SECTION */}
      <section className="py-24 md:py-40 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[12px] tracking-[0.28em] text-[#222]/70 font-serif mb-6">
            {t('A COMMUNITY THAT CONNECTS', '连接彼此的社区')}
          </p>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="text-[24px] md:text-[36px] font-bold leading-[1.8] tracking-widest text-[#222] mb-10"
          >
            {t('不仅仅是居住的地方。', '不仅仅是居住的地方。')}<br />
            {t('一个能够适应变化的社区。', '一个能够适应变化的社区。')}
          </motion.h3>
        </div>
      </section>

      {/* 3. EVENT INFORMATION (LATEST UPDATES) */}
      <section className="py-24 px-6 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-[#ddd] pb-6">
            <div>
              <p className="text-[12px] tracking-[0.28em] text-[#222]/70 font-serif mb-3">EVENT INFORMATION</p>
              <h2 className="text-[32px] md:text-[48px] font-serif tracking-widest text-[#222] leading-none">LATEST UPDATES</h2>
              <p className="text-[14px] tracking-[0.2em] text-[#666] mt-4">{t('最新动态', '最新动态')}</p>
            </div>
            <Link to="#" className="hidden md:flex items-center gap-2 text-[14px] tracking-widest hover:text-[#499051] transition-colors">
              VIEW ALL <ArrowRight size={16} />
            </Link>
          </div>

          <div className="flex items-end justify-between mb-8">
            <div>
              <h3 className="text-[18px] font-bold tracking-widest text-[#222]">PICK UP</h3>
              <p className="text-[12px] tracking-[0.22em] text-[#666] mt-2">{t('注目动态', '注目动态')}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { date: '2026.05.10', tag: 'EVENT', title: t('National Disaster Prevention Day Special Exhibition Opens', '全国防灾减灾日特展正式开幕'), img: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=800&auto=format&fit=crop' },
              { date: '2026.05.08', tag: 'NOTICE', title: t('Community Emergency Drill Scheduled for This Weekend', '本周末将举行社区应急疏散演练'), img: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?q=80&w=800&auto=format&fit=crop' },
              { date: '2026.05.05', tag: 'REPORT', title: t('Q1 Climate Resilience Assessment Report Released', '第一季度气候韧性评估报告发布'), img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden aspect-[4/3] mb-6">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-[13px] text-[#888] font-serif tracking-wider">{item.date}</span>
                  <span className="text-[11px] border border-[#222] px-2 py-1 tracking-widest">{item.tag}</span>
                </div>
                <h3 className="text-[16px] font-bold leading-[1.6] group-hover:text-[#499051] transition-colors">{item.title}</h3>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 md:hidden text-center">
            <Link to="#" className="inline-flex items-center gap-2 text-[14px] tracking-widest border-b border-[#222] pb-1">
              VIEW ALL <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. EVENT REPORT (COMMUNITY STORIES) */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-[#ddd] pb-6">
            <div>
              <p className="text-[12px] tracking-[0.28em] text-[#222]/70 font-serif mb-3">EVENT REPORT</p>
              <h2 className="text-[32px] md:text-[48px] font-serif tracking-widest text-[#222] leading-none">COMMUNITY STORIES</h2>
              <p className="text-[14px] tracking-[0.2em] text-[#666] mt-4">{t('社区故事', '社区故事')}</p>
            </div>
            <Link to="#" className="hidden md:flex items-center gap-2 text-[14px] tracking-widest hover:text-[#499051] transition-colors">
              VIEW ALL <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            {[
              { vol: 'Vol.01', title: t('The 15-Minute Warning', '关键的15分钟'), desc: t('How the early warning system saved our neighborhood.', '预警系统如何在山洪暴发时拯救了我们的街区。'), img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop' },
              { vol: 'Vol.02', title: t('Building the Firebreak', '共筑防火带'), desc: t('Volunteers came together to clear dry brush.', '社区志愿者齐心协力，在火灾季节前清理干燥灌木。'), img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop' }
            ].map((story, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="group cursor-pointer flex flex-col md:flex-row gap-6 items-center"
              >
                <div className="w-full md:w-1/2 overflow-hidden aspect-square rounded-full">
                  <img src={story.img} alt={story.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <div className="text-[14px] font-serif tracking-widest text-[#499051] mb-2">{story.vol}</div>
                  <h3 className="text-[20px] font-bold leading-[1.5] mb-3">{story.title}</h3>
                  <p className="text-[14px] text-[#666] leading-[1.8]">{story.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EVENT & SERVICE (INTERACTIVE MODULES) */}
      <section className="py-24 px-6 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[12px] tracking-[0.28em] text-[#222]/70 font-serif mb-3">EVENT &amp; SERVICE</p>
            <h2 className="text-[32px] md:text-[48px] font-serif tracking-widest text-[#222] leading-none mb-4">INTERACTIVE MODULES</h2>
            <p className="text-[14px] tracking-[0.2em] text-[#666]">{t('互动学习模块', '互动学习模块')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: t('SIMULATION', '社区模拟器'), link: '/simulation', img: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=800&auto=format&fit=crop' },
              { title: t('EMERGENCY KIT', '应急物资包'), link: '/kit', img: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?q=80&w=800&auto=format&fit=crop' },
              { title: t('MINI GAMES', '互动游戏'), link: '/games', img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop' }
            ].map((mod, i) => (
              <Link to={mod.link} key={i} className="group relative block overflow-hidden aspect-[3/4]">
                <img src={mod.img} alt={mod.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                  <h3 className="text-[24px] font-bold tracking-widest mb-6">{mod.title}</h3>
                  <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. INTERVIEW (EXPERT INSIGHTS) */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-[#ddd] pb-6">
            <div>
              <p className="text-[12px] tracking-[0.28em] text-[#222]/70 font-serif mb-3">INTERVIEW</p>
              <h2 className="text-[32px] md:text-[48px] font-serif tracking-widest text-[#222] leading-none">EXPERT INSIGHTS</h2>
              <p className="text-[14px] tracking-[0.2em] text-[#666] mt-4">{t('专家见解', '专家见解')}</p>
            </div>
            <Link to="#" className="hidden md:flex items-center gap-2 text-[14px] tracking-widest hover:text-[#499051] transition-colors">
              VIEW ALL <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                name: t('Dr. Sarah Chen', '陈莎拉 博士'),
                role: t('Climate Resilience Researcher', '气候韧性研究员'),
                quote: t('"Community preparedness is our first line of defense against extreme weather."', '"社区准备是我们抵御极端天气的第一道防线。"'),
                img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
              },
              {
                name: t('Marcus Johnson', '马库斯·约翰逊'),
                role: t('Emergency Management Director', '应急管理主任'),
                quote: t('"A resilient city is built on the foundation of informed and connected citizens."', '"一个有韧性的城市建立在知情和相互联系的市民基础之上。"'),
                img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop'
              }
            ].map((expert, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="group cursor-pointer flex flex-col md:flex-row gap-6 items-center bg-[#FAF9F6] p-6"
              >
                <div className="w-32 h-32 shrink-0 overflow-hidden rounded-full">
                  <img src={expert.img} alt={expert.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <p className="text-[16px] font-bold leading-[1.6] mb-4 text-[#222] italic">{expert.quote}</p>
                  <p className="text-[14px] font-bold text-[#499051] mb-1">{expert.name}</p>
                  <p className="text-[12px] text-[#666]">{expert.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SAFETY & FAQ */}
      <section className="py-24 px-6 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          {/* SAFETY */}
          <div>
            <div className="mb-10 border-b border-[#ddd] pb-4">
              <p className="text-[12px] tracking-[0.28em] text-[#222]/70 font-serif mb-3">SAFETY</p>
              <h2 className="text-[28px] font-serif tracking-widest text-[#222]">SAFETY GUIDELINES</h2>
              <p className="text-[12px] tracking-[0.2em] text-[#666] mt-2">{t('安全与防灾指南', '安全与防灾指南')}</p>
            </div>
            <div className="relative aspect-video overflow-hidden mb-6 group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=800&auto=format&fit=crop" alt="Safety" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                <span className="text-white tracking-widest font-bold border border-white px-6 py-2">{t('VIEW DETAILS', '查看详情')}</span>
              </div>
            </div>
            <p className="text-[14px] leading-[1.8] text-[#555]">
              {t('Learn about our comprehensive safety protocols and how to prepare your home and family for various natural disasters.', '了解我们全面的安全协议，以及如何为您的家庭和家人应对各种自然灾害做好准备。')}
            </p>
          </div>

          {/* FAQ */}
          <div>
            <div className="mb-10 border-b border-[#ddd] pb-4">
              <p className="text-[12px] tracking-[0.28em] text-[#222]/70 font-serif mb-3">FAQ</p>
              <h2 className="text-[28px] font-serif tracking-widest text-[#222]">FAQ</h2>
              <p className="text-[12px] tracking-[0.2em] text-[#666] mt-2">{t('常见问题', '常见问题')}</p>
            </div>
            <div className="space-y-4">
              {[
                { q: t('What is a resilient community?', '什么是韧性社区？'), a: t('A community that can withstand and recover from disasters.', '能够抵御灾害并从中恢复的社区。') },
                { q: t('How to join drills?', '如何参与演练？'), a: t('Check the Latest Updates section.', '请查看最新动态板块。') },
                { q: t('What is in the 72h kit?', '72小时应急包里有什么？'), a: t('Water, food, flashlight, etc.', '水、食物、手电筒等。') }
              ].map((faq, i) => (
                <details key={i} className="group border-b border-[#eee] pb-4">
                  <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-[15px] text-[#222]">
                    <span>{faq.q}</span>
                    <span className="text-[#499051] text-[20px] group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-[#666] text-[14px] mt-4 leading-[1.6] pl-4 border-l-2 border-[#499051]">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
            <div className="mt-8">
              <Link to="#" className="inline-flex items-center gap-2 text-[14px] tracking-widest hover:text-[#499051] transition-colors">
                VIEW ALL FAQ <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ANNUAL CALENDAR */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-12">
            <p className="text-[12px] tracking-[0.28em] text-[#222]/70 font-serif mb-3">{t('ANNUAL PLAN', '年度计划')}</p>
            <h2 className="text-[32px] md:text-[48px] font-serif tracking-widest text-[#222] leading-none mb-4">ANNUAL CALENDAR</h2>
            <p className="text-[14px] tracking-[0.2em] text-[#666]">{t('年度演练与活动日历', '年度演练与活动日历')}</p>
          </div>
          
          <div className="overflow-x-auto pb-8">
            <div className="flex justify-between min-w-[800px] gap-4">
              {[
                { month: 'MAY', title: t('Disaster Prevention Week', '防灾减灾周') },
                { month: 'JUN', title: t('Flood Drill', '防汛演练') },
                { month: 'SEP', title: t('Earthquake Drill', '地震疏散演练') },
                { month: 'NOV', title: t('Fire Safety Month', '消防安全月') }
              ].map((cal, i) => (
                <div key={i} className="flex-1 bg-[#FAF9F6] p-8 border-t-4 border-[#499051] hover:-translate-y-2 transition-transform duration-300">
                  <div className="text-[24px] font-serif font-bold text-[#222] mb-4">{cal.month}</div>
                  <div className="text-[14px] font-bold text-[#499051]">{cal.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
