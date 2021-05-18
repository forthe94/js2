const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

const makeGETRequest = url => {
    return new Promise((resolve, reject) => {
	let xhr;

        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) { 
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            resolve(xhr.responseText);
          }
        }
        
        xhr.open('GET', url, true);
        xhr.send();
    })
  
}


class GoodsItem {
  constructor(product_name, price) {
    this.product_name = product_name;
    this.price = price;
  }

  render() {
    return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }

  fetchGoods(cb) {
    makeGETRequest(`${API_URL}/catalogData.json`).then ( (goods) => {
      this.goods = JSON.parse(goods);
      cb();
    })
  }

  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.product_name, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }

  getTotalSum() {
    const totalSum = this.goods.reduce((acc, item) => {
      if (!item.price) return acc;
      return acc + item.price;
    }, 0);
    console.log(totalSum);
  }
}

const list = new GoodsList();


list.fetchGoods(() => {
  list.render();
});

const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
  ];

  const renderGoodsItem = (title, price) => `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;

  const renderGoodsList = (list = goods) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    goodsList = goodsList.join('')
    document.querySelector('.goods-list').innerHTML = goodsList;
  }

  clearAll() {}

  addItem() {}

  removeItem() {}
}

class BasketItem extends GoodsItem {
  constructor(...args) {
    super(...args);
    this.count = 0;
  }

  addOne() {}

  removeOne() {}
}
