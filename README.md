# [cite_start] FRONT - Tecnologias Utilizadas [cite: 1]

* [cite_start]**Framework Principal:** React Native com Expo (SDK 50+). [cite: 2]
* [cite_start]**Linguagem:** TypeScript. [cite: 3]
* [cite_start]**Roteamento:** Expo Router (Roteamento baseado em arquivos). [cite: 4]
* [cite_start]**Mapas:** React Native WebView + Leaflet (OpenStreetMap) - Decisão tomada para evitar custos e complexidade de API Keys do Google Maps. [cite: 5, 6]
* [cite_start]**Mídia:** Expo Image Picker (Câmera e Galeria). [cite: 7]
* [cite_start]**Estilização:** StyleSheet nativo com Design System centralizado (palette, layout). [cite: 8]
* [cite_start]**Ícones:** Material CommunityIcons (via Expo Vector Icons). [cite: 9]

---

## [cite_start]1. Arquitetura do Projeto [cite: 10]

[cite_start]Foi tentado seguir o mais próximo da organização de Clean Architecture e Atomic Design, visando a separação de responsabilidades e facilidade de manutenção. [cite: 11]

### [cite_start]Estrutura de Pastas (src/) [cite: 12]

* **app/ (View/Router):** Contém as telas e a configuração de rotas (abas). [cite_start]As telas atuam apenas como "Orquestradores", conectando a lógica (Hooks) com a interface (Components). [cite: 13, 14]
* [cite_start]**components/ (UI):** Componentes visuais reutilizáveis. [cite: 15]
    * [cite_start]`cards/`: Cartões genéricos (ex: FeatureCard). [cite: 16]
    * [cite_start]`header/`: Cabeçalho customizado (CustomHeader). [cite: 17]
    * [cite_start]`identificar-components/`: Componentes específicos da funcionalidade de IA. [cite: 18]
* [cite_start]**map/:** Componentes do mapa (Leaflet Wrapper, Bottom Sheets). [cite: 19]
* **hooks/ (Controller/Logic):** Contém toda a regra de negócio e gerenciamento de estado (ex: useldentification, useMapExplore). [cite_start]As telas não contêm lógica complexa, apenas consomem esses hooks. [cite: 20, 21]
* [cite_start]**constants/ (Theme):** Definições globais de cores (palette) e espaçamentos (layout). [cite: 22]
* [cite_start]**data/ (Model):** Mocks de dados e tipagens (ex: mapData.ts, speciesMock.ts). [cite: 23]

---

## [cite_start]2. Módulos e Funcionalidades [cite: 24]

### 2.1. [cite_start]Módulo Home (index.tsx) [cite: 25]
[cite_start]O painel principal ("Dashboard") que oferece uma visão geral e acesso rápido às funcionalidades. [cite: 26]
* [cite_start]**Hero Banner:** Destaque visual com a missão do app. [cite: 27]
* [cite_start]**Stats Grid:** Estatísticas rápidas (número de espécies catalogadas, estados mapeados). [cite: 28]
* [cite_start]**Navegação Rápida:** Cards grandes (FeatureCard) que levam para Identificar, Mapa, Relações e Socorros. [cite: 29]

### 2.2. [cite_start]Módulo de Identificação (identificar.tsx) [cite: 30]
[cite_start]Permite ao usuário descobrir qual é a espécie animal ou vegetal através de uma foto. [cite: 31]

* [cite_start]**Fluxo de Estado:** Gerenciado pelo hook useldentification com três estados: [cite: 33]
    1.  [cite_start]`input`: Tela inicial aguardando entrada (Câmera ou Galeria). [cite: 33]
    2.  [cite_start]`loading`: Animação de "pulso" (AnalysisLoading) enquanto a "IA" processa. [cite: 34]
    3.  [cite_start]`result`: Exibição do card detalhado da espécie (SpeciesResult). [cite: 35]
* [cite_start]**Componentes Chave:** Action Buttons, NatureFiller (animação decorativa), SpeciesResult. [cite: 35]

### 2.3. [cite_start]Módulo Mapa da Biodiversidade (mapa.tsx) [cite: 36]
* [cite_start]**Tecnologia:** Utiliza LeafletMap (WebView) para renderizar o OpenStreetMap, contornando a necessidade de API Key do Google Maps (solução para o erro API key not found). [cite: 37]
* [cite_start]**Funcionalidades:** [cite: 39]
    * [cite_start]Navegação livre pelo mapa do Brasil. [cite: 40]
    * Marcadores customizados para locais de interesse. (precisa de ajuste) [cite_start][cite: 41]
    * [cite_start]Barra de busca flutuante para encontrar estados ou biomas. [cite: 42]
    * [cite_start]Bottom Sheet: Ao clicar em um local (ex: Amazonas), abre-se um painel com detalhes, carrossel de espécies e unidades de conservação (ver Location DetailsSheet). [cite: 44, 45]

### [cite_start]Separação View e Hooks [cite: 46]
[cite_start]Para evitar componentes muito grandes, toda a lógica foi extraída para Custom Hooks. [cite: 47]
Exemplo: identificar.tsx não sabe como abrir a câmera. [cite_start]Ele apenas chama handleSelectImage('câmera') do hook useldentification. [cite: 48]
