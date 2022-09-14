function Quiz(sorular){
    this.sorular = sorular; // Question nesnelerinden oluşan listeyi alacak!
    this.soruIndex = 0;
    this.dogruCevapSayisi = 0;
}
Quiz.prototype.soruGetir = function () {
    return this.sorular[this.soruIndex];
}
