
var data = [], xmlObject,xmlDoc;

if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
xmlhttp = new XMLHttpRequest();
}
else {// code for IE6, IE5
xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        xmlDoc = xmlhttp.responseXML;
    }
};
xmlhttp.open("GET","../data/product.xml" , true);
xmlhttp.send();



// số sản phẩm trên một trang
var  slsp=20;
var  name,price, srcImg,id;
var nameArray, priceArray, imgArray,linkArray;
var btnCart=document.getElementsByClassName("product-item__add-cart");

nameArray = document.getElementsByClassName("product-item__name");
priceArray = document.getElementsByClassName("product-item__price-current");
imgArray = document.getElementsByClassName("product-item__img");
linkArray = document.getElementsByClassName("product-item");


function loadingProductOnPage(numberPage) {

var n=numberPage;
 
var lstproduct = xmlDoc.getElementsByTagName('PnU')[0].getElementsByTagName("product");

   // Sắp xếp mảng để thể hiện ngẫu nhiên
var   lstproductShuffled = Array.prototype.slice.call(lstproduct).sort( function () {
    return 0;
} );

var index_h;
//vi tri trong page html

for (i = 0+20*n; i < 20*(n+1); i++) {
    product =   lstproductShuffled[i];
    name= product.getElementsByTagName("name")[0].childNodes[0].nodeValue;
    price =product.getElementsByTagName("price")[0].childNodes[0].nodeValue;
    srcImg =product.getElementsByTagName("image")[0].childNodes[0].nodeValue;
    id= product.getElementsByTagName("id")[0].childNodes[0].nodeValue;
    index_h=i-slsp*n;

    linkArray[index_h].href="./product_detail.html"
    linkArray[index_h].id=id;
    linkArray[index_h].setAttribute("onclick","getID(this.id)");

    nameArray [index_h].innerText = name;                   
    priceArray [index_h].innerText = Intl.NumberFormat().format(price) + " đ";      
    imgArray [index_h].src = srcImg;   

}

}
function getID(id){
if (typeof(Storage) !== "undefined") {
    // Lưu trữ
    localStorage.idP = id;
}
}



function loadingProductPage1() {
loadingProductOnPage(0);
}

function loadingProductPage2() {
loadingProductOnPage(1);
}

