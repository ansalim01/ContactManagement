<template>
  <div class="contact-form__modal">
    <div class="contact-form__modal-box">
      <label class="contact-form__modal-label" for="name">Name:</label>
      <input
        id="name"
        class="contact-form__modal-input"
        type="text"
        v-model="localFormaContact.name"
      >
      <span class="error" v-show="validationErrors.name">{{ validationErrors.name }}</span>
    </div>
    <div class="contact-form__modal-box">
      <label class="contact-form__modal-label" for="telefon">Telefon:</label>
      <input
        id="telefon"
        class="contact-form__modal-input"
        type="text"
        v-model="localFormaContact.telefon"
      >
      <span class="error" v-show="validationErrors.telefon">{{ validationErrors.telefon }}</span>
    </div>
    <div class="contact-form__modal-box">
      <label class="contact-form__modal-label" for="email">Email:</label>
      <input
        id="email" class="contact-form__modal-input" type="text" v-model="localFormaContact.email">
      <span class="error" v-show="validationErrors.email">{{ validationErrors.email }}</span>
    </div>
    <button class="contact-form__modal-button" @click="handleSaveContactChanges">
      {{ typeModal === ModalType.Add ? 'Добавить' : 'Сохранить' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
import type { InterfaceContactItem } from '@/types';
import { ModalType } from '@/types';

const props = defineProps<{
  formaContact: InterfaceContactItem,
  validationErrors: { [key: string]: string },
  typeModal: ModalType
}>();

const emits = defineEmits<{ 
  saveContactChanges: (updatedContact: InterfaceContactItem) => void 
}>();

const localFormaContact = ref<InterfaceContactItem>({ ...props.formaContact });

watch(() => props.formaContact, (newVal) => {
  localFormaContact.value = { ...newVal };
});

const handleSaveContactChanges = () => {
  emits('saveContactChanges', localFormaContact.value);
};
</script>

<style lang="scss">
.error {
  color: red;
  font-size: 0.8em;
}

.contact-form {
	&__modal {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__modal-label {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__modal-input {
    width: 100%;
    border-radius: 8px;
    border: 1px solid teal;
    padding: 4px 8px;
    outline: none;
    :focus {
      border: 2px solid teal;
    }
  }

  &__modal-button {
    background-color: #fff;
    padding: 8px 16px;
    border: 1px solid teal;
    border-radius: 8px;
  }
}
</style>
