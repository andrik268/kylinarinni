import { useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  Eye,
  FloppyDisk,
  Layout,
  LockKey,
  Newspaper,
  Palette,
  Plus,
  SignOut,
  SlidersHorizontal,
  Stack,
  Trash,
  UploadSimple,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import { ApiError, loadRemoteLeads, loginRemote, saveRemoteCms, uploadRemoteImage } from "./apiClient.js";
import { ADMIN_LOGIN, ADMIN_PASSWORD_HASH, CMS_HISTORY_KEY, cloneCmsData, getBlock } from "./cmsData.js";

const navItems = [
  ["dashboard", "Дашборд", Layout],
  ["pages", "Страницы", Stack],
  ["editor", "Редактор блоков", SlidersHorizontal],
  ["design", "Дизайн сайта", Palette],
  ["site", "Сайт и SEO", Stack],
  ["leads", "Заявки", UsersThree],
  ["blog", "Статьи / Блог", Newspaper],
];

const blockTypeLabels = {
  header: "Шапка сайта",
  hero: "Первый экран",
  stats: "Цифры и опыт",
  manifesto: "Манифест",
  audience: "Для кого эта работа",
  services: "Услуги",
  price: "Прайс и начинка",
  masterclass: "Мастер-класс",
  cases: "Галерея работ",
  trust: "О мастере",
  faq: "Ответы на вопросы",
  contacts: "Контакты и заявка",
  footer: "Подвал сайта",
  process: "Как работаем",
  portfolio: "Портфолио",
  reviews: "Отзывы",
  about: "Обо мне",
  advantages: "Преимущества",
  contact: "Контакты и заявка",
  blog: "Статьи / блог",
};

const blockGuides = {
  header: "Название, меню и кнопка в верхней части сайта.",
  hero: "Первый экран: главный заголовок, описание, кнопки и фотография.",
  stats: "Цифры, опыт и показатели мастера.",
  manifesto: "Короткий смысловой блок сразу после первого экрана.",
  audience: "Заголовок и карточки для разных типов клиентов.",
  services: "Список услуг, цены, описания и фотография блока.",
  price: "Категории прайса, цены, описания и изображения.",
  masterclass: "Описание выездного мастер-класса и его условия.",
  cases: "Галерея работ и направления тортов.",
  process: "Шаги работы от первой идеи до готовой партии.",
  portfolio: "Фотографии проектов, подписи и цитата о подходе.",
  reviews: "Заголовок блока и фотографии отзывов клиентов.",
  about: "Текст о Нате, фотография и кнопка для связи.",
  advantages: "Три причины, почему клиенту удобно работать с вами.",
  contact: "Контакты, ссылки на мессенджеры и форма заявки.",
  contacts: "Контакты, ссылки на мессенджеры и форма заявки.",
  faq: "Частые вопросы и ответы для клиентов.",
  blog: "Заголовок и описание раздела со статьями.",
  footer: "Название, контакты и ссылки в подвале сайта.",
};

const blockSummaries = {
  header: "Логотип, меню и кнопка",
  hero: "Главный экран сайта",
  stats: "Опыт и показатели",
  manifesto: "Смысловой блок",
  audience: "Карточки для клиентов",
  services: "Услуги и цены",
  price: "Прайс и начинка",
  masterclass: "Выездной мастер-класс",
  cases: "Галерея работ",
  process: "Этапы работы",
  portfolio: "Фото проектов",
  reviews: "Отзывы клиентов",
  about: "Текст и фото о вас",
  trust: "О мастере и опыт",
  faq: "Частые вопросы",
  advantages: "Причины выбрать вас",
  contact: "Контакты и форма",
  contacts: "Контакты и форма",
  blog: "Раздел со статьями",
  footer: "Контакты внизу сайта",
};

const fieldLabels = {
  brand: "Название / имя",
  subtitle: "Подзаголовок",
  menuItems: "Пункты меню",
  ctaText: "Текст кнопки",
  ctaUrl: "Ссылка кнопки",
  eyebrow: "Надзаголовок",
  title: "Заголовок секции",
  titleLine1: "Заголовок — первая строка",
  titleLine2: "Заголовок — вторая строка",
  lead: "Вступительный текст",
  note: "Дополнительный текст",
  primaryButtonText: "Главная кнопка — текст",
  primaryButtonUrl: "Главная кнопка — ссылка",
  secondaryButtonText: "Вторая кнопка — текст",
  secondaryButtonUrl: "Вторая кнопка — ссылка",
  image: "Фотография блока",
  imageAlt: "Описание фотографии для поисковиков",
  caption: "Подпись под фотографией",
  priceNote: "Примечание о стоимости",
  mainImage: "Главная фотография проекта",
  mainAlt: "Описание главной фотографии",
  mainCaption: "Подпись главной фотографии",
  sideImage: "Вторая фотография проекта",
  sideAlt: "Описание второй фотографии",
  sideCaption: "Подпись второй фотографии",
  quote: "Цитата",
  paragraphs: "Текст о вас",
  accent: "Выделенный акцентный текст",
  buttonText: "Текст кнопки",
  buttonUrl: "Ссылка кнопки",
  phone: "Телефон для показа на сайте",
  phoneDigits: "Телефон для ссылок",
  channels: "Способы связи",
  formButtonText: "Кнопка формы заявки",
  socials: "Ссылки в подвале",
  privacyLabel: "Текст ссылки на согласие",
  legal: "Юридическая информация",
  text: "Описание / пояснение",
};

const fieldHelp = {
  image: "Изображение можно выбрать кнопкой — путь к файлу вводить не нужно.",
  mainImage: "Изображение можно выбрать кнопкой — путь к файлу вводить не нужно.",
  sideImage: "Изображение можно выбрать кнопкой — путь к файлу вводить не нужно.",
  imageAlt: "Коротко опишите, что изображено на фотографии.",
  mainAlt: "Коротко опишите, что изображено на фотографии.",
  sideAlt: "Коротко опишите, что изображено на фотографии.",
  primaryButtonUrl: "Например: #contact или ссылка на мессенджер.",
  secondaryButtonUrl: "Например: #services или внешняя ссылка.",
  ctaUrl: "Куда попадёт посетитель после нажатия.",
  buttonUrl: "Куда попадёт посетитель после нажатия.",
  phoneDigits: "Только цифры, без пробелов и скобок.",
};

const collectionLabels = {
  items: "Карточки и пункты",
  menuItems: "Пункты меню",
  channels: "Способы связи",
  socials: "Ссылки в подвале",
  paragraphs: "Абзацы текста",
};

const collectionHelp = {
  items: "Добавляйте, удаляйте и редактируйте отдельные карточки ниже.",
  menuItems: "Эти названия видит посетитель в верхнем меню.",
  channels: "Здесь меняются подписи и ссылки на мессенджеры.",
  socials: "Эти ссылки показываются в нижней части сайта.",
  paragraphs: "Каждый абзац можно изменить отдельно.",
};

const hiddenItemKeys = new Set(["id", "tone", "className", "icon"]);

const itemLabels = {
  label: "Подпись",
  title: "Название / заголовок",
  text: "Описание",
  price: "Стоимость",
  note: "Пояснение",
  value: "Крупный показатель",
  href: "Ссылка",
  isActive: "Показывать пункт",
  image: "Фотография отзыва",
};

function prettifyKey(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase())
    .trim();
}

