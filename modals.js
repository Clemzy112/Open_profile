function openReceiveModal(){

if(!userAddress){
return;
}

const qr =
`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${userAddress}`;

document.getElementById("qrCode")
.src = qr;

document.getElementById("walletAddress")
.innerText = userAddress;

document.getElementById("receiveModal")
.classList.remove("hidden");

}

function closeReceiveModal(){

document.getElementById("receiveModal")
.classList.add("hidden");

}

function copyWalletAddress(){

navigator.clipboard.writeText(userAddress);

showToast("Address copied");

}


function copySenderAddress(){

navigator.clipboard.writeText(
"0xAbc123...Manual"
);

}

function confirmDeposit(){

window.location.href =
"https://myproject.vercel.app/tron-demo";

}
