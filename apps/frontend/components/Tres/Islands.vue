<script setup lang="ts">
const {
  castShadow,
  receiveShadow,
} = defineProps<{
  castShadow?: boolean
  receiveShadow?: boolean
}>()

const { scene: model } = await useGLTF('/3d/islands.glb', { draco: true })

recursiveShadow(model, { cast: castShadow, receive: receiveShadow })
</script>

<template>
  <primitive :object="model" />
</template>