function labelForField(key, context = "content") {
  if (context === "item") return itemLabels[key] || prettifyKey(key);
  return fieldLabels[key] || prettifyKey(key);
}

function isImageKey(key) {
  return /image/i.test(key) || key === "coverImage";
}

function isLongTextField(key, value) {
  return ["lead", "note", "text", "priceNote", "quote", "accent", "paragraphs", "excerpt", "legal"].includes(key)
    || (typeof value === "string" && value.length > 150);
}

function createCollectionItem(blockType, fieldKey) {
  if (fieldKey === "menuItems") return { id: `menu-${Date.now()}`, label: "Новый пункт", href: "#", isActive: true };
  if (fieldKey === "channels") return { id: `channel-${Date.now()}`, label: "Новый способ связи", href: "https://", icon: "", className: "" };
  if (fieldKey === "socials") return { id: `social-${Date.now()}`, label: "Новая ссылка", href: "https://", icon: "" };
  if (blockType === "audience") return { id: `item-${Date.now()}`, label: "Для кого", title: "Новая карточка", text: "Описание карточки", tone: "brand" };
  if (blockType === "services") return { id: `item-${Date.now()}`, title: "Новая услуга", price: "по расчёту", note: "Описание услуги" };
  if (blockType === "process") return { title: "Новый шаг", text: "Описание шага" };
  if (blockType === "advantages") return { value: "1", title: "Новая причина", text: "Пояснение" };
  if (blockType === "reviews") return { image: "", label: "Отзыв клиента" };
  return { title: "Новая карточка", text: "Описание" };
}

const designLabels = {
  backgroundColor: ["Основной фон", "Фон всей страницы"],
  surfaceColor: ["Фон карточек", "Цвет внутренних карточек и панелей"],
  surfaceSoftColor: ["Мягкий фон", "Дополнительный спокойный оттенок"],
  inkColor: ["Основной цвет текста", "Цвет крупных заголовков и обычного текста"],
  mutedColor: ["Второстепенный текст", "Цвет подписей и пояснений"],
  lineColor: ["Линии и границы", "Цвет разделителей между блоками"],
  accentColor: ["Акцентный цвет", "Цвет выделений и основных кнопок"],
  accentHoverColor: ["Цвет кнопки при наведении", "Оттенок кнопки при наведении курсора"],
  whiteColor: ["Белый фон", "Цвет светлых поверхностей"],
  fontSans: ["Шрифт обычного текста", "Например: Manrope"],
  fontDisplay: ["Шрифт заголовков", "Например: Cormorant Garamond"],
  cardRadius: ["Скругление карточек", "0 — прямые углы, большее число — мягкие углы"],
  buttonRadius: ["Скругление кнопок", "999 — полностью округлые кнопки"],
  sectionGap: ["Расстояние между секциями", "Число в пикселях"],
};

