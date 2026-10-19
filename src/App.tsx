import React, { useState } from 'react';
import {
  CheckCircle2,
  Sparkles,
  Award,
  PlayCircle,
  Layers,
  Scissors,
  ShieldCheck,
  Sliders,
  RefreshCw,
  UserCheck,
  MapPin,
  ZoomIn,
  Instagram,
  MessageCircle,
  Lock,
  Info,
} from 'lucide-react';
import {
  LINK_CHECKOUT,
  LINK_INSTAGRAM,
  LINK_WHATSAPP,
  isLinkConfigured,
  INSTRUTORA_CONFIG,
  HERO_BENEFICIOS_CONFIRMADOS,
  TOPICOS_APRENDIZADO,
  PERFIS_PUBLICO,
  ITENS_INCLUIDOS_CONFIG,
  INVESTIMENTO_CONFIG,
  IMAGENS_PAGINA,
  GALERIA_TRABALHOS,
  FAQ_ITEMS,
  RODAPE_CONFIG,
} from './config/courseConfig';
import { CheckoutButton } from './components/CheckoutButton';
import { GalleryLightbox } from './components/GalleryLightbox';
import { FaqAccordion } from './components/FaqAccordion';

const TOPIC_ICONS: Record<string, React.ReactNode> = {
  preparacao: <ShieldCheck className="h-5 w-5 text-gold-400" aria-hidden="true" />,
  'aplicacao-tips': <Layers className="h-5 w-5 text-gold-400" aria-hidden="true" />,
  'curvatura-estrutura': <Sliders className="h-5 w-5 text-gold-400" aria-hidden="true" />,
  'lixamento-tecnico': <Scissors className="h-5 w-5 text-gold-400" aria-hidden="true" />,
  acabamento: <Sparkles className="h-5 w-5 text-gold-400" aria-hidden="true" />,
  'manutencao-remocao': <RefreshCw className="h-5 w-5 text-gold-400" aria-hidden="true" />,
};

