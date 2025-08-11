
function deleteUser(emailToDelete) {
    try {
        // Delete from users list
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const deletedUser = users.find(u => u.email === emailToDelete);
        
        if (!deletedUser) {
            console.log(`User ${emailToDelete} not found`);
            return false;
        }
        
        // Remove user from users array
        users = users.filter(u => u.email !== emailToDelete);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Delete user's quizzes from quizzesById
        let quizzesById = JSON.parse(localStorage.getItem('quizzesById')) || {};
        for (const quizId in quizzesById) {
            if (quizzesById[quizId].creator === deletedUser.username) {
                delete quizzesById[quizId];
            }
        }
        localStorage.setItem('quizzesById', JSON.stringify(quizzesById));
        
        // Delete user's quizzes from quizzesByUser
        let quizzesByUser = JSON.parse(localStorage.getItem('quizzesByUser')) || {};
        if (quizzesByUser[emailToDelete]) {
            delete quizzesByUser[emailToDelete];
            localStorage.setItem('quizzesByUser', JSON.stringify(quizzesByUser));
        }
        
        // If this is the current user, log them out
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.email === emailToDelete) {
            localStorage.removeItem('currentUser');
        }
        
        console.log(`User ${emailToDelete} and all associated data deleted successfully`);
        return true;
        
    } catch (error) {
        console.error('Error deleting user:', error);
        return false;
    }
}

// Account deletion UI functionality
document.addEventListener('DOMContentLoaded', () => {
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', () => {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser) {
                alert('No user logged in');
                return;
            }
            
            if (confirm(`Are you sure you want to delete your account (${currentUser.email})? This will permanently delete all your quizzes and data.`)) {
                const success = deleteUser(currentUser.email);
                
                if (success) {
                    alert('Your account has been successfully deleted.');
                    window.location.href = 'index.html';
                } else {
                    alert('Failed to delete account. Please try again.');
                }
            }
        });
    }
});

// Backward compatibility - keep the old function name for any existing references
window.Delete = deleteUser;
