# Master Nails: Gel na Tips — Landing Page

Landing page responsiva e focada em conversão para o curso online **Master Nails: Gel na Tips**, ministrado por **Kamila Martins** (Nail Designer e Instrutora — Itaquera, São Paulo).

## Como executar o projeto

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Gerar build de produção
npm run build
```

## Onde atualizar links, preços e dados configuráveis

Todas as configurações editáveis estão centralizadas em [`src/config/courseConfig.ts`](./src/config/courseConfig.ts):

1. **Links principais (`LINK_CHECKOUT`, `LINK_INSTAGRAM`, `LINK_WHATSAPP`)**:
   - `LINK_CHECKOUT`: Substitua `'[LINK_CHECKOUT]'` pela URL oficial da página de pagamento.
   - `LINK_INSTAGRAM`: Substitua `'[LINK_INSTAGRAM]'` pela URL do perfil do Instagram (o botão no rodapé é exibido automaticamente assim que preenchido).
   - `LINK_WHATSAPP`: Substitua `'[LINK_WHATSAPP]'` pelo link oficial do WhatsApp (o botão no rodapé é exibido automaticamente assim que preenchido).

2. **Investimento (`INVESTIMENTO_CONFIG`)**:
   - Ajuste `valorPrincipal`, `mostrarPrecoAnterior`, `valorAnterior`, `mostrarParcelamento` e `textoParcelamento` somente após confirmar as condições vigentes.

3. **Itens incluídos (`ITENS_INCLUIDOS_CONFIG`) e Dúvidas Frequentes (`FAQ_ITEMS`)**:
   - Por padrão, apenas os itens confirmados (**Aulas passo a passo**, **Acesso online** e **Certificado de conclusão**) estão ativos como confirmados (`confirmado: true`).
   - Itens como material de apoio complementar, canal de suporte e prazo de acesso/atualizações estão prontos em `ITENS_INCLUIDOS_CONFIG` com `confirmado: false` até confirmação.

4. **Substituição das fotos (`public/images/`)**:
   Coloque as fotos recortadas (sem barra de status do celular ou interface de redes sociais) na pasta `public/images/` mantendo os nomes abaixo (ou altere os caminhos em `src/config/courseConfig.ts`):
   - `public/images/hero-gel-na-tips.jpg` (Foto principal do Hero)
   - `public/images/detalhe-aplicacao-tips.jpg` (Foto de apoio na seção de apresentação do curso)
   - `public/images/kamila-martins-instrutora.jpg` (Foto da instrutora Kamila Martins)
   - `public/images/galeria-trabalho-01.jpg` a `06.jpg` (Fotos da galeria de trabalhos)
