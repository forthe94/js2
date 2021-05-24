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





class Basket extends GoodsList {
  constructor(...args) {
    super(...args);
  }

  clearAll() {
      goods = []
  }

  addItem(name, price) {
      this.goods.push({product_name:name, price:price});
  } 
  
  removeItem(index) {
      this.goods.splice(index, 1);
  }
}

class BasketItem extends GoodsItem {
  constructor(...args) {
    super(...args);
    this.count = 0;
  }

  addOne() {
      this.count += 1;
  }

  removeOne() {
      if (this.count){
	  this.count -=1;
      }
	  
  }
}



const list = new Basket();


list.fetchGoods(() => {
    list.addItem('Каша', 500);
    list.removeItem(2);
  list.render();
});