function safeJson(value, fallback) {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

async function sha256(value) {
  const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function setPath(source, path, value) {
  const next = clone(source);
  const parts = path.split(".");
  let target = next;
  parts.slice(0, -1).forEach((part) => {
    if (!target[part] || typeof target[part] !== "object") target[part] = {};
    target = target[part];
  });
  target[parts.at(-1)] = value;
  return next;
}

function formatDate(value) {
  if (!value) return "";
  try {
    return new Date(value).toLocaleString("ru-RU");
  } catch {
    return value;
  }
}

export function LoginScreen({ onLogin }) {
  const [login, setLogin] = useState(ADMIN_LOGIN);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const user = await loginRemote(login, password);
      onLogin(user || { login });
    } catch (remoteError) {
      const hash = await sha256(password);
      if (login.trim() === ADMIN_LOGIN && hash === ADMIN_PASSWORD_HASH) onLogin({ login, role: "admin", local: true });
      else setError(remoteError instanceof ApiError ? "Неверный логин или пароль" : "Не удалось войти");
    } finally {
      setBusy(false);
    }
  };
  return (
    <main className="admin-login-page">
      <form className="admin-login-card" onSubmit={submit}>
        <div className="admin-kicker"><LockKey size={20} /> CMS</div>
        <h1>Вход в админку</h1>
        <p>Редактирование сайта Kylinarinni</p>
        <label>Логин<input value={login} onChange={(event) => setLogin(event.target.value)} autoComplete="username" /></label>
        <label>Пароль<input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="current-password" /></label>
        {error ? <div className="admin-error">{error}</div> : null}
        <button className="admin-primary" type="submit" disabled={busy}>{busy ? "Проверяем…" : "Войти"}</button>
        <small>Первый локальный вход: admin@site.local / admin123</small>
      </form>
    </main>
  );
}

function BlockList({ blocks, selectedBlockId, onSelect, onMove, onToggle }) {
  return (
    <div className="client-block-list">
      {blocks.map((block, index) => (
        <article className={`client-block-item ${selectedBlockId === block.id ? "active" : ""} ${block.isActive ? "" : "disabled"}`} key={block.id}>
          <button className="client-block-main" type="button" onClick={() => onSelect(block.id)}>
            <span>{block.title}</span>
            <small>{blockSummaries[block.type] || "Секция сайта"}</small>
          </button>
          <div className="client-block-actions">
            <button type="button" aria-label="Выше" disabled={index === 0} onClick={() => onMove(block.id, -1)}><ArrowUp size={15} /></button>
            <button type="button" aria-label="Ниже" disabled={index === blocks.length - 1} onClick={() => onMove(block.id, 1)}><ArrowDown size={15} /></button>
            <button className={block.isActive ? "enabled" : ""} type="button" onClick={() => onToggle(block.id)}>{block.isActive ? "Вкл" : "Выкл"}</button>
          </div>
        </article>
      ))}
    </div>
  );
}

function ImageField({ label, help, value, onUpload, onClear }) {
  const inputRef = useRef(null);
  return (
    <div className="client-image-field">
      <div className="client-image-field-head">
        <div><strong>{label}</strong>{help ? <span>{help}</span> : null}</div>
        <div className="client-image-actions">
          <button className="client-file-button" type="button" onClick={() => inputRef.current?.click()}><UploadSimple size={16} /> {value ? "Заменить фото" : "Загрузить фото"}</button>
          {value ? <button className="client-image-clear" type="button" onClick={onClear} aria-label={`Удалить: ${label}`}><Trash size={16} /></button> : null}
        </div>
        <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => { const file = event.target.files?.[0]; if (file) onUpload(file); event.target.value = ""; }} />
      </div>
      {value ? <div className="client-image-preview"><img src={value} alt="" /><span>Фото загружено</span></div> : <div className="client-image-empty">Фотография пока не выбрана</div>}
    </div>
  );
}

function TextField({ label, help, value, onChange, multiline = false, placeholder = "" }) {
  return (
    <label className={`admin-field client-friendly-field ${multiline ? "span-2" : ""}`}>
      <span>{label}</span>
      {help ? <small>{help}</small> : null}
      {multiline ? <textarea rows={4} value={String(value ?? "")} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} /> : <input value={String(value ?? "")} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />}
    </label>
  );
}

