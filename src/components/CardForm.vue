<script setup>
import useVuelidate from "@vuelidate/core";

defineProps({
  cardHolderName: String,
  cardNumber: String,
  cardExpM: String,
  cardExpY: String,
  cardCvc: String,
  validate: useVuelidate,
});

defineEmits([
  "update:cardHolderName",
  "update:cardNumber",
  "update:cardExpM",
  "update:cardExpY",
  "update:cardCvc",
]);
</script>
<template>
  <form @submit.prevent="$emit('handleSubmit')">
    <div class="mb-3">
      <label for="cardHolderName" class="form-label">cardholder name</label>
      <input
        v-maska="{
          mask: 'Cc* Cc*',
          tokens: {
            C: { pattern: /[a-zA-Z]/, uppercase: true },
            c: { pattern: /[a-zA-Z]/, lowercase: true },
          },
        }"
        type="text"
        class="form-control"
        :class="{ 'error-input': validate.cardHolderName.$error }"
        id="cardHolderName"
        aria-describedby="cardHolderNameHelp"
        placeholder="e.g. Jane Appleseed"
        :value="cardHolderName"
        @input="$emit('update:cardHolderName', $event.target.value)"
        @keyup="validate.cardHolderName.$touch"
        @blur="validate.cardHolderName.$touch"
      />
      <div
        v-if="validate.cardHolderName.$error"
        id="cardHolderNameHelp"
        class="form-text"
      >
        {{ validate.cardHolderName.$errors[0].$message }}
      </div>
    </div>
    <div class="mb-3">
      <label for="cardHolderName" class="form-label">card number</label>
      <input
        v-maska="'#### #### #### ####'"
        type="text"
        class="form-control"
        :class="{ 'error-input': validate.cardNumber.$error }"
        id="cardNumber"
        aria-describedby="cardNumberHelp"
        placeholder="e.g. 1234 5678 9123 0000"
        maxlength="19"
        :value="cardNumber"
        @input="$emit('update:cardNumber', $event.target.value)"
        @keyup="validate.cardNumber.$touch"
        @blur="validate.cardNumber.$touch"
      />
      <div
        v-if="validate.cardNumber.$error"
        id="cardNumberHelp"
        class="form-text"
      >
        {{ validate.cardNumber.$errors[0].$message }}
      </div>
    </div>
    <div class="row g-3 align-items-center">
      <div class="col-6">
        <label for="expDate" class="form-label">exp. date (mm/yy)</label>
        <div class="row g-3 align-items-center">
          <div class="col-6">
            <input
              v-maska="{
                mask: 'M#',
                tokens: {
                  M: { pattern: /[0-1]/ },
                },
              }"
              type="text"
              class="form-control"
              :class="{ 'error-input': validate.cardExpM.$error }"
              id="expDateMonth"
              aria-describedby="expDateMonthHelp"
              placeholder="MM"
              :value="cardExpM"
              @input="$emit('update:cardExpM', $event.target.value)"
              @keyup="validate.cardExpM.$touch"
              @blur="validate.cardExpM.$touch"
            />
          </div>
          <div class="col-6">
            <input
              v-maska="'##'"
              type="text"
              class="form-control"
              :class="{ 'error-input': validate.cardExpY.$error }"
              id="expDateYear"
              aria-describedby="expDateYearHelp"
              placeholder="YY"
              :value="cardExpY"
              @input="$emit('update:cardExpY', $event.target.value)"
              @keyup="validate.cardExpY.$touch"
              @blur="validate.cardExpY.$touch"
            />
          </div>
        </div>
      </div>
      <div class="col-6">
        <label for="cardCvc" class="form-label">cvc</label>
        <input
          v-maska="'###'"
          type="text"
          class="form-control"
          :class="{ 'error-input': validate.cardCvc.$error }"
          id="cvcNumber"
          aria-describedby="cvcNumberHelp"
          placeholder="e.g. 123"
          maxlength="3"
          :value="cardCvc"
          @input="$emit('update:cardCvc', $event.target.value)"
          @keyup="validate.cardCvc.$touch"
          @blur="validate.cardCvc.$touch"
        />
      </div>
    </div>
    <div class="row mb-3 g-3 align-items-center">
      <div class="col-6">
        <div
          v-if="validate.cardExpM.$error"
          id="expDateMonthHelp"
          class="form-text"
        >
          {{ validate.cardExpM.$errors[0].$message }}
        </div>
        <div
          v-else-if="validate.cardExpY.$error"
          id="expDateYearHelp"
          class="form-text"
        >
          {{ validate.cardExpY.$errors[0].$message }}
        </div>
      </div>
      <div class="col-6">
        <div
          v-if="validate.cardCvc.$error"
          id="cvcNumberHelp"
          class="form-text"
        >
          {{ validate.cardCvc.$errors[0].$message }}
        </div>
      </div>
    </div>
    <div class="d-grid mb-3">
      <b-button class="btn-block" type="submit" variant="primary"
        >Confirm</b-button
      >
    </div>
  </form>
</template>
