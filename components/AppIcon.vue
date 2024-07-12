<script setup lang="ts">
interface Props {
  prefix?: string;
  name: string;
  color?: string;
  width?: number;
  height?: number;
}

const props = withDefaults(defineProps<Props>(), {
  prefix: 'icon',
  color: '#333',
  width: 25,
  height: 25
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<template>
  <svg aria-hidden="true" :width="width" :height="height">
    <use :href="symbolId" :fill="color" :color="color" />
  </svg>
</template>
