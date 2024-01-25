import { create } from "zustand";

// CREATNG TODOS STORE:
export const useTodosStore = create((set) => ({
  todos: [
    {
      id: 1,
      task: "Learn Next JS 14",
    },

    {
      id: 2,
      task: "Visit book store",
    },
  ],

  // FOR ADDING NEW TASK:
  addTodo: (newTodo) => {
    set((state) => {
      return { todos: [...state.todos, newTodo] };
    });
  },

  // FOR EDITING TASK:
  editTodo: (id, updateTodo) => {
    set((state) => {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, ...updateTodo };
        }
        return todo;
      });

      return { todos: updatedTodos };
    });
  },

  // FOR DELETING SINGLE TASK:
  deleteTodo: (id) => {
    set((state) => {
      const updatedTodo = state.todos.filter((todo) => todo.id !== id);
      return { todos: updatedTodo };
    });
  },


  // FOR DELETING ALL TASK:
  deleteAllTodo: () => {
    set(() => ({ todos: [] }));
  
  },

}));
