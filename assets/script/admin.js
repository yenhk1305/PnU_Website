//Login khi vào trang
function loginadmin() {
    while (true) {
        var username = prompt("Username");
        var pass = prompt("Password");
        if (username == 'admin' && pass == 'admin') {
            break;
        }
    }
}



function displayOrder(){
    var donhang = orderHistory.listOrder();
    console.log(donhang)
    var ttdh = "";
    var tong = 0;
    var tongsp = 0;
    for (var i = 0; i < donhang.length; i++){
        tong += donhang[i].total;
        tongsp += donhang[i].count;
        ttdh += '<tr>'+
        '<td style="text-align: center;">'+
            '<p>'+(i+1)+'</p>'+
        '</td>'+
        '<td class="name-phone">'+
            '<h5>'+donhang[i].name+'</h5>'+
            '<p>'+donhang[i].phone+'</p>'+
        '</td>'+
        '<td>'+
            '<p>'+donhang[i].address+'</p>'+
        '</td>'+
        '<td style="text-align: center;">'+
            '<p>'+donhang[i].payment+'</p>'+
        '</td>'+
        '<td style="text-align: center;">'+
            '<p>'+donhang[i].count+'</p>'+
        '</td>'+
        '<td class="price">'+
            '<p>'+Intl.NumberFormat().format(donhang[i].total) + " đ" +'</p>'+
        '</td>'+
    '</tr>'
    }
    ttdh += '<tr>'+
        '<td colspan="4">Tổng cộng</td>'+
        '<td style="text-align: center;">'+
            '<p>'+tongsp+'</p>'+
        '</td>'+
        '<td class="price">'+
            '<p>'+Intl.NumberFormat().format(tong) + " đ"+'</p>'+
        '</td>'+
    '</tr>'
    document.getElementById("orderinfo").innerHTML = ttdh;
}


