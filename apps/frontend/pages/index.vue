<script setup>
import { BasicShadowMap, MathUtils, NoToneMapping, Object3D, SRGBColorSpace, Vector3 } from 'three'
import { vAlwaysLookAt, vLightHelper } from '@tresjs/core'
import { Listeners, keyboard } from '@manapotion/vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const { onLoop } = useRenderLoop()

const boatRef = shallowRef()
const cameraRef = shallowRef()

onMounted(async () => {
  while (!boatRef.value)
    await new Promise(r => setTimeout(r, 1000))

  const coronaSafetyDistance = 20
  const temp = new Vector3()
  const dir = new Vector3()
  const a = new Vector3()
  const b = new Vector3()
  const camContainer = new Object3D()
  const followDistance = new Object3D()
  let speed = 0.0
  followDistance.position.z = -coronaSafetyDistance
  boatRef.value.root.add(followDistance)

  camContainer.add(cameraRef.value)

  onLoop(({ delta, elapsed }) => {
    const deltaInMs = delta * 1000
    const { KeyW, KeyS, KeyA, KeyD } = keyboard.codes

    if (boatRef.value) {
      speed = easeToTarget(speed, 0, { deltaInMs, speed: 0.005, threshold: 0.005 })

      if (KeyW)
        speed += keyboard.shift ? 0.15 : 0.05
      else if (KeyS)
        speed -= 0.05

      boatRef.value.root.translateZ(speed)

      if (KeyA)
        boatRef.value.root.rotateY(0.05)
      else if (KeyD)
        boatRef.value.root.rotateY(-0.05)

      a.lerp(boatRef.value.root.position, 0.4)
      b.copy(camContainer.position)

      dir.copy(a).sub(b).normalize()
      const dis = a.distanceTo(b) - coronaSafetyDistance
      camContainer.position.addScaledVector(dir, dis)
      camContainer.position.lerp(temp, 0.02)
      temp.setFromMatrixPosition(followDistance.matrixWorld)

      cameraRef.value.lookAt(boatRef.value.root.position)
    }
  })
})
</script>

<template>
  <TresCanvas v-bind="gl" window-size>
    <TresPerspectiveCamera ref="cameraRef" :position="[0, 4, 0]" :look-at="[0, 0, 0]" :near="0.1" :far="10000" />

    <Suspense>
      <Islands :position="[0, 18, 0]" />
    </Suspense>

    <Suspense>
      <Boat ref="boatRef" :scale="0.025" :position="[0, -0.85, 0]" :rotation="[0, 0.8, 0]" />
    </Suspense>

    <TresAmbientLight :intensity="2" />
    <TresDirectionalLight v-light-helper cast-shadow :position="[300, 200, 0]" :look-at="[0, 0, 0]" :intensity="2" />
  </TresCanvas>
  <Listeners />
</template>
