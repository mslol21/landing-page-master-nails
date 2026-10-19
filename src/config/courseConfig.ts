/**
 * ============================================================================
 * CONFIGURAÇÃO CENTRAL DA LANDING PAGE — MASTER NAILS: GEL NA TIPS
 * ============================================================================
 * Substitua as constantes e os campos abaixo conforme confirmação da instrutora
 * Kamila Martins. Nenhum dado não confirmado é exibido como fato na página.
 */

// 1. LINKS PRINCIPAIS (Substitua pelos endereços reais)
export const LINK_CHECKOUT = 'https://pay.kiwify.com.br/9ohRuBR';
export const LINK_INSTAGRAM = '[LINK_INSTAGRAM]';
export const LINK_WHATSAPP = '[LINK_WHATSAPP]';

/**
 * Verifica se um link configurável já foi preenchido com uma URL real
 * (diferente do marcador padrão [LINK_...] e não vazio).
 */
export function isLinkConfigured(link: string): boolean {
  const trimmed = link.trim();
  return (
    Boolean(trimmed) &&
    !trimmed.startsWith('[LINK_') &&
    trimmed !== '#'
  );
}

// 2. DADOS DA INSTRUTORA (Apenas informações confirmadas)
export const INSTRUTORA_CONFIG = {
  nome: 'Kamila Martins',
  atuacao: 'Nail Designer e Instrutora',
  localizacao: 'Itaquera, São Paulo — SP',
  fotoUrl: '/images/kamila-martins-instrutora.jpg',
  fotoAlt:
    'Retrato de Kamila Martins, nail designer e instrutora do curso Master Nails: Gel na Tips',
  resumoConfirmado:
    'Nail designer e instrutora com atuação em Itaquera, São Paulo. No curso Master Nails: Gel na Tips, conduz as aulas de forma prática e estruturada, demonstrando cada etapa do processo técnico — da preparação da lâmina natural ao acabamento e manutenção.',
  // Campo opcional caso deseje adicionar informações biográficas confirmadas futuramente:
  notaComplementarOpcional: '',
};

// 3. BENEFÍCIOS CONFIRMADOS DO HERO (Máximo de 3 benefícios confirmados)
export const HERO_BENEFICIOS_CONFIRMADOS = [
  'Aulas passo a passo',
  'Certificado de conclusão',
  'Acesso online',
] as const;

// 4. TÓPICOS DO CONTEÚDO PROGRAMÁTICO (Confirmados nas referências)
export interface TopicoAprendizado {
  id: string;
  numero: string;
  titulo: string;
  descricao: string;
}

export const TOPICOS_APRENDIZADO: TopicoAprendizado[] = [
  {
    id: 'preparacao',
    numero: '01',
    titulo: 'Preparação da unha natural',
    descricao:
      'Higienização, preparo correto da lâmina e aplicação dos preparadores para favorecer a aderência sem agredir a unha natural.',
  },
  {
    id: 'aplicacao-tips',
    numero: '02',
    titulo: 'Aplicação correta das tips',
    descricao:
      'Escolha do tamanho ideal, encaixe simétrico, colagem sem bolhas de ar e nivelamento da transição entre tip e lâmina.',
  },
  {
    id: 'curvatura-estrutura',
    numero: '03',
    titulo: 'Curvatura e estrutura',
    descricao:
      'Construção em gel com controle de produto, distribuição equilibrada do ponto de tensão e simetria estrutural.',
  },
  {
    id: 'lixamento-tecnico',
    numero: '04',
    titulo: 'Lixamento técnico',
    descricao:
      'Sequência de lixamento para alinhamento de paredes laterais, ponta, superfície uniforme e espessura natural.',
  },
  {
    id: 'acabamento',
    numero: '05',
    titulo: 'Acabamento',
    descricao:
      'Refinamento na área da cutícula, selagem precisa e finalização com brilho uniforme e aspecto profissional.',
  },
  {
    id: 'manutencao-remocao',
    numero: '06',
    titulo: 'Manutenção e remoção correta',
    descricao:
      'Procedimentos seguros para manutenção periódica do alongamento e remoção técnica preservando a saúde da lâmina natural.',
  },
];

// 5. PERFIS DE PÚBLICO (Para quem é o curso)
export interface PerfilPublico {
  id: string;
  titulo: string;
  descricao: string;
}

