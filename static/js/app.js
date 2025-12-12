/**
 * Main application file - initialization and event handling
 */
(function () {
    let bpmnViewer;
    let bpmnControls;
    let uiManager;
    let botResponder;

    // Initialization on page load
    window.addEventListener('DOMContentLoaded', async () => {
        try {
            // Initialize components
            bpmnViewer = new BPMNViewer();
            uiManager = new UIManager();
            bpmnControls = new BPMNControls(bpmnViewer);
            botResponder = new BotResponder();

            bpmnViewer.initialize();

            // Load example on start
            const defaultXML = await bpmnControls.loadExampleFromServer();
            document.getElementById('xml-editor').value = defaultXML;
            await bpmnViewer.loadXML(defaultXML);

            setupEventListeners();
            setupTabSwitching();
        } catch (error) {
            console.error('Initialization error:', error);
        }
    });

    // Setup tab switching
    function setupTabSwitching() {
        const tabButtons = document.querySelectorAll('.tab-btn');

        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetId = e.target.getAttribute('data-target');

                // Update active tab button
                tabButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');

                // Show target content
                document.querySelectorAll('.sidebar-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(targetId).classList.add('active');
            });
        });
    }

    // Setup all event handlers
    function setupEventListeners() {
        // Load from file
        document.getElementById('file-input').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                const xml = await bpmnControls.loadFromFile(file);
                document.getElementById('xml-editor').value = xml;
                await bpmnViewer.loadXML(xml);
            } catch (error) {
                console.error('File read error:', error);
            }
        });

        // Zoom controls
        document.getElementById('zoom-in').addEventListener('click', () => {
            bpmnViewer.zoomIn();
        });

        document.getElementById('zoom-out').addEventListener('click', () => {
            bpmnViewer.zoomOut();
        });

        document.getElementById('fit-viewport').addEventListener('click', () => {
            bpmnViewer.fitViewport();
        });

        // Download controls
        document.getElementById('download-svg').addEventListener('click', async () => {
            try {
                await bpmnControls.downloadSVG();
            } catch (error) {
                console.error('SVG save error:', error);
            }
        });

        document.getElementById('download-bpmn').addEventListener('click', async () => {
            try {
                await bpmnControls.downloadBPMN();
            } catch (error) {
                console.error('BPMN save error:', error);
            }
        });

        // Apply XML from editor
        document.getElementById('apply-xml').addEventListener('click', async () => {
            try {
                const xml = document.getElementById('xml-editor').value.trim();
                if (!xml) return;

                await bpmnViewer.loadXML(xml);
            } catch (error) {
                console.error('XML apply error:', error);
            }
        });

        // Chat functionality
        const chatInput = document.getElementById('chat-input');
        const sendChatBtn = document.getElementById('send-chat');
        const chatHistory = document.getElementById('chat-history');

        function addMessage(text, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
            messageDiv.innerHTML = `<div class="msg-content">${text}</div>`;
            chatHistory.appendChild(messageDiv);
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }

        sendChatBtn.addEventListener('click', async () => {
            const text = chatInput.value.trim();
            if (!text) return;

            addMessage(text, true);
            chatInput.value = '';

            // Используем BotResponder для генерации ответа
            try {
                const botResponse = await botResponder.generateResponseAsync(text);
                addMessage(botResponse);
            } catch (error) {
                console.error('Error generating bot response:', error);
                addMessage('Извините, произошла ошибка при обработке вашего запроса.');
            }
        });

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatBtn.click();
            }
        });
    }
})();