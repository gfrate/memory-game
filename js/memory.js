var icone = ['😂', '😇', '😂', '😁', '🤔', '🤔', '🥺', '😎', '😁', '😎', '🥺', '😇', '😃', '😭', '😃', '😳', '😭', '😳', '🤥', '🥶', '🤥', '🥶', '🥳', '🥳'];

function shuffleArray(arr) {
    var i = arr.length;
    var temp, random;
    while (i !== 0) {
        random = Math.floor(Math.random() * i);
        i--;
        temp = arr[i];
        arr[i] = arr[random];
        arr[random] = temp;
    }
    return arr;
}

function getCookie(nomeCookie) {
    let nome = nomeCookie + "=";
    let cookieDecodificato = decodeURIComponent(document.cookie);
    let splittedCookie = cookieDecodificato.split(';');
    for (let i = 0; i < splittedCookie.length; i++) {
        let x = splittedCookie[i];
        while (x.charAt(0) == ' ') {
            x = x.substring(1);
        }
        if (x.indexOf(nome) == 0) {
            return (x.substring(nome.length, x.length));
        }
    }
    return "";
}

function setCookie(hCookie, mCookie, sCookie, durataCookie) {
    const d = new Date();
    d.setTime(d.getTime() + (durataCookie * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = "h=" + hCookie + ";" + expires + ";path=/";
    document.cookie = "m=" + mCookie + ";" + expires + ";path=/";
    document.cookie = "s=" + sCookie + ";" + expires + ";path=/";
}

function controllaCookie(hCookie, mCookie, sCookie) {
    if (hCookie == "" && mCookie == "" && sCookie == "") {
        setCookie(0, 0, 0, 30);
    }
}

function controllaRecord(hNew, mNew, sNew) {
    hOld = getCookie('h');
    mOld = getCookie('m');
    sOld = getCookie('s');
    $('#rigioca').show();
    if (hNew <= hOld) {
        if (mNew <= mOld) {
            if (sNew < sNew) {
                setCookie(hNew, mNew, sNew, 30);
                $('#record').text('Vecchio Record: ' + hOld + ' h ' + mOld + ' m ' + sOld +
                    ' s\t' + 'Nuovo Record: ' + hNew + ' h ' + mNew + ' m ' + sNew + ' s')
            }
        }
    }
}

function getRecord(hRecord, mRecord, sRecord) {
    $('#record').text('Record: ' + hRecord + ' h ' + mRecord + ' m ' + sRecord + ' s');
}

function iniziaGioco() {
    var shuffledArray = shuffleArray(icone);
    $("#field").empty();
    for (var i = 0; i < shuffledArray.length; i++) {
        $('#field').append('<div class="card"></div>');
        $(".card:last").append('<div class="card-inner"></div>');
        $('.card-inner:last').append('<div class="card-front"></div>');
        $('.card-front:last').append('<img src="images/logo.png" alt="logo" class="logo">');
        $('.card-inner:last').append('<div class="card-back"></div>');
        $('.card-back:last').append('<p class="testo"></p>');
        $('p:last').text(shuffledArray[i]);
    }
}

var secondi = 0, minuti = 0, ore = 0;
function creaTimer() {
    timer = setInterval(function () {
        $('#primoTitolo').text('Tempo: ' + ore + ' h ' + minuti + ' m ' + secondi + ' s');
        secondi++;
        if (secondi == 60) {
            minuti++;
            secondi = 0;
        }
        if (minuti == 60) {
            ore++;
            minuti = 0;
        }
    }, 1000);
}

var secondiRimanenti = 0, minutiRimanenti = 0, oreRimanenti = 0;
function azzeraTimer() {
    oreRimanenti = ore;
    minutiRimanenti = minuti;
    secondiRimanenti = secondi;
    clearInterval(timer);
}

$(function () {
    var h = getCookie('h');
    var m = getCookie('m');
    var s = getCookie('s');
    controllaCookie(h, m, s)
    getRecord(h, m, s);
    iniziaGioco();
    creaTimer();
    var firstCard = null;
    var secondCard = null;
    var counter = 0;
    $('.card').on("click", function () {
        if ($(this).hasClass('mostra')) {
            return;
        }

        $(this).addClass('mostra');

        if (!firstCard) {
            firstCard = $(this);
        } else {
            secondCard = $(this);
            if (firstCard.find('.card-inner .card-back .testo').text() === secondCard.find('.card-inner .card-back .testo').text()) {
                firstCard = null;
                secondCard = null;
                counter += 2;
                if (counter == icone.length) {
                    azzeraTimer();
                    controllaRecord(oreRimanenti, minutiRimanenti, secondiRimanenti);
                    $('#primoTitolo').text("Congratulazioni, il tuo tempo è " + oreRimanenti + ' h ' + minutiRimanenti + ' m ' + secondiRimanenti + ' s');
                }
            } else {
                let firstCardAttuale = firstCard;
                let secondCardAttuale = secondCard;
                firstCard = null;
                secondCard = null;
                setTimeout(function () {
                    firstCardAttuale.removeClass('mostra');
                    secondCardAttuale.removeClass('mostra');
                }, 800);
            }
        }
    })

    $('#rigioca').on("click", function () {
        location.reload();
    })
});

