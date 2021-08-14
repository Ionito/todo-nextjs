import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme'
import { TodosProvider } from '../contexts/TodoContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <TodosProvider>
        <Component {...pageProps} />
      </TodosProvider>
    </ChakraProvider>
  )
}
export default MyApp
