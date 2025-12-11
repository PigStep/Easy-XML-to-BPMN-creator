/**
 * Main application file - initialization and event handling
 */
(function () {
    let bpmnViewer;
    let bpmnControls;
    let uiManager;

    // Initialization on page load
    window.addEventListener('DOMContentLoaded', async () => {
        try {
            // Initialize components
            bpmnViewer = new BPMNViewer();
            uiManager = new UIManager();

            bpmnViewer.initialize();
            bpmnControls = new BPMNControls(bpmnViewer);

            // Load example on start
            const defaultXML = await bpmnControls.loadExampleFromServer();
            document.getElementById('xml-input').value = defaultXML;
            await bpmnViewer.loadXML(defaultXML);
            uiManager.showMessage('BPMN diagram loaded!', 'success');
            setupEventListeners();
        } catch (error) {
            console.error('Initialization error:', error);
            uiManager.showMessage('Initialization error: ' + error.message, 'error');
        }
    });

    // Setup all event handlers
    function setupEventListeners() {
        // Tabs
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                uiManager.showTab(tabName);
            });
        });

        // Load from text
        document.getElementById('load-from-text').addEventListener('click', async () => {
            try {
                const xml = document.getElementById('xml-input').value.trim();
                if (!xml) throw new Error('Enter BPMN XML');

                uiManager.showMessage('Loading BPMN...', 'info');
                await bpmnViewer.loadXML(xml);
                uiManager.showMessage('BPMN diagram loaded!', 'success');
            } catch (error) {
                uiManager.showMessage('Error: ' + error.message, 'error');
            }
        });

        // Load example
        document.getElementById('load-example').addEventListener('click', async () => {
            try {
                const xml = await bpmnControls.loadExampleFromServer();
                document.getElementById('xml-input').value = xml;
                await bpmnViewer.loadXML(xml);
                uiManager.showMessage('Example loaded!', 'success');
            } catch (error) {
                uiManager.showMessage('Example load error: ' + error.message, 'error');
            }
        });

        // Load from file
        document.getElementById('choose-file-btn').addEventListener('click', () => {
            document.getElementById('file-input').click();
        });

        document.getElementById('file-input').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                const xml = await bpmnControls.loadFromFile(file);
                document.getElementById('xml-input').value = xml;
                await bpmnViewer.loadXML(xml);
                uiManager.showMessage('File loaded!', 'success');
            } catch (error) {
                uiManager.showMessage('File read error: ' + error.message, 'error');
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

        // Download
        document.getElementById('download-svg').addEventListener('click', async () => {
            try {
                await bpmnControls.downloadSVG();
                uiManager.showMessage('SVG file saved!', 'success');
            } catch (error) {
                uiManager.showMessage('SVG save error: ' + error.message, 'error');
            }
        });

        document.getElementById('download-bpmn').addEventListener('click', async () => {
            try {
                await bpmnControls.downloadBPMN();
                uiManager.showMessage('BPMN file saved!', 'success');
            } catch (error) {
                uiManager.showMessage('BPMN save error: ' + error.message, 'error');
            }
        });

        // Edit mode toggle
        document.getElementById('edit-toggle').addEventListener('click', () => {
            const isEditMode = bpmnViewer.toggleEditMode();
            uiManager.updateEditModeUI(isEditMode);
        });

        // Save changes
        document.getElementById('save-btn').addEventListener('click', async () => {
            try {
                const xml = await bpmnViewer.saveXML();
                document.getElementById('xml-input').value = xml;
                uiManager.showMessage('Changes saved!', 'success');
            } catch (error) {
                uiManager.showMessage('Save error: ' + error.message, 'error');
            }
        });
    }
})();