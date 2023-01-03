import { Box, ChakraProvider, Grid, VStack, extendTheme } from '@chakra-ui/react';
import * as React from 'react';
import Nav from './components/static/Nav';

import { ColorModeSwitcher } from './ColorModeSwitcher';


const theme = extendTheme({
  colors: {
    "gainsboro": {
      500: "#F2F8F7"
    },
    "purple": {
      50: '#efecfc',
      100: '#d2c9e9',
      200: '#b5a5d8',
      300: '#9a81c9',
      400: '#815db9',
      500: '#6b449f',
      600: '#56347c',
      700: '#3f2659',
      800: '#271636',
      850: '#1D1327',
      900: '#0e0615',
    },
    "teal": 
    {
      50: '#e1faf5',
      100: '#c4e8e3',
      200: '#a5d6cf',
      300: '#85c5bc',
      400: '#64b4a9',
      500: '#4b9b90',
      600: '#387870',
      700: '#265750',
      800: '#113530',
      900: '#001411',
    },
    "blue": {
      "50": "#EBF1F9",
      "100": "#C8D9EF",
      "200": "#A4C0E4",
      "300": "#81A7DA",
      "400": "#5D8FD0",
      "500": "#3A76C5",
      "600": "#2E5E9E",
      "700": "#234776",
      "800": "#172F4F",
      "900": "#0C1827"
    },
    "pink": {
      "50": "#F9EBF3",
      "100": "#EFC8DC",
      "200": "#E4A4C6",
      "300": "#DA81AF",
      "400": "#D05D99",
      "500": "#C53A82",
      "600": "#9E2E68",
      "700": "#76234E",
      "800": "#4F1734",
      "900": "#270C1A"
    },
    "coral": {
      "50": "#FDEAE8",
      "100": "#F9C4BE",
      "200": "#F49E94",
      "300": "#F0776A",
      "400": "#EC5141",
      "500": "#E82B17",
      "600": "#BA2312",
      "700": "#8B1A0E",
      "800": "#5D1109",
      "900": "#2E0905"
    }
  },
  semanticTokens: {
    colors: {
      "chakra-body-bg": {
        _light: "gainsboro.500",
        _dark: "purple.900"
      }
    }
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Raleway', sans-serif`,
  }
})

export const App = () => (
  <ChakraProvider theme={theme}>
    <Nav />
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
      </Grid>
    </Box>
  </ChakraProvider>
)
