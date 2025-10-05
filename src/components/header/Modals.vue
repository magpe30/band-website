<template>
  <div>
    <GeneralModal v-if="$store.getters.generalModal" />
  </div>
</template>

<script>
import GeneralModal from "@/components/general/modals/GeneralModal.vue"

export default {
  name: "Modals",
  components: {
    GeneralModal
  },
};
</script>

<style scoped></style>
