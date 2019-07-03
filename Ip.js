async function Ip() { //async et await doivent etre utiliser comme ca pour fetch (il permettent de rendre une methode synchrone)
    var ip = await fetch(`http://api.ipify.org?format=json`)
        .then(reponse => reponse.json())
        .then(json => json.ip)
    return ip;
}