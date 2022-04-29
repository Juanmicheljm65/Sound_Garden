const formSelector = document.querySelector('#form');

formSelector.addEventListener('submit', (event) => {
    event.preventDefault();

    const formObject = new FormData(formSelector);

    const attractionsArray = formObject.get('atraçoes-input').split(', ');

    const numberTickets = Number(formObject.get('capacity-input'))

    const body = { 
        "name": formObject.get('input'),
        "attractions": attractionsArray,
        "poster": "N/D",
        "description": formObject.get('input1'),
        "scheduled": formObject.get('input2'),
        "number_tickets": numberTickets
     }

     console.log(body);

     fetch('https://xp41-soundgarden-api.herokuapp.com/events', {
         "method": "POST",
         "headers": { "Content-Type": "application/JSON" },
         "body": JSON.stringify(body)
     }).then( response => console.log(response)).catch( error => console.error(error));


//      fetch("https://xp41-soundgarden-api.herokuapp.com/events", {
//   "method": "POST",
//   "headers": {
//     "Content-Type": "application/json"
//   },
//   "body": "{\"name\":\"Evento do Francis\",\"poster\":\"https://i.imgur.com/fQHuZuv.png\",\"attractions\":[\"Cantor 1\",\"Cantor 2\"],\"description\":\"Descrição do envento do Francis\",\"scheduled\":\"2022-04-29T11:59:00.000Z\",\"number_tickets\":50}"
// })
// .then(response => {
//   console.log(response);
// })
// .catch(err => {
//   console.error(err);
// });
});