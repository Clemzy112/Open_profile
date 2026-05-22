window.addEventListener("load", () => {

setTimeout(() => {

if(window.tronWeb && window.tronWeb.defaultAddress.base58){

userAddress =
window.tronWeb.defaultAddress.base58;

connected = true;

onConnected();

}else{

showToast(
"Open in Trust Wallet TRON browser"
);

}

},500);

});const connectBtn =
document.getElementById("connectBtn");

const pendingBox =
document.getElementById("pendingBox");

/* CONNECT BUTTON */

connectBtn.onclick = () => {

if(!connected){

connectWallet();

}else{

disconnectWallet();

}

};

/* CONNECTED */

async function onConnected(){

/* BUTTON UI */
connectBtn.innerText =
"Disconnect";

connectBtn.classList.remove(
"mainBtn"
);

connectBtn.classList.add(
"dangerBtn"
);

/* SHOW PENDING */
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

/* RESET */

function resetUI(){

/* BUTTON */
connectBtn.innerText =
"Connect DApp";

connectBtn.classList.remove(
"dangerBtn"
);

connectBtn.classList.add(
"mainBtn"
);

/* HIDE PENDING */
pendingBox.classList.add(
"hidden"
);

/* RESET BALANCE */
document.getElementById("mainBalance")
.innerText = "0 USDT";

document.getElementById("mainUsd")
.innerText = "$0.00";

/* RESET ASSETS */
document.getElementById("assetList")
.innerHTML = "";

/* RESET TX */
document.getElementById("txList")
.innerHTML = "";

}

/* AUTO REFRESH */

let refreshInterval = null;

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

/* WINDOW FOCUS */

window.addEventListener(

"focus",

async ()=>{

if(connected){

await loadMainBalance();

await loadAssetBalances();

await loadTransactions();

}

}

);

/* TRUST WALLET ACCOUNT CHANGE */

if(window.tronWeb){

setInterval(async ()=>{

try{

if(
connected &&
window.tronWeb.defaultAddress.base58 !== userAddress
){

disconnectWallet();

}

}catch(err){

console.log(err);

}

},3000);

}
