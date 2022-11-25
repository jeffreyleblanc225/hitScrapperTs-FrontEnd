<script setup lang="ts">
import HitSocketVue from "./components/HitSocket.vue";
import GridVue from "./components/Grid.vue";
import { ref } from "vue";
let hitIdToDequeue = ref("");
function dequeue(hId: string) {
  hitIdToDequeue.value = hId;
}
</script>

<template>
  <main>
    <HitSocketVue :hit-id-to-dequeue="hitIdToDequeue" />
    <GridVue @dequeue="dequeue" />
  </main>
</template>