export const PERFIS_PUBLICO: PerfilPublico[] = [
  {
    id: 'comecar-do-zero',
    titulo: 'Quem quer começar do zero',
    descricao:
      'Para quem ainda não tem experiência na área e busca aprender desde a base com explicação clara de cada etapa.',
  },
  {
    id: 'manicures-aperfeicoar',
    titulo: 'Manicures que querem se aperfeiçoar',
    descricao:
      'Para profissionais que já atuam no cuidado das unhas e desejam dominar a técnica de alongamento Gel na Tips com segurança.',
  },
  {
    id: 'nail-designers-ampliar',
    titulo: 'Nail designers que querem ampliar as técnicas',
    descricao:
      'Para quem já trabalha com alongamento e quer refinar estrutura, lixamento técnico, acabamento e tempo de bancada.',
  },
  {
    id: 'nova-habilidade',
    titulo: 'Quem busca desenvolver uma nova habilidade profissional',
    descricao:
      'Para quem deseja estudar online no próprio ritmo e adquirir domínio técnico prático em Gel na Tips.',
  },
];

// 6. O QUE ESTÁ INCLUÍDO (Separação rigorosa entre itens confirmados e itens configuráveis)
export interface ItemIncluido {
  id: string;
  titulo: string;
  descricao: string;
  confirmado: boolean;
  detalheConfiguravel?: string;
}

export const ITENS_INCLUIDOS_CONFIG: ItemIncluido[] = [
  {
    id: 'aulas',
    titulo: 'Aulas passo a passo',
    descricao:
      'Aulas gravadas demonstrando em detalhes cada etapa da técnica Gel na Tips, da preparação à manutenção.',
    confirmado: true,
  },
  {
    id: 'acesso-online',
    titulo: 'Acesso online no seu ritmo',
    descricao:
      'Assista às aulas pela internet nos horários mais convenientes para a sua rotina de estudos e prática.',
    confirmado: true,
  },
  {
    id: 'certificado',
    titulo: 'Certificado de conclusão',
    descricao:
      'Emissão de certificado após a conclusão das aulas do curso Master Nails: Gel na Tips.',
    confirmado: true,
  },
  // Itens mencionados nas referências que dependem de confirmação das regras atuais da turma:
  // Altere `confirmado: true` e preencha `descricao` apenas após validar com a responsável.
  {
    id: 'material-apoio',
    titulo: 'Material de apoio complementar',
    descricao: '[Confirmar disponibilidade e formato do material de apoio]',
    confirmado: false,
  },
  {
    id: 'suporte',
    titulo: 'Canal de suporte para dúvidas',
    descricao: '[Confirmar canal e horário de suporte para alunas]',
    confirmado: false,
  },
  {
    id: 'atualizacoes-tempo-acesso',
    titulo: 'Prazo de acesso e atualizações',
    descricao: '[Confirmar período exato de acesso ao curso e direito a futuras atualizações]',
    confirmado: false,
  },
];

// 7. INVESTIMENTO E CONDIÇÕES (Campos editáveis — não exibe desconto/parcelamento sem confirmação)
export const INVESTIMENTO_CONFIG = {
  // Altere `precoConfirmado: true` quando o valor vigente estiver validado para exibição direta:
  precoConfirmado: true,
  moeda: 'R$',
  valorPrincipal: '49,90', // Valor presente na referência visual; edite aqui caso tenha sido atualizado
  observacaoValor:
    'Consulte o valor vigente, opções de parcelamento e formas de pagamento diretamente na página oficial de inscrição.',

  // Mantenha `false` até confirmar se o preço anterior e o parcelamento seguem ativos:
  mostrarPrecoAnterior: false,
  valorAnterior: 'R$ 197,90',

  mostrarParcelamento: false,
  textoParcelamento: 'Em até 12x no cartão (verificar condições no checkout)',
};

// 8. IMAGENS E GALERIA DE TRABALHOS
// Coloque as fotos recortadas (sem barras de celular ou molduras do Instagram) em `public/images/`
export interface ItemGaleria {
  id: string;
  src: string;
  alt: string;
  titulo: string;
  detalheTecnico: string;
}

export const IMAGENS_PAGINA = {
  heroPrincipal: {
    src: '/images/hero-kamila-editorial.webp',
    alt: 'Nail designer realizando uma aplicação de unhas em um estúdio profissional',
    legenda: 'Master Nails — Gel na Tips',
  },
  detalheCurso: {
    src: '/images/course-detail.webp',
    alt: 'Unhas em gel com acabamento branco perolado',
    legenda: 'Detalhe de acabamento em Gel na Tips',
  },
};

