import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Раздаем статические файлы
app.use(express.static(__dirname));

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'viewer.html'));
});

// API endpoint для генерации BPMN (можно расширить)
app.get('/api/generate-bpmn', (req, res) => {
    // Здесь можно добавить логику генерации BPMN из вашего Node.js кода
    res.json({
        message: 'BPMN generation endpoint',
        status: 'active'
    });
});

app.listen(port, () => {
    console.log(`✅ Сервер запущен на http://localhost:${port}`);
    console.log(`📊 BPMN Viewer доступен по указанному адресу`);
});