var shoppingCart = (function() {
  // =============================
  // Private methods and propeties
  // =============================
  cart = [];
  
  // Constructor
  function Item(thumb, name, price, count) {
    this.thumb = thumb;
    this.name = name;
    this.price = price;
    this.count = count;
  }
  
  // Save cart
  function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  }
  
    // Load cart
  function loadCart() {
    cart = JSON.parse(localStorage.getItem('shoppingCart'));
  }
  if (localStorage.getItem("shoppingCart") != null) {
    loadCart();
  }
  

  // =============================
  // Public methods and propeties
  // =============================
  // Create object
  var obj = {};
  
  // Add to cart
  obj.addItemToCart = function(thumb, name, price, count) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart[item].count ++;
        saveCart();
        return;
      }
    }
    var item = new Item(thumb, name, price, count);
    cart.push(item);
    saveCart();
  }
  // Set count from item
  obj.setCountForItem = function(name, count) {
    for(var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        saveCart();
        break;
      }
    }
  };
  
  obj.increaseItemFromCart = function(name, price, count) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count ++;
          saveCart();
          return;
        }
      }
      var item = new Item(name, price, count);
      cart.push(item);
      saveCart();
    }


  // Remove item from cart
  obj.removeItemFromCart = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count --;
          if(cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
    }
    saveCart();
  }

  // Remove all items from cart
  obj.removeItemFromCartAll = function(name) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  }

  // Clear cart
  obj.clearCart = function() {
    cart = [];
    saveCart();
  }

  // Count cart 
  obj.totalCount = function() {
    var totalCount = 0;
    for(var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }

  // Total cart
  obj.totalCart = function() {
    var totalCart = 0;
    for(var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  }

  // List cart
  obj.listCart = function() {
    var cartCopy = [];
    for(i in cart) {
      item = cart[i];
      itemCopy = {};
      for(p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }
  return obj;
})();
// *****************************************
// Events
// ***************************************** 

// Add item to cart
function addtocart(x){
  var boxsp = x.parentElement.parentElement.children;
  var hinh = boxsp[0].children[0].src;
  var gia = parseFloat(boxsp[2].children[0].innerHTML.replace(" đ","").replace(".",""));
  var tensp = boxsp[1].innerText;
  var soluong = 1;
  console.log(tensp)
  shoppingCart.addItemToCart(hinh, tensp, gia, soluong);
  alert("Bạn đã thêm thành công sản phẩm: " + tensp + " vào giỏ hàng");
  showTotalCount()
}

// Display list cart in cart screen
function displayCart(){
  var giohang = shoppingCart.listCart();
  if (giohang == null || giohang.length == 0){
      document.getElementById("cartpage").style.display ="none";
      document.getElementById("emptycart").style.display ="block";
  }
  else {
      document.getElementById("cartpage").style.display ="block";
      document.getElementById("emptycart").style.display ="none";
      var ttgh = "";
      var tong = 0;
      for (i = 0; i < giohang.length; i++ ){
          var tt = parseFloat(giohang[i].price*giohang[i].count);
          tong += tt;
          ttgh +=
              '<div class="item ">'+
                  '<div class="tbody-image">'+
                      '<a class="product-image" href="#" title="'+ giohang[i].name +'"><img width="80" height="80" alt="'+giohang[i].name+'" src="'+ giohang[i].thumb +'" /></a>'+
                  '</div>'+
                  '<div class="tbody-name">'+
                      '<h3 class="product-name"><a title="'+ giohang[i].name +'" href="#">'+ giohang[i].name +'</a></h3>'+
                      '<a class="btn-remove-item-cart" title="Xóa sản phẩm" onclick="deleteItem(this)">'+
                          '<i class="fas fa-trash-alt" style="color:black"></i> Xóa sản phẩm'+
                      '</a>'+
                  '</div>'+
                  '<div class="tbody-price">'+
                      '<span class="product-price">'+
                          '<span class="price">'+ giohang[i].price +' đ</span>'+
                      '</span>'+
                  '</div>'+
  
                  '<div class="tbody-quantity">'+
                      '<div class="product-quantity">'+
                          '<input value="-" class="btn-minus" onclick="minusItem(this)" type="button"/>'+
                          '<input type="text" onchange="changeQtyItem(this)" id="quantity" maxlength="2" min="0" value="'+ giohang[i].count +'" size="4" class="number-sidebar" />'+
                          '<input value="+" class="btn-minus" onclick="plusItem(this)" type="button"/>'+
                      '</div>'+
                  '</div>'+
  
                  '<div class="tbody-total">'+
                      '<span class="product-price-total">'+
                          '<span class="price">'+tt+' đ</span>'+
                      '</span>'+
                  '</div>'+
                                      
                  '<div class="mobile-tbody-name-price">'+
                      '<h3 class="product-name"><a title="" href="#">'+ giohang[i].name +'</a></h3>'+
                      '<span class="product-price">'+
                          '<span class="price">'+ giohang[i].price +' đ</span>'+
                      '</span>'+
                  '</div>'+
                  '<div class="mobile-tbody-quantity-delete">'+
                      '<div class="product-quantity">'+
                          '<button class="btn-minus" onclick="minusItemMobile(this)" type="button">-</button>'+
                          '<input type="text" id="quantity" maxlength="2" min="1" value="'+ giohang[i].count +'" size="4" class="number-sidebar" />'+
                          '<button class="btn-plus" onclick="plusItemMobile(this)" type="button">+</button>'+
                      '</div>'+
                      '<a class="btn-remove-item-cart" onclick="deleteItemMobile(this)" title="Xóa sản phẩm" href="#">'+
                          'Xóa'+
                      '</a>' +
                  '</div>'+
              '</div>'
          document.getElementById("cart-tbody").innerHTML = ttgh;
          document.getElementById("totalcart").innerHTML = shoppingCart.totalCart() + " đ";
          showTotalCount();
      } 
  }  
}

function showCart(){
document.getElementById("showcart").style.display ="block";
displayInShowCart()
}

function hideCart(){
document.getElementById("showcart").style.display ="none";
}

function displayInShowCart(){
var giohang = shoppingCart.listCart();
    var ttgh = "";
    var tong = 0;
    for (i = 0; i < giohang.length; i++ ){
        var tt = parseFloat(giohang[i].price*giohang[i].count);
        tong += tt;
        ttgh += '<tr>' +
        '<td>'+(i+1)+'</td>' +
        '<td><img src="'+giohang[i].thumb+'" /></td>' +
        '<td>'+giohang[i].name+'</td>' +
        '<td>'+giohang[i].price+'</td>' +
        '<td>'+giohang[i].count+'</td>' +
        '<td>'+tt+'</td>' +
    '</tr>'
        document.getElementById("mycart").innerHTML = ttgh;
    } 
}

//Total Items in cart
function showTotalCount(){
if (window.location.pathname == "/cart.html"){
  document.getElementById("countsp").innerHTML = shoppingCart.totalCount();
  document.getElementById("totalcount").innerHTML = "(" + shoppingCart.totalCount() + " sản phẩm)";
}
else if (window.location.pathname == "/checkout.html"){
  document.getElementById("totalcount2").innerHTML = "(" + shoppingCart.totalCount() + " sản phẩm)";
}
else {
  document.getElementById("countsp").innerHTML = shoppingCart.totalCount();
}
}

// Delete Item in cart
function deleteItem(x){
  var boxsp = x.parentElement.children;
  var name = boxsp[0].children[0].innerHTML;
  shoppingCart.removeItemFromCartAll(name);
  if (cart == null || cart == 0){
      document.getElementById("countsp").innerHTML = 0;
      document.getElementById("totalcount").innerHTML = "(0 sản phẩm)";
  }
  displayCart();
}

// +1 Item 
function plusItem(x) {
  var boxsp = x.parentElement.parentElement.parentElement.children;
  var name = boxsp[1].children[0].children[0].innerHTML;
  shoppingCart.increaseItemFromCart(name);
  displayCart();
}

// -1 Item
function minusItem(x) {
  var boxsp = x.parentElement.parentElement.parentElement.children;
  var name = boxsp[1].children[0].children[0].innerHTML;
  shoppingCart.removeItemFromCart(name);
  if (cart == null || cart == 0){
      document.getElementById("countsp").innerHTML = 0;
      document.getElementById("totalcount").innerHTML = "(0 sản phẩm)";
  }
  displayCart();
}

// Change quantity by Input
function changeQtyItem(x){
  var boxsp = x.parentElement.parentElement.parentElement.children;
  var name = boxsp[1].children[0].children[0].innerHTML;
  var count = parseInt(x.value);
  shoppingCart.setCountForItem(name,count);
  displayCart();
}

// Show list Item from cart in Checkout screen
function displayCheckout(){
var giohang = shoppingCart.listCart();
var ttgh = "";
var tong = 0;
for (i = 0; i < giohang.length; i++ ){
  var tt = parseFloat(giohang[i].price*giohang[i].count);
  tong += tt;
  ttgh += 
  '<li class="aside-group product-detail">'+
    '<span class="product-image"><img src="'+ giohang[i].thumb +'" /></span>'+
    '<span class="product-name">'+ giohang[i].name +'</span>'+
    '<span class="product-price">'+ giohang[i].price +' đ</span>'+
    '<span class="product-quantity">Số lượng: '+ giohang[i].count +'</span>'+
  '</li>'   
  document.getElementById("product-list").innerHTML = ttgh;
  document.getElementById("tamtinh").innerHTML = shoppingCart.totalCart() + " đ";
  var phiship = 35000;
  document.getElementById("tongcong").innerHTML = shoppingCart.totalCart() + phiship + " đ";
}  
}

function dathang(){
  if (edtHoten.value == "" || edtSdt.value == "" ||
  edtDiachi.value == "" || cboTinhthanh.value == "" 
  || cboQuanhuyen.value == "" || cboPhuongxa.value == "") {
  alert("Vui lòng nhập đầy đủ thông tin bạn nhé!")
} else {
  var datainfo = []
  datainfo.push(edtHoten.value)
  datainfo.push(edtSdt.value)
  datainfo.push(edtDiachi.value)
  datainfo.push(cboTinhthanh.value)
  datainfo.push(cboQuanhuyen.value)
  datainfo.push(cboPhuongxa.value)
  var datashoppingfinal = cart;
  datashoppingfinal.push(datainfo)
  
  localStorage.setItem('lstdathangfinal', JSON.stringify(datashoppingfinal))

  alert('Đặt hàng thành công')
  
  shoppingCart.clearCart();

  window.location.href = "./index.html";
}
}

showTotalCount()