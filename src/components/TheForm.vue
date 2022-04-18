<template>
  <form class="form">
    <div>
      <label for="loan">Введите сумму первоначального заёма:</label>
      <input type="text" name="loan" v-model="loanAmount">
    </div>
    <div>
      <label for="contribution">Введите сумму первоначального взноса:</label>
      <input type="text" name="contribution" v-model="contributionAmount">
    </div>
    <div>
      <label for="nameBank">Выберите название банка из раскрывающегося списка:</label>
      <select name="nameBank" id="nameBank" v-model="bankName">
        <option disabled selected>Выберите пункт</option>
        <option
          v-for="bank in banksArr"
          :key="bank.id"
          :value="bank.name"
        >
          {{ bank.name }}
        </option>
      </select>
    </div>
    <!-- <button class="btn form-btn">Найти</button> -->
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TheForm',
  data () {
    return {
      loanAmount: null,
      contributionAmount: null,
      bankName: null
    }
  },
  mounted () {
    this.parseBanksArr()
  },
  watch: {
    loanAmount () {
      this.calcMenu(['loanAmount', +this.loanAmount])
    },
    contributionAmount () {
      this.calcMenu(['contributionAmount', +this.contributionAmount])
    },
    bankName () {
      this.calcMenu(['bankName', this.bankName])
    }
  },
  computed: {
    ...mapGetters(['banksArr', 'calculatorArr'])
  },
  methods: {
    ...mapActions(['calcMenu', 'parseBanksArr'])
  }
}
</script>

<style lang="scss">
.form {
  background: #006400;
  color: #fff;
  padding: 10px;
  border-radius: 10px;

  &-btn {
    background: black;
  }
}
</style>
