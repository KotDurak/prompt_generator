// ==========================================
// 0. ИНИЦИАЛИЗАЦИЯ TELEGRAM WEB APP
// ==========================================
const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

function getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
}

function isChecked(id) {
    const el = document.getElementById(id);
    return el ? el.checked : false;
}

// ==========================================
// 1. УМНАЯ ЛОГИКА ИНТЕРФЕЙСА (Показ/Скрытие)
// ==========================================
const customFieldsMap = {
    'background': 'background_custom',
    'hair_color': 'hair_color_custom',
    'hair_style': 'hair_style_custom', // 🔥 ДОБАВЛЕНО
    'eye_color': 'eye_color_custom',
    'pose': 'pose_custom',
    'top': 'top_custom',
    'top_color': 'top_color_custom',
    'bottom': 'bottom_custom',
    'bottom_color': 'bottom_color_custom'
};

for (const [selectId, inputId] of Object.entries(customFieldsMap)) {
    const selectEl = document.getElementById(selectId);
    const inputEl = document.getElementById(inputId);

    if (selectEl && inputEl) {
        selectEl.addEventListener('change', function() {
            if (this.value === "" || this.value === "custom") {
                inputEl.style.display = 'block';
                inputEl.focus();
            } else {
                inputEl.style.display = 'none';
                inputEl.value = '';
            }
        });
    }
}

// Функция для чекбокса ручной правки
function toggleManualEdit() {
    const textarea = document.getElementById('result');
    const checkbox = document.getElementById('manual_edit');
    textarea.readOnly = !checkbox.checked;

    if (checkbox.checked) {
        textarea.style.background = '#fff';
        textarea.style.borderColor = '#a1c4fd';
        textarea.focus();
    } else {
        textarea.style.background = 'rgba(255, 255, 255, 0.8)';
    }
}

// ==========================================
// 2. СБОРКА ОПИСАНИЯ ОБРАЗА
// ==========================================
function buildDescription() {
    const parts = [];
    parts.push('1girl, solo');

    const framing = getVal('framing');
    const isFullBody = framing === 'full body';

    if (framing) {
        parts.push(framing);
        if (isFullBody) {
            // Заставляем модель сфокусироваться на четкости лица и деталей на расстоянии
            parts.push('ultra-detailed face, highly detailed eyes, crisp linework, sharp focus, detailed clothes');
        }
    }

    // Волосы (Цвет)
    const hairColorCustom = getVal('hair_color_custom');
    if (hairColorCustom) parts.push(hairColorCustom);
    else {
        const hairColor = getVal('hair_color');
        if (hairColor) parts.push(hairColor);
    }

    const hairLength = getVal('hair_length');
    if (hairLength) parts.push(hairLength);

    // Волосы (Прическа) - 🔥 ИСПРАВЛЕНО
    const hairStyleCustom = getVal('hair_style_custom');
    if (hairStyleCustom) parts.push(hairStyleCustom);
    else {
        const hairStyle = getVal('hair_style');
        if (hairStyle) parts.push(hairStyle);
    }

    // Глаза
    const eyeColorCustom = getVal('eye_color_custom');
    if (eyeColorCustom) parts.push(eyeColorCustom);
    else {
        const eyeColor = getVal('eye_color');
        if (eyeColor) parts.push(eyeColor);
    }

    // Тело и Поза
    const bodyType = getVal('body_type');
    if (bodyType) parts.push(bodyType);

    const poseCustom = getVal('pose_custom');
    if (poseCustom) parts.push(poseCustom);
    else {
        const pose = getVal('pose');
        if (pose) parts.push(pose);
    }

    // Одежда (Верх)
    const topColorCustom = getVal('top_color_custom');
    let topColor = topColorCustom || getVal('top_color');
    if (topColor === 'custom') topColor = '';

    const topCustom = getVal('top_custom');
    let topValue = topCustom || getVal('top');
    if (topValue === 'custom') topValue = '';

    if (topColor && topValue) {
        const combined = `${topColor} ${topValue}`;
        if (combined.split(' ').length <= 2) parts.push(combined);
        else {
            const anchor = topValue.split(' ').pop();
            parts.push(`${topColor} ${anchor}`, topValue);
        }
    } else if (topColor) parts.push(topColor);
    else if (topValue) parts.push(topValue);

    // Одежда (Низ)
    const bottomColorCustom = getVal('bottom_color_custom');
    let bottomColor = bottomColorCustom || getVal('bottom_color');
    if (bottomColor === 'custom') bottomColor = '';

    const bottomCustom = getVal('bottom_custom');
    let bottomValue = bottomCustom || getVal('bottom');
    if (bottomValue === 'custom') bottomValue = '';

    if (bottomColor && bottomValue) {
        const combined = `${bottomColor} ${bottomValue}`;
        if (combined.split(' ').length <= 2) parts.push(combined);
        else {
            const anchor = bottomValue.split(' ').pop();
            parts.push(`${bottomColor} ${anchor}`, bottomValue);
        }
    } else if (bottomColor) parts.push(bottomColor);
    else if (bottomValue) parts.push(bottomValue);

    const legs = getVal('legs');
    if (legs) parts.push(legs);

    const shoes = getVal('shoes');
    if (shoes) parts.push(shoes);

    // Фон
    const bgCustom = getVal('background_custom');
    if (bgCustom) parts.push(bgCustom);
    else {
        const bg = getVal('background');
        if (bg) parts.push(bg);
    }

    // Освещение и аксессуары
    const lighting = getVal('lighting');
    if (lighting) parts.push(lighting);

    if (isChecked('glasses')) parts.push('glasses');

    // Дополнительно
    const extra = getVal('extra');
    if (extra) parts.push(extra);

    return parts.filter(Boolean).join(', ');
}

