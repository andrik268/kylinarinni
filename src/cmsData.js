import heroImage from "../assets/kylinarinni-hero.png";
import menuImage from "../assets/kylinarinni-menu-display.png";
import antigravityImage from "../assets/kylinarinni-antigravity.png";
import masterclassImage from "../assets/kylinarinni-masterclass.png";
import dessertSetImage from "../assets/kylinarinni-dessert-set.png";

export const CMS_STORAGE_KEY = "kylinarinni-cms-data-v2";
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
          ratingText: "1000+ тортов за 5 лет",
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
          title: "Расчет по референсу",
          text:
            "Ориентир: от 2600 до 3100 ₽ за 1 кг. Итог зависит от начинки, сложности декора и конструкции.",
          image: dessertSetImage,
          imageAlt: "Набор тортов и десертов Kylinarinni",
          complexities: [
            { id: "basic", label: "Лаконичный", price: 2600 },
            { id: "decor", label: "С декором", price: 2850 },
            { id: "wow", label: "3D / вау", price: 3100 },
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
            "5 лет опыта, финалист шоу «Кондитер» с Ренатом Агзамовым, 1000+ тортов, 320 постоянных клиентов и 8+ ивент-агентств в сотрудничестве.",
          stats: [
            { value: "5 лет", label: "опыта" },
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
  next.page.blocks.sort((a, b) => a.sortOrder - b.sortOrder);
  return next;
}
