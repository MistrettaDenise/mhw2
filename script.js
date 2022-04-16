
const s_answers = {};
const boxes = document.querySelectorAll('.choice-grid div');
for (const box of boxes) {
    box.addEventListener('click', b_click);
}

function b_click(event){  
    const box = event.currentTarget;
    box.classList.add('selected');
    box.classList.remove('opacity');
    box.querySelector('.checkbox').src = "images/checked.png";
    opacity(box);
    s_answers[box.dataset.questionId] = box.dataset.choiceId;
    if(s_answers['one'] && s_answers['two'] && s_answers['three']){
        for (const box of boxes) {
            box.removeEventListener('click',b_click);
        }
        d_result(c_result());
    }
}

function c_result(){
    if(s_answers['one']===s_answers['two'] || s_answers['one']===s_answers['three'])
      return s_answers['one']
    if(s_answers['two']===s_answers['one'] || s_answers['two']===s_answers['three'])
       return s_answers['two'];
    if(s_answers['three']===s_answers['one'] || s_answers['three']===s_answers['two'])
       return s_answers['three'];
    return s_answers['one'];  
}

function d_result(key){
    console.log(RESULTS_MAP[key]);
    const result = document.querySelector('#result');
    result.querySelector('h1').textContent = RESULTS_MAP[key].title;
    result.querySelector('p').textContent = RESULTS_MAP[key].contents;
    result.classList.remove('hidden');
    const button = document.querySelector('#button');
    button.addEventListener('click',r_quiz);
}

function r_quiz(){ 
    for (const key in s_answers) {
        delete s_answers[key];
    }
    const no_result = document.querySelector('#result');
    no_result.classList.add('hidden');
    for (const box of boxes) {
        box.addEventListener('click', b_click);
        box.classList.remove('opacity');
        box.querySelector('.checkbox').src = "images/unchecked.png";
        box.classList.remove('selected');
    }

}

function opacity(selected){
    const u_answerId = selected.dataset.choiceId;
    const answers = selected.parentNode.querySelectorAll('div');
    for (const us_answers of answers) {
        if(us_answers.dataset.choiceId !== u_answerId){
            us_answers.classList.add('opacity');
            us_answers.querySelector('.checkbox').src = "images/unchecked.png";
            us_answers.classList.remove('selected');
        }
    }
}


