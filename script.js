const questions = [
    {
        quiz: "藉由高功率光來燒熔、燒蝕物體，\n將原料的平板板材進行切割，在板金加工最有可能是指什麼？",
        options:["雷射", "沖壓", "研磨", "焊接"],
        correctAnswer: 1,
    },
    {
        quiz: "切割好的鐵材拿到折床機，經過彈性變形達到塑型，\n在板金加工最有可能是指什麼？",
        options:["拉絲","滾圓","拋光","折曲"],
        correctAnswer: 4,
    },
    {
        quiz: "在折曲完成後，會在這個階段進行板材的接合，\n在板金加工這個階段最有可能是指什麼？",
        options:["電鍍","抽牙","焊接","烤漆"],
        correctAnswer: 3,
    },
    {
        quiz: "使用專用工具在金屬表面或內部車出螺紋，\n在板金加工中最有可能是指什麼？",
        options:["研磨","攻牙","拉絲","抽牙"],
        correctAnswer: 2,
    },
    {
        quiz: "使用專用工具在將金屬材料滾壓成圓柱體的過程，\n在板金加工中這個過程最有可能是指什麼？",
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

const correctSound = new Audio("music/correct_answer.mp3");
const errorSound = new Audio("music/blip03.mp3");

function displayQuestion() {
    questionElement.classList.remove("active");
    optionsElements.forEach(option => option.classList.remove("active"));

    setTimeout(() => {
        questionElement.textContent = questions[currentQuestionIndex].quiz; /*更換題目*/
        questions[currentQuestionIndex].options.forEach((option, index) => {
            optionsElements[index].textContent = option;/*更換答案*/
        });

        // 延迟一小段时间后添加active类以触发过渡效果
        setTimeout(() => {
            questionElement.classList.add("active");
            optionsElements.forEach(option => option.classList.add("active"));
        }, 200);
    }, 200); // 首先移除active类，然后在0.2秒后更新内容
}

function disableOptions() {
    document.querySelectorAll(".option").forEach((option) => {
        option.disabled = true;
        option.classList.add("option-disabled"); // 添加鼠標樣式
    });
}


function checkAnswer(selectedOption) {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
        score++;
        resultElement.textContent = "答案正確！得分：" + score;
        correctSound.play();
    } else {
        resultElement.textContent = "答案錯誤。得分：" + score;
        errorSound.play();
    }

    resultElement.classList.remove("active");
    endingElement.classList.remove("active");
    questionElement.classList.remove("active");
    optionsElements.forEach(option => option.classList.remove("active"));

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        setTimeout(() => {
            resultElement.classList.add("active");
            displayQuestion();
        }, 100);
    } else {
        setTimeout(() => {

            endingElement.classList.add("active");
            
            resultElement.classList.add("active");

            if(score == questions.length ){
                endingElement.textContent = "問答結束。\n恭喜你全答對，你現在已經是板金小老師了！"; 
            }
            else if(0 < score < questions.length){
                endingElement.textContent = "問答結束。\n你答對了"+ score +"分，不妨在試一試吧！"; 
            }
            else if (score == 0){
                endingElement.textContent = "問答結束。\n不妨在試一試吧！" ;
            }

           

            disableOptions(); // 調用禁止選項按鈕並更改鼠標指示樣式
    }, 100);
    }
}

displayQuestion();