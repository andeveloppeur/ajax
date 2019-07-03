function capitalize(str) {
    return str.split(' ').map(mot => mot[0].toUpperCase() + mot.slice(1)).join(' ');
} //capitalize(abdou renvoit Abdou)