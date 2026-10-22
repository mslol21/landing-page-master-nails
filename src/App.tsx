import { useEffect, useRef } from 'react';
import salesMarkup from './sales-page.html?raw';
import { LINK_CHECKOUT, isLinkConfigured, INVESTIMENTO_CONFIG } from './config/courseConfig';
import { initializeAnalytics, trackCheckoutClick, trackSectionView } from './lib/analytics';

// Versioned, repository-owned markup is rendered on both server and client.
// It contains no user-supplied HTML and preserves the existing prerender pipeline.
export default function App() {
  const page = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = page.current;
    if (!root) return;
    initializeAnalytics();
    const dialog = root.querySelector<HTMLDialogElement>('#notice');
    const notice = (title: string, copy: string) => {
      const heading = root.querySelector('#dialog-title');
      const body = root.querySelector('#dialog-copy');
      if (heading) heading.textContent = title;
      if (body) body.textContent = copy;
      dialog?.showModal();
    };
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest('.checkout')) {
        if (isLinkConfigured(LINK_CHECKOUT)) {
          const value = INVESTIMENTO_CONFIG.precoConfirmado
            ? Number(INVESTIMENTO_CONFIG.valorPrincipal.replace(',', '.')) : undefined;
          trackCheckoutClick(value);
          window.location.assign(LINK_CHECKOUT);
        } else notice('Inscrições em preparação', 'O link de pagamento ainda não está disponível. Nenhum pagamento ou cadastro foi realizado.');
      }
      if (target.closest('.close,.close-action') || target === dialog) dialog?.close();
      if (target.closest('.privacy')) notice('Sua privacidade', 'Esta página não possui formulário de cadastro. Utiliza Google Fonts e pode carregar ferramentas de medição quando configuradas. A compra é concluída na Kiwify, conforme a política de privacidade da plataforma.');
    };
    root.addEventListener('click', onClick);
    const seen = new Set<Element>();
    const observer = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !seen.has(entry.target)) {
          seen.add(entry.target);
          trackSectionView(entry.target.id || entry.target.className);
        }
      });
    }, { threshold: 0.35 }) : null;
    root.querySelectorAll('main section').forEach(section => observer?.observe(section));
    return () => { root.removeEventListener('click', onClick); observer?.disconnect(); };
  }, []);
  return <div ref={page} dangerouslySetInnerHTML={{ __html: salesMarkup }} />;
}