function CollectionItemHeader({ label, index, count, onMove, onRemove }) {
  return <div className="client-collection-item-head"><strong>{`${label} ${index + 1}`}</strong><div className="client-collection-item-actions"><button className="client-order-button" type="button" aria-label={`${label} выше`} disabled={index === 0} onClick={() => onMove(index, -1)}><ArrowUp size={14} /></button><button className="client-order-button" type="button" aria-label={`${label} ниже`} disabled={index === count - 1} onClick={() => onMove(index, 1)}><ArrowDown size={14} /></button><button className="client-remove-button" type="button" onClick={() => onRemove(index)}><Trash size={15} /> Удалить</button></div></div>;
}

function CollectionField({ blockType, fieldKey, label, help, value, onChange, onUpload }) {
  const items = Array.isArray(value) ? value : [];
  const updateItem = (index, key, nextValue) => onChange(items.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: nextValue } : item));
  const removeItem = (index) => onChange(items.filter((_, itemIndex) => itemIndex !== index));
  const moveItem = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };
  const addItem = () => onChange([...items, createCollectionItem(blockType, fieldKey)]);
  const actionLabel = blockType === "services" && fieldKey === "items" ? "Добавить услугу" : blockType === "reviews" && fieldKey === "items" ? "Добавить отзыв" : "Добавить";
  const itemLabel = blockType === "services" && fieldKey === "items" ? "Услуга" : blockType === "reviews" && fieldKey === "items" ? "Отзыв" : label;
  return (
    <div className="client-collection-field span-2">
      <div className="client-collection-head"><div><h3>{label}</h3><p>{help} {actionLabel !== "Добавить" ? `Новая карточка появится в конце списка; стрелками её можно поставить на нужное место.` : ""}</p></div><button className="client-add-button" type="button" onClick={addItem}><Plus size={16} /> {actionLabel}</button></div>
      {items.length ? items.map((item, index) => {
        if (typeof item !== "object" || item === null) {
          return <div className="client-collection-item" key={`${fieldKey}-${index}`}><CollectionItemHeader label={itemLabel} index={index} count={items.length} onMove={moveItem} onRemove={removeItem} /><TextField label={`Текст ${index + 1}`} value={item} multiline onChange={(nextValue) => onChange(items.map((entry, itemIndex) => itemIndex === index ? nextValue : entry))} /></div>;
        }
        return (
          <div className="client-collection-item" key={item.id || `${fieldKey}-${index}`}>
            <CollectionItemHeader label={itemLabel} index={index} count={items.length} onMove={moveItem} onRemove={removeItem} />
            <div className="client-collection-item-grid">
              {Object.entries(item).filter(([key]) => !hiddenItemKeys.has(key) && !key.startsWith("_")).map(([itemKey, itemValue]) => {
                if (isImageKey(itemKey)) return <ImageField key={itemKey} label={labelForField(itemKey, "item")} help={fieldHelp[itemKey]} value={itemValue} onUpload={(file) => onUpload(file, fieldKey, index, itemKey)} onClear={() => updateItem(index, itemKey, "")} />;
                if (typeof itemValue === "boolean") return <label className="client-inline-check" key={itemKey}><input type="checkbox" checked={itemValue} onChange={(event) => updateItem(index, itemKey, event.target.checked)} /><span>{labelForField(itemKey, "item")}</span></label>;
                return <TextField key={itemKey} label={labelForField(itemKey, "item")} help={itemKey === "href" ? "Укажите адрес страницы или мессенджера." : ""} value={itemValue} multiline={isLongTextField(itemKey, itemValue)} onChange={(nextValue) => updateItem(index, itemKey, nextValue)} />;
              })}
            </div>
          </div>
        );
      }) : <div className="client-collection-empty">Пока нет элементов. Нажмите «Добавить», чтобы создать первый.</div>}
    </div>
  );
}

