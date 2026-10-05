// chars_mascots.js
// Богини Хаоса — оригинальные маскоты бота "Четыре Поющих Сердца"
// ВНИМАНИЕ: Удалены позы и фоны для идеальной совместимости с UI-селекторами.

const CHARS_MASCOTS = [
    {
        id: "khori",
        name: "Кхори",
        age: "Вечная",
        image: "https://i.ibb.co/rRfXxchQ/image.png",
        // Убраны: athletic pose, sports stadium, running track, sunny day
        base_prompt: "girl, solo, red hair, twin tails, red eyes, crop top, red shorts, gym shoes",
        tags: ["энергичная", "спортсменка", "красная"],
        category: "goddesses" // Или "action", если захочешь перенести
    },
    {
        id: "nuri",
        name: "Нури",
        age: "Вечная",
        image: "https://i.ibb.co/zWSyGGR9/image.png",
        // Убраны: sitting on floor, cozy bedroom, pillows, pc monitor
        // Теперь вайб "хикки" будет создаваться за счет выбора фона "bedroom" или "gaming room" в интерфейсе!
        base_prompt: "girl, solo, green hair, long hair, green eyes, off-shoulder shirt, short shorts",
        tags: ["хикка", "домоседка", "уютная"],
        category: "goddesses"
    },
    {
        id: "slani",
        name: "Слани",
        age: "Вечная",
        image: "https://i.ibb.co/zHm0H004/image.png",
        // Убраны: looking back, luxury bedroom, dim lighting
        // Элегантность и кокетство сохранены через одежду, а атмосферу задаст выбранный фон.
        base_prompt: "girl, solo, lilac hair, long hair, purple eyes, silk short dress, bare shoulders, high heels",
        tags: ["соблазнительная", "элегантная", "сиреневая"],
        category: "goddesses"
    },
    {
        id: "tzinchiya",
        name: "Тзинчия",
        age: "Вечная",
        image: "https://i.ibb.co/WvyWTrBT/image.png",
        // Убраны: holding crystal ball, neon signs
        // Оптимизированы теги волос и юбки для лучшего понимания моделью.
        base_prompt: "girl, solo, light blue hair, long hair, glasses, short shirt, red plaid pleated skirt, thigh high socks",
        tags: ["интеллектуалка", "загадочная", "синяя"],
        category: "goddesses"
    }
];