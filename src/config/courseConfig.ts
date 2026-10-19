/**
 * ============================================================================
 * CONFIGURAÇÃO CENTRAL DA LANDING PAGE — CHAVE DO SUCESSO MASTER NAILS: GEL NA TIPS
 * ============================================================================
 * Substitua as constantes e os campos abaixo conforme confirmação da instrutora
 * Kamila Martins. Nenhum dado não confirmado é exibido como fato na página.
 */

// 1. LINKS PRINCIPAIS (Substitua pelos endereços reais)
export const LINK_CHECKOUT = 'https://pay.kiwify.com.br/9ohRuBR';
export const LINK_INSTAGRAM = 'https://www.instagram.com/espaco_kamilamartins/';
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
  fotoUrl: '[INSERIR: foto real da Kamila em alta resolução]',
  instagramUrl: LINK_INSTAGRAM,
  fotoAlt:
    'Foto real de Kamila Martins, nail designer e instrutora do curso Gel na Tips',
  resumoConfirmado:
    'Nail designer e instrutora em Itaquera, São Paulo, com atuação em alongamento de unhas, estrutura, durabilidade e acabamento. [INSERIR: anos de experiência]. [INSERIR: número de clientes atendidas]. [INSERIR: formação e certificações].',
  // Campo opcional caso deseje adicionar informações biográficas confirmadas futuramente:
  notaComplementarOpcional: '',
};

// 3. BENEFÍCIOS CONFIRMADOS DO HERO (Máximo de 3 benefícios confirmados)
export const HERO_BENEFICIOS_CONFIRMADOS = [
  'Aulas passo a passo',
  'Certificado incluso',
  'Acesso imediato e vitalício',
] as const;

// 4. TÓPICOS DO CONTEÚDO PROGRAMÁTICO (Confirmados nas referências)
export interface TopicoAprendizado {
  id: string;
  numero: string;
  titulo: string;
  descricao: string;
  resultado: string;
}

