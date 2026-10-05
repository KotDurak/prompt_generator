// chars_no_lora.js
// Персонажи, которых модель отлично рисует по базовым тегам без LoRA
// ВНИМАНИЕ: Из промптов удалены позы и фоны, чтобы избежать конфликтов с UI-селекторами.

const CHARS_NO_LORA = [
    {
        id: "kim_possible",
        name: "Ким Пять-с-плюсом",
        age: "17",
        image: "https://i.ibb.co/rGmc8D3D/kim-5.png",
        // Убраны: active pose, dynamic background, rooftop
        base_prompt: "girl, solo, kim possible, orange hair, long hair, black turtleneck, green cargo pants, utility belt, combat boots",
        tags: ["агент", "экшн", "рыжие волосы"],
        category: "action"
    },
    {
        id: "sailor_moon",
        name: "Сейлор Мун",
        age: "14",
        image: "https://i.ibb.co/zWM0VrcS/image.png",
        // Убраны: standing, night sky
        base_prompt: "girl, solo, tsukino usagi, blonde hair, blue eyes, double bun, twintails, very long hair, sailor senshi uniform, blue sailor collar, red bow, white gloves, elbow gloves, tiara, crescent moon",
        tags: ["махо-сёдзё", "блондинка", "классика"],
        category: "fantasy"
    },
    {
        id: "ganyu_genshin",
        name: "Гань Юй",
        age: "??? (тысячи лет)",
        image: "https://i.ibb.co/8WyKj5h/gan-ui.png",
        // Убраны: holding bow, ice particles, liyue background
        base_prompt: "girl, solo, ganyu (genshin impact), blue hair, qilin horns, golden bell, black bodysuit, white detached sleeves",
        tags: ["геншин", "рога", "лучница"],
        category: "fantasy"
    },
    {
        id: "furina_genshin",
        name: "Фурина",
        age: "??? (Архонт)",
        image: "https://i.ibb.co/FkV6488p/furina.png",
        // Убраны: stage lighting, water ripples, theater stage
        base_prompt: "girl, solo, furina (genshin impact), blue hair, white hair, mismatched eyes, blue top hat, dark blue coat, white shorts",
        tags: ["геншин", "архонт", "театр"],
        category: "fantasy"
    },
    {
        id: "asuna_sao",
        name: "Асуна",
        age: "17",
        image: "https://i.ibb.co/21DNpYQT/asuna.png",
        // Убраны: holding sword, floating castle background
        base_prompt: "girl, solo, asuna (sao), brown hair, long hair, half updo braid, white dress, red accents, breastplate",
        tags: ["сао", "рыцарь", "меч"],
        category: "fantasy"
    },
    {
        id: "hatsune_miku",
        name: "Мику Хацунэ",
        age: "16",
        image: "https://i.ibb.co/35rj7bJY/miku-hatsune.png",
        // Убраны: holding microphone, neon stage
        base_prompt: "girl, solo, hatsune miku, teal hair, twin tails, very long hair, grey sleeveless shirt, pleated skirt, thigh high boots, headphones",
        tags: ["вокалоид", "идол", "бирюзовые волосы"],
        category: "action"
    },
    {
        id: "rei_ayanami",
        name: "Рей Аянами",
        age: "14",
        image: "https://i.ibb.co/gbpdTY5R/image.png",
        // Убраны: sci-fi, futuristic, cockpit background
        base_prompt: "girl, solo, rei ayanami, blue hair, short hair, red eyes, white plugsuit",
        tags: ["евангелион", "куудере", "sci-fi"],
        category: "action"
    },
    {
        id: "mikasa_ackerman",
        name: "Микаса Аккерман",
        age: "19",
        image: "https://i.ibb.co/wZ8RDQ26/mikasa.png",
        // Убраны: outdoor, ruins
        base_prompt: "girl, solo, mikasa ackerman, black hair, short hair, red scarf, brown jacket, white pants, leather straps",
        tags: ["атака титанов", "сильная", "красный шарф"],
        category: "action"
    },
    {
        id: "makima_csm",
        name: "Макима",
        age: "???",
        image: "https://i.ibb.co/1J6mbWv9/image.png",
        // Убраны: office, dim lighting
        base_prompt: "girl, solo, makima (chainsaw man), red hair, braided hair, yellow eyes, ringed eyes, white shirt, black tie, black trousers",
        tags: ["бензопила", "доминантная", "офис"],
        category: "dark"
    },
    {
        id: "kurisu_makise",
        name: "Курису Макисэ",
        age: "18",
        image: "https://i.ibb.co/YTNDj9bh/image.png",
        // Убраны: laboratory
        base_prompt: "girl, solo, makise kurisu, reddish-brown hair, long hair, loose necktie, white shirt, khaki jacket, black shorts, tights",
        tags: ["цундере", "ученый", "умная"],
        category: "action"
    },
    {
        id: "asuka_langley",
        name: "Аска Лэнгли",
        age: "14",
        image: "https://i.ibb.co/wrbGNXYr/image.png",
        // ИСПРАВЛЕНО: Убраны plugsuit (x2), sci-fi, cockpit.
        // Добавлены жесткие теги школьной формы Евы, чтобы перебить дефолтные ассоциации модели.
        base_prompt: "girl, solo, asuka langley, orange hair, twintails, black A10 nerve clips, blue eyes, tokyo-3 school uniform, white blouse, blue pinafore dress, red ribbon",
        tags: ["цундере", "школьница", "энергичная"],
        category: "school" // Перенесено в school, так как теперь она в форме!
    },
    // --- НОВЫЕ ПЕРСОНАЖИ (ИСПРАВЛЕННАЯ ВЕРСИЯ: КОРОТКИЕ НАРЯДЫ) ---
    {
        id: "ayaka_genshin",
        name: "Аяка",
        age: "17",
        image: "https://i.ibb.co/DHChpzhP/image.png",
        // Длинное кимоно заменено на короткий наряд с чулками
        base_prompt: "girl, solo, kamisato ayaka, white hair, light blue hair, long hair, purple eyes, short blue skirt, white top, thighhighs, zettai ryouiki, elegant",
        tags: ["геншин", "самурай", "короткая юбка"],
        category: "fantasy"
    },
    {
        id: "megumin_konosuba",
        name: "Мегумин",
        age: "14",
        image: "https://i.ibb.co/fVmnFwy5/image.png",
        // Длинный плащ заменен на короткую версию, чтобы были видны ноги
        base_prompt: "girl, solo, megumin,konosuba, brown hair, long hair, red eyes, eyepatch",
        tags: ["коносуба", "магия", "короткая юбка"],
        category: "fantasy"
    },
    {
        id: "aqua_konosuba",
        name: "Аква",
        age: "???",
        image: "https://i.ibb.co/JWjVGkLB/image.png",
        // Длинное платье жрицы укорочено
        base_prompt: "girl, solo, aqua, konosuba, blue hair, long hair, blue eyes, hair ornament, short white and blue dress, miniskirt, thighhighs, zettai ryouiki",
        tags: ["коносуба", "богиня", "короткая юбка"],
        category: "fantasy"
    },
    {
        id: "rem_rezero",
        name: "Рем",
        age: "17",
        image: "https://i.ibb.co/JRJpvr01/image.png",
        // Классическое платье горничной сделано коротким
        base_prompt: "girl, solo, rem, re-zero, blue hair, short hair, covering one eye, blue eyes, maid headdress, short black and white maid dress, miniskirt, thighhighs, zettai ryouiki",
        tags: ["ре:зеро", "горничная", "короткая юбка"],
        category: "fantasy"
    },
    // --- АРХЕТИПНЫЕ ПЕРСОНАЖИ (ОРИГИНАЛЬНЫЕ) ---
    {
        id: "gyaru_girl",
        name: "Гяру",
        age: "18",
        image: "https://i.ibb.co/sJgbzy1L/image.png",
        base_prompt: "girl, solo, gyaru, tanned skin, blonde hair, long hair, blue eyes, gyaru makeup, short skirt, white top, thighhighs, zettai ryouiki, gyaru fashion",
        tags: ["гяру", "загорелая", "модная"],
        category: "school" // Или создай "fashion"
    },
    {
        id: "mistress",
        name: "Госпожа",
        age: "25",
        image: "https://i.ibb.co/5gZfnZ3p/image.png",
        base_prompt: "girl, solo, dominatrix, black hair, long hair, red eyes, black leather bodysuit, short skirt, thighhighs, high heels, collar, leash, zettai ryouiki",
        tags: ["госпожа", "кожа", "доминантная"],
        category: "dark"
    },
    {
        id: "nurse",
        name: "Медсестра",
        age: "22",
        image: "https://i.ibb.co/ZRsf3R5n/image.png",
        base_prompt: "girl, solo, nurse, white hair, long hair, blue eyes, nurse cap, short white dress, red cross, thighhighs, zettai ryouiki",
        tags: ["медсестра", "белая", "заботливая"],
        category: "casual"
    },
    {
        id: "office_lady",
        name: "Офисная леди",
        age: "26",
        image: "https://i.ibb.co/6JJp2rYp/image.png",
        base_prompt: "girl, solo, office lady, black hair, long hair, brown eyes, glasses, white shirt, black tie, short skirt, thighhighs, zettai ryouiki",
        tags: ["офис", "деловая", "очки"],
        category: "casual"
    },
    {
        id: "witch",
        name: "Ведьма",
        age: "???",
        image: "https://i.ibb.co/M56MRrG7/image.png",
        base_prompt: "girl, solo, witch, purple hair, long hair, yellow eyes, witch hat, short black dress, cape, thighhighs, zettai ryouiki",
        tags: ["ведьма", "магия", "фиолетовая"],
        category: "fantasy"
    }
];