# Diretrizes Permanentes de Desenvolvimento e Segurança do Projeto

Este arquivo estabelece os padrões e regras obrigatórias que **devem ser seguidos em todos os deploys e modificações de código** deste projeto, sem exceções.

---

## 1. 🛡️ Segurança HTTP & Content Security Policy (Padrão Obrigatório)

### 1.1. Arquivo `vercel.json`
O arquivo `vercel.json` deve sempre conter as seguintes configurações para evitar falhas no Mozilla Observatory e em scanners de segurança:
- **Codificação**: Padrão RFC 8259 estrito (UTF-8 puro **sem Byte Order Mark / BOM**).
- **Mapeamento de Rotas**: O bloco de cabeçalhos deve cobrir explicitamente tanto a rota raiz quanto as sub-rotas:
  - `"source": "/(.*)"`
  - `"source": "/"`
- **Cabeçalhos Obrigatórios**:
  1. **Content-Security-Policy**:
     ```http
     default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https:; object-src 'none'; base-uri 'self'; frame-src 'self' https://www.google.com https://maps.google.com; frame-ancestors 'none';
     ```
     *(A diretiva `frame-ancestors 'none'` é obrigatória para prevenção contra clickjacking).*
  2. **Strict-Transport-Security**: `max-age=63072000; includeSubDomains; preload`
  3. **X-Content-Type-Options**: `nosniff`
  4. **X-Frame-Options**: `DENY`
  5. **Referrer-Policy**: `strict-origin-when-cross-origin`
  6. **Cross-Origin-Opener-Policy**: `same-origin-allow-popups`
  7. **Cross-Origin-Resource-Policy**: `cross-origin`
  8. **Permissions-Policy**: `camera=(), microphone=(), geolocation=()`

### 1.2. Zero Scripts Inline
- É **estritamente proibido** o uso de tags `<script>` inline ou atributos de eventos como `onclick`, `onsubmit`, `onload` no HTML.
- Todo código JavaScript deve residir exclusivamente em arquivos externos (ex: `js/app.js`), compatível com `script-src 'self'`.

---

## 2. 📖 Regras de Negócio e Conteúdo

### 2.1. Intervalo de Ciclos e Encontros
- O intervalo correto dos encontros e ciclos é de **30 em 30 dias** (mensal).
- Nunca utilizar intervalos de 15 dias ou quinzenais.

### 2.2. Formatação Numérica e Contatos
- Telefones e dados numéricos devem ser exibidos de forma agrupada e contínua, sem separadores desnecessários (exemplo: `(11) 945549000`).
- Botões de ação devem disparar links dinâmicos de WhatsApp utilizando `encodeURIComponent` com mensagem personalizada e o número oficial (`5511945549000`).

### 2.3. Seções Inteligentes e Google Maps Interativo Obrigatório
- Se não for fornecido endereço físico ou localização geográfica, omitir completamente blocos de mapas ou endereços, adaptando o design ao conteúdo disponível.
- **Quando houver endereço físico**:
  - É **expressamente proibido** usar capturas de tela estáticas ou imagens estáticas para representar mapas.
  - Use **obrigatoriamente um `<iframe>` interativo do Google Maps** incorporado diretamente na página.
  - O iframe deve conter `loading="lazy"`, largura total responsiva (`w-full`), altura mínima adequada (350px a 450px) e botão/link direto para navegação e rotas ("Abrir no Google Maps").
  - O CSP em `vercel.json` e `<meta>` deve conter a diretiva `frame-src 'self' https://www.google.com https://maps.google.com;` para assegurar o funcionamento sem bloqueios.

### 2.4. Identidade Visual e Ativos
- A logo oficial do cliente deve ser exibida no cabeçalho com proporções preservadas e sem cortes.
- A logo deve ser configurada como favicon do site.

---

## 3. 🖼️ Diretriz Estrita para Imagens (Realismo Obrigatório)

### 3.1. Busca Primária (Fotos Reais e Bancos Fotográficos)
- A prioridade absoluta é buscar fotos reais da empresa na web ou imagens fotográficas autênticas de bancos de imagens.
- Salve os arquivos fisicamente no projeto (pasta `img/` ou `assets/`) e atualize o HTML com os caminhos locais corretos.

### 3.2. Geração por IA (Último Recurso)
- Você só tem permissão para gerar imagens com IA se não encontrar absolutamente nenhuma imagem real ou de banco de imagens que sirva para o contexto.

### 3.3. Regra de Fotorrealismo Absoluto
- Se for estritamente obrigado a gerar a imagem com IA, ela **DEVE** ser rigorosamente fotorrealista, plausível e 100% condizente com as características reais da empresa (paleta de cores, estilo de design, contexto do nicho).

### 3.4. Proibições Expressas
- É expressamente proibido entregar imagens com aspecto de desenho, ilustração, renderização 3D óbvia, texturas plásticas/artificiais ou elementos fantasiosos que quebrem a imersão de um negócio real.

