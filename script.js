
 // Cache elements using getElementById and querySelector
 const taskForm = document.getElementById('task-form');
 const taskInput = document.getElementById('task-input');
 const tasksContainer = document.querySelector('#tasks');

 // Register event listeners
 taskForm.addEventListener('submit', addTask);
 window.addEventListener('load', loadTasks);
 window.addEventListener('beforeunload', saveTasks);

 function addTask(event) {
     event.preventDefault();

     // Validate input
     const taskText = taskInput.value.trim();
     if (taskText === '') {
         alert('Please enter a task');
         return;
     }

     // Create a new task element
     const task = document.createElement('div');
     task.className = 'task';

     // Create the span for task text
     const taskTextSpan = document.createElement('span');
     taskTextSpan.textContent = taskText;

     // Create the delete button
     const deleteButton = document.createElement('button');
     deleteButton.textContent = 'Delete';
     deleteButton.classList.add('delete-button');

     // Add an event listener to the delete button
     deleteButton.addEventListener('click', function(event) {
         event.stopPropagation(); // Prevent the task completion toggle from being triggered
         deleteTask(task);
     });

     // Add an event listener to the task for toggling completion
     task.addEventListener('click', toggleTaskCompletion);

     // Append the text span and delete button to the task element
     task.appendChild(taskTextSpan);
     task.appendChild(deleteButton);

     // Append the task element to the tasks container
     tasksContainer.appendChild(task);

     // Clear the input field
     taskInput.value = '';
 }

 function deleteTask(task) {
     tasksContainer.removeChild(task);
 }

 function toggleTaskCompletion(event) {
     if (event.target.tagName !== 'BUTTON') {
         event.currentTarget.classList.toggle('completed');
     }
 }

 function loadTasks() {
     const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
     savedTasks.forEach(savedTask => {
         // Create the task element
         const task = document.createElement('div');
         task.classList.add('task');
         if (savedTask.completed) {
             task.classList.add('completed');
         }

         // Set the task content
         const taskContent = document.createTextNode(savedTask.content);
         task.appendChild(taskContent);

         // Add click event listener to toggle task completion
         task.addEventListener('click', toggleTaskCompletion);

         // Create and append the delete button
         const deleteBtn = document.createElement('button');
         deleteBtn.classList.add('delete-button');
         deleteBtn.textContent = 'Delete';

         // Add click event listener to delete the task
         deleteBtn.addEventListener('click', function(event) {
             event.stopPropagation();
             deleteTask(task);
         });

         task.appendChild(deleteBtn);

         // Append the task element to the tasks container
         tasksContainer.appendChild(task);
     });
 }

 function saveTasks() {
     const tasks = [];
     tasksContainer.querySelectorAll('.task').forEach(task => {
         tasks.push({
             content: task.querySelector('span').textContent,
             completed: task.classList.contains('completed')
         });
     });
     localStorage.setItem('tasks', JSON.stringify(tasks));
 }

 // BOM Properties
 console.log('Screen Width:', window.screen.width);
 console.log('Screen Height:', window.screen.height);