export const TOPICOS_APRENDIZADO: TopicoAprendizado[] = [
  {
    id: 'preparacao',
    numero: '01',
    titulo: 'Preparação da unha natural',
    descricao:
      'Higienização, preparo correto da lâmina e aplicação dos preparadores para favorecer a aderência sem agredir a unha natural.',
    resultado: 'Ao final, você sabe preparar a lâmina natural antes do alongamento.',
  },
  {
    id: 'aplicacao-tips',
    numero: '02',
    titulo: 'Aplicação correta das tips',
    descricao:
      'Escolha do tamanho ideal, encaixe simétrico, colagem sem bolhas de ar e nivelamento da transição entre tip e lâmina.',
    resultado: 'Ao final, você sabe escolher, encaixar e aplicar as tips.',
  },
  {
    id: 'curvatura-estrutura',
    numero: '03',
    titulo: 'Curvatura e estrutura',
    descricao:
      'Construção em gel com controle de produto, distribuição equilibrada do ponto de tensão e simetria estrutural.',
    resultado: 'Ao final, você entende como construir uma estrutura equilibrada.',
  },
  {
    id: 'lixamento-tecnico',
    numero: '04',
    titulo: 'Lixamento técnico',
    descricao:
      'Sequência de lixamento para alinhamento de paredes laterais, ponta, superfície uniforme e espessura natural.',
    resultado: 'Ao final, você sabe refinar o formato e nivelar a superfície.',
  },
  {
    id: 'acabamento',
    numero: '05',
    titulo: 'Acabamento',
    descricao:
      'Refinamento na área da cutícula, selagem precisa e finalização com brilho uniforme e aspecto profissional.',
    resultado: 'Ao final, você sabe finalizar o alongamento com acabamento uniforme.',
  },
  {
    id: 'manutencao-remocao',
    numero: '06',
    titulo: 'Manutenção e remoção correta',
    descricao:
      'Procedimentos seguros para manutenção periódica do alongamento e remoção técnica preservando a saúde da lâmina natural.',
    resultado: 'Ao final, você conhece etapas de manutenção e remoção técnica.',
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
    titulo: 'Mulheres que querem desenvolver uma nova habilidade',
    descricao:
      'Para quem deseja aprender uma técnica que pode oferecer como serviço, conforme sua prática e demanda local.',
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
      'Emissão de certificado após a conclusão das aulas do curso Chave do Sucesso Master Nails: Gel na Tips.',
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
  parcelamentoPlaceholder: '[INSERIR: número de parcelas e valor por parcela, se disponível]',
  formasPagamento: 'No checkout Kiwify, as opções podem incluir Pix, cartão de crédito e boleto. As formas habilitadas para esta oferta serão exibidas na página de pagamento.',
  observacaoValor:
    'Consulte o valor vigente, opções de parcelamento e formas de pagamento diretamente na página oficial de inscrição.',

  // Mantenha `false` até confirmar se o preço anterior e o parcelamento seguem ativos:
  mostrarPrecoAnterior: false,
  valorAnterior: 'R$ 197,90',

  mostrarParcelamento: false,
  textoParcelamento: '[INSERIR: condição de parcelamento confirmada no checkout]',
};

// Se não houver garantia incondicional confirmada, remova o bloco visual de garantia na oferta e a pergunta correspondente do FAQ.
export const GARANTIA_CONFIG = {
  prazoPlaceholder: '[INSERIR: X dias de garantia incondicional]',
};

// 8. IMAGENS E GALERIA DE TRABALHOS
// Coloque as fotos recortadas (sem barras de celular ou molduras do Instagram) em `public/images/`
export interface ItemGaleria {
  id: string;
  src: string;
  alt: string;
  titulo: string;
  detalheTecnico: string;
  width: number;
  height: number;
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

// Imagens ilustrativas temporárias geradas para apresentar possibilidades de acabamento.
// Substitua por fotos reais e autorizadas da Kamila ou de alunas antes de tratá-las como portfólio.
export const GALERIA_TRABALHOS: ItemGaleria[] = [
  { id: 'trabalho-1', src: '/images/nail-editorial-01.webp', alt: 'Imagem ilustrativa de alongamento Gel na Tips nude rosado, em formato amendoado', titulo: 'Nude rosado', detalheTecnico: 'Imagem ilustrativa · acabamento nude com brilho', width: 840, height: 1050 },
  { id: 'trabalho-2', src: '/images/nail-editorial-02.webp', alt: 'Imagem ilustrativa de unhas nude rosadas com delicados traços dourados', titulo: 'Detalhe dourado', detalheTecnico: 'Imagem ilustrativa · linhas finas sobre base nude', width: 840, height: 1050 },
  { id: 'trabalho-3', src: '/images/nail-editorial-03.webp', alt: 'Imagem ilustrativa de alongamento com base rosa clara e francesinha branca', titulo: 'Francesinha suave', detalheTecnico: 'Imagem ilustrativa · ponta branca e base rosada', width: 840, height: 1050 },
  { id: 'trabalho-4', src: '/images/nail-editorial-04.webp', alt: 'Imagem ilustrativa de unhas alongadas em rosa perolado com brilho delicado', titulo: 'Rosa perolado', detalheTecnico: 'Imagem ilustrativa · brilho perolado e formato amendoado', width: 840, height: 1050 },
  { id: 'trabalho-5', src: '/images/nail-editorial-05.webp', alt: 'Imagem ilustrativa de unhas alongadas em rosa translúcido e acabamento glossy', titulo: 'Rosé translúcido', detalheTecnico: 'Imagem ilustrativa · transparência rosada e brilho uniforme', width: 840, height: 1050 },
  { id: 'trabalho-6', src: '/images/nail-editorial-06.webp', alt: 'Imagem ilustrativa de unhas em tom mocha com detalhe de brilho champagne', titulo: 'Mocha com brilho', detalheTecnico: 'Imagem ilustrativa · tons mocha com ponto de luz', width: 840, height: 1050 },
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
    id: 'iniciante',
    pergunta: 'Preciso ter experiência?',
    resposta:
      'Não. O curso é indicado para iniciantes e começa pela preparação da unha natural.',
  },
  {
    id: 'materiais',
    pergunta: 'Que materiais preciso ter? Quanto custa o kit?',
    resposta:
      'Materiais necessários: [INSERIR: lista de materiais]. Custo aproximado do kit: [INSERIR: valor atualizado do kit].',
  },
  {
    id: 'aulas-carga',
    pergunta: 'Quantas aulas são e quanto tempo de conteúdo?',
    resposta:
      'O curso tem [INSERIR: número de aulas] e [INSERIR: carga horária total] de conteúdo.',
  },
  {
    id: 'garantia',
    pergunta: 'Há garantia? E se eu não gostar?',
    resposta:
      '[INSERIR: prazo e condições da garantia incondicional]. Consulte também as condições apresentadas pela Kiwify antes de concluir a compra.',
  },
  {
    id: 'acesso',
    pergunta: 'Por quanto tempo tenho acesso e como recebo?',
    resposta:
      'O acesso é imediato e vitalício. Após a confirmação do pagamento, as instruções de acesso são enviadas ao e-mail usado na compra.',
  },
  {
    id: 'suporte',
    pergunta: 'Como tiro dúvidas? Há suporte?',
    resposta:
      'Canal de suporte: [INSERIR: canal confirmado]. Horário de atendimento: [INSERIR: dias e horários].',
  },
  {
    id: 'certificado-validade',
    pergunta: 'O certificado é válido para atender clientes?',
    resposta:
      'O curso emite certificado de conclusão. [INSERIR: informação confirmada sobre validade, reconhecimento e limites do certificado].',
  },
  {
    id: 'celular',
    pergunta: 'Posso assistir pelo celular?',
    resposta:
      'Sim. As aulas podem ser acessadas pelo celular, tablet ou computador com conexão à internet.',
  },
];

// 10. INFORMAÇÕES DE RODAPÉ E POLÍTICAS (Configuráveis)
export const RODAPE_CONFIG = {
  emailContato: '', // Preencha se houver e-mail de suporte confirmado
  urlPoliticaPrivacidade: '', // Preencha se houver página/link de política de privacidade
  urlTermosUso: '', // Preencha se houver página/link de termos de uso
};
