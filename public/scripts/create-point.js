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
    const stateInput = document.querySelector("input[name=state]");
    citySelect.innerHTML = `<option value="">Selecione a cidade</option>`;
    citySelect.setAttribute('disabled', 'disabled')
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios `

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for(city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
        }
        if (eventValue == 'disabled') {
            citySelect.setAttribute('disabled', 'disabled')
        }
        else{
         citySelect.disabled = false;}
    } )

}

// Itens de Coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")
console.log(itemsToCollect)
for(item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    const itemId = itemLi.dataset.id
    itemLi.classList.toggle("selected")

    const alreadySelected = selectedItems.findIndex(item => item ===itemId)

    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item =>{
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)
    }

    collectedItems.value = selectedItems

}

