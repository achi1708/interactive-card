<script setup>
const props = defineProps(["cardCvc"]);
console.log(props);
</script>
<template>
  <div id="card-back" class="card">
    <div id="card-back-number">{{ cardCvc }}</div>
  </div>
</template>
