var models = [
    {
        name : 'bmw 216d',
        image :'img/bmw.jpg',
        link:
            'http://www.arabalar.com.tr/bmw/2-serisi/2022/216d-1-5-active-tourer'
    },
    {
        name : 'honda eco elegance',
        image :'img/honda.jpg',
        link:
            'http://www.arabalar.com.tr/honda/civic/2022/1-5-eco-elegance-cvt'
    },
    {
        name : 'mazda sky motion',
        image :'img/mazda.jpg',
        link:
            'http://www.arabalar.com.tr/mazda/cx-3/2017/1-5-sky-d-motion'
    },
    {
        name : 'skoda elite dsg',
        image :'img/skoda.jpg',
        link:
            'http://www.arabalar.com.tr/skoda/kamiq/2022/1-0-elite-dsg'
    },
    {
        name : 'volvo t3 momentum',
        image :'img/volvo.jpg',
        link:
            'http://www.arabalar.com.tr/volvo/xc40/2020/1-5-t3-momentum'
    },
]

var index = 0;
const slaytCount = models.length;

var settings = {
    duration : 1000,
    random : true
}

var interval;



init(settings); // for random index


document.querySelector("i.fa-arrow-circle-left").addEventListener("click", () => {
    index--;
    showSlide(index);
});

document.querySelector("i.fa-arrow-circle-right").addEventListener("click", () => {
   index++;
   showSlide(index);
});

document.querySelectorAll("i").forEach(function (item) {

        item.addEventListener("mouseenter", function () {
            clearInterval(interval);
        })

        item.addEventListener("mouseleave", function () {
            init(settings);
        })
})



function init(Settings) {
    /** The setInterval() method, repeatedly calls a function or executes a code snippet,
     * with a fixed time delay between each call
     */
    var prev;
    interval = setInterval(function () {
        if (Settings.random){
            do { // bir kere çalısacak eger prev ile  eşitse tekrar çalışır.
                index = Math.floor(Math.random() * slaytCount );
            }while (prev == index)
            prev = index
        }else{ // artan index
            index++;
        }
        showSlide(index);
    },Settings.duration);
}


function showSlide(i) {
    index = i;
    if (index < 0){
        index= slaytCount-1;
    }else if(i == slaytCount){
        index = 0;
    }

    document.querySelector(".card-title").textContent = models[index].name;
    document.querySelector(".card-img-top").setAttribute("src",models[index].image);
    document.querySelector(".card-link").setAttribute("href",models[index].link);
}
