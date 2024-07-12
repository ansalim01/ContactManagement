<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import ContactList from '@/components/ContactList.vue';
import SearchBar from '@/components/SearchBar.vue';
import ContactForm from '@/components/ContactForm.vue';
import AppModal from '@/components/AppModal.vue';
import type { InterfaceContactItems, InterfaceContactItem } from '@/types';
import { ModalType } from '@/types';
import { fetchContacts } from '@/api';

// Реактивное состояние для заголовков контактов
const contactTitle = ref<string[]>(['key', 'name', 'telefon', 'email']);

// Реактивное состояние для формы редактирования контакта
const formaContact = ref<InterfaceContactItem>({
  key: '',
  name: '',
  telefon: '',
  email: ''
});

// Реактивное состояние для видимости модального окна и типа модального окна
const showModal = ref<boolean>(false);
const typeModal = ref<ModalType>(ModalType.Add);

// Реактивное состояние для поискового запроса
const searchQuery = ref<string>('');

// Реактивное состояние для ошибок валидации
const validationErrors = ref<{ [key: string]: string }>({});

// Функция для загрузки данных из localStorage
function loadContactsFromLocalStorage (): InterfaceContactItems {
  if (process.client) {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      return JSON.parse(savedContacts);
    }
  }
  return [];
}

// Функция для загрузки данных из API, если localStorage пустой
async function loadContactsFromAPI (): Promise<InterfaceContactItems> {
  try {
    const contacts = await fetchContacts();
    return contacts;
  } catch (error) {
    console.error('Failed to fetch contacts:', error);
    return [];
  }
}

// Дебаунс функция
function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return function (this: any, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  } as T;
}

// Реактивное состояние списка контактов
const contactList = ref<InterfaceContactItems>([]);

// Загрузка данных из localStorage при монтировании компонента
onMounted(async () => {
  const savedContacts = loadContactsFromLocalStorage();
  if (savedContacts.length > 0) {
    contactList.value = savedContacts;
  } else {
    try {
      const contactsFromAPI = await loadContactsFromAPI();
      contactList.value = contactsFromAPI;
      saveContactsToLocalStorage(contactsFromAPI);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    }
  }
});

// Функция сохранения контактов в localStorage
function saveContactsToLocalStorage (contacts: InterfaceContactItems) {
  if (process.client) {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }
}

// Обработчик изменения поискового запроса с дебаунсом
const handleSearch = debounce((value: string) => {
  searchQuery.value = value.toLowerCase();
}, 300);

// Вычисляемое свойство для фильтрации контактов на основе searchQuery
const filteredContacts = computed(() =>
  contactList.value.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

// Функция для начала редактирования контакта
function editingContact (contact: InterfaceContactItem) {
  typeModal.value = ModalType.Edit;
  showModal.value = true;
  formaContact.value = { ...contact };
  validationErrors.value = {};
}

// Валидация полей формы
function validateForm (contact: InterfaceContactItem): boolean {
  const errors: { [key: string]: string } = {};

  if (!contact.name) {
    errors.name = 'Name is required';
  }
  if (!contact.telefon) {
    errors.telefon = 'Telefon is required';
  }
  if (!contact.email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
    errors.email = 'Invalid email format';
  }

  validationErrors.value = errors;
  return Object.keys(errors).length === 0;
}

// Функция для сохранения изменений или добавления нового контакта
function saveContactChanges (updatedContact: InterfaceContactItem) {
  if (!validateForm(updatedContact)) {
    return;
  }

  if (typeModal.value === ModalType.Add) {
    const newKey = String(Date.now());
    updatedContact.key = newKey;
    contactList.value.push(updatedContact);
  } else if (typeModal.value === ModalType.Edit) {
    const index = contactList.value.findIndex(c => c.key === updatedContact.key);
    if (index !== -1) {
      contactList.value[index] = updatedContact;
    }
  }

  saveContactsToLocalStorage(contactList.value);
  showModal.value = false;
}

// Функция для удаления контакта
function deleteContact (item: InterfaceContactItem) {
  const index = contactList.value.findIndex(c => c.key === item.key);
  if (index !== -1) {
    contactList.value = contactList.value.filter(p => p.key !== item.key);
    saveContactsToLocalStorage(contactList.value);
  }
}

function addContact () {
  typeModal.value = ModalType.Add;
  formaContact.value = {
    key: '',
    name: '',
    telefon: '',
    email: ''
  };
  validationErrors.value = {};
  showModal.value = true;
}

function closeModal () {
  showModal.value = false;
}
</script>

<template>
  <div class="contact">
    <div class="contact__container">
      <AppIcon
        name="user-add"
        :width="32"
        :height="32"
        color="teal"
        @click="addContact"
      />
      <SearchBar
        placeholder="Поиск по имени"
        @input="handleSearch"
      />
      <ContactList
        :contacts="filteredContacts"
        :contactTitle="contactTitle"
        @editContact="editingContact"
        @deleteContact="deleteContact"
        :searchQuery="searchQuery"
      />
    </div>
    <AppModal :isVisible="showModal" @close="closeModal">
      <ContactForm
        :formaContact="formaContact"
        :validationErrors="validationErrors"
        :typeModal="typeModal"
        @saveContactChanges="saveContactChanges"
      />
    </AppModal>
  </div>
</template>

<style lang="scss">

.contact {
  &__container {
    max-width: 1900px;
    margin: 0 auto;
    min-height: 100vh;
    padding: 12px 16px;
    overflow: auto;
  }
}
</style>
