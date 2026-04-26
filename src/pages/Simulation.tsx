import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, CloudRain, Wind, Activity, DollarSign, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, Droplets, Flame, Waves, ThermometerSun, Trees } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

type Upgrade = {
  id: string;
  nameEn: string;
  nameZh: string;
  descEn: string;
  descZh: string;
  cost: number;
  resilienceBoost: number;
  icon: any;
  color: string;
};

const UPGRADES: Upgrade[] = [
  { id: 'drainage', nameEn: 'Eco-Drainage System', nameZh: '生态排水系统', descEn: 'Permeable pavements and rain gardens to absorb floodwater.', descZh: '透水铺装和雨水花园，有效吸收和排放地表径流。', cost: 300, resilienceBoost: 25, icon: Droplets, color: 'text-slushie-500' },
  { id: 'warning', nameEn: 'IoT Early Warning', nameZh: '物联网预警系统', descEn: 'Smart sensors to detect anomalies and alert residents instantly.', descZh: '智能传感器实时监测异常，并瞬间向居民发送警报。', cost: 200, resilienceBoost: 20, icon: Activity, color: 'text-lemon-600' },
  { id: 'roofs', nameEn: 'Reinforced Structures', nameZh: '建筑结构加固', descEn: 'Wind-resistant roofs and earthquake-dampening foundations.', descZh: '抗风屋顶和减震地基，提升建筑本体的抗灾能力。', cost: 400, resilienceBoost: 30, icon: Shield, color: 'text-ube-500' },
  { id: 'shelter', nameEn: 'Community Shelter', nameZh: '社区应急避难所', descEn: 'A fully stocked safe zone with backup power and supplies.', descZh: '配备备用电源和充足物资的安全避难空间。', cost: 350, resilienceBoost: 25, icon: CheckCircle2, color: 'text-matcha-600' },
  { id: 'firebreak', nameEn: 'Firebreak Zones', nameZh: '防火隔离带', descEn: 'Cleared areas to stop the spread of wildfires.', descZh: '清理易燃植被，阻止野火蔓延到居民区。', cost: 250, resilienceBoost: 20, icon: Trees, color: 'text-lemon-700' },
  { id: 'seawall', nameEn: 'Coastal Seawall', nameZh: '海岸防波堤', descEn: 'A strong barrier to protect against storm surges and tsunamis.', descZh: '坚固的屏障，抵御风暴潮和海啸的冲击。', cost: 500, resilienceBoost: 35, icon: Waves, color: 'text-blueberry-800' },
  { id: 'cooling', nameEn: 'Urban Cooling Centers', nameZh: '城市避暑中心', descEn: 'Air-conditioned public spaces with hydration stations.', descZh: '提供空调和饮用水的公共空间，应对极端高温。', cost: 150, resilienceBoost: 15, icon: ThermometerSun, color: 'text-pomegranate-400' }
];

const DISASTERS = [
  { id: 'typhoon', nameEn: 'Super Typhoon', nameZh: '超强台风', severity: 70, icon: Wind, color: 'text-ube-500', bg: 'bg-ube-500' },
  { id: 'flood', nameEn: 'Flash Flood', nameZh: '特大暴雨/山洪', severity: 65, icon: CloudRain, color: 'text-slushie-500', bg: 'bg-slushie-500' },
  { id: 'wildfire', nameEn: 'Urban Wildfire', nameZh: '城市边缘野火', severity: 60, icon: Flame, color: 'text-lemon-600', bg: 'bg-lemon-600' },
  { id: 'tsunami', nameEn: 'Tsunami', nameZh: '海啸', severity: 85, icon: Waves, color: 'text-blueberry-800', bg: 'bg-blueberry-800' },
  { id: 'heatwave', nameEn: 'Extreme Heatwave', nameZh: '极端热浪', severity: 55, icon: ThermometerSun, color: 'text-pomegranate-400', bg: 'bg-pomegranate-400' }
];

