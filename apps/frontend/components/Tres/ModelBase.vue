<script setup lang="ts">
const {
  path,
  castShadow,
  receiveShadow,
} = defineProps<{
  path: string
  castShadow?: boolean
  receiveShadow?: boolean
}>()

const root = shallowRef()
const gltf = shallowRef()
defineExpose({ root })

gltf.value = await useGLTF(path, { draco: true })

const { scene: model } = gltf.value

recursiveShadow(model, { cast: castShadow, receive: receiveShadow })
</script>

<template>
  <primitive ref="root" :object="model" />
</template>
