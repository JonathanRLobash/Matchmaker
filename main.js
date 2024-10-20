const QUESTIONS = [
            { question: "Do you prefer cats over dogs? (1: Yes, 0: No)", score: 0 },
            { question: "Do you like to travel? (1: Yes, 0: No)", score: 0 },
            { question: "Do you like broccoli? (1: Yes, 0: No)", score: 0 },
            { question: "Do you like to play video games? (1: Yes, 0: No)", score: 0 },
            { question: "Do you like trying new things? (1: Yes, 0: No)", score: 0 },
        ];

        let totalScore = 0;

        function displayQuestions() {
            const quizDiv = document.getElementById("quiz");
            quizDiv.innerHTML = "";
            QUESTIONS.forEach((q, index) => {
                const div = document.createElement("div");
                div.classList.add("question");
                div.innerHTML = `
                    <label>${q.question}</label>
                    <input type="number" min="0" max="1" id="q${index}" required>
                    <div class="error" id="error${index}"></div>
                `;
                quizDiv.appendChild(div);
            });
        }

        function validate(input) {
            const value = parseInt(input.value);
            if (isNaN(value) || (value < 0 || value > 1)) {
                return false;
            }
            return true;
        }

        function calculateScores() {
            totalScore = 0;
            let valid = true;

            QUESTIONS.forEach((q, index) => {
                const input = document.getElementById(`q${index}`);
                const errorDiv = document.getElementById(`error${index}`);

                if (validate(input)) {
                    q.score = parseInt(input.value);
                    totalScore += q.score;
                    errorDiv.innerHTML = "";
                } else {
                    errorDiv.innerHTML = "Please enter 0 or 1.";
                    valid = false;
                }
            });

            return valid;
        }

        function displaySummary() {
            const summaryDiv = document.getElementById("summary");
            summaryDiv.innerHTML = "";
            const percentage = (totalScore / QUESTIONS.length) * 100;
            summaryDiv.innerHTML += `<p>Your total compatibility score: ${totalScore}/${QUESTIONS.length} (${percentage.toFixed(2)}%)</p>`;
            let remark = "";

            if (percentage === 100) {
                remark = "Be my friend.";
            } else if (percentage >= 60) {
                remark = "Well, that's a little awkward.";
            } else {
                remark = "Door is that way pal.";
            }
            summaryDiv.innerHTML += `<p>${remark}</p>`;
        }

        document.getElementById("submit").addEventListener("click", function() {
            if (calculateScores()) {
                displaySummary();
            }
        });

        displayQuestions();