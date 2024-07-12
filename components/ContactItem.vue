<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { InterfaceContactItem } from '@/types';

const props = defineProps<{ contactItem: InterfaceContactItem }>();

const emit = defineEmits<{
  (e: 'editContact', contact: InterfaceContactItem): void;
  (e: 'deleteContact', contact: InterfaceContactItem): void;
}>();

const handleEdit = () => {
  emit('editContact', props.contactItem);
};

const handleDelete = () => {
  emit('deleteContact', props.contactItem);
};
</script>

<template>
  <div class="contact-item__item" v-for="(item, key) in contactItem" :key="key">
    {{ item }}
  </div>
  <div class="contact-item__icons">
    <AppIcon name="gear-wheel" :width="32" :height="32" color="teal" @click="handleEdit()" />
    <AppIcon name="trashcan" :width="32" :height="32" color="red" @click="handleDelete()" />
  </div>
</template>

<style lang="scss">
.contact-item {
  &__item {
    flex: 0 0 $table-width;
  }

  &__icons {
    display: flex;
    align-items: center;
    gap: 16px;
  }
}
</style>
