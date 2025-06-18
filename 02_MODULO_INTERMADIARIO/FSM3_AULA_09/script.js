function verVelocidade() {

    let velocidade = parseInt(document.getElementById("velocidade").value)

    if (velocidade > 80) {
        document.getElementById("res").innerHTML = `Multado: sua velocidade foi ${velocidade} km/h`
        document.body.style.backgroundColor = "red"
    }

    else {
        document.getElementById("res").innerHTML = `É isso aí, garoto!!! Sua velocidade foi ${velocidade}km/h`
        document.body.style.backgroundColor = "green"
    }

}

function mudaBG(){
    const body = document.body;

    if(!body.classList.contains('invertido')) {
        body.classList.add('invertido');

        body.style.backgroundColor = 'black';
        body.style.color = 'white'

    } else {
        body.classList.remove('invertido');

        body.style.backgroundColor = 'white';
        body.style.color = 'black';
    }
}