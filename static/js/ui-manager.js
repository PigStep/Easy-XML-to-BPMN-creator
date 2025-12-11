/**
 * Управление UI элементами
 */
class UIManager {
    constructor() {
        this.messageDiv = document.getElementById('message');
    }

    showMessage(text, type = 'info') {
        this.messageDiv.textContent = text;
        this.messageDiv.className = type;

        if (type === 'success') {
            setTimeout(() => {
                this.messageDiv.textContent = '';
                this.messageDiv.className = '';
            }, 3000);
        }
    }

    showTab(tabName) {
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.style.display = 'none';
        });
        document.getElementById(tabName).style.display = 'block';

        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
        });
        event.target.classList.add('active');
    }

    updateEditModeUI(isEditMode) {
        const editBtn = document.getElementById('edit-toggle');
        const saveBtn = document.getElementById('save-btn');
        const container = document.getElementById('bpmn-container');

        if (isEditMode) {
            editBtn.textContent = 'Режим просмотра';
            editBtn.classList.add('edit-mode');
            saveBtn.style.display = 'inline-block';
            container.classList.add('edit-mode');
            this.showMessage('Режим редактирования включен', 'info');
        } else {
            editBtn.textContent = 'Режим редактирования';
            editBtn.classList.remove('edit-mode');
            saveBtn.style.display = 'none';
            container.classList.remove('edit-mode');
            this.showMessage('Режим просмотра включен', 'info');
        }
    }
}