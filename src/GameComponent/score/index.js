import {getHighScoreTable, getScoreBlock} from "../container";

export let destroyTimer = null;

export function updateHighScore() {
    if(typeof(Storage)!=="undefined"){
        const current = parseInt(getScoreBlock().innerHTML);
        let scores = [];
        if(localStorage["high-scores"]) {

            scores = JSON.parse(localStorage["high-scores"]);
            scores = scores.sort(function(a,b){return parseInt(a) - parseInt(b)});

            for(let i = 0; i < 10; i++){
                let s = parseInt(scores[i]);

                let val = (!isNaN(s) ? s : 0 );
                if(current > val)
                {
                    val = current;
                    scores.splice(i, 0, parseInt(current));
                    break;
                }
            }

            scores.length = 10;
            localStorage["high-scores"] = JSON.stringify(scores);

        } else {
            const scores = [];
            scores[0] = current;
            localStorage["high-scores"] = JSON.stringify(scores);
        }

        initHighScore();
    }
}

export function initHighScore() {
        if(typeof(Storage)!=="undefined"){
            let scores = [];
            if(localStorage["high-scores"]) {
                getHighScoreTable().style.display = "block";
                getHighScoreTable().innerHTML = '';
                scores = JSON.parse(localStorage["high-scores"]);
                scores = scores.sort(function(a,b){return parseInt(a)-parseInt(b)});

                for(let i = 0; i < 10; i++){
                    let s = scores[i];
                    const fragment = document.createElement('li');
                    fragment.innerHTML = (typeof(s) != "undefined" ? s : "" );
                    getHighScoreTable().appendChild(fragment);
                }
            }
        } else {
            getHighScoreTable().style.display = "none";
        }
}

export function initTimeScore() {
    let seconds = 0;
    const el = getScoreBlock();
    function incrementSeconds() {
        seconds += 1;
        el.innerHTML = seconds;
    }
    destroyTimer = setInterval(incrementSeconds, 100);
}