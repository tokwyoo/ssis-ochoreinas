/* Versión final 10/02/2024*/

var reinasPorColocar = 8;
const celdasInactivas = [];

function colocarReina(celda) {

    tablero = document.getElementById("tablero");
    fila = celda.parentNode.rowIndex;
    columna = celda.cellIndex;

    if (!celda.classList.contains("celdaConReina") && !celda.classList.contains("celdaInactiva") && (reinasPorColocar > 0)) {

        celda.classList.add("celdaConReina");

        reinasPorColocar--;

        // Desactiva fila y columna
        for (let i = 1; i < 9; i++) {

            if (columna !== i) {

                // Agrega la clase celdaInactiva a la celda actual
                tablero.rows[fila].cells[i].classList.add("celdaInactiva");

                // Registra las coordenadas de la celda actual en el array celdasInactivas
                celdasInactivas.push(`${fila} ${i}`);
            }

            if (fila !== i) {
                tablero.rows[i].cells[columna].classList.add("celdaInactiva");
                celdasInactivas.push(`${i} ${columna}`);
            }
        }

        // Desactiva diagonales
        for (let i = -7; i < 9; i++) {

            if (fila + i >= 1 && fila + i < 9 && columna + i >= 1 && columna + i < 9 && i !== 0) {
                tablero.rows[fila + i].cells[columna + i].classList.add("celdaInactiva");
                celdasInactivas.push(`${fila + i} ${columna + i}`);
            }

            if (fila - i >= 1 && fila - i < 9 && columna + i >= 1 && columna + i < 9 && i !== 0) {
                tablero.rows[fila - i].cells[columna + i].classList.add("celdaInactiva");
                celdasInactivas.push(`${fila - i} ${columna + i}`);
            }
        }
    }

    else {

        celda.classList.remove("celdaConReina");

        reinasPorColocar++;

        // Restaura fila y columna
        for (let i = 0; i < 9; i++) {

            if (celdasInactivas.includes(`${i} ${columna}`)) {

                // Encuentra el primer registro de la celda actual en el array celdasInactivas
                index = celdasInactivas.indexOf(`${i} ${columna}`);

                // Elimina el registro anterior 
                // (Nota: Pueden quedar más registros de la celda actual si esta ha sido desactivada más de una vez)
                celdasInactivas.splice(index, 1);

                // Si ya no hay ningún registro de la celda actual en el array celdasInactivas, quita la clase celdaInactiva de la celda actual.
                if (!celdasInactivas.includes(`${i} ${columna}`)) {
                    tablero.rows[i].cells[columna].classList.remove("celdaInactiva");
                }
            }

            if (celdasInactivas.includes(`${fila} ${i}`)) {
                index = celdasInactivas.indexOf(`${fila} ${i}`);
                celdasInactivas.splice(index, 1);

                if (!celdasInactivas.includes(`${fila} ${i}`)) {
                    tablero.rows[fila].cells[i].classList.remove("celdaInactiva");
                }
            }
        }

        // Restaura diagonales
        for (let i = -7; i < 9; i++) {

            if (fila + i >= 0 && fila + i < 9 && columna + i >= 0 && columna + i < 9 && i !== 0) {

                if (celdasInactivas.includes(`${fila + i} ${columna + i}`)) {
                    index = celdasInactivas.indexOf(`${fila + i} ${columna + i}`);
                    celdasInactivas.splice(index, 1)

                    if (!celdasInactivas.includes(`${fila + i} ${columna + i}`)) {
                        tablero.rows[fila + i].cells[columna + i].classList.remove("celdaInactiva");
                    }
                }
            }

            if (fila - i >= 0 && fila - i < 9 && columna + i >= 0 && columna + i < 9 && i !== 0) {

                if (celdasInactivas.includes(`${fila - i} ${columna + i}`)) {
                    index = celdasInactivas.indexOf(`${fila - i} ${columna + i}`);
                    celdasInactivas.splice(index, 1)

                    if (!celdasInactivas.includes(`${fila - i} ${columna + i}`)) {
                        tablero.rows[fila - i].cells[columna + i].classList.remove("celdaInactiva");
                    }
                }
            }
        }
    }

    document.getElementById("contadorDeMovimientos").innerHTML = "<b>" + (8 - reinasPorColocar) + "</b> REINA(S) COLOCADA(S). " + "<b>" + reinasPorColocar + "</b> MOVIMIENTO(S) RESTANTE(S).";
}

function recargaPagina() {
    location.reload();
}
