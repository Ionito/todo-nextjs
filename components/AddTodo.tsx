import { Button, HStack, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'

interface Props {
  addTodo: (msg: string) => void
}

const AddTodo: React.FC<Props> = ({ addTodo }) => {
  const [content, setContent] = useState<string>('')
  const toast = useToast()
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!content) {
      toast({
        title: 'Error',
        description: 'Your todo is empty',
        status: 'error',
        isClosable: true,
      })
      return
    }
    addTodo(content)
    setContent('')
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }
  return (
    <form onSubmit={handleSubmit}>
      <HStack>
        <Input
          value={content}
          onChange={handleChange}
          variant="filled"
          placeholder="Add new todo"
        />
        <Button type="submit" colorScheme="pink" px={8}>
          Add todo
        </Button>
      </HStack>
    </form>
  )
}

export default AddTodo
