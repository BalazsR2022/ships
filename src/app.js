
//File: index.html
//Author: Balázs Réka
//Copyright: 2023, Balázs Réka
//Group: Szoft 1-2-E
//Date: 2023-05-11
//Github: https://github.com/BalazsR2022/ships




const tbody = document.querySelector("#tbody");
const saveButton = document.querySelector("#saveButton");

const nameInput = document.querySelector("#name");
const lengthInput = document.querySelector("#length");
const priceInput = document.querySelector("#price");
const personInput = document.querySelector("#person");
const trailerInput = document.querySelector("#trailer");

const editidInput = document.querySelector('#editid');
const editnameInput = document.querySelector('#editname');
const editlengthInput = document.querySelector('#editlength');
const editpriceInput = document.querySelector('#editprice');
const editpersonInput = document.querySelector('#editperson');
const edittrailerInput = document.querySelector('#edittrailer');

const saveEditButton = document.querySelector('#saveEditButton');



var hajok = [];
const host = 'http://localhost:8000/';


function getShips(){
    let endpoint = 'ships';
    let url = host + endpoint;
   

    fetch(url)
    .then( response => response.json())  
    .then(  result => {
        console.log(result);
        hajok = result;
        generateTbody();
        
    
    } );

}

getShips();


function generateTbody(){
    hajok.forEach((hajo) => {
        

        let tr = document.createElement('tr');
        let tdName = document.createElement('td');
        let tdLength = document.createElement('td');
        let tdPrice = document.createElement('td');
        let tdPerson = document.createElement('td');
        let tdTrailer = document.createElement('td');
        

        tdName.textContent = hajo.name;
        tdLength.textContent = hajo.length;
        tdPrice.textContent = hajo.price;
        tdPerson.textContent = hajo.person;
        tdTrailer.textContent = hajo.trailer;

        tbody.append(tr);
        tr.append(tdName);
        tr.append(tdLength);
        tr.append(tdPrice);
        tr.append(tdPerson);
        tr.append(tdTrailer);

        tr.append(generateTdDelete(hajo.id));
        tr.append(generateTdEdit(hajo));
    });
}


function generateTdDelete(id) {
    let td = document.createElement('td');
    let button = document.createElement('button');
    button.textContent = "Törlés";
    button.classList = "btn btn-warning";
    button.addEventListener('click',() =>{
        console.log("id");
        deleteShip(id);
       
    td.append(button);
    return td});
}



function generateTdEdit(ship) {
    let td = document.createElement('td');
    let button = document.createElement('button');
    button.textContent = "Szerkesztés";
    button.classList = "btn btn-info";

    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#editModal');

    button.addEventListener('click',() =>{
        console.log('működik');
        console.log(ship.name);

         editidInput.value = ship.id;
         editnameInput.value = ship.name;
         editlengthInput.value = ship.length;
         editpriceInput.value = ship.price;
         editpersonInput.value = ship.person;
         edittrailerInput.value = ship.trailer;

    });
    td.append(button);
    return td;
}

function createShip(ship) {
    let endpoint = 'ships';
    let url = host + endpoint;

    fetch(url, {
        method: 'post',
        body: JSON.stringify(ship),
        headers:{
           "Content-Type": "application/json" 
        }
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)
    });
}


function deleteShip(id){
    let endpoint = 'ships';
    let url = host + endpoint + '/' + id;
    fetch(url, {
        method: 'delete'
    })
    .then(response => response.json())
    .then(result =>{
        console.log(result);
        tbody.textContent ="";
        getShips();
    });

}



saveButton.addEventListener('click', () => {
    
    let name = (nameInput.value);
    let length = (lengthInput.value);
    let price = (priceInput.value);
    let person = (personInput.value);
    let trailer = (trailerInput.value);

    let hajo = {
        name: name, 
        length: length, 
        price:price,
        person: person, 
        trailer:trailer
    };

    createShip(hajo);
    tbody.textContent = '';
    getShips();
    clearFieldOnAddModal();
});

function clearFieldOnAddModal() {
    nameInput.value = '';
    lengthInput.value = '';
    priceInput.value = '';
    personInput.value = '';
    trailerInput.value = '';


}

saveEditButton.addEventListener('click', () => {

    let id = editidInput.value;
    let name = editnameInput.value;
    let quantity = editquantityInput.value;
    let price = editpriceInput.value;

    hajok.forEach(  (hajo) => {
        
        if (hajo.id == id){
            hajo.name = name;
            hajo.length = length;
            hajo.price = price;
            hajo.person = person;
            hajo.trailer = trailer;
        }
    });

    tbody.textContent ='';
    generateTbody();

})

