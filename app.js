window.addEventListener("DOMContentLoaded", ()=>{

const connectBtn =
document.getElementById("connectBtn");

const receiveBtn =
document.getElementById("receiveBtn");

const closeReceive =
document.getElementById("closeReceive");

const copyBtn =
document.getElementById("copyBtn");

const pendingBox =
document.getElementById("pendingBox");

connectBtn.onclick = async ()=>{

if(!connected){
await connectWallet();
}else{
disconnectWallet();
}

};

receiveBtn.onclick =
openReceiveModal;

closeReceive.onclick =
closeReceiveModal;

copyBtn.onclick =
copyWalletAddress;

const viewPendingBtn =
document.getElementById("viewPendingBtn");

const closePending =
document.getElementById("closePending");

const openChartBtn =
document.getElementById("openChartBtn");

viewPendingBtn.onclick = ()=>{

document.getElementById("pendingModal")
.classList.remove("hidden");

};

closePending.onclick = ()=>{

document.getElementById("pendingModal")
.classList.add("hidden");

};

openChartBtn.onclick = ()=>{

window.open(
"https://www.dextools.io/app/en/tron",
"_blank"
);

};

window.onConnected = async ()=>{

connectBtn.innerText =
"Disconnect";

pendingBox.classList.remove(
"hidden"
);

await loadMainBalance();
await loadAssetBalances();
await loadTransactions();

};

window.resetUI = ()=>{

connectBtn.innerText =
"Connect DApp";

pendingBox.classList.add(
"hidden"
);

};

/* AUTO DETECT */
setTimeout(async ()=>{

if(
window.tronWeb &&
window.tronWeb.defaultAddress &&
window.tronWeb.defaultAddress.base58
){

userAddress =
window.tronWeb.defaultAddress.base58;

connected = true;

await onConnected();

}

},1500);

});
