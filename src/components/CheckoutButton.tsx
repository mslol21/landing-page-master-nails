import React from 'react';
import { ArrowRight } from 'lucide-react';
import { LINK_CHECKOUT, isLinkConfigured, INVESTIMENTO_CONFIG } from '../config/courseConfig';
import { trackCheckoutClick } from '../lib/analytics';

interface CheckoutButtonProps {
  label?: string;
  subtext?: string;
  size?: 'md' | 'lg';
  fullWidthMobile?: boolean;
  className?: string;
  onUnconfiguredClick?: () => void;
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  label = 'Quero começar agora',
  subtext = 'Acesse as informações e condições de pagamento',
  size = 'lg',
  fullWidthMobile = true,
  className = '',
  onUnconfiguredClick,
}) => {
  const configured = isLinkConfigured(LINK_CHECKOUT);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!configured) {
      e.preventDefault();
      if (onUnconfiguredClick) {
        onUnconfiguredClick();
      } else {
        const investSection = document.getElementById('investimento');
        if (investSection) {
          investSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      const checkoutValue = INVESTIMENTO_CONFIG.precoConfirmado
        ? Number(INVESTIMENTO_CONFIG.valorPrincipal.replace(',', '.'))
        : undefined;
      trackCheckoutClick(checkoutValue);
    }
  };

  const sizeClasses =
    size === 'lg'
      ? 'px-8 py-4 text-base sm:text-lg min-h-[54px]'
      : 'px-6 py-3 text-sm sm:text-base min-h-[44px]';

  return (
    <div className={`inline-flex flex-col ${fullWidthMobile ? 'w-full sm:w-auto' : ''} ${className}`}>
      <a
        href={configured ? LINK_CHECKOUT : '#investimento'}
        data-checkout-link={configured ? LINK_CHECKOUT : ''}
        onClick={handleClick}
        target={configured ? '_blank' : undefined}
        rel={configured ? 'noopener noreferrer' : undefined}
        className={`group inline-flex items-center justify-center gap-3 rounded-lg bg-gold-400 text-obsidian-950 font-semibold tracking-wide transition-colors duration-200 hover:bg-gold-300 active:bg-gold-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300 shadow-sm ${sizeClasses}`}
      >
        <span>{label}</span>
        <ArrowRight
          className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </a>
      {subtext && (
        <span className="mt-2.5 text-xs sm:text-sm text-zinc-400 text-center sm:text-left">
          {subtext}
        </span>
      )}
    </div>
  );
};
