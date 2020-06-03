document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then( res => res.json() )
    .then( states => {
        for(state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        }

    } )
}

populateUFs();

function getCities(event){ 
    const eventValue =event.target.value;  
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("select[name=state]");
    citySelect.innerHTML = `<option value="">Selecione a cidade</option>`;
    const ufValue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios `

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for(city of cities){
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
        }
        if (eventValue == 'disabled') {
            citySelect.setAttribute('disabled', 'disabled')
        }
        else{
         citySelect.disabled = false;}
    } )

}