function BlockEditor({ block, onChange, onDelete, onUpload }) {
  const content = block.content || {};
  const updateContent = (key, value) => onChange({ ...block, content: { ...content, [key]: value } });
  const settingsLabels = [["backgroundColor", "Фон секции"], ["titleColor", "Цвет заголовков"], ["textColor", "Цвет текста"], ["accentColor", "Акцентный цвет"], ["buttonColor", "Цвет кнопок"], ["paddingTop", "Отступ сверху"], ["paddingBottom", "Отступ снизу"]];
  return (
    <section className="client-editor-card">
      <div className="client-editor-intro">
        <div><p className="admin-kicker">{blockTypeLabels[block.type] || block.type}</p><h2>{block.title}</h2><p>{blockGuides[block.type] || "Тексты, кнопки и фотографии этого блока."}</p></div>
        <span className={`client-status-pill ${block.isActive ? "active" : ""}`}>{block.isActive ? "Показывается" : "Скрыт"}</span>
      </div>
      <div className="client-editor-section">
        <div className="client-editor-section-head"><h3>Что видит посетитель</h3><p>Редактируйте поля ниже простым текстом. После изменений нажмите «Сохранить» вверху страницы.</p></div>
        <TextField label="Название блока в админке" help="Это название видите только вы — оно помогает найти секцию в списке." value={block.title} onChange={(nextValue) => onChange({ ...block, title: nextValue })} />
        <div className="client-editor-fields">
          {Object.entries(content).map(([key, value]) => {
            if (Array.isArray(value)) return <CollectionField key={key} blockType={block.type} fieldKey={key} label={collectionLabels[key] || labelForField(key)} help={collectionHelp[key] || "Редактируйте элементы по одному."} value={value} onChange={(nextValue) => updateContent(key, nextValue)} onUpload={(file, collectionKey, itemIndex, itemKey) => onUpload(file, collectionKey, itemIndex, itemKey)} />;
            if (isImageKey(key)) return <ImageField key={key} label={labelForField(key)} help={fieldHelp[key]} value={value} onUpload={(file) => onUpload(file, key)} onClear={() => updateContent(key, "")} />;
            if (typeof value === "boolean") return <label className="client-inline-check" key={key}><input type="checkbox" checked={value} onChange={(event) => updateContent(key, event.target.checked)} /><span>{labelForField(key)}</span></label>;
            return <TextField key={key} label={labelForField(key)} help={fieldHelp[key]} value={value} multiline={isLongTextField(key, value)} onChange={(nextValue) => updateContent(key, nextValue)} />;
          })}
        </div>
      </div>
      <details className="client-editor-details">
        <summary>Дополнительный дизайн этой секции</summary>
        <div className="client-details-body"><p className="client-details-note">Эти настройки лучше менять только если вы хотите изменить цвет или свободное место вокруг блока.</p><div className="admin-field-grid">{settingsLabels.map(([key, label]) => <TextField key={key} label={label} value={block.settings?.[key] ?? ""} onChange={(nextValue) => onChange({ ...block, settings: { ...block.settings, [key]: nextValue } })} />)}</div></div>
      </details>
      <div className="admin-block-actions"><button className="admin-danger-link" type="button" onClick={onDelete}><Trash size={17} /> Удалить секцию</button></div>
    </section>
  );
}

function DashboardCard({ title, value, text, onClick }) {
  return <button className="client-dashboard-card" type="button" onClick={onClick}><span>{title}</span><strong>{value}</strong><small>{text}</small></button>;
}