// ==========================================
// 3. ДЕЙСТВИЯ
// ==========================================
function previewDescription() {
    const isManual = document.getElementById('manual_edit').checked;
    if (isManual && document.getElementById('result').value.trim() !== '') {
        if (!confirm('Сборка из кнопок перезапишет ваш ручной текст. Продолжить?')) {
            return;
        }
    }

    document.getElementById('result').value = buildDescription();
    if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
}

function copyDescription() {
    let text = document.getElementById('result').value.trim();
    if (!text) {
        text = buildDescription();
        document.getElementById('result').value = text;
    }
    const textarea = document.getElementById('result');
    textarea.select();
    document.execCommand('copy');

    const btn = document.getElementById('copyBtn');
    const originalText = btn.textContent;
    btn.textContent = '✅ Скопировано!';
    if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
    setTimeout(() => { btn.textContent = originalText; }, 2000);
}

function sendToBot() {
    let finalText = document.getElementById('result').value.trim();

    // Если поле пустое, собираем из кнопок. Если есть ручной текст — берем его.
    if (!finalText) {
        finalText = buildDescription();
        document.getElementById('result').value = finalText;
    }

    if (!finalText) {
        alert("Сначала собери описание образа!");
        return;
    }

    // Собираем overrides
    const overrides = {};
    const framing = getVal('framing');
    if (framing === 'full body') {
        overrides.steps = 30;
    }

    const payload = {
        action: "generate_from_webapp",
        prompt: finalText,
        overrides: overrides
    };

    if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');

    try {
        tg.sendData(JSON.stringify(payload));
        setTimeout(() => { tg.close(); }, 400);
    } catch (error) {
        console.error("Ошибка отправки:", error);
        alert("Ошибка отправки: " + error.message);
    }
}

// ==========================================
// ВИЗУАЛИЗАЦИЯ ЦВЕТОВ В SELECT (CSS Swatches)
// ==========================================
const colorMap = {
    // Волосы и глаза (специфичные)
    'red hair': '#ff4d4d', 'white hair': '#ffffff', 'silver hair': '#c0c0c0',
    'black hair': '#222222', 'brown hair': '#8b5a2b', 'blonde hair': '#ffe066',
    'pink hair': '#ff99cc', 'blue hair': '#4d94ff', 'green hair': '#4dff88',
    'purple hair': '#b366ff', 'multicolor hair': 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)',
    'lilac hair': '#c8a2c8',  'light blue hair': '#87ceeb',
    'red eyes': '#ff4d4d', 'blue eyes': '#4d94ff', 'green eyes': '#4dff88',
    'golden eyes': '#ffd700', 'purple eyes': '#b366ff', 'pink eyes': '#ff99cc',
    'cyan eyes': '#00ffff', 'yellow eyes': '#ffff4d', 'white eyes': '#f0f0f0',

    // 🔥 БАЗОВЫЕ ЦВЕТА (для одежды и всего остального)
    'red': '#ff4d4d',
    'white': '#ffffff',
    'black': '#222222',
    'blue': '#4d94ff',
    'pink': '#ff99cc',
    'purple': '#b366ff'
};

function updateColorSwatch(selectElement) {
    const color = colorMap[selectElement.value];
    if (color) {
        // Рисуем идеальный кружок через CSS-градиент
        selectElement.style.backgroundImage = `radial-gradient(circle, ${color} 100%)`;

        // Особая магия для разноцветных волос
        if (selectElement.value === 'multicolor hair') {
            selectElement.style.backgroundImage = `conic-gradient(red, yellow, lime, aqua, blue, magenta, red)`;
        }
    } else {
        // Если выбран "Свой вариант" или "Не важно"
        selectElement.style.backgroundImage = `radial-gradient(circle, #cccccc 100%)`;
    }
}

// Навешиваем обработчики на цвета волос и глаз
const hairColorSelect = document.getElementById('hair_color');
const eyeColorSelect = document.getElementById('eye_color');

const topColorSelect = document.getElementById('top_color');
const bottomColorSelect = document.getElementById('bottom_color');

if (hairColorSelect) {
    hairColorSelect.addEventListener('change', function() { updateColorSwatch(this); });
    updateColorSwatch(hairColorSelect); // Устанавливаем цвет при загрузке
}

if (eyeColorSelect) {
    eyeColorSelect.addEventListener('change', function() { updateColorSwatch(this); });
    updateColorSwatch(eyeColorSelect); // Устанавливаем цвет при загрузке
}

if (topColorSelect) {
    topColorSelect.addEventListener('change', function() { updateColorSwatch(this); });
    updateColorSwatch(topColorSelect); // Устанавливаем цвет при загрузке
}

if (bottomColorSelect) {
    bottomColorSelect.addEventListener('change', function() { updateColorSwatch(this); });
    updateColorSwatch(bottomColorSelect); // Устанавливаем цвет при загрузке
}