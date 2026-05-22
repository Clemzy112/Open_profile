async function loadTransactions(){

const txList =
document.getElementById("txList");

try{

const response = await fetch(
`https://apilist.tronscanapi.com/api/transaction?address=${userAddress}&limit=5`
);

const data = await response.json();

if(!data.data || data.data.length === 0){

txList.innerHTML = `
<div class="card">
No transactions found
</div>
`;

return;

}

let html = "";

for(const tx of data.data){

html += `

<div class="card">
<h3>${tx.contractType || "Transfer"}</h3>
<p style="font-size:12px;word-break:break-all;opacity:0.7;">
${tx.hash}
</p>
</div>

`;

}

txList.innerHTML = html;

}catch(err){
console.log(err);
}

}
