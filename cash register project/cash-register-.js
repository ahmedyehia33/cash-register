
const changeDetails = document.getElementById('change-due');
const cashInput =document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const priceScreen = document.getElementById('price-screen');
const changeInDrawer = document.getElementById('cash-drawer-display');

//given infooo
let changeArray = [];
let price =1.87;
priceScreen.textContent = `Total: $${price}`;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];
///cid original dispaly
changeInDrawer.innerHTML = `<p><strong>Change in drawer</strong>  </p>`;

    //functions

//function to transform any number to an array like cid
const changeCurrencies = (amount, cid) => {
    const denominations = [
        { name: "ONE HUNDRED", value: 10000 },
        { name: "TWENTY", value: 2000 },
        { name: "TEN", value: 1000 },
        { name: "FIVE", value: 500 },
        { name: "ONE", value: 100 },
        { name: "QUARTER", value: 25 },
        { name: "DIME", value: 10 },
        { name: "NICKEL", value: 5 },
        { name: "PENNY", value: 1 },
    ];
    const result = [];
    let remainingAmount = Math.round(amount * 100);
    for (const denomination of denominations) {
        const cidDenomination = cid.find(entry => entry[0] === denomination.name) || [denomination.name, 0];
        
        const availableAmount = Math.min(cidDenomination[1] * 100, remainingAmount);
        const count = Math.floor(availableAmount / denomination.value);

        if (count > 0) {
            result.push([denomination.name, count * (denomination.value / 100)]);
            remainingAmount -= count * denomination.value;}}
                                 return result;  };

///function to update the cid after the change is given;
const updateCID = (cid, changeArray) => {
    for (const [currency, amount] of changeArray) {
        const index = cid.findIndex(entry => entry[0] === currency);
        if (index !== -1) {
            
            cid[index][1] = Math.max(0, cid[index][1] - amount);} }
                                 return cid;};                    
                               

//function to update cid disaply
const updateCIDdisplay = ()=>{
    changeInDrawer.innerHTML = `<p><strong>Change in drawer</strong>  </p>`;
for (let i = 0 ; i < cid.length ; i++){
    const changeDisplay= `<p>${cid[i][0]}: $${cid[i][1]}</p>`;
    changeInDrawer.innerHTML += changeDisplay;};
    cashInput.value= '' ;    
                };




const cashRegister = ()=>{
    let result = {status:'OPEN' , change:[]};
    const cash = parseFloat(cashInput.value);
    const change = parseFloat((cash - price).toFixed(2));
    let changeArray = changeCurrencies(change,cid);
    
    let reversedCID = [...cid].reverse();       
    let totalReversedCID = parseFloat(reversedCID.reduce((el,cur) => el + cur[1],0));
    let totalChangeArray = parseFloat(changeArray.reduce((el,cur)=> el + cur[1],0));       
    
        if (cash < parseFloat(price)){
            alert('Customer does not have enough money to purchase the item');
            cashInput.value='';
                                            return;};
        if (cash == parseFloat(price)){
            changeDetails.style.display ='flex';
            changeDetails.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
            cashInput.value='';                            
            return;};
            if(  change > totalReversedCID || change > totalChangeArray){
                result.status = 'INSUFFICIENT_FUNDS';
                result.change = [];
                changeDetails.innerHTML = `Status: ${result.status}`;
                changeDetails.style.display='flex';
            };
    
            if (change < totalReversedCID && change === parseFloat(totalChangeArray.toFixed(2))) {
                updateCID(cid, changeArray);
                console.log(changeArray);
                result.status = 'OPEN';
                result.change = changeArray;
                changeDetails.style.display = 'flex';
                changeDetails.innerHTML = `<p class='a'>Status: ${result.status}</p>`;
        for (let i = 0; i < result.change.length; i++) {
            changeDetails.innerHTML += `<p class='c'>${result.change[i][0]} : $${result.change[i][1]}</p>`;} 
                    updateCID(cid, changeArray);
                    updateCIDdisplay();
                            };
                if(change == totalReversedCID){
                    changeArray = changeCurrencies(change,cid);
                    console.log(changeArray);
                    result.status='CLOSED';
                    result.change = changeArray;
                    console.log(changeArray);
                    changeDetails.style.display = 'flex';
                    changeDetails.innerHTML = `<p class='a'>Status: ${result.status}</p>`;
                    for (let i = 0; i < result.change.length ; i++){
                        changeDetails.innerHTML += `<p>${result.change[i][0]} : $${result.change[i][1]}</p>`}
                        updateCID(cid,changeArray);
                        updateCIDdisplay();
                        return;}
                        };
                                    
                    
                               

updateCIDdisplay(cid);

purchaseBtn.addEventListener('click', cashRegister); 
cashInput.addEventListener('keydown',(e)=>{if(e.key === 'Enter'){cashRegister();return; }})
    
        
        
   

            


                                               

       
                           

        
        


    
    
    
    
    

                                                
    


