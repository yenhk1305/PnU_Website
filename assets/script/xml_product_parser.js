
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

    // số sản phẩm trên một trang
    var  slsp=20;
    var  name,price, srcImg;
    var nameArray, priceArray, imgArray;
    var btnCart=document.getElementsByClassName("product-item__add-cart");

    nameArray = document.getElementsByClassName("product-item__name");
    priceArray = document.getElementsByClassName("product-item__price-current");
    imgArray = document.getElementsByClassName("product-item__img");

function loadingProductOnPage(numberPage) {

    var n=numberPage;
     
    var lstproduct = xmlDoc.getElementsByTagName('PnU')[0].getElementsByTagName("product");

       // Sắp xếp mảng để thể hiện ngẫu nhiên
    var   lstproductShuffled = Array.prototype.slice.call(lstproduct).sort( function () {
        return 0;
    } );


    for (i = 0+20*n; i < 20*(n+1); i++) {
        product =   lstproductShuffled[i];
        name= product.getElementsByTagName("name")[0].childNodes[0].nodeValue;
        price =product.getElementsByTagName("price")[0].childNodes[0].nodeValue;
        srcImg =product.getElementsByTagName("image")[0].childNodes[0].nodeValue;
        
        nameArray [i-slsp*n].innerText = name;                   
        priceArray [i-slsp*n].innerText = Intl.NumberFormat().format(price) + " đ";      
        imgArray [i-slsp*n].src = srcImg;   
        btnCart[i-slsp*n].setAttribute("onclick","addtocart(this)");
    }
  
}

function loadingProductPage1() {
    loadingProductOnPage(0);
}

function loadingProductPage2() {
    loadingProductOnPage(1);
}

function parseXml(xml, arrayTags) {
    let dom = null;
    if (window.DOMParser) dom = (new DOMParser()).parseFromString(xml, "text/xml");
    else if (window.ActiveXObject) {
        dom = new ActiveXObject('Microsoft.XMLDOM');
        dom.async = false;
        if (!dom.loadXML(xml)) throw dom.parseError.reason + " " + dom.parseError.srcText;
    }
    else throw new Error("cannot parse xml string!");

    function parseNode(xmlNode, result) {
        if (xmlNode.nodeName == "#text") {
            let v = xmlNode.nodeValue;
            if (v.trim()) result['#text'] = v;
            return;
        }

        let jsonNode = {},
            existing = result[xmlNode.nodeName];
        if (existing) {
            if (!Array.isArray(existing)) result[xmlNode.nodeName] = [existing, jsonNode];
            else result[xmlNode.nodeName].push(jsonNode);
        }
        else {
            if (arrayTags && arrayTags.indexOf(xmlNode.nodeName) != -1) result[xmlNode.nodeName] = [jsonNode];
            else result[xmlNode.nodeName] = jsonNode;
        }

        if (xmlNode.attributes) for (let attribute of xmlNode.attributes) jsonNode[attribute.nodeName] = attribute.nodeValue;

        for (let node of xmlNode.childNodes) parseNode(node, jsonNode);
    }

    let result = {};
    for (let node of dom.childNodes) parseNode(node, result);

    return result;
}


function sortDes(){
    const obj = parser.toJson(xmlDoc, { object: true });
    var product = obj[0].root[0].product[0].nodeValue;


    nameArray [i-slsp*numberPage].innerText = name;                   
        priceArray [i-slsp*numberPage].innerText = price;      
        imgArray [i-slsp*numberPage].src = srcImg;   
}