export function App() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [checkoutNoticeVisible, setCheckoutNoticeVisible] = useState(false);

  const itensConfirmados = ITENS_INCLUIDOS_CONFIG.filter((item) => item.confirmado);
  const itensPendentesConfirmacao = ITENS_INCLUIDOS_CONFIG.filter((item) => !item.confirmado);

  const instagramConfigured = isLinkConfigured(LINK_INSTAGRAM);
  const whatsappConfigured = isLinkConfigured(LINK_WHATSAPP);
  const checkoutConfigured = isLinkConfigured(LINK_CHECKOUT);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrevLightbox = () => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + GALERIA_TRABALHOS.length) % GALERIA_TRABALHOS.length
    );
  };

  const handleNextLightbox = () => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % GALERIA_TRABALHOS.length
    );
  };

  const handleUnconfiguredCheckout = () => {
    setCheckoutNoticeVisible(true);
    const investEl = document.getElementById('investimento');
    if (investEl) {
      investEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-zinc-100 flex flex-col">
      {/* Link de salto para acessibilidade por teclado */}
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-gold-400 focus:px-4 focus:py-2.5 focus:font-semibold focus:text-obsidian-950"
      >
        Pular para o conteúdo principal
      </a>

      {/* CABEÇALHO */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-obsidian-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <a
            href="#"
            className="flex flex-col focus-visible:rounded"
            aria-label="Master Nails: Gel na Tips — Início"
          >
            <span className="font-serif text-lg sm:text-xl font-semibold tracking-wider text-zinc-100">
              MASTER NAILS <span className="text-gold-400">•</span> GEL NA TIPS
            </span>
            <span className="text-[11px] uppercase tracking-widest text-zinc-400">
              Por {INSTRUTORA_CONFIG.nome}
            </span>
          </a>

          <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-7 text-sm text-zinc-300">
            <a href="#sobre-o-curso" className="hover:text-gold-300 transition-colors">
              O Curso
            </a>
            <a href="#o-que-vai-aprender" className="hover:text-gold-300 transition-colors">
              Conteúdo
            </a>
            <a href="#galeria" className="hover:text-gold-300 transition-colors">
              Trabalhos
            </a>
            <a href="#instrutora" className="hover:text-gold-300 transition-colors">
              Instrutora
            </a>
            <a href="#duvidas" className="hover:text-gold-300 transition-colors">
              Dúvidas
            </a>
          </nav>

          <div>
            <CheckoutButton
              label="Quero minha vaga"
              subtext=""
              size="md"
              fullWidthMobile={false}
              onUnconfiguredClick={handleUnconfiguredCheckout}
            />
          </div>
        </div>
      </header>

      <main id="conteudo-principal" className="flex-1">
        {/* 1. HERO */}
        <section
          aria-labelledby="hero-heading"
          className="relative overflow-hidden border-b border-zinc-900 pt-10 pb-16 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Coluna de Texto */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-obsidian-900 px-3.5 py-1.5 text-xs sm:text-sm text-gold-300 mb-6">
                  <Sparkles className="h-3.5 w-3.5 text-gold-400 shrink-0" aria-hidden="true" />
                  <span>
                    Curso Online • <strong>{INSTRUTORA_CONFIG.nome}</strong> ({INSTRUTORA_CONFIG.atuacao})
                  </span>
                </div>

                <h1
                  id="hero-heading"
                  className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.15] tracking-tight text-zinc-50"
                >
                  Aprenda Gel na Tips com técnica, estrutura e acabamento profissional
                </h1>

                <p className="mt-5 text-base sm:text-lg lg:text-xl leading-relaxed text-zinc-300 max-w-2xl">
                  Um curso online para aprender no seu ritmo, seja para começar do zero ou aperfeiçoar sua técnica.
                </p>

                {/* Até 3 benefícios confirmados */}
                <ul
                  aria-label="Benefícios confirmados do curso"
                  className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
                >
                  {HERO_BENEFICIOS_CONFIRMADOS.map((beneficio) => (
                    <li
                      key={beneficio}
                      className="flex items-center gap-2.5 rounded-lg border border-zinc-800/90 bg-obsidian-900/80 px-3.5 py-3 text-sm font-medium text-zinc-200"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                      <span>{beneficio}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA em destaque */}
                <div className="mt-8 sm:mt-10">
                  <CheckoutButton
                    label="Quero minha vaga"
                    subtext="Acesse as informações e condições de pagamento"
                    size="lg"
                    onUnconfiguredClick={handleUnconfiguredCheckout}
                  />
                </div>
              </div>

              {/* Coluna da Imagem Principal do Hero */}
              <div className="lg:col-span-5">
                <figure className="relative mx-auto max-w-md lg:max-w-none overflow-hidden rounded-2xl border border-zinc-800 bg-obsidian-900 shadow-2xl">
                  <div className="aspect-[4/5] w-full overflow-hidden bg-obsidian-850">
                    <img
                      src={IMAGENS_PAGINA.heroPrincipal.src}
                      alt={IMAGENS_PAGINA.heroPrincipal.alt}
                      width={800}
                      height={1000}
                      loading="eager"
                      fetchPriority="high"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="border-t border-zinc-800/90 bg-obsidian-900/95 px-5 py-4">
                    <p className="text-xs uppercase tracking-widest text-gold-400 font-medium">
                      Master Nails: Gel na Tips
                    </p>
                    <p className="mt-1 text-sm text-zinc-300">
                      Ministrado por <strong className="text-zinc-100">{INSTRUTORA_CONFIG.nome}</strong>, nail designer e instrutora
                    </p>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* 2. APRESENTAÇÃO DO CURSO */}
        <section
          id="sobre-o-curso"
          aria-labelledby="apresentacao-heading"
          className="border-b border-zinc-900 py-16 sm:py-24 bg-obsidian-900/40"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <figure className="overflow-hidden rounded-2xl border border-zinc-800 bg-obsidian-900">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-obsidian-850">
                    <img
                      src={IMAGENS_PAGINA.detalheCurso.src}
                      alt={IMAGENS_PAGINA.detalheCurso.alt}
                      width={800}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="border-t border-zinc-800 px-5 py-3.5 text-xs sm:text-sm text-zinc-400">
                    {IMAGENS_PAGINA.detalheCurso.legenda}
                  </figcaption>
                </figure>
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
                  Apresentação do Curso
                </span>
                <h2
                  id="apresentacao-heading"
                  className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-zinc-50"
                >
                  O que é a técnica Gel na Tips e como o curso funciona
                </h2>

                <div className="mt-5 space-y-4 text-base leading-relaxed text-zinc-300">
                  <p>
                    O alongamento <strong className="text-zinc-100">Gel na Tips</strong> utiliza tips como base de extensão combinadas à construção estrutural em gel. Para entregar um resultado resistente, simétrico e com aspecto natural, cada etapa precisa ser executada com critério técnico.
                  </p>
                  <p>
                    No curso online <strong className="text-zinc-100">Master Nails: Gel na Tips</strong>, a instrutora{' '}
                    <strong className="text-zinc-100">{INSTRUTORA_CONFIG.nome}</strong> conduz o processo passo a passo: desde a preparação correta da lâmina natural e escolha da tip até o controle do gel, curvatura, sequência de lixamento técnico, acabamento próximo à cutícula e procedimentos seguros de manutenção e remoção.
                  </p>
                  <p>
                    Por ser um curso em formato online, você pode assistir às aulas e rever os detalhes técnicos de aplicação de acordo com a sua disponibilidade de horários.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. O QUE VOCÊ VAI APRENDER */}
        <section
          id="o-que-vai-aprender"
          aria-labelledby="aprendizado-heading"
          className="border-b border-zinc-900 py-16 sm:py-24"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
                Conteúdo Técnico
              </span>
              <h2
                id="aprendizado-heading"
                className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-zinc-50"
              >
                O que você vai aprender
              </h2>
              <p className="mt-3 text-base text-zinc-300">
                Etapas práticas abordadas no curso para executar o alongamento Gel na Tips com estrutura correta e acabamento limpo:
              </p>
            </div>

            <ol className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {TOPICOS_APRENDIZADO.map((topico) => (
                <li
                  key={topico.id}
                  className="flex flex-col justify-between rounded-xl border border-zinc-800/90 bg-obsidian-900 p-6 transition-colors hover:border-gold-400/40"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gold-400/30 bg-obsidian-850">
                        {TOPIC_ICONS[topico.id]}
                      </span>
                      <span className="font-serif text-sm font-semibold tracking-widest text-gold-400/80">
                        ETAPA {topico.numero}
                      </span>
                    </div>
                    <h3 className="mt-5 font-serif text-xl font-semibold text-zinc-100">
                      {topico.titulo}
                    </h3>
                    <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-zinc-300">
                      {topico.descricao}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4. GALERIA DE TRABALHOS */}
        <section
          id="galeria"
          aria-labelledby="galeria-heading"
          className="border-b border-zinc-900 py-16 sm:py-24 bg-obsidian-900/40"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
                  Acabamento e Estrutura
                </span>
                <h2
                  id="galeria-heading"
                  className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-zinc-50"
                >
                  Galeria de trabalhos
                </h2>
                <p className="mt-3 text-base text-zinc-300">
                  Observe de perto a simetria, o nivelamento de superfície e o acabamento na área da cutícula. Toque ou clique em qualquer imagem para ampliar.
                </p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {GALERIA_TRABALHOS.map((item, index) => (
                <div
                  key={item.id}
                  className="group flex flex-col overflow-hidden rounded-xl border border-zinc-800/90 bg-obsidian-900 transition-colors hover:border-gold-400/50"
                >
                  <button
                    type="button"
                    onClick={() => handleOpenLightbox(index)}
                    aria-label={`Ampliar imagem: ${item.titulo} — ${item.alt}`}
                    className="relative aspect-[4/4] w-full overflow-hidden bg-obsidian-850 text-left focus-visible:outline-offset-[-4px]"
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      width={600}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md border border-zinc-700/80 bg-obsidian-950/85 px-2.5 py-1.5 text-xs font-medium text-zinc-200 backdrop-blur-sm group-hover:border-gold-400/60 group-hover:text-gold-300">
                      <ZoomIn className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
                      <span>Ampliar</span>
                    </span>
                  </button>
                  <div className="p-4 sm:p-5">
                    <h3 className="font-serif text-lg font-semibold text-zinc-100">
                      {item.titulo}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                      {item.detalheTecnico}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. PARA QUEM É O CURSO */}
        <section
          id="para-quem-e"
          aria-labelledby="publico-heading"
          className="border-b border-zinc-900 py-16 sm:py-24"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
                Perfil das Alunas
              </span>
              <h2
                id="publico-heading"
                className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-zinc-50"
              >
                Para quem é o curso
              </h2>
              <p className="mt-3 text-base text-zinc-300">
                O treinamento foi organizado para atender diferentes momentos de aprendizado na área de unhas:
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {PERFIS_PUBLICO.map((perfil) => (
                <div
                  key={perfil.id}
                  className="flex items-start gap-4 rounded-xl border border-zinc-800/90 bg-obsidian-900 p-6"
                >
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gold-400/30 bg-obsidian-850 text-gold-400">
                    <UserCheck className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-zinc-100">
                      {perfil.titulo}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-zinc-300">
                      {perfil.descricao}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. O QUE ESTÁ INCLUÍDO */}
        <section
          id="o-que-esta-incluido"
          aria-labelledby="incluido-heading"
          className="border-b border-zinc-900 py-16 sm:py-24 bg-obsidian-900/40"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
                Estrutura de Estudo
              </span>
              <h2
                id="incluido-heading"
                className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-zinc-50"
              >
                O que está incluído
              </h2>
              <p className="mt-3 text-base text-zinc-300">
                Confira os recursos confirmados na sua inscrição no curso Master Nails: Gel na Tips:
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {itensConfirmados.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-zinc-800 bg-obsidian-900 p-6"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gold-400/30 bg-obsidian-850 text-gold-400">
                    {item.id === 'aulas' && <PlayCircle className="h-5 w-5" aria-hidden="true" />}
                    {item.id === 'acesso-online' && <Sparkles className="h-5 w-5" aria-hidden="true" />}
                    {item.id === 'certificado' && <Award className="h-5 w-5" aria-hidden="true" />}
                    {item.id !== 'aulas' &&
                      item.id !== 'acesso-online' &&
                      item.id !== 'certificado' && (
                        <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                      )}
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-semibold text-zinc-100">
                    {item.titulo}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-zinc-300">
                    {item.descricao}
                  </p>
                </div>
              ))}
            </div>

            {itensPendentesConfirmacao.length > 0 && (
              <p className="mt-6 text-xs sm:text-sm text-zinc-400">
                * Informações adicionais sobre prazo de acesso, suporte para dúvidas, materiais complementares e atualizações podem ser consultadas nas condições vigentes exibidas na página de inscrição.
              </p>
            )}
          </div>
        </section>

        {/* 7. APRESENTAÇÃO DA INSTRUTORA */}
        <section
          id="instrutora"
          aria-labelledby="instrutora-heading"
          className="border-b border-zinc-900 py-16 sm:py-24"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <figure className="mx-auto max-w-sm lg:max-w-none overflow-hidden rounded-2xl border border-zinc-800 bg-obsidian-900">
                  <div className="aspect-[4/5] w-full overflow-hidden bg-obsidian-850">
                    <img
                      src={INSTRUTORA_CONFIG.fotoUrl}
                      alt={INSTRUTORA_CONFIG.fotoAlt}
                      width={640}
                      height={800}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </figure>
              </div>

              <div className="lg:col-span-7">
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
                  Quem Ministra o Curso
                </span>
                <h2
                  id="instrutora-heading"
                  className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-zinc-50"
                >
                  {INSTRUTORA_CONFIG.nome}
                </h2>
                <p className="mt-1 text-base font-medium text-gold-300">
                  {INSTRUTORA_CONFIG.atuacao}
                </p>

                <div className="mt-3 inline-flex items-center gap-2 text-sm text-zinc-400">
                  <MapPin className="h-4 w-4 text-gold-400 shrink-0" aria-hidden="true" />
                  <span>Atuação em {INSTRUTORA_CONFIG.localizacao}</span>
                </div>

                <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-300">
                  <p>{INSTRUTORA_CONFIG.resumoConfirmado}</p>
                  {INSTRUTORA_CONFIG.notaComplementarOpcional && (
                    <p>{INSTRUTORA_CONFIG.notaComplementarOpcional}</p>
                  )}
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-zinc-800/90 pt-6">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-zinc-400">Especialidade no curso</p>
                    <p className="mt-1 text-sm sm:text-base font-medium text-zinc-100">
                      Técnica Gel na Tips — Estrutura e Acabamento
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-zinc-400">Localização</p>
                    <p className="mt-1 text-sm sm:text-base font-medium text-zinc-100">
                      {INSTRUTORA_CONFIG.localizacao}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. INVESTIMENTO */}
        <section
          id="investimento"
          aria-labelledby="investimento-heading"
          className="border-b border-zinc-900 py-16 sm:py-24 bg-obsidian-900/50"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-2xl border border-gold-400/35 bg-obsidian-900 p-6 sm:p-10 lg:p-12 shadow-2xl">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
                  Inscrição Online
                </span>
                <h2
                  id="investimento-heading"
                  className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-zinc-50"
                >
                  Master Nails: Gel na Tips
                </h2>
                <p className="mt-3 text-base text-zinc-300">
                  Aprenda todas as etapas técnicas do alongamento Gel na Tips com aulas passo a passo ministradas por {INSTRUTORA_CONFIG.nome}.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center border-t border-zinc-800/90 pt-8">
                {/* Resumo do que está confirmado */}
                <div className="lg:col-span-7 space-y-3.5">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
                    Resumo da sua inscrição:
                  </h3>
                  <ul className="space-y-3 text-sm sm:text-base text-zinc-200">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>6 etapas técnicas: da preparação da unha natural à manutenção e remoção</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Aulas passo a passo em ambiente online</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Certificado de conclusão incluso</span>
                    </li>
                  </ul>
                </div>

                {/* Bloco de Valor Configurável */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center rounded-xl border border-zinc-800 bg-obsidian-950 p-6 text-center">
                  {INVESTIMENTO_CONFIG.mostrarPrecoAnterior && (
                    <p className="text-sm text-zinc-400 line-through">
                      De {INVESTIMENTO_CONFIG.valorAnterior}
                    </p>
                  )}

                  <p className="text-xs uppercase tracking-widest text-zinc-400">
                    Investimento
                  </p>

                  {INVESTIMENTO_CONFIG.precoConfirmado ? (
                    <div className="mt-2 flex items-baseline justify-center gap-1">
                      <span className="text-lg font-medium text-gold-400">
                        {INVESTIMENTO_CONFIG.moeda}
                      </span>
                      <span className="font-serif text-4xl sm:text-5xl font-bold text-zinc-50">
                        {INVESTIMENTO_CONFIG.valorPrincipal}
                      </span>
                    </div>
                  ) : (
                    <p className="mt-2 font-serif text-2xl font-semibold text-zinc-100">
                      Consulte na página de pagamento
                    </p>
                  )}

                  {INVESTIMENTO_CONFIG.mostrarParcelamento && (
                    <p className="mt-1.5 text-xs sm:text-sm text-gold-300">
                      {INVESTIMENTO_CONFIG.textoParcelamento}
                    </p>
                  )}

                  <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                    {INVESTIMENTO_CONFIG.observacaoValor}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col items-center border-t border-zinc-800/90 pt-8">
                <CheckoutButton
                  label="Quero minha vaga"
                  subtext="Acesse as informações e condições de pagamento"
                  size="lg"
                  className="items-center"
                  onUnconfiguredClick={handleUnconfiguredCheckout}
                />

                <div className="mt-4 inline-flex items-center gap-2 text-xs text-zinc-400">
                  <Lock className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
                  <span>Inscrição processada na página segura de checkout</span>
                </div>

                {checkoutNoticeVisible && !checkoutConfigured && (
                  <div
                    role="status"
                    className="mt-5 flex items-start gap-2.5 rounded-lg border border-gold-400/40 bg-gold-400/10 px-4 py-3 text-xs sm:text-sm text-zinc-200 max-w-xl"
                  >
                    <Info className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      Para ativar o redirecionamento ao pagamento, substitua a constante{' '}
                      <code className="rounded bg-obsidian-950 px-1.5 py-0.5 text-gold-300">
                        LINK_CHECKOUT
                      </code>{' '}
                      em <code className="text-gold-300">src/config/courseConfig.ts</code> pela URL oficial de checkout.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 9. DÚVIDAS FREQUENTES */}
        <section
          id="duvidas"
          aria-labelledby="faq-heading"
          className="border-b border-zinc-900 py-16 sm:py-24"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
                Perguntas e Respostas
              </span>
              <h2
                id="faq-heading"
                className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-zinc-50"
              >
                Dúvidas frequentes
              </h2>
              <p className="mt-3 text-base text-zinc-300">
                Informações essenciais para avaliar o curso com clareza antes da sua inscrição.
              </p>
            </div>

            <FaqAccordion items={FAQ_ITEMS} />
          </div>
        </section>

        {/* 10. CTA FINAL */}
        <section
          aria-labelledby="cta-final-heading"
          className="py-16 sm:py-24 bg-obsidian-900/60"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2
              id="cta-final-heading"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-zinc-50"
            >
              Domine o passo a passo da técnica Gel na Tips no seu ritmo
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-zinc-300">
              Aprenda a preparação correta da lâmina, aplicação das tips, curvatura, lixamento técnico, acabamento e manutenção com orientação clara de {INSTRUTORA_CONFIG.nome}.
            </p>
            <div className="mt-8 flex justify-center">
              <CheckoutButton
                label="Quero minha vaga"
                subtext="Acesse as informações e condições de pagamento"
                size="lg"
                className="items-center"
                onUnconfiguredClick={handleUnconfiguredCheckout}
              />
            </div>
          </div>
        </section>
      </main>

      {/* RODAPÉ */}
      <footer className="border-t border-zinc-800/90 bg-obsidian-950 py-12 text-sm text-zinc-400">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="font-serif text-lg font-semibold text-zinc-100">
                Master Nails: Gel na Tips
              </p>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                {INSTRUTORA_CONFIG.nome} — {INSTRUTORA_CONFIG.atuacao} ({INSTRUTORA_CONFIG.localizacao})
              </p>
            </div>

            {/* Links de Instagram e WhatsApp: exibidos somente quando fornecidos */}
            {(instagramConfigured || whatsappConfigured) && (
              <div className="flex flex-wrap items-center gap-4">
                {instagramConfigured && (
                  <a
                    href={LINK_INSTAGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-obsidian-900 px-4 py-2 text-zinc-200 hover:border-gold-400/50 hover:text-gold-300 transition-colors"
                  >
                    <Instagram className="h-4 w-4 text-gold-400" aria-hidden="true" />
                    <span>Instagram</span>
                  </a>
                )}
                {whatsappConfigured && (
                  <a
                    href={LINK_WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-obsidian-900 px-4 py-2 text-zinc-200 hover:border-gold-400/50 hover:text-gold-300 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 text-gold-400" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            )}
          </div>

          {(RODAPE_CONFIG.emailContato ||
            RODAPE_CONFIG.urlPoliticaPrivacidade ||
            RODAPE_CONFIG.urlTermosUso) && (
            <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-zinc-900 pt-6 text-xs text-zinc-400">
              {RODAPE_CONFIG.emailContato && (
                <span>Contato: {RODAPE_CONFIG.emailContato}</span>
              )}
              {RODAPE_CONFIG.urlPoliticaPrivacidade && (
                <a
                  href={RODAPE_CONFIG.urlPoliticaPrivacidade}
                  className="hover:text-gold-300 underline underline-offset-4"
                >
                  Política de Privacidade
                </a>
              )}
              {RODAPE_CONFIG.urlTermosUso && (
                <a
                  href={RODAPE_CONFIG.urlTermosUso}
                  className="hover:text-gold-300 underline underline-offset-4"
                >
                  Termos de Uso
                </a>
              )}
            </div>
          )}

          <div className="mt-8 border-t border-zinc-900 pt-6 text-xs text-zinc-400 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p>
              © {new Date().getFullYear()} Master Nails: Gel na Tips — {INSTRUTORA_CONFIG.nome}. Todos os direitos reservados.
            </p>
            <p>Curso livre de capacitação e aperfeiçoamento técnico online.</p>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal da Galeria */}
      <GalleryLightbox
        items={GALERIA_TRABALHOS}
        currentIndex={lightboxIndex}
        onClose={handleCloseLightbox}
        onPrev={handlePrevLightbox}
        onNext={handleNextLightbox}
      />
    </div>
  );
}

export default App;
