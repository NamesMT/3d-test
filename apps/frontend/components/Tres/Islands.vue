<script setup lang="ts">
const {
  castShadow,
  receiveShadow,
} = defineProps<{
  castShadow?: boolean
  receiveShadow?: boolean
}>()

const { scene: model } = await useGLTF('/3d/chickenIslands.glb', { draco: true })

recursiveShadow(model, { cast: castShadow, receive: receiveShadow })
</script>

<template>
  <ModelBase path="/3d/chickenIslands.glb" v-bind="{ castShadow, receiveShadow }" />
</template>
