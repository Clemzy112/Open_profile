let userAddress = null;
let connected = false;

function showToast(message){

const toast =
document.getElementById("toast");

toast.innerText = message;

toast.classList.remove("hidden");

setTimeout(()=>{
toast.classList.add("hidden");
},3000);

}

async function connectWallet(){

try{

if(!window.tronWeb){
showToast("TRON wallet not detected");
return;
}

if(!window.tronWeb.defaultAddress.base58){
showToast("Unlock wallet and reopen DApp");
return;
}

userAddress =
window.tronWeb.defaultAddress.base58;

connected = true;

await onConnected();

}catch(err){
console.log(err);
showToast("Connection failed");
}

}

function disconnectWallet(){

connected = false;
userAddress = null;

resetUI();

showToast("Disconnected");

}

async function getPrices(){

const response = await fetch(
"https://api.coingecko.com/api/v3/simple/price?ids=tron,tether&vs_currencies=usd"
);

return await response.json();

}

async function loadMainBalance(){

const prices = await getPrices();

const balance =
await tronWeb.trx.getBalance(userAddress);

const trx =
(balance / 1000000).toFixed(4);

const usd =
(Number(trx) * prices.tron.usd).toFixed(2);

document.getElementById("trxBalance")
.innerText = trx + " TRX";

document.getElementById("trxUsd")
.innerText = "$" + usd;

}

async function loadAssetBalances(){

const assetList =
document.getElementById("assetList");

assetList.innerHTML = "";

const prices = await getPrices();

for(const token of TOKENS){

try{

let balanceText = "0";
let usdValue = "0.00";

if(token.type === "native"){

const balance =
await tronWeb.trx.getBalance(userAddress);

balanceText =
(balance / 1000000).toFixed(4);

usdValue =
(
Number(balanceText) * prices.tron.usd
).toFixed(2);

}else{

const contract =
await tronWeb.contract().at(token.address);

const balance =
await contract.balanceOf(userAddress).call();

balanceText =
(Number(balance) / 1000000).toFixed(2);

usdValue =
(
Number(balanceText) * prices.tether.usd
).toFixed(2);

}

assetList.innerHTML += `

<div class="card assetCard">

<div class="assetRow">

<div class="assetInfo">
<img src="${token.logo}" class="tokenLogo">

<div>
<h3>${token.symbol}</h3>
<p>${balanceText}</p>
<p style="color:#00ff88;">$${usdValue}</p>
</div>

</div>

</div>

</div>

`;

}catch(err){
console.log(err);
}

}

}
