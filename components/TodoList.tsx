import React from 'react'
import {
  HStack,
  VStack,
  Text,
  IconButton,
  StackDivider,
  Badge,
  Box,
} from '@chakra-ui/react'
import { FaTrash } from 'react-icons/fa'
import { round } from 'lodash'
import { Todo } from '../types/todo'

interface Props {
  todos: Todo[]
  deleteTodo: (id: number) => void
}

const TodoList: React.FC<Props> = ({ todos, deleteTodo }) => {
  if (!todos.length) {
    return (
      <Box>
        <Badge p="4" m="8" borderRadius="4" colorScheme="green">
          No todos yet!
        </Badge>
      </Box>
    )
  }
  return (
    <VStack
      divider={<StackDivider />}
      borderColor="gray.100"
      borderWidth="2px"
      p={4}
      rounded="lg"
      w="100%"
      mt="8"
      maxW={{ base: '90%', md: '80%', lg: '60%' }}
      alignItems="stretch"
    >
      {todos.map(({ id, title }) => (
        <HStack key={id} justifyContent="space-between">
          <Text>{title}</Text>
          <IconButton
            onClick={() => deleteTodo(id)}
            aria-label="delete todo item"
            isRound
            size="sm"
            icon={<FaTrash />}
          />
        </HStack>
      ))}
    </VStack>
  )
}

export default TodoList
