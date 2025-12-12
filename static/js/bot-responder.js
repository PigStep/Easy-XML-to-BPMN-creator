class BotResponder {
    /**
     * Генерирует ответ бота на основе пользовательского сообщения
     * @param {string} userMessage - Сообщение пользователя
     * @returns {string} Ответ бота
     */
    generateResponse(userMessage) {
        // Простой ответ бота (можно заменить на AI интеграцию)
        return `Получил ваш запрос: "${userMessage}". В будущем здесь будет интеграция с AI.`;
    }

    /**
     * Генерирует ответ с задержкой (асинхронно)
     * @param {string} userMessage - Сообщение пользователя
     * @param {number} delay - Задержка в миллисекундах
     * @returns {Promise<string>} Promise с ответом бота
     */
    generateResponseAsync(userMessage, delay = 500) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.generateResponse(userMessage));
            }, delay);
        });
    }
}