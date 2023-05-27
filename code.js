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
function buyButton() {
    var queryString = window.location.search;
    var params = new URLSearchParams(queryString);
    var name = params.get('id');
    var listJSON = localStorage.getItem("buyitem");
    var listbuy;
  
    try {
      listbuy = JSON.parse(listJSON);
    } catch (error) {
      listbuy = [];
    }
  
    if (Array.isArray(listbuy)) {
      console.log(listbuy);
      listbuy.push(name);
    } else {
      listbuy = [name];
    }
  
    console.log(listbuy);
  
    var updatedListJSON = JSON.stringify(listbuy);
    localStorage.setItem("buyitem", updatedListJSON);

    // popup
    var popup = document.createElement("div");
    popup.className = "popup";
    popup.id = "popupid"
    
    // add close button to popup
    popup.innerHTML = '<button class="closeButton" onclick="closepopup()">X</button>';
    popup.innerHTML += "<h4>product added to the basket</h4>";

    // create overlay
    var overlay = document.createElement("div");
    overlay.className = "overlay";
    
    // add popup to container
    document.getElementById("popupContainer").appendChild(overlay);
    document.getElementById("popupContainer").appendChild(popup);
}
function closepopup() {
    // var closeButton = document.querySelector('.closeButton');
    var popupContainer = document.getElementById("popupContainer");
    
    popupContainer.removeChild(popupContainer.firstChild);
    popupContainer.removeChild(popupContainer.firstChild);
}

function fillBasket(){
    var listJSON = localStorage.getItem("buyitem");
    var listbuy;
    var container = document.getElementById("productBasket");
    var total = 0.00;
    try {
      listbuy = JSON.parse(listJSON);
    } catch (error) {
      listbuy = [];
    }
    listbuy.forEach(function(item) {
        var arrayProduct = data.find(function(obj) {
            return obj.name === item;
        });
        total += parseFloat(arrayProduct.price.replace(',', '').slice(1));
        console.log(total)
        var imagem = document.createElement("img");
        imagem.src = arrayProduct.imgPath;
        container.appendChild(imagem);
    });
    var formattedTotal = '£' + total.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById("totalprice").textContent = formattedTotal;

}
function clearList(){
    var listbuy = [];
    var updatedListJSON = JSON.stringify(listbuy);
    localStorage.setItem("buyitem", updatedListJSON);
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
        if(element){
            element.querySelector("h2").textContent = obj.fullName;
            element.querySelector("h2").addEventListener('click', function() {
                openProduct(obj.name,2)
            })
            element.querySelector("h3").addEventListener('click', function() {
                openProduct(obj.name,2)
            })
            element.querySelector("h3").textContent = obj.price;
            element.querySelector("img").src = obj.imgPath;

            var descList = element.querySelector("ul");
            obj.desc.forEach(item => {
                var li = document.createElement("li");
                li.textContent = item;
                descList.appendChild(li);
            });
        }
    });
}
