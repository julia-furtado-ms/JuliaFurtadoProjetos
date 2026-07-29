import { Project, DirectImageLink, SkillItem } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'ecoapp-redesign',
    title: 'EcoApp - Sustainable Shopping',
    slug: 'ecoapp-sustainable-shopping',
    category: 'UI/UX Design',
    tags: ['UI/UX Design', 'E-Commerce', 'Sustainability', 'Mobile App'],
    summary: 'Redesenho completo da experiência de consumo consciente, conectando usuários a produtos com baixa pegada de carbono.',
    description: `
      O EcoApp foi concebido para transformar a jornada do consumidor consciente em uma experiência intuitiva e livre de fricções.
      Através de uma interface limpa, arquitetura de informação focada em transparência de dados e um sistema de design escalável,
      reduzimos o tempo médio de checkout e aumentamos a retenção de usuários ativos em 38%.

      ### O Desafio
      Consumidores desejam fazer escolhas sustentáveis, mas se sentem sobrecarregados por informações confusas sobre rastreabilidade e pegada de carbono. O desafio foi simplificar métricas complexas de impacto ambiental em indicadores visuais claros e acionáveis.

      ### Solução de Design
      1. **Rótulo Visual de Pegada Ecológica**: Indicadores de CO₂ integrados diretamente nos cards de produtos.
      2. **Jornada de Checkout Simplificada**: Redução de 6 para 3 etapas de navegação.
      3. **Design System 'Terra'**: Paleta de cores orgânica com contraste elevado para acessibilidade WCAG AAA.
    `,
    client: 'EcoTech Global',
    year: '2024',
    role: 'Lead UI/UX Designer',
    tools: ['Figma', 'Protopie', 'Design System', 'User Research'],
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=1200'
    ],
    status: 'Publicado',
    views: 3420,
    publishedAt: '12 de Jan, 2024',
    featured: true,
    metrics: [
      { label: 'Conversão em Checkout', value: '+42%' },
      { label: 'Retenção Mensal', value: '+38%' },
      { label: 'Pontuação de Acessibilidade', value: '100%' }
    ]
  },
  {
    id: 'fintech-dashboard',
    title: 'Fintech Dashboard Analytics',
    slug: 'fintech-dashboard-analytics',
    category: 'Design Systems',
    tags: ['Design Systems', 'UI/UX Design', 'Data Viz', 'B2B'],
    summary: 'Plataforma de inteligência financeira B2B para gestão de fluxo de caixa e relatórios automatizados em tempo real.',
    description: `
      Desenvolvimento da interface e sistema de componentes para uma plataforma financeira corporativa de alta densidade de dados.
      O objetivo primário foi oferecer legibilidade impecável e rapidez na interpretação de métricas de investimento.
    `,
    client: 'Nexus Financials',
    year: '2024',
    role: 'Senior Product Designer',
    tools: ['Figma', 'TailwindCSS', 'Design System Tokens', 'D3.js Mockup'],
    coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1200'
    ],
    status: 'Publicado',
    views: 2890,
    publishedAt: '28 de Fev, 2024',
    featured: true,
    metrics: [
      { label: 'Tempo de Análise de Dados', value: '-65%' },
      { label: 'Componentes no System', value: '140+' }
    ]
  },
  {
    id: 'maison-curated',
    title: 'Maison Curated - Luxury E-Commerce',
    slug: 'maison-curated-luxury',
    category: 'E-Commerce',
    tags: ['E-Commerce', 'Branding', 'UI/UX Design'],
    summary: 'Identidade digital editorial e experiência de compra imersiva para curadoria de moda e alta costura internacional.',
    description: `
      Uma abordagem minimalista que prioriza a direção de arte e a fotografia editorial. Criada para proporcionar a sensação de folhear uma revista de arte contemporânea online.
    `,
    client: 'Maison Curated Paris',
    year: '2023',
    role: 'Art Director & UI Designer',
    tools: ['Figma', 'Photoshop', 'Branding Guidelines'],
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200'
    ],
    status: 'Publicado',
    views: 1950,
    publishedAt: '15 de Nov, 2023',
    featured: false,
    metrics: [
      { label: 'Tempo Médio na Tela', value: '4m 12s' },
      { label: 'Aumento do Ticket Médio', value: '+24%' }
    ]
  },
  {
    id: 'lumina-health',
    title: 'Lumina Health - Patient Care',
    slug: 'lumina-health-patient-care',
    category: 'Mobile',
    tags: ['Mobile', 'UI/UX Design', 'Healthcare'],
    summary: 'Ecossistema móvel de telessaúde e monitoramento preventivo para pacientes com acompanhamento contínuo.',
    description: `
      Interface projetada para proporcionar calma e clareza. Inclui lembretes de medicação adaptativos, agendamento em um toque e comunicação segura com médicos.
    `,
    client: 'Lumina Care Labs',
    year: '2023',
    role: 'UX Researcher & Product Designer',
    tools: ['Figma', 'User Testing', 'Accessibility Standards'],
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1200'
    ],
    status: 'Publicado',
    views: 2100,
    publishedAt: '04 de Ago, 2023',
    featured: false
  },
  {
    id: 'proptech-hub',
    title: 'PropTech Hub - Real Estate ERP',
    slug: 'proptech-hub-real-estate',
    category: 'Design Systems',
    tags: ['Design Systems', 'B2B', 'UI/UX Design'],
    summary: 'Plataforma integrada de gestão imobiliária, contratos inteligentes e tour virtual 3D.',
    description: `
      Centralização de processos complexos de locação e venda em um ambiente estruturado por grids limpos e tipografia pragmática.
    `,
    client: 'Habitat Investments',
    year: '2023',
    role: 'Lead Designer',
    tools: ['Figma', 'Onshape 3D Concept', 'Design Tokens'],
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200'
    ],
    status: 'Publicado',
    views: 1420,
    publishedAt: '19 de Mai, 2023',
    featured: false
  },
  {
    id: 'artisanal-archive',
    title: 'Artisanal Archive - Cultural Preservation',
    slug: 'artisanal-archive-cultural',
    category: 'Branding',
    tags: ['Branding', 'UI/UX Design', 'Culture'],
    summary: 'Plataforma digital dedicada à preservação do patrimônio imaterial de mestres artesãos do Nordeste brasileiro.',
    description: `
      Um arquivo vivo interativo combinando áudio-documentários, mapas culturais e catálogo de técnicas ancestrais do artesanato pernambucano.
    `,
    client: 'Instituto Cultural Recife',
    year: '2024',
    role: 'Creative Director & Designer',
    tools: ['Figma', 'Editorial Design', 'Audio Integration'],
    coverImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1200'
    ],
    status: 'Rascunho',
    views: 640,
    publishedAt: '01 de Mar, 2024',
    featured: false
  }
];

