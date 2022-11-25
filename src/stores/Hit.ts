// stores/counter.js
import type { Hit } from "@/models/Hit";
import { defineStore } from "pinia";

interface State {
  hits: Hit[];
  hit: Hit | null;
  caughtHits: Hit[];
  currentPandaHit: string | null;
}

export const hitsStore = defineStore("hits", {
  state: (): State => {
    return {
      hits: [],
      caughtHits: [],
      hit: null,
      currentPandaHit: null,
    };
  },
  getters: {
    getHits: (state) => {
      return state.hits;
    },
  },
  actions: {
    addHit: function (hit: Hit) {
      if (!this.$state.hits.find((h) => h.hit_set_id === hit.hit_set_id)) {
        this.$state.hits.push(hit);
      }
    },
    removeHit: function (hId: string) {
      this.$state.hits = this.$state.hits.filter((h) => {
        return h.hit_set_id !== hId;
      });
    },
    setCurrentPandaHit: function (hId: string) {
      this.$state.currentPandaHit = hId;
    },
    hitCaught: function (hit: Hit) {
      this.$state.caughtHits.push(hit);
      // No need for the following, server emits dequeue on caught hit
      // this.removeHit(hit.hit_set_id);
    },
  },
});