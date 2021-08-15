import { createContext, Dispatch, SetStateAction, useState } from 'react'
import { Todo } from '../types/todo'
import { useUser } from '@auth0/nextjs-auth0'

type ContextProps = {
  todos: Todo[]
  setTodos: Dispatch<SetStateAction<Todo[]>>
  addTodo: (title: string) => void
  deleteTodo: (todoId: string) => void
  editTodo: (todo: Todo) => void
}

const TodosContext = createContext<ContextProps>({} as ContextProps)

const TodosProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([])
  const { user, error, isLoading } = useUser()

  const addTodo = async (todo: string) => {
    try {
      const res = await fetch('/api/createTodo', {
        method: 'POST',
        body: JSON.stringify({ title: todo, user_id: user?.sub }),
        headers: { 'Content-Type': 'application/json' },
      })
      // try don't consider 401 error to catch
      if (!res.ok) {
        throw new Error('unauthorized')
      } else {
        const newTodo = await res.json()

        setTodos((prevTodos: Todo[]) => {
          const updatedTodos = [
            { id: newTodo.id, title: newTodo.fields.title },
            ...prevTodos,
          ]
          return updatedTodos
        })
      }
    } catch (err) {
      console.error(err)
    }
  }
  const deleteTodo = async (todoId: string) => {
    try {
      await fetch('/api/deleteTodo', {
        method: 'Delete',
        body: JSON.stringify({ id: todoId }),
        headers: { 'Content-Type': 'application/json' },
      })
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId))
    } catch (error) {}
  }

  const editTodo = async (updatedTodo: Todo) => {
    try {
      setTodos((prevTodos) => {
        const existingTodos = [...prevTodos]
        const existingTodoIndex = existingTodos.findIndex(
          (todo) => todo.id === updatedTodo.id
        )
        existingTodos[existingTodoIndex] = updatedTodo
        return existingTodos
      })
      await fetch('/api/editTodo', {
        method: 'Put',
        body: JSON.stringify(updatedTodo),
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        addTodo,
        deleteTodo,
        editTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  )
}

export { TodosProvider, TodosContext }
