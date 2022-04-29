const arrowGetEvents = async () => { //Foi criada para realizar um passo a passo e que sejam rodados de maneiras assincrona.
    try{
        const response = await fetch('https://xp41-soundgarden-api.herokuapp.com/events')

        const data = await response.json();

        return data;

    } catch (error) {
        console.error(error)
    }
}

const elementosEditar = (eventsArray) =>{
    eventsArray.forEach((event, index) => {
        
        const corpoDaTabela = document.querySelector('#corpo')
        
        const trTabela = document.createElement('tr');

        const thTabela = document.createElement('th');
        thTabela.innerText = index + 1; //para começar do 1

        const primeiroElementoTd = document.createElement('td');
        const datas = event.scheduled.substring(0, 10).replaceAll('-', '/'); //corta os elementos do datas e tem como parametro o primeiro que vai começar e o ultimo que vai terminar
        const tempo = event.scheduled.substring(11, 16); //cortar o tempo antes das 11 horas e depois dos 16 minutos
        primeiroElementoTd.innerText = datas + " " + tempo;
        
        const segundoElementoTd = document.createElement('td');
        segundoElementoTd.innerText = event.name;

        const terceiroElementoTd = document.createElement('td');
        terceiroElementoTd.innerText = event.attractions.join(', '); //especifica uma coisa para separar cada elemento
        
        const quartoElementoTD = document.createElement('td')
        quartoElementoTD.style.display = 'flex';
        quartoElementoTD.style.flexWrap = 'wrap';
        quartoElementoTD.style.justifyContent = 'flex-end';

        const primeiroA = document.createElement('a');
        primeiroA.innerText = "Ver Reservas";
        primeiroA.classList.add('btn');
        primeiroA.classList.add('btn-dark');

        const segundoA = document.createElement('a');
        segundoA.innerText = "Editar";
        segundoA.classList.add('btn');
        segundoA.classList.add('btn-secondary');
        segundoA.setAttribute('href', ('editar-evento.html?id=' + event._id));

        const terceiroA = document.createElement('a');
        terceiroA.innerText = "Excluir";
        terceiroA.classList.add('btn');
        terceiroA.classList.add('btn-danger');
        terceiroA.setAttribute('href', ('excluir-evento.html?id=' + event._id));
        
        quartoElementoTD.append(primeiroA, segundoA, terceiroA);
        trTabela.append(thTabela, primeiroElementoTd, segundoElementoTd, terceiroElementoTd, quartoElementoTD);

        corpoDaTabela.appendChild(trTabela);
    })
}

async function main() { // utilizado para returnar os dados atualizados pra API
    try{
        const eventsArray = await arrowGetEvents();
         console.log(eventsArray);
        elementosEditar(eventsArray);
    } catch (error) {
        console.error(error)
    }
}

main();


// const linkEditarEvento = document.querySelectorAll('.filhos  a:nth-child(2)');

// linkEditarEvento.forEach((button) => {
//     button.href = "editar-evento.html";
// }) 

// console.log(linkEditarEvento);

