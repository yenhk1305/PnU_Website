
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


var  name,price, srcImg,id,lstproduct;
var nameArray, priceArray, imgArray,linkArray,divProduct;
var btnCart=document.getElementsByClassName("product-item__add-cart");

nameArray = document.getElementsByClassName("product-item__name");
priceArray = document.getElementsByClassName("product-item__price-current");
imgArray = document.getElementsByClassName("product-item__img");
linkArray = document.getElementsByClassName("product-item");


var sp ='<div class="grid__column-2-4 ">'
            + '<a class="product-item" href="#">'
            +    '<div class="product-item__picture">'
            +    '<img src="" alt="" class="product-item__img">'
            +    '</div>'
            +    '<h5 class="product-item__name "></h5>'
            +    '<div class="product-item__price">'
            +        '<span class="product-item__price-current"></span>'
            +    '</div>'
            +    '<div class="product-item__action">'
            +    '<span class="product-item__add-cart">'
            +    '<i class="product-item__cart-icon fas fa-shopping-cart"></i>'
            +    '</span>'
            +    '<div class="product-item_rating">'
            +    '<span class="score-rating">4.1 </span>'
            +    '<i class="product-item__star--gold fas fa-star"></i>'
            +    '<i class="product-item__star--gold fas fa-star"></i>'
            +    '<i class="product-item__star--gold fas fa-star"></i>'
            +    '<i class="product-item__star--gold fas fa-star"></i>'
            +    '<i class="fas fa-star"></i>'
            +    '</div>'
            +    '</div>'
            + '</a>'
        +'</div>'
;
var phanloai ="";
function loadData (category) {
    var lstproduct = xmlDoc.getElementsByTagName(category )[0].getElementsByTagName("product");
    for (i=0;i<lstproduct.length; i++) {
        document.getElementById("divProduct").innerHTML+=sp; 
        product =   lstproduct[i];
        name= product.getElementsByTagName("name")[0].childNodes[0].nodeValue;
        price =product.getElementsByTagName("price")[0].childNodes[0].nodeValue;
        srcImg =product.getElementsByTagName("image")[0].childNodes[0].nodeValue;
        id= product.getElementsByTagName("id")[0].childNodes[0].nodeValue;
    
        linkArray[i].href="./product_detail.html"
        linkArray[i].id=id;
        linkArray[i].setAttribute("onclick","getID(this.id)");
    
        nameArray [i].innerText = name;                   
        priceArray [i].innerText = Intl.NumberFormat().format(price) + " đ";      
        imgArray [i].src = srcImg;   
    }
}
function loadDaTa2(lstmuc){

    for (j = 0; j < lstmuc.length; j++) {
        lstproduct = xmlDoc.getElementsByTagName(lstmuc[j])[0].getElementsByTagName("product");
        for (i = 0; i < lstproduct.length; i++) {
            var product = lstproduct[i]
            document.getElementById("divProduct").innerHTML+=sp; 
            name= product.getElementsByTagName("name")[0].childNodes[0].nodeValue;
            price =product.getElementsByTagName("price")[0].childNodes[0].nodeValue;
            srcImg =product.getElementsByTagName("image")[0].childNodes[0].nodeValue;
            id= product.getElementsByTagName("id")[0].childNodes[0].nodeValue;
        
            linkArray[i+j*lstproduct.length+10].href="./product_detail.html"
            linkArray[i+j*lstproduct.length+10].id=id;
            linkArray[i+j*lstproduct.length+10].setAttribute("onclick","getID(this.id)");
        
            nameArray [i+j*lstproduct.length+10].innerText = name;                   
            priceArray [i+j*lstproduct.length+10].innerText = Intl.NumberFormat().format(price) + " đ";      
            imgArray [i+j*lstproduct.length+10].src = srcImg;   
            name = product.getElementsByTagName("name")[0].childNodes[0].nodeValue.toLowerCase()
        }
    }
}


function loadingFoodProduct() {
    phanloai='TA';
    loadData(phanloai);
}

function loadingHegieneProduct() {
    phanloai='VS';
    loadData(phanloai);
}

function loadingToyProduct() {
    phanloai='DC';
    loadData(phanloai);
}

function loadingFashionProduct() {
    phanloai='TT';
    loadData(phanloai);
}


function loadingForCatProduct() {
    phanloai='TAM';
    loadData(phanloai);
    lstdanhmuc =['VSM','TTM','DCM'];
    loadDaTa2(lstdanhmuc);
    
}

var lstdanhmuc=[];
function loadingForDogProduct() {
    phanloai='TAC';
    loadData(phanloai);
    lstdanhmuc =['VSC','TTC','DCC'];
    loadDaTa2(lstdanhmuc);
}


function getID(id){
if (typeof(Storage) !== "undefined") {
    // Lưu trữ
    localStorage.idP = id;
}
}





