# FRONT - Tecnologias Utilizadas

* **Framework Principal:** React Native com Expo (SDK 50+).
* **Linguagem:** TypeScript.
* **Roteamento:** Expo Router (Roteamento baseado em arquivos).
* **Mapas:** React Native WebView + Leaflet (OpenStreetMap) - Decisão tomada para evitar custos e complexidade de API Keys do Google Maps.
* **Mídia:** Expo Image Picker (Câmera e Galeria).
* **Estilização:** StyleSheet nativo com Design System centralizado (palette, layout).
* **Ícones:** Material CommunityIcons (via Expo Vector Icons).

---

## 1. Arquitetura do Projeto

Foi tentado seguir o mais próximo da organização de Clean Architecture e Atomic Design, visando a separação de responsabilidades e facilidade de manutenção.

### Estrutura de Pastas (src/)

* **app/ (View/Router):** Contém as telas e a configuração de rotas (abas). As telas atuam apenas como "Orquestradores", conectando a lógica (Hooks) com a interface (Components).
* **components/ (UI):** Componentes visuais reutilizáveis.
    * `cards/`: Cartões genéricos (ex: FeatureCard).
    * `header/`: Cabeçalho customizado (CustomHeader).
    * `identificar-components/`: Componentes específicos da funcionalidade de IA.
* **map/:** Componentes do mapa (Leaflet Wrapper, Bottom Sheets).
* **hooks/ (Controller/Logic):** Contém toda a regra de negócio e gerenciamento de estado (ex: useldentification, useMapExplore). As telas não contêm lógica complexa, apenas consomem esses hooks.
* **constants/ (Theme):** Definições globais de cores (palette) e espaçamentos (layout).
* **data/ (Model):** Mocks de dados e tipagens (ex: mapData.ts, speciesMock.ts).

---

## 2. Módulos e Funcionalidades

### 2.1. Módulo Home (index.tsx)
O painel principal ("Dashboard") que oferece uma visão geral e acesso rápido às funcionalidades.
* **Hero Banner:** Destaque visual com a missão do app.
* **Stats Grid:** Estatísticas rápidas (número de espécies catalogadas, estados mapeados).
* **Navegação Rápida:** Cards grandes (FeatureCard) que levam para Identificar, Mapa, Relações e Socorros.

### 2.2. Módulo de Identificação (identificar.tsx)
Permite ao usuário descobrir qual é a espécie animal ou vegetal através de uma foto.

* **Fluxo de Estado:** Gerenciado pelo hook useldentification com três estados:
    1.  `input`: Tela inicial aguardando entrada (Câmera ou Galeria).
    2.  `loading`: Animação de "pulso" (AnalysisLoading) enquanto a "IA" processa.
    3.  `result`: Exibição do card detalhado da espécie (SpeciesResult).
* **Componentes Chave:** Action Buttons, NatureFiller (animação decorativa), SpeciesResult.

### 2.3. Módulo Mapa da Biodiversidade (mapa.tsx)
* **Tecnologia:** Utiliza LeafletMap (WebView) para renderizar o OpenStreetMap, contornando a necessidade de API Key do Google Maps (solução para o erro API key not found).
* **Funcionalidades:**
    * Navegação livre pelo mapa do Brasil.
    * Marcadores customizados para locais de interesse. (precisa de ajuste)
    * Barra de busca flutuante para encontrar estados ou biomas.
    * Bottom Sheet: Ao clicar em um local (ex: Amazonas), abre-se um painel com detalhes, carrossel de espécies e unidades de conservação (ver Location DetailsSheet).

### Separação View e Hooks
Para evitar componentes muito grandes, toda a lógica foi extraída para Custom Hooks.
Exemplo: identificar.tsx não sabe como abrir a câmera. Ele apenas chama handleSelectImage('câmera') do hook useldentification.
