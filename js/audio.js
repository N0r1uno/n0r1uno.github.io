const audioPlayers = [
    new Audio("./assets/intro.opus"),
    new Audio("./assets/new.opus"),
    new Audio("./assets/ok.opus"),
    new Audio("./assets/focus.opus")
];

function playAudio(n){
    if (n == 0) {
        audioPlayers[n].volume = 0.25;
        audioPlayers[n].play();
        return;
    }
    const cloned = audioPlayers[n].cloneNode(false);
    cloned.addEventListener("ended", () => {cloned.remove();});
    cloned.volume = 0.15;
    cloned.play();
}