export function AdminPanel({ data, setData, onLogout, onViewSite }) {
  const [view, setView] = useState("dashboard");
  const [history, setHistory] = useState(() => safeJson(localStorage.getItem(CMS_HISTORY_KEY), []));
  const [status, setStatus] = useState("");
  const [preview, setPreview] = useState(null);
  const [leads, setLeads] = useState([]);
  const [selectedBlockId, setSelectedBlockId] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [postDraft, setPostDraft] = useState(null);
  const blocks = useMemo(() => [...(data.page?.blocks || [])].filter((item) => item.type !== "design").sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)), [data]);
  const selectedBlock = blocks.find((item) => item.id === selectedBlockId) || blocks[0];
  const design = getBlock(data, "design") || { content: {} };
  const activeCount = blocks.filter((item) => item.isActive).length;
  const currentTitle = navItems.find(([id]) => id === view)?.[1] || "Дашборд";

  const commit = async (next, message = "Изменения сохранены локально") => {
    const snapshot = cloneCmsData(data);
    const nextHistory = [...history, snapshot].slice(-30);
    setHistory(nextHistory);
    localStorage.setItem(CMS_HISTORY_KEY, JSON.stringify(nextHistory));
    setData(next);
    setStatus("Сохраняем…");
    try {
      const remote = await saveRemoteCms(next);
      if (remote) setData(remote);
      setStatus("Изменения сохранены");
    } catch {
      setStatus(message);
    }
  };

  const updateBlock = (id, nextBlock, message) => commit({ ...data, page: { ...data.page, blocks: data.page.blocks.map((item) => item.id === id ? nextBlock : item) } }, message);
  const updateData = (path, value, saveOnBlur = false) => {
    const next = setPath(data, path, value);
    setData(next);
    if (!saveOnBlur) commit(next);
    return next;
  };
  const moveBlock = (id, direction) => {
    const list = [...blocks];
    const index = list.findIndex((item) => item.id === id);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= list.length) return;
    [list[index], list[target]] = [list[target], list[index]];
    const positions = new Map(list.map((item, idx) => [item.id, (idx + 1) * 10]));
    commit({ ...data, page: { ...data.page, blocks: data.page.blocks.map((item) => positions.has(item.id) ? { ...item, sortOrder: positions.get(item.id) } : item) } });
  };
  const toggleBlock = (id) => updateBlock(id, { ...blocks.find((item) => item.id === id), isActive: !blocks.find((item) => item.id === id)?.isActive });
  const undo = () => {
    if (!history.length) return;
    const previous = history[history.length - 1];
    const nextHistory = history.slice(0, -1);
    setHistory(nextHistory);
    localStorage.setItem(CMS_HISTORY_KEY, JSON.stringify(nextHistory));
    setData(previous);
    saveRemoteCms(previous).catch(() => {});
    setStatus("Шаг назад выполнен");
  };
  const upload = async (file, block, fieldKey, itemIndex = null, itemKey = null) => {
    setStatus("Загружаем изображение…");
    const applyPath = (next, path) => {
      if (Number.isInteger(itemIndex) && itemKey) {
        next.content[fieldKey] = (next.content[fieldKey] || []).map((item, index) => index === itemIndex ? { ...item, [itemKey]: path } : item);
      } else {
        const fallbackKey = fieldKey || (Object.prototype.hasOwnProperty.call(next.content, "image") ? "image" : Object.prototype.hasOwnProperty.call(next.content, "mainImage") ? "mainImage" : "coverImage");
        next.content[fallbackKey] = path;
      }
      return next;
    };
    try {
      const path = await uploadRemoteImage(file);
      updateBlock(block.id, applyPath(cloneCmsData(block), path));
    } catch {
      const reader = new FileReader();
      reader.onload = () => {
        updateBlock(block.id, applyPath(cloneCmsData(block), reader.result), "Изображение добавлено локально");
      };
      reader.readAsDataURL(file);
    }
  };
  const uploadPostImage = async (file) => {
    setStatus("Загружаем обложку статьи…");
    try {
      const path = await uploadRemoteImage(file);
      setPostDraft((current) => ({ ...current, coverImage: path }));
      setStatus("Обложка загружена — сохраните статью");
    } catch {
      const reader = new FileReader();
      reader.onload = () => { setPostDraft((current) => ({ ...current, coverImage: reader.result })); setStatus("Обложка добавлена локально — сохраните статью"); };
      reader.readAsDataURL(file);
    }
  };
  const loadLeads = async () => {
    try {
      setLeads(await loadRemoteLeads());
    } catch {
      setLeads(safeJson(localStorage.getItem("kylinarinni-leads-v1"), []));
    }
  };
  const selectPost = (post) => {
    setSelectedPost(post?.id || null);
    setPostDraft(post ? cloneCmsData({ post }).post : { id: `post-${Date.now()}`, slug: "new-post", title: "Новая статья", excerpt: "", coverImage: "", publishedAt: new Date().toISOString().slice(0, 10), isPublished: true, sortOrder: (data.posts || []).length * 10 + 10, blocks: [{ type: "paragraph", text: "" }] });
  };
  const savePost = () => {
    if (!postDraft) return;
    const exists = (data.posts || []).some((post) => post.id === postDraft.id);
    const posts = exists ? data.posts.map((post) => post.id === postDraft.id ? postDraft : post) : [...(data.posts || []), postDraft];
    commit({ ...data, posts });
    setSelectedPost(postDraft.id);
  };
  const deletePost = (id) => {
    if (!window.confirm("Удалить статью?")) return;
    commit({ ...data, posts: data.posts.filter((post) => post.id !== id) });
    if (selectedPost === id) { setSelectedPost(null); setPostDraft(null); }
  };
  const openView = (nextView) => {
    setView(nextView);
    if (nextView === "leads") loadLeads();
    if (nextView === "editor" && !selectedBlockId && blocks[0]) setSelectedBlockId(blocks[0].id);
  };

  return (
    <div className="client-admin-shell">
      <aside className="client-admin-sidebar">
        <div className="client-admin-brand"><strong>{data.site?.name || "Kylinarinni"}</strong><span>панель управления сайтом</span></div>
        <nav className="client-admin-nav" aria-label="Разделы админки">
          {navItems.map(([id, label, Icon]) => <button className={view === id ? "active" : ""} type="button" onClick={() => openView(id)} key={id}><Icon size={18} /><span>{label}</span></button>)}
        </nav>
        <div className="client-admin-sidebar-footer"><button type="button" onClick={onViewSite}><ArrowRight size={17} /><span>Открыть сайт</span></button><button type="button" onClick={onLogout}><SignOut size={17} /><span>Выйти</span></button></div>
      </aside>
      <main className="client-admin-main">
        <header className="client-admin-header"><div><h1>{currentTitle}</h1><p>{view === "dashboard" ? "Коротко: что на сайте и куда нажать дальше." : "Меняйте тексты, фото, кнопки, порядок блоков и настройки сайта."}</p></div><div className="admin-top-actions"><button className="admin-ghost" type="button" onClick={undo} disabled={!history.length}><ArrowLeft size={17} /> Шаг назад</button><button className="admin-secondary-button" type="button" onClick={() => setPreview("desktop")}><Eye size={17} /> Предпросмотр</button><button className="admin-primary" type="button" onClick={() => commit(data, "Черновик сохранён локально")}><FloppyDisk size={17} /> Сохранить</button></div></header>
        {status ? <div className="admin-status"><Check size={16} /> {status}</div> : null}
        {view === "dashboard" && <div className="client-dashboard"><div className="client-dashboard-grid"><DashboardCard title="Блоки на странице" value={`${activeCount}/${blocks.length}`} text="Можно выключать и менять порядок." onClick={() => openView("pages")} /><DashboardCard title="Заявки" value="CRM" text="MySQL и отправка на почту." onClick={() => openView("leads")} /><DashboardCard title="Блог" value="Попап" text="Посты открываются без отдельных страниц." onClick={() => openView("blog")} /><DashboardCard title="История" value={history.length ? "есть" : "нет"} text="Доступен шаг назад." onClick={() => openView("site")} /></div><section className="client-guide-card"><p className="admin-kicker">Быстрый старт</p><h2>Частые действия клиента</h2><div className="client-feature-grid">{["Поменять первый экран", "Заменить фото", "Отключить блок", "Добавить статью", "Посмотреть заявки", "Открыть мобильный предпросмотр"].map((item) => <article key={item}><strong>{item}</strong><span>разделы слева</span></article>)}</div></section></div>}
        {view === "pages" && <section className="client-guide-card"><p className="admin-kicker">Главная страница</p><h2>Блоки сайта</h2><p>Стрелки меняют порядок секций, кнопка «Вкл/Выкл» управляет видимостью. Нажмите на блок, чтобы открыть редактор.</p><BlockList blocks={blocks} selectedBlockId={selectedBlock?.id} onSelect={(id) => { setSelectedBlockId(id); openView("editor"); }} onMove={moveBlock} onToggle={toggleBlock} /></section>}
        {view === "editor" && <div className="admin-workspace"><aside className="admin-left-panel"><BlockList blocks={blocks} selectedBlockId={selectedBlock?.id} onSelect={setSelectedBlockId} onMove={moveBlock} onToggle={toggleBlock} /></aside><section className="admin-editor-panel">{selectedBlock ? <BlockEditor block={selectedBlock} onChange={(next) => updateBlock(selectedBlock.id, next)} onDelete={() => commit({ ...data, page: { ...data.page, blocks: data.page.blocks.filter((item) => item.id !== selectedBlock.id) } })} onUpload={(file, fieldKey, itemIndex, itemKey) => upload(file, selectedBlock, fieldKey, itemIndex, itemKey)} /> : <p className="admin-empty">Выберите блок.</p>}</section></div>}
        {view === "design" && <section className="client-design-layout"><section className="admin-settings-card"><div className="admin-card-title"><Palette size={20} /><h2>Общие настройки</h2></div><p className="admin-muted-copy">Здесь можно изменить цвета, шрифты и скругления всего сайта. Названия полей написаны простым языком.</p><div className="admin-field-grid">{Object.entries(design.content || {}).map(([key, value]) => { const [label, help] = designLabels[key] || [labelForField(key), "Настройка внешнего вида сайта."]; return <label className="admin-field" key={key}><span>{label}</span><small>{help}</small><input value={String(value ?? "")} onChange={(event) => setData(setPath(data, `page.blocks.${data.page.blocks.findIndex((item) => item.id === "design")}.content.${key}`, event.target.value))} onBlur={() => commit(data)} /></label>; })}</div></section><section className="client-guide-card"><p className="admin-kicker">Подсказка</p><h2>Сначала измените текст и фото, а дизайн — при необходимости</h2><p>Для редактирования конкретной секции используйте «Редактор блоков». После каждого изменения нажмите «Сохранить» сверху.</p></section></section>}
        {view === "site" && <section className="admin-settings-card"><div className="admin-card-title"><Stack size={20} /><h2>Страница и SEO</h2></div><p className="admin-muted-copy">Эти поля попадают в title, description и адрес сайта.</p><div className="admin-field-grid"><label className="admin-field"><span>Название сайта</span><input value={data.site.name || ""} onChange={(event) => setData({ ...data, site: { ...data.site, name: event.target.value } })} onBlur={() => commit(data)} /></label><label className="admin-field"><span>Домен</span><input value={data.site.domain || ""} onChange={(event) => setData({ ...data, site: { ...data.site, domain: event.target.value } })} onBlur={() => commit(data)} /></label><label className="admin-field"><span>SEO title</span><input value={data.page.seoTitle || ""} onChange={(event) => setData({ ...data, page: { ...data.page, seoTitle: event.target.value } })} onBlur={() => commit(data)} /></label><label className="admin-field span-2"><span>SEO description</span><textarea rows="4" value={data.page.seoDescription || ""} onChange={(event) => setData({ ...data, page: { ...data.page, seoDescription: event.target.value } })} onBlur={() => commit(data)} /></label></div></section>}
        {view === "leads" && <section className="client-guide-card"><div className="client-section-head"><div><p className="admin-kicker">Заявки</p><h2>{leads.length ? "Последние обращения" : "Пока заявок нет"}</h2><p>Заявки сохраняются в MySQL и отправляются на настроенную почту.</p></div><button className="admin-ghost" type="button" onClick={loadLeads}>Обновить</button></div>{leads.length ? <div className="client-leads-list">{leads.map((lead) => <article key={lead.id || lead.createdAt}><div><strong>{lead.name || "Без имени"}</strong><span>{formatDate(lead.createdAt)}</span></div><a href={`tel:${lead.contact}`}>{lead.contact}</a><small>{lead.status === "new" || !lead.status ? "Новая" : lead.status}</small>{lead.message ? <p>{lead.message}</p> : null}</article>)}</div> : <div className="admin-empty">Здесь появятся обращения из формы сайта.</div>}</section>}
        {view === "blog" && <section className="client-guide-card">
          <div className="client-section-head"><div><p className="admin-kicker">Статьи</p><h2>Статьи / Блог</h2><p>Посты открываются на сайте в попапе, без отдельных страниц.</p></div><button className="admin-primary" type="button" onClick={() => selectPost(null)}>Добавить статью</button></div>
          <div className="admin-blog-layout">
            <div className="admin-post-list">{(data.posts || []).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)).map((post) => <button type="button" className={selectedPost === post.id ? "active" : ""} onClick={() => selectPost(post)} key={post.id}><span>{post.title}</span><small>{post.isPublished ? "Опубликована" : "Черновик"}</small></button>)}</div>
            {postDraft ? <div className="admin-post-editor">
              <label className="admin-field"><span>Заголовок статьи</span><input value={postDraft.title} onChange={(event) => setPostDraft({ ...postDraft, title: event.target.value })} /></label>
              <label className="admin-field"><span>Ссылка статьи</span><small>Технический адрес. Если не уверены, оставьте как есть.</small><input value={postDraft.slug} onChange={(event) => setPostDraft({ ...postDraft, slug: event.target.value })} /></label>
              <label className="admin-field"><span>Дата публикации</span><input type="date" value={postDraft.publishedAt || ""} onChange={(event) => setPostDraft({ ...postDraft, publishedAt: event.target.value })} /></label>
              <label className="admin-field"><span>Короткое описание</span><textarea rows="3" value={postDraft.excerpt || ""} onChange={(event) => setPostDraft({ ...postDraft, excerpt: event.target.value })} /></label>
              <ImageField label="Обложка статьи" help="Выберите фотографию кнопкой — путь к файлу вводить не нужно." value={postDraft.coverImage} onUpload={uploadPostImage} onClear={() => setPostDraft({ ...postDraft, coverImage: "" })} />
              <label className="admin-field"><span>Текст статьи</span><small>Напишите основной текст обычными абзацами.</small><textarea rows="12" value={(postDraft.blocks || []).map((item) => item.text || "").join("\n\n")} onChange={(event) => setPostDraft({ ...postDraft, blocks: [{ type: "paragraph", text: event.target.value }] })} /></label>
              <label className="admin-check"><input type="checkbox" checked={postDraft.isPublished !== false} onChange={(event) => setPostDraft({ ...postDraft, isPublished: event.target.checked })} /> <span>Показывать статью на сайте</span></label>
              <div className="admin-block-actions"><button className="admin-primary" type="button" onClick={savePost}>Сохранить статью</button>{selectedPost ? <button className="admin-danger-link" type="button" onClick={() => deletePost(selectedPost)}><Trash size={17} /> Удалить</button> : null}</div>
            </div> : <div className="admin-empty">Выберите статью или добавьте новую.</div>}
          </div>
        </section>}
      </main>
      {preview ? <div className="admin-full-preview"><div className="admin-full-preview-bar"><div><p className="admin-kicker">Предпросмотр</p><strong>{preview === "mobile" ? "Мобильная версия" : "Десктопная версия"}</strong></div><div className="admin-preview-device-toggle"><button className={preview === "desktop" ? "active" : ""} type="button" onClick={() => setPreview("desktop")}>Десктоп</button><button className={preview === "mobile" ? "active" : ""} type="button" onClick={() => setPreview("mobile")}>Мобильный</button><button type="button" onClick={() => setPreview(null)} aria-label="Закрыть"><X size={18} /></button></div></div><div className="admin-full-preview-stage"><div className={`admin-full-preview-frame ${preview}`}><iframe title="Предпросмотр сайта" src="/" /></div></div></div> : null}
    </div>
  );
}