### 3.5. Extração de Contexto via Instagram e Redes Sociais
- Se um link de rede social (como Instagram) for fornecido, tente analisar a URL para extrair informações da empresa (bio, serviços, fotos, identidade visual).
- **Plano de Contingência (Anti-Bloqueio)**: O Instagram frequentemente bloqueia acesso automatizado. Se a leitura direta da URL falhar, extraia o `@nome_de_usuario` do link.
- Em seguida, realize uma busca no Google usando o `@usuário` ou `"nome da empresa + Instagram"`. Utilize os textos públicos indexados pelo buscador e as imagens da empresa vinculadas a esse perfil no Google Imagens para capturar as fotos e dados necessários.

### 3.6. Condizente com a Realidade da Empresa
- Qualquer imagem DEVE espelhar rigorosamente a estrutura, a paleta de cores e o contexto real do estabelecimento físico do cliente.
- Se a empresa é um posto de bandeira própria (ex: Beach Posto), é terminantemente proibido utilizar ou gerar imagens que remetam a marcas concorrentes (como Shell, Ipiranga, BR, Texaco) ou estruturas inexistentes no local.

### 3.7. Proibição de Logos Falsas (Tolerância Zero)
- A IA de geração de imagens NÃO DEVE tentar escrever textos ou desenhar logos nas imagens para evitar alucinações e marcas distorcidas.
- Se houver a logo da empresa, é expressamente proibido usar outra marca gerada por IA.
- A imagem base deve conter apenas "uniformes lisos", "fachadas limpas" e "superfícies sem letreiros", priorizando as cores oficiais do negócio.

### 3.8. Injeção da Logo Oficial via Código (HTML/CSS)
- Para exibir a marca na fachada, totem, seções de destaque ou sobre os uniformes, utilize **obrigatoriamente o arquivo da logo oficial** fornecido pelo usuário (ex: `logo.png`).
- Aplique a logo verdadeira sobre áreas das imagens (como o totem do posto, cards ou na seção hero) utilizando sobreposição via código (HTML/CSS com `position: absolute` ou flexbox/grid).
- A única marca comercial permitida em destaque na tela é o arquivo oficial da empresa.

### 3.9. Fotorrealismo Absoluto (Padrão RAW / DSLR)
- As imagens devem ser 100% fotográficas (RAW, DSLR autêntico). Qualquer aspecto de desenho, pintura digital ou renderização 3D anula o código.

---

## 4. 🚀 Etapa de Pré-Deploy: Auto-Auditoria de SEO e Estrutura (Estilo SEOptimer)

Antes de finalizar qualquer projeto ou emitir o build, você **DEVE** rodar uma auto-auditoria estrita no código-fonte e corrigir automaticamente qualquer pendência encontrada:

### 4.1. Metadados e `<head>`
- **Meta Description**: Obrigatória, persuasiva e calibrada estritamente entre **130 e 155 caracteres**.
- **Title Tag**: Obrigatória, contendo o nome da marca/serviço e palavra-chave, entre **40 e 60 caracteres**.
- **Tag Canônica**: `<link rel="canonical" href="URL_DO_DOMINIO">` presente e apontando para a raiz.
- **Favicon e Viewport**: Corretamente configurados para dispositivos móveis (`<meta name="viewport">` e `<link rel="icon">`).

### 4.2. Open Graph & Social Cards
- **Tags OG Completas**: `og:title`, `og:description`, `og:url`, `og:type`, `og:image`.
- **Twitter Cards**: `twitter:card` (`summary_large_image`), `twitter:title`, `twitter:description`, `twitter:image`.
- **Dimensões da Imagem**: A imagem apontada em `og:image` deve existir nos arquivos do projeto e ter dimensões mínimas recomendadas de **1200x630**.

### 4.3. Acessibilidade e SEO On-Page
- **Atributo ALT**: 100% das tags `<img>` devem conter o atributo `alt` preenchido e contextualizado.
- **Hierarquia de Cabeçalhos**: Exatamente **um único `<h1>`** na página; `<h2>` e `<h3>` estruturados logicamente sem pular níveis.
- **Idioma**: Atributo `lang="pt-BR"` declarado na tag `<html>`.

### 4.4. Arquivos Técnicos e Indexação
- Gerar sempre o arquivo `robots.txt` na raiz liberando acesso (`Allow: /`) e apontando para o sitemap.
- Gerar sempre o arquivo `sitemap.xml` estruturado e válido na raiz com a URL canônica.
- Inserir dados estruturados Schema.org (`JSON-LD`) para `LocalBusiness` ou `Organization` no `<head>`.

### 4.5. Links Sociais
- Garantir a presença de links reais (ou âncoras preparadas com `href`) no rodapé para redes sociais (Instagram, WhatsApp).

