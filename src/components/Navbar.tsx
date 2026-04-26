import { Link, useLocation } from 'react-router-dom';
import { ShieldAlert, Moon, Sun, Languages } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { t, theme, toggleTheme, toggleLanguage } = useAppContext();
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navClass = `fixed top-0 w-full z-50 transition-all duration-500 ${
    isHome 
      ? scrolled ? 'bg-white/90 backdrop-blur-md border-b border-[#222]/10 py-4' : 'bg-transparent py-6'
      : 'bg-white/90 backdrop-blur-md border-b border-[#222]/10 py-4 sticky'
  }`;

  const textClass = isHome && !scrolled ? 'text-white' : 'text-[#222]';
  const logoBgClass = isHome && !scrolled ? 'bg-white text-[#222]' : 'bg-[#25804a] text-white';

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform ${logoBgClass}`}>
            <ShieldAlert size={24} />
          </div>
          <span className={`font-bold text-[20px] tracking-widest font-serif ${textClass}`}>
            {t('RESILIENCE OS', '韧性系统')}
          </span>
        </Link>
        <div className="flex items-center gap-8">
          <Link to="/" className={`text-[14px] font-bold tracking-widest transition-colors ${isActive('/') ? 'opacity-100' : 'opacity-70 hover:opacity-100'} ${textClass}`}>{t('HOME', '首页')}</Link>
          <Link to="/encyclopedia" className={`text-[14px] font-bold tracking-widest transition-colors ${isActive('/encyclopedia') ? 'opacity-100' : 'opacity-70 hover:opacity-100'} ${textClass}`}>{t('ENCYCLOPEDIA', '防灾百科')}</Link>
          <Link to="/simulation" className={`text-[14px] font-bold tracking-widest transition-colors ${isActive('/simulation') ? 'opacity-100' : 'opacity-70 hover:opacity-100'} ${textClass}`}>{t('SIMULATION', '模拟演练')}</Link>
          <Link to="/kit" className={`text-[14px] font-bold tracking-widest transition-colors ${isActive('/kit') ? 'opacity-100' : 'opacity-70 hover:opacity-100'} ${textClass}`}>{t('KIT', '应急包')}</Link>
          <Link to="/games" className={`text-[14px] font-bold tracking-widest transition-colors ${isActive('/games') ? 'opacity-100' : 'opacity-70 hover:opacity-100'} ${textClass}`}>{t('GAMES', '互动游戏')}</Link>
          
          <div className={`flex items-center gap-2 ml-4 border-l pl-6 ${isHome && !scrolled ? 'border-white/30' : 'border-[#222]/10'}`}>
            <button 
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${textClass} hover:bg-black/5`}
              title={t('Toggle Theme', '切换主题')}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button 
              onClick={toggleLanguage}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors font-medium ${textClass} hover:bg-black/5`}
              title={t('Toggle Language', '切换语言')}
            >
              <Languages size={18} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
