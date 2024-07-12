<!-- components/SearchBar.vue -->
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// Определение пропсов для placeholder
const props = defineProps<{
  placeholder: string;
}>();

// Определение эмитов для события 'input' с значением типа string
const emit = defineEmits<{
  (event: 'input', value: string): void;
}>();

// Обработка события ввода и эмит события 'input' с переданным значением
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('input', target.value);
};
</script>

<template>
  <div class="search-bar__search">
    <label class="search-bar__search-label" for="search">Имя:</label>
    <input
      id="search"
      class="search-bar__search-input"
      type="text"
      @input="handleInput"
      :placeholder="props.placeholder"
    />
  </div>
</template>

<style lang="scss">
.search-bar {
    &__search {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-bottom: 16px;
      max-width: 30%
    }
  
    &__search-input {
      width: 100%;
      border-radius: 8px;
      border: 1px solid teal;
      padding: 4px 8px;
      outline: none;
      :focus {
        border: 2px solid teal;
      }
    }
}
</style>
