function Question(soruMetni, cevapSecenekleri, dogruCevap) {
    this.soruMetni = soruMetni;
    this.cevapSecenekleri = cevapSecenekleri;
    this.dogruCevap = dogruCevap;
}
Question.prototype.cevabiKontrolEt = function(cevap) {
    return cevap === this.dogruCevap;
}


let sorular = [
    new Question("1-Hangisi js paket yönetim uygulamasıdır?" ,
        {a:"Node.js", b:"Typscript", c:"Npm",d:"Nuget"},"c"),
    new Question("2-Hangisi .net paket yönetim uygulamasıdır?" ,
        {a:"Node.js", b:"Nuget", c:"Npm",d:"Typscript"},"b"),
    new Question("3-Hangisi javascript paket yönetim uygulamasıdır?" ,
        {a:"Npm", b:"Typscript", c:"Node.js",d:"Blank"},"a"),
    new Question("4-Hangisi javascript paket yönetim uygulamasıdır?" ,
        {a:"Typscript", b:"Npm", c:"Node.js",d:"Nuget"},"b")
];
