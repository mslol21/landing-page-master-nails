import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Hand,
  Layers,
  LockKeyhole,
  Menu,
  RefreshCw,
  Ruler,
  Sparkles,
  X,
} from "lucide-react";
import {
  TOPICOS_APRENDIZADO,
  PERFIS_PUBLICO,
  INVESTIMENTO_CONFIG,
  GALERIA_TRABALHOS,
  FAQ_ITEMS,
  IMAGENS_PAGINA,
} from "./config/courseConfig";
import { CheckoutButton } from "./components/CheckoutButton";
import { GalleryLightbox } from "./components/GalleryLightbox";
import { FaqAccordion } from "./components/FaqAccordion";
import { initializeAnalytics, trackSectionView } from "./lib/analytics";

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduce ? 0 : 0.58,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function PrimaryCta({
  className = "",
  subtext = "",
  label = "Quero aperfeiçoar minha técnica",
}: {
  className?: string;
  subtext?: string;
  label?: string;
}) {
  return (
    <CheckoutButton
      label={label}
      subtext={subtext}
      size="lg"
      className={className}
      fullWidthMobile
      onUnconfiguredClick={() =>
        document
          .getElementById("investimento")
          ?.scrollIntoView({ behavior: "smooth" })
      }
    />
  );
}

const modules = TOPICOS_APRENDIZADO;
const moduleIcons = [Hand, Layers, BookOpen, Ruler, Sparkles, RefreshCw];

function HeroPhoto() {
  return (
    <figure className="hero-photo-composition">
      <img
        src={IMAGENS_PAGINA.heroPrincipal.src}
        alt={IMAGENS_PAGINA.heroPrincipal.alt}
        width="1024"
        height="1280"
        loading="eager"
        decoding="async"
      />
    </figure>
  );
}

