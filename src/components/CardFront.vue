<script setup>
const props = defineProps([
  "cardHolderName",
  "cardNumber",
  "cardExpM",
  "cardExpY",
]);
console.log(props);
</script>
<template>
  <div id="card-front" class="card">
    <div id="card-front-top">
      <div id="card-front-logo"></div>
      <div id="card-front-logo-small"></div>
    </div>
    <div>
      <h2 id="card-number">{{ cardNumber }}</h2>
      <div id="card-front-row">
        <span>{{ cardHolderName }}</span>
        <span>{{ cardExpM }}/{{ cardExpY }}</span>
      </div>
    </div>
  </div>
</template>
