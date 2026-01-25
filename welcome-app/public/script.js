class WelcomeApp {
    constructor() {
        this.baseUrl = '/api';
        this.init();
    }

    init() {
        this.loadWelcomeMessage();
        this.setupEventListeners();
        this.loadMessageHistory();
    }

    async loadWelcomeMessage() {
        try {
            const response = await fetch(`${this.baseUrl}/message`);
            const data = await response.json();
            
            if (data.message) {
                document.getElementById('welcomeMessage').textContent = data.message;
            }
        } catch (error) {
            console.error('Error loading message:', error);
            document.getElementById('welcomeMessage').textContent = 'Welcome to our Application!';
            this.showAlert('Failed to load message. Using default.', 'error');
        }
    }

    async updateWelcomeMessage() {
        const newMessage = document.getElementById('newMessage').value.trim();
        
        if (!newMessage) {
            this.showAlert('Please enter a message', 'error');
            return;
        }

        try {
            const response = await fetch(`${this.baseUrl}/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: newMessage })
            });

            const data = await response.json();

            if (response.ok) {
                document.getElementById('welcomeMessage').textContent = data.message;
                document.getElementById('newMessage').value = '';
                this.showAlert(data.success || 'Message updated successfully!', 'success');
                this.loadMessageHistory();
            } else {
                this.showAlert(data.error || 'Failed to update message', 'error');
            }
        } catch (error) {
            console.error('Error updating message:', error);
            this.showAlert('Failed to update message', 'error');
        }
    }

    async loadMessageHistory() {
        try {
            const response = await fetch(`${this.baseUrl}/message/history`);
            const history = await response.json();
            
            this.displayHistory(history);
        } catch (error) {
            console.error('Error loading history:', error);
        }
    }

    displayHistory(history) {
        const historyList = document.getElementById('historyList');
        
        if (!history || history.length === 0) {
            historyList.innerHTML = '<div class="history-item">No history available</div>';
            return;
        }

        historyList.innerHTML = history.map(item => `
            <div class="history-item">
                <div class="history-text">${this.escapeHtml(item.message_text)}</div>
                <div class="history-time">
                    ${new Date(item.created_at).toLocaleString()}
                </div>
            </div>
        `).join('');
    }

    resetToDefault() {
        if (confirm('Reset to default welcome message?')) {
            document.getElementById('newMessage').value = 'Welcome to our Application!';
            this.updateWelcomeMessage();
        }
    }

    showAlert(message, type) {
        const alertElement = document.getElementById('alertMessage');
        alertElement.textContent = message;
        alertElement.className = `alert ${type}`;
        
        // Hide alert after 5 seconds
        setTimeout(() => {
            alertElement.style.display = 'none';
        }, 5000);
    }

    setupEventListeners() {
        // Update button
        document.getElementById('updateBtn').addEventListener('click', () => {
            this.updateWelcomeMessage();
        });

        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetToDefault();
        });

        // Enter key in textarea
        document.getElementById('newMessage').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.updateWelcomeMessage();
            }
        });

        // Toggle history section
        document.getElementById('toggleHistory').addEventListener('click', () => {
            const historyBody = document.getElementById('historyBody');
            const icon = document.querySelector('#toggleHistory i');
            
            if (historyBody.style.display === 'none') {
                historyBody.style.display = 'block';
                icon.className = 'fas fa-chevron-up';
                this.loadMessageHistory();
            } else {
                historyBody.style.display = 'none';
                icon.className = 'fas fa-chevron-down';
            }
        });

        // Auto-refresh message every 30 seconds
        setInterval(() => {
            this.loadWelcomeMessage();
        }, 30000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WelcomeApp();
});