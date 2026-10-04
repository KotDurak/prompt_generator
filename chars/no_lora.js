// chars_no_lora.js
// chars_no_lora.js
// Персонажи, которых модель отлично рисует по базовым тегам без LoRA

const CHARS_NO_LORA = [
    {
        id: "kim_possible",
        name: "Ким Пять-с-плюсом",
        age: "17",
        image: "https://i.ibb.co/rGmc8D3D/kim-5.png",
        base_prompt: "girl, solo, kim possible, orange hair, long hair, black turtleneck, green cargo pants, utility belt, combat boots, active pose, dynamic background, rooftop",
        tags: ["агент", "экшн", "рыжие волосы"],
        category: "action"
    },
    {
        id: "sailor_moon",
        name: "Сейлор Мун",
        age: "14",
        image: "https://i.ibb.co/zWM0VrcS/image.png",
        base_prompt: "girl, solo, tsukino usagi, blonde hair, blue eyes, double bun, twintails, very long hair, sailor senshi uniform, blue sailor collar, red bow, white gloves, elbow gloves, tiara, crescent moon, standing, night sky",
        tags: ["махо-сёдзё", "блондинка", "классика"],
        category: "fantasy"
    },
    {
        id: "ganyu_genshin",
        name: "Гань Юй",
        age: "??? (тысячи лет)",
        image: "https://i.ibb.co/8WyKj5h/gan-ui.png",
        base_prompt: "girl, solo, ganyu (genshin impact), blue hair, qilin horns, golden bell, black bodysuit, white detached sleeves, holding bow, ice particles, liyue background",
        tags: ["геншин", "рога", "лучница"],
        category: "fantasy"
    },
    {
        id: "furina_genshin",
        name: "Фурина",
        age: "??? (Архонт)",
        image: "https://i.ibb.co/FkV6488p/furina.png",
        base_prompt: "girl, solo, furina (genshin impact), blue hair, white hair, mismatched eyes, blue top hat, dark blue coat, white shorts, stage lighting, water ripples, theater stage",
        tags: ["геншин", "архонт", "театр"],
        category: "fantasy"
    },
    {
        id: "asuna_sao",
        name: "Асуна",
        age: "17",
        image: "https://i.ibb.co/21DNpYQT/asuna.png",
        base_prompt: "girl, solo, asuna (sao), brown hair, long hair, half updo braid, white dress, red accents, breastplate, holding sword, floating castle background",
        tags: ["сао", "рыцарь", "меч"],
        category: "fantasy"
    },
    {
        id: "hatsune_miku",
        name: "Мику Хацунэ",
        age: "16",
        image: "https://i.ibb.co/35rj7bJY/miku-hatsune.png",
        base_prompt: "girl, solo, hatsune miku, teal hair, twin tails, very long hair, grey sleeveless shirt, pleated skirt, thigh high boots, headphones, holding microphone, neon stage",
        tags: ["вокалоид", "идол", "бирюзовые волосы"],
        category: "action" // Или можно создать категорию 'idol', но action подойдет для неоновой сцены
    },
    {
        id: "rei_ayanami",
        name: "Рей Аянами",
        age: "14",
        image: "https://i.ibb.co/gbpdTY5R/image.png",
        base_prompt: "girl, solo, rei ayanami, blue hair, short hair, red eyes, white plugsuit, sci-fi, futuristic, cockpit background",
        tags: ["евангелион", "куудере", "sci-fi"],
        category: "action"
    },
    {
        id: "mikasa_ackerman",
        name: "Микаса Аккерман",
        age: "19",
        image: "https://i.ibb.co/wZ8RDQ26/mikasa.png",
        base_prompt: "girl, solo, mikasa ackerman, black hair, short hair, red scarf, brown jacket, white pants, leather straps, outdoor, ruins",
        tags: ["атака титанов", "сильная", "красный шарф"],
        category: "action"
    },
    {
        id: "makima_csm",
        name: "Макима",
        age: "???",
        image: "https://i.ibb.co/1J6mbWv9/image.png",
        base_prompt: "girl, solo, makima (chainsaw man), red hair, braided hair, yellow eyes, ringed eyes, white shirt, black tie, black trousers, office, dim lighting",
        tags: ["бензопила", "доминантная", "офис"],
        category: "dark"
    },
    {
        id: "kurisu_makise",
        name: "Курису Макисэ",
        age: "18",
        image: "https://i.ibb.co/YTNDj9bh/image.png",
        base_prompt: "girl, solo, makise kurisu, reddish-brown hair, long hair, loose necktie, white shirt, khaki jacket, black shorts, tights, laboratory",
        tags: ["цундере", "ученый", "умная"],
        category: "action"
    },
    {
        id: "asuka_langley",
        name: "Аска Лэнгли",
        age: "14",
        image: "https://i.ibb.co/wrbGNXYr/image.png",
        base_prompt: "girl, solo, asuka langley, orange hair, twintails, hair clips, red plugsuit, plugsuit, sci-fi, futuristic, cockpit background",
        tags: ["цундере", "пилот", "энергичная"],
        category: "action"
    },

];