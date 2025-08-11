document.addEventListener('DOMContentLoaded', () => {
    const questionsContainer = document.getElementById('questions-container');
    const addQuestionBtn = document.getElementById('add-question-btn');
    const quizForm = document.getElementById('quiz-form');
    const shareLinkContainer = document.getElementById('share-link-container');
    const shareLinkInput = document.getElementById('share-link-input');
    const copyBtn = document.getElementById('copy-btn');
    const usernameDisplay = document.getElementById('username-display');
    const logoutBtn = document.getElementById('logout-btn');

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'index.html'; // Redirect if not logged in
        return;
    }
    usernameDisplay.textContent = currentUser.username;

    let questionCount = 1;

    addQuestionBtn.addEventListener('click', () => {
        const newQuestionCard = document.createElement('div');
        newQuestionCard.className = 'card mb-3 question-card';
        newQuestionCard.dataset.questionId = questionCount;
        newQuestionCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">Question ${questionCount + 1}</h5>
                <div class="mb-3">
                    <label for="question-text-${questionCount}" class="form-label">Question Text</label>
                    <input type="text" class="form-control" id="question-text-${questionCount}" required>
                </div>
                <div class="row g-2 mb-2">
                    <div class="col">
                        <input type="text" class="form-control answer-input" placeholder="Answer 1" required>
                    </div>
                    <div class="col-auto d-flex align-items-center">
                        <input class="form-check-input correct-answer" type="radio" name="correct-${questionCount}" value="0" required>
                    </div>
                </div>
                <div class="row g-2 mb-2">
                    <div class="col">
                        <input type="text" class="form-control answer-input" placeholder="Answer 2" required>
                    </div>
                    <div class="col-auto d-flex align-items-center">
                        <input class="form-check-input correct-answer" type="radio" name="correct-${questionCount}" value="1" required>
                    </div>
                </div>
                <button type="button" class="btn btn-sm btn-outline-danger mt-2 remove-question-btn">Remove</button>
            </div>
        `;
        questionsContainer.appendChild(newQuestionCard);
        questionCount++;
    });

    questionsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-question-btn')) {
            e.target.closest('.question-card').remove();
        }
    });

    quizForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const quizTitle = document.getElementById('quiz-title').value;
        const questions = [];
        
        document.querySelectorAll('.question-card').forEach(card => {
            const questionText = card.querySelector('[id^="question-text"]').value;
            const answers = [];
            card.querySelectorAll('.answer-input').forEach(input => answers.push(input.value));
            const correctAnswerIndex = card.querySelector('.correct-answer:checked').value;

            questions.push({
                text: questionText,
                answers: answers,
                correctAnswer: parseInt(correctAnswerIndex)
            });
        });

        const quizId = 'quiz-' + Date.now();
        const newQuiz = {
            id: quizId,
            title: quizTitle,
            creator: currentUser.username,
            questions: questions,
            scores: []
        };

        let quizzesByUser = JSON.parse(localStorage.getItem('quizzesByUser')) || {};
        if (!quizzesByUser[currentUser.email]) {
            quizzesByUser[currentUser.email] = {};
        }
        quizzesByUser[currentUser.email][quizId] = newQuiz;
        localStorage.setItem('quizzesByUser', JSON.stringify(quizzesByUser));

        // Save in global quizzesById object
        let quizzesById = JSON.parse(localStorage.getItem('quizzesById')) || {};
        quizzesById[quizId] = newQuiz;
        localStorage.setItem('quizzesById', JSON.stringify(quizzesById));

        const shareableLink = `${window.location.origin}/take-quiz.html?id=${quizId}`;
        shareLinkInput.value = shareableLink;
        shareLinkContainer.classList.remove('d-none');
        alert('Quiz created successfully!');
    });

    copyBtn.addEventListener('click', () => {
        shareLinkInput.select();
        document.execCommand('copy');
        alert('Link copied to clipboard!');
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
});