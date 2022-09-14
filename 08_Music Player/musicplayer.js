class Musicplayer {
    constructor(musicList) {
        this.musicList = musicList;
        this.index = 0;
    }

    getMusic() {
        return musicList[this.index];
    }

    next() {
        if(this.index + 1 < this.musicList.length) {
            this.index++;
        }else {
            this.index = 0; // TODO: index music.length 'de iken next yaparsak sondan sıfıra geçecek!
        }

    }

    prev() {
        if(this.index != 0) {
            this.index--;
        }else { // TODO: index 0 'da iken previous yaparsak sıfırdan sona geçecek!
            this.index = this.musicList.length - 1;
        }
    }

    reset() {
        this.index = 0;
    }

}