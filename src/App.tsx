import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowRight, Award, CheckCircle2, CirclePlay, Infinity as InfinityIcon, LockKeyhole, MapPin, Menu, X } from 'lucide-react';
import { LINK_INSTAGRAM, isLinkConfigured, INSTRUTORA_CONFIG, TOPICOS_APRENDIZADO, PERFIS_PUBLICO, INVESTIMENTO_CONFIG, GARANTIA_CONFIG, GALERIA_TRABALHOS, FAQ_ITEMS } from './config/courseConfig';
import { CheckoutButton } from './components/CheckoutButton';
import { GalleryLightbox } from './components/GalleryLightbox';
import { FaqAccordion } from './components/FaqAccordion';
import { initializeAnalytics, trackSectionView } from './lib/analytics';

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: reduce ? 0 : .58, delay, ease: [0.22, 1, .36, 1] }}>{children}</motion.div>;
}

const Photo = ({ className, src, alt, width, height, eager = false }: { className: string; src: string; alt: string; width: number; height: number; eager?: boolean }) => (
  <img className={className} src={src} alt={alt} width={width} height={height} loading={eager ? 'eager' : 'lazy'} decoding="async" {...({ fetchpriority: eager ? 'high' : 'auto' } as unknown as React.ImgHTMLAttributes<HTMLImageElement>)} />
);

function PrimaryCta({ className = '', subtext = '' }: { className?: string; subtext?: string }) {
  return <CheckoutButton label="Quero começar agora" subtext={subtext} size="lg" className={className} fullWidthMobile onUnconfiguredClick={() => document.getElementById('investimento')?.scrollIntoView({ behavior: 'smooth' })} />;
}

const modules = TOPICOS_APRENDIZADO;

