<script setup>
import CardFront from "@/components/CardFront.vue";
import CardBack from "@/components/CardBack.vue";
import { computed, reactive, ref } from "vue";
import CardForm from "../components/CardForm.vue";
import useValidate from "@vuelidate/core";
import {
  required,
  between,
  numeric,
  minLength,
  maxLength,
  helpers,
} from "@vuelidate/validators";
import SuccessMsg from "../components/SuccessMsg.vue";

const form = reactive({
  cardHolderName: "",
  cardNumber: "",
  cardExpM: "",
  cardExpY: "",
  cardCvc: "",
});

const processed = ref(false);

const cardHolderNameComp = computed(() => {
  return form.cardHolderName === "" ? "Jane Appleseed" : form.cardHolderName;
});
const cardNumberComp = computed(() => {
  return form.cardNumber === "" ? "0000 0000 0000 0000" : form.cardNumber;
});
const cardExpMComp = computed(() => {
  return !form.cardExpM ? "00" : form.cardExpM;
});
const cardExpYComp = computed(() => {
  return !form.cardExpY ? "00" : form.cardExpY;
});
const cardCvcComp = computed(() => {
  return form.cardCvc === "" ? "000" : form.cardCvc;
});

const validationSchema = computed(() => {
  return {
    cardHolderName: {
      required: helpers.withMessage("Can't be blank", required),
      minLength: helpers.withMessage(
        "Wrong format, length invalid",
        minLength(3)
      ),
    },
    cardNumber: {
      required: helpers.withMessage("Can't be blank", required),
      minLength: helpers.withMessage(
        "Wrong format, length invalid",
        minLength(19)
      ),
    },
    cardExpM: {
      required: helpers.withMessage("Can't be blank", required),
      numeric: helpers.withMessage("Wrong format, numbers only", numeric),
      minLength: helpers.withMessage(
        "Wrong format, month invalid",
        minLength(2)
      ),
      maxLength: helpers.withMessage(
        "Wrong format, month invalid",
        maxLength(2)
      ),
      between: helpers.withMessage(
        "Wrong format, month invalid",
        between(1, 12)
      ),
    },
    cardExpY: {
      required: helpers.withMessage("Can't be blank", required),
      numeric: helpers.withMessage("Wrong format, numbers only", numeric),
      minLength: helpers.withMessage(
        "Wrong format, year invalid",
        minLength(2)
      ),
      maxLength: helpers.withMessage(
        "Wrong format, year invalid",
        maxLength(2)
      ),
    },
    cardCvc: {
      required: helpers.withMessage("Can't be blank", required),
      numeric: helpers.withMessage("Wrong format, numbers only", numeric),
      minLength: helpers.withMessage("Wrong format, cvc invalid", minLength(3)),
      maxLength: helpers.withMessage("Wrong format, cvc invalid", maxLength(3)),
    },
  };
});

const v$ = useValidate(validationSchema, form);

async function handleSubmit() {
  if (!(await v$.value.$validate())) return;
  processed.value = true;
}

function resetForm() {
  processed.value = false;
  form.cardHolderName = "";
  form.cardNumber = "";
  form.cardExpM = "";
  form.cardExpY = "";
  form.cardCvc = "";
  v$.value.$reset();
}
</script>

<template>
  <div id="home" class="container-fluid">
    <div class="row">
      <div id="col-left" class="col-lg-4">
        <div id="cards-container">
          <CardFront
            :cardHolderName="cardHolderNameComp"
            :cardNumber="cardNumberComp"
            :cardExpM="cardExpMComp"
            :cardExpY="cardExpYComp"
          />
          <CardBack :cardCvc="cardCvcComp" />
        </div>
      </div>
      <div id="col-right" class="d-grid col-lg-8">
        <CardForm
          v-if="!processed"
          v-model:card-holder-name="form.cardHolderName"
          v-model:card-number="form.cardNumber"
          v-model:card-exp-m="form.cardExpM"
          v-model:card-exp-y="form.cardExpY"
          v-model:card-cvc="form.cardCvc"
          :validate="v$"
          @handle-submit="handleSubmit"
        />
        <SuccessMsg v-else @reset-form="resetForm" />
      </div>
    </div>
  </div>
</template>
