<template>
  <div class="home">
    <router-link to="/calculator">
      Перейти на страницу калькулятора
    </router-link>
    <button class="home-btn btn"
      @click="changeActiveAdd"
    >
      Создать банк
    </button>
    <AddBank
      v-if="isActive"
    />
    <ul class="home-list">
      <BankList
        v-for="bank in banksArr"
        :key="bank.id"
        :id="bank.id"
        :name="bank.name"
        :percentYear="bank.percentYear"
        :maxAmount="bank.maxAmount"
        :minPrepaidExpense="bank.minPrepaidExpense"
        :creditLines="bank.creditLines"
        :confirmEddit="bank.confirmEddit"
      />
    </ul>
  </div>
</template>

<script>
import BankList from '../components/BankList.vue'
import AddBank from '../components/AddBank.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TheHome',
  components: {
    BankList,
    AddBank
  },
  mounted () {
    this.parseBanksArr()
  },
  computed: {
    ...mapGetters(['banksArr', 'isActive'])
  },
  methods: {
    ...mapActions(['changeActiveAdd', 'parseBanksArr', 'saveBanksArr'])
  }
}
</script>

<style lang="scss">
.home {
  &-btn {
    background: green;
    display: block;
  }
  &-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin: 0 10px;
  }
}
.btn {
    padding: 5px 10px;
    margin: 10px;
    border: none;
    border-radius: 5px;
    color: #fff;

    &:hover {
      cursor: pointer;
    }
  }
</style>
