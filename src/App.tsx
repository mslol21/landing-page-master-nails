import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowRight, CheckCircle2, CirclePlay, Instagram, LockKeyhole, MapPin, Menu, X } from 'lucide-react';
import { LINK_CHECKOUT, LINK_INSTAGRAM, LINK_WHATSAPP, isLinkConfigured, INSTRUTORA_CONFIG, TOPICOS_APRENDIZADO, PERFIS_PUBLICO, ITENS_INCLUIDOS_CONFIG, INVESTIMENTO_CONFIG, GALERIA_TRABALHOS, FAQ_ITEMS } from './config/courseConfig';
import { CheckoutButton } from './components/CheckoutButton';
import { GalleryLightbox } from './components/GalleryLightbox';
import { FaqAccordion } from './components/FaqAccordion';

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: reduce ? 0 : .68, delay, ease: [0.22, 1, .36, 1] }}>{children}</motion.div>;
}
const Photo = ({ className, src, alt, eager = false }: { className: string; src: string; alt: string; eager?: boolean }) => <img className={className} src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />;

export default function App() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState(false);
  const ready = isLinkConfigured(LINK_CHECKOUT);
  const insta = isLinkConfigured(LINK_INSTAGRAM);
  const wa = isLinkConfigured(LINK_WHATSAPP);
  const included = ITENS_INCLUIDOS_CONFIG.filter((item) => item.confirmado);
  const onCheckoutUnavailable = () => {
    setNotice(true);
    document.getElementById('investimento')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  };
  const closeMenu = () => setMenuOpen(false);
  const heroInitial = reduce ? false : { opacity: 0, y: 22 };
  const heroTransition = { duration: reduce ? 0 : .82, ease: [0.22, 1, .36, 1] as [number, number, number, number] };

  return <div className="mn-page">
    <a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a>
    <header className="mn-header">
      <div className="mn-header-inner">
        <a href="#" className="mn-brand" onClick={closeMenu} aria-label="Master Nails — início"><span className="brand-mark">M<span>N</span></span><span className="brand-copy"><strong>MASTER NAILS</strong><small>GEL NA TIPS · KAMILA MARTINS</small></span></a>
        <button className="mobile-menu-button" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20}/> : <Menu size={20}/>}</button>
        <nav className={'mn-nav ' + (menuOpen ? 'is-open' : '')} aria-label="Navegação principal">
          <a href="#curso" onClick={closeMenu}>O que você aprende</a><a href="#trabalhos" onClick={closeMenu}>Trabalhos</a><a href="#investimento" onClick={closeMenu}>Investimento</a><a href="#duvidas" onClick={closeMenu}>Dúvidas</a>
        </nav>
        <CheckoutButton label="Quero minha vaga" subtext="" size="md" fullWidthMobile={false} className="header-cta" onUnconfiguredClick={onCheckoutUnavailable}/>
      </div>
    </header>

    <main id="conteudo-principal">
      <section className="mn-hero" aria-labelledby="hero-title">
        <div className="hero-glow" aria-hidden="true"/>
        <div className="hero-inner">
          <motion.div className="hero-copy" initial={heroInitial} animate={{ opacity: 1, y: 0 }} transition={heroTransition}>
            <div className="eyebrow eyebrow-light"><span className="eyebrow-line"/>A CHAVE DO SUCESSO</div>
            <h1 id="hero-title">Master Nails <em>Gel na Tips</em></h1>
            <p className="hero-lede">Aprenda <strong>Gel na Tips</strong> passo a passo e domine uma das técnicas mais procuradas pelas clientes.</p>
            <div className="hero-actions">
              <CheckoutButton label="Quero minha vaga" subtext="Acesso imediato e vitalício" size="lg" className="hero-buy" onUnconfiguredClick={onCheckoutUnavailable}/>
              <a className="hero-secondary" href="#trabalhos"><span className="play-ring"><CirclePlay size={20}/></span>Veja os trabalhos</a>
            </div>
            <div className="hero-proof"><span>Aulas passo a passo</span><i/><span>Certificado incluso</span><i/><span>Acesso imediato e vitalício</span></div>{INVESTIMENTO_CONFIG.precoConfirmado&&<p className="hero-investment">Curso online por <strong>{INVESTIMENTO_CONFIG.moeda} {INVESTIMENTO_CONFIG.valorPrincipal}</strong></p>}
          </motion.div>
          <motion.div className="hero-art" initial={reduce ? false : { opacity: 0, scale: .96, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: reduce ? 0 : .9, delay: .12, ease: [0.22, 1, .36, 1] }}>
            <div className="hero-photo-frame"><Photo className="hero-photo" src="/images/hero-kamila-editorial.webp" alt="Nail designer realizando uma aplicação de unhas em estúdio" eager/><div className="photo-caption"><span>MASTER NAILS</span><span>BELEZA COM TÉCNICA</span></div></div>
          </motion.div>
        </div>
        <a className="scroll-cue" href="#curso"><span>ROLE PARA DESCOBRIR</span><ArrowDown size={15}/></a>
      </section>

      <section className="mn-intro mn-section mn-conversion-intro" id="curso" aria-labelledby="conversion-title">
        <Reveal className="section-kicker"><span>01</span><i/> APRENDIZADO PRÁTICO</Reveal>
        <Reveal className="intro-grid"><div className="intro-heading"><p className="overline">FORMAÇÃO ONLINE · GEL NA TIPS</p><h2 id="conversion-title">Do primeiro passo<br/><em>à finalização.</em></h2></div><div className="intro-copy"><p>Aprenda a técnica completa: <strong>preparo, aplicação das tips, construção da estrutura, lixamento, acabamento e manutenção.</strong> As aulas seguem uma sequência para você estudar no seu ritmo.</p><a href="#conteudo" className="text-link">Confira tudo o que vai aprender <ArrowRight size={16}/></a></div></Reveal>
        <div className="conversion-benefits">
          {[
            ['01', 'Aulas passo a passo', 'Acompanhe a execução da técnica em cada etapa.'],
            ['02', 'Estude no seu ritmo', 'Acesso online para organizar os estudos conforme a sua rotina.'],
            ['03', 'Certificado incluso', 'Receba o certificado após concluir as aulas.'],
          ].map(([n, title, description], i) => <Reveal className="conversion-benefit" key={n} delay={i * .06}><span>{n}</span><CheckCircle2 size={18}/><h3>{title}</h3><p>{description}</p></Reveal>)}
        </div>
        <div className="conversion-cta"><span>Comece agora · Acesso imediato e vitalício</span><CheckoutButton label="Quero minha vaga" subtext={INVESTIMENTO_CONFIG.precoConfirmado?`${INVESTIMENTO_CONFIG.moeda} ${INVESTIMENTO_CONFIG.valorPrincipal} · inscrição pela Kiwify`:'Confira o valor no checkout'} size="lg" className="intro-buy" onUnconfiguredClick={onCheckoutUnavailable}/></div>
      </section>

      <section className="mn-curriculum mn-section" id="conteudo" aria-labelledby="curriculum-title">
        <Reveal className="curriculum-head"><div><div className="section-kicker section-kicker-light"><span>02</span><i/> CONTEÚDO PROGRAMÁTICO</div><h2 id="curriculum-title">Uma base técnica,<br/><em>do começo ao fim.</em></h2></div><p>Seis momentos importantes do processo, apresentados em sequência para facilitar o aprendizado e a prática.</p></Reveal>
        <div className="curriculum-list">{TOPICOS_APRENDIZADO.map((topic,i)=><Reveal className="curriculum-row" key={topic.id} delay={i*.04}><span className="curriculum-number">0{i+1}</span><h3>{topic.titulo}</h3><p>{topic.descricao}</p><span className="row-spark">✳</span></Reveal>)}</div>
        <div className="curriculum-footer"><span>DO PREPARO AO ACABAMENTO</span><span>MASTER NAILS · {INSTRUTORA_CONFIG.nome.toUpperCase()}</span></div>
      </section>

      <section className="mn-portfolio mn-section" id="trabalhos" aria-labelledby="portfolio-title">
        <Reveal className="portfolio-heading"><div><div className="section-kicker"><span>03</span><i/> PORTFÓLIO</div><h2 id="portfolio-title">Olhe de perto.<br/><em>Repare nos detalhes.</em></h2></div><p>Trabalhos de Gel na Tips para observar formatos, cores e possibilidades de acabamento.</p></Reveal>
        <div className="portfolio-grid">{GALERIA_TRABALHOS.map((item,i)=><motion.button type="button" key={item.id} className={'portfolio-card portfolio-card-'+(i+1)} onClick={()=>setActive(i)} aria-label={'Ampliar: '+item.titulo} whileHover={reduce ? undefined : { y:-4 }} transition={{duration:.25}}><img className="portfolio-image" src={item.src} alt="" loading="lazy" decoding="async"/><span className="portfolio-meta"><small>0{i+1} <i>·</i> GEL NA TIPS</small><span>{item.titulo}</span></span></motion.button>)}</div>
        <p className="portfolio-caption">TRABALHOS DA INSTRUTORA <span>·</span> GEL NA TIPS</p>
        <div className="portfolio-cta"><p>Pronta para aprender a técnica passo a passo?</p><CheckoutButton label="Quero minha vaga" subtext="Acesso imediato e vitalício" size="lg" className="intro-buy" onUnconfiguredClick={onCheckoutUnavailable}/></div>
      </section>

      <section className="mn-audience mn-section"><Reveal className="audience-side"><div className="section-kicker"><span>04</span><i/> PARA QUEM É</div><h2>Comece do zero<br/><em>ou vá além.</em></h2><p>Para quem quer aprender uma nova técnica e para profissionais que desejam ampliar o que oferecem às clientes.</p><a href="#investimento" className="text-link">Ver investimento e inscrição <ArrowRight size={16}/></a></Reveal><div className="audience-list">{PERFIS_PUBLICO.map((p,i)=><Reveal className="audience-item" key={p.id} delay={i*.05}><span className="audience-index">0{i+1}</span><div><h3>{p.titulo}</h3><p>{p.descricao}</p></div><CheckCircle2 size={17}/></Reveal>)}</div></section>

      <section className="mn-offer mn-section" id="investimento" aria-labelledby="offer-title"><Reveal className="offer-card"><div className="offer-left"><div className="section-kicker section-kicker-light"><span>05</span><i/> SUA INSCRIÇÃO</div><p className="overline">CHAVE DO SUCESSO · MASTER NAILS · GEL NA TIPS</p><h2 id="offer-title">Faça sua inscrição<br/><em>e comece agora.</em></h2><ul className="offer-checklist">{included.map((item)=><li key={item.id}><CheckCircle2 size={17}/><span>{item.titulo}</span></li>)}</ul></div><div className="offer-right"><div className="offer-price-label">INVESTIMENTO</div>{INVESTIMENTO_CONFIG.precoConfirmado?<p className="offer-price"><small>{INVESTIMENTO_CONFIG.moeda}</small>{INVESTIMENTO_CONFIG.valorPrincipal}</p>:<p className="offer-price offer-price-consult">Confira no checkout</p>}{INVESTIMENTO_CONFIG.mostrarParcelamento&&<p className="offer-installments">{INVESTIMENTO_CONFIG.textoParcelamento}</p>}<p className="offer-terms">Consulte formas de pagamento e condições vigentes na página oficial de inscrição.</p><CheckoutButton label="Quero minha vaga" subtext="Acesso imediato e vitalício" size="lg" className="offer-button" onUnconfiguredClick={onCheckoutUnavailable}/><p className="secure-note"><LockKeyhole size={13}/> Pagamento processado em ambiente seguro</p>{notice&&!ready&&<div className="checkout-notice" role="status">O endereço oficial de inscrição ainda precisa ser configurado.</div>}</div></Reveal><p className="offer-footnote">Conteúdo e condições conforme informações da página oficial de inscrição.</p></section>

      <section className="mn-instructor mn-section" id="instrutora" aria-labelledby="instructor-title"><div className="instructor-inner"><Reveal className="instructor-visual"><Photo className="instructor-photo" src="/images/instructor-kamila-editorial.webp" alt="Kamila Martins trabalhando como nail designer"/><div className="instructor-stamp"><small>NAIL DESIGNER <i>·</i> ITAQUERA, SP</small></div></Reveal><Reveal className="instructor-copy" delay={.1}><div className="section-kicker section-kicker-light"><span>06</span><i/> QUEM ENSINA</div><p className="overline">APRENDA COM QUEM ENSINA A TÉCNICA</p><h2 id="instructor-title">{INSTRUTORA_CONFIG.nome}<em> — instrutora do curso Gel na Tips.</em></h2><p className="instructor-bio">{INSTRUTORA_CONFIG.resumoConfirmado}</p><div className="instructor-location"><MapPin size={16}/><span>{INSTRUTORA_CONFIG.localizacao}</span></div><a className="instructor-link" href="#investimento">Quero aprender com a Kamila <ArrowRight size={16}/></a></Reveal></div></section>



      <section className="mn-faq mn-section" id="duvidas"><Reveal className="faq-intro"><div className="section-kicker"><span>07</span><i/> DÚVIDAS</div><h2>Quer saber<br/><em>mais alguma coisa?</em></h2><p>Confira as respostas antes de fazer sua inscrição.</p><a href="#investimento" className="text-link">Voltar à inscrição <ArrowRight size={16}/></a></Reveal><Reveal className="faq-content"><FaqAccordion items={FAQ_ITEMS}/></Reveal></section>

      <section className="mn-last-call"><div className="last-call-ornament" aria-hidden="true">✳</div><div className="section-kicker section-kicker-light"><i/> PRÓXIMO PASSO</div><h2>Comece sua jornada<br/><em>no Gel na Tips.</em></h2><p>Inscreva-se no curso Chave do Sucesso Master Nails e comece a estudar online.</p><CheckoutButton label="Quero minha vaga" subtext="Acesso imediato e vitalício" size="lg" className="last-call-button" onUnconfiguredClick={onCheckoutUnavailable}/></section>
    </main>

    <footer className="mn-footer"><a href="#" className="mn-brand footer-brand" aria-label="Master Nails — início"><span className="brand-mark">M<span>N</span></span><span className="brand-copy"><strong>MASTER NAILS</strong><small>GEL NA TIPS · KAMILA MARTINS</small></span></a><p>Curso livre online de capacitação e aperfeiçoamento técnico.</p><div className="footer-socials">{insta&&<a href={LINK_INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17}/></a>}{wa&&<a href={LINK_WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp"><span>W</span></a>}</div><span className="footer-copy">© 2026 Master Nails · Kamila Martins</span></footer>
    <div className="mobile-purchase-bar"><div><span>Chave do Sucesso · Gel na Tips</span><strong>{INVESTIMENTO_CONFIG.precoConfirmado?'R$ '+INVESTIMENTO_CONFIG.valorPrincipal:'Consulte'}</strong></div><CheckoutButton label="Inscrever-se" subtext="" size="md" fullWidthMobile={false} onUnconfiguredClick={onCheckoutUnavailable}/></div>
    <GalleryLightbox items={GALERIA_TRABALHOS} currentIndex={active} onClose={()=>setActive(null)} onPrev={()=>setActive((v)=>v===null?null:(v-1+GALERIA_TRABALHOS.length)%GALERIA_TRABALHOS.length)} onNext={()=>setActive((v)=>v===null?null:(v+1)%GALERIA_TRABALHOS.length)}/>
  </div>;
}
