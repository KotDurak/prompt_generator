// characters_data.js
// База данных персонажей. Просто добавляй новые объекты в массив characters.

const CHARACTERS_DATA = {
    characters: [
        // === ШКОЛА И ПОВСЕДНЕВНОСТЬ ===
        {
            id: "momo_ayase",
            name: "Момо Аясэ",
            age: "16",
            image: "https://i.ibb.co/C5kMW430/momo-ayase.jpg",
            base_prompt: "1girl, solo, <lora:MomoAyase-IL-v1-07:0.7>, ChopioMomo, brown hair, short hair, hair between eyes, thick eyebrows, red eyes, looking at viewer, pink sweater, collared shirt, open collar, red bowtie, loose bowtie, blue skirt, pleated skirt, miniskirt, kneehighs, white socks, loose socks, earrings, black choker",
            tags: ["экстрасенс", "школьница", "дерзкая"],
            category: "school"
        },
        {
            id: "yamada",
            name: "Ямада",
            age: "24",
            image: "https://i.ibb.co/1JPFf0H9/image.png",
            base_prompt: "1girl, solo, <lora:Yamada(Tayama) v1.0 Illustrious-000016:0.8>, Yamada, dark red hair, hairclip, head scarf, vertical-striped shirt, employee uniform, red apron, shy smile, supermarket background",
            tags: ["кассирша", "скромная", "униформа"],
            category: "casual"
        },

        // === ПОВСЕДНЕВНОСТЬ И УЛИЦА ===
        {
            id: "yani_neko",
            name: "Яни Неко",
            age: "???",
            image: "https://i.ibb.co/chbSnSCZ/image.png",
            base_prompt: "1girl, solo, <lora:yanineko-illustrious-anime:1.0>, yani neko, chainsmoker cat, green hair, cat girl, animal ears, cat ears, animal ear fluff, oversized shirt,",
            tags: ["кошкодевочка", "курильщица", "расслабленная"],
            category: "casual"
        },
        {
            id: "tayama",
            name: "Таяма",
            age: "24",
            image: "https://i.ibb.co/mV7fdKqs/image.png",
            base_prompt: "1girl, solo, <lora:Yamada(Tayama) v1.0 Illustrious-000016:0.8>, Tayama, red eyes, dark red hair, folded ponytail, black jacket, black pantyhose, confident smile, night city background, neon lights",
            tags: ["альтер-эго", "загадочная", "уверенная"],
            category: "casual"
        },

        // === ТЕМНОЕ ФЭНТЕЗИ И ГОТИКА ===
        {
            id: "lucy_elfen",
            name: "Люси",
            age: "???",
            image: "https://i.ibb.co/PGNf3PmC/image.png",
            base_prompt: "1girl, solo, <lora:Lucy_elfen_lied:0.8>, lucy (elfen lied), elfen lied, pink hair, red hair, horns, red eyes, black dress, black sleeveless dress, pink shirt, red ribbon, striped thighhighs, vectors, dark atmosphere",
            tags: ["диклониус", "рога", "готика"],
            category: "dark"
        },

        // === ФЭНТЕЗИ И МАГИЯ ===
        {
            id: "ruche_jester",
            name: "Руче",
            age: "???",
            image: "https://i.ibb.co/67jLjcFK/image.png",
            base_prompt: "1girl, solo, <lora:Luce_rubis:0.8>, Ruche, blue eyes, blue hair, short hair, wavy hair, bangs, side-swept bangs, facial mark, jester hat, bicorn hat, jester costume, off-the-shoulder jester costume, high-necked jester costume, diamond pattern, long sleeves, gloves, belt, red overskirt, split skirt, blue miniskirt, pleated skirt, thigh-high stockings, ankle boots",
            tags: ["шут", "цирк", "синие волосы"],
            category: "fantasy"
        }
    ],
    poses: [
        {id: "standing", name: "🧍 Стоит", value: "standing"},
        {id: "sitting", name: "🧘 Сидит", value: "sitting"},
        {id: "lying", name: "🛌 Лежит", value: "lying"},
        {id: "kneeling", name: "🧎 На коленях", value: "kneeling"}
    ],
    backgrounds: [
        {id: "bedroom", name: "🛏️ Уютная спальня", value: "bedroom"},
        {id: "classroom", name: "🏫 Школьный класс", value: "classroom"},
        {id: "shrine", name: "⛩️ Японский храм", value: "shrine"},
        {id: "night_city", name: "🌃 Ночной город", value: "night city"},
        {id: "supermarket", name: " Супермаркет", value: "supermarket"},
        {id: "city_park", name: "🌳 Городской парк", value: "city park"}
    ]
};


function mergeAllCharacters() {
    // Используем spread operator (...) для добавления элементов из других массивов
    // Проверка typeof гарантирует, что если файл не загрузился, код не упадет с ошибкой

    if (typeof CHARS_LORA !== 'undefined') {
        CHARACTERS_DATA.characters.push(...CHARS_LORA);
    }

    if (typeof CHARS_MASCOTS !== 'undefined') {
        CHARACTERS_DATA.characters.push(...CHARS_MASCOTS);
    }

    if (typeof CHARS_NO_LORA !== 'undefined') {
        CHARACTERS_DATA.characters.push(...CHARS_NO_LORA);
    }

    console.log(`✅ Загружено персонажей: ${CHARACTERS_DATA.characters.length}`);
}

// 3. Запускаем слияние сразу при выполнении скрипта
mergeAllCharacters();