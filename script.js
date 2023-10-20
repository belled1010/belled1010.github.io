const questions = [
    {
        quiz: "用高功率光來燒熔、燒蝕物體，切割原料的平板板材，是指板金加工的哪個步驟？",
        options:["雷射", "沖壓", "研磨", "焊接"],
        correctAnswer: 1,
    },
    {
        quiz: "把切割好的鐵材拿到折床機，經過彈性變形達到塑型，是指板金加工的哪個步驟？",
        options:["拉絲","滾圓","拋光","折曲"],
        correctAnswer: 4,
    },
    {
        quiz: "在折曲完成後，會在這個階段進行板材的接合，在板金加工這個階段最有可能是指什麼？",
        options:["電鍍","抽牙","焊接","烤漆"],
        correctAnswer: 3,
    },
    {
        quiz: "使用專用工具在金屬表面或內部車出螺紋，在板金加工中最有可能是指什麼？",
        options:["研磨","攻牙","拉絲","抽牙"],
        correctAnswer: 2,
    },
    {
        quiz: "使用工具將金屬材料滾壓成圓柱體，可能是指板金加工的什麼步驟？",
        options:["噴砂","滾圓","點焊","沖壓"],
        correctAnswer: 2,
    },
];

let currentQuestionIndex = 0;
let score = 0

const questionElement = document.getElementById("question");
const optionsElements = document.querySelectorAll(".option");
const resultElement = document.getElementById("result");
const endingElement = document.getElementById("ending");
const background = document.querySelector(".quiz-container");


const correctSound = new Audio("music/correct_answer.mp3");
const errorSound = new Audio("music/blip03.mp3");


optionsElements.forEach(option => {
    option.style.display = "none";
});
questionElement.style.display = 'none';

function displayQuestion() {

    questionElement.style.animation = 'none';
    optionsElements.forEach(option => {
        option.style.animation = 'none';
    });

    questionElement.textContent = questions[currentQuestionIndex].quiz; /*更換題目*/
    questions[currentQuestionIndex].options.forEach((option, index) => {
        optionsElements[index].textContent = option;/*更換答案*/
    });
    setTimeout(() => {

        questionElement.style.display = 'inline';
        optionsElements.forEach(option => {
            option.style.display = "inline";
        });
        questionElement.style.animation = 'fadeIn 1s forwards';
        optionsElements.forEach(option => {
            option.style.animation = 'fadeIn 1s forwards';
        });

    },100)/*暫定 不要使用淡入動畫*/


}




function disableOptions() {
    document.querySelectorAll(".option").forEach((option) => {
        option.classList.add("option.disabled"); // 添加鼠標樣式和禁用
    });
    optionsElements.forEach(option => {
        option.style.display = "none";
    });
    
}


function checkAnswer(selectedOption) {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
        score++;
        resultElement.style.display = 'inline';
        resultElement.style.animation = 'fadeIn 1s forwards';
        resultElement.textContent = "答案正確！得分：" + score;
        correctSound.play();
        setTimeout(() => {
            resultElement.style.animation = 'none';
        },1000)
    } else {
        resultElement.style.display = 'inline';
        resultElement.style.animation = 'fadeIn 1s forwards';
        resultElement.textContent = "答案錯誤。得分：" + score;
        errorSound.play();
        setTimeout(() => {
            resultElement.style.animation = 'none';
        },1000)// 跑完淡入1s後，重置當前動畫效果
    }


    currentQuestionIndex++;

    background.style.backgroundImage = `url(img/${currentQuestionIndex}.png)`;
 

    if (currentQuestionIndex < questions.length) {
            displayQuestion();
    } else {

            questionElement.style.display = 'none';
            endingElement.style.display = 'inline';
            disableOptions(); // 調用禁止選項按鈕並更改鼠標指示樣式
            document.getElementById("thank").style.display = 'inline';
            document.getElementById("thank").style.animation = 'fadeIn 1s forwards';

            if(score == questions.length ){
                endingElement.textContent = "問答結束。\n恭喜你全答對，榮獲台華認證板金小老師，前途不可限量！\n\n11月咖啡展歡迎來找我們玩哦！"; 
            }
            else if(0 < score && score < questions.length){
                endingElement.textContent = "問答結束。你答對了"+ score +"題，\n不如再玩一次找出所有的正確答案！\n\n別忘了，11月咖啡展記得來和我們玩哦～"; 
            }
            else if (score == 0){
                endingElement.textContent = "問答結束。\n不妨再試一試吧！" ;
            }
            endingElement.style.animation = 'fadeIn 1s forwards';
    }
}
function START() {
    document.getElementById('start').style.animation = 'fadeOut 1s forwards';
    document.getElementById('start_2').style.animation = 'fadeOut 1s forwards';
  

    setTimeout(() => {
    document.getElementById('start').style.display = 'none';
    document.getElementById('start_2').style.display = 'none';
    background.style.backgroundImage = 'url("img/0.png")';
    
    displayQuestion();
    },800);
  
}