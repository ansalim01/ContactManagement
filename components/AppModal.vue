<script lang="ts" setup>
import { defineProps, defineEmits, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<{isVisible: boolean}>();

const emit = defineEmits<{(e: 'close'): void}>();
const isMouseDown = ref(false);
function close () {
  emit('close');
}

function handleMouseDown (event: MouseEvent) {
  if (event.target === event.currentTarget) {
    isMouseDown.value = true;
  }
}

function handleMouseUp (event: MouseEvent) {
  if (event.target === event.currentTarget && isMouseDown.value) {
    close();
  }
  isMouseDown.value = false;
}

function handleKeyDown (event: KeyboardEvent) {
  if (event.key === 'Escape') {
    close();
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
});

</script>

<template>
  <div
    v-if="props.isVisible"
    class="modal-overlay"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
  >
    <div class="modal">
      <button class="close-button" @click="close">
        <AppIcon name="close" :width="24" :height="24"></AppIcon>
      </button>
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  margin-top: 20px;
}
</style>
