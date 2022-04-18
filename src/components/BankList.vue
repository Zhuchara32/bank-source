<template>
  <li class="list">
    <p class="list-el">Название банка:
      <span
        class="list-el__decoration"
        v-if="!confirmEddit"
      >
        {{ name }}
      </span>
      <input
        type="text"
        v-model="newObj.name"
        v-else
      >
    </p>
    <p class="list-el">Процентная ставка:
      <span v-if="!confirmEddit">
        {{ percentYear + '%' }}
      </span>
      <input
        type="text"
        v-model="newObj.percentYear"
        v-else
      >
    </p>
    <p class="list-el">Максимальный кредит:
      <span v-if="!confirmEddit">
        {{ maxAmount + 'грн'}}
      </span>
      <input
        type="text"
        v-model="newObj.maxAmount"
        v-else
      >
    </p>
    <p class="list-el">Минимальный авансовый платёж:
      <span
        v-if="!confirmEddit"
      >
        {{ minPrepaidExpense * maxAmount / 100 + 'грн'}}
      </span>
      <input
        type="text"
        v-model="newObj.minPrepaidExpense"
        v-else
      >
    </p>
    <p class="list-el">Строк кредита:
      <span v-if="!confirmEddit">
        {{ creditLines + 'год(а)' }}
      </span>
      <input
        type="text"
        v-model="newObj.creditLines"
        v-else
      >
    </p>
    <div v-if="!confirmEddit">
      <button
        class="btn list-btn__eddit"
        @click="edditActBank(id)"
      >
        Редактировать
      </button>
      <button class="btn list-btn__delete"
        @click="delBank(id)"
      >
        Удалить
      </button>
    </div>
    <div v-else>
      <button
        class="btn list-btn__save"
        @click="changePropBank(id)"
      >
        Сохранить
      </button>
      <button
        class="btn list-btn__cancel"
        @click="edditActBank(id)"
      >
        Отмена
      </button>
    </div>
  </li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'BankList',
  props: [
    'id',
    'name',
    'percentYear',
    'maxAmount',
    'minPrepaidExpense',
    'creditLines',
    'confirmEddit'
  ],
  computed: {
    ...mapGetters(['newObj'])
  },
  methods: {
    ...mapActions(['delBank', 'edditActBank', 'changePropBank'])
  }
}
</script>

<style lang="scss">
.list {
  border: 1px solid #000;
  border-radius: 10px;
  padding: 6px;
  width: fit-content;
  list-style-type: none;
  margin: 0 0 10px 0;

  &-el {
    &__decoration {
      text-transform: capitalize;
      color: green
    }
  }

  &-btn {
    &__eddit {
      background: brown;
    }

    &__delete {
      background: red;
    }
    &__save {
      background: green;
    }
    &__cancel {
      background: #000;
    }
  }
}
</style>
