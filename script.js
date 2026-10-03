// ==========================================
// 1. ЛОГИКА ИНТЕРФЕЙСА (выполняется 1 раз при загрузке)
// ==========================================

document.getElementById('top').addEventListener('change', function() {
    document.getElementById('top_custom').style.display = this.value === 'custom' ? 'block' : 'none';
});

document.getElementById('top_color').addEventListener('change', function() {
    document.getElementById('top_color_custom').style.display = this.value === 'custom' ? 'block' : 'none';
});

document.getElementById('bottom').addEventListener('change', function() {
    document.getElementById('bottom_custom').style.display = this.value === 'custom' ? 'block' : 'none';
});

document.getElementById('bottom_color').addEventListener('change', function() {
    document.getElementById('bottom_color_custom').style.display = this.value === 'custom' ? 'block' : 'none';
});


// ==========================================
// 2. ГЕНЕРАЦИЯ ПРОМПТА
// ==========================================

function generatePrompt() {
    const parts = [];

    // 1. База
    parts.push('1girl, solo');

    // 2. Кадрирование
    const framing = document.getElementById('framing').value;
    if (framing) parts.push(framing);

    // 3. Волосы
    const hairColorCustom = document.getElementById('hair_color_custom').value.trim();
    if (hairColorCustom) parts.push(hairColorCustom);
    else {
        const hairColor = document.getElementById('hair_color').value;
        if (hairColor) parts.push(hairColor);
    }

    const hairLength = document.getElementById('hair_length').value;
    if (hairLength) parts.push(hairLength);

    const hairStyle = document.getElementById('hair_style').value;
    if (hairStyle) parts.push(hairStyle);

    // 4. Глаза
    const eyeColor = document.getElementById('eye_color').value;
    if (eyeColor) parts.push(eyeColor);

    // 5. Тело и Поза
    const bodyType = document.getElementById('body_type').value;
    if (bodyType) parts.push(bodyType);

    const poseCustom = document.getElementById('pose_custom').value.trim();
    if (poseCustom) parts.push(poseCustom);
    else {
        const pose = document.getElementById('pose').value;
        if (pose) parts.push(pose);
    }

    // 6. Одежда (Верх) - УМНАЯ СКЛЕЙКА С ЯКОРЕМ
    const topColorCustom = document.getElementById('top_color_custom').value.trim();
    let topColor = topColorCustom || document.getElementById('top_color').value;
    if (topColor === 'custom') topColor = '';

    const topCustom = document.getElementById('top_custom').value.trim();
    let topValue = topCustom || document.getElementById('top').value;
    if (topValue === 'custom') topValue = '';

    if (topColor && topValue) {
        const combined = `${topColor} ${topValue}`;
        if (combined.split(' ').length <= 2) {
            parts.push(combined); // "red bra"
        } else {
            // "white crop top" → "white top, crop top"
            const anchor = topValue.split(' ').pop(); // "top"
            parts.push(`${topColor} ${anchor}`, topValue);
        }
    } else if (topColor) {
        parts.push(topColor);
    } else if (topValue) {
        parts.push(topValue);
    }

    // 7. Одежда (Низ) - УМНАЯ СКЛЕЙКА С ЯКОРЕМ
    const bottomColorCustom = document.getElementById('bottom_color_custom').value.trim();
    let bottomColor = bottomColorCustom || document.getElementById('bottom_color').value;
    if (bottomColor === 'custom') bottomColor = '';

    const bottomCustom = document.getElementById('bottom_custom').value.trim();
    let bottomValue = bottomCustom || document.getElementById('bottom').value;
    if (bottomValue === 'custom') bottomValue = '';

    if (bottomColor && bottomValue) {
        const combined = `${bottomColor} ${bottomValue}`;
        if (combined.split(' ').length <= 2) {
            parts.push(combined); // "white panties"
        } else {
            // "black short shorts" → "black shorts, short shorts"
            const anchor = bottomValue.split(' ').pop(); // "shorts"
            parts.push(`${bottomColor} ${anchor}`, bottomValue);
        }
    } else if (bottomColor) {
        parts.push(bottomColor);
    } else if (bottomValue) {
        parts.push(bottomValue);
    }

    // 8. Ноги
    const legs = document.getElementById('legs').value;
    if (legs) parts.push(legs);

    // 9. Обувь
    const shoes = document.getElementById('shoes').value;
    if (shoes) parts.push(shoes);

    // 10. Фон
    const bgCustom = document.getElementById('background_custom').value.trim();
    if (bgCustom) parts.push(bgCustom);
    else {
        const bg = document.getElementById('background').value;
        if (bg) parts.push(bg);
    }

    // 11. Освещение
    const lighting = document.getElementById('lighting').value;
    if (lighting) parts.push(lighting);

    // 11.5. Аксессуары (очки)
    const glasses = document.getElementById('glasses');
    if (glasses && glasses.checked) {
        parts.push('glasses');
    }


    // 12. Дополнительно
    const extra = document.getElementById('extra').value.trim();
    if (extra) parts.push(extra);

    // Собираем всё через запятую
    document.getElementById('result').value = parts.join(', ');
}


// ==========================================
// 3. КОПИРОВАНИЕ В БУФЕР ОБМЕНА
// ==========================================

function copyPrompt() {
    const textarea = document.getElementById('result');
    const text = textarea.value;

    if (!text) {
        alert('Сначала сгенерируй промпт!');
        return;
    }

    textarea.select();
    document.execCommand('copy');

    const btn = document.getElementById('copyBtn');
    btn.textContent = '✅ Скопировано!';
    btn.classList.add('copied');

    setTimeout(() => {
        btn.textContent = '📋 Копировать';
        btn.classList.remove('copied');
    }, 2000);
}

function sendToBot() {
    const tg = window.Telegram.WebApp;
    const promptText = document.getElementById('result').value.trim();

    if (!promptText) {
        // Используем стандартный alert, он работает везде на 100%
        alert("Сначала нажми '✨ Создать промпт'!");
        return;
    }

    const payload = {
        action: "generate_from_webapp",
        prompt: promptText
    };

    // Вибрация для приятного отклика (если поддерживается)
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('medium');
    }
    alert("Отправлено");
    // Отправляем данные боту. Web App закроется автоматически после этого.
    tg.sendData(JSON.stringify(payload));
}