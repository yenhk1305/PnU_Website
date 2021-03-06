var shoppingCart = (function() {
  // Private methods and properties
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

  // Public methods and properties

  // Create object
  var obj = {};
  
  // Add to cart
  obj.addItemToCart = function(thumb, name, price, count) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart[item].count = cart[item].count + count;
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

// Events

// Add item to cart
function addtocart(){
  var hinh = document.getElementById("mainImg").src;
  var tensp = document.getElementById("infoName").innerText;
  var gia = parseFloat(document.getElementById("infoPrice").innerText.replace(" ??","").replace(/[,.]/g,''));
  var soluong = parseInt(document.getElementById("select-quantity__edt").value);
  if (isNaN(soluong) || soluong == 0){
    alert("Vui l??ng nh???p s???")
  }
  else {
    shoppingCart.addItemToCart(hinh, tensp, gia, soluong);
    alert("B???n ???? th??m th??nh c??ng s???n ph???m: " + tensp + " v??o gi??? h??ng");
    showTotalCount()
  }
}

// Add item and checkout (th??m sp v?? mua ngay)
function addandcheckout(){
  var hinh = document.getElementById("mainImg").src;
  var tensp = document.getElementById("infoName").innerText;
  var gia = parseFloat(document.getElementById("infoPrice").innerText.replace(" ??","").replace(/[,.]/g,''));
  var soluong = parseInt(document.getElementById("select-quantity__edt").value);
  if (isNaN(soluong) || soluong == 0){
    alert("Vui l??ng nh???p s???")
  }
  else {
    shoppingCart.addItemToCart(hinh, tensp, gia, soluong);
    alert("B???n ???? th??m th??nh c??ng s???n ph???m: " + tensp + " v??o gi??? h??ng");
    showTotalCount()
    window.location.href = "./checkout.html";
  }
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
                      '<a class="btn-remove-item-cart" title="X??a s???n ph???m" onclick="deleteItem(this)">'+
                          '<i class="fas fa-trash-alt" style="color:black"></i> X??a s???n ph???m'+
                      '</a>'+
                  '</div>'+
                  '<div class="tbody-price">'+
                      '<span class="product-price">'+
                          '<span class="price">'+ Intl.NumberFormat().format(giohang[i].price) +' ??</span>'+
                      '</span>'+
                  '</div>'+
  
                  '<div class="tbody-quantity">'+
                      '<div class="product-quantity">'+
                          '<input value="-" class="btn-minus" onclick="minusItem(this)" type="button"/>'+
                          '<input type="text" onchange="changeQtyItem(this)" id="quantity" maxlength="3" min="1" value="'+ giohang[i].count +'" size="4" class="number-sidebar" />'+
                          '<input value="+" class="btn-minus" onclick="plusItem(this)" type="button"/>'+
                      '</div>'+
                  '</div>'+
  
                  '<div class="tbody-total">'+
                      '<span class="product-price-total">'+
                          '<span class="price">'+ Intl.NumberFormat().format(tt) +' ??</span>'+
                      '</span>'+
                  '</div>'+
                                      
                  '<div class="mobile-tbody-name-price">'+
                      '<h3 class="product-name"><a title="" href="#">'+ giohang[i].name +'</a></h3>'+
                      '<span class="product-price">'+
                          '<span class="price">'+ Intl.NumberFormat().format(giohang[i].price) +' ??</span>'+
                      '</span>'+
                  '</div>'+
                  '<div class="mobile-tbody-quantity-delete">'+
                      '<div class="product-quantity">'+
                          '<input class="btn-minus" onclick="minusItemMobile(this)" value="-" type="button"/>'+
                          '<input type="text" onchange="changeQtyItemMobile(this)" id="quantity" maxlength="3" min="1" value="'+ giohang[i].count +'" size="4" class="number-sidebar" />'+
                          '<input class="btn-plus" onclick="plusItemMobile(this)"  value="+" type="button"/>'+
                      '</div>'+
                      '<a class="btn-remove-item-cart" onclick="deleteItemMobile(this)" title="X??a s???n ph???m" href="#">'+
                          'X??a'+
                      '</a>' +
                  '</div>'+
              '</div>'
          document.getElementById("cart-tbody").innerHTML = ttgh;
          document.getElementById("totalcart").innerHTML = Intl.NumberFormat().format(shoppingCart.totalCart()) + " ??";
          document.getElementById("totalcount").innerHTML = "(" + shoppingCart.totalCount() + " s???n ph???m)";
          showTotalCount();
      } 
  }  
}

//Show cart nh??? tr??n header khi mouseover
function showCart(){
  if (window.innerWidth >= 1200) {
    document.getElementById("showcart").style.display ="block";
    displayInShowCart()
  }
}

