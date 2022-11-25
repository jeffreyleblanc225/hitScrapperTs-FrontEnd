<script lang="ts">
import { defineComponent, reactive } from "vue";
import { hitsStore } from "@/stores/Hit";
import hitSocket from "@/components/HitSocket.vue";
import type { Hit } from "@/models/Hit";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "HitGrid",
  components: {},
  emits: ["dequeue"],
  data() {},
  setup(props, ctx) {
    ctx.emit("dequeue");
    const hits = hitsStore();
    let deleteRow = (row: string) => {
      console.log("deleteRow: " + row);
      //data.splice(data.indexOf(row), 1);
    };
    return {
      deleteRow,
      hits,
    };
  },
  //   data: () => ({ hitToDequeue: "", hits: {} }),
  //    data (){
  //     return {
  //           hit: {}
  //     }
  //   //  }
  //   // setup() {
  //   //   const _hits = hitsStore().hits;
  //   //   hits = _hits;
  //   //   // hits.hits.
  //   // },
  // });
});
</script>
<template>
  <!-- <div v-for="h in hits.getHits" :key="h.hit_set_id">
    <div>{{ h.pay }} {{ h.hit_set_id }}</div>
  </div> -->

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
