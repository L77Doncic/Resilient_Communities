import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Info, Backpack, Droplets, Flashlight, Radio, Cross, FileText, Wrench, Battery } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

type KitItem = {
  id: string;
  icon: any;
  nameEn: string;
  nameZh: string;
  descEn: string;
  descZh: string;
  color: string;
  bgColor: string;
};

const KIT_ITEMS: KitItem[] = [
  { id: 'water', icon: Droplets, nameEn: 'Water (72h)', nameZh: '饮用水 (72小时)', descEn: '1 gallon per person per day for drinking and sanitation.', descZh: '每人每天至少需要4升水，用于饮用和基本卫生。', color: 'text-slushie-500', bgColor: 'bg-slushie-500/10' },
  { id: 'food', icon: Backpack, nameEn: 'Non-perishable Food', nameZh: '不易腐坏的食物', descEn: 'At least a three-day supply of non-perishable food.', descZh: '至少准备三天的压缩饼干、罐头等免煮食物。', color: 'text-matcha-600', bgColor: 'bg-matcha-600/10' },
  { id: 'flashlight', icon: Flashlight, nameEn: 'Flashlight', nameZh: '强光手电筒', descEn: 'Essential for power outages. Do not use candles due to fire risk.', descZh: '停电时必备。切勿使用蜡烛，以免引发火灾。', color: 'text-lemon-600', bgColor: 'bg-lemon-400/20' },
  { id: 'radio', icon: Radio, nameEn: 'Hand-crank Radio', nameZh: '手摇收音机', descEn: 'To receive emergency broadcasts when cell networks fail.', descZh: '在通讯网络中断时，接收官方应急广播和救援信息。', color: 'text-ube-500', bgColor: 'bg-ube-500/10' },
  { id: 'firstaid', icon: Cross, nameEn: 'First Aid Kit', nameZh: '急救包', descEn: 'Bandages, antiseptics, pain relievers, and personal medications.', descZh: '包含创可贴、消毒液、止痛药及个人常用处方药。', color: 'text-pomegranate-400', bgColor: 'bg-pomegranate-400/10' },
  { id: 'docs', icon: FileText, nameEn: 'Important Documents', nameZh: '重要文件复印件', descEn: 'IDs, insurance policies, and bank records in a waterproof container.', descZh: '身份证、保险单、房产证等重要文件的复印件，需防水密封。', color: 'text-warm-silver', bgColor: 'bg-oat-light' },
  { id: 'tools', icon: Wrench, nameEn: 'Multi-tool & Whistle', nameZh: '多功能工具与口哨', descEn: 'To turn off utilities or signal for help (whistle carries further than voice).', descZh: '用于关闭阀门或吹哨求救（口哨声比呼救声传得更远）。', color: 'text-clay-black', bgColor: 'bg-oat-light' },
  { id: 'power', icon: Battery, nameEn: 'Power Bank', nameZh: '备用电源', descEn: 'Fully charged power banks for mobile phones.', descZh: '充满电的大容量充电宝，确保手机在关键时刻有电。', color: 'text-lemon-600', bgColor: 'bg-lemon-400/20' },
];

export default function EmergencyKit() {
  const { t } = useAppContext();
  const [packedItems, setPackedItems] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<KitItem | null>(null);

  const toggleItem = (item: KitItem) => {
    if (packedItems.includes(item.id)) {
      setPackedItems(packedItems.filter(id => id !== item.id));
    } else {
      setPackedItems([...packedItems, item.id]);
      setSelectedItem(item);
    }
  };

  const progress = Math.round((packedItems.length / KIT_ITEMS.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 bg-pomegranate-400/10 text-pomegranate-400 px-4 py-2 rounded-full text-[12px] font-semibold uppercase tracking-[1.08px] mb-4">
          <span>{t('Preparation', '应急准备')}</span>
        </div>
        <h1 className="text-[44px] font-semibold tracking-[-1.32px] mb-4 text-clay-black">
          {t('72-Hour Emergency Kit', '72小时家庭应急包')}
        </h1>
        <p className="text-[18px] text-warm-silver max-w-2xl mx-auto">
          {t('The first 72 hours after a disaster are critical. Pack your virtual emergency kit to learn what you need to survive.', '灾后黄金72小时至关重要。整理您的虚拟应急包，学习必备的生存物资。')}
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Interactive Backpack Area */}
        <div className="lg:col-span-5 bg-pure-white border border-oat-border rounded-[40px] p-8 clay-shadow sticky top-28">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[24px] font-semibold text-clay-black">{t('Your Backpack', '你的背包')}</h2>
            <span className="text-[24px] font-mono font-bold text-matcha-600">{progress}%</span>
          </div>
          
          <div className="h-4 bg-oat-light rounded-full overflow-hidden mb-12">
            <motion.div 
              className="h-full bg-matcha-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 50 }}
            />
          </div>

          <div className="relative w-full aspect-square max-w-[300px] mx-auto flex items-center justify-center">
            <motion.div 
              animate={{ 
                scale: packedItems.length === KIT_ITEMS.length ? [1, 1.05, 1] : 1,
                rotate: packedItems.length === KIT_ITEMS.length ? [0, -5, 5, 0] : 0
              }}
              transition={{ duration: 0.5 }}
              className={`w-48 h-64 rounded-[40px] border-4 flex items-center justify-center transition-colors duration-500 ${
                packedItems.length === KIT_ITEMS.length 
                  ? 'bg-matcha-600/20 border-matcha-600 text-matcha-600' 
                  : 'bg-oat-light border-oat-border text-warm-silver'
              }`}
            >
              <Backpack size={80} strokeWidth={1.5} />
            </motion.div>

            {/* Floating packed items */}
            <AnimatePresence>
              {packedItems.map((id, index) => {
                const item = KIT_ITEMS.find(i => i.id === id)!;
                const Icon = item.icon;
                const angle = (index / KIT_ITEMS.length) * Math.PI * 2;
                const radius = 140;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{ opacity: 1, scale: 1, x, y }}
                    exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    className={`absolute w-12 h-12 rounded-full flex items-center justify-center shadow-md border border-pure-white bg-pure-white ${item.color}`}
                  >
                    <Icon size={20} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {packedItems.length === KIT_ITEMS.length && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center text-matcha-600 font-medium bg-matcha-600/10 py-3 rounded-xl"
            >
              {t('You are fully prepared!', '你已准备就绪！')}
            </motion.div>
          )}
        </div>

        {/* Items Grid */}
        <div className="lg:col-span-7">
          <div className="grid sm:grid-cols-2 gap-4">
            {KIT_ITEMS.map((item) => {
              const isPacked = packedItems.includes(item.id);
              const Icon = item.icon;
              
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleItem(item)}
                  className={`text-left p-6 rounded-[24px] border transition-all duration-300 relative overflow-hidden ${
                    isPacked 
                      ? 'bg-pure-white border-matcha-600 shadow-md' 
                      : 'bg-pure-white/50 border-oat-border hover:bg-pure-white hover:border-warm-silver'
                  }`}
                >
                  {isPacked && (
                    <div className="absolute top-0 right-0 w-16 h-16 bg-matcha-600/10 rounded-bl-[40px] flex items-start justify-end p-4">
                      <Check size={20} className="text-matcha-600" />
                    </div>
                  )}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.bgColor} ${item.color}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className={`text-[18px] font-semibold mb-2 ${isPacked ? 'text-clay-black' : 'text-warm-charcoal'}`}>
                    {t(item.nameEn, item.nameZh)}
                  </h3>
                  <p className="text-[14px] text-warm-silver leading-[1.5]">
                    {t(item.descEn, item.descZh)}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