export const DIRECT_IMAGE_LINKS: DirectImageLink[] = [
  {
    id: '1',
    title: 'EcoApp Mobile Checkout Mockup',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    usage: 'Capa do Estudo de Caso EcoApp & Grid do Portfolio',
    aspectRatio: '16:9'
  },
  {
    id: '2',
    title: 'Fintech Analytics Dark Interface',
    url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1200',
    usage: 'Capa Fintech Dashboard & Mídia da Galeria',
    aspectRatio: '16:9'
  },
  {
    id: '3',
    title: 'Júlia Furtado - Retrato Editorial',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000',
    usage: 'Página Sobre Mim - Retrato Principal',
    aspectRatio: '4:5'
  },
  {
    id: '4',
    title: 'Maison Curated High Fashion Showcase',
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200',
    usage: 'Maison Curated E-Commerce Case Study',
    aspectRatio: '16:9'
  },
  {
    id: '5',
    title: 'Recife Architectural Geometry & Workspace',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
    usage: 'Filosofia de Design & Fundo do Formulário de Contato',
    aspectRatio: '16:9'
  },
  {
    id: '6',
    title: 'Lumina Health Care Screen',
    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
    usage: 'Lumina Mobile Healthcare App',
    aspectRatio: '16:9'
  }
];

export const SKILL_ITEMS: SkillItem[] = [
  {
    name: 'Figma & Design Systems',
    level: 98,
    category: 'Design & Prototipagem',
    description: 'Arquitetura de componentes reutilizáveis, variáveis de tokens e documentação para desenvolvimento.'
  },
  {
    name: 'Prototipagem de Alta Fidelidade',
    level: 92,
    category: 'Design & Prototipagem',
    description: 'Microinterações complexas em Protopie, Figma e Rive com animações guiadas por física.'
  },
  {
    name: 'UX Research & Testes Usabilidade',
    level: 90,
    category: 'Estratégia & Pesquisa',
    description: 'Entrevistas qualitativas, testes A/B, mapeamento de jornadas e análise heurística.'
  },
  {
    name: 'Onshape & CAD / 3D Concept',
    level: 85,
    category: 'Modelagem 3D & Produto',
    description: 'Modelagem tridimensional paramétrica e renderização de conceitos para hardware e interiores.'
  },
  {
    name: 'Vibe Coding & Frontend Integration',
    level: 88,
    category: 'Código & Automação AI',
    description: 'Construção rápida de interfaces com React, Tailwind CSS e aceleração por Inteligência Artificial.'
  }
];
