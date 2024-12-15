function sonAnagramas(palabra1, palabra2) {
    if (palabra1 === palabra2) return false;

    const ordenarPalabra = (palabra) => palabra.split('').sort().join('');
    
    return ordenarPalabra(palabra1) === ordenarPalabra(palabra2);
}

// Ejemplo de uso
console.log(sonAnagramas("amor", "roma")); // true
console.log(sonAnagramas("amor", "amor")); // false
console.log(sonAnagramas("amor", "mora")); // true
console.log(sonAnagramas("amor", "rama")); // false