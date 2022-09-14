function UI() {
    this.btn_start = document.querySelector(".btn_start button"),
    this.btn_next = document.querySelector(".btn_next"),
    this.quiz_box = document.querySelector(".quiz_box"),
    this.option_list = document.querySelector(".option_list"),
    this.btn_replay = document.querySelector(".btn_replay"),
    this.btn_quit = document.querySelector(".btn_quit"),
    this.question_index = document.querySelector(".question_index"),
    this.question_text = document.querySelector(".question_text"),
    this.score_box = document.querySelector(".score_box"),
    this.score_text = document.querySelector(".score_text"),
    this.time_text = document.querySelector(".time_text"),
    this.time_second = document.querySelector(".time_second"),
    this.time_line = document.querySelector(".time_line"),
    this.correctIcon =  `<div class="icon"> <i class="fas fa-check"></i></div>`,
    this.incorrectIcon =  `<div class="icon"> <i class="fas fa-times"></i></div>`
}

UI.prototype.soruGoster = function(soru) {

    let question = `<span>${soru.soruMetni}</span>`;
    this.question_text.innerHTML = question;

    let options = ``;
    for (let soruKey in soru.cevapSecenekleri) {
        options += `<div class="option">
                        <span> <b>${soruKey}</b>: ${soru.cevapSecenekleri[soruKey]}</span>
                    </div> `;
    }

    this.option_list.innerHTML = options;
    const option = this.option_list.querySelectorAll(".option");

    for (let opt of option) {
        opt.setAttribute("onclick", "optionSelected(this)");
        // Hangi secenege tıklarsam onun event'i çalışacak ve kendisini parametre olarak gonderdim!
    }

    this.btn_next.classList.remove("show");
}

UI.prototype.soruSayisiniGoster = function(quiz) {
    let sorusayisi = quiz.sorular.length;
    let index = quiz.soruIndex+1;

    this.question_index.innerHTML =
        ` <span class="badge bg-warning">${index} \\ ${sorusayisi}</span>`;
}

UI.prototype.skoruGoster = function (toplamSoru,dogruCevap) {
    ui.score_text.innerText =
        `Toplam ${toplamSoru} sorudan ${dogruCevap} tanesini dogru cevapladınız!`;
}