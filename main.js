let quizzes = {
    html: [
        {
            type: "multiple-choice",
            question: "What does HTML stand for?",
            options: [
                "Hyper Text Markup Language",
                "High Tech Modern Language",
                "Hyper Transfer Markup Language",
                "Home Tool Markup Language"
            ],
            correctAnswer: 0
        },
        {
            type: "multiple-choice",
            question: "Which tag is used to create a hyperlink?",
            options: ["<link>", "<a>", "<href>", "<hyperlink>"],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "Which HTML tag is used to create a clickable button?",
            options: ["<button>", "<a>", "<div>", "<section>"],
            correctAnswer: 0
        }
    ],
    css: [
        {
            type: "multiple-choice",
            question: "Which property is used to change the background color?",
            options: ["color", "bgcolor", "background-color", "background"],
            correctAnswer: 2
        },
        {
            type: "multiple-choice",
            question: "How do you select an element with id 'header'?",
            options: ["#header", ".header", "*header", "header"],
            correctAnswer: 0
        },
        {
            type: "multiple-choice",
            question: "Which CSS rule centers a block-level element horizontally?",
            options: [
                "margin: 0 auto;",
                "text-align: center;",
                "align-items: center;",
                "justify-content: center;"
            ],
            correctAnswer: 0
        }
    ],
    javascript: [
        {
            type: "multiple-choice",
            question: "Which of the following is a JavaScript data type?",
            options: ["style", "boolean", "class", "div"],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "How do you create a function in JavaScript?",
            options: [
                "function myFunction()",
                "function:myFunction()",
                "function = myFunction()",
                "create myFunction()"
            ],
            correctAnswer: 0
        },
        {
            type: "multiple-choice",
            question: "How do you convert a string to uppercase in JavaScript?",
            options: [
                "str.upperCase()",
                "str.toUpperCase()",
                "str.uppercase()",
                "str.toUpper()"
            ],
            correctAnswer: 1
        }
    ],
    scratch: [
        {
            type: "multiple-choice",
            question: "What type of programming language is Scratch?",
            options: [
                "Text-based",
                "Block-based",
                "Machine code",
                "Assembly language"
            ],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "Which block category contains motion blocks?",
            options: ["Control", "Looks", "Motion", "Sound"],
            correctAnswer: 2
        }
    ],
    cpp: [
        {
            type: "multiple-choice",
            question: "Which of the following is the correct syntax to output 'Hello World' in C++?",
            options: [
                "cout << 'Hello World';",
                "print('Hello World');",
                "System.out.println('Hello World');",
                "console.log('Hello World');"
            ],
            correctAnswer: 0
        },
        {
            type: "multiple-choice",
            question: "Which data type is used to create a variable that should store text?",
            options: ["string", "String", "txt", "text"],
            correctAnswer: 0
        },
        {
            type: "multiple-choice",
            question: "Which option correctly declares an integer variable 'age' with value 25 in C++?",
            options: [
                "int age = 25;",
                "int age := 25;",
                "int age(=25);",
                "age int = 25;"
            ],
            correctAnswer: 0
        }
    ]
};

let activeQuiz = null;
let questionIndex = 0;
let answers = [];
let isNavigating = false;

function showPage(sectionId) {
    document.querySelectorAll('section.container').forEach(section => {
        section.classList.add('hidden');
    });
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.remove('hidden');
    }
    window.scrollTo(0, 0);
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) navLinks.classList.remove('active');
}

function toggleNav() {
    document.querySelector('.nav-links').classList.toggle('active');
}

function beginQuiz(quizType) {
    activeQuiz = quizType;
    questionIndex = 0;
    answers = [];
    document.querySelectorAll('section.container').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById('quiz-section').classList.remove('hidden');
    document.getElementById('quiz-title').textContent = quizType.toUpperCase() + " Quiz";
    renderQuestion();
}

