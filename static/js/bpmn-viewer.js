/**
 * Management of BPMN viewer/modeler
 */
class BPMNViewer {
    constructor() {
        this.viewer = null;
        this.isEditMode = false;
        this.originalXML = '';
    }

    initialize() {
        if (typeof BpmnJS === 'undefined') {
            throw new Error('Библиотека bpmn-js не загружена');
        }

        this.viewer = new BpmnJS({
            container: '#bpmn-container',
            keyboard: { bindTo: window }
        });

        return this.viewer;
    }

    async loadXML(xml) {
        if (!xml || xml.trim() === '') {
            throw new Error('Пустой XML для загрузки');
        }

        await this.viewer.importXML(xml);
        this.originalXML = xml;
        this.fitViewport();
    }

    async saveXML() {
        const result = await this.viewer.saveXML({ format: true });
        this.originalXML = result.xml;
        return result.xml;
    }

    async saveSVG() {
        const result = await this.viewer.saveSVG();
        return result.svg;
    }

    // Zoom control
    zoomIn() {
        const canvas = this.viewer.get('canvas');
        canvas.zoom(canvas.zoom() * 1.2);
    }

    zoomOut() {
        const canvas = this.viewer.get('canvas');
        canvas.zoom(canvas.zoom() * 0.8);
    }

    fitViewport() {
        this.viewer.get('canvas').zoom('fit-viewport');
    }

    // Edit mode
    toggleEditMode() {
        this.isEditMode = !this.isEditMode;
        return this.isEditMode;
    }
}