// chiave movie DB d87d7ade57c8a0d41eff8b91d540d707
// https://api.themoviedb.org/3/search/movie?api_key=d87d7ade57c8a0d41eff8b91d540d707&query=ritorno+al+fut

$("button").click(function(){
    var inputFilm = $("#ricerca").val(); // prendo il valore del INPUT ricerca
    var linguaIta = "it-IT"; // variabile lingua
    $('#ricerca').val(''); // cancello subito dopo il campo ricerca
    getFilm(inputFilm, linguaIta);
});

var source =  $('#template-film').html();  // con JQ inserisco ID template creato in HTML
var template = Handlebars.compile(source);   // HB lo gestisce





















//FUNZIONI
function getFilm(inputF, lingua){
    $.ajax({
        url: "https://api.themoviedb.org/3/search/movie",
        data: {
            api_key: "d87d7ade57c8a0d41eff8b91d540d707",
            query: inputF,
            language: "lingua"
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
                    var valutazioneStelle = Math.ceil(film.vote_average / 2);
                    // console.log(valutazioneStelle);
                    var stelle = ''; // creo Var stelle
                    for (var i = 1; i <= 5; i++) { // faccio 5 cicli = al numero di stelline
                        // console.log(i);
                        if (i <= valutazioneStelle) { // fino a che i è min o ug alla valutazione stampa stellina piena
                            var stella = '<i class="fas fa-star"></i>';
                            console.log(stella);
                        } else {
                            var stella = '<i class="far fa-star"></i>'; // dopo  stampa stellina vuota
                            console.log("b");
                        }
                        stelle += stella; // aggiunge le stelle uno accanto all'altra
                    }
                    console.log(stella);
                    var filmTemplate = {
                        locandina: film.poster_path, // chiave = alla chive poster raggiunta con il dot notation (oggetti)
                        titolo: film.title,
                        titoloOriginale: film.original_title,
                        linguaOriginale: film.original_language,
                        dataRilascio: film.release_date,
                        valutazione: film.vote_average,
                        genere: film.genre_ids,
                        voto: stelle
                    };
                    // console.log(filmTemplate);
                    var templatePop = template(filmTemplate); // popolo con il template con le le chiavi degli oggetti(album)
                    $(".gabbia").append(templatePop); // inseriamo il ns Template popolato nell HTML

                });
            };
        },
        error: function() {
            alert("ERRORRRRRRRRRRRRRRRRRR");
        }
    });
};
