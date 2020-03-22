// chiave movie DB d87d7ade57c8a0d41eff8b91d540d707
// https://api.themoviedb.org/3/search/movie?api_key=d87d7ade57c8a0d41eff8b91d540d707&query=ritorno+al+fut

$("button").click(function(){
    var inputFilm = $("#ricerca").val(); // prendo il valore del INPUT ricerca
    var linguaIta = "it-IT"; // variabile linguaB
    var dataBaseFilm = "https://api.themoviedb.org/3/search/movie";
    var dataBaseSerie = "https://api.themoviedb.org/3/search/tv";

    $('#ricerca').val(''); // cancello subito dopo il campo ricerca
    getFilm(inputFilm, linguaIta, dataBaseFilm); // cerca FILM
    getFilm(inputFilm, linguaIta, dataBaseSerie); // poi Serie
    $(".gabbia").html(""); // ci permette di rifare le ricerche senza aggiornare

});

$("#ricerca").keypress(function(event){ // se siamo dentro l'INPUT e clicclo enter allora fai funzione INVIA MESSAGGIO
    if (event.keyCode == 13) {
        var inputFilm = $("#ricerca").val(); // prendo il valore del INPUT ricerca
        var linguaIta = "it-IT"; // variabile linguaB
        var dataBaseFilm = "https://api.themoviedb.org/3/search/movie";
        var dataBaseSerie = "https://api.themoviedb.org/3/search/tv";

        $('#ricerca').val(''); // cancello subito dopo il campo ricerca
        getFilm(inputFilm, linguaIta, dataBaseFilm); // cerca FILM
        getFilm(inputFilm, linguaIta, dataBaseSerie); // poi Serie
        $(".gabbia").html(""); // ci permette di rifare le ricerche senza aggiornare
    }
});

$(".fa-grip-lines").click(function(){
    $(".slide").slideToggle();
    $(this).toggleClass('ruota'); //riapro quello che ho cliccato
});

var source =  $('#template-film').html();  // con JQ inserisco ID template creato in HTML
var template = Handlebars.compile(source);   // HB lo gestisce

var source =  $('#template-placeholder').html();  // con JQ inserisco ID template creato in HTML
var templatePlace = Handlebars.compile(source);   // HB lo gestisce

//FUNZIONI
function getFilm(inputF, lingua, database){
    $.ajax({
        url: database,
        data: {
            api_key: "d87d7ade57c8a0d41eff8b91d540d707",
            query: inputF,
            language: lingua
        },
        method: "GET",
        success: function (data) {
            // console.log(data); // il contenuto della risposta
            // console.log(data.results); // il contenuto di results
            var films = data.results; // assegno FILMS al plurale
            for (var i = 0; i < films.length; i++) { // ciclo su tutto l'arrey di risposta e assegno il singolo FILM
                var film = films[i];
                // console.log(this); // sono i film ricercati
                $(this).each(function(){ // cuciamo dentro gli oggetti e assegno ad un ogg le chiavi che mi interessano
                    // console.log(filmTemplate.voto); // stampo i voti dei film cercati
                    var valutazioneStelle = getStar(film.vote_average);
                    // console.log(valutazioneStelle);
                    var stelle = ''; // creo Var stelle vuota
                    for (var i = 1; i <= 5; i++) { // faccio 5 cicli = al numero di stelline
                        // console.log(i);
                        if (i <= valutazioneStelle) { // fino a che i è min o ug alla valutazione stampa stellina piena
                            var stella = '<i class="fas fa-star"></i>';
                        } else {
                            var stella = '<i class="far fa-star"></i>'; // dopo  stampa stellina vuota
                        }
                        stelle += stella; // aggiunge alla var stelle le icone uno accanto all'altra con +=
                    }
                    // console.log(stella);

                    var codiceLingueApi = film.original_language; // dato di risposta Api
                    var lingue = [
                        {
                            lingua: "en",
                            bandiera: '<img src="https://www.countryflags.io/gb/flat/64.png">'

                        },
                        {
                            lingua: "it",
                            bandiera: '<img src="https://www.countryflags.io/it/flat/64.png">'

                        },
                        {
                            lingua: "de",
                            bandiera: '<img src="https://www.countryflags.io/de/flat/64.png">'

                        },
                        {
                            lingua: "fr",
                            bandiera: '<img src="https://www.countryflags.io/fr/flat/64.png">'

                        },
                        {
                            lingua: "zh",
                            bandiera: '<img src="https://www.countryflags.io/ch/flat/64.png">'

                        },
                        {
                            lingua: "ja",
                            bandiera: '<img src="https://www.countryflags.io/jp/flat/64.png">'

                        },
                        {
                            lingua: "ru",
                            bandiera: '<img src="https://www.countryflags.io/ru/flat/64.png">'

                        },
                        {
                            lingua: "pt",
                            bandiera: '<img src="https://www.countryflags.io/pt/flat/64.png">'

                        },
                        {
                            lingua: "es",
                            bandiera: '<img src="https://www.countryflags.io/es/flat/64.png">'

                        }
                    ];
                    var bandieraCheck = '<img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Missing_flag.png">';
                    for (var i = 0; i < lingue.length; i++) {
                        var linguaggio = lingue[i];
                        // console.log(linguaggio); // stampo oggetto che contiene lingua e bandiera
                        var codiceLingua = linguaggio.lingua;
                        // console.log(linguaggio.lingua); // stampo oggetti
                        var bandieraImg = linguaggio.bandiera;
                        // console.log(linguaggio.bandiera); // stampo chiavi oggetto
                        if (codiceLingueApi == codiceLingua) {
                            bandieraCheck = bandieraImg; // senza VAR perchè richiamiamo una VAR universale
                        }

                    }

                    var iesimeLocandine = film.poster_path; // assegno VAR iesima locandina
                    var imgCompleta = "https://image.tmdb.org/t/p/w342/" + iesimeLocandine; // aggiungo URL per rendere IMG completa
                    console.log(imgCompleta);
                    console.log(iesimeLocandine);
                        if (iesimeLocandine == null) { // se iesimaLoc non ha riposta
                            imgCompleta = 'https://critics.io/img/movies/poster-placeholder.png'; // rendo l'img completa un placeholder
                        }

                    var filmSerieTemplate = {
                        locandina: imgCompleta, // chiave = alla chive poster raggiunta con il dot notation (oggetti)
                        titolo: film.title,
                        titoloOriginale: film.original_title,
                        linguaOriginale: bandieraCheck,
                        dataRilascio: film.release_date,
                        valutazione: film.vote_average,
                        genere: film.genre_ids,
                        voto: stelle,
                        overview: film.overview,
                        titoloSerie: film.name,
                        titoloSerieOriginale: film.original_name

                    };

                    var templatePop = template(filmSerieTemplate); // popolo con il template con le le chiavi degli oggetti(album)
                    $(".gabbia").append(templatePop); // inseriamo il ns Template popolato nell HTML

                });
            };
        },
        error: function() {
            alert("ERRORRRRRRRRRRRRRRRRRR");
        }
    });
};

function getStar(votoRitorno) {
    var valutazioneStel = Math.ceil(votoRitorno / 2);
    return valutazioneStel;
};
