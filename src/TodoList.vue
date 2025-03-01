<template>
   <div >
      <div v-for="todo in incompleteTodos" :key="todo.id">
         <div class="p-2 border-2 m-2 rounded-lg bg-blue-100 border-blue-200 flex justify-between items-center">
            {{todo.action}}
            <button class="content-end justify-end mr-4" @click="()=>toggleTodo(todo.id)">
               Mark it as completed
            </button>
         </div>
      </div>
      <div v-if="completedTodos.length>0" class="bg-blue-200 p-3 m-2 rounded-lg">
         {{'Your previous tasks kind gentleman'}}
      </div>
      <div v-for="todo in completedTodos" :key="todo.id">
         <div class="p-2 border-2 m-2 rounded-lg bg-blue-100 border-blue-200 flex justify-between items-center">
            {{todo.action}}
            <button class="content-end justify-end mr-4" @click="()=>toggleTodo(todo.id)">
               Mark it as uncomplete
            </button>
         </div>
      </div>
   </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

   const todoStore = useTodoStore();
   const {todos} = storeToRefs(todoStore);

   const {toggleTodo} = useTodoStore();

   const incompleteTodos = computed(()=> todos.value.filter(todo=> !todo.completed));
   const completedTodos = computed(()=> todos.value.filter(todo=> todo.completed))
</script>
