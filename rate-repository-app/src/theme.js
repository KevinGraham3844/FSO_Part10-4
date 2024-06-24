import { Platform } from "react-native";

const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      primary: '#0366d6',
      appHeaderColor: '#FFFFFF',
      languageColor: '#FFFFFF'
    },
    fontSizes: {
      body: 14,
      subheading: 16,
    },
    fonts: {
      main: Platform.select({
        android: 'Roboto',
        ios: 'Arial',
        default: 'System'
      }),
      date: 'Arial'
    },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
    textAlign: {
      alignStats: 'center'
    }
  };
  
  export default theme;