export default function App() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const hasInstagram = isLinkConfigured(LINK_INSTAGRAM);
  const price = `${INVESTIMENTO_CONFIG.moeda} ${INVESTIMENTO_CONFIG.valorPrincipal}`;
  const heroTransition = { duration: reduce ? 0 : .8, ease: [0.22, 1, .36, 1] as [number, number, number, number] };

  useEffect(() => {
    initializeAnalytics();
    const sections = document.querySelectorAll<HTMLElement>('[data-analytics-section]');
    if (!('IntersectionObserver' in window)) return;
    const seen = new Set<string>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const name = (entry.target as HTMLElement).dataset.analyticsSection;
        if (entry.isIntersecting && name && !seen.has(name)) {
          seen.add(name);
          trackSectionView(name);
        }
      });
    }, { threshold: 0.35 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);
  return <div className="mn-page">
    <a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a>
    <header className="mn-header">
      <div className="mn-header-inner">
        <a href="#inicio" className="mn-brand" onClick={closeMenu} aria-label="Master Nails — início">
          <span className="brand-mark">M<span>N</span></span>
          <span className="brand-copy"><strong>MASTER NAILS</strong><small>GEL NA TIPS · KAMILA MARTINS</small></span>
        </a>
        <button className="mobile-menu-button" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20}/> : <Menu size={20}/>}</button>
        <nav className={'mn-nav ' + (menuOpen ? 'is-open' : '')} aria-label="Navegação principal">
          <a href="#aprenda" onClick={closeMenu}>O que você aprende</a><a href="#trabalhos" onClick={closeMenu}>Trabalhos</a><a href="#depoimentos" onClick={closeMenu}>Alunas</a><a href="#investimento" onClick={closeMenu}>Investimento</a><a href="#duvidas" onClick={closeMenu}>Dúvidas</a>
        </nav>
        <PrimaryCta className="header-cta" />
      </div>
    </header>

    <main id="conteudo-principal">
      <section className="mn-hero" id="inicio" aria-labelledby="hero-title" data-analytics-section="hero">
        <div className="hero-glow" aria-hidden="true"/>
        <div className="hero-inner">
          <motion.div className="hero-copy" initial={reduce ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={heroTransition}>
            <div className="eyebrow eyebrow-light"><span className="eyebrow-line"/>MASTER NAILS · GEL NA TIPS</div>
            {/* Headline A/B escolhida; duas alternativas estão na resposta e podem ser testadas aqui. */}
            <h1 id="hero-title">Aprenda Gel na Tips <em>do preparo ao acabamento</em></h1>
            <p className="hero-lede">Desenvolva <strong>autonomia e segurança técnica</strong> para criar alongamentos bem estruturados e ampliar os serviços que oferece.</p>
            <div className="hero-actions"><PrimaryCta className="hero-buy" subtext={`${price} · checkout Kiwify`}/><a className="hero-secondary" href="#trabalhos"><span className="play-ring"><CirclePlay size={20}/></span>Veja os trabalhos</a></div>
            {INVESTIMENTO_CONFIG.precoConfirmado && <p className="hero-investment">Inscrição por <strong>{price}</strong>{INVESTIMENTO_CONFIG.mostrarParcelamento && <span> ou {INVESTIMENTO_CONFIG.textoParcelamento}</span>}</p>}
          </motion.div>
          <motion.div className="hero-art" initial={reduce ? false : { opacity: 0, scale: .97, x: 18 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: reduce ? 0 : .9, delay: .12, ease: [0.22, 1, .36, 1] }}>
            <div className="hero-photo-frame"><Photo className="hero-photo" src="/images/hero-kamila-editorial.webp" alt="Profissional realizando alongamento de unhas em gel em uma bancada de manicure" width={1024} height={1536} eager/><div className="photo-caption"><span>MASTER NAILS</span><span>GEL NA TIPS</span></div></div>
          </motion.div>
        </div>
        <a className="scroll-cue" href="#aprenda"><span>CONHEÇA O CURSO</span><ArrowDown size={15}/></a>
      </section>

      <section className="mn-intro mn-section mn-conversion-intro" id="aprenda" aria-labelledby="learn-title" data-analytics-section="aprendizado">
        <Reveal className="section-kicker"><span>01</span><i/> O QUE VOCÊ APRENDE</Reveal>
        <Reveal className="intro-grid"><div className="intro-heading"><p className="overline">DO PRIMEIRO PASSO À FINALIZAÇÃO</p><h2 id="learn-title">Aprenda cada etapa.<br/><em>Pratique com confiança.</em></h2></div><div className="intro-copy"><p>Um passo a passo para aprender <strong>preparo, aplicação das tips, estrutura, lixamento, acabamento e manutenção</strong> — no seu ritmo, de onde estiver.</p><a href="#conteudo" className="text-link">Ver os módulos do curso <ArrowRight size={16}/></a></div></Reveal>
        <div className="course-facts" aria-label="Ficha rápida do curso">
          <div><span>QUANTIDADE DE AULAS</span><strong>[INSERIR: nº de aulas]</strong></div>
          <div><span>CARGA HORÁRIA</span><strong>[INSERIR: carga horária]</strong></div>
          <div><span>NÍVEL</span><strong>Iniciante a avançado</strong></div>
          <div><span>MATERIAIS</span><strong>[INSERIR: materiais necessários]</strong></div>
        </div>
        <div className="course-benefit-strip" aria-label="Inclui aulas passo a passo, certificado e acesso imediato vitalício"><span><CirclePlay size={20}/> Aulas passo a passo</span><i/><span><Award size={20}/> Certificado incluso</span><i/><span><InfinityIcon size={20}/> Acesso imediato e vitalício</span></div>
        <div className="conversion-cta"><span>Aprenda Gel na Tips do preparo ao acabamento.</span><PrimaryCta className="intro-buy" subtext={INVESTIMENTO_CONFIG.precoConfirmado ? `${price} · pagamento pela Kiwify` : 'Confira o valor no checkout'} /></div>
      </section>

      <section className="mn-curriculum mn-section" id="conteudo" aria-labelledby="curriculum-title" data-analytics-section="modulos">
        <Reveal className="curriculum-head"><div><div className="section-kicker section-kicker-light"><span>02</span><i/> CONTEÚDO PROGRAMÁTICO</div><h2 id="curriculum-title">Seis módulos.<br/><em>Uma técnica completa.</em></h2></div><p>Conheça o caminho de aprendizado, da preparação da unha natural aos cuidados de manutenção.</p></Reveal>
        <div className="curriculum-list">{modules.map((topic, i) => <Reveal className="curriculum-row" key={topic.id} delay={i * .035}><span className="curriculum-number">0{i+1}</span><div className="module-copy"><h3>{topic.titulo}</h3><p>{topic.descricao}</p><strong>{topic.resultado}</strong></div><span className="row-spark" aria-hidden="true">✳</span></Reveal>)}</div>
        <div className="curriculum-footer"><span>APRENDIZADO ONLINE · NO SEU RITMO</span><span>MASTER NAILS · KAMILA MARTINS</span></div>
        <div className="section-cta-dark"><p>Comece pela primeira etapa e avance módulo por módulo.</p><PrimaryCta className="intro-buy" subtext={`${price} · checkout Kiwify`} /></div>
      </section>

      <section className="mn-portfolio mn-section" id="trabalhos" aria-labelledby="portfolio-title" data-analytics-section="trabalhos">
        <Reveal className="portfolio-heading"><div><div className="section-kicker"><span>03</span><i/> TRABALHOS</div><h2 id="portfolio-title">Resultados que você<br/><em>vai aprender a fazer.</em></h2></div><p>Veja detalhes de formatos, cores e acabamentos relacionados à técnica Gel na Tips.</p></Reveal>
        {/* Troque estas imagens por fotos originais em luz natural, foco nítido e sem filtros para valorizar o trabalho real. */}
        <div className="portfolio-grid">{GALERIA_TRABALHOS.map((item, i) => <motion.button type="button" key={item.id} className={'portfolio-card portfolio-card-'+(i+1)} onClick={() => setActive(i)} aria-label={`Ampliar foto ${i+1}: ${item.titulo}`} whileHover={reduce ? undefined : { y: -3 }} transition={{ duration: .22 }}><img className="portfolio-image" src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async"/><span className="portfolio-meta"><small>0{i+1} · GEL NA TIPS</small><span>{item.titulo}</span></span></motion.button>)}</div>
        <p className="portfolio-caption">[INSERIR: confirmar se os trabalhos são da Kamila ou de alunas]</p>
        <div className="portfolio-cta"><p>Quer aprender a técnica por trás desses resultados?</p><PrimaryCta className="intro-buy" subtext={`${price} · checkout Kiwify`}/></div>
      </section>

      <section className="mn-social-proof mn-section" id="depoimentos" aria-labelledby="proof-title" data-analytics-section="prova-social">
        <Reveal className="section-kicker"><span>04</span><i/> EXPERIÊNCIAS DAS ALUNAS</Reveal>
        <Reveal className="social-heading"><h2 id="proof-title">Aprenda com experiências<br/><em>reais de alunas.</em></h2><p>Os relatos abaixo devem ser substituídos por feedbacks autorizados antes da publicação.</p></Reveal>
        <div className="testimonial-grid">{[1, 2, 3].map((number) => <article className="testimonial-card" key={number}><div className="testimonial-media"><span>[INSERIR: foto ou print de feedback]</span></div><blockquote>“[INSERIR: depoimento real da aluna, com autorização de uso]”</blockquote><p>[INSERIR: nome da aluna]</p></article>)}</div>
        <div className="before-after-block"><div><p className="overline">EVOLUÇÃO TÉCNICA</p><h3>Antes e depois das alunas</h3><p>Substitua os espaços pelas imagens reais da mesma aluna, com autorização.</p></div><div className="before-after-grid"><div><span>ANTES</span><strong>[INSERIR: foto de antes]</strong></div><div><span>DEPOIS</span><strong>[INSERIR: foto de depois]</strong></div></div></div>
        <div className="section-cta-light"><p>Aprenda a técnica com orientação passo a passo.</p><PrimaryCta className="intro-buy" subtext="R$ 49,90 · Kiwify"/></div>
      </section>

      <section className="mn-audience mn-section" id="publico" data-analytics-section="para-quem">
        <Reveal className="audience-side"><div className="section-kicker"><span>05</span><i/> PARA QUEM É</div><h2>Comece do zero<br/><em>ou vá além.</em></h2><p>Para quem quer aprender uma nova técnica e para profissionais que desejam ampliar os serviços que oferecem às clientes.</p><a href="#investimento" className="text-link">Ver investimento e inscrição <ArrowRight size={16}/></a></Reveal>
        <div className="audience-list">{PERFIS_PUBLICO.map((profile, i) => <Reveal className="audience-item" key={profile.id} delay={i * .04}><span className="audience-index">0{i+1}</span><div><h3>{profile.titulo}</h3><p>{profile.descricao}</p></div><CheckCircle2 size={18}/></Reveal>)}</div>
        <div className="section-cta-light"><p>Uma habilidade nova começa com o primeiro módulo.</p><PrimaryCta className="intro-buy" subtext="Inscrição online pela Kiwify"/></div>
      </section>

      <section className="mn-instructor mn-section" id="instrutora" aria-labelledby="instructor-title" data-analytics-section="instrutora">
        <div className="instructor-inner"><Reveal className="instructor-visual instructor-photo-placeholder"><div className="photo-placeholder"><span>[INSERIR: foto real da Kamila em alta resolução]</span><small>Substitua este espaço antes da publicação final.</small></div><div className="instructor-stamp"><small>NAIL DESIGNER · ITAQUERA, SP</small></div></Reveal><Reveal className="instructor-copy" delay={.08}><div className="section-kicker section-kicker-light"><span>06</span><i/> SOBRE A KAMILA</div><p className="overline">NAIL DESIGNER E INSTRUTORA</p><h2 id="instructor-title">Aprenda com<br/><em>{INSTRUTORA_CONFIG.nome}.</em></h2><p className="instructor-bio">{INSTRUTORA_CONFIG.resumoConfirmado}</p><ul className="instructor-credentials"><li><strong>Experiência:</strong> [INSERIR: anos de experiência]</li><li><strong>Clientes:</strong> [INSERIR: nº de clientes atendidas]</li><li><strong>Formação:</strong> [INSERIR: formação/certificações]</li></ul><div className="instructor-location"><MapPin size={18}/><span>{INSTRUTORA_CONFIG.localizacao}</span></div>{hasInstagram ? <a className="instructor-link" href={INSTRUTORA_CONFIG.instagramUrl} target="_blank" rel="noreferrer">Instagram da Kamila <ArrowRight size={16}/><span className="sr-only">Abre em nova aba</span></a> : <p className="instructor-link">[INSERIR: link do Instagram da Kamila]</p>}<PrimaryCta className="intro-buy" subtext={`${price} · checkout Kiwify`}/></Reveal></div>
      </section>

      <section className="mn-offer mn-section" id="investimento" aria-labelledby="offer-title" data-analytics-section="oferta">
        <Reveal className="offer-card"><div className="offer-left"><div className="section-kicker section-kicker-light"><span>07</span><i/> SUA INSCRIÇÃO</div><p className="overline">CHAVE DO SUCESSO · MASTER NAILS · GEL NA TIPS</p><h2 id="offer-title">Comece a estudar<br/><em>hoje mesmo.</em></h2><p className="offer-intro">Curso online de Gel na Tips por {price}.</p><p className="offer-anchor">Compare o investimento com o valor de uma aplicação: <strong>[INSERIR: valor médio cobrado por aplicação na sua região]</strong>. O retorno depende da sua prática, preço e procura local.</p></div><div className="offer-right"><div className="offer-price-label">INVESTIMENTO NO CURSO</div>{INVESTIMENTO_CONFIG.precoConfirmado ? <p className="offer-price"><small>{INVESTIMENTO_CONFIG.moeda}</small>{INVESTIMENTO_CONFIG.valorPrincipal}</p> : <p className="offer-price offer-price-consult">Confira no checkout</p>}<p className="offer-installments">{INVESTIMENTO_CONFIG.mostrarParcelamento ? INVESTIMENTO_CONFIG.textoParcelamento : INVESTIMENTO_CONFIG.parcelamentoPlaceholder}</p><p className="payment-methods">{INVESTIMENTO_CONFIG.formasPagamento}</p><PrimaryCta className="offer-button" subtext="Você seguirá para o checkout oficial da Kiwify"/><div className="guarantee-placeholder"><CheckCircle2 size={22}/><div><strong>Garantia</strong><span>{GARANTIA_CONFIG.prazoPlaceholder}</span></div></div><p className="secure-note"><LockKeyhole size={16}/> Pagamento processado em ambiente seguro pela Kiwify</p></div></Reveal><p className="offer-footnote">Confira o valor e as condições finais diretamente no checkout.</p>
      </section>

      <section className="mn-faq mn-section" id="duvidas" aria-labelledby="faq-title" data-analytics-section="faq"><Reveal className="faq-intro"><div className="section-kicker"><span>08</span><i/> DÚVIDAS FREQUENTES</div><h2 id="faq-title">Dúvidas frequentes</h2><p>Respostas diretas para você decidir com segurança.</p></Reveal><Reveal className="faq-content"><FaqAccordion items={FAQ_ITEMS}/></Reveal><div className="section-cta-light"><p>Pronta para começar?</p><PrimaryCta className="intro-buy" subtext={`${price} · pagamento pela Kiwify`}/></div></section>

      <section className="mn-last-call" data-analytics-section="cta-final"><div className="last-call-ornament" aria-hidden="true">✳</div><div className="section-kicker section-kicker-light"><i/> PRÓXIMO PASSO</div><h2>Aprenda Gel na Tips<br/><em>do preparo ao acabamento.</em></h2><p>Inscreva-se no curso online Chave do Sucesso Master Nails.</p><PrimaryCta className="last-call-button" subtext={`${price} · checkout Kiwify`}/></section>
    </main>

    <footer className="mn-footer"><a href="#inicio" className="mn-brand footer-brand" aria-label="Master Nails — início"><span className="brand-mark">M<span>N</span></span><span className="brand-copy"><strong>MASTER NAILS</strong><small>GEL NA TIPS · KAMILA MARTINS</small></span></a><p>Curso online de alongamento de unhas em Gel na Tips.</p><span className="footer-copy">© 2026 Master Nails · Kamila Martins</span></footer>
    <div className="mobile-purchase-bar"><div><span>Chave do Sucesso · Gel na Tips</span><strong>{INVESTIMENTO_CONFIG.precoConfirmado ? price : 'Confira no checkout'}</strong></div><PrimaryCta className="mobile-cta"/></div>
    <GalleryLightbox items={GALERIA_TRABALHOS} currentIndex={active} onClose={() => setActive(null)} onPrev={() => setActive((v) => v === null ? null : (v - 1 + GALERIA_TRABALHOS.length) % GALERIA_TRABALHOS.length)} onNext={() => setActive((v) => v === null ? null : (v + 1) % GALERIA_TRABALHOS.length)}/>
  </div>;
}
