// $(document).ready(function() {
//     $('ul.tabs').each(function(){
//       var active, content, links = $(this).find('a');
//       active = links.first().addClass('active');
//       content = $(active.attr('href'));
//       links.not(':first').each(function () {
//         $($(this).attr('href')).hide();
//       });
//       $(this).find('a').click(function(e){
//         active.removeClass('active');
//         content.hide();
//         active = $(this);
//         content = $($(this).attr('href'));
//         active.addClass('active');
//         content.show();
//         return false;
//       });
//     });
//   });



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




function loadingProductDetailPage() {

  var id=localStorage.getItem("idP");

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



