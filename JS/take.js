document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const quizId = urlParams.get('id');
    const quizzesById = JSON.parse(localStorage.getItem('quizzesById')) || {};
    const quiz = quizzesById[quizId];

    if (!quiz) {
        document.body.innerHTML = '<div class="alert alert-danger m-5">Quiz not found!</div>';
        return;
    }

    const quizTitleDisplay = document.getElementById('quiz-title-display');
    const quizContainer = document.getElementById('quiz-container');
    const quizResults = document.getElementById('quiz-results');
    const finalScoreDisplay = document.getElementById('final-score');
    let userAnswers = {};

    quizTitleDisplay.textContent = quiz.title;

    function renderQuiz() {
        quizContainer.innerHTML = '';
        quiz.questions.forEach((question, index) => {
            const questionHtml = document.createElement('div');
            questionHtml.className = 'card mb-4';
            questionHtml.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">Question ${index + 1}</h5>
                    <p class="card-text">${question.text}</p>
                    <div class="list-group">
                        ${question.answers.map((answer, i) => `
                            <label class="list-group-item">
                                <input class="form-check-input me-1" type="radio" name="question-${index}" value="${i}" ${userAnswers[index] === i ? 'checked' : ''}>
                                ${answer}
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
            quizContainer.appendChild(questionHtml);
        });

        const submitBtn = document.createElement('button');
        submitBtn.className = 'btn btn-success w-100 mt-4';
        submitBtn.textContent = 'Submit Quiz';
        submitBtn.addEventListener('click', submitQuiz);
        quizContainer.appendChild(submitBtn);
    }

    function submitQuiz() {
        let score = 0;
        let allAnswered = true;
        
        quiz.questions.forEach((question, index) => {
            const selectedAnswer = document.querySelector(`input[name="question-${index}"]:checked`);
            if (!selectedAnswer) {
                allAnswered = false;
            } else if (parseInt(selectedAnswer.value) === question.correctAnswer) {
                score++;
            }
        });

        if (!allAnswered) {
            alert('Please answer all questions!');
            return;
        }

        const takerName = prompt('Enter your name for the score board:');
        if (!takerName) return;

        const newScore = {
            taker: takerName,
            score: score,
            total: quiz.questions.length,
            date: new Date().toLocaleDateString()
        };

        quiz.scores.push(newScore);
        quizzesById[quizId] = quiz;
        localStorage.setItem('quizzesById', JSON.stringify(quizzesById));

        quizContainer.classList.add('d-none');
        quizResults.classList.remove('d-none');
        finalScoreDisplay.textContent = `${score} out of ${quiz.questions.length}`;
    }

    renderQuiz();
});