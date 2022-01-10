
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
xmlhttp.open("GET","../data/detailofproduct.xml" , true);
xmlhttp.send();

var  name,price, srcImg,idt;
var nameArray, priceArray, imgArray,linkArray;


nameArray = document.getElementsByClassName("product-item__name");
priceArray = document.getElementsByClassName("product-item__price-current");
imgArray = document.getElementsByClassName("product-item__img");
linkArray = document.getElementsByClassName("product-item");


function loadingData(cate) {

 
var lstproduct = xmlDoc.getElementsByTagName(cate)[0].getElementsByTagName("productDetail");
 
var lstproductShuffled = Array.prototype.slice.call(lstproduct).sort( function () {
         return 0.5 - Math.random();
} );
 
for (i = 0; i < 6; i++) {
    product =   lstproductShuffled[i];
    name= product.getElementsByTagName("name")[0].childNodes[0].nodeValue;
    price =product.getElementsByTagName("price")[0].childNodes[0].nodeValue;
    srcImg =product.getElementsByTagName("imageFirst")[0].childNodes[0].nodeValue;
    idt= product.getElementsByTagName("id")[0].childNodes[0].nodeValue;

    linkArray[i].href="./product_detail.html"
    linkArray[i].id=idt;
    linkArray[i].setAttribute("onclick","getID(this.id)");

    nameArray [i].innerText = name;                   
    priceArray [i].innerText = Intl.NumberFormat().format(price) + " đ";      
    imgArray [i].src = srcImg;   
}}

function loadingProductDetailPage() {
  
  var id=localStorage.getItem("idP");

  var cate =id.substr(0, 2)+"";
  loadingData(cate)
  var info=[];
  path = "//productDetail[id='" + id +"']/*";
  if (xmlDoc.evaluate) {
      var nodes = xmlDoc.evaluate(path, xmlDoc, null, XPathResult.ANY_TYPE, null);
      var thisNode = nodes.iterateNext();  
      while (thisNode) {
        
        info.push( thisNode.textContent );
        thisNode = nodes.iterateNext();
      }

    document.getElementById("infoName").innerHTML=info[1];  
    document.getElementById("infoPrice").innerHTML=Intl.NumberFormat().format(info[2]) + " đ"; ;  
    document.getElementById("mainImg").src=info[3];  
    document.getElementById("small-img1").src=info[3];  
    document.getElementById("small-img2").src=info[4];  
    document.getElementById("small-img3").src=info[5];  
    document.getElementById("description").innerHTML=info[6]; 

}else {
    alert("Trình duyệt không hỗ trợ, đổi trình duyệt?")
}

}

function getID(id){
    if (typeof(Storage) !== "undefined") {
        // Lưu trữ
        localStorage.idP = id;
    }
    }

