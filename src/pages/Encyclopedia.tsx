import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Droplets, Wind, Flame, ChevronRight, AlertTriangle, Info, Waves, ThermometerSun, Trees } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import PageHero from '../components/PageHero';

export default function Encyclopedia() {
  const { t } = useAppContext();
  const [activeTab, setActiveTab] = useState('earthquake');

  const disasters = [
    {
      id: 'earthquake',
      icon: Activity,
      color: 'text-pomegranate-400',
      bgColor: 'bg-pomegranate-400/10',
      borderColor: 'border-pomegranate-400',
      titleEn: 'Earthquakes',
      titleZh: '地震灾害',
      descEn: 'Sudden shaking of the ground caused by the passage of seismic waves through Earth\'s rocks.',
      descZh: '地壳快速释放能量过程中造成的振动，期间会产生地震波的一种自然现象。',
      factsEn: [
        { title: 'Drop, Cover, Hold On', desc: 'The most reliable and safe method to protect yourself during an earthquake.' },
        { title: 'Stay Away from Windows', desc: 'Glass can shatter and cause severe injuries.' },
        { title: 'Emergency Kit', desc: 'Keep a 72-hour survival kit ready at all times.' }
      ],
      factsZh: [
        { title: '伏地、遮挡、手抓牢', desc: '地震发生时最可靠、最安全的自我保护方法。' },
        { title: '远离窗户和外墙', desc: '玻璃可能破碎飞溅造成严重伤害。' },
        { title: '常备应急包', desc: '家中应常备能维持72小时生存的应急物资。' }
      ],
      caseStudyEn: '2008 Sichuan Earthquake: An 8.0 magnitude earthquake struck Wenchuan, China. It caused over 87,000 deaths and an estimated $150 billion in economic losses, highlighting the need for earthquake-resistant infrastructure.',
      caseStudyZh: '2008年汶川大地震：中国四川省汶川县发生里氏8.0级特大地震。造成超过8.7万人遇难，直接经济损失高达8451亿元人民币，凸显了建筑抗震设防的极端重要性。',
      scienceEn: 'Earthquakes are measured using the moment magnitude scale. An increase of 1.0 means 32 times more energy is released.',
      scienceZh: '地震通常使用矩震级来衡量。震级每增加1.0级，释放的能量就会增加约32倍。'
    },
    {
      id: 'flood',
      icon: Droplets,
      color: 'text-slushie-500',
      bgColor: 'bg-slushie-500/10',
      borderColor: 'border-slushie-500',
      titleEn: 'Floods & Waterlogging',
      titleZh: '洪涝与城市内涝',
      descEn: 'An overflow of water that submerges land that is usually dry, often caused by heavy rainfall.',
      descZh: '由于强降雨、融雪等原因导致水位急剧上涨，造成淹没的自然灾害。',
      factsEn: [
        { title: 'Move to Higher Ground', desc: 'Immediately move to higher elevations if a flood warning is issued.' },
        { title: 'Do Not Walk Through Water', desc: 'Just 6 inches of moving water can knock you down.' },
        { title: 'Turn Off Utilities', desc: 'Disconnect electricity and gas to prevent secondary disasters.' }
      ],
      factsZh: [
        { title: '向高处转移', desc: '收到洪水预警后，立即向高地、楼顶等安全区域转移。' },
        { title: '切勿涉水行走', desc: '仅15厘米深的流水就足以让人跌倒。' },
        { title: '切断水电煤气', desc: '防止触电和燃气泄漏引发次生灾害。' }
      ],
      caseStudyEn: '2021 Henan Floods: Extreme rainfall in July 2021 caused severe flooding in Zhengzhou, China. It resulted in 398 deaths and over $18.9 billion in economic damages, overwhelming the city\'s drainage systems.',
      caseStudyZh: '2021年河南特大暴雨：2021年7月，极端强降雨导致郑州等地发生严重内涝。造成398人遇难，直接经济损失1142.69亿元，城市排水系统面临巨大考验。',
      scienceEn: 'Urban waterlogging is often exacerbated by impermeable surfaces like concrete, which prevent water from soaking into the ground.',
      scienceZh: '城市内涝通常由于混凝土等不透水地面的增加而加剧，这些地面阻止了雨水渗入地下。'
    },
    {
      id: 'typhoon',
      icon: Wind,
      color: 'text-ube-500',
      bgColor: 'bg-ube-500/10',
      borderColor: 'border-ube-500',
      titleEn: 'Typhoons',
      titleZh: '台风灾害',
      descEn: 'A mature tropical cyclone that develops between 180° and 100°E in the Northern Hemisphere.',
      descZh: '发生在西北太平洋和南海海域的强热带气旋，常伴有狂风暴雨。',
      factsEn: [
        { title: 'Secure Loose Items', desc: 'Bring outdoor furniture and potted plants inside.' },
        { title: 'Stay Indoors', desc: 'Do not go out during the eye of the storm; winds will return.' },
        { title: 'Tape Windows', desc: 'Use tape in a criss-cross pattern to prevent glass shattering.' }
      ],
      factsZh: [
        { title: '加固易坠物品', desc: '将阳台花盆、室外悬挂物移至室内。' },
        { title: '留在室内', desc: '台风眼经过时风平浪静，但狂风很快会再次来袭，切勿外出。' },
        { title: '胶带贴窗', desc: '在窗玻璃上贴"米"字形胶带，防止玻璃破碎飞溅。' }
      ],
      caseStudyEn: 'Typhoon Haiyan (2013): One of the most powerful tropical cyclones ever recorded. It devastated the Philippines, causing over 6,300 deaths and $2.98 billion in damages, largely due to massive storm surges.',
      caseStudyZh: '2013年超强台风“海燕”：有记录以来最强的热带气旋之一。它重创了菲律宾，引发的巨大风暴潮导致超过6300人死亡，经济损失达29.8亿美元。',
      scienceEn: 'The eye of a typhoon is a region of mostly calm weather at the center of strong tropical cyclones.',
      scienceZh: '台风眼是强热带气旋中心的一个天气相对平静的区域，但周围环绕着最狂暴的风雨。'
    },
    {
      id: 'fire',
      icon: Flame,
      color: 'text-lemon-600',
      bgColor: 'bg-lemon-400/20',
      borderColor: 'border-lemon-500',
      titleEn: 'Urban Fires',
      titleZh: '城市火灾',
      descEn: 'Uncontrolled fires in urban settings, often spreading rapidly through buildings.',
      descZh: '在城市建筑密集区发生的失去控制的燃烧，蔓延速度快，危害大。',
      factsEn: [
        { title: 'Stay Low', desc: 'Smoke rises, so stay close to the floor where the air is cleaner.' },
        { title: 'Check Doors', desc: 'Feel doors with the back of your hand before opening them.' },
        { title: 'Do Not Use Elevators', desc: 'Always use the stairs during a fire evacuation.' }
      ],
      factsZh: [
        { title: '弯腰低姿逃生', desc: '浓烟向上升腾，贴近地面空气相对清新。' },
        { title: '触摸门把手', desc: '开门前用手背试探温度，若发烫切勿开门。' },
        { title: '严禁乘坐电梯', desc: '火灾时极易断电，电梯会变成"夺命烟囱"。' }
      ],
      caseStudyEn: '2010 Shanghai High-Rise Fire: A fire destroyed a 28-story apartment building in Shanghai, killing 58 people. It was caused by accidental ignition of polyurethane insulation materials by unlicensed welders.',
      caseStudyZh: '2010年上海“11·15”特别重大火灾：一栋28层高层住宅发生大火，导致58人遇难。起火原因系无证电焊工违规操作，引燃了聚氨酯保温材料。',
      scienceEn: 'Most fire-related deaths are caused by smoke inhalation, not burns. Smoke contains toxic gases like carbon monoxide.',
      scienceZh: '大多数火灾致死原因不是烧伤，而是吸入有毒烟雾。烟雾中含有大量一氧化碳等致命气体。'
    },
    {
      id: 'wildfire',
      icon: Trees,
      color: 'text-lemon-700',
      bgColor: 'bg-lemon-500/20',
      borderColor: 'border-lemon-700',
      titleEn: 'Wildfires',
      titleZh: '森林野火',
      descEn: 'Unplanned, uncontrolled fires in areas of combustible vegetation starting in rural areas.',
      descZh: '在林区或野外发生的失去控制的火灾，蔓延迅速且极难扑灭。',
      factsEn: [
        { title: 'Evacuate Early', desc: 'Leave immediately when ordered; wildfires can move faster than you can run.' },
        { title: 'Clear Vegetation', desc: 'Create a defensible space around your home by clearing dry brush.' },
        { title: 'N95 Masks', desc: 'Use N95 masks to protect your lungs from harmful smoke particles.' }
      ],
      factsZh: [
        { title: '尽早撤离', desc: '接到撤离命令后立即离开，野火的蔓延速度可能超过人的奔跑速度。' },
        { title: '清理植被', desc: '清理房屋周围的枯枝落叶，建立防火隔离带。' },
        { title: '佩戴防颗粒口罩', desc: '使用防颗粒口罩保护肺部免受有害烟雾颗粒的伤害。' }
      ],
      caseStudyEn: '2019-2020 Australian Bushfires: Known as the "Black Summer", these fires burned an estimated 24.3 million hectares, killed 33 people, and resulted in the death or displacement of nearly 3 billion animals.',
      caseStudyZh: '2019-2020年澳大利亚丛林大火：被称为“黑色夏天”，大火烧毁了约2430万公顷土地，导致33人死亡，近30亿只动物死亡或流离失所。',
      scienceEn: 'Wildfires can create their own weather systems, including "fire tornadoes" (fire whirls) and pyrocumulonimbus clouds that generate lightning.',
      scienceZh: '大型野火可以创造自己的天气系统，包括“火龙卷”和能产生闪电的火积雨云，从而引发新的火灾。'
    },
    {
      id: 'tsunami',
      icon: Waves,
      color: 'text-blueberry-800',
      bgColor: 'bg-slushie-800/10',
      borderColor: 'border-blueberry-800',
      titleEn: 'Tsunamis',
      titleZh: '海啸',
      descEn: 'A series of massive ocean waves typically caused by underwater earthquakes or volcanic eruptions.',
      descZh: '通常由海底地震或火山爆发引起的一系列巨大的海洋波浪。',
      factsEn: [
        { title: 'Recognize the Signs', desc: 'A rapidly receding ocean is a natural warning sign of an approaching tsunami.' },
        { title: 'Seek High Ground', desc: 'Move inland and to higher ground immediately; do not wait for official warnings.' },
        { title: 'Do Not Go to the Beach', desc: 'If you can see the wave, you are too close to escape it.' }
      ],
      factsZh: [
        { title: '识别预警信号', desc: '海水突然快速退潮是海啸即将来临的自然警告信号。' },
        { title: '向高处转移', desc: '立即向内陆和高地转移，不要等待官方警报。' },
        { title: '切勿前往海滩', desc: '如果你能看到海浪，说明你离得太近，已经无法逃脱。' }
      ],
      caseStudyEn: '2004 Indian Ocean Tsunami: Triggered by a 9.1 magnitude earthquake, massive waves struck coasts across 14 countries, killing an estimated 227,898 people, making it one of the deadliest natural disasters in history.',
      caseStudyZh: '2004年印度洋海啸：由9.1级海底地震引发，巨浪袭击了14个国家的海岸，造成约22.7万人死亡，是历史上最致命的自然灾害之一。',
      scienceEn: 'In the deep ocean, tsunami waves can travel as fast as a jet plane (over 800 km/h) but are only a few inches high. They grow dramatically in height as they reach shallow coastal waters.',
      scienceZh: '在深海中，海啸波的传播速度可达喷气式飞机的速度（超过800公里/小时），但高度只有几厘米。当它们到达浅水海岸时，高度会急剧增加。'
    },
    {
      id: 'heatwave',
      icon: ThermometerSun,
      color: 'text-pomegranate-400',
      bgColor: 'bg-pomegranate-400/10',
      borderColor: 'border-pomegranate-400',
      titleEn: 'Heatwaves',
      titleZh: '极端高温',
      descEn: 'Prolonged periods of excessively hot weather, which may be accompanied by high humidity.',
      descZh: '持续的异常炎热天气，通常伴随着高湿度，对人体健康构成严重威胁。',
      factsEn: [
        { title: 'Stay Hydrated', desc: 'Drink plenty of water even if you do not feel thirsty.' },
        { title: 'Avoid Peak Sun', desc: 'Stay indoors during the hottest parts of the day (10 AM to 4 PM).' },
        { title: 'Check on Vulnerable People', desc: 'Regularly check on the elderly, children, and those without air conditioning.' }
      ],
      factsZh: [
        { title: '保持水分', desc: '即使不觉得口渴也要多喝水，避免脱水。' },
        { title: '避开烈日', desc: '在一天中最热的时段（上午10点至下午4点）尽量留在室内。' },
        { title: '关注弱势群体', desc: '定期探望老人、儿童和没有空调设备的人群。' }
      ],
      caseStudyEn: '2003 European Heatwave: A massive heatwave hit Europe in the summer of 2003, leading to an estimated 70,000 heat-related deaths, primarily among the elderly. It highlighted the silent lethality of extreme heat.',
      caseStudyZh: '2003年欧洲热浪：2003年夏天，一场罕见的热浪席卷欧洲，导致约7万人因高温死亡，其中大多数是老年人。这凸显了极端高温的“无声致命性”。',
      scienceEn: 'Heat is often called the "silent killer" because it causes more deaths annually than floods, hurricanes, and tornadoes combined, primarily through heatstroke and exacerbating underlying conditions.',
      scienceZh: '高温常被称为“无声的杀手”，因为它每年造成的死亡人数超过洪水、飓风和龙卷风的总和，主要通过热射病和加剧基础疾病致死。'
    }
  ];

  const activeData = disasters.find(d => d.id === activeTab) || disasters[0];

  return (
    <div className="bg-warm-cream">
      <PageHero
        eyebrow={t('Knowledge Base', '科普知识库')}
        title={t('Disaster Encyclopedia', '防灾减灾百科')}
        description={t('Understand disaster mechanisms, real-world cases, and the actions that reduce harm before, during, and after an emergency.', '理解灾害机理、真实案例与关键行动，在灾前、灾中、灾后降低风险。')}
        image="/common/img/event/resilience-brief-02.png"
        icon={Info}
      />

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-4 h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {disasters.map((disaster) => {
            const Icon = disaster.icon;
            const isActive = activeTab === disaster.id;
            return (
              <motion.button
                key={disaster.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(disaster.id)}
                className={`w-full text-left p-6 rounded-lg border transition-all duration-300 flex items-center justify-between ${
                  isActive 
                    ? `bg-pure-white ${disaster.borderColor} shadow-lg scale-105 z-10 relative` 
                    : 'bg-pure-white/50 border-oat-border hover:bg-pure-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-md flex items-center justify-center ${isActive ? disaster.bgColor : 'bg-oat-light'} ${isActive ? disaster.color : 'text-warm-silver'}`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className={`text-[20px] font-semibold ${isActive ? 'text-clay-black' : 'text-warm-silver'}`}>
                      {t(disaster.titleEn, disaster.titleZh)}
                    </h3>
                  </div>
                </div>
                <ChevronRight className={isActive ? disaster.color : 'text-transparent'} />
              </motion.button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-pure-white border border-oat-border rounded-lg p-8 md:p-12 clay-shadow relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${activeData.bgColor} ${activeData.color}`}>
                    <activeData.icon size={32} />
                  </div>
                  <h2 className="text-[36px] font-semibold text-clay-black">
                    {t(activeData.titleEn, activeData.titleZh)}
                  </h2>
                </div>

                <p className="text-[18px] text-warm-charcoal leading-[1.6] mb-10">
                  {t(activeData.descEn, activeData.descZh)}
                </p>

                <div className="bg-oat-light/30 border border-oat-border rounded-lg p-6 mb-10">
                  <h3 className="text-[18px] font-semibold text-clay-black mb-3 flex items-center gap-2">
                    <Activity size={18} className={activeData.color} />
                    {t('Real-World Case Study', '真实案例分析')}
                  </h3>
                  <p className="text-warm-charcoal leading-[1.6]">
                    {t(activeData.caseStudyEn, activeData.caseStudyZh)}
                  </p>
                </div>

                <h3 className="text-[20px] font-semibold text-clay-black mb-6 flex items-center gap-2">
                  <AlertTriangle size={20} className="text-pomegranate-400" />
                  {t('Key Survival Guidelines', '关键生存指南')}
                </h3>

                <div className="grid md:grid-cols-3 gap-6">
                  {(t(activeData.factsEn, activeData.factsZh) as {title: string, desc: string}[]).map((fact, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="bg-oat-light/50 border border-oat-border rounded-lg p-6 hover:bg-pure-white hover:shadow-md transition-all"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-4 font-bold text-[14px] ${activeData.bgColor} ${activeData.color}`}>
                        {index + 1}
                      </div>
                      <h4 className="font-semibold text-clay-black mb-2">{fact.title}</h4>
                      <p className="text-[14px] text-warm-charcoal leading-[1.5]">{fact.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 bg-clay-black text-pure-white rounded-lg p-8 flex items-start gap-4">
                  <Info className="text-matcha-300 shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-[18px] mb-2">{t('Scientific Fact', '科学小知识')}</h4>
                    <p className="text-warm-silver leading-[1.6]">
                      {t(activeData.scienceEn, activeData.scienceZh)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      </div>
    </div>
  );
}
