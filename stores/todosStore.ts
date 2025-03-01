// src/stores/todoStore.ts
import { defineStore } from 'pinia';
import { type TodoItem } from './model';

// Define the shape of the store state
interface TodoState {
  todos: TodoItem[];
  nextId: number;
}

export const useTodoStore = defineStore('todo', {
  // State
  state: (): TodoState => ({
    todos: [],
    nextId: 1,
  }),

  // Getters
  getters: {
    completedTodos: (state) => state.todos.filter(todo => todo.completed),
    incompleteTodos: (state) => state.todos.filter(todo => !todo.completed),
    totalCount: (state) => state.todos.length,
  },

  // Actions
  actions: {
    /**
     * Add a new todo to the list
     * @param todoItem The content of the todo item
     * @returns The newly created todo
     */

    initTodos() {
        const nuxtApp = useNuxtApp()
        const savedTodos = nuxtApp.$localStorage.getItem('todos')
        if (savedTodos) {
          this.todos = savedTodos
        }
        this.nextId=this.todos.length+1;
      },
  
    addTodo(todoItem: string): TodoItem {
      const newTodo: TodoItem = {
        id: this.nextId++,
        action:todoItem,
        completed: false,
      };
      
      this.todos.push(newTodo);

      const nuxtApp = useNuxtApp();
      nuxtApp.$localStorage.setItem('todos',this.todos)
      return newTodo;
    },

    /**
     * Remove a todo by its ID
     * @param id The ID of the todo to remove
     * @returns True if the todo was found and removed, false otherwise
     */
    removeTodo(id: number): boolean {
      const index = this.todos.findIndex(todo => todo.id === id);
      
      if (index !== -1) {
        this.todos.splice(index, 1);
        const nuxtApp = useNuxtApp();
        nuxtApp.$localStorage.setItem('todos',this.todos)
        return true;
      }
      
      return false;
    },

    /**
     * Toggle the completion status of a todo
     * @param id The ID of the todo to toggle
     * @returns True if the todo was found and toggled, false otherwise
     */
    toggleTodo(id: number): boolean {
      const todo = this.todos.find(todo => todo.id === id);
      const nuxtApp = useNuxtApp();
      
      if (todo) {
        todo.completed = !todo.completed;
        nuxtApp.$localStorage.setItem('todos',this.todos);
        return true;
      }
      
      return false;
    },

    /**
     * Clear all todos from the list
     */
    clearTodos(): void {
      this.todos = [];
      const nuxtApp = useNuxtApp();
        nuxtApp.$localStorage.setItem('todos',this.todos)
    },

    /**
     * Clear only completed todos
     * @returns The number of todos that were cleared
     */
    clearCompletedTodos(): number {
      const completedCount = this.completedTodos.length;
      this.todos = this.todos.filter(todo => !todo.completed);
      const nuxtApp = useNuxtApp();
        nuxtApp.$localStorage.setItem('todos',this.todos)
      return completedCount;
    }
  },
});