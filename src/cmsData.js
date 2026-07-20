import heroCakeImage from "../assets/real/client-hero-IMG_0597.JPG";
import masterclassPhoto from "../assets/real/client-masterclass-IMG_1394.JPG";
import aboutImage from "../assets/real/client-about-IMG_0069.JPG";
import price2600Image from "../assets/price/Photoroom_20260330_001133.JPG";
import price2700ImageA from "../assets/price/Photoroom_20260330_005505.JPG";
import price2700ImageB from "../assets/price/Photoroom_20260330_010505.JPG";
import price3100Image from "../assets/price/Photoroom_20260330_012249.JPG";
import priceAntigravityImage from "../assets/price/Photoroom_20260330_162504.JPG";
import priceHeartImage from "../assets/price/Photoroom_20260330_172741.JPG";
import bentoPriceImage from "../assets/price/Photoroom_20260713_202338.JPG";
import price2900Image from "../assets/price/Photoroom_20260713_140751.PNG";
import price3000Image from "../assets/price/Photoroom_20260713_154604.JPG";

const menuImage = "/gallery/wedding/03.jpg";

export const CMS_STORAGE_KEY = "kylinarinni-cms-data-v5";
export const CMS_HISTORY_KEY = "kylinarinni-cms-history-v1";
export const CMS_SESSION_KEY = "kylinarinni-cms-session-v1";
export const LOCAL_LEADS_KEY = "kylinarinni-leads-v1";

export const ADMIN_LOGIN = "admin@site.local";
export const ADMIN_PASSWORD_HASH =
  "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9";

export const phoneDisplay = "+7 918 449-90-17";
export const phoneDigits = "79184499017";
export const telegramUrl = "https://t.me/kylinarinni";
export const maxUrl = "https://max.ru/";
export const instagramUrl =
  "https://www.instagram.com/kylinarinni?igsh=MTR4dzVsb2lkZDlzMg%3D%3D&utm_source=qr";
export const vkUrl = "https://vk.ru/kylinarinni";
export const diskRoot = "https://disk.yandex.ru/d/t5vQZ82uXRenbw";

export function diskFolderLink(folder) {
  return `${diskRoot}/${encodeURIComponent(folder)}`;
}

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
    contentVersion: 5,
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
          image: heroCakeImage,
          imageAlt: "Многоярусный свадебный торт на праздничном столе",
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
            "Подбираю формат, начинку, декор и логистику под ваше событие — от первого референса до подачи.",
          items: [
            {
              id: "wedding",
              number: "01",
              title: "Свадебные",
              text: "Полное соответствие согласованного с вами эскиза, вкус соответствующий дегустационному набору, доставка и логистика под ключ.",
              link: diskFolderLink("свадебные"),
            },
            {
              id: "kids",
              number: "02",
              title: "Детские",
              text: "Разнообразие тематик, актуальный декор и эстетика в исполнении.",
              link: diskFolderLink("детские"),
            },
            {
              id: "wow",
              number: "03",
              title: "3D и антигравитация",
              text: "Сложные конструкции, необычная подача и декор, который становится главным акцентом события.",
              link: diskFolderLink("3 Д"),
            },
            {
              id: "corporate",
              number: "04",
              title: "Корпоративные",
              text: "Сладкая часть события в стилистике бренда: корпоративные цвета, логотипы и удобная логистика.",
              link: diskFolderLink("корпоративные"),
            },
            {
              id: "graduation",
              number: "05",
              title: "Выпускные",
              text: "Современный торт и десерты для выпускного, которые красиво смотрятся на фото и удобно делятся на компанию.",
              link: diskFolderLink("выпускной"),
            },
            {
              id: "mens",
              number: "06",
              title: "Мужские",
              text: "Сдержанная эстетика, любимые вкусы и выразительный акцент без лишней декоративности.",
              link: diskFolderLink("мужские"),
            },
            {
              id: "women",
              number: "07",
              title: "Для дам",
              text: "Деликатный декор, цветочная эстетика и композиция под настроение и формат праздника.",
              link: diskFolderLink("Для дам"),
            },
            {
              id: "family",
              number: "08",
              title: "Гендер пати, выписка из роддома, крестины",
              text: "Торт и сладкая подача для важного семейного события: нежно, персонально и вовремя.",
              link: diskFolderLink("Гендер пати,  выписка из роддома, крестины"),
            },
            {
              id: "masterclasses",
              number: "09",
              title: "Мастер-классы",
              text: "Выездные мастер-классы с подготовленными заготовками, инструментами и оформлением.",
              link: diskFolderLink("мастер классы"),
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
          title: "Вкусы и форматы",
          text:
            "Найдите подходящий формат, откройте прайс крупно и выберите начинку под ваш повод.",
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
              id: "bento",
              eyebrow: "БЕНТО",
              tabLabel: "Бенто",
              title: "Бенто",
              price: "от 1500 ₽",
              description: "Стандартный бенто — 1500 ₽, большой — 2600 ₽. Начинки и доплаты за декор указаны на странице прайса.",
              images: [bentoPriceImage],
            },
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
          image: masterclassPhoto,
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
          title: "О мастере",
          image: aboutImage,
          imageAlt: "Кондитер держит праздничный торт",
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
                "Пришлите референс, дату, вес и локацию. По этим вводным можно быстро назвать вилку и уточнить декор.",
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
                "За какое время нужно сделать заказ? Сразу как вы дочитали это предложение. Плюсы - сохранится цена, успеем проработать все пожелания, ваше внутреннее спокойствие.",
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
          maxUrl,
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

  if ((next.page.contentVersion || 0) < 5) {
    const defaultsById = new Map(defaultCmsData.page.blocks.map((block) => [block.id, block]));
    next.page.blocks = next.page.blocks.map((block) => {
      const defaults = defaultsById.get(block.id);
      if (!defaults) return block;

      if (block.id === "header") {
        return { ...block, content: { ...block.content, menuItems: clone(defaults.content.menuItems) } };
      }
      if (block.id === "hero") {
        return {
          ...block,
          content: {
            ...block.content,
            image: defaults.content.image,
            imageAlt: defaults.content.imageAlt,
            ratingText: defaults.content.ratingText,
          },
        };
      }
      if (block.id === "price") {
        return {
          ...block,
          content: {
            ...defaults.content,
            ...block.content,
            title: defaults.content.title,
            text: defaults.content.text,
            categories: clone(defaults.content.categories),
          },
        };
      }
      if (block.id === "services") {
        return {
          ...block,
          content: {
            ...block.content,
            title: defaults.content.title,
            text: defaults.content.text,
            items: clone(defaults.content.items),
          },
        };
      }
      if (block.id === "masterclass") {
        return {
          ...block,
          content: {
            ...block.content,
            image: defaults.content.image,
            imageAlt: defaults.content.imageAlt,
          },
        };
      }
      if (block.id === "trust") {
        return {
          ...block,
          content: {
            ...block.content,
            title: defaults.content.title,
            text: defaults.content.text,
            image: defaults.content.image,
            imageAlt: defaults.content.imageAlt,
            stats: clone(defaults.content.stats),
          },
        };
      }
      if (block.id === "faq") {
        return { ...block, content: { ...defaults.content, ...block.content, items: clone(defaults.content.items) } };
      }
      if (block.id === "contacts") {
        return { ...block, content: { ...block.content, maxUrl: defaults.content.maxUrl } };
      }
      return block;
    });
    next.page.contentVersion = 5;
  }

  next.page.blocks.sort((a, b) => a.sortOrder - b.sortOrder);
  return next;
}
