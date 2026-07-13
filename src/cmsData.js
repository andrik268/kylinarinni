import heroImage from "../assets/kylinarinni-hero.png";
import menuImage from "../assets/kylinarinni-menu-display.png";
import antigravityImage from "../assets/kylinarinni-antigravity.png";
import masterclassImage from "../assets/kylinarinni-masterclass.png";
import dessertSetImage from "../assets/kylinarinni-dessert-set.png";
import price2600Image from "../assets/price/Photoroom_20260330_001133.JPG";
import price2700ImageA from "../assets/price/Photoroom_20260330_005505.JPG";
import price2700ImageB from "../assets/price/Photoroom_20260330_010505.JPG";
import price3100Image from "../assets/price/Photoroom_20260330_012249.JPG";
import priceAntigravityImage from "../assets/price/Photoroom_20260330_162504.JPG";
import priceHeartImage from "../assets/price/Photoroom_20260330_172741.JPG";
import priceDessertsImage from "../assets/price/Photoroom_20260330_190509.JPG";
import price2900Image from "../assets/price/Photoroom_20260713_140751.PNG";
import price3000Image from "../assets/price/Photoroom_20260713_154604.JPG";

export const CMS_STORAGE_KEY = "kylinarinni-cms-data-v3";
export const CMS_HISTORY_KEY = "kylinarinni-cms-history-v1";
export const CMS_SESSION_KEY = "kylinarinni-cms-session-v1";
export const LOCAL_LEADS_KEY = "kylinarinni-leads-v1";

export const ADMIN_LOGIN = "admin@site.local";
export const ADMIN_PASSWORD_HASH =
  "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9";

export const phoneDisplay = "+7 918 449-90-17";
export const phoneDigits = "79184499017";
export const telegramUrl = "https://t.me/kylinarinni";
export const instagramUrl =
  "https://www.instagram.com/kylinarinni?igsh=MTR4dzVsb2lkZDlzMg%3D%3D&utm_source=qr";
export const vkUrl = "https://vk.ru/kylinarinni";

export function waLink(message) {
  return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;
}

