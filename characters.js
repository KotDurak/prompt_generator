// characters.js
let selectedChar = null;

document.addEventListener('DOMContentLoaded', () => {
    renderCharacters(CHARACTERS_DATA.characters);
    populateSelects();
    setupFilters();
});

function renderCharacters(chars) {
    const grid = document.getElementById('characters-grid');
    if (chars.length === 0) {
        grid.innerHTML = '<p style="color: white; text-align: center; width: 100%; padding: 20px;">Персонажи не найдены 😿</p>';
        return;
    }

    grid.innerHTML = chars.map(char => `
        <div class="character-card" onclick="openCharacter('${char.id}')">
            <img src="${char.image}" alt="${char.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/160x200?text=No+Image'">
            <div class="card-info">
                <h4>${char.name}, ${char.age}</h4>
                <div class="tags">
                    ${char.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <!-- Убрали бейдж LoRA — пользователю не нужно знать -->
            </div>
        </div>
    `).join('');
}

function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const category = e.target.dataset.category;
            const filtered = category === 'all'
                ? CHARACTERS_DATA.characters
                : CHARACTERS_DATA.characters.filter(c => c.category === category);

            renderCharacters(filtered);
        });
    });
}

function openCharacter(charId) {
    selectedChar = CHARACTERS_DATA.characters.find(c => c.id === charId);
    if (!selectedChar) return;

    const modal = document.getElementById('character-modal');
    document.getElementById('modal-char-name').textContent = `${selectedChar.name} (${selectedChar.age})`;
    document.getElementById('modal-char-image').src = selectedChar.image;

    // Сбрасываем поле "Дополнительно" и режим редактирования
    document.getElementById('modal-extra').value = '';
    document.getElementById('modal-prompt-preview').readOnly = true;
    document.getElementById('editBtn').textContent = '✏️ Редактировать';

    modal.style.display = 'flex';

    // 🔥 Обновляем превью промпта
    updatePromptPreview();
}

function populateSelects() {
    const poseSelect = document.getElementById('modal-pose');
    const bgSelect = document.getElementById('modal-background');

    poseSelect.innerHTML = CHARACTERS_DATA.poses.map(p =>
        `<option value="${p.value}">${p.name}</option>`
    ).join('');

    bgSelect.innerHTML = CHARACTERS_DATA.backgrounds.map(b =>
        `<option value="${b.value}">${b.name}</option>`
    ).join('');
}

function useCharacter() {
    if (!selectedChar) return;

    // 🔥 Берем текст из редактируемого поля
    const finalPrompt = document.getElementById('modal-prompt-preview').value;

    const payload = {
        type: 'character_selected',
        prompt: finalPrompt
    };

    Telegram.WebApp.sendData(JSON.stringify(payload));
}

function updatePromptPreview() {
    if (!selectedChar) return;

    const pose = document.getElementById('modal-pose').value;
    const background = document.getElementById('modal-background').value;
    const extra = document.getElementById('modal-extra').value;

    const finalPrompt = [
        selectedChar.base_prompt,
        pose,
        background,
        extra
    ].filter(Boolean).join(', ');

    document.getElementById('modal-prompt-preview').value = finalPrompt;
}

function copyPrompt() {
    const textarea = document.getElementById('modal-prompt-preview');
    textarea.select();
    textarea.setSelectionRange(0, 99999); // Для мобильных

    try {
        navigator.clipboard.writeText(textarea.value).then(() => {
            const btn = document.getElementById('copyBtn');
            btn.textContent = '✅ Скопировано!';
            btn.classList.add('copied');
            setTimeout(() => {
                btn.textContent = '📋 Копировать';
                btn.classList.remove('copied');
            }, 2000);
        });
    } catch (err) {
        // Фоллбэк для старых браузеров
        document.execCommand('copy');
        const btn = document.getElementById('copyBtn');
        btn.textContent = '✅ Скопировано!';
        setTimeout(() => {
            btn.textContent = '📋 Копировать';
        }, 2000);
    }
}

// Переключение режима редактирования
function toggleEdit() {
    const textarea = document.getElementById('modal-prompt-preview');
    const btn = document.getElementById('editBtn');

    if (textarea.readOnly) {
        textarea.readOnly = false;
        btn.textContent = '🔒 Заблокировать';
        textarea.focus();
    } else {
        textarea.readOnly = true;
        btn.textContent = '✏️ Редактировать';
    }
}

document.querySelector('.close-modal').onclick = () => {
    document.getElementById('character-modal').style.display = 'none';
};

window.onclick = (event) => {
    const modal = document.getElementById('character-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    renderCharacters(CHARACTERS_DATA.characters);
    populateSelects();
    setupFilters();

    // 🔥 Обновляем промпт при изменении любого поля
    document.getElementById('modal-pose').addEventListener('change', updatePromptPreview);
    document.getElementById('modal-background').addEventListener('change', updatePromptPreview);
    document.getElementById('modal-extra').addEventListener('input', updatePromptPreview);
});