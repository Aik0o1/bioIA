import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

//Paleta
export const palette = {
  // Cores Primárias e Secundárias
  verdePrimary: '#00b28f',  
  terraAccent: '#A37B5C',     
  
  // Cores de Fundo
  fundoClaro: '#f4fbf9',      // background-light
  fundoEscuro: '#141f1d',     //background-dark
  branco: '#ffffff',
  
  // Cores de Texto
  textoEscuro: '#0c1d19',     
  textoClaro: '#f8fcfb',    
  
  // Cores de Feedback 
  perigo: '#dc2626',          
  aviso: '#d97706',           
  avisoFundo: '#d97706',      // Para fundos de alerta
};

// Espaçamentos
export const layout = {
  radius: {
    sm: 8,   // (rounded-DEFAULT = 0.5rem)
    md: 16,  // (rounded-lg = 1rem)
    lg: 24,  // (rounded-xl = 1.5rem)
    full: 9999,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  }
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    
    // Mapeamento Principal
    primary: palette.verdePrimary,
    onPrimary: palette.branco,
    
    secondary: palette.terraAccent,
    onSecondary: palette.branco,
    
    background: palette.fundoClaro, // Cor de fundo padrão das telas
    surface: palette.branco,        // Cor dos Cards
    onSurface: palette.textoEscuro, // Cor do texto em cima dos cards
    
    error: palette.perigo,
    
    // Customizados (se precisar acessar via theme.colors)
    backgroundDark: palette.fundoEscuro,
    warning: palette.aviso,
  },
  
  roundness: 2, // Ajuste fino global, mas prefira usar layout.radius nas Views
};