export const defaultCmsData = {
  site: {
    id: "site-kylinarinni",
    name: "Kylinarinni",
    domain: "",
  },
  page: {
    id: "home",
    siteId: "site-kylinarinni",
    title: "Главная",
    slug: "/",
    seoTitle: "Kylinarinni - торты на заказ и мастер-классы в Краснодаре",
    seoDescription:
      "Торты любой сложности, свадебные и детские торты, 3D и антигравитационные конструкции, выездные мастер-классы в Краснодаре.",
    isActive: true,
    contentVersion: 3,
    blocks: [
      {
        id: "header",
        type: "header",
        title: "Шапка",
        sortOrder: 10,
        isActive: true,
        content: {
          logoText: "Kylinarinni",
          phone: phoneDisplay,
          menuImage,
          menuItems: [
            { id: "cakes", label: "Торты", href: "#services" },
            { id: "price", label: "Прайс", href: "#price" },
            { id: "portfolio", label: "Работы", href: "#portfolio" },
            { id: "masterclass", label: "Мастер-класс", href: "#masterclass" },
            { id: "faq", label: "Ответы", href: "#faq" },
            { id: "contacts", label: "Контакты", href: "#contacts" },
          ],
        },
      },
      {
        id: "hero",
        type: "hero",
        title: "Первый экран",
        sortOrder: 20,
        isActive: true,
        content: {
          image: heroImage,
          imageAlt: "Дизайнерский торт Kylinarinni на темной витрине",
          overline: "Краснодар / торты / мастер-классы",
          outlineTitle: "ТОРТЫ",
          solidTitle: "НА ЗАКАЗ",
          afterTitle: "БЕЗ СРЫВОВ",
          subtitle:
            "Любой сложности: вес, декор, начинка и доставка к вашему времени.",
          primaryButtonText: "Рассчитать",
          ratingLabel: "15,5 тыс. подписчиков",
          ratingText: "1000+ тортов за 7 лет",
        },
      },
      {
        id: "services",
        type: "services",
        title: "Услуги",
        sortOrder: 30,
        isActive: true,
        content: {
          title: "Не просто сладкий стол. Сценография события.",
          text:
            "Свадьба, детский праздник, корпоратив или мастер-класс. Каждый заказ собирается вокруг повода, фото и спокойной логистики.",
          items: [
            {
              id: "wedding",
              number: "01",
              title: "Свадебные торты",
              text: "Совпадение с эскизом, дегустации, доставка к банкету и спокойная коммуникация с организатором.",
            },
            {
              id: "kids",
              number: "02",
              title: "Детские и бенто",
              text: "Тематика под возраст, аккуратный декор и эстетика, которую хочется сохранить на фото.",
            },
            {
              id: "wow",
              number: "03",
              title: "3D и антигравитация",
              text: "Сложные конструкции, которые держат форму и становятся главным визуальным акцентом стола.",
            },
            {
              id: "desserts",
              number: "04",
              title: "Десерты и наборы",
              text: "Капкейки, трайфлы, макаронс, пряники, кейк-попсы и леденцы в общей палитре.",
            },
          ],
        },
      },
      {
        id: "price",
        type: "price",
        title: "Расчет",
        sortOrder: 40,
        isActive: true,
        content: {
          title: "Прайс без мелкого шрифта",
          text:
            "Выберите категорию и откройте страницу прайса крупно. Начинку можно подобрать под ваш повод, а декор рассчитывается отдельно.",
          categories: [
            {
              id: "cakes-2600",
              eyebrow: "ТОРТЫ / КЛАССИКА",
              tabLabel: "Классика",
              title: "Начинки 2600 ₽",
              price: "2600 ₽ / кг",
              description: "Торты от 2 кг. Три базовые начинки: ванильная с ягодами, молочный ломтик и двойная клубника.",
              images: [price2600Image],
            },
            {
              id: "cakes-2700",
              eyebrow: "ТОРТЫ / КЛАССИКА",
              tabLabel: "Начинки 2700 ₽",
              title: "Начинки 2700 ₽",
              price: "2700 ₽ / кг",
              description: "Молочная девочка, Сникерс, Черный лес и другие начинки из ассортимента. В категории две страницы.",
              images: [price2700ImageA, price2700ImageB],
            },
            {
              id: "cakes-2900",
              eyebrow: "ТОРТЫ / НОВЫЕ ВКУСЫ",
              tabLabel: "Начинки 2900 ₽",
              title: "Начинки 2900 ₽",
              price: "2900 ₽ / кг",
              description: "Хрустик, банофи и сливочная малина. Подробный состав каждой начинки находится на странице прайса.",
              images: [price2900Image],
            },
            {
              id: "cakes-3000",
              eyebrow: "ТОРТЫ / ШОКОЛАД",
              tabLabel: "Начинки 3000 ₽",
              title: "Начинки 3000 ₽",
              price: "3000 ₽ / кг",
              description: "Шоколад-манго, Рафаэлло и шоколад-малина. Декор и конструкция обсуждаются отдельно.",
              images: [price3000Image],
            },
            {
              id: "cakes-3100",
              eyebrow: "ТОРТЫ / ПРЕМИУМ",
              tabLabel: "Начинки 3100 ₽",
              title: "Начинки 3100 ₽",
              price: "3100 ₽ / кг",
              description: "Фисташка-малина, лайм-манго и Дубайский. Подойдет, если хочется необычную начинку с выразительным вкусом.",
              images: [price3100Image],
            },
            {
              id: "antigravity",
              eyebrow: "ОСОБЫЙ ФОРМАТ",
              tabLabel: "Антигравитация",
              title: "Антигравитационные торты",
              price: "от 3500 ₽ / кг",
              description: "Стоимость зависит от сложности конструктивной части и декора. Примеры работ собраны на странице прайса.",
              images: [priceAntigravityImage],
            },
            {
              id: "heart",
              eyebrow: "ОСОБЫЙ ФОРМАТ",
              tabLabel: "Торт сердце",
              title: "Торт сердце",
              price: "от 18 000 ₽",
              description: "Формат для большого события: вес и итоговая стоимость рассчитываются под вашу задачу.",
              images: [priceHeartImage],
            },
            {
              id: "desserts",
              eyebrow: "ДЕСЕРТЫ",
              tabLabel: "Десерты",
              title: "Десерты",
              price: "от 1500 ₽",
              description: "Стандартный и большой формат с начинками из ассортимента. В прайсе также указаны возможные доплаты за декор.",
              images: [priceDessertsImage],
            },
          ],
        },
      },
      {
        id: "portfolio",
        type: "portfolio",
        title: "Работы",
        sortOrder: 50,
        isActive: true,
        content: {
          title: "Референс можно прислать любым фото",
          text:
            "Выберите ближайший сценарий, отправьте фото или идею. Дальше я подберу вес, начинку и декор под ваш повод.",
          items: [
            { id: "a", label: "Витрина", title: "Торты и десерты", image: menuImage },
            { id: "b", label: "Вау", title: "Антигравитация", image: antigravityImage },
            { id: "c", label: "Сет", title: "Бенто и коробки", image: dessertSetImage },
            { id: "d", label: "МК", title: "Украшаем вместе", image: masterclassImage },
          ],
        },
      },
      {
        id: "masterclass",
        type: "masterclass",
        title: "Мастер-класс",
        sortOrder: 60,
        isActive: true,
        content: {
          title: "Готовлю основу. Вы украшаете торт.",
          text:
            "Выездной мастер-класс без нудной теории: бисквиты, крем, начинка, столики и инструменты уже с собой.",
          image: masterclassImage,
          imageAlt: "Кондитерский мастер-класс Kylinarinni",
          facts: ["3000 ₽ за человека", "без готовки", "для девичников, подростков и команд"],
        },
      },
      {
        id: "trust",
        type: "trust",
          title: "Доверие",
          sortOrder: 70,
          isActive: true,
          content: {
          title: "Торт должен приехать вовремя",
          text:
            "7 лет опыта, финалист шоу «Кондитер» с Ренатом Агзамовым, 1000+ тортов, 320 постоянных клиентов и 8+ ивент-агентств в сотрудничестве.",
          stats: [
            { value: "7 лет", label: "опыта" },
            { value: "1000+", label: "тортов" },
            { value: "30+", label: "мастер-классов" },
            { value: "8+", label: "ивент-агентств" },
          ],
        },
      },
      {
        id: "faq",
        type: "faq",
        title: "FAQ",
        sortOrder: 80,
        isActive: true,
        content: {
          title: "Что обычно уточняют до заказа",
          items: [
            {
              question: "Как быстро можно получить расчет?",
              answer:
                "Пришлите референс, дату, вес и городскую локацию. По этим вводным можно быстро назвать вилку и уточнить декор.",
            },
            {
              question: "Как доставляются большие торты?",
              answer:
                "Торты от 5 кг доставляются лично в охлаждающих контейнерах. До 5 кг - Яндекс по тарифу или самовывоз.",
            },
            {
              question: "Можно провести мастер-класс дома?",
              answer:
                "Да. Все заготовки и инструменты привозятся с собой, участники только собирают и украшают.",
            },
            {
              question: "Можно выбрать любую начинку из прайса?",
              answer:
                "Да. Выберите подходящую категорию в прайсе и пришлите референс. Мы уточним вес, начинку, декор и дату.",
            },
            {
              question: "Сколько заранее нужно оформить заказ?",
              answer:
                "Чем сложнее конструкция и декор, тем раньше лучше обсудить заказ. Для точной даты напишите в WhatsApp или Telegram.",
            },
          ],
        },
      },
      {
        id: "contacts",
        type: "contacts",
        title: "Контакты",
        sortOrder: 90,
        isActive: true,
        content: {
          title: "Пришлите фото. Посчитаю итог.",
          text:
            "Удобнее начать с сообщения: так можно сразу отправить референс, дату, вес и пожелания по доставке.",
          phone: phoneDisplay,
          whatsappUrl: waLink("Здравствуйте! Хочу рассчитать торт по референсу."),
          telegramUrl,
          instagramUrl,
          vkUrl,
          city: "Краснодар",
        },
      },
    ],
  },
};

