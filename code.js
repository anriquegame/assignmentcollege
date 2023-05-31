function openProduct(id,where){
    if(where == 2){
        var productURL = "productpage.html?id="+id;
        window.open(productURL, "_self");
    }
    else{
        var productURL = "products/productpage.html?id="+id;
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

function popupBasket(event){
    var listJSON = localStorage.getItem("buyitem");
    var listbuy = JSON.parse(listJSON);

    var imagem = event.target

    // popup
    var popup = document.createElement("div");
    popup.className = "popupB";
    
    // add close button to popup
    popup.innerHTML = '<button class="closeButton" onclick="closepopup()">X</button>';
    popup.innerHTML += "<h4>What do you want?</h4>";

    var removeB = document.createElement("a")
    removeB.innerHTML = "remove"
    removeB.style.float = "left"
    removeB.id = "removeBB"
    popup.appendChild(removeB);
    //remove product from list
    removeB.addEventListener('click', function() {
        var arrayProduct = data.find(function(obj) {
            return obj.name == imagem.className.slice(2);
        });

        var indexP = listbuy.indexOf(arrayProduct.name);
        if (indexP !== -1) {
            listbuy.splice(indexP, 1);
        }
        console.log(listbuy);

        var updatedListJSON = JSON.stringify(listbuy);
        localStorage.setItem("buyitem", updatedListJSON);
        location.reload();
    })

    var seeB = document.createElement("a")
    seeB.innerHTML = "see product"
    seeB.style.float = "right"
    popup.appendChild(seeB);
    //remove product from list
    seeB.addEventListener('click', function() {
        var productURL = "productpage.html?id="+imagem.className.slice(2);
        window.open(productURL, "_self");
    })

    // create overlay
    var overlay = document.createElement("div");
    overlay.className = "overlay";
    
    // add popup to container
    document.getElementById("popupContainer").appendChild(overlay);
    document.getElementById("popupContainer").appendChild(popup);
}

function closepopup() {
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
        imagem.className = "ID"+arrayProduct.name
        imagem.style.height = "130px"
        if(arrayProduct.type == "laptop"){
            imagem.style.width = "200px"
        }
        if (arrayProduct.type == "phone") {
            imagem.style.width = "100px"
        }
        if (arrayProduct.type == "tv") {
            imagem.style.width = "230px"
        }
        if (arrayProduct.type == "accessorie") {
            imagem.style.width = "150px"
        }
        container.appendChild(imagem);
        imagem.addEventListener('click', popupBasket)
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

    // img size
    var imagem = document.getElementById("imgP")
    imagem.src = arrayProduct.imgPath;
    imagem.style.height = "260px"
    if(arrayProduct.type == "laptop"){
        imagem.style.width = "400px"
    }
    if (arrayProduct.type == "phone") {
        imagem.style.width = "200px"
    }
    if (arrayProduct.type == "tv") {
        imagem.style.width = "460px"
    }
    if (arrayProduct.type == "accessorie") {
        imagem.style.width = "300px"
    }

    document.getElementById("priceP").textContent = arrayProduct.price;

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
