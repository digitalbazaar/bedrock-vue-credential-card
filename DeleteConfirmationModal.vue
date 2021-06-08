<template>
  <q-dialog v-model="open" persistent transition-show="scale" transition-hide="scale">
    <q-card class="bg-negative text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6">Delete Credential</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        This credential will be deleted. This action cannot be undone.
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-red">
        <q-btn class="bg-negative text-white" unelevated label="DELETE" @click="$emit('delete')" />
        <q-btn class="bg-white text-red" flat label="CANCEL" @click="$emit('cancel')" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false
    }
  }
}
</script>
