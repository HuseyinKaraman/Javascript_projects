const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const repassword = document.getElementById("repassword");
const phone = document.getElementById("phone");


form.addEventListener("submit",(event) => {
    event.preventDefault();     

    checkRequired([username,email,password,repassword,phone]);
    checkEmail(email);
    checkLength(username,7,15);
    checkLength(password,7,12);
    checkPasswords(password, repassword);
    checkPhone(phone);
})

function checkRequired(inputs) {
    inputs.forEach((input) =>{
        if (input.value === "") {
            error(input,`${input.id} is required`);
        }else{
            success(input);
        }
    });
}

const checkEmail = (input) => {
    if (String(input.value).toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )){
        success(input);
    }else{
        error(input," wrong email address")
    }
};

function checkLength(input, min, max) {
    if (input.value.length < min){
        error(input, `${input.id} en az ${min} karakter uzunlugunuda olmalı`)
    }else if (input.value.length > max){
        error(input, `${input.id} en fazla ${max} karakter uzunlugunuda olmalı`)
    }else{
        success(input);
    }
}

function checkPasswords(input1, input2) {
    if (input1.value !== input2.value){
        error(input2, "Parolalar eşleşmiyor");
        error(input1, "Parolalar eşleşmiyor");
    }
}

function checkPhone(input) {
    var expression = /^\d{10}$/;
    if (!expression.test(input.value)){
        error(input,"phone number lenght must be 10 length");
    }
}

function error(input, message) {
    input.className = "form-control is-invalid";
    const div = input.nextElementSibling;
    div.innerText = message;
    div.className = "invalid-feedback";
}

function success(input) {
    input.className = "form-control is-valid";
}

