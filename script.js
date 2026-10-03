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
// Словарь связей: ID селекта -> ID инпута
const customFieldsMap = {
    'background': 'background_custom',
    'hair_color': 'hair_color_custom',
    'eye_color': 'eye_color_custom',
    'pose': 'pose_custom',
    'top': 'top_custom',
    'top_color': 'top_color_custom',
    'bottom': 'bottom_custom',
    'bottom_color': 'bottom_color_custom'
};

// Навешиваем обработчики на все пары автоматически
for (const [selectId, inputId] of Object.entries(customFieldsMap)) {
    const selectEl = document.getElementById(selectId);
    const inputEl = document.getElementById(inputId);

    if (selectEl && inputEl) {
        selectEl.addEventListener('change', function() {
            // Показываем, если выбрано "" (Свой вариант) или "custom"
            if (this.value === "" || this.value === "custom") {
                inputEl.style.display = 'block';
                inputEl.focus(); // Сразу ставим курсор в поле для удобства
            } else {
                inputEl.style.display = 'none';
                inputEl.value = ''; // Очищаем значение, чтобы оно не попало в промпт случайно!
            }
        });
    }
}

// ==========================================
// 2. СБОРКА ОПИСАНИЯ ОБРАЗА
// ==========================================
function buildDescription() {
    const parts = [];
    parts.push('1girl, solo');

    const framing = getVal('framing');
    const isFullBody = framing === 'full body'; // Запоминаем, выбран ли полный рост

    if (framing) {
        parts.push(framing);

        // 🔥 МАГИЯ ДЛЯ ПОЛНОГО РОСТА
        if (isFullBody) {
            // Эти теги заставляют модель отдалить камеру и прорисовать детали
            parts.push('wide shot, detailed full body, perfect anatomy, detailed feet, sharp focus');
        }
    }


    // Волосы
    const hairColorCustom = getVal('hair_color_custom');
    if (hairColorCustom) parts.push(hairColorCustom);
    else {
        const hairColor = getVal('hair_color');
        if (hairColor) parts.push(hairColor);
    }

    const hairLength = getVal('hair_length');
    if (hairLength) parts.push(hairLength);

    const hairStyle = getVal('hair_style');
    if (hairStyle) parts.push(hairStyle);

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
    const finalText = buildDescription();
    document.getElementById('result').value = finalText;

    if (!finalText) {
        alert("Сначала собери описание образа!");
        return;
    }

    // 🔥 Собираем словарь переопределений (overrides)
    const overrides = {};
    const framing = getVal('framing');

    if (framing === 'full body') {
        overrides.steps = 28; // Увеличиваем шаги для полного роста
        // В будущем можно добавить что угодно, например:
        // overrides.cfg_scale = 5.0;
        // overrides.negative_additions = "bad feet, missing legs, cropped";
    }

    const payload = {
        action: "generate_from_webapp",
        prompt: finalText,
        overrides: overrides  // <-- Передаем словарь (даже если он пустой {})
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