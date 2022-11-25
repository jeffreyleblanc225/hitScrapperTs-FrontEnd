<script lang="ts">
import { defineComponent } from "vue";
import { hitsStore } from "@/stores/Hit";
import { io } from "socket.io-client";
import type { Hit } from "@/models/Hit";
export default defineComponent({
  name: "HitSocket",
  props: {
    hitIdToDequeue: {
      type: String,
    },
  },
  watch: {
    hitIdToDequeue: function (hId: string) {
      // eslint-disable-next-line no-extra-boolean-cast
      if (!!hId) {
        const socket = io("http://localhost:9000");
        hitsStore().removeHit(hId);
        console.log("watcher: remove hit: " + hId);
        socket.emit("dequeue", hId);
      }
    },
  },
  components: {},
  setup() {
    const socket = io("http://localhost:9000");
    socket.on("connect", () => {
      console.log("connect");
    });
    socket.on(`queuedHitsHistory`, (data) => {
      data.forEach((h: Hit) => {
        hitsStore().addHit(h);
      });
    });
    socket.on(`hitAdd`, (h: Hit) => {
      hitsStore().addHit(h);
    });
    socket.on(`dequeue`, (hId: string) => {
      hitsStore().removeHit(hId);
    });
    socket.on(`currentPanda`, (hId: string) => {
      console.log(`Setting current panada hit to: ${hId}`);
      hitsStore().setCurrentPandaHit(hId);
    });
    socket.on(`hitCaught`, (hit: Hit) => {
      console.log(`Hit Caught - HitId: ${hit.hit_set_id}`);
      hitsStore().hitCaught(hit);
    });
  },
});
</script>
