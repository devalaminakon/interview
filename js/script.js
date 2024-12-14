// User Data
const users = [
    { id: 1, name: "Alice", age: 25, isActive: true, scores: [85, 92, 88] },
    { id: 2, name: "Bob", age: 30, isActive: false, scores: [70, 75, 80] },
    { id: 3, name: "Charlie", age: 35, isActive: true, scores: [95, 90, 93] },
    { id: 4, name: "Diana", age: 28, isActive: true, scores: [60, 65, 70] },
    { id: 5, name: "Eve", age: 40, isActive: false, scores: [80, 85, 88] }
];

// Function to process users
function processUsers(users) {
    const activeUsers = users
        .filter(user => user.isActive)
        .map(user => {
            const averageScore = user.scores.reduce((sum, score) => sum + score, 0) / user.scores.length;
            return { ...user, averageScore };
        });

    const topPerformer = activeUsers.reduce((top, user) => 
        user.averageScore > (top?.averageScore || 0) ? user : top, null);

    const ageGroups = users.reduce((groups, user) => {
        if (user.age < 30) {
            groups.under30.push(user);
        } else {
            groups.over30.push(user);
        }
        return groups;
    }, { under30: [], over30: [] });

    return {
        activeUsers,
        topPerformer,
        ageGroups
    };
}


function renderResults(data) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
        <div class="result-section">
            <h2>Active Users</h2>
            <ul>
                ${data.activeUsers.map(user => `
                    <li>${user.name} (Average Score: ${user.averageScore.toFixed(2)})</li>
                `).join('')}
            </ul>
        </div>
        <div class="result-section">
            <h2>Top Performer</h2>
            <p>${data.topPerformer.name} (Average Score: ${data.topPerformer.averageScore.toFixed(2)})</p>
        </div>
        <div class="result-section">
            <h2>Users by Age Groups</h2>
            <h3>Under 30</h3>
            <ul>
                ${data.ageGroups.under30.map(user => `<li>${user.name} (Age: ${user.age})</li>`).join('')}
            </ul>
            <h3>30 and Above</h3>
            <ul>
                ${data.ageGroups.over30.map(user => `<li>${user.name} (Age: ${user.age})</li>`).join('')}
            </ul>
        </div>
    `;
}


const processedData = processUsers(users);
renderResults(processedData);




  