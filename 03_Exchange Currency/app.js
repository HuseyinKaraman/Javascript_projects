// TODO: https://www.exchangerate-api.com/


// elements
const currency_one = document.getElementById("currency_one");
const currency_two = document.getElementById("currency_two");
const list_one = document.getElementById("list_one");
const list_two = document.getElementById("list_two");
const amount = document.getElementById("amount");
const calculate = document.getElementById("calculate");
const result = document.getElementById("result");


const api_key = "787dc982412666ff0aa09447"; // "<api_key>";
const url = "https://v6.exchangerate-api.com/v6/" + api_key;

async function supportedCodes() {
     const response = await fetch(url + "/codes");
     const data = await response.json();
     const items = data.supported_codes;

     let options;
     for (let item of items) {
          options += `<option value="${item[0]}">${item[1]}</option>`;
     }
     list_one.innerHTML = options;
     list_two.innerHTML = options;
}

supportedCodes();

calculate.addEventListener("click",exchangeCurrency);

function exchangeCurrency() {
    const value = amount.value;
    const currencyOne = currency_one.value
    const currencyTwo = currency_two.value;

    if(value && currencyOne && currencyTwo ){
        sendRequest(value,currencyOne,currencyTwo);
    }else{
        console.log("eksik bilgi");
    }
}

async function sendRequest(amount,currencyOne,currencyTwo) {
    try {
        const response = await fetch(url+"/latest/"+currencyOne);
        const data = await response.json();
        const items = await data.conversion_rates;
        const rate = await items[currencyTwo];

        const currencyOneRes = amount +" "+ currencyOne;
        const currencyTwoRes = (amount*rate).toFixed(2) +" "+ currencyTwo;

        // display result
        const html = `
          <div class="card border-primary">
               <div class="card-body text-center" style="font-size: 30px">
                     ${currencyOneRes}  = ${currencyTwoRes}
               </div>
          </div>   
        `;
        result.innerHTML = html;
    }  catch (err) {
        console.log(err);
    }

    // TODO: ek olarak diger doviz kur karşılıkları yazdırılabilir!

}


