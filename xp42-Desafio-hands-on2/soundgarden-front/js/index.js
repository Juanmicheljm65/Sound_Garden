function ordenarEventos(events) {
    return events.sort((event1, event2) => { return new Date(event1.scheduled) - new Date(event2.scheduled) })
}

function removerEventos(events) {
    return events.filter((event) => {
        return new Date() - new Date(event.scheduled) < 0;
    })
}

function clicarBotao(clickEvent) {
    const button = clickEvent.target;

    const modalLabelSelector = document.querySelector('#ModalLabel');

    modalLabelSelector.innerText = button.dataset.name;

    const reserveButton = document.querySelector('#reserveButton');

    reserveButton.setAttribute('data-id', button.dataset.id);
}

function criarReserva(event) {
    const nome = document.getElementById('nome');

    const email = document.getElementById('email');

    const body = {
        owner_name: nome.value,
        owner_email: email.value,
        number_tickets: 1,
        event_id: event.target.dataset.id
    }

    // console.log(JSON.stringify(body));

    fetch('https://xp41-soundgarden-api.herokuapp.com/bookings', {
        method: "POST",
        headers: {
            accept: "application-json",
            "content-type": "application-json"
        },
        body: JSON.stringify(body)
    }).then(response => console.log(response)).catch(error => console.error(error));

}

function coisarEventos(events) {
    events.forEach(event => {
        const article = document.createElement('article');
        article.classList.add('evento');
        article.classList.add('card');
        article.classList.add('p-5');
        article.classList.add('m-3');

        const h2 = document.createElement('h2');
        const eventName = `${event.name} ${event.scheduled.substring(0, 10).replaceAll('-', '/')}`

        const h4 = document.createElement('h4');
        h4.innerText = event.attractions.join(', ');

        const p = document.createElement('p');
        p.innerText = event.description;

        const linkA = document.createElement('a');
        linkA.classList.add('btn');
        linkA.classList.add('btn-primary');
        linkA.classList.add('btn-toggle-modal')
        linkA.setAttribute('data-toggle', 'modal');
        linkA.setAttribute('data-target', '#exampleModal');
        linkA.setAttribute('data-id', event._id);
        linkA.setAttribute('data-name', event.name);
        linkA.innerText = "reservar ingresso";
        linkA.addEventListener('click', (clickEvent) => clicarBotao(clickEvent));

        const conteinerArticle = document.getElementById('container-eventos');

        article.append(h2, h4, p, linkA);

        conteinerArticle.append(article);
    })

}

function setEventListenerOnModalButton() {
    const botaoReservado = document.getElementById('botaoReservado');

    botaoReservado.addEventListener('click', (event) => criarReserva(event));
}


const arrowGetEvents = async () => {
    try {
        const response = await fetch('https://xp41-soundgarden-api.herokuapp.com/events');
        // console.log(response);

        const data = await response.json();
        // console.log(data);
        return data;


    } catch (error) {
        console.error(error);
    }
}


async function main() {
    try {
        const events = await arrowGetEvents();
        // console.log(events);
        const eventosOrdenados = ordenarEventos(events);
        // console.log(orderedEvents);
        const eventosRemovidos = removerEventos(eventosOrdenados);
        // console.log(removedPastEvents);

        const threeNearestEvents = eventosRemovidos.slice(0, 3);
        // console.log(slicedEvents);

        coisarEventos(threeNearestEvents);

        setEventListenerOnModalButton();


    } catch (error) {
        console.error(error);
    }
}

main();