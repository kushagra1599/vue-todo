<template>
    <div>
        <div class="inline-flex w-full bg-blue-200 p-4">
            <div class="bg-blue-200 inline-flex w-2/12 justify-center text-base self-center text-xl"> 
                {{ 'Todo Input' }}
            </div>
            <input 
                placeholder="Enter your task here" 
                class="inline-flex w-full outline-none text-base bg-white p-2 rounded-md" 
                v-model="currTodoTask"
                @keydown.enter="onEnterPress"
            />
        </div>
    </div>
</template>

<script setup>
    const currTodoTask = ref('');

    const {addTodo} = useTodoStore();

    function onEnterPress() {
        addTodo(currTodoTask.value)
        currTodoTask.value=''
    }
</script>