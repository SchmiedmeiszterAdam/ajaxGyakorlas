$(function () {
    const konyvek = []
    const file = "http://localhost:3000/konyvek"
    let nev = file + "?_sort=nev&_order=desc"
    let regenyek = file + "?kategoria=regény"

    let ar = file + "?ar_gte=1000&ar_lte=3000"
    let leptet = file + "?_page=3&_limit=3"
    $("#uj").on("click",()=>{
        myAjaxPost(file,adat)
    })
    myAjax(file,konyvek,kiir)
    let adat = {
        "nev": "Robert Merle",
        "cim": "Két nap az élet",
        "ar": 3500,
        "kategoria": "regény"
    }
    let modositAdat = {
        "id":2,
        "nev": "Új",
        "cim": "Felkelő nap",
        "ar": 4500,
        "kategoria": "regény"
    }
    
    function myAjax(eleresiUt, tomb, myCallBack) {
        tomb.splice(0,tomb.length)
        $.ajax({
            url:eleresiUt,
            type : "GET",
            success : function(result){
                result.forEach((element) =>{
                    tomb.push(element)
                })
                myCallBack(tomb,"Könyvek")
            }
        })
    }
    function myAjaxPost(eleresiUt, adat) {
        $.ajax({
            url:eleresiUt,
            type : "POST",
            data:adat,
            success : function(result){
                myAjax(file,konyvek,kiir)
            }
        })
        konyvek.push(adat)
    }
    function myAjaxPut(eleresiUt, adat) {
        $.ajax({
            url:eleresiUt + "/" + adat.id,
            type : "PUT",
            data:adat,
            success : function(result){
                myAjax(file,konyvek,kiir)
            }
        })
        konyvek.push(adat)
    }
    $("#torol").on("click",()=>{
        myAjaxDelete(file,10)
    })
    $("#modosit").on("click",()=>{
        myAjaxPut(file,modositAdat)
    })
    function myAjaxDelete(eleresiUt, id) {
        $.ajax({
            url:eleresiUt + "/" + id,
            type : "DELETE",
            success : function(result){
                myAjax(file,konyvek,kiir)
            }
        })
    }
    function kiir(tomb,szoveg) {
        let sablon = "<h2> " + szoveg + " </h2>"
        tomb.forEach(({ nev, cim, kategoria, ar }) => {
            sablon += `<div class = 'konyv'> <h3>${nev}</h3><h4 class = 'cim'>${cim}</h4><p>${kategoria}</p><span class = 'ar'>${ar}</span></div>`
        });
        $("#adatok").html(sablon)
    }
})