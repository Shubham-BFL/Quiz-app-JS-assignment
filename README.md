# Quiz-app-JS-assignment
Assignment to create quiz application using html, JS, &amp; bootstrap
Build a Collaborative Quiz Platform

Create a platform where users can create and share custom quizzes. Users will be able to create a set of questions, generate a unique link for their quiz, and share it with others. The quiz takers will use the link to access the quiz, and the creator will be able to view the scores of each participant.


Link : https://shubham-bfl.github.io/Quiz-app-JS-assignment/

> Register your account > login with same credential > 
> Create Quiz (add as many questions you want) then save & get link (you have to copy link)
> If you have previsously created quizes u can go to view dashboard
> to delete ur account go to dashboard & delete account












Project Breakdown

1. User Registration and Login

  · HTML:

        o Create forms for user registration and login, including fields for username, email, and password.

  · CSS:

        o Style the registration and login forms to be clean and user-friendly, ensuring that they are responsive.

    · JavaScript:

        o Implement basic client-side validation for the forms. Use localStorage to simulate user authentication for the purposes of this assignment.

2. Creating a Set of Questions

    · HTML:

        o Create a form for users to input their quiz questions, including fields for the question text, multiple-choice answers, and the correct answer. Allow users to add multiple questions.

    · CSS:

        o Style the quiz creation form to be clear and intuitive, using a step-by-step process or tabs to organize multiple questions.

    · JavaScript:

        o Implement functionality to dynamically add questions to the quiz set. Store the quiz data in localStorage or a simulated database.

3. Generating a Shareable Link

    · JavaScript:

        o Implement functionality to generate a unique link for each quiz set. The link should include a unique identifier that corresponds to the quiz data stored in localStorage.

        o Provide the user with the generated link so they can share it with others.

4. Taking the Quiz

    · HTML:

        o Create a quiz-taking interface that loads the quiz based on the unique link. Include the question, multiple-choice answers, and a submit button for each question.

    · CSS:

        o Style the quiz interface to be engaging and easy to use, with clear navigation between questions.

    · JavaScript:

        o Implement the logic to load the quiz data based on the unique identifier in the URL. Handle user input and calculate the score upon quiz completion.

        o Store the user’s score in localStorage or send it to the quiz creator’s dashboard.

5. Viewing Quiz Scores

    · HTML:

        o Create a dashboard for the quiz creator to view the results. Display a list of all participants who took the quiz along with their scores.

    · CSS:

        o Style the dashboard to be visually organized, using tables or cards to display user scores.

    · JavaScript:

        o Implement functionality to retrieve and display scores for each participant. Include options to sort or filter the results based on score, date, or participant name.

6. Final Touches and Testing

    · JavaScript & CSS:

        o Add final enhancements, such as animations, transitions, and loading indicators to improve the user experience.

        o Ensure that the entire platform is responsive and works well across different devices and browsers.

    · Final Testing:

        o Thoroughly test all features, including user registration, quiz creation, quiz-taking, and score viewing. Fix any bugs and make final adjustments.

Submission

· Organize the project files into appropriate folders (index.html, styles.css, script.js, and any assets).

· Host the project on a platform like GitHub Pages or Netlify and provide a link for review.

· Submit the source code in a GitHub repository with a README file that explains the project, how to use it, and any additional notes or instructions.

This assignment will help you practice building a multi-user interactive web application, handling dynamic content creation, user input, and basic authentication. The final product will be a functional quiz platform that allows users to create, share, and manage quizzes with real-time results trackin
