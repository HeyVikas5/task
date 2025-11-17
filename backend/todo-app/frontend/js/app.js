// ========================================
// Configuration
// ========================================
const API_BASE_URL = 'http://localhost:5000/api';
const API_ENDPOINTS = {
  todos: `${API_BASE_URL}/todos`,
  stats: `${API_BASE_URL}/todos/stats/summary`,
};

// ========================================
// State Management
// ========================================
let todos = [];
let currentFilter = 'all';
let currentSort = 'newest';
let editingTodoId = null;

// ========================================
// DOM Elements
// ========================================
const elements = {
  // Form
  todoForm: document.getElementById('todoForm'),
  todoTitle: document.getElementById('todoTitle'),
  todoDescription: document.getElementById('todoDescription'),
  todoPriority: document.getElementById('todoPriority'),
  todoDueDate: document.getElementById('todoDueDate'),
  submitBtn: document.getElementById('submitBtn'),
  cancelBtn: document.getElementById('cancelBtn'),
  titleCharCount: document.getElementById('titleCharCount'),
  descCharCount: document.getElementById('descCharCount'),
  
  // Filters and Sort
  filterBtns: document.querySelectorAll('.filter-btn'),
  sortSelect: document.getElementById('sortSelect'),
  
  // Containers
  todosContainer: document.getElementById('todosContainer'),
  emptyState: document.getElementById('emptyState'),
  loadingOverlay: document.getElementById('loadingOverlay'),
  
  // Stats
  totalCount: document.getElementById('totalCount'),
  activeCount: document.getElementById('activeCount'),
  completedCount: document.getElementById('completedCount'),
  allBadge: document.getElementById('allBadge'),
  activeBadge: document.getElementById('activeBadge'),
  completedBadge: document.getElementById('completedBadge'),
  
  // Toast
  toast: document.getElementById('toast'),
  toastMessage: document.querySelector('.toast-message'),
  toastClose: document.querySelector('.toast-close'),
};

// ========================================
// Utility Functions
// ========================================

// Show loading overlay
function showLoading() {
  elements.loadingOverlay.classList.remove('hidden');
}

// Hide loading overlay
function hideLoading() {
  elements.loadingOverlay.classList.add('hidden');
}

// Show toast notification
function showToast(message, type = 'success') {
  const icon = elements.toast.querySelector('.toast-icon');
  const iconMap = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    info: 'fas fa-info-circle',
  };
  
  icon.className = `toast-icon ${iconMap[type] || iconMap.success}`;
  elements.toastMessage.textContent = message;
  elements.toast.classList.remove('hidden');
  elements.toast.classList.add('show', type);
  
  setTimeout(() => {
    elements.toast.classList.remove('show');
    setTimeout(() => elements.toast.classList.add('hidden'), 300);
  }, 3000);
}

// Format date
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// ========================================
// API Functions
// ========================================

// Fetch all todos
async function fetchTodos() {
  try {
    showLoading();
    const params = new URLSearchParams();
    
    if (currentFilter === 'completed') {
      params.append('completed', 'true');
    } else if (currentFilter === 'active') {
      params.append('completed', 'false');
    }
    
    if (currentSort !== 'newest') {
      params.append('sort', currentSort);
    }
    
    const url = `${API_ENDPOINTS.todos}${params.toString() ? '?' + params.toString() : ''}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.success) {
      todos = data.data;
      renderTodos();
      updateStats();
    } else {
      showToast('Failed to fetch todos', 'error');
    }
  } catch (error) {
    console.error('Error fetching todos:', error);
    showToast('Failed to connect to server', 'error');
  } finally {
    hideLoading();
  }
}

// Create new todo
async function createTodo(todoData) {
  try {
    showLoading();
    const response = await fetch(API_ENDPOINTS.todos, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });
    
    const data = await response.json();
    
    if (data.success) {
      showToast('Task created successfully!');
      await fetchTodos();
      resetForm();
    } else {
      showToast(data.message || 'Failed to create task', 'error');
    }
  } catch (error) {
    console.error('Error creating todo:', error);
    showToast('Failed to create task', 'error');
  } finally {
    hideLoading();
  }
}

// Update todo
async function updateTodo(id, todoData) {
  try {
    showLoading();
    const response = await fetch(`${API_ENDPOINTS.todos}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });
    
    const data = await response.json();
    
    if (data.success) {
      showToast('Task updated successfully!');
      await fetchTodos();
      if (editingTodoId) {
        resetForm();
      }
    } else {
      showToast(data.message || 'Failed to update task', 'error');
    }
  } catch (error) {
    console.error('Error updating todo:', error);
    showToast('Failed to update task', 'error');
  } finally {
    hideLoading();
  }
}

