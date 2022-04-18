<template>
  <div class="calculator">
    <router-link to="/">Вернуться на главную страницу</router-link>
    <TheForm />
    <h2 class="calculator-heading">Банки, которые способны предоставить запрошенный кредит:</h2>
    <ul class="calculator-list">
      <ResultForm
        v-for="bank in calculatorArr"
        :key="bank.id"
        :id="bank.id"
        :name="bank.name"
        :percentYear="bank.percentYear"
        :maxAmount="bank.maxAmount"
        :minPrepaidExpense="bank.minPrepaidExpense"
        :creditLines="bank.creditLines"
      />
    </ul>
  </div>
</template>
<script>
import TheForm from '../components/TheForm.vue'
import ResultForm from '../components/ResultForm.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TheCalculator',
  components: {
    TheForm,
    ResultForm
  },
  updated () {
    this.clearChackCalculator()
  },
  computed: {
    ...mapGetters(['calculatorArr'])
  },
  methods: {
    ...mapActions(['clearChackCalculator'])
  }
}
</script>

<style lang="scss">
.calculator {
  margin: 0 10px;

  &-heading {
    text-align: center;
  }

  &-list {
    list-style-type: none;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap
  }
}
</style>
