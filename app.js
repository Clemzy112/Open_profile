window.addEventListener("DOMContentLoaded", ()=>{

try{

const connectBtn =
document.getElementById("connectBtn");
const closeSend =
  
document.getElementById("closeSend");

const confirmSend =
document.getElementById("confirmSend");
  
const receiveBtn =
document.getElementById("receiveBtn");

const closeReceive =
document.getElementById("closeReceive");

const copyBtn =
document.getElementById("copyBtn");

if(!connectBtn){
return;
}

const pendingBox =
document.getElementById("pendingBox");

connectBtn.onclick = async ()=>{

if(!connected){
await connectWallet();
}else{
disconnectWallet();
}

};
document.querySelectorAll(".actionBtn")
.forEach(btn=>{

btn.onclick = openSendModal;

});

closeSend.onclick =
closeSendModal;
  
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

location.href = "https://www.dextools.io/app/en/tron";

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


}catch(err){
console.log(err);
alert("App initialization failed");
}

});
