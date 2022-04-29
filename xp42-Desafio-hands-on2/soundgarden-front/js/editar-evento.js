const getEventoPorId = async () => {
  try {
      const queryParameter = new URLSearchParams(window.location.search);

      const response = await fetch(
          "https://xp41-soundgarden-api.herokuapp.com/events/" +
          queryParameter.get("id")
      );

      const data = await response.json();

      return data;
  } catch {
      (error) => console.error(error);
  }
};

function taChegandoAHora(event) {
  const nome = document.querySelector('#nome');
  nome.value = event.name;

  const poster = document.querySelector('#banner');
  poster.value = event.poster;

  const atracoes = document.querySelector('#atracoes');
  atracoes.value = event.attractions.join(", ");

  const descricao = document.querySelector('#descricao');
  descricao.value = event.description;

  const datas = document.querySelector('#data');
  datas.value = event.scheduled.substring(0, 16);

  const lotacao = document.querySelector('#lotacao');
  lotacao.value = event.number_tickets;

}

function taTerminandoAcorda() {

  const nome = document.querySelector('#nome');
  const poster = document.querySelector('#banner');
  const atracoes = document.querySelector('#atracoes');
  const descricao = document.querySelector('#descricao');
  const datas = document.querySelector('#data');
  const locacao = document.querySelector('#lotacao');

  return {
      "name": nome.value,
      "attractions": atracoes.value.split(', '),
      "poster": poster.value,
      "description": descricao.value,
      "scheduled": datas.value,
      "number_tickets": locacao.value
  };
}
async function main() {
  try {
      const queryParameter = new URLSearchParams(window.location.search);
      const event = await getEventoPorId();

      taChegandoAHora(event);

      const formulario = document.querySelector("#form");

      formulario.addEventListener('submit', (event) => {
          event.preventDefault();
          const body = taTerminandoAcorda();
          fetch(("https://xp41-soundgarden-api.herokuapp.com/events/" +
              queryParameter.get("id")), {
                  "method": "PUT", "headers": { "content-type": "application/json" },
              "body": JSON.stringify(body)
          }).then(response => {
              console.log(response);
              alert("Seu evento foi atualizado!")
          }).catch(error => { console.error(error) })

      })

  } catch {
      (error) => console.error(error);
  }
}

main();