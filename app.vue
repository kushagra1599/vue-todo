<template>
  <TodoInput/>
  <TodoList />
</template>


<script setup>

import TodoInput from './src/TodoInput.vue';
import TodoList from './src/TodoList.vue';

const {initTodos} = useTodoStore();

onMounted(()=>{
  initTodos();
})

</script>