export const GALERIA_TRABALHOS: ItemGaleria[] = [
  {
    id: 'trabalho-1',
    src: '/images/nail-01.webp',
    alt: 'Unhas em tons nude e marrom com acabamento perolado',
    titulo: 'Nude perolado',
    detalheTecnico: 'Tons naturais com brilho delicado',
  },
  {
    id: 'trabalho-2',
    src: '/images/nail-02.webp',
    alt: 'Unhas vermelhas com detalhe floral branco',
    titulo: 'Vermelho com detalhe floral',
    detalheTecnico: 'Cor intensa com nail art delicada',
  },
  {
    id: 'trabalho-3',
    src: '/images/nail-03.webp',
    alt: 'Unhas em tons azuis com desenho floral e pedrarias',
    titulo: 'Azul floral',
    detalheTecnico: 'Composição floral com detalhes em brilho',
  },
  {
    id: 'trabalho-4',
    src: '/images/nail-04.webp',
    alt: 'Detalhe de unha alongada em tom rosa translúcido',
    titulo: 'Rosa translúcido',
    detalheTecnico: 'Acabamento delicado em close',
  },
  {
    id: 'trabalho-5',
    src: '/images/nail-05.webp',
    alt: 'Unhas em tons rosados com francesinha branca e desenho floral',
    titulo: 'Francesinha floral',
    detalheTecnico: 'Francesinha com decoração artesanal',
  },
  {
    id: 'trabalho-6',
    src: '/images/nail-06.webp',
    alt: 'Unhas em tom nude rosado com pontas brancas',
    titulo: 'Francesinha clássica',
    detalheTecnico: 'Base rosada com pontas brancas',
  },
];

// 9. DÚVIDAS FREQUENTES (FAQ — Respostas configuráveis sem inventar dados não confirmados)
export interface ItemFaq {
  id: string;
  pergunta: string;
  resposta: string;
  campoConfiguravelNota?: string;
}

export const FAQ_ITEMS: ItemFaq[] = [
  {
    id: 'acesso-curso',
    pergunta: 'Como recebo acesso ao curso?',
    resposta:
      'Após a confirmação da inscrição na plataforma de pagamento, as instruções e os dados de acesso à área de aulas são enviados para o e-mail cadastrado no momento da compra.',
    campoConfiguravelNota:
      'Configurável em src/config/courseConfig.ts caso queira especificar o nome da plataforma.',
  },
  {
    id: 'curso-online',
    pergunta: 'O curso é online?',
    resposta:
      'Sim. O curso Master Nails: Gel na Tips é 100% online, permitindo que você assista às aulas no seu próprio ritmo, de onde estiver.',
  },
  {
    id: 'assistir-celular',
    pergunta: 'Posso assistir pelo celular?',
    resposta:
      'Sim. As aulas online podem ser acessadas pelo navegador do celular, tablet ou computador conectado à internet.',
  },
  {
    id: 'certificado',
    pergunta: 'Há certificado?',
    resposta:
      'Sim. O curso inclui certificado de conclusão para as alunas que finalizarem o conteúdo programático.',
  },
  {
    id: 'suporte',
    pergunta: 'Há suporte?',
    resposta:
      'As condições e canais de suporte para dúvidas das alunas devem ser conferidas nas informações vigentes da turma na página de inscrição.',
    campoConfiguravelNota:
      'Edite este campo em src/config/courseConfig.ts após confirmar o canal de atendimento (ex.: plataforma ou WhatsApp).',
  },
  {
    id: 'formas-pagamento',
    pergunta: 'Quais são as formas de pagamento?',
    resposta:
      'As formas de pagamento disponíveis (como Pix, cartão de crédito ou boleto) e as condições de parcelamento vigentes são exibidas de forma detalhada e segura diretamente na página de checkout ao clicar em "Quero minha vaga".',
  },
  {
    id: 'prazo-garantia',
    pergunta: 'Existe prazo ou garantia?',
    resposta:
      'O período de acesso às aulas e o prazo legal de garantia aplicável à compra são informados nos termos da plataforma de pagamento antes da conclusão da sua inscrição.',
    campoConfiguravelNota:
      'Edite este campo em src/config/courseConfig.ts com o tempo exato de acesso e prazo de garantia confirmados.',
  },
];

// 10. INFORMAÇÕES DE RODAPÉ E POLÍTICAS (Configuráveis)
export const RODAPE_CONFIG = {
  emailContato: '', // Preencha se houver e-mail de suporte confirmado
  urlPoliticaPrivacidade: '', // Preencha se houver página/link de política de privacidade
  urlTermosUso: '', // Preencha se houver página/link de termos de uso
};
