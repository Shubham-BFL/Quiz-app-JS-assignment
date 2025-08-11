
document.addEventListener('DOMContentLoaded', () => {
    const quizListContainer = document.getElementById('quiz-list-container');
    const noQuizzesAlert = document.getElementById('no-quizzes-alert');
    const scoresModal = new bootstrap.Modal(document.getElementById('scoresModal'));
    const scoresTableBody = document.getElementById('scores-table-body');
    const modalQuizTitle = document.getElementById('modal-quiz-title');
    const backToCreateBtn = document.getElementById('back-to-create-btn');

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    const quizzesByUser = JSON.parse(localStorage.getItem('quizzesByUser')) || {};
    const quizzesById = JSON.parse(localStorage.getItem('quizzesById')) || {};
    const myQuizzesObj = quizzesByUser[currentUser.email] || {};
    const myQuizIds = Object.keys(myQuizzesObj);
    const myQuizzes = myQuizIds.map(id => quizzesById[id]).filter(q => q !== undefined);

    if (myQuizzes.length > 0) {
        noQuizzesAlert.style.display = 'none';
        myQuizzes.forEach(quiz => {
            const card = document.createElement('div');
            card.className = 'card mb-3';
            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${quiz.title}</h5>
                    <p class="card-text">Created by: ${currentUser.email}</p>
                    <button class="btn btn-primary view-scores-btn" data-quiz-id="${quiz.id}">View Scores</button>
                    <button class="btn btn-secondary copy-link-btn" data-quiz-id="${quiz.id}">Copy Link</button>
                </div>
            `;
            quizListContainer.appendChild(card);
        });
    }

    quizListContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-scores-btn')) {
            const quizId = e.target.dataset.quizId;
            const quiz = myQuizzes.find(q => q.id === quizId);
            if (quiz) {
                modalQuizTitle.textContent = `Scores for: ${quiz.title}`;
                scoresTableBody.innerHTML = '';
                if (quiz.scores.length > 0) {
                    quiz.scores.forEach(score => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${score.taker}</td>
                            <td>${score.score} / ${score.total}</td>
                            <td>${score.date}</td>
                        `;
                        scoresTableBody.appendChild(row);
                    });
                } else {
                    scoresTableBody.innerHTML = '<tr><td colspan="3">No one has taken this quiz yet.</td></tr>';
                }
                scoresModal.show();
            }
        } else if (e.target.classList.contains('copy-link-btn')) {
            const quizId = e.target.dataset.quizId;
            const shareableLink = `${window.location.origin}/take-quiz.html?id=${quizId}`;
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(shareableLink).then(() => {
                    alert('Quiz link copied to clipboard!');
                }, () => {
                    alert('Failed to copy link.');
                });
            } else {
                // Fallback for insecure context or older browsers
                const textArea = document.createElement('textarea');
                textArea.value = shareableLink;
                textArea.style.position = 'fixed';  // Avoid scrolling to bottom
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    const successful = document.execCommand('copy');
                    alert(successful ? 'Quiz link copied to clipboard!' : 'Failed to copy link.');
                } catch (err) {
                    alert('Failed to copy link.');
                }
                document.body.removeChild(textArea);
            }
        }
    });

    backToCreateBtn.addEventListener('click', () => {
        window.location.href = 'create-quiz.html';
    });

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }
});
