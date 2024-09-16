// Mock user data for login simulation
const users = [
    { username: 'amrit', password: 'joshi', role: 'admin' },
    { username: 'joshi', password: 'amrit', role: 'employee' },
];

// Mock tasks data
const tasks = [
    { id: 1, name: 'Task 1', description: 'Complete project report', assignedTo: 'employee', status: 'pending' },
    { id: 2, name: 'Task 2', description: 'Prepare presentation slides', assignedTo: 'employee', status: 'pending' },
];

// Handle Login
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Store user role in localStorage
        localStorage.setItem('userRole', user.role);
        displayDashboard(user.role);
    } else {
        document.getElementById('error-message').textContent = 'Invalid username or password';
    }
});

// Display the appropriate dashboard
function displayDashboard(role) {
    document.getElementById('login-page').style.display = 'none';

    if (role === 'admin') {
        document.getElementById('admin-dashboard').style.display = 'block';
    } else if (role === 'employee') {
        document.getElementById('employee-dashboard').style.display = 'block';
        loadTasks();
    }
}

// Load tasks for the employee
function loadTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear existing tasks

    tasks.filter(task => task.assignedTo === 'employee').forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <div>
                <strong>${task.name}</strong><br>
                ${task.description}
            </div>
            <button onclick="completeTask(${task.id})">${task.status === 'pending' ? 'Mark as Complete' : 'Completed'}</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Mark task as complete
function completeTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.status = 'completed';
        loadTasks(); // Reload tasks to reflect status change
    }
}

// Logout
function logout() {
    localStorage.removeItem('userRole');
    document.getElementById('admin-dashboard').style.display = 'none';
    document.getElementById('employee-dashboard').style.display = 'none';
    document.getElementById('login-page').style.display = 'block';
}

// Check if user is already logged in
window.onload = function () {
    const role = localStorage.getItem('userRole');
    if (role) {
        displayDashboard(role);
    }
};
