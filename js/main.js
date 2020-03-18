// chiave movie DB d87d7ade57c8a0d41eff8b91d540d707
// https://api.themoviedb.org/3/search/movie?api_key=d87d7ade57c8a0d41eff8b91d540d707&query=ritorno+al+fut

$("button").click(function(){
    var inputFilm = $("#ricerca").val(); // prendo il valore del INPUT ricerca
    var linguaIta = "it-IT"; // variabile lingua
    $('#ricerca').val(''); // cancello subito dopo il campo ricerca
    getFilm(inputFilm, linguaIta);
});























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
            console.log(data.results); // il contenuto di results
            var films = data.results; // assegno FILMS al plurale
            for (var i = 0; i < films.length; i++) { // ciclo su tutto l'arrey di risposta e assegno il singolo FILM
                var film = films[i];
                // console.log(this); // sono i film ricercati
                $(this).each(function(){ // cuciamo dentro gli oggetti e assegno ad un ogg le chiavi che mi interessano
                    var filmTemplate = {
                        locandina: film.poster_path, // chiave = alla chive poster raggiunta con il dot notation (oggetti)
                        titolo: film.title,
                        titoloOriginale: film.original_title,
                        linguaOriginale: film.original_language,
                        dataRilascio: film.release_date,
                        voto: film.vote_average,
                        genere: film.genre_ids

                    };
                    console.log(filmTemplate);
                });
            };
        },
        error: function() {
            alert("ERRORRRRRRRRRRRRRRRRRR");
        }
    });
};
