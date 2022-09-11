<script setup>
import CompleteIconVue from "./icons/CompleteIcon.vue";
</script>
<template>
  <div id="success-msg">
    <CompleteIconVue />
    <h1>Thank You!</h1>
    <p>We've added your card details</p>
    <b-button
      @click="$emit('resetForm')"
      class="btn-block"
      type="button"
      variant="primary"
      >Continue</b-button
    >
  </div>
</template>
