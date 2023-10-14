const users = 
[
    {"userName":"ankit",
    "password":1111,
    "currentBalance":1100,
    "transactions":
        [
        {amount:-100, time: new Date("2023-10-01")},
        {amount:300, time: new Date("2023-10-01")},
        {amount:-100, time: new Date("2023-10-02")},
        {amount:500, time: new Date("2023-10-03")},
        {amount:-100, time: new Date("2023-10-05")},
        {amount:500, time: new Date("2023-10-06")},
        {amount:-100, time: new Date("2023-10-06")},
        {amount:500, time: new Date("2023-10-07")},
        {amount:-100, time: new Date("2023-10-07")},
        {amount:800, time: new Date("2023-10-08")},
        
        ]
    
    },

    {"userName":"aman",
    "password":2222,
    "currentBalance":2500,
    "transactions":
    [
        {amount:-700, time: new Date("2023-10-01")},
        {amount:900, time: new Date("2023-10-01")},
        {amount:2000, time: new Date("2023-10-02")},
        {amount:500, time: new Date("2023-10-03")},
        {amount:-100, time: new Date("2023-10-05")},
        {amount:800, time: new Date("2023-10-06")},
        {amount:-1000, time: new Date("2023-10-06")},
        {amount:500, time: new Date("2023-10-07")},
        {amount:-200, time: new Date("2023-10-07")},
        {amount:800, time: new Date("2023-10-08")},
    ]
    },

    {"userName":"raj",
    "password":4444,
    "currentBalance":3200,
    "transactions":
    [
       
        {amount:2000, time: new Date("2023-10-01")},
        {amount:900, time: new Date("2023-10-01")},
        {amount:2000, time: new Date("2023-10-02")},
        {amount:500, time: new Date("2023-10-03")},
        {amount:-100, time: new Date("2023-10-05")},
        {amount:800, time: new Date("2023-10-06")},
        {amount:-4000, time: new Date("2023-10-06")},
        {amount:500, time: new Date("2023-10-07")},
        {amount:-200, time: new Date("2023-10-07")},
        {amount:800, time: new Date("2023-10-08")},
    ]
    },

    {"userName":"mahesh",
    "password":7982,
    "currentBalance":5300,
    "transactions":
    [
        {amount:500, time: new Date("2023-10-01")},
        {amount:-900, time: new Date("2023-10-01")},
        {amount:100, time: new Date("2023-10-02")},
        {amount:5000, time: new Date("2023-10-03")},
        {amount:-1100, time: new Date("2023-10-05")},
        {amount:800, time: new Date("2023-10-06")},
        {amount:-1000, time: new Date("2023-10-06")},
        {amount:500, time: new Date("2023-10-07")},
        {amount:-200, time: new Date("2023-10-07")},
        {amount:800, time: new Date("2023-10-08")},
        
    ]
   }
];

const loginBtn = document.querySelector("#submit");
const userEntered = document.querySelector("#user");
const pinEntered = document.querySelector("#pin");
const main = document.querySelector("main");
const balance = document.querySelector(".main__currentBalance");
const sortButton = document.querySelector(".main__sort button");
let transactions;
main.style.opacity="0";
let userName;
let currUser;

const inAmount = document.querySelector(".main__summary #in");
const outAmount = document.querySelector(".main__summary #out");

let inValue = 0;
let outValue=0;


function setCookie(data,days)
{
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

    const expDate = ";expires="+date.toUTCString();
    document.cookie = "name="+data+expDate;
}

function searchForUser(user)
{   

    if(user.userName === userEntered.value.toLowerCase() && +pinEntered.value===user.password)
    {   
        setCookie(user.userName,1);
        return user;
    }

    
}

function noUserFound(user)
{
    if(!user)
    {     
        alert("Invalid user or password");
    }
    else
    {   
        userName =  document.cookie.split("=")[1];
        main.style.opacity="100";
        document.querySelector(".header h4").textContent="Welcome " + userName;
        currUser = users.find(user=>userName===user.userName);
        balance.textContent=currUser.currentBalance;
        transactions = currUser.transactions;
        userEntered.value="";
        pinEntered.value="";

        for(let transaction of transactions)
        {
            if(transaction.amount>0)
            {
                inValue = inValue + transaction.amount;
            }
            else
            {
             outValue = outValue + transaction.amount;

            }   
        }

        inAmount.textContent = inValue + " $";
        outAmount.textContent = (-1 * outValue) + " $";

        startCountDown();

        // Code for responsiveness, as to hide the menu after authentication is successful.
        
    }

}

loginBtn.addEventListener("click",function()
{   
    const user = users.find(searchForUser);
    noUserFound(user);
    showTransactions();

    
});




