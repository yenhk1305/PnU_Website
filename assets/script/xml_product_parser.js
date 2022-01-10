
function loadingProductOnPage(n) {
    
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

            // số sản phẩm trên một trang
        var  slsp=20;
        var  name,price, srcImg,id;
        var nameArray, priceArray, imgArray,linkArray;

        lstproduct = xmlDoc.getElementsByTagName('PnU')[0].getElementsByTagName("product");
        

        nameArray = document.getElementsByClassName("product-item__name");
        priceArray = document.getElementsByClassName("product-item__price-current");
        imgArray = document.getElementsByClassName("product-item__img");
        linkArray = document.getElementsByClassName("product-item");

        var index_h;
        //vi tri trong page html
        for (i = 0+20*n; i < 20*(n+1); i++) {
            product =   lstproduct[i];
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

       return data;
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

