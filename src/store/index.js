import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    banksArr: [ // массив с банками
      {
        id: Date.now(), // уникальное id
        name: 'privat', // название банка
        percentYear: 11, // ежегодный процент
        maxAmount: 100000, // максимальная сумма кредита
        minPrepaidExpense: 20, // минимальная сумма авансового платежа
        creditLines: 1, // строк на который возможно взять кредит
        confirmEddit: false // активность режима редактирования банка
      }
    ],
    isActive: false, // активность меню добавление банка
    newObj: { // объект, который собираем для редактирования или добавления банка
      name: null,
      percentYear: null,
      maxAmount: null,
      minPrepaidExpense: null,
      creditLines: null
    },
    chackCalculator: { // объект для фильтрации главного массива и вывода необходимых банков на странице калькулятора
      loanAmount: null, // максимальная сумма кредита
      contributionAmount: null, // сумма минимального взноса
      bankName: null // название банка
    },
    calculatorArr: [] // массив выводимый на странице калькулятора
  },
  getters: {
    banksArr (state) {
      return state.banksArr
    },
    isActive (state) {
      return state.isActive
    },
    newObj (state) {
      return state.newObj
    },
    calculatorArr (state) {
      return state.calculatorArr
    }
  },
  mutations: {
    changeActiveAdd (state) { // активируем/деактивируем меню добавления банка
      state.isActive = !state.isActive
    },
    createNewBank (state, obj) { // собрав объект нового банка, пушим его в главный массив
      state.banksArr.push(obj)
    },
    delBank (state, id) { // удаляем банк из главного массива
      const objIdx = state.banksArr.findIndex(el => el.id === id)
      state.banksArr.splice(objIdx, 1)
    },
    clearProp (state) { // очистка собираемого объекта
      for (const key in state.newObj) {
        state.newObj[key] = null
      }
    },
    edditActBank (state, id) { // переводим нужный банк в режим редактирования
      const obj = state.banksArr.find(el => el.id === id)
      obj.confirmEddit = !obj.confirmEddit
    },
    changePropBank (state, id) { // сохраняем изменения, после режима редактирования банка
      const obj = state.banksArr.find(el => el.id === id)
      const objIdx = state.banksArr.findIndex(el => el.id === id)
      for (const key in state.newObj) {
        if (state.newObj[key] !== null) {
          obj[key] = state.newObj[key]
        }
      }
      const cloneObj = Object.assign(obj)
      state.banksArr.splice(objIdx, 1, cloneObj)
    },
    calcMenu (state, v) { // на основе собираемого объекта chackCalculator фильтруем отображаемый массив на странице калькулятора
      for (const key in state.chackCalculator) {
        if (key.toString() === v[0]) { // определяем какое из полей заполненно
          state.chackCalculator[key] = v[1] // записываем значение в объект, относительно которого фильтруем
          const valuesArr = Object.values(state.chackCalculator)
          const valueFilterArr = valuesArr.filter(el => el === null) // определяем сколько полей заполненно на странице калькулятора
          if (valueFilterArr.length === 2) { // если заполненно только одно поле
            let arr = []
            if (state.chackCalculator.bankName === null && state.chackCalculator.contributionAmount === null) { // если изменяется первоначальная сумма заёма
              arr = state.banksArr.filter(el => el.maxAmount >= v[1])
            } else if (state.chackCalculator.loanAmount === null && state.chackCalculator.contributionAmount === null) { // если изменяется название банка
              arr = state.banksArr.filter(el => el.name === v[1])
            }
            // else if (state.chackCalculator.loanAmount === null && state.chackCalculator.bankName === null) { // если изменяется сумма первоначального взноса
            //   arr = state.banksArr.filter(el => el.minPrepaidExpense * el.maxAmount / 100 >= v[1])
            // }

            if (state.calculatorArr.length > 0) { // если в отображаемом массиве уже есть что-то, то заменяем данные, так как изменились данные относительно которых фильруется главный массив
              state.calculatorArr.splice(0, state.calculatorArr.length, ...arr)
            } else { // если отображаемый массив пуст, то просто заполняем его отфильтрованными данными
              state.calculatorArr = arr.concat()
            }
          } else { // если в меню заполненно больше чем 1 поле
            let arr = []
            if (v[0] === 'loanAmount') { // если вводится сумма заёма
              if (state.chackCalculator.contributionAmount !== null) { // но уже введена сумма первоначального взноса
                arr = state.banksArr.filter(el => (state.chackCalculator.contributionAmount * 100 / el.minPrepaidExpense) >= v[1])
                if (state.chackCalculator.bankName !== null) { // плюс если известно название банка
                  const newArr = arr.filter(el => el.name === state.chackCalculator.bankName)
                  arr.splice(0, arr.length, ...newArr)
                }
              } else { // если не известна сумма первоначального заёма
                arr = state.banksArr.filter(el => el.maxAmount >= v[1])
                if (state.chackCalculator.bankName !== null) { // но известно название банка
                  const newArr = arr.filter(el => el.name === state.chackCalculator.bankName)
                  arr.splice(0, arr.length, ...newArr)
                }
              }
            } else if (v[0] === 'bankName') { // если вводится название банка
              arr = state.banksArr.filter(el => el.name === v[1])
              if (state.chackCalculator.loanAmount !== null) { // и при этом известна сумма заёма
                let newArr = []
                newArr = arr.filter(el => el.maxAmount >= state.chackCalculator.loanAmount)
                if (state.chackCalculator.contributionAmount !== null) { // если при этом известна сумма первоначального вздноса
                  const arr = newArr.filter(el => (state.chackCalculator.loanAmount * el.minPrepaidExpense / 100) >= state.chackCalculator.contributionAmount)
                  newArr.splice(0, newArr.length, ...arr)
                }
                arr.splice(0, arr.length, ...newArr)
              }
            } else if (v[0] === 'contributionAmount') { // если вводится сумма первоначального взноса
              if (state.chackCalculator.loanAmount !== null) { // и при этом известна сумма заёма
                arr = state.banksArr.filter(el => (el.minPrepaidExpense * state.chackCalculator.loanAmount / 100) >= v[1])
                if (state.chackCalculator.bankName !== null) { // если еще известно название банка
                  const newArr = arr.filter(el => el.name === state.chackCalculator.bankName)
                  arr.splice(0, arr.length, ...newArr)
                }
              }
            }
            state.calculatorArr.splice(0, state.calculatorArr.length, ...arr)
          }
        }
      }
    },
    clearChackCalculator (state) { // очистка объекта ChackCalculator
      for (const key in state.chackCalculator) {
        state.chackCalculator[key] = null
      }
    },
    saveBanksArr (state) { // сохраняем в локальное хранилище состояние главного массива
      const parsed = JSON.stringify(state.banksArr)
      localStorage.setItem('banksArr', parsed)
    },
    parseBanksArr (state) { // парсим локальное хранилище главного массива
      if (localStorage.getItem('banksArr')) {
        try {
          state.banksArr = JSON.parse(localStorage.getItem('banksArr'))
        } catch (e) {
          localStorage.removeItem('banksArr')
        }
      }
    }
  },
  actions: {
    changeActiveAdd (ctx) {
      ctx.commit('changeActiveAdd')
    },
    createNewBank (ctx, obj) {
      ctx.commit('createNewBank', obj)
      ctx.commit('clearProp')
      ctx.commit('saveBanksArr')
    },
    delBank (ctx, id) {
      ctx.commit('delBank', id)
      ctx.commit('saveBanksArr')
    },
    edditActBank (ctx, id) {
      ctx.commit('edditActBank', id)
    },
    changePropBank (ctx, id) {
      ctx.commit('changePropBank', id)
      ctx.commit('edditActBank', id)
      ctx.commit('clearProp')
      ctx.commit('saveBanksArr')
    },
    calcMenu (ctx, v) {
      ctx.commit('calcMenu', v)
    },
    clearChackCalculator (ctx) {
      ctx.commit('clearChackCalculator')
    },
    saveBanksArr (ctx) {
      ctx.commit('saveBanksArr')
    },
    parseBanksArr (ctx) {
      ctx.commit('parseBanksArr')
    }
  }
})