//


//text field validation
const listOfValidCharacters = ['a', 'b','c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's','t', 'u', 'v', 'w', 'x', 'y', 'z','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const listOfValidNumbers = ["0","1","2","3","4","5","6","7","8","9"];

const numericFields = document.querySelectorAll("input.number");

const textFields  = document.querySelectorAll("input.text");

const processButtons = document.querySelectorAll(".main__process button");

const mainTransactions = document.querySelector(".main__transactions");
const mainTime = document.querySelector(".main__infoAndDate p");

const timerDisplay = document.querySelector(".main__timer #time");


function disableButton(button)
{
    button.disabled=true;
    button.classList.add("disableButton");
}

function enableButton(button)
{
    button.disabled=false;
    button.classList.remove("disableButton");
}

function markAsInvalid(field)
{
    field.classList.add("invalidInput");
}

function unmarkAsInvalid(field)
{
    field.classList.remove("invalidInput");
}

//For validating numeric and text field
function validateInput(button,textField,listOfValidInputs)
{   
    let value = this.value;
    for(let i of value.split(""))
    {
       
        if(!listOfValidInputs.includes(i))
        {   
            disableButton(button);
            markAsInvalid(this);
            this.value = this.value.replace(i,"");
            return;
        }
        else
        {   
            unmarkAsInvalid(this);
          
        }

    }
      //For loan numeric field
    if(textField===undefined)
    {
        enableButton(button);
        return;
    }
    
    if(!textField.classList.contains("invalidInput") && textField.value!=="")
    {
        enableButton(button);
    }
    else
    {
        disableButton(button);
    }
    
}


// For validating keyup type event on textfields, as empty textfields behaive different
function validateEmptyField(button,event)
{
    if(event.key==="Tab" && this.value==="")
    {
        return;
    }
    if(this.value==="")
    {
        markAsInvalid(this);
        disableButton(button); 
                
    }
}

//Function for a date format:
function getFormattedDate(d)
{
    let day = String(d.getDate()).padStart(2,"0");
    let month = String(d.getMonth()).padStart(2,"0");
    let year = d.getFullYear();

    return(`${day}/${month}/${year}`);
}

//To get the transactions array of the current user.


mainTime.textContent = "As of " + getFormattedDate(new Date());
 

//adding event listener blur to numeric text fields
numericFields.forEach(function(field)
{
    field.addEventListener("blur", unmarkAsInvalid.bind(field, field));
});

//adding event listener blur to text fields
textFields.forEach(function(field)
{
    field.addEventListener("blur", unmarkAsInvalid.bind(field, field));
});

//setting all buttons to disabled by default
processButtons.forEach(function(button)
{
    disableButton(button);
});

// for dynamic div elements to show the transactions
function showTransactions()
{
    mainTransactions.innerHTML="";

    for(let i = transactions.length-1; i>=0; i--)
    {
        const transactionRow = document.createElement('div');
        transactionRow.classList.add("transaction-row");
        const withdrawlOrDeposit = transactions[i].amount<0 ?("WITHDRAWL"):("DEPOSIT");
    
        transactionRow.innerHTML = `
            <div id="info">
            <span id="totalTransactions" class="${withdrawlOrDeposit}">${i+1} ${withdrawlOrDeposit} </span>
            
            <span id="transactionDate">${getFormattedDate(transactions[i].time)}</span> 
            </div>
            <span id="amount">${transactions[i].amount} $</span>
        `;
    
        mainTransactions.append(transactionRow);
    
    }    
    

}

//Validating text field for input event
textFields[0].addEventListener("input", validateInput.bind(textFields[0],processButtons[0],numericFields[0],listOfValidCharacters));

textFields[1].addEventListener("input",validateInput.bind(textFields[1],processButtons[2],numericFields[2],listOfValidCharacters));



//text field empty field validation
textFields[0].addEventListener("keyup",function(e)
{
    validateEmptyField.call(textFields[0],processButtons[0],e);
});

textFields[1].addEventListener("keyup",function(e)
{
    validateEmptyField.call(textFields[1],processButtons[2],e);
});

//adding event listener input to numeric text fields
numericFields[0].addEventListener("input",validateInput.bind(numericFields[0],processButtons[0],textFields[0],listOfValidNumbers));

numericFields[1].addEventListener("input",validateInput.bind(numericFields[1],processButtons[1],undefined,listOfValidNumbers));

numericFields[2].addEventListener("input",validateInput.bind(numericFields[2],processButtons[2],textFields[1],listOfValidNumbers));

//adding event listener keyup to numeric text fields to check empty fields
for(let i = 0; i<3; i++)
{
    numericFields[i].addEventListener("keyup",function(e)
    {
        validateEmptyField.call(numericFields[i],processButtons[i],e);

    });
}


// Working on buttons :
//button transfer
processButtons[0].addEventListener("click",function()
{
    let nameFromUser = textFields[0].value;
    if(currUser.currentBalance < +numericFields[0].value)
    {
        alert("Low balance. Cannot process request");
        return;
    }
    if(+numericFields[0].value===0)
    {
        alert("Enter some amount.");
        return;
    }
    if(nameFromUser===currUser.userName)
    {
        alert("Its like putting money from one pocket to another. Try for loan.");
        return;
    }
    for(let user of users)
    {   
        if(user.userName===nameFromUser)
        {  
            currUser.currentBalance = currUser.currentBalance -numericFields[0].value;  
            user.transactions.push({amount:numericFields[0].value,
            time:new Date()});
            user.currentBalance = user.currentBalance + +numericFields[0].value;
            alert(`Successfully transfered ${numericFields[0].value} to ${nameFromUser}.` );
                
            transactions.push({amount:-numericFields[0].value,time:new Date()});
            textFields[0].value="";
            numericFields[0].value="";
                
            balance.textContent = currUser.currentBalance;
            disableButton(processButtons[0]);

            showTransactions();
            return;
        }

    }

    alert("No such user found");
    
});

//button loan
processButtons[1].addEventListener("click",function()
{   
    if(currUser.currentBalance*0.1 >= +numericFields[1].value)
    {
        alert("Loan APPROVED.");
        currUser.currentBalance = currUser.currentBalance + 
        +numericFields[1].value;
        balance.textContent = currUser.currentBalance;
        transactions.push({amount:+numericFields[1].value,time:new Date()});
        showTransactions();
        numericFields[1].value="";
        disableButton(processButtons[1]);

        return;
    }

    alert("Sorry, loan REJECTED!");
    
});

//close account
//deleting the currently logged in user 
processButtons[2].addEventListener("click",function()
{

    let userFromTextField = textFields[1].value;
    let passwordFromTextField = +numericFields[2].value;
    
    if(currUser.userName===userFromTextField)
        {
            if(currUser.password===passwordFromTextField)
            {
                users.splice(users.indexOf(currUser),1);
                alert(`User ${currUser.userName} deleted successfully.`);
                textFields[1].value="";
                numericFields[2].value="";
                disableButton(processButtons[2]);
                main.style.opacity=0;
                document.querySelector(".header h4").textContent="Log in to get started";
            }
            else
            {
                alert(`Password does not match for ${currUser.userName}.`)
            }
            
            return;

        }

    alert(`user name does not match.`);
});



sortButton.addEventListener("click", function()
{
    // transactions.sort((a,b)=> a.amount - b.amount);
   let firstAmount = transactions[0].amount;
    let LastAmount = transactions[transactions.length-1].amount;
   transactions.sort(function(a,b)
    {
        if(firstAmount>=LastAmount)
        {
            return (a.amount - b.amount);

        }
        else
        {
            return (b.amount - a.amount);

        }
    });

    console.log( "First " + transactions[0].amount);
    console.log("Last " + transactions[transactions.length-1].amount);
    showTransactions();
});

function updateCountDownDisplay(minutes,seconds)
{
    timerDisplay.textContent = `${minutes.toString().padStart(2,0)}:${seconds.toString().padStart(2,0)}`;

}

function startCountDown()
{
    let minutes = 10;
    let seconds = 0;

    updateCountDownDisplay(minutes,seconds);


    const countDownInterval = setInterval(function()
    {
        seconds--;
        
        if(seconds===-1)
        {
            seconds=59;
            minutes--;

        }

        updateCountDownDisplay(minutes,seconds);

        if(minutes===0 && seconds===0)
        {   
            main.style.opacity=0;
            main.style.transition="all 1s"
            document.querySelector(".header h4").textContent="Log in to get started";
            clearInterval(countDownInterval);
        }
    },1000);
}


// Script for responsiveness

const menuButton  = document.querySelector(".menuButton");
const dropLayer =  document.querySelector(".dropLayer"); 
const header  = document.querySelector(".header");

menuButton.addEventListener("click",function()
{   
    if(dropLayer.style.display === "block")
    {
        dropLayer.style.display = "none";
        header.style.display = "none";
    }
    else
    {
        dropLayer.style.display = "block";
        header.style.display = "flex";
    }
    
});


dropLayer.addEventListener("click",function()
{   
    dropLayer.style.display = "none";
    header.style.display = "none";
    
});