export default function Simulation() {
  const { t } = useAppContext();
  const [budget, setBudget] = useState(800);
  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([]);
  const [phase, setPhase] = useState<'build' | 'simulate' | 'result'>('build');
  const [activeDisaster, setActiveDisaster] = useState(DISASTERS[0]);
  const [damage, setDamage] = useState(0);

  const baseResilience = 20;
  const currentResilience = baseResilience + selectedUpgrades.reduce((total, id) => {
    const upgrade = UPGRADES.find(u => u.id === id);
    return total + (upgrade?.resilienceBoost || 0);
  }, 0);

  const toggleUpgrade = (upgrade: Upgrade) => {
    if (selectedUpgrades.includes(upgrade.id)) {
      setSelectedUpgrades(prev => prev.filter(id => id !== upgrade.id));
      setBudget(prev => prev + upgrade.cost);
    } else {
      if (budget >= upgrade.cost) {
        setSelectedUpgrades(prev => [...prev, upgrade.id]);
        setBudget(prev => prev - upgrade.cost);
      }
    }
  };

  const runSimulation = () => {
    setPhase('simulate');
    
    // Calculate damage: severity - resilience (min 5, max 100)
    const calculatedDamage = Math.max(5, Math.min(100, activeDisaster.severity - (currentResilience / 2)));
    
    setTimeout(() => {
      setDamage(calculatedDamage);
      setPhase('result');
    }, 3000);
  };

  const resetSimulation = () => {
    setBudget(800);
    setSelectedUpgrades([]);
    setPhase('build');
    setDamage(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-ube-500/10 text-ube-600 px-4 py-2 rounded-full text-[12px] font-semibold uppercase tracking-[1.08px] mb-4">
          <span>{t('Interactive Lab', '互动实验室')}</span>
        </div>
        <h1 className="text-[44px] font-semibold tracking-[-1.32px] mb-4 text-clay-black">
          {t('Community Resilience Simulator', '社区韧性模拟器')}
        </h1>
        <p className="text-[18px] text-warm-silver max-w-2xl mx-auto">
          {t('You are the city planner. Use your budget to upgrade the community infrastructure, then test it against extreme weather events.', '您是城市规划师。合理分配预算升级社区基础设施，然后测试其在极端天气下的表现。')}
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Controls */}
        <div className="lg:col-span-8 space-y-8">
          {phase === 'build' && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-pure-white border border-oat-border rounded-[32px] p-8 clay-shadow"
            >
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-oat-light">
                <h2 className="text-[24px] font-semibold text-clay-black">{t('Infrastructure Upgrades', '基础设施升级')}</h2>
                <div className="flex items-center gap-2 bg-lemon-400/20 text-lemon-800 px-4 py-2 rounded-full font-mono font-bold text-[20px]">
                  <DollarSign size={20} /> {budget}k
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {UPGRADES.map((upgrade) => {
                  const isSelected = selectedUpgrades.includes(upgrade.id);
                  const canAfford = budget >= upgrade.cost || isSelected;
                  const Icon = upgrade.icon;

                  return (
                    <button
                      key={upgrade.id}
                      onClick={() => toggleUpgrade(upgrade)}
                      disabled={!canAfford && !isSelected}
                      className={`text-left p-6 rounded-[24px] border transition-all duration-300 relative overflow-hidden ${
                        isSelected 
                          ? 'bg-pure-white border-matcha-600 shadow-md' 
                          : canAfford 
                            ? 'bg-pure-white/50 border-oat-border hover:bg-pure-white hover:border-warm-silver'
                            : 'bg-oat-light/50 border-oat-border opacity-50 cursor-not-allowed'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-0 right-0 w-12 h-12 bg-matcha-600/10 rounded-bl-[24px] flex items-start justify-end p-3">
                          <CheckCircle2 size={16} className="text-matcha-600" />
                        </div>
                      )}
                      <div className="flex justify-between items-start mb-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-oat-light ${upgrade.color}`}>
                          <Icon size={20} />
                        </div>
                        <span className="font-mono font-bold text-warm-charcoal">${upgrade.cost}k</span>
                      </div>
                      <h3 className={`text-[18px] font-semibold mb-2 ${isSelected ? 'text-clay-black' : 'text-warm-charcoal'}`}>
                        {t(upgrade.nameEn, upgrade.nameZh)}
                      </h3>
                      <p className="text-[14px] text-warm-silver leading-[1.5]">
                        {t(upgrade.descEn, upgrade.descZh)}
                      </p>
                      <div className="mt-4 text-[12px] font-semibold text-matcha-600 flex items-center gap-1">
                        <Shield size={14} /> +{upgrade.resilienceBoost} {t('Resilience', '韧性')}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {phase === 'simulate' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-clay-black rounded-[32px] p-12 text-center text-pure-white overflow-hidden relative min-h-[400px] flex flex-col items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className={`absolute inset-0 opacity-20 ${activeDisaster.bg}`}
                style={{ background: 'conic-gradient(from 0deg, transparent, currentColor, transparent)' }}
              />
              <activeDisaster.icon size={80} className={`mb-6 ${activeDisaster.color} animate-pulse relative z-10`} />
              <h2 className="text-[32px] font-semibold mb-4 relative z-10">
                {t('Simulating ', '正在模拟 ')} {t(activeDisaster.nameEn, activeDisaster.nameZh)}...
              </h2>
              <p className="text-warm-silver text-[18px] relative z-10">
                {t('Testing community infrastructure against extreme conditions.', '正在测试社区基础设施在极端条件下的表现。')}
              </p>
            </motion.div>
          )}

          {phase === 'result' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-pure-white border border-oat-border rounded-[32px] p-8 clay-shadow"
            >
              <div className="text-center mb-8">
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${damage < 30 ? 'bg-matcha-600/20 text-matcha-600' : damage < 60 ? 'bg-lemon-400/20 text-lemon-600' : 'bg-pomegranate-400/20 text-pomegranate-400'}`}>
                  {damage < 30 ? <CheckCircle2 size={40} /> : <AlertTriangle size={40} />}
                </div>
                <h2 className="text-[32px] font-semibold text-clay-black mb-2">{t('Simulation Complete', '模拟完成')}</h2>
                <p className="text-[18px] text-warm-charcoal">
                  {t('Community Damage Assessment:', '社区受损评估：')} <span className="font-mono font-bold text-[24px]">{damage}%</span>
                </p>
              </div>

              <div className="bg-oat-light/50 rounded-[24px] p-6 mb-8">
                <h3 className="font-semibold text-clay-black mb-4">{t('After Action Report', '行动后报告')}</h3>
                <ul className="space-y-4">
                  {selectedUpgrades.length === 0 && (
                    <li className="flex gap-3 text-pomegranate-400">
                      <AlertTriangle className="shrink-0 mt-1" size={18} />
                      <span>{t('No upgrades were installed. The community suffered severe damage from the disaster.', '未安装任何升级设施。社区在灾害中遭受了严重破坏。')}</span>
                    </li>
                  )}
                  {selectedUpgrades.includes('drainage') && activeDisaster.id === 'flood' && (
                    <li className="flex gap-3 text-matcha-600">
                      <CheckCircle2 className="shrink-0 mt-1" size={18} />
                      <span>{t('The Eco-Drainage System successfully absorbed 40% of the flash flood water, preventing major road closures.', '生态排水系统成功吸收了40%的山洪积水，防止了主要道路瘫痪。')}</span>
                    </li>
                  )}
                  {selectedUpgrades.includes('roofs') && activeDisaster.id === 'typhoon' && (
                    <li className="flex gap-3 text-matcha-600">
                      <CheckCircle2 className="shrink-0 mt-1" size={18} />
                      <span>{t('Reinforced Structures held strong against Category 5 winds, minimizing structural damage to homes.', '加固的建筑结构抵御了强风，将房屋的结构性损坏降至最低。')}</span>
                    </li>
                  )}
                  {selectedUpgrades.includes('warning') && (
                    <li className="flex gap-3 text-matcha-600">
                      <CheckCircle2 className="shrink-0 mt-1" size={18} />
                      <span>{t('IoT Early Warning gave residents an extra 15 minutes to evacuate, significantly reducing casualties.', '物联网预警系统为居民争取了额外的15分钟撤离时间，显著减少了人员伤亡。')}</span>
                    </li>
                  )}
                  {selectedUpgrades.includes('firebreak') && activeDisaster.id === 'wildfire' && (
                    <li className="flex gap-3 text-matcha-600">
                      <CheckCircle2 className="shrink-0 mt-1" size={18} />
                      <span>{t('Firebreak Zones successfully halted the advance of the urban wildfire, protecting residential neighborhoods.', '防火隔离带成功阻止了城市边缘野火的蔓延，保护了居民区。')}</span>
                    </li>
                  )}
                  {selectedUpgrades.includes('seawall') && activeDisaster.id === 'tsunami' && (
                    <li className="flex gap-3 text-matcha-600">
                      <CheckCircle2 className="shrink-0 mt-1" size={18} />
                      <span>{t('The Coastal Seawall absorbed the brunt of the tsunami impact, saving the downtown area from total inundation.', '海岸防波堤吸收了海啸的大部分冲击力，使市中心免受全面淹没。')}</span>
                    </li>
                  )}
                  {selectedUpgrades.includes('cooling') && activeDisaster.id === 'heatwave' && (
                    <li className="flex gap-3 text-matcha-600">
                      <CheckCircle2 className="shrink-0 mt-1" size={18} />
                      <span>{t('Urban Cooling Centers provided refuge for thousands of vulnerable citizens, preventing heat-related illnesses.', '城市避暑中心为数千名弱势市民提供了避难所，有效预防了高温相关疾病。')}</span>
                    </li>
                  )}
                  {selectedUpgrades.includes('shelter') && (
                    <li className="flex gap-3 text-matcha-600">
                      <CheckCircle2 className="shrink-0 mt-1" size={18} />
                      <span>{t('The Community Shelter provided a safe haven and essential supplies for displaced residents during the crisis.', '社区应急避难所在危机期间为流离失所的居民提供了安全的避风港和基本物资。')}</span>
                    </li>
                  )}
                </ul>
              </div>

              <div className="text-center">
                <button 
                  onClick={resetSimulation}
                  className="bg-clay-black text-pure-white px-8 py-4 rounded-full text-[18px] font-medium clay-hover inline-flex items-center gap-2"
                >
                  <RefreshCw size={20} /> {t('Run Another Simulation', '运行新的模拟')}
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column: Status */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-pure-white border border-oat-border rounded-[32px] p-8 clay-shadow sticky top-28">
            <h3 className="text-[20px] font-semibold text-clay-black mb-6">{t('Community Status', '社区状态')}</h3>
            
            <div className="mb-8">
              <div className="flex justify-between text-[14px] mb-2 font-mono text-clay-black">
                <span>{t('Overall Resilience', '综合韧性指数')}</span>
                <span className="font-bold">{currentResilience}/100</span>
              </div>
              <div className="h-3 bg-oat-light rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-matcha-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${currentResilience}%` }}
                  transition={{ type: 'spring', stiffness: 50 }}
                />
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-[14px] font-semibold text-warm-silver uppercase tracking-[1.08px] mb-4">{t('Select Disaster Scenario', '选择灾害场景')}</h4>
              <div className="space-y-3">
                {DISASTERS.map(disaster => (
                  <button
                    key={disaster.id}
                    onClick={() => phase === 'build' && setActiveDisaster(disaster)}
                    disabled={phase !== 'build'}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                      activeDisaster.id === disaster.id 
                        ? `bg-pure-white border-${disaster.color.split('-')[1]}-400 shadow-sm` 
                        : 'bg-oat-light/50 border-transparent hover:bg-pure-white'
                    } ${phase !== 'build' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <disaster.icon size={20} className={activeDisaster.id === disaster.id ? disaster.color : 'text-warm-silver'} />
                      <span className={`font-medium ${activeDisaster.id === disaster.id ? 'text-clay-black' : 'text-warm-charcoal'}`}>
                        {t(disaster.nameEn, disaster.nameZh)}
                      </span>
                    </div>
                    {activeDisaster.id === disaster.id && <CheckCircle2 size={16} className={disaster.color} />}
                  </button>
                ))}
              </div>
            </div>

            {phase === 'build' && (
              <button 
                onClick={runSimulation}
                className="w-full bg-pomegranate-400 text-white py-4 rounded-full text-[18px] font-medium clay-hover flex items-center justify-center gap-2 shadow-lg shadow-pomegranate-400/20"
              >
                <Activity size={20} /> {t('Trigger Disaster', '触发灾害')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
