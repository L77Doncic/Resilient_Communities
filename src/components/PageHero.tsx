import {Link} from 'react-router-dom';
import {ArrowRight, type LucideIcon} from 'lucide-react';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  icon?: LucideIcon;
  action?: {
    to: string;
    label: string;
  };
};

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  icon: Icon,
  action,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#163c29] text-white">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-55"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#102719]/95 via-[#102719]/72 to-[#102719]/18" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-warm-cream to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-md bg-white/12 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.22em] text-white/85 ring-1 ring-white/20">
            {Icon && <Icon size={16} />}
            <span>{eyebrow}</span>
          </div>
          <h1 className="text-[38px] font-bold leading-[1.12] tracking-normal md:text-[64px]">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-8 text-white/82 md:text-[18px]">
            {description}
          </p>
          {action && (
            <Link
              to={action.to}
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white px-6 text-[14px] font-bold uppercase tracking-[0.14em] text-[#163c29] transition-colors hover:bg-lemon-400"
            >
              {action.label}
              <ArrowRight size={18} />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
