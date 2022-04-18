<template>
  <li class="result">
    <p class="result-item">Название банка:
      <span class="result-item__up">
        {{ name }}
      </span>
    </p>
    <p class="result-item">Процентная ставка:
      <span>
        {{ percentYear + '%' }}
      </span>
    </p>
    <p class="result-item">Максимальный кредит:
      <span>
        {{ maxAmount + 'грн'}}
      </span>
    </p>
    <p class="result-item">Минимальный авансовый платёж:
      <span>
        {{ minPrepaidExpense * maxAmount / 100 + 'грн'}}
      </span>
    </p>
    <p class="result-item">Строк кредита:
      <span>
        {{ creditLines + 'год(а)' }}
      </span>
    </p>
  </li>
</template>

<script>
export default {
  name: 'ResultForm',
  props: [
    'id',
    'name',
    'percentYear',
    'maxAmount',
    'minPrepaidExpense',
    'creditLines'
  ]
}
</script>

<style lang="scss">
.result {
  border: 1px solid #000;
  border-radius: 5px;
  padding: 5px;
  margin: 10px;
  width: fit-content;

  &-item {
    &__up {
      text-transform: uppercase;
      color: green;
    }
  }
}
</style>
