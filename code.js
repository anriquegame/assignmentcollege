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
    alert(arrayProduct.name+arrayProduct.desc+arrayProduct.imgPath)
}