export function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function normalizeCmsData(value) {
  if (!value?.page?.blocks || value?.site?.id !== defaultCmsData.site.id) {
    return clone(defaultCmsData);
  }

  const next = clone(value);
  const existing = new Set(next.page.blocks.map((block) => block.id));
  defaultCmsData.page.blocks.forEach((block) => {
    if (!existing.has(block.id)) {
      next.page.blocks.push(clone(block));
    }
  });

  if ((next.page.contentVersion || 0) < 3) {
    const defaultsById = new Map(defaultCmsData.page.blocks.map((block) => [block.id, block]));
    next.page.blocks = next.page.blocks.map((block) => {
      const defaults = defaultsById.get(block.id);
      if (!defaults) return block;

      if (block.id === "header") {
        return { ...block, content: { ...block.content, menuItems: clone(defaults.content.menuItems) } };
      }
      if (block.id === "hero") {
        return { ...block, content: { ...block.content, ratingText: defaults.content.ratingText } };
      }
      if (block.id === "price") {
        return { ...block, content: { ...defaults.content, ...block.content, categories: clone(defaults.content.categories) } };
      }
      if (block.id === "trust") {
        return { ...block, content: { ...block.content, text: defaults.content.text, stats: clone(defaults.content.stats) } };
      }
      if (block.id === "faq") {
        return { ...block, content: { ...defaults.content, ...block.content, items: clone(defaults.content.items) } };
      }
      return block;
    });
    next.page.contentVersion = 3;
  }

  next.page.blocks.sort((a, b) => a.sortOrder - b.sortOrder);
  return next;
}
