const eventsContainerSelector = document.querySelector('#events-container');

function criandoElemento(data){
    data.forEach((event) => {
        const criandoArticle = document.createElement('article');
        criandoArticle.classList.add('evento');
        criandoArticle.classList.add('card');
        criandoArticle.classList.add('p-5');
        criandoArticle.classList.add('m-3');


        const criandoH2 = document.createElement('h2');
        const buscandoName = event.name;
        const buscandoData = event.scheduled.substring(0, 10).replaceAll('-', '/');
        criandoH2.innerText = buscandoName + " - " + buscandoData;

        const criandoH4 = document.createElement('h4');
        criandoH4.innerText = event.attractions.join(', ');

        const criandoP = document.createElement('p');
        criandoP.innerText = event.description;

        const linkA = document.createElement('a');
        linkA.classList.add('btn');
        linkA.classList.add('btn-primary');
        linkA.innerText = 'reservar ingresso';

        criandoArticle.append(criandoH2, criandoH4, criandoP, linkA);

        const divContainer = document.createElement('div');
        divContainer.setAttribute('id', 'div-container');
        // divContainer.classList.add('col-sm');
        // divContainer.append(articleElement);

        eventsContainerSelector.append(criandoArticle);
    })
}




fetch('https://xp41-soundgarden-api.herokuapp.com/events', {
    "method": "GET",
}).then(response => { return response.json() }
).then(data => criandoElemento(data)
).catch(error => console.log(error));

// const colocandoEventosDentrodoContainer = document.querySelector('#quadrado');

// function colocandoOsEventosPelasDatas(datas){
//     datas.forEach((event) => {
//         const criandoSection = document.createElement('section');
//         criandoSection.classList.add('evento');
//         criandoSection.classList.add('card');
//         criandoSection.classList.add('p-5');
//         criandoSection.classList.add('m-3');

//         const criandoH2 = document.createElement('h2');
//         const recebendoName = event.name;
//         const recebendoDate = event.scheduled.subtring(0, 10).replaceAll('-', '/');
//         criandoH2.innerText = recebendoName + " - " + recebendoDate;

//         const criandoH4 = document.createElement('h4');
//         criandoH4.innerText = event.attractions.join(', ');

//         const criandoP = document.createElement('p');
//         criandoP.innerText = event.description;

//         const linkA = document.createElement('a');
//         linkA.classList.add('btn');
//         linkA.classList.add('btn-primary');
//         linkA.innerText = 'reservar ingresso';

//         criandoSection.append(criandoH2, criandoH4, criandoP, linkA);

//         const criandoDiv = document.createElement('div');
//         criandoDiv.setAttribute('id', 'retangulo');

//         colocandoEventosDentrodoContainer.append(criandoSection);
//     });
// }

// fetch('https://xp41-soundgarden-api.herokuapp.com/events', {
//     "method": "GET",
// }).then(response => { return response.json() })
// .then(datas => colocandoOsEventosPelasDatas(datas))
// .catch
// console.log(error);

