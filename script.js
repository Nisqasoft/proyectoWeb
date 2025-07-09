const container = document.querySelector(".container");
const addQuestionModal = document.getElementById("add-card-modal");
const saveBtn = document.getElementById("save-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("error");
const addQuestion = document.getElementById("add-card");
const closeBtn = document.getElementById("close-btn");

//inicializando variables
let editBool = false;
let originalId =  null;
let flashcards =  JSON.parse(localStorage.getItem('flashcards')) || [];

addQuestion.addEventListener('click',()=>{
    //Muestra el modal de pregunta y respuesta
    // container.classList.add('hide'); // Esta línea se puede omitir si no deseas ocultar el fondo.
    question.value = "";
    answer.value = "";
    addQuestionModal.classList.remove('hide');   
});

closeBtn.addEventListener('click', ()=>{
    container.classList.remove('hide');
    addQuestionModal.classList.add('hide');
    if (editBool){
        editBool = false;
    }
});

saveBtn.addEventListener('click', ()=>{
    //Declaracion de variables temporales
    let tempQuestion = question.value.trim();
    let tempAnswer = answer.value.trim();
    
    if (!tempQuestion || !tempAnswer){
        //El mostrar el error de cajas vacias es con condicional
        errorMessage.classList.remove('hide');
    }else{
        if(editBool){
            //si se esta editando un flashcard, quitamos el original por uno nuevo
            flashcards = flashcards.filter(flashcard => flashcard.id !== originalId);
        }
        let id = Date.now();
        flashcards.push({id, question: tempQuestion, answer: tempAnswer});
        //Grabarlo de manera local
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
        container.classList.remove('hide');
        errorMessage.classList.add('hide');
        viewList();
        question.value = "";
        answer.value = "";
        editBool = false;
        addQuestionModal.classList.add('hide');
    }
});

//funcion para poder mostrar la lista de flashcards
function viewList(){
    const cardsList = document.querySelector('.cards-list');
    cardsList.innerHTML = '';
    flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
    flashcards.forEach(flashcard => {
        const div = document.createElement("div");
        div.classList.add('card');
        div.innerHTML = `
            <p class="que-div">${flashcard.question}</p>
            <p class="ans-div">${flashcard.answer}</p>
            <button class="show-hide-btn">Mostrar/Ocultar Respuesta</button>
            <div>
                <button class="edit"><i class="fa-solid fa-pen-to-square"></button>
                <button class="delete"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        cardsList.appendChild(div);
    });
}
