

function plusSlides() {
    showSlides(slideIndex += 1);
}
function minusSlides() {
    showSlides(slideIndex -= 1);
}
function currentSlide(n) {
    showSlides(slideIndex = n);
}
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length - 1) { slideIndex = 0 }
    if (n < 0) { slideIndex = slides.length - 1 }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex].style.display = "block";
    dots[slideIndex].className += " active";
}
function getID(id){
    if (typeof(Storage) !== "undefined") {
        // Lưu trữ
        localStorage.idP = id;
    }
}
var data = [], xmlObject,xmlDoc;

  
function loadingHotProduct() {
    
    var xmlObject = new XMLHttpRequest();
    xmlObject.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data = changeXmlToData(this)
        }
    };
    xmlObject.open("GET", "../data/product.xml", true);
    xmlObject.send();

    
    function changeXmlToData(xml) {

        xmlDoc = xml.responseXML;

        var lstproduct,product;
        var  name,price, srcImg,id;
        var nameArray, priceArray, imgArray,linkArray;


        lstproduct = xmlDoc.getElementsByTagName('PnU')[0].getElementsByTagName("product");
        
        const lstproductShuffled = Array.prototype.slice.call(lstproduct).sort( function () {
            return 0.5 - Math.random();
        } );
 

        var btnCart=document.getElementsByClassName("product-item__add-cart");
        nameArray = document.getElementsByClassName("hotproduct-name");
        priceArray = document.getElementsByClassName("hotproduct-price");
        imgArray = document.getElementsByClassName("hotproduct-img");
        linkArray = document.getElementsByClassName("product-item");

        for (i = 0; i < 8; i++) {
            //btnCart[i].setAttribute("onclick","addtocart(this)");
            product =   lstproductShuffled[i];

            name =product.getElementsByTagName("name")[0].childNodes[0].nodeValue;
            price =product.getElementsByTagName("price")[0].childNodes[0].nodeValue;
            srcImg =product.getElementsByTagName("image")[0].childNodes[0].nodeValue;
            id= product.getElementsByTagName("id")[0].childNodes[0].nodeValue;

            linkArray[i].href="./product_detail.html";
            linkArray[i].id=id;
            linkArray[i].setAttribute("onclick","getID(this.id)");


            nameArray [i].innerText = name;          
        
            
            
            priceArray [i].innerText = price/1000 +",000 đ";   
            
            
            imgArray [i].src = srcImg;   
        }
    

       return data;
    }
}

var data = [], xmlObject,xmlDoc;

  
function loadingFeedback() {
    
    var i;
    var xmlObject = new XMLHttpRequest();
    xmlObject.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data = changeXmlToData(this)
        }
    };
    xmlObject.open("GET", "../data/feedback.xml", true);
    xmlObject.send();

    
    function changeXmlToData(xml) {

        xmlDoc = xml.responseXML;

        var lstcustomer;
        var  name,content,srcImage;
        var  nameArray,contentArray, imgArray;

        lstcustomer = xmlDoc.getElementsByTagName("customer");
        
        
        
        nameArray = document.getElementsByClassName("feedback-name");
        contentArray=document.getElementsByClassName("feedback-text");
        imgArray=document.getElementsByClassName("feedback-image");

        for(i=0;i<lstcustomer.length;i++){
            name= lstcustomer[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
            nameArray [i].innerText = name;

            content=lstcustomer[i].getElementsByTagName("text")[0].childNodes[0].nodeValue;
            contentArray[i].innerText=content;
            
            srcImage =lstcustomer[i].getElementsByTagName("avatar")[0].childNodes[0].nodeValue;
            imgArray [i].src = srcImage;   


        }
       return data;
    }
}