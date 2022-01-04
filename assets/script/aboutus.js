var data = [], xmlObject,xmlDoc;

  
function loadingMember() {
    
    var i;
    var xmlObject = new XMLHttpRequest();
    xmlObject.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data = changeXmlToData(this)
        }
    };
    xmlObject.open("GET", "../data/member.xml", true);
    xmlObject.send();

    
    function changeXmlToData(xml) {

        xmlDoc = xml.responseXML;

        var lstmember;
        var  name,name1, id,id1, zodiac,birth,home,color,hobbies,tasks,srcImage;
        var nameArray,nameArray1, idArray,idArray1, zodiacArray, birthArray,homeArray, colorArray,hobbiesArray,tasksArray, imgArray;

        lstmember = xmlDoc.getElementsByTagName("member");
        
        
        
        nameArray = document.getElementsByClassName("member-name");
        idArray=document.getElementsByClassName("member-id");
        nameArray1 = document.getElementsByClassName("member-name1");
        idArray1=document.getElementsByClassName("member-id1");
        zodiacArray=document.getElementsByClassName("member-zodiac");
        birthArray=document.getElementsByClassName("member-birth");
        homeArray=document.getElementsByClassName("member-home");
        colorArray=document.getElementsByClassName("member-color");
        hobbiesArray=document.getElementsByClassName("member-hobbies");
        tasksArray=document.getElementsByClassName("member-tasks");
        imgArray=document.getElementsByClassName("member-image");

        for(i=0;i<lstmember.length;i++){
            name= lstmember[i].getElementsByTagName("ten")[0].childNodes[0].nodeValue;
            nameArray [i].innerText = name;

            id=lstmember[i].getElementsByTagName("mssv")[0].childNodes[0].nodeValue;
            idArray[i].innerText=id;

            name1= lstmember[i].getElementsByTagName("ten")[0].childNodes[0].nodeValue;
            nameArray1 [i].innerText = name1;

            id1=lstmember[i].getElementsByTagName("mssv")[0].childNodes[0].nodeValue;
            idArray1[i].innerText=id1;


            zodiac =lstmember[i].getElementsByTagName("cungHoangDao")[0].childNodes[0].nodeValue;
            zodiacArray [i].innerText = zodiac;
        
            birth =lstmember[i].getElementsByTagName("ngaySinh")[0].childNodes[0].nodeValue;
            birthArray [i].innerText = birth;

            home =lstmember[i].getElementsByTagName("queQuan")[0].childNodes[0].nodeValue;
            homeArray [i].innerText = home;

            color =lstmember[i].getElementsByTagName("mauYeuThich")[0].childNodes[0].nodeValue;
            colorArray [i].innerText = color;

            hobbies =lstmember[i].getElementsByTagName("soThich")[0].childNodes[0].nodeValue;
            hobbiesArray [i].innerText = hobbies;

            tasks =lstmember[i].getElementsByTagName("nhiemVu")[0].childNodes[0].nodeValue;
            tasksArray [i].innerText = tasks;
            
            srcImage =lstmember[i].getElementsByTagName("image")[0].childNodes[0].nodeValue;
            imgArray [i].src = srcImage;   


        }
       return data;
    }
}

