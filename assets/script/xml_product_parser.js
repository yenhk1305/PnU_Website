

var data = [], xmlObject,xmlDoc;

  
function loadingProductPage1() {
    
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
        var  name,price, srcImg;
        var nameArray, priceArray, imgArray;

        lstproduct = xmlDoc.getElementsByTagName('PnU')[0].getElementsByTagName("product");
        
        // Trộn mảng để thể hiện ngẫu nhiên
        const lstproductShuffled = Array.prototype.slice.call(lstproduct).sort( function () {
            return 0.5 - Math.random();
        } );
 
        

        var flag= document.getElementById("page2");

        var btnCart=document.getElementsByClassName("product-item__add-cart");
        nameArray = document.getElementsByClassName("product-item__name");
        priceArray = document.getElementsByClassName("product-item__price-current");
        imgArray = document.getElementsByClassName("product-item__img");
        
        if (flag==null){
          
           
            for (i = 0; i < 20; i++) {

                btnCart[i].setAttribute("onclick","addtocart(this)");
                product =   lstproductShuffled[i];
                name =product.getElementsByTagName("name")[0].childNodes[0].nodeValue;
                nameArray [i].innerText = name;          
            
                price =product.getElementsByTagName("price")[0].childNodes[0].nodeValue;
                priceArray [i].innerText = price;   
                
                srcImg =product.getElementsByTagName("image")[0].childNodes[0].nodeValue;
                imgArray [i].src = srcImg;   
            }
        }else{
            for (j = 20; j < 40; j++) {
        
                product =   lstproductShuffled[j];
                name =product.getElementsByTagName("name")[0].childNodes[0].nodeValue;
                nameArray [j-20].innerText = name;          
            
                price=product.getElementsByTagName("price")[0].childNodes[0].nodeValue;
                priceArray [j-20].innerText = price;   
                
                srcImg =product.getElementsByTagName("image")[0].childNodes[0].nodeValue;
                imgArray [j-20].src = srcImg;   
            }
            return data;
        }

       return data;
    }
}