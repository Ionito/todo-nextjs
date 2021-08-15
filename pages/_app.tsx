import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme'
import { TodosProvider } from '../contexts/TodoContext'
import { UserProvider } from '@auth0/nextjs-auth0'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <TodosProvider>
          <Component {...pageProps} />
        </TodosProvider>
      </UserProvider>
    </ChakraProvider>
  )
}
export default MyApp
