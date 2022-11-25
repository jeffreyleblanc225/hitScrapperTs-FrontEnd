<script lang="ts">
import { defineComponent } from "vue";
import { hitsStore } from "@/stores/Hit";

export default defineComponent({
  name: "HitGrid",
  components: {},
  emits: ["dequeue"],
  data() {},
  setup() {
    const hits = hitsStore();
    return {
      hits,
    };
  },
});
</script>
<template>
  <table width="100%" id="firstTable">
    <caption>
      Hits currently in queue
    </caption>
    <thead>
      <tr>
        <th>Status</th>
        <th>Pay</th>
        <th>Title</th>
        <th>Dequeue</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="h in hits.getHits"
        :key="h.hit_set_id"
        :class="{ current: h.hit_set_id === hits.currentPandaHit }"
      >
        <td v-if="h.hit_set_id === hits.currentPandaHit">*</td>
        <td v-else></td>
        <td>{{ h.pay }}</td>
        <td>{{ h.title }}</td>
        <td>
          <button @click="$emit('dequeue', h.hit_set_id)">Dequeue</button>
        </td>
      </tr>
    </tbody>
  </table>
  <br />
  <hr />
  <table width="100%" id="caughtHits">
    <caption>
      Caught Hits
    </caption>
    <thead>
      <tr>
        <th>Pay</th>
        <th>Title</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="h in hits.caughtHits" :key="h.hit_set_id">
        <td>{{ h.pay }}</td>
        <td>{{ h.title }}</td>
      </tr>
    </tbody>
  </table>
  <hr />
  While this app is in beta, please consider donating.
  <br />
  BTC: bc1qdq65wt30gpcdsuysmluqea3qcsy6drsea2dvus
  <br />
  LTC: ltc1qxh2h2msml7lqekvuhux8nr8yd22lsmq67xlrmt
</template>
<style>
:root {
  --currentPanda: rgb(2, 125, 202);
}

.current {
  color: var(--currentPanda);
}
th,
td {
  border: 1px solid black;
  padding: 8px;
}

thead th {
  width: 25%;
  padding: 8px;
}
</style>
