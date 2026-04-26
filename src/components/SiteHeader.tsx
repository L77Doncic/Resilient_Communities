import {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {ChevronLeft, Menu, X} from 'lucide-react';
import {useAppContext} from '../context/AppContext';

type NavItem = {to: string; en: string; zh: string};

const NAV: NavItem[] = [
  {to: '/encyclopedia', en: 'ENCYCLOPEDIA', zh: '防灾百科'},
  {to: '/simulation', en: 'SIMULATION', zh: '模拟演练'},
  {to: '/kit', en: 'EMERGENCY KIT', zh: '应急包'},
  {to: '/games', en: 'MINI GAMES', zh: '互动游戏'},
];

export default function SiteHeader() {
  const {language, t, toggleLanguage} = useAppContext();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="w-10 h-10 rounded-full grid place-items-center hover:bg-black/5 transition-colors"
            aria-label={t('Back to home', '返回主页')}
            title={t('Back to home', '返回主页')}
          >
            <ChevronLeft size={22} className="text-black/80" />
          </Link>

          <Link to="/" className="flex items-center gap-3" aria-label={t('Home', '首页')}>
            <img
              src="/common/img/elements/site_logo.png"
              alt={t('Smart Emergency', '智慧应急')}
              className="h-7 w-auto"
              loading="eager"
            />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`text-[13px] font-bold tracking-[0.18em] transition-colors ${
                location.pathname.startsWith(item.to) ? 'text-black' : 'text-black/60 hover:text-black'
              }`}
            >
              {t(item.en, item.zh)}
            </Link>
          ))}

          <button
            onClick={toggleLanguage}
            className="text-[13px] font-bold tracking-[0.18em] text-black/70 hover:text-black transition-colors"
            aria-label={t('Switch to Chinese', '切换为英文')}
            title={t('Switch to Chinese', '切换为英文')}
          >
            {language === 'en' ? '中文' : 'English'}
          </button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden w-10 h-10 rounded-full grid place-items-center hover:bg-black/5 transition-colors"
          aria-label={open ? t('Close menu', '关闭菜单') : t('Open menu', '打开菜单')}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-black/10 bg-white/95 backdrop-blur-md">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="py-2 text-[14px] font-bold tracking-[0.14em] text-black/80"
              >
                {t(item.en, item.zh)}
              </Link>
            ))}
            <button
              onClick={toggleLanguage}
              className="py-2 text-left text-[14px] font-bold tracking-[0.14em] text-black/80"
            >
              {language === 'en' ? '中文' : 'English'}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