### 4.6. Regra de Exceção
- Ignore totalmente métricas de backlinks/links externos, focando **100% na conformidade técnica interna (SEO On-Page)**.

---

## 5. ✅ Checklist de Qualidade antes de Cada Commit
1. Verificar integridade do JSON de configuração (`JSON.parse`, sem caracteres BOM).
2. Auditar que nenhum script inline foi introduzido.
3. Garantir cumprimento das regras de imagens (busca prévia de fotos reais sem marcas de terceiros/concorrentes).
4. Assegurar injeção da logo oficial (`logo.png`) via HTML/CSS em sobreposição e ausência total de logos alucinadas ou marcas concorrentes.
5. Executar e aprovar a auto-auditoria estrita de SEO e estrutura (Estilo SEOptimer).
6. Confirmar que todas as instruções do prompt foram integralmente contempladas.

---

## 6. 💎 Diretriz Master Permanente de Design: High-End Editorial Glassmorphism

A partir de agora e em **TODAS** as próximas páginas/seções deste projeto, deve-se seguir **RIGOROSAMENTE** o sistema de design **"High-End Editorial Glassmorphism"**:
- **Proibições Expressas**: NÃO usar templates genéricos de SaaS, NÃO criar cards brancos simples, NÃO usar fundos pretos chapados estilo terminal e NUNCA esquecer os efeitos de profundidade e animação suave ao interagir.
- **1. Imagem de fundo**: 100% full-bleed cinematográfica com overlay escuro suave para leitura perfeita.
- **2. Dock lateral**: coluna vertical flutuante com micro-cards transparentes e métricas de autoridade (com efeito hover de elevação).
- **3. Placa principal**: grande painel de vidro fosco (`backdrop-blur-xl bg-black/40 border border-white/20 rounded-3xl`) com profundidade real.
- **4. Tipografia**: títulos combinando fonte com serifa elegante e palavras em itálico fluido (`font-serif`, `italic font-light`), com subtítulos e badges limpos em monospace/sans.
- **5. Micro-animações interativas**: transições suaves no mouse hover (`scale-[1.02]`, transição suave de opacidade e sombras).

---

## 7. 🚨 PROTOCOLO MESTRE DE INTERPRETAÇÃO E ISOLAMENTO DE PROJETOS 🚨

Atuação EXCLUSIVA como Designer e Desenvolvedor Sênior. 

### 7.1. ISOLAMENTO ABSOLUTO (GATILHO DE NOVO PROJETO)
- Se o usuário enviar uma "nova inspiração", nome de um "novo cliente" ou um nicho diferente:
- É **ESTRITAMENTE PROIBIDO SOBRESCREVER OS ARQUIVOS ATUAIS**.
- Crie IMEDIATAMENTE um novo arquivo independente (ex: `[nicho]-landing.html`) para trabalhar sem destruir o projeto anterior.

### 7.2. AUTONOMIA DE INTERPRETAÇÃO DE NICHO
- Deduza a estrutura pelo nicho automaticamente. Exemplo (CLÍNICA/MÉDICA): Tom de confiança, saúde premium e cuidado. Hero section com imagem do procedimento/clínica + seção "Sobre" para a foto da profissional cuidando do paciente.
- Adapte o copywriting (textos) automaticamente para o nível "High-End" do nicho específico, sem depender de explicações básicas.

### 7.3. OBRIGAÇÃO DE IMAGENS PREMIUM E MODO FALLBACK
- Layout DEVE ter background full-bleed (100vh/100vw) com `object-cover` e um degradê escuro (overlay) para leitura. NUNCA layout quadrado/fundo vazio.
- LIMITAÇÃO DE REDES SOCIAIS: Se receber link do Instagram, extraia apenas o nome. **PREENCHA espaços de imagem com links reais premium do Unsplash** correspondentes ao nicho OU use placeholders técnicos claríssimos: `<div class="bg-neutral-800 flex items-center justify-center">COLOQUE A FOTO DA CLIENTE AQUI (logo.png)</div>`.

### 7.4. TRAVA DO DESIGN SYSTEM "HIGH-END GLASSMORPHISM"
A estética de luxo é inegociável, independente do nicho:
- **FONTES (PROIBIDAS DE MUDAR)**: Títulos SEMPRE serifados clássicos (Playfair Display, Instrument Serif, Cormorant) com palavras-chave em *itálico*. Textos de apoio e botões SEMPRE sem serifa (Inter, Geist, SF Pro).
- **ESTRUTURA**: Painéis, cards e navegação DEVEM usar vidro jateado: `backdrop-blur-xl bg-black/40 border border-white/20 rounded-3xl`.
- **CORES**: Monocromático (Base escura) + Branco para textos. A cor da marca vai APENAS no botão principal e ícones pontuais.
- **CONVERSÃO**: O botão CTA principal é SEMPRE direto para o WhatsApp, com design elegante e hover animado.
