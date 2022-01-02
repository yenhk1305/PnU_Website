var shoppingCart = (function() {
  // Private methods and propeties
  cart = [];
  datashoppingfinal = [];
  
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

// Events
// Add item to cart
function addtocart(x){
  var boxsp = x.parentElement.parentElement.children;
  var hinh = boxsp[0].children[0].src;
  var gia = parseFloat(boxsp[2].children[0].innerHTML.replace(" đ","").replace(",",""));
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
                          '<span class="price">'+ Intl.NumberFormat().format(giohang[i].price) +' đ</span>'+
                      '</span>'+
                  '</div>'+
  
                  '<div class="tbody-quantity">'+
                      '<div class="product-quantity">'+
                          '<input value="-" class="btn-minus" onclick="minusItem(this)" type="button"/>'+
                          '<input type="text" onchange="changeQtyItem(this)" id="quantity" maxlength="3" min="0" value="'+ giohang[i].count +'" size="4" class="number-sidebar" />'+
                          '<input value="+" class="btn-minus" onclick="plusItem(this)" type="button"/>'+
                      '</div>'+
                  '</div>'+
  
                  '<div class="tbody-total">'+
                      '<span class="product-price-total">'+
                          '<span class="price">'+ Intl.NumberFormat().format(tt) +' đ</span>'+
                      '</span>'+
                  '</div>'+
                                      
                  '<div class="mobile-tbody-name-price">'+
                      '<h3 class="product-name"><a title="" href="#">'+ giohang[i].name +'</a></h3>'+
                      '<span class="product-price">'+
                          '<span class="price">'+ Intl.NumberFormat().format(giohang[i].price) +' đ</span>'+
                      '</span>'+
                  '</div>'+
                  '<div class="mobile-tbody-quantity-delete">'+
                      '<div class="product-quantity">'+
                          '<input class="btn-minus" onclick="minusItemMobile(this)" value="-" type="button"/>'+
                          '<input type="text" onchange="changeQtyItemMobile(this)" id="quantity" maxlength="3" min="1" value="'+ giohang[i].count +'" size="4" class="number-sidebar" />'+
                          '<input class="btn-plus" onclick="plusItemMobile(this)"  value="+" type="button"/>'+
                      '</div>'+
                      '<a class="btn-remove-item-cart" onclick="deleteItemMobile(this)" title="Xóa sản phẩm" href="#">'+
                          'Xóa'+
                      '</a>' +
                  '</div>'+
              '</div>'
          document.getElementById("cart-tbody").innerHTML = ttgh;
          document.getElementById("totalcart").innerHTML = Intl.NumberFormat().format(shoppingCart.totalCart()) + " đ";
          document.getElementById("totalcount").innerHTML = "(" + shoppingCart.totalCount() + " sản phẩm)";
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
  if (giohang == null || giohang.length == 0){
    ttgh = '<span class="mycartEmpty">Không có sản phẩm trong giỏ hàng</span>'
  }
  else {
    var tong = 0;
  for (i = 0; i < giohang.length; i++ ){
    var tt = parseFloat(giohang[i].price*giohang[i].count);
    tong += tt;
    ttgh += '<tr>'+
      '<td rowspan="2" class="mycartImage">'+
          '<img src="'+giohang[i].thumb+'">'+
      '</td>'+
      '<td class="mycartName">'+giohang[i].name+'</td>'+
      '<td class="mycartQty">'+giohang[i].count+'</td>'+
      '</tr>'+
      '<tr>'+
        '<td colspan="2" class="mycartPrice">'+ Intl.NumberFormat().format(giohang[i].price) + " đ" +'</td>'+
      '</tr>'
    }
    ttgh+='<tr>'+
        '<td colspan="2" class="mycartTotalLabel">Thành tiền:</td>'+
       '<td class="mycartTotal">'+Intl.NumberFormat().format(tong) + " đ"+'</td>'+
     '</tr>'
  }
  document.getElementById("mycart").innerHTML = ttgh;
}

//Total Items in cart
function showTotalCount(){
  document.getElementById("countsp").innerHTML = shoppingCart.totalCount();
}

//--------sự kiện cho màn hình lớn-------------

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

//--------sự kiện cho màn hình di động-------------

// Delete Item in cart
function deleteItemMobile(x){
  var boxsp = x.parentElement.parentElement.children;
  var name = boxsp[5].children[0].children[0].innerHTML;
  shoppingCart.removeItemFromCartAll(name);
  if (cart == null || cart == 0){
      document.getElementById("countsp").innerHTML = 0;
      document.getElementById("totalcount").innerHTML = "(0 sản phẩm)";
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
      document.getElementById("totalcount").innerHTML = "(0 sản phẩm)";
  }
  displayCart();
}

// Change quantity by Input
function changeQtyItemMobile(x){
  var boxsp = x.parentElement.parentElement.parentElement.children;
  var name = boxsp[5].children[0].children[0].innerHTML;
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
    '<span class="product-price">'+ Intl.NumberFormat().format(giohang[i].price) +' đ</span>'+
    '<span class="product-quantity">Số lượng: '+ giohang[i].count +'</span>'+
  '</li>'   
  document.getElementById("product-list").innerHTML = ttgh;
  document.getElementById("totalcount2").innerHTML = "(" + shoppingCart.totalCount() + " sản phẩm)";
  document.getElementById("tamtinh").innerHTML = Intl.NumberFormat().format(shoppingCart.totalCart()) + " đ";
  var phishiptext = document.getElementById("phiship");
  var phiship;
  if (shoppingCart.totalCart() >= 500000){
    phishiptext.innerHTML = "0 đ";
    phiship = 0;
  }
  else {
    phishiptext.innerHTML = "35,000 đ";
    phiship = 35000;
  }
  var giamgiatext = document.getElementById("giamgia");
  var giamgia = shoppingCart.totalCart() * (30/100);
  if (giamgia >= 50000){
    giamgiatext.innerHTML = "- 50,000 đ";
    giamgia = 50000;
  }
  else {
    giamgiatext.innerHTML = "- " + giamgia + " đ";
    giamgia = giamgia;
  }

  document.getElementById("tongcong").innerHTML = Intl.NumberFormat().format(shoppingCart.totalCart() + phiship - giamgia) + " đ";
}  
}

function dathang(){
  if (localStorage.getItem("lstdathangfinal") != null) {
    datashoppingfinal = JSON.parse(localStorage.getItem('lstdathangfinal'));
  }
  if (edtHoten.value == "" || edtSdt.value == "" ||
  edtDiachi.value == "" || cboTinhthanh.value == "" 
  || cboQuanhuyen.value == "" || cboPhuongxa.value == "") {
  alert("Vui lòng nhập đầy đủ thông tin bạn nhé!")
} else {
  var datainfo = []
  datainfo.push(edtHoten.value)
  datainfo.push(edtSdt.value)
  datainfo.push(edtDiachi.value + ", " + cboPhuongxa.value + ", " + cboQuanhuyen.value + ", " + cboTinhthanh.value)
  // datainfo.push(cboTinhthanh.value)
  // datainfo.push(cboQuanhuyen.value)
  // datainfo.push(cboPhuongxa.value)
  if (document.getElementById("rdCOD").checked == true)
    datainfo.push(rdCOD.value);
  else if (document.getElementById("rdATM").checked == true)
    datainfo.push(rdATM.value);
  else if (document.getElementById("rdMOMO").checked == true)
    datainfo.push(rdMOMO.value);
  datainfo.push(document.getElementById("tongcong").innerHTML)
  datashoppingfinal.push(datainfo)
  
  localStorage.setItem('lstdathangfinal', JSON.stringify(datashoppingfinal))
  alert('Đặt hàng thành công')
  shoppingCart.clearCart();
  window.location.href = "./index.html";
}
}