// Delete todo
async function deleteTodo(id) {
  if (!confirm('Are you sure you want to delete this task?')) {
    return;
  }
  
  try {
    showLoading();
    const response = await fetch(`${API_ENDPOINTS.todos}/${id}`, {
      method: 'DELETE',
    });
    
    const data = await response.json();
    
    if (data.success) {
      showToast('Task deleted successfully!');
      await fetchTodos();
    } else {
      showToast(data.message || 'Failed to delete task', 'error');
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
    showToast('Failed to delete task', 'error');
  } finally {
    hideLoading();
  }
}

// Update stats
async function updateStats() {
  try {
    const response = await fetch(API_ENDPOINTS.stats);
    const data = await response.json();
    
    if (data.success) {
      const stats = data.data;
      elements.totalCount.textContent = stats.total;
      elements.activeCount.textContent = stats.active;
      elements.completedCount.textContent = stats.completed;
      elements.allBadge.textContent = stats.total;
      elements.activeBadge.textContent = stats.active;
      elements.completedBadge.textContent = stats.completed;
    }
  } catch (error) {
    console.error('Error fetching stats:', error);
  }
}

// ========================================
// Render Functions
// ========================================

// Render todos
function renderTodos() {
  const container = elements.todosContainer;
  
  if (todos.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-clipboard-list"></i>
        <h3>No tasks yet</h3>
        <p>Create your first task to get started!</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = todos.map(todo => `
    <div class="todo-card ${todo.completed ? 'completed' : ''}" data-id="${todo._id}">
      <div class="todo-header">
        <div class="todo-checkbox">
          <input 
            type="checkbox" 
            ${todo.completed ? 'checked' : ''} 
            onchange="toggleTodo('${todo._id}', ${!todo.completed})"
          >
          <label></label>
        </div>
        <div class="todo-content">
          <h3 class="todo-title">${todo.title}</h3>
          ${todo.description ? `<p class="todo-description">${todo.description}</p>` : ''}
        </div>
        <div class="todo-actions">
          <button class="btn-icon" onclick="editTodo('${todo._id}')" title="Edit">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn-icon" onclick="deleteTodo('${todo._id}')" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <div class="todo-footer">
        <span class="todo-priority priority-${todo.priority}">
          ${todo.priority === 'high' ? '🔴' : todo.priority === 'medium' ? '🟡' : '🟢'} 
          ${todo.priority}
        </span>
        ${todo.dueDate ? `<span class="todo-date"><i class="fas fa-calendar"></i> ${formatDate(todo.dueDate)}</span>` : ''}
        <span class="todo-created">Created ${formatDate(todo.createdAt)}</span>
      </div>
    </div>
  `).join('');
}

// ========================================
// Form Handlers
// ========================================

// Handle form submit
function handleFormSubmit(e) {
  e.preventDefault();
  
  const todoData = {
    title: elements.todoTitle.value.trim(),
    description: elements.todoDescription.value.trim(),
    priority: elements.todoPriority.value,
    completed: false,
  };
  
  if (elements.todoDueDate.value) {
    todoData.dueDate = elements.todoDueDate.value;
  }
  
  if (editingTodoId) {
    updateTodo(editingTodoId, todoData);
  } else {
    createTodo(todoData);
  }
}

// Reset form
function resetForm() {
  elements.todoForm.reset();
  elements.titleCharCount.textContent = '0/100';
  elements.descCharCount.textContent = '0/500';
  elements.submitBtn.innerHTML = '<i class="fas fa-plus"></i> <span>Add Task</span>';
  elements.cancelBtn.style.display = 'none';
  editingTodoId = null;
}

// Edit todo
function editTodo(id) {
  const todo = todos.find(t => t._id === id);
  if (!todo) return;
  
  elements.todoTitle.value = todo.title;
  elements.todoDescription.value = todo.description || '';
  elements.todoPriority.value = todo.priority;
  elements.todoDueDate.value = todo.dueDate ? todo.dueDate.split('T')[0] : '';
  
  elements.titleCharCount.textContent = `${todo.title.length}/100`;
  elements.descCharCount.textContent = `${(todo.description || '').length}/500`;
  
  elements.submitBtn.innerHTML = '<i class="fas fa-save"></i> <span>Update Task</span>';
  elements.cancelBtn.style.display = 'inline-flex';
  
  editingTodoId = id;
  
  // Scroll to form
  elements.todoForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Toggle todo completion
function toggleTodo(id, completed) {
  updateTodo(id, { completed });
}

// ========================================
// Event Listeners
// ========================================

// Form submission
elements.todoForm.addEventListener('submit', handleFormSubmit);

// Cancel button
elements.cancelBtn.addEventListener('click', resetForm);

// Character counters
elements.todoTitle.addEventListener('input', (e) => {
  elements.titleCharCount.textContent = `${e.target.value.length}/100`;
});

elements.todoDescription.addEventListener('input', (e) => {
  elements.descCharCount.textContent = `${e.target.value.length}/500`;
});

// Filter buttons
elements.filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    elements.filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    fetchTodos();
  });
});

// Sort select
elements.sortSelect.addEventListener('change', (e) => {
  currentSort = e.target.value;
  fetchTodos();
});

// Toast close
elements.toastClose.addEventListener('click', () => {
  elements.toast.classList.remove('show');
  setTimeout(() => elements.toast.classList.add('hidden'), 300);
});

// ========================================
// Initialize App
// ========================================

// Load todos on page load
document.addEventListener('DOMContentLoaded', () => {
  fetchTodos();
});