<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import type { InterfaceContactItems, InterfaceContactItem } from '@/types';

const props = defineProps<{
  contacts: InterfaceContactItems;
  contactTitle: string[];
  searchQuery: string;
}>();

const emit = defineEmits<{
  (e: 'editContact', contact: InterfaceContactItem): void;
  (e: 'deleteContact', contact: InterfaceContactItem): void;
}>();

// Фильтрация контактов на основе поискового запроса
const filteredContacts = computed(() =>
  props.contacts.filter(contact =>
    contact.name.toLowerCase().includes(props.searchQuery.toLowerCase())
  )
);
</script>

<template>
  <div class="contact-list__list">
    <div class="contact-list__title">
      <div class="contact-list__title-item" v-for="title in props.contactTitle" :key="title">
        {{ title }}
      </div>
    </div>
    <transition-group name="list" tag="div" class="contact-list__transition">
      <div class="contact-list__items" v-for="contact in filteredContacts" :key="contact.key">
        <ContactItem
          :contactItem="contact"
          @editContact="emit('editContact', contact)"
          @deleteContact="emit('deleteContact', contact)"
        ></ContactItem>
      </div>
    </transition-group>
  </div>
</template>

<style lang="scss">
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.contact-list {
  &__list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__title {
    border-radius: 12px;
    padding: 10px 16px;
    border: 2px solid teal;
    display: flex;
    gap: 12px;
    background-color: teal;
  }

  &__title-item {
    color: white;
    flex: 0 0 23%;
  }

  &__transition {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__items {
    border-radius: 12px;
    padding: 10px 16px;
    border: 2px solid teal;
    display: flex;
    gap: 12px;
  }
}
</style>
