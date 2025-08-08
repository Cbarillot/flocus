/**
 * Modern Flocus Design System - JavaScript
 * Handles theme switching, glassmorphism effects, and interactive components
 */

class ModernFlocusDesign {
  constructor() {
    this.currentTheme = 'dark';
    this.init();
  }

  init() {
    this.createThemeToggle();
    this.createTodoMiniTab();
    this.applyGlassmorphismEffects();
    this.enhanceExistingComponents();
    this.loadSavedTheme();
    this.addEventListeners();
  }

  createThemeToggle() {
    // Check if toggle already exists
    if (document.querySelector('.theme-toggle')) return;

    const toggle = document.createElement('div');
    toggle.className = 'theme-toggle';
    toggle.innerHTML = `
      <button id="dark-theme-btn" class="active" title="Dark Theme">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </button>
      <button id="light-theme-btn" title="Light Theme">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
      </button>
    `;

    document.body.appendChild(toggle);

    // Add event listeners
    document.getElementById('dark-theme-btn').addEventListener('click', () => this.setTheme('dark'));
    document.getElementById('light-theme-btn').addEventListener('click', () => this.setTheme('light'));
  }

  createTodoMiniTab() {
    // Check if todo tab already exists
    if (document.querySelector('.todo-mini-tab')) return;

    const todoTab = document.createElement('div');
    todoTab.className = 'todo-mini-tab';
    todoTab.innerHTML = `
      <div class="todo-handle">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
        </svg>
      </div>
      <div class="todo-content">
        <h3>Quick Tasks</h3>
        <div class="todo-items">
          <div class="todo-item">Set up focus session</div>
          <div class="todo-item">Choose ambient sounds</div>
          <div class="todo-item">Adjust productivity settings</div>
        </div>
        <div class="mt-3">
          <input type="text" class="form-control form-control-sm form-control-modern" placeholder="Add new task..." id="new-todo-input">
          <button class="btn btn-primary btn-modern btn-sm mt-2 w-100" id="add-todo-btn">Add Task</button>
        </div>
      </div>
    `;

    document.body.appendChild(todoTab);

    // Add event listeners
    const handle = todoTab.querySelector('.todo-handle');
    const addBtn = todoTab.querySelector('#add-todo-btn');
    const input = todoTab.querySelector('#new-todo-input');

    handle.addEventListener('click', () => this.toggleTodoTab());
    addBtn.addEventListener('click', () => this.addTodoItem());
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addTodoItem();
    });
  }

  toggleTodoTab() {
    const todoTab = document.querySelector('.todo-mini-tab');
    todoTab.classList.toggle('active');
  }

  addTodoItem() {
    const input = document.getElementById('new-todo-input');
    const text = input.value.trim();
    
    if (!text) return;

    const todoItems = document.querySelector('.todo-items');
    const item = document.createElement('div');
    item.className = 'todo-item';
    item.textContent = text;
    
    // Add click to remove functionality
    item.addEventListener('click', function() {
      this.style.opacity = '0.5';
      this.style.textDecoration = 'line-through';
      setTimeout(() => this.remove(), 300);
    });

    todoItems.appendChild(item);
    input.value = '';
    
    // Add smooth animation
    item.style.opacity = '0';
    item.style.transform = 'translateY(10px)';
    setTimeout(() => {
      item.style.transition = 'all 0.3s ease';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 10);
  }

  applyGlassmorphismEffects() {
    // Apply glass effects to existing modal components
    const modals = document.querySelectorAll('.modal-content');
    modals.forEach(modal => {
      if (!modal.classList.contains('glass-effect')) {
        modal.classList.add('glass-effect');
      }
    });

    // Apply to forms
    const forms = document.querySelectorAll('.form-control');
    forms.forEach(form => {
      if (!form.classList.contains('form-control-modern')) {
        form.classList.add('form-control-modern');
      }
    });

    // Apply to buttons
    const buttons = document.querySelectorAll('.btn:not(.btn-modern)');
    buttons.forEach(btn => {
      btn.classList.add('btn-modern');
    });
  }

  enhanceExistingComponents() {
    // Enhance sound players
    const soundPlayers = document.querySelectorAll('sound-player');
    soundPlayers.forEach(player => {
      if (!player.classList.contains('glass-effect')) {
        player.classList.add('glass-effect');
      }
    });

    // Enhance settings panels
    const settingsPanels = document.querySelectorAll('settings-panel');
    settingsPanels.forEach(panel => {
      if (!panel.classList.contains('glass-effect')) {
        panel.classList.add('glass-effect');
      }
    });

    // Enhance navigation tabs
    const navTabs = document.querySelectorAll('.nav-tabs');
    navTabs.forEach(nav => {
      if (!nav.classList.contains('glass-effect')) {
        nav.classList.add('glass-effect');
      }
    });

    // Add glassmorphism to offcanvas
    const offcanvasElements = document.querySelectorAll('.offcanvas');
    offcanvasElements.forEach(offcanvas => {
      offcanvas.style.background = 'var(--glass-bg)';
      offcanvas.style.backdropFilter = 'var(--glass-backdrop-filter)';
      offcanvas.style.webkitBackdropFilter = 'var(--glass-backdrop-filter)';
      offcanvas.style.border = '1px solid var(--glass-border)';
    });
  }

  setTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update toggle button states
    const darkBtn = document.getElementById('dark-theme-btn');
    const lightBtn = document.getElementById('light-theme-btn');
    
    if (theme === 'dark') {
      darkBtn.classList.add('active');
      lightBtn.classList.remove('active');
    } else {
      lightBtn.classList.add('active');
      darkBtn.classList.remove('active');
    }
    
    // Save theme preference
    localStorage.setItem('flocus-theme', theme);
    
    // Trigger theme change event
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
  }

  loadSavedTheme() {
    const savedTheme = localStorage.getItem('flocus-theme') || 'dark';
    this.setTheme(savedTheme);
  }

  addEventListeners() {
    // Observe for dynamically added content
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              this.enhanceNewElements(node);
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Handle window resize for responsive adjustments
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 250);
    });

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }

  enhanceNewElements(element) {
    // Apply glassmorphism to new modal content
    const newModals = element.querySelectorAll('.modal-content');
    newModals.forEach(modal => modal.classList.add('glass-effect'));

    // Apply modern styles to new forms
    const newForms = element.querySelectorAll('.form-control:not(.form-control-modern)');
    newForms.forEach(form => form.classList.add('form-control-modern'));

    // Apply modern styles to new buttons
    const newButtons = element.querySelectorAll('.btn:not(.btn-modern)');
    newButtons.forEach(btn => btn.classList.add('btn-modern'));

    // Apply to new sound players
    const newSoundPlayers = element.querySelectorAll('sound-player:not(.glass-effect)');
    newSoundPlayers.forEach(player => player.classList.add('glass-effect'));
  }

  handleResize() {
    const todoTab = document.querySelector('.todo-mini-tab');
    if (window.innerWidth <= 576 && todoTab) {
      // Mobile adjustments
      todoTab.style.setProperty('--mobile-height', '50vh');
    }
  }

  // Public API methods
  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  getCurrentTheme() {
    return this.currentTheme;
  }

  addGlassEffect(element) {
    if (element && !element.classList.contains('glass-effect')) {
      element.classList.add('glass-effect');
    }
  }

  removeGlassEffect(element) {
    if (element && element.classList.contains('glass-effect')) {
      element.classList.remove('glass-effect');
    }
  }
}

// Initialize the modern design system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.modernFlocus = new ModernFlocusDesign();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ModernFlocusDesign;
}