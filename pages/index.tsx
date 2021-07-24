import Head from 'next/head'
import Image from 'next/image'
import {
  Box,
  VStack,
  HStack,
  IconButton,
  Heading,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaSun, FaMoon } from 'react-icons/fa'
import TodoList from '../components/TodoList'
import AddTodo from '../components/AddTodo'
import { Todo } from '../types/todo'
import { useState } from 'react'
import faker from 'faker'

const initialTodos: Todo[] = [
  { id: 1, title: 'todo numero 1' },
  { id: 2, title: 'todo numero 2' },
]

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode()
  const [todos, setTodos] = useState(initialTodos)
  const iconColor = useColorModeValue(<FaSun />, <FaMoon />)

  const deleteTodo = (id: number) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id))
  }

  const addTodo = (content: string) => {
    const newTodo: Todo = {
      id: faker.datatype.uuid(),
      title: content,
      timestamp: new Date(),
    }
    setTodos((todos) => [...todos, newTodo])
  }

  return (
    <Box h="100vh">
      <Head>
        <title>Todo app</title>
        <meta name="description" content="Todo test app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <VStack p={4} h="100vh" spacing="4">
          <HStack alignSelf="flex-end">
            <Text>{colorMode}</Text>
            <IconButton
              border="1px solid #333"
              onClick={toggleColorMode}
              isRound
              aria-label="toggle color mode"
              icon={iconColor}
            />
          </HStack>

          <Heading
            fontWeight="extrabold"
            size="2xl"
            bgGradient="linear(to-r, pink.500, pink.300, blue)"
            bgClip="text"
          >
            Todo App
          </Heading>
          <TodoList todos={todos} deleteTodo={deleteTodo} />
          <AddTodo addTodo={addTodo} />
        </VStack>
      </main>
    </Box>
  )
}
