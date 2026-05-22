async function loadTransactions(){

const txList =
document.getElementById("txList");

txList.innerHTML = "";

/* NOT CONNECTED */
if(!userAddress){
return;
}

try{

/* TRONSCAN API */
const response =
await fetch(

`https://apilist.tronscanapi.com/api/transaction?sort=-timestamp&count=true&limit=10&start=0&address=${userAddress}`

);

const data =
await response.json();

/* EMPTY */
if(
!data.data ||
data.data.length === 0
){

txList.innerHTML = `

<div class="card">
No transactions found
</div>

`;

return;

}

/* RECENT */
const recent =
data.data.slice(0,5);

recent.forEach(tx=>{

/* TYPE */
const type =

tx.toAddress &&
tx.toAddress === userAddress

? "Received"

: "Sent";

/* VALUE */
let amount = "0";

/* TRX */
if(tx.contractType === 1){

amount =
(
Number(tx.amount) / 1e6
).toFixed(4);

}

/* TRC20 */
if(tx.contractData &&
tx.contractData.amount){

amount =
(
Number(tx.contractData.amount) / 1e6
).toFixed(4);

}

txList.innerHTML += `

<div class="card">

<div class="assetRow">

<div>

<h3>${type}</h3>

<p>
${amount}
</p>

</div>

</div>

<p
style="
font-size:12px;
opacity:0.7;
word-break:break-all;
margin-top:10px;
"
>

${tx.hash}

</p>

</div>

`;

});

}catch(err){

console.log(err);

txList.innerHTML = `

<div class="card">
Transaction loading failed
</div>

`;

}

}