export default function App() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const price = `${INVESTIMENTO_CONFIG.moeda} ${INVESTIMENTO_CONFIG.valorPrincipal}`;
  const heroTransition = {
    duration: reduce ? 0 : 0.8,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  };

  useEffect(() => {
    initializeAnalytics();
    const sections = document.querySelectorAll<HTMLElement>(
      "[data-analytics-section]",
    );
    if (!("IntersectionObserver" in window)) return;
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const name = (entry.target as HTMLElement).dataset.analyticsSection;
          if (entry.isIntersecting && name && !seen.has(name)) {
            seen.add(name);
            trackSectionView(name);
          }
        });
      },
      { threshold: 0.35 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);
  return (
    <div className="mn-page">
      <a className="skip-link" href="#conteudo-principal">
        Pular para o conteúdo principal
      </a>
      <header className="mn-header">
        <div className="mn-header-inner">
          <a
            href="#inicio"
            className="mn-brand"
            onClick={closeMenu}
            aria-label="Master Nails — início"
          >
            <span className="brand-mark">
              M<span>N</span>
            </span>
            <span className="brand-copy">
              <strong>MASTER NAILS</strong>
              <small>GEL NA TIPS · KAMILA MARTINS</small>
            </span>
          </a>
          <button
            className="mobile-menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <nav
            className={"mn-nav " + (menuOpen ? "is-open" : "")}
            aria-label="Navegação principal"
          >
            <a href="#aprenda" onClick={closeMenu}>
              O curso
            </a>
            <a href="#conteudo" onClick={closeMenu}>
              Conteúdo
            </a>
            <a href="#trabalhos" onClick={closeMenu}>
              Galeria
            </a>
            <a href="#instrutora" onClick={closeMenu}>
              Educadora
            </a>
            <a href="#investimento" onClick={closeMenu}>
              Investimento
            </a>
            <a href="#duvidas" onClick={closeMenu}>
              Dúvidas
            </a>
          </nav>
          <PrimaryCta className="header-cta" label="Quero participar" />
        </div>
      </header>

      <main id="conteudo-principal">
        <section
          className="mn-hero"
          id="inicio"
          aria-labelledby="hero-title"
          data-analytics-section="hero"
        >
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-inner">
            <motion.div
              className="hero-copy"
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={heroTransition}
            >
              <div className="eyebrow eyebrow-light">
                <span className="eyebrow-line" />
                APERFEIÇOAMENTO • GEL NA TIPS
              </div>

              <h1 id="hero-title">
                Eleve sua técnica. <em>Encante</em> em cada detalhe.
              </h1>
              <p className="hero-lede">
                Aperfeiçoe o gel na tips com foco em estrutura, acabamento e um
                resultado mais refinado para suas clientes.
              </p>
              <div className="hero-actions">
                <PrimaryCta className="hero-buy" />
                <a className="hero-secondary" href="#conteudo">
                  Conhecer o conteúdo
                </a>
              </div>
            </motion.div>
            <motion.div
              className="hero-art"
              initial={reduce ? false : { opacity: 0, scale: 0.97, x: 18 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{
                duration: reduce ? 0 : 0.9,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <HeroPhoto />
            </motion.div>
          </div>
        </section>

        <div className="hero-trust-strip" aria-label="Informações do curso">
          <div>
            <strong>100% online</strong>
            <span>Estude no seu ritmo</span>
          </div>
          <i />
          <div>
            <strong>Certificado</strong>
            <span>Incluso no curso</span>
          </div>
          <i />
          <div>
            <strong>Acesso vitalício</strong>
            <span>Comece após a confirmação</span>
          </div>
        </div>

        <section
          className="mn-intro mn-section mn-conversion-intro"
          id="aprenda"
          aria-labelledby="learn-title"
          data-analytics-section="aprendizado"
        >
          <Reveal className="intro-grid">
            <div className="intro-heading">
              <div className="section-kicker">
                <span>01</span>
                <i /> VOCÊ SE RECONHECE?
              </div>
              <h2 id="learn-title">
                Seu próximo nível
                <br />
                <em>começa nos detalhes.</em>
              </h2>
              <p className="intro-summary">
                Você já se dedica às unhas. Agora, dê atenção aos detalhes que
                fazem diferença na sua execução.
              </p>
            </div>
            <ol className="pain-list">
              {[
                "O acabamento fica mais espesso do que você gostaria?",
                "Ainda sente insegurança no encaixe e na estrutura das tips?",
                "Quer mais simetria e precisão no lixamento?",
                "Deseja refinar a técnica e ampliar seus serviços?",
              ].map((text, i) => (
                <li key={text}>
                  <span>0{i + 1}</span>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal className="benefit-feature">
            <figure>
              <img
                src={IMAGENS_PAGINA.detalheCurso.src}
                alt={IMAGENS_PAGINA.detalheCurso.alt}
                width="1122"
                height="1402"
                loading="lazy"
                decoding="async"
              />
              <figcaption>Referência ilustrativa de acabamento</figcaption>
            </figure>
            <div>
              <p className="overline">TÉCNICA COM INTENÇÃO</p>
              <h2>
                Mais precisão.
                <br />
                <em>Mais confiança.</em>
              </h2>
              <p>
                Do preparo à manutenção, compreenda as etapas que ajudam a
                construir um alongamento equilibrado e um acabamento refinado.
              </p>
              <ul>
                {[
                  "Preparação e encaixe bem compreendidos",
                  "Estrutura, simetria e controle de produto",
                  "Lixamento técnico e finalização cuidadosa",
                ].map((text) => (
                  <li key={text}>
                    <CheckCircle2 size={18} />
                    {text}
                  </li>
                ))}
              </ul>
              <PrimaryCta
                className="intro-buy"
                subtext="Aulas online · estude no seu ritmo"
              />
            </div>
          </Reveal>
        </section>

        <section
          className="mn-curriculum mn-section"
          id="conteudo"
          aria-labelledby="curriculum-title"
          data-analytics-section="modulos"
        >
          <Reveal className="curriculum-head">
            <div>
              <div className="section-kicker section-kicker-light">
                <span>02</span>
                <i /> CONTEÚDO PROGRAMÁTICO
              </div>
              <h2 id="curriculum-title">
                Seis módulos.
                <br />
                <em>Uma técnica completa.</em>
              </h2>
            </div>
            <p>
              Um caminho organizado para revisar a base, aperfeiçoar a execução
              e cuidar de cada etapa do alongamento.
            </p>
          </Reveal>
          <div className="curriculum-list">
            {modules.map((topic, i) => {
              const Icon = moduleIcons[i];
              return (
                <Reveal
                  className="curriculum-row module-card"
                  key={topic.id}
                  delay={i * 0.035}
                >
                  <span className="curriculum-number">0{i + 1}</span>
                  <span className="module-icon">
                    <Icon size={25} />
                  </span>
                  <div className="module-copy">
                    <h3>{topic.titulo}</h3>
                    <p>{topic.descricao}</p>
                    <strong>{topic.resultado}</strong>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <div className="curriculum-footer">
            <span>APRENDIZADO ONLINE · NO SEU RITMO</span>
            <span>MASTER NAILS · KAMILA MARTINS</span>
          </div>
          <div className="section-cta-dark">
            <p>Comece pela primeira etapa e avance módulo por módulo.</p>
            <PrimaryCta
              className="intro-buy"
              subtext={`${price} · checkout Kiwify`}
            />
          </div>
        </section>

        <section
          className="mn-portfolio mn-section"
          id="trabalhos"
          aria-labelledby="portfolio-title"
          data-analytics-section="trabalhos"
        >
          <Reveal className="portfolio-heading">
            <div>
              <div className="section-kicker">
                <span>03</span>
                <i /> TRABALHOS
              </div>
              <h2 id="portfolio-title">
                Detalhes que fazem
                <br />
                <em>a diferença.</em>
              </h2>
            </div>
            <p>
              Veja detalhes de formatos, cores e acabamentos relacionados à
              técnica Gel na Tips.
            </p>
          </Reveal>
          <div className="portfolio-grid">
            {GALERIA_TRABALHOS.map((item, i) => (
              <motion.button
                type="button"
                key={item.id}
                className={"portfolio-card portfolio-card-" + (i + 1)}
                onClick={() => setActive(i)}
                aria-label={`Ampliar foto ${i + 1}: ${item.titulo}`}
                whileHover={reduce ? undefined : { y: -3 }}
                transition={{ duration: 0.22 }}
              >
                <motion.img
                  layoutId={`gallery-photo-${item.id}`}
                  className="portfolio-image"
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  decoding="async"
                />
                <span className="portfolio-meta">
                  <small>0{i + 1} · GEL NA TIPS</small>
                  <span>{item.titulo}</span>
                </span>
              </motion.button>
            ))}
          </div>
          <p className="portfolio-caption">
            Referências visuais de acabamentos. As imagens não são apresentadas
            como trabalhos de alunas.
          </p>
          <div className="portfolio-cta">
            <p>Leve mais atenção a cada etapa do seu alongamento.</p>
            <PrimaryCta
              className="intro-buy"
              subtext={`${price} · checkout Kiwify`}
            />
          </div>
        </section>

        <section
          className="mn-audience mn-section"
          id="publico"
          data-analytics-section="para-quem"
        >
          <Reveal className="audience-side">
            <div className="section-kicker">
              <span>04</span>
              <i /> PARA QUEM É
            </div>
            <h2>
              Para quem quer
              <br />
              <em>ir além na técnica.</em>
            </h2>
            <p>
              Para manicures e nail designers que querem aperfeiçoar o Gel na
              Tips, refinar o acabamento e ampliar suas possibilidades de
              atendimento. O conteúdo também apresenta as etapas desde a base.
            </p>
            <a href="#investimento" className="text-link">
              Ver investimento e inscrição <ArrowRight size={16} />
            </a>
          </Reveal>
          <div className="audience-list">
            {PERFIS_PUBLICO.map((profile, i) => (
              <Reveal
                className="audience-item"
                key={profile.id}
                delay={i * 0.04}
              >
                <span className="audience-index">0{i + 1}</span>
                <div>
                  <h3>{profile.titulo}</h3>
                  <p>{profile.descricao}</p>
                </div>
                <CheckCircle2 size={18} />
              </Reveal>
            ))}
          </div>
          <div className="section-cta-light">
            <p>Seu próximo passo pode começar pelo aperfeiçoamento.</p>
            <PrimaryCta
              className="intro-buy"
              subtext="Inscrição online pela Kiwify"
            />
          </div>
        </section>

        <section
          className="mn-instructor mn-section instructor-editorial"
          id="instrutora"
          aria-labelledby="instructor-title"
          data-analytics-section="instrutora"
        >
          <Reveal className="instructor-editorial-inner">
            <div>
              <div className="section-kicker section-kicker-light">
                <span>05</span>
                <i /> QUEM CONDUZ O CURSO
              </div>
              <p className="overline">NAIL DESIGNER E INSTRUTORA</p>
              <h2 id="instructor-title">
                Kamila
                <br />
                <em>Martins.</em>
              </h2>
            </div>
            <div className="instructor-editorial-copy">
              <p>
                Uma apresentação organizada da técnica Gel na Tips, com foco no
                preparo, na construção da estrutura, no acabamento e na
                manutenção.
              </p>
              <p>
                O conteúdo é online e pode ser acompanhado no seu ritmo, com
                acesso vitalício após a confirmação da compra.
              </p>
              <PrimaryCta
                className="intro-buy"
                subtext={`${price} · checkout Kiwify`}
              />
            </div>
          </Reveal>
        </section>
        <section
          className="mn-offer mn-section"
          id="investimento"
          aria-labelledby="offer-title"
          data-analytics-section="oferta"
        >
          <Reveal className="offer-card">
            <div className="offer-left">
              <div className="section-kicker section-kicker-light">
                <span>06</span>
                <i /> SUA INSCRIÇÃO
              </div>
              <p className="overline">
                CHAVE DO SUCESSO · MASTER NAILS · GEL NA TIPS
              </p>
              <h2 id="offer-title">
                Invista no seu
                <br />
                <em>próximo passo.</em>
              </h2>
              <p className="offer-intro">
                Curso online de Gel na Tips por {price}.
              </p>
              <ul className="offer-benefits">
                <li>
                  <CheckCircle2 size={19} /> Conteúdo organizado em seis etapas
                </li>
                <li>
                  <CheckCircle2 size={19} /> Aulas online passo a passo
                </li>
                <li>
                  <CheckCircle2 size={19} /> Certificado de conclusão incluso
                </li>
                <li>
                  <CheckCircle2 size={19} /> Acesso vitalício após confirmação
                </li>
              </ul>
            </div>
            <div className="offer-right">
              <div className="offer-price-label">INVESTIMENTO NO CURSO</div>
              {INVESTIMENTO_CONFIG.precoConfirmado ? (
                <p className="offer-price">
                  <small>{INVESTIMENTO_CONFIG.moeda}</small>
                  {INVESTIMENTO_CONFIG.valorPrincipal}
                </p>
              ) : (
                <p className="offer-price offer-price-consult">
                  Confira no checkout
                </p>
              )}
              <p className="offer-installments">
                Consulte opções de parcelamento no checkout.
              </p>
              <p className="payment-methods">
                As formas de pagamento disponíveis aparecem na página segura da
                Kiwify.
              </p>
              <PrimaryCta
                label="Quero garantir meu acesso"
                className="offer-button"
                subtext="Você seguirá para o checkout oficial da Kiwify"
              />
              <p className="secure-note">
                <LockKeyhole size={16} /> Pagamento processado em ambiente
                seguro pela Kiwify
              </p>
            </div>
          </Reveal>
          <p className="offer-footnote">
            A compra é concluída no checkout oficial da Kiwify.
          </p>
        </section>

        <section
          className="mn-faq mn-section"
          id="duvidas"
          aria-labelledby="faq-title"
          data-analytics-section="faq"
        >
          <Reveal className="faq-intro">
            <div className="section-kicker">
              <span>07</span>
              <i /> DÚVIDAS FREQUENTES
            </div>
            <h2 id="faq-title">Dúvidas frequentes</h2>
            <p>Respostas diretas para você decidir com segurança.</p>
          </Reveal>
          <Reveal className="faq-content">
            <FaqAccordion
              items={FAQ_ITEMS.filter(
                (item) => !item.resposta.includes("[INSERIR:"),
              )}
            />
          </Reveal>
          <div className="section-cta-light">
            <p>Pronta para começar?</p>
            <PrimaryCta
              className="intro-buy"
              subtext={`${price} · pagamento pela Kiwify`}
            />
          </div>
        </section>

        <section className="mn-last-call" data-analytics-section="cta-final">
          <div className="section-kicker section-kicker-light">
            <i /> PRÓXIMO PASSO
          </div>
          <h2>
            Sua evolução começa
            <br />
            <em>no próximo detalhe.</em>
          </h2>
          <p>
            Aperfeiçoe o Gel na Tips com Kamila Martins. Aulas online para
            acompanhar e praticar no seu ritmo.
          </p>
          <PrimaryCta
            className="last-call-button"
            subtext={`${price} · checkout Kiwify`}
          />
        </section>
      </main>

      <footer className="mn-footer">
        <a
          href="#inicio"
          className="mn-brand footer-brand"
          aria-label="Master Nails — início"
        >
          <span className="brand-mark">
            M<span>N</span>
          </span>
          <span className="brand-copy">
            <strong>MASTER NAILS</strong>
            <small>GEL NA TIPS · KAMILA MARTINS</small>
          </span>
        </a>
        <p>Curso online de alongamento de unhas em Gel na Tips.</p>
        <span className="footer-copy">
          © 2026 Master Nails · Kamila Martins.
        </span>
      </footer>
      <div className="mobile-purchase-bar">
        <div>
          <span>Chave do Sucesso · Gel na Tips</span>
          <strong>
            {INVESTIMENTO_CONFIG.precoConfirmado
              ? price
              : "Confira no checkout"}
          </strong>
        </div>
        <PrimaryCta className="mobile-cta" label="Quero meu acesso" />
      </div>
      <GalleryLightbox
        items={GALERIA_TRABALHOS}
        currentIndex={active}
        onClose={() => setActive(null)}
        onPrev={() =>
          setActive((v) =>
            v === null
              ? null
              : (v - 1 + GALERIA_TRABALHOS.length) % GALERIA_TRABALHOS.length,
          )
        }
        onNext={() =>
          setActive((v) =>
            v === null ? null : (v + 1) % GALERIA_TRABALHOS.length,
          )
        }
      />
    </div>
  );
}
