let refreshInterval = null;

/* WAIT FOR HTML */
window.addEventListener("DOMContentLoaded", ()=>{

const connectBtn =
document.getElementById("connectBtn");

const pendingBox =
document.getElementById("pendingBox");

/* BUTTON CLICK */
connectBtn.onclick = async ()=>{

if(!connected){

await connectWallet();

}else{

disconnectWallet();

}

};

/* AUTO DETECT TRON */
waitForTronWeb();

/* CONNECTED UI */
async function onConnectedInternal(){

connectBtn.innerText =
"Disconnect";

connectBtn.classList.remove(
"mainBtn"
);

connectBtn.classList.add(
"dangerBtn"
);

pendingBox.classList.remove(
"hidden"
);

/* LOAD DATA */
await loadMainBalance();

await loadAssetBalances();

await loadTransactions();

/* AUTO REFRESH */
startAutoRefresh();

}

/* EXPOSE GLOBAL */
window.onConnected =
onConnectedInternal;

/* RESET UI */
window.resetUI = function(){

connectBtn.innerText =
"Connect DApp";

connectBtn.classList.remove(
"dangerBtn"
);

connectBtn.classList.add(
"mainBtn"
);

pendingBox.classList.add(
"hidden"
);

document.getElementById("mainBalance")
.innerText = "0 USDT";

document.getElementById("mainUsd")
.innerText = "$0.00";

document.getElementById("assetList")
.innerHTML = "";

document.getElementById("txList")
.innerHTML = "";

};

/* REFRESH LOOP */
function startAutoRefresh(){

if(refreshInterval){

clearInterval(
refreshInterval
);

}

refreshInterval =
setInterval(async ()=>{

if(connected){

await loadMainBalance();

await loadAssetBalances();

await loadTransactions();

}

},15000);

}

});

/* WAIT FOR TRONWEB */
async function waitForTronWeb(){

let attempts = 0;

const maxAttempts = 30;

const check =
setInterval(async ()=>{

attempts++;

if(
window.tronWeb &&
window.tronWeb.defaultAddress &&
window.tronWeb.defaultAddress.base58
){

clearInterval(check);

userAddress =
window.tronWeb.defaultAddress.base58;

connected = true;

await onConnected();

}

if(attempts >= maxAttempts){

clearInterval(check);

showToast(
"Open inside Trust Wallet TRON browser"
);

}

},1000);

}
