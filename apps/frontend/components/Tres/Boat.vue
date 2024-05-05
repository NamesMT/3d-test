<script setup lang="ts">
const {
  castShadow,
  receiveShadow,
} = defineProps<{
  castShadow?: boolean
  receiveShadow?: boolean
}>()

const root = shallowRef()
defineExpose({ root })

const { scene: model, animations } = await useGLTF('/3d/boat.glb', { draco: true })

const { actions } = useAnimations(animations, model)

const currentAction = ref(actions['Take 001'])

currentAction.value.play()

recursiveShadow(model, { cast: castShadow, receive: receiveShadow })
</script>

<template>
  <primitive ref="root" :object="model" />
</template>
