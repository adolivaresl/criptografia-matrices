function evaluate(password) {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:',.<>?/`~";

    // CÁLCULO DE ENTROPÍA
    const N = characters.length;
    const L = password.length;
    const entropy = Math.log2(Math.pow(N, L)); // Entropía: E = log2(N**L)

    // Nivel de seguridad basado en entropía
    let securityLevel = '';
    if (entropy < 40) {
        securityLevel = 'Baja Seguridad: contraseña fácilmente descifrable';
    } else if (entropy >= 40 && entropy <= 59) {
        securityLevel = 'Moderada: aceptada para usos comunes, pero no recomendada para alta seguridad';
    } else if (entropy >= 60 && entropy <= 79) {
        securityLevel = 'Alta: adecuada para propósitos críticos con riesgos medios';
    } else {
        securityLevel = 'Muy Alta: considerada robusta, ideal para aplicaciones críticas';
    }

    // Simulación de fuerza bruta
    function bruteForce(password) {
        const startTime = performance.now(); // Inicio de tiempo
        const containerResult = document.getElementById("result");
        let totalAttempts = 0;
        let current = "";
        let i = 0;
        let searchCharacter = true; // Inicialmente asumimos que puede encontrar cada carácter

        while (i < password.length && searchCharacter) {
            searchCharacter = false; // Reiniciar para cada carácter
            for (let j = 0; j < characters.length; j++) {
                totalAttempts++;
                if (characters[j] === password[i]) {
                    current += characters[j];
                    searchCharacter = true; // Caracter encontrado
                    break;
                }
            }

            if (searchCharacter) {
                i++; // Pasar al siguiente carácter
            } else {
                break; // Interrumpir si un carácter no se encuentra
            }
        }

        const elapsedTime = (performance.now() - startTime) / 1000; // Tiempo total al finalizar

        // Mostrar resultados en HTML
        if (searchCharacter && i === password.length) {
            containerResult.innerHTML = `
                <ul class="list-group">
                    <li class="list-group-item"><strong>Entropía de la contraseña:</strong> ${entropy.toFixed(2)} bits</li>
                    <li class="list-group-item"><strong>Nivel de seguridad:</strong> ${securityLevel}</li>
                    <li class="list-group-item"><strong>Clave encontrada:</strong> ${current}</li>
                    <li class="list-group-item"><strong>Intentos realizados:</strong> ${totalAttempts} intentos para encontrar la clave</li>
                    <li class="list-group-item"><strong>Tiempo que tomó encontrar la contraseña:</strong> ${elapsedTime.toFixed(4)} segundos</li>
                </ul>
            `;
        } else {
            containerResult.innerHTML = `
            <ul class="list-group">
                <li class="list-group-item"><strong>La búsqueda se detuvo:</strong></li>
                <li class="list-group-item">El carácter '${password[i]}' no se encontró en la matriz.</li>
                <li class="list-group-item"><strong>Intentos hasta el momento:</strong> ${totalAttempts}</li>
                <li class="list-group-item"><strong>Tiempo transcurrido:</strong> ${elapsedTime.toFixed(3)} segundos</li>
            </ul>
            `;
        }
    }

    bruteForce(password);
}

// Evento al presionar el botón para evaluar la contraseña
document.getElementById("evaluate-password").addEventListener('click', (e) => {
    e.preventDefault();
    const userPassword = document.getElementById("userPassword").value;

    if (userPassword.length === 0) {
        document.getElementById("errorMessage").innerHTML = "No podemos evaluar, ingresa una clave";
    } else {
        document.getElementById("errorMessage").innerHTML = ""; // Limpiar mensajes de error anteriores
        evaluate(userPassword);
    }
});