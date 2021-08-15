import { useContext, useEffect } from 'react'
import Head from 'next/head'
import {
  Box,
  VStack,
  HStack,
  IconButton,
  Heading,
  Text,
  useColorMode,
  useColorModeValue,
  Center,
  Button,
  Link,
} from '@chakra-ui/react'
import { FaSun, FaMoon } from 'react-icons/fa'
import TodoList from '../components/TodoList'
import AddTodo from '../components/AddTodo'
import { Todo } from '../types/todo'
import { connectToDatabase } from '../util/database'
import { table, minifyRecords } from './api/utils/airtable'
import { TodosContext } from '../contexts/TodoContext'
import { GetServerSidePropsContext } from 'next'
import { getSession } from '@auth0/nextjs-auth0'
import { FieldSet, Records } from 'airtable'

interface Props {
  initialTodos: Todo[]
  isConnected: boolean
  user: any
}
const Home: React.FC<Props> = ({ isConnected, initialTodos, user }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const iconColor = useColorModeValue(<FaSun />, <FaMoon />)

  const { todos, setTodos, addTodo, deleteTodo, editTodo } =
    useContext(TodosContext)

  useEffect(() => {
    setTodos(initialTodos)
  }, [])

  return (
    <Box h="100vh">
      <Head>
        <title>Todo app</title>
        <meta name="description" content="Todo test app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {isConnected ? (
          <h2 className="subtitle">You are connected to MongoDB</h2>
        ) : (
          <h2 className="subtitle">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
            for instructions.
          </h2>
        )}
        <VStack p={4} h="100vh" spacing="4">
          <HStack justifyContent="space-between" w="100%">
            <HStack>
              {user && <Link href="/api/auth/logout">Logout</Link>}
            </HStack>
            <HStack>
              <Text>{colorMode}</Text>
              <IconButton
                border="1px solid #333"
                onClick={toggleColorMode}
                isRound
                aria-label="toggle color mode"
                icon={iconColor}
              />
            </HStack>
          </HStack>

          <Heading
            fontWeight="extrabold"
            size="2xl"
            bgGradient="linear(to-r, pink.500, pink.300, blue)"
            bgClip="text"
          >
            Todo App
          </Heading>
          {user ? (
            <>
              <TodoList
                todos={todos}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
              <AddTodo addTodo={addTodo} />
            </>
          ) : (
            <Center h="250px">
              <Button as="a" colorScheme="blue" href="/api/auth/login">
                Login
              </Button>
            </Center>
          )}
        </VStack>
      </main>
    </Box>
  )
}

export default Home

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // mongoDB
  const { client } = await connectToDatabase()
  const isConnected = !!client

  // get loggedIn user
  const session = await getSession(context.req, context.res)

  // airtable
  let todos: Records<FieldSet> = []
  if (session?.user) {
    todos = await table
      .select({ filterByFormula: `user_id = '${session?.user?.sub}'` })
      .firstPage()
  }
  return {
    props: {
      isConnected,
      initialTodos: minifyRecords(todos),
      user: session?.user || null,
    },
  }
}
