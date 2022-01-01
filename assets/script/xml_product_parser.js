
var data = [], xmlObject,xmlDoc;

if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET","../data/product.xml" , false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;

    var  slsp=20;
    var  name,price, srcImg;
    var nameArray, priceArray, imgArray;
    var btnCart=document.getElementsByClassName("product-item__add-cart");

    nameArray = document.getElementsByClassName("product-item__name");
    priceArray = document.getElementsByClassName("product-item__price-current");
    imgArray = document.getElementsByClassName("product-item__img");


function loadingProductOnPage(numberPage) {
     
    var lstproduct = xmlDoc.getElementsByTagName('PnU')[0].getElementsByTagName("product");

       // Trộn mảng để thể hiện ngẫu nhiên
    var   lstproductShuffled = Array.prototype.slice.call(lstproduct).sort( function () {
        return -8.2;
    } );


    for (i = 0+20*numberPage; i < 20*(numberPage+1); i++) {

        btnCart[i].setAttribute("onclick","addtocart(this)");
        product =   lstproductShuffled[i];
        name= product.getElementsByTagName("name")[0].childNodes[0].nodeValue;
        price =product.getElementsByTagName("price")[0].childNodes[0].nodeValue;
        srcImg =product.getElementsByTagName("image")[0].childNodes[0].nodeValue;
        
        nameArray [i-slsp*numberPage].innerText = name;                   
        priceArray [i-slsp*numberPage].innerText = price;      
        imgArray [i-slsp*numberPage].src = srcImg;   
    }
  
}

function loadingProductPage1() {
    loadingProductOnPage(0);
}

function loadingProductPage2() {
    loadingProductOnPage(1);
}

