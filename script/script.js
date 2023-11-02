gioco = new Array();

gioco[0] = {
    "video": '<iframe width="1280" height="720" src="https://www.youtube.com/embed/vpTtqVb1vB8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    "img": "img/csgo-thebettingcoach-1024x515.png",
    "text": "<p>Counter-Strike: Global Offensive è uno sparatutto multigiocatore basato sul completamento di obiettivi. La modalità più famosa e giocata è la modalità competitiva. I giocatori in questa modalità non possono scegliere se schierarsi fra i terroristi o fra gli anti-terroristi. La squadra vincitrice sarà quella che, per prima, raggiunge 16 round vinti. È inoltre possibile il pareggio se la partita termina con un punteggio di 15-15.</p>",
    "colore": "#FF000"
};

gioco[1] = {
    "video": '<iframe width="992" height="558" src="https://www.youtube.com/embed/dtV4WKhOycc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    "img": "img/valorant-scoperta-nuovo-sparatutto-tattico-autori-lol-v15-47539.jpg",
    "text": "<p>Valorant è uno sparatutto tattico che vede due squadre di cinque giocatori prendere il controllo di diversi personaggi, che differiscono per caratteristiche e abilità. L'obiettivo del gioco è piazzare un esplosivo in una delle aree preselezionate ed assicurarne la detonazione o di impedire quest'ultima, in base al ruolo della squadra. Le partite sono divise in numerosi round della durata di pochi minuti, con un massimo di 25 scontri per partita.</p>",
    "colore": "#FF000"
};


gioco[2] = {
    "video": '<iframe width="1280" height="720" src="https://www.youtube.com/embed/s-p0TMJ8ej8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe > ',
    "img": "img/warzone.jpeg",
    "text": "<p>Warzone offre due modalità di gioco principali: battaglia reale - alla seconda apparizione nel franchise - e Plunder.La prima modalità è simile ad altri titoli del genere con alcune particolarità presenza fino a 150 giocatori in partita A differenza di altri Battle Royale come Fortnite e Apex Legends dove i giocatori dopo la morte possono essere rianimati attraverso delle piattaforme in Warzone dopo la morte i giocatori uccisi vengono portati nel gulag dove combattono uno contro uno con un altro giocatore sconfitto entrambi dotati delle stesse armi al fine di essere riportato in gioco</p>",
    "colore": "#FF000",
};

gioco[3] = {
    "video": '<iframe width="1280" height="720" src="https://www.youtube.com/embed/dushZybUYnM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    "img": "img/overwatch.jpeg",
    "text": "<p>Il gioco è ambientato sul pianeta Terra intorno all'anno 2070 ma gli eventi della storia incominciarono una trentina d'anni prima, intorno al 2040: negli anni la tecnologia è progredita molto e, tra i settori più avanzati, spiccava in particolare la robotica, con lo sviluppo di intelligenze artificiali realmente senzienti dette Omnic, globalmente diffuse e controllate da centri di informazioni definiti Omnium che ne gestivano la costruzione, l'evoluzione e l'apprendimento.In Overwatch si giocano partite 6 contro 6 in arene sparse per il globo.Il gioco manca di una campagna in giocatore singolo in quanto è stato specificamente sviluppato per un'esperienza di gioco multigiocatore, e gli unici collegamenti con la lore di gioco sono presenti negli sporadici Eventi Archivi, nei quali, in una modalità PvE da quattro giocatori, vengono narrati e vissuti eventi riguardanti la storia di Overwatch. Esistono tre modalità di gioco più una quarta ibrida.</p>",
    "colore": "#FF000"
};

function cambia(scelta) {
    document.getElementById("mainVideo").innerHTML = gioco[scelta].video;
    document.getElementById("testo").innerHTML = gioco[scelta].text;
    document.getElementById("img").src = gioco[scelta].img;
}


function check() {
    var r1 = controllo_nome();
    var r2 = controllo_cognome();
    var r3 = controllo_mail();
    var r4 = controllo_password();

    if (r1 && r2 && r3 && r4) {
        alert("il controllo è andato a buon fine ");
    } else {
        alert("ci sono dei dati errati ");
    }
}

function coloro_arancio(id) {
    document.getElementById(id).style.backgroundColor = "#fcad03";
}

function color_azzurro(id) {
    document.getElementById(id).style.backgroundColor = "#03fcf0";
}

function controllo_nome() {
    var nome;
    nome = document.getElementById("no").value;

    if (nome == "") {
        coloro_arancio("no");
        return false;
    } else {
        color_azzurro("no");
        return true;
    }
}

function controllo_cognome() {
    var cognome;
    cognome = document.getElementById("co").value;

    if (cognome == "") {
        coloro_arancio("co");
        return false;
    } else {
        color_azzurro("co");
        return true;
    }
}

// la mail deve contenere almeno una @
function controllo_mail() {
    var mail;

    mail = document.getElementById("mail").value;

    if (mail == "") {
        coloro_arancio("mail");
        return false;
    } else {
        //? controllo la stringa di testo della mail inserita dall'utente
        //? scorro lo stringa e se trovo il carattere interrompo e restitusco true
        for (i = 0; i < mail.length; i++) {
            if (mail.charAt(i) == "@") {
                color_azzurro("mail");
                return true;
            }
        }
        coloro_arancio("mail");
        return false;
    }
}


function controllo_password() {
    var pwd1 = document.getElementById("p1").value;
    var pwd2 = document.getElementById("p2").value;


    //?  prima controllo la lunghezza delle stringhe , se sono entrambe uguali procedo con il controllo
    //? la  seconda parte del controllo riguarda la lunghezza delle stringhe , la prima password deve essere più lunga di 7 caratteri
    if (pwd1 == pwd2) {

        if (pwd1.length > 7) {
            var check1 = controllo_passw_user(pwd1);
            if (check1 == true) {
                color_azzurro("p1");
                color_azzurro("p2");
                return true;
            }
        }
    }
    coloro_arancio("p1");
    coloro_arancio("p2");
    return false;
}

function controllo_ripetizioni(pwd1) {
    var p1 = pwd1;
}

function controllo_passw_user(pwd1) {
    // dentro user prendo il valore del campo utente

    // il metodo includes restituisce un boolean 
    var user = document.getElementById("no").value;
    if (user == "") {
        alert("Prima devi scegliere il nome utente");
    } else {
        if (pwd1.includes(user) == true) {
            alert("la password non puo contenere il nome utente!!")
            return false;
        } else {
            return true;
        }
    }
}