function renderQuestion() {
    if (!activeQuiz) return;
    const maxIndex = quizzes[activeQuiz].length - 1;
    if (questionIndex < 0) questionIndex = 0;
    if (questionIndex > maxIndex) questionIndex = maxIndex;

    const questionData = quizzes[activeQuiz][questionIndex];
    const questionText = document.getElementById('question-text');
    const optionsList = document.getElementById('options-list');
    const codeInputContainer = document.getElementById('code-input-container');
    const codeEditor = document.getElementById('code-editor');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const prevBtn = document.getElementById('prev-btn');
    questionText.textContent = (questionIndex + 1) + ". " + questionData.question;
    if (questionData.type === 'multiple-choice') {
        optionsList.classList.remove('hidden');
        codeInputContainer.classList.add('hidden');
        optionsList.innerHTML = '';
        questionData.options.forEach((option, index) => {
            const li = document.createElement('li');
            li.textContent = option;
            li.onclick = () => chooseOption(index);
            if (answers[questionIndex] === index) {
                li.classList.add('selected');
            }
            optionsList.appendChild(li);
        });
    } else if (questionData.type === 'code') {
        optionsList.classList.add('hidden');
        codeInputContainer.classList.remove('hidden');
        if (answers[questionIndex] !== undefined) {
            codeEditor.value = answers[questionIndex];
        } else {
            codeEditor.value = '';
        }
    }
    prevBtn.classList.toggle('hidden', questionIndex === 0);
    nextBtn.classList.toggle('hidden', questionIndex === quizzes[activeQuiz].length - 1);

    submitBtn.classList.remove('hidden');


    isNavigating = false;
}

function chooseOption(optionIndex) {
    answers[questionIndex] = optionIndex;
    document.querySelectorAll('#options-list li').forEach(li => {
        li.classList.remove('selected');
    });
    document.querySelectorAll('#options-list li')[optionIndex].classList.add('selected');
}

function goNext() {
    if (isNavigating || !activeQuiz) return;
    isNavigating = true;
    if (quizzes[activeQuiz][questionIndex] && quizzes[activeQuiz][questionIndex].type === 'code') {
        answers[questionIndex] = document.getElementById('code-editor').value;
    }
    const lastIndex = quizzes[activeQuiz].length - 1;
    if (questionIndex < lastIndex) {
        questionIndex++;
    }
    renderQuestion();
}

function goBack() {
    if (isNavigating || !activeQuiz) return;
    isNavigating = true;
    if (quizzes[activeQuiz][questionIndex] && quizzes[activeQuiz][questionIndex].type === 'code') {
        answers[questionIndex] = document.getElementById('code-editor').value;
    }
    if (questionIndex > 0) {
        questionIndex--;
    }
    renderQuestion();
}

function finishQuiz() {
    if (!activeQuiz) {
        const params = new URLSearchParams(window.location.search);
        const fallbackType = params.get('type');
        if (fallbackType && quizzes[fallbackType]) {
            activeQuiz = fallbackType;
        } else {
            alert('Please start a quiz first from the Tests page.');
            return;
        }
    }

    if (quizzes[activeQuiz][questionIndex] && quizzes[activeQuiz][questionIndex].type === 'code') {
        answers[questionIndex] = document.getElementById('code-editor').value;
    }
    let score = 0;
    quizzes[activeQuiz].forEach((question, index) => {
        if (question.type === 'multiple-choice') {
            if (answers[index] === question.correctAnswer) {
                score++;
            }
        } else if (question.type === 'code') {
            const userCode = normalizeAnswer(answers[index]);
            const correctCode = normalizeAnswer(question.correctAnswer);
            if (userCode === correctCode) {
                score++;
            }
        }
    });
    try {
        localStorage.setItem('quizScore', String(score));
        localStorage.setItem('quizTotal', String(quizzes[activeQuiz].length));
        localStorage.setItem('quizType', activeQuiz);
    } catch (e) {
    }
    window.location.href = 'result.html';
}

document.addEventListener('DOMContentLoaded', function () {
    const hasHome = document.getElementById('home');
    const hasTests = document.getElementById('tests');
    const hasQuiz = document.getElementById('quiz-section');
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    if (hasHome) {
        showPage('home');
    } else if (hasTests) {
        showPage('tests');
    } else {
        const hasAbout = document.getElementById('about');
        const hasContact = document.getElementById('contact');
        if (hasAbout) {
            showPage('about');
        } else if (hasContact) {
            showPage('contact');
        } else {
            const firstSection = document.querySelector('section.container');
            if (firstSection) firstSection.classList.remove('hidden');
        }
    }
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    if (prevBtn) prevBtn.addEventListener('click', goBack);
    if (nextBtn) nextBtn.addEventListener('click', goNext);
    if (submitBtn) submitBtn.addEventListener('click', finishQuiz);
    if (hasQuiz && type && quizzes[type]) {
        beginQuiz(type);
    }
});