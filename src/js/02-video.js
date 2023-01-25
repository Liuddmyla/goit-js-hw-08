import Player from '@vimeo/player';


const iframe = document.querySelector('iframe');
const player = new Player(iframe);
    
const STORAGE_KEY = "videoplayer-current-time";

onCurrentTime();

player.on('timeupdate', onSaveTime);

function onSaveTime(data) {    
    localStorage.setItem(STORAGE_KEY, data.seconds);    
};

function onCurrentTime() {
    const saveTime = localStorage.getItem(STORAGE_KEY);

    if (saveTime) {
        player.setCurrentTime(saveTime);
    }
}
    



