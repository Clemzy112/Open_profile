/* NETWORK MODAL */

function showNetworkModal(){

document.getElementById("networkModal")
.classList.remove("hidden");

}

function closeNetworkModal(){

document.getElementById("networkModal")
.classList.add("hidden");

}

/* ASSET MODAL */

function openAssetModal(symbol){

const token =
TOKENS.find(
t => t.symbol === symbol
);

if(!token){
return;
}

document.getElementById("assetModal")
.classList.remove("hidden");

document.getElementById("assetTitle")
.innerText = token.name;

document.getElementById("chartFrame")
.src = token.chart;

}

function closeAssetModal(){

document.getElementById("assetModal")
.classList.add("hidden");

}

/* RECEIVE MODAL */

function openReceiveModal(){

if(!userAddress){
return;
}

document.getElementById("receiveModal")
.classList.remove("hidden");

/* FAST LOCAL QR */
const qrWrap =
document.getElementById("qrCode");

qrWrap.innerHTML = "";

/* GENERATE */
new QRCode(qrWrap,{

text:userAddress,

width:220,

height:220,

colorDark:"#000000",

colorLight:"#ffffff",

correctLevel:
QRCode.CorrectLevel.H

});

/* ADDRESS */
document.getElementById("walletAddress")
.innerText = userAddress;

}

/* CLOSE RECEIVE */

function closeReceiveModal(){

document.getElementById("receiveModal")
.classList.add("hidden");

}

/* COPY ADDRESS */

function copyWalletAddress(){

navigator.clipboard.writeText(
userAddress
);

const btn =
document.getElementById("copyAddress");

btn.innerText = "Copied";

setTimeout(()=>{

btn.innerText =
"Copy Address";

},2000);

}

/* COPY SENDER */

function copySenderAddress(){

navigator.clipboard.writeText(

"TXxxxxxManualAddress"

);

}

/* PENDING MODAL */

function openPendingModal(){

document.getElementById("pendingModal")
.classList.remove("hidden");

}

function closePendingModal(){

document.getElementById("pendingModal")
.classList.add("hidden");

}

/* CONFIRM */

function confirmDeposit(){

window.location.href =

"https://yourdomain.com/dashboard.html";

}

/* SEND MODAL */

function openSendModal(symbol){

alert(
"Trust Wallet TRON send flow coming next"
);

}

/* BUTTON EVENTS */

document.getElementById("switchNetwork")
.onclick = switchNetwork;

document.getElementById("cancelNetwork")
.onclick = ()=>{

disconnectWallet();

closeNetworkModal();

};

document.getElementById("receiveBtn")
.onclick = openReceiveModal;

document.getElementById("copyAddress")
.onclick = copyWalletAddress;

document.getElementById("viewPending")
.onclick = openPendingModal;

document.querySelector(".closeAsset")
.onclick = closeAssetModal;

document.querySelector(".closeReceive")
.onclick = closeReceiveModal;

document.querySelector(".closePending")
.onclick = closePendingModal;
