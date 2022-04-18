<template>
  <form class="add"
    @submit.prevent="chackAddBank"
  >
    <p class="add-item">
      <label for="nameBank">Введите название банка: </label>
      <input name="nameBank" type="text" v-model="newObj.name">
    </p>
    <p class="add-item">
      <label for="percentBank">Укажите процентную ставку: </label>
      <input name="percentBank" type="number" v-model="newObj.percentYear">
    </p>
    <p class="add-item">
      <label for="maxAmountBank">Введите максимальную сумму кредита: </label>
      <input name="maxAmountBank" type="number" v-model="newObj.maxAmount">
    </p>
    <p class="add-item">
      <label for="minPrepaidBank">Минимальный процент авансового платежа: </label>
      <input name="minPrepaidBank" type="number" v-model="newObj.minPrepaidExpense">
    </p>
    <p class="add-item">
      <label for="creditLinesBank">Строк на который можно взять кредит: </label>
      <input name="creditLinesBank" type="number" v-model="newObj.creditLines">
    </p>
    <div class="add-btn">
      <button class="add-btn__save btn">
        Сохранить
      </button>
      <button class="add-btn__cancel btn"
        @click="changeActiveAdd"
      >
        Отмена
      </button>
      <p v-if="errors.length" class="add-error">
        <b>Пожалуйста исправьте указанные ошибки:</b>
        <ul>
          <li v-for="(error, idx) in errors" :key="idx">{{ error }}</li>
        </ul>
      </p>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AddBank',
  data () {
    return {
      errors: []
    }
  },
  computed: {
    ...mapGetters(['newObj'])
  },
  methods: {
    ...mapActions(['changeActiveAdd', 'createNewBank']),
    chackAddBank () {
      if (this.newObj.name && this.newObj.percentYear && this.newObj.maxAmount && this.newObj.minPrepaidExpense && this.newObj.creditLines) {
        this.addBank()
      }

      this.errors = []

      if (!this.newObj.name) {
        this.errors.push('Укажите название бака')
      }
      if (!this.newObj.percentYear) {
        this.errors.push('Укажите ежегодную процентную ставку')
      }
      if (!this.newObj.maxAmount) {
        this.errors.push('Укажите максимальную сумму кредита')
      }
      if (!this.newObj.minPrepaidExpense) {
        this.errors.push('Укажите минимальный авансовый платёж')
      }
      if (!this.newObj.creditLines) {
        this.errors.push('Укажите строк на который выдаете кредит')
      }
    },
    addBank () {
      this.createNewBank({
        id: Date.now(),
        name: this.newObj.name,
        percentYear: this.newObj.percentYear,
        maxAmount: +this.newObj.maxAmount,
        minPrepaidExpense: this.newObj.minPrepaidExpense,
        creditLines: this.newObj.creditLines,
        confirmEddit: false
      })
      this.changeActiveAdd()
    }
  }
}
</script>

<style lang="scss">
.add {
  display: flex;
  justify-content: space-evenly;
  flex-wrap:wrap;
  padding: 15px 0;
  margin: 0 10px 5px 10px;
  background: grey;
  border-radius: 10px;

  &-btn {
    &__save {
      background: green;
    }
    &__cancel {
      background: black;
    }
  }

  &-item {
    padding: 5px 0;
  }

  &-error {
    color: red
  }
}
</style>
