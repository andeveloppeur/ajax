/**
 * Codons un chat en HTML/CSS/Javascript avec nos amis PHP et MySQL
 */

/**
 * Il nous faut une fonction pour récupérer le JSON des
 * messages et les afficher correctement
 */
function getMessages() {
    // 1. Elle doit créer une requête AJAX pour se connecter au serveur, et notamment au fichier handler.php
    var requeteAjax = new XMLHttpRequest();
    requeteAjax.open("GET", "handler.php");

    // 2. Quand elle reçoit les données, il faut qu'elle les traite (en exploitant le JSON) et il faut qu'elle affiche ces données au format HTML
    requeteAjax.onload = function() {
        var resultat = JSON.parse(requeteAjax.responseText); //restultat sera un tableau qui contient des objet pour le voir faire console.log(resultat)
        //console.log(requeteAjax.responseText);
        var html = resultat.reverse().map(lesMsg()).join(''); //bouclé tous les objet et les transformer au format html et le point join permet de coller tous les elements du tableau avec "" (rien) pour que toute les div soient collée et le reverse() permet de renversé le tableau message pour avoir les dernier message en bas
        function lesMsg(message) { //les mettre dans la div
            return `<div class="message">
          <span class="date">${message.created_at.substring(11, 16)}</span>
          <span class="author">${message.author}</span> : 
          <span class="content">${message.content}</span>
         </div>`
        } //on a utiliser substring(11, 16) pour prendre juste l heure et la minute



        var messages = document.querySelector('.messages');

        messages.innerHTML = html; //on injecte toutes les div dans la div de class message
        messages.scrollTop = messages.scrollHeight; //le scroll sera directement en bas
    }

    // 3. On envoie la requête
    requeteAjax.send();
}

/**
 * Il nous faut une fonction pour envoyer le nouveau
 * message au serveur et rafraichir les messages
 */
document.querySelector('form').addEventListener('submit', postMessage); //pour le boution submit
function postMessage(event) {
    // 1. Elle doit stoper le submit du formulaire
    event.preventDefault();

    // 2. Elle doit récupérer les données du formulaire
    var author = document.querySelector('#author');
    var content = document.querySelector('#content');

    // 3. Elle doit conditionner les données
    var data = new FormData(); //FormData est une classe qui permet de creer des données
    data.append('author', author.value); //pour avoir le $_POST['author']
    data.append('content', content.value);

    // 4. Elle doit configurer une requête ajax en POST et envoyer les données
    var requeteAjax = new XMLHttpRequest();
    requeteAjax.open('POST', 'handler.php?task=write'); //on nvois les données en POST vers handler.php?task=write
    requeteAjax.send(data); //on envoie les 2 $_POST
    requeteAjax.onload = function() { //apres l envoi de la requette
        content.value = '';
        content.focus(); //avoir le focus sur le content
        getMessages(); //pour afficher le msg envoyer
    }


}



/**
 * Il nous faut une intervale qui demande le rafraichissement
 * des messages toutes les 3 secondes et qui donne 
 * l'illusion du temps réel.
 */
var interval = window.setInterval(getMessages, 3000);

getMessages(); //des qu on vient sur la page