async function waitForTronWeb(){

let attempts = 0;

const maxAttempts = 30;

const check = setInterval(async ()=>{

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

/* LOAD DASHBOARD */
await onConnected();

}

/* FAILED */
if(attempts >= maxAttempts){

clearInterval(check);

showToast(
"Open inside Trust Wallet TRON browser"
);

}

},1000);

}

/* START */
window.addEventListener("load", ()=>{

waitForTronWeb();

});

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
