const answers  = {};
const boxes = document.querySelectorAll('.choice-grid div');
start();
const button=document.querySelector('#button');
button.addEventListener('click', restart);
function start(){
  for (const box of boxes) {
    box.addEventListener('click', onClick);
  }
}


function onClick(event){
    const divClicked = event.currentTarget;
    divClicked.classList.add('selected');
    const image = divClicked.querySelector('img.checkbox');
    image.src = "images/checked.png";
    divClicked.classList.remove('opacity'); 
    answers[divClicked.dataset.questionId]=divClicked.dataset.choiceId;
    addOpacity(divClicked);
    if(answers.one && answers.two && answers.three){
        for (const box of boxes) {
            box.removeEventListener('click', onClick);
        }
        displayWinner(calculateWinner());
    }
}

function addOpacity(selectedBox){
    for(const box of boxes)
        if(box.dataset.questionId === selectedBox.dataset.questionId && 
            box.dataset.choiceId !== selectedBox.dataset.choiceId){
            box.classList.add('opacity');
            box.classList.remove('selected');
            const image1 = box.querySelector('img.checkbox');
            image1.src = "images/unchecked.png"
        }
}

function calculateWinner(){
        if(answers["two"] === answers["three"])
            return answers["two"];
        else return answers["one"];
}

function displayWinner(winner){
    const result =document.querySelector('div#result');
    result.classList.remove('hidden');
    let text= result.querySelector('h1');
    text.textContent=RESULTS_MAP[winner].title;
    text= result.querySelector('p');
    text.textContent=RESULTS_MAP[winner].contents;
    document.body.scrollTop = (document.documentElement.scrollTop = document.documentElement.scrollHeight);
}

function restart(){
    start();
    for(const key in answers)
        delete answers[key];
    console.log(answers);
    const result = document.querySelector('div#result');
    result.classList.add('hidden');
    for(const box of boxes){
        box.classList.remove('opacity');
        box.classList.remove('selected');
        box.querySelector("img.checkbox").src = "images/unchecked.png";
    }  
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}