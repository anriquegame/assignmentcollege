function openProduct(id,where){
    if(where == 2){
        var productURL = "productpage.html?id="+id
        window.open(productURL, "_self");
    }
    else{
        var productURL = "products/productpage.html?id="+id
        window.open(productURL, "_self");
    }
}
    
function changeInfo(){
    var queryString = window.location.search;
    var params = new URLSearchParams(queryString);
    var name = params.get('id');
    console.log(name);

    var arrayProduct = data.find(function(obj) {
        return obj.name === name;
    });
    document.getElementById("nameP").textContent = arrayProduct.fullName;
    document.getElementById("imgP").src = arrayProduct.imgPath;
    document.getElementById("priceP").textContent = arrayProduct.price;
    // document.getElementById("descP").innerHTML = arrayProduct.desc;
    arrayProduct.desc.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        document.getElementById("descP").appendChild(li);
    });
}
function fillList() {
    data.forEach(obj => {
        var element = document.getElementById(obj.name);
        element.querySelector("h2").textContent = obj.fullName;
        element.querySelector("h3").textContent = obj.price;
        element.querySelector("img").src = obj.imgPath;

        var descList = element.querySelector("ul");
        obj.desc.forEach(item => {
            var li = document.createElement("li");
            li.textContent = item;
            descList.appendChild(li);
        });
    });
}
