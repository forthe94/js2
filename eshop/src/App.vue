<template>
  <div id="app">
    <header>
      <input v-model="searhLine" type="text" class="goods-search" />
      <button class="search-button" type="button" @click="filterGoods">Искать</button>
      <button class="cart-button" type="button" @click="toggleCartStatus">Корзина</button>
    </header>
    <main>
      <GoodsList :goods="filteredGoods" />
      <br />
      <div v-show="isVisibleCart" class="cart">
        Корзина:
        <div class="cart-list"></div>
      </div>
    </main>
  </div>
</template>

<script>
// 1. Вынести весь хэдер в компонент
// 2. Вынести корзину в компонент
import GoodsList from './components/GoodsList';
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
export default {
  components: {
    GoodsList,
  },
  data: () => ({
    goods: [],
    filteredGoods: [],
    searhLine: '',
    isVisibleCart: false,
  }),
  mounted() {
    this.makeGETRequest(`${API_URL}/catalogData.json`)
  },
  methods: {
    makeGETRequest(url) {
      fetch(url)
        .then((data) => data.json())
        .then((data) => {
          this.goods = data;
          this.filteredGoods = data;
        }) 
    },
    filterGoods() {
      const regexp = new RegExp(this.searhLine, 'i');
      this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
    },
    toggleCartStatus() {
      this.isVisibleCart = !this.isVisibleCart;
    }
  },
  watch: {
    searhLine() {
      this.filterGoods();
    }
  }
}
</script>

<style>
*{
  outline: unset;
}
body {
  margin: unset;
}
header {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 5px 8px 0px rgba(34, 60, 80, 0.2);
}
main {
  padding: 20px 5%;
}
.cart-button {
  font-size: 16px;
  padding: 10px 20px;
  border: unset;
  border-radius: 10px;
  background-color: white;
  transition: .3s;
  box-shadow: 0px 0px 8px 2px rgba(34, 60, 80, 0.2);
  cursor: pointer;
}
.cart-button:hover {
  color: white;
  background-color: black;
}
.cart-list {
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
.goods-search,
.search-button {
  height: 100%;
}
.goods-item-image-container {
  width: 100%;
  height: 200px;
}
.cart {
  box-shadow: 0px 0px 8px 2px rgba(34, 60, 80, 0.2);
  padding: 20px;
  width: 800px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  overflow: auto;
}
</style>