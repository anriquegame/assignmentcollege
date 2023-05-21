function openProduct(id){
    var productURL = "products/productpage.html?id="+id
    window.open(productURL, "_self");
}
function changeInfo(){
    var queryString = window.location.search;
    var params = new URLSearchParams(queryString);
    var name = params.get('id');
    console.log(name)

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