//???n cart nh??? tr??n header khi mouseout
function hideCart(){
document.getElementById("showcart").style.display ="none";
}

//Hi???n ds s???n ph???m trong gi??? h??ng tr??n Header cart
function displayInShowCart(){
  var giohang = shoppingCart.listCart();
  var ttgh = "";
  if (giohang == null || giohang.length == 0){
    ttgh = '<span class="mycartEmpty">Kh??ng c?? s???n ph???m trong gi??? h??ng</span>'
  }
  else {
    var tong = 0;
    for (i = 0; i < giohang.length; i++ ){
      var tt = parseFloat(giohang[i].price*giohang[i].count);
      tong += tt;
      }
      ttgh+='<tr>'+
          '<td colspan="2" class="mycartTotalLabel">Th??nh ti???n:</td>'+
          '<td class="mycartTotal">'+Intl.NumberFormat().format(tong) + " ??"+'</td>'+
      '</tr>'
      for (i = 0; i < giohang.length; i++ ){
      ttgh += '<tr>'+
        '<td rowspan="2" class="mycartImage">'+
            '<img src="'+giohang[i].thumb+'">'+
        '</td>'+
        '<td class="mycartName">'+giohang[i].name+'</td>'+
        '<td class="mycartQty">'+giohang[i].count+'</td>'+
        '</tr>'+
        '<tr>'+
          '<td colspan="2" class="mycartPrice">'+ Intl.NumberFormat().format(giohang[i].price) + " ??" +'</td>'+
        '</tr>'
    }
  }
  document.getElementById("mycart").innerHTML = ttgh;
}

//Total Items in cart
function showTotalCount(){
  document.getElementById("countsp").innerHTML = shoppingCart.totalCount();
}

//--------s??? ki???n cho m??n h??nh l???n-------------

// Delete Item in cart
function deleteItem(x){
  var boxsp = x.parentElement.children;
  var name = boxsp[0].children[0].innerHTML;
  shoppingCart.removeItemFromCartAll(name);
  if (cart == null || cart == 0){
      document.getElementById("countsp").innerHTML = 0;
      document.getElementById("totalcount").innerHTML = "(0 s???n ph???m)";
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
      document.getElementById("totalcount").innerHTML = "(0 s???n ph???m)";
  }
  displayCart();
}

// Change quantity by Input
function changeQtyItem(x){
  var boxsp = x.parentElement.parentElement.parentElement.children;
  var name = boxsp[1].children[0].children[0].innerHTML;
  var count = parseInt(x.value);
  if (isNaN(count)){
    alert("Vui l??ng nh???p s???");
  } 
  else {
    if (count == 0){
      shoppingCart.removeItemFromCartAll(name);
      document.getElementById("totalcount").innerHTML = "(" + shoppingCart.totalCount() + " s???n ph???m)";
      showTotalCount();
    }
    shoppingCart.setCountForItem(name,count);
    displayCart();
  }
}

//--------s??? ki???n cho m??n h??nh di ?????ng-------------

// Delete Item in cart
function deleteItemMobile(x){
  var boxsp = x.parentElement.parentElement.children;
  var name = boxsp[5].children[0].children[0].innerHTML;
  shoppingCart.removeItemFromCartAll(name);
  if (cart == null || cart == 0){
      document.getElementById("countsp").innerHTML = 0;
      document.getElementById("totalcount").innerHTML = "(0 s???n ph???m)";
  }
  displayCart();
}

// +1 Item 
function plusItemMobile(x) {
  var boxsp = x.parentElement.parentElement.parentElement.children;
  var name = boxsp[5].children[0].children[0].innerHTML;
  shoppingCart.increaseItemFromCart(name);
  displayCart();
}

// -1 Item
function minusItemMobile(x) {
  var boxsp = x.parentElement.parentElement.parentElement.children;
  var name = boxsp[5].children[0].children[0].innerHTML;
  shoppingCart.removeItemFromCart(name);
  if (cart == null || cart == 0){
      document.getElementById("countsp").innerHTML = 0;
      document.getElementById("totalcount").innerHTML = "(0 s???n ph???m)";
  }
  displayCart();
}

// Change quantity by Input
function changeQtyItemMobile(x){
  var boxsp = x.parentElement.parentElement.parentElement.children;
  var name = boxsp[5].children[0].children[0].innerHTML;
  var count = parseInt(x.value);
  if (isNaN(count)){
    alert("Vui l??ng nh???p s???");
  } 
  else {
    if (count == 0){
      shoppingCart.removeItemFromCartAll(name);
      document.getElementById("totalcount").innerHTML = "(" + shoppingCart.totalCount() + " s???n ph???m)";
      showTotalCount();
    }
    shoppingCart.setCountForItem(name,count);
    displayCart();
  }
}
showTotalCount()