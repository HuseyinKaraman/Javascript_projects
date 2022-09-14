const quiz = new Quiz(sorular);
const ui = new UI();

ui.btn_start.addEventListener("click",startQuiz);
document.querySelector(".card-footer button").addEventListener("click",nextQuestion);


ui.btn_replay.addEventListener("click",function () {
    quiz.soruIndex = 0;
    quiz.dogruCevapSayisi = 0;
    ui.score_box.classList.remove("active");
    ui.btn_start.click(); // yada startQuiz();
})

ui.btn_quit.addEventListener("click",function () {
    window.location.reload();
})

function nextQuestion() {
        if (quiz.soruIndex !== (quiz.sorular.length-1) ) {
            quiz.soruIndex++;
            clearInterval(counter); //
            clearInterval(counterLine);
            startTimer(9);
            startTimerLine();
            ui.soruGoster(quiz.soruGetir());
        }else{
            ui.skoruGoster(quiz.sorular.length,quiz.dogruCevapSayisi);
            clearInterval(counter);
            clearInterval(counterLine);
            ui.quiz_box.classList.remove("active");
            ui.score_box.classList.add("active");

        }
    ui.soruSayisiniGoster(quiz);
}
function startQuiz(){
    ui.soruSayisiniGoster(quiz);
        if (quiz.soruIndex !==  quiz.sorular.length ) {
            startTimer(9);
            startTimerLine();
            ui.quiz_box.classList.add("active");
            ui.soruGoster(quiz.soruGetir());
        }else
        {
            console.log("Hiç soru ekli degil!");
        }
}


function optionSelected(option) { // innerhtml! -> function soruGoster
    let cevap = option.querySelector("span b").textContent;
    let soru = quiz.soruGetir();
    let dogruCevap = quiz.sorular[quiz.soruIndex].dogruCevap;

    clearInterval(counter); // bir secenek secildiginde timer'i durduralım!
    clearInterval(counterLine);

    if( soru.cevabiKontrolEt(cevap)) {
        quiz.dogruCevapSayisi++;
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend",ui.correctIcon);
    }else{
        dogruCevabiIsaretle(dogruCevap);
        option.insertAdjacentHTML("beforeend",ui.incorrectIcon);
        option.classList.add("incorrect");
    }

    ui.btn_next.classList.add("show");
    for (let i = 0; i < ui.option_list.children.length ; i++) {
        ui.option_list.children[i].classList.add("disabled"); // see disabled class in css
    }
}

let counter;
function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        ui.time_second.textContent = time--;
        if(time < 0) {
            clearInterval(counter); // timer'i temizleyelim
            ui.time_text.textContent = "Süre Bitti!";

            let dogruCevap = quiz.soruGetir().dogruCevap; // on anki sorunun dogru cevabını alalım!
            dogruCevabiIsaretle(dogruCevap);
            ui.btn_next.classList.add("show");
        }

    }
}

function dogruCevabiIsaretle(dogruCevap) {
    // let opt =  ui.option_list.querySelectorAll(".option"); // Tum option'lar alınır! // bunun yerine:
    let opt =  ui.option_list.children // Tum option'lar alınır! // bunun yerine:

    for (let optChild of opt) {
        if (optChild.querySelector("span b").textContent === dogruCevap) {
            optChild.classList.add("correct");
            optChild.insertAdjacentHTML("beforeend",ui.correctIcon);
        }
        optChild.classList.add("disabled");
    }
}

let counterLine;
    function startTimerLine() {
    let line_width = 500;

    counterLine = setInterval(timer, 20);

    function timer() {
        line_width -= 1;
        ui.time_line.style.width = line_width +"px";

        if (line_width == 0)
            clearInterval(counterLine);
    }
}

