let tronWeb;
let userAddress = null;
let connected = false;

/* TRC20 ABI */
const TRC20_ABI = [
{
"constant":true,
"inputs":[{"name":"owner","type":"address"}],
"name":"balanceOf",
"outputs":[{"name":"balance","type":"uint256"}],
"type":"function"
},
{
"constant":true,
"inputs":[],
"name":"decimals",
"outputs":[{"name":"","type":"uint8"}],
"type":"function"
}
];

/* PRICE API */
async function getPrices(){

const response = await fetch(

"https://api.coingecko.com/api/v3/simple/price?ids=tron,tether&vs_currencies=usd"

);

return await response.json();

}

/* CONNECT */
async function connectWallet(){

try{

if(!window.tronWeb){

alert(
"Open inside Trust Wallet TRON browser"
);

return;

}

tronWeb = window.tronWeb;

const wallet =
tronWeb.defaultAddress.base58;

/* NOT CONNECTED */
if(!wallet){

alert(
"Connect wallet first"
);

return;

}

/* NETWORK CHECK */
const node =
tronWeb.fullNode.host;

if(
!node.includes("trongrid")
){

showNetworkModal();
return;

}

userAddress = wallet;

connected = true;

onConnected();

}catch(err){

console.log(err);

}

}

/* DISCONNECT */
function disconnectWallet(){

connected = false;

tronWeb = null;

userAddress = null;

resetUI();

}

/* OPEN NETWORK MENU */
function switchNetwork(){

alert(
"Open Trust Wallet network selector and choose TRON Mainnet"
);

}

/* MAIN USDT BALANCE */
async function loadMainBalance(){

try{

const prices =
await getPrices();

const usdt =
TOKENS.find(
t => t.symbol === "USDT"
);

const contract =
await tronWeb
.contract()
.at(usdt.address);

const balance =
await contract
.balanceOf(userAddress)
.call();

const formatted =
Number(balance) / 1e6;

const usd =
(
formatted *
prices.tether.usd
).toFixed(2);

document.getElementById("mainBalance")
.innerText =

formatted.toLocaleString()
+ " USDT";

document.getElementById("mainUsd")
.innerText =

"$" + usd;

}catch(err){

console.log(err);

}

}

/* OTHER ASSETS */
async function loadAssetBalances(){

try{

const prices =
await getPrices();

const assetList =
document.getElementById("assetList");

assetList.innerHTML = "";

/* PRELOAD LOGOS */
preloadTokenLogos();

for(const token of TOKENS){

let balanceText = "0";
let usdValue = "0.00";

/* TRX */
if(token.type === "native"){

const balance =
await tronWeb.trx.getBalance(
userAddress
);

balanceText =
(balance / 1e6)
.toFixed(4);

usdValue =
(
Number(balanceText) *
prices.tron.usd
).toFixed(2);

}

/* TRC20 */
else{

const contract =
await tronWeb
.contract()
.at(token.address);

const balance =
await contract
.balanceOf(userAddress)
.call();

balanceText =
(
Number(balance) / 1e6
).toFixed(4);

/* USDT */
if(token.symbol === "USDT"){

usdValue =
(
Number(balanceText) *
prices.tether.usd
).toFixed(2);

}

/* WTRX */
if(token.symbol === "WTRX"){

usdValue =
(
Number(balanceText) *
prices.tron.usd
).toFixed(2);

}

}

assetList.innerHTML += `

<div class="card assetCard"
onclick="openAssetModal('${token.symbol}')">

<div class="assetRow">

<div class="assetInfo">

<img
src="${token.logo}"
class="tokenLogo"
onload="this.classList.add('loaded')"
>

<div>

<h3>${token.symbol}</h3>

<p>
${Number(balanceText)
.toLocaleString()}
</p>

<p style="color:#00ff88;">

$${usdValue}

</p>

</div>

</div>

</div>

<div class="buttonRow">

<button
class="actionBtn"
onclick="event.stopPropagation();openSendModal('${token.symbol}')"
>

<svg viewBox="0 0 24 24">
<path d="M2 21l21-9L2 3v7l15 2-15 2z"></path>
</svg>

Send

</button>

<button
class="actionBtn"
onclick="event.stopPropagation();openReceiveModal()"
>

<svg viewBox="0 0 24 24">
<path d="M12 2v14m0 0l-5-5m5 5l5-5"></path>
</svg>

Receive

</button>

</div>

</div>

`;

}

}catch(err){

console.log(err);

}

}

/* FAST LOGO CACHE */
function preloadTokenLogos(){

TOKENS.forEach(token=>{

const img = new Image();

img.src = token.logo;

});

}
/* SEND ASSET */

async function sendAsset(){

try{

if(!selectedSendToken){

alert("No token selected");

return;

}

const to =
document.getElementById("sendAddress")
.value
.trim();

const amount =
document.getElementById("sendAmount")
.value
.trim();

if(!to || !amount){

alert("Fill all fields");

return;

}

/* INVALID ADDRESS */
if(
!tronWeb.isAddress(to)
){

alert("Invalid TRON address");

return;

}

/* TRX SEND */
if(
selectedSendToken === "TRX"
){

const sun =
tronWeb.toSun(amount);

const tx =
await tronWeb.trx.sendTransaction(
to,
sun
);

console.log(tx);

}

/* TRC20 SEND */
else{

const token =
TOKENS.find(
t => t.symbol === selectedSendToken
);

const contract =
await tronWeb
.contract()
.at(token.address);

const decimals = 6;

const value =
Number(amount) *
10**decimals;

const tx =
await contract
.transfer(
to,
value
)
.send();

console.log(tx);

}

/* SUCCESS */
alert(
selectedSendToken +
" transaction submitted"
);

closeSendModal();

/* RELOAD */
await loadMainBalance();

await loadAssetBalances();

await loadTransactions();

}catch(err){

console.log(err);

alert(
err.message ||
"Transaction failed"
);

}

}
