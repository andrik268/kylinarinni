import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Cake,
  CaretLeft,
  CaretDown,
  CaretRight,
  CheckCircle,
  FloppyDisk,
  InstagramLogo,
  List,
  MagnifyingGlass,
  MapPin,
  PaperPlaneTilt,
  Phone,
  SignOut,
  TelegramLogo,
  Truck,
  UploadSimple,
  WarningCircle,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";
import { FaVk } from "react-icons/fa";
import {
  ADMIN_LOGIN,
  ADMIN_PASSWORD_HASH,
  CMS_SESSION_KEY,
  CMS_STORAGE_KEY,
  LOCAL_LEADS_KEY,
  clone,
  defaultCmsData,
  normalizeCmsData,
  phoneDigits,
  waLink,
} from "./cmsData.js";
import {
  getRemoteSession,
  loadRemoteCms,
  loginRemote,
  logoutRemote,
  saveRemoteCms,
  submitLead,
  uploadRemoteImage,
} from "./apiClient.js";

const fallbackMessage = "Здравствуйте! Хочу рассчитать торт по референсу.";

function getBlock(cms, id) {
  return cms.page.blocks.find((block) => block.id === id)?.content || {};
}

async function sha256(value) {
  const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function saveLocalCms(data) {
  window.localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data));
}

function loadLocalCms() {
  try {
    const saved = window.localStorage.getItem(CMS_STORAGE_KEY);
    return saved ? normalizeCmsData(JSON.parse(saved)) : clone(defaultCmsData);
  } catch {
    return clone(defaultCmsData);
  }
}

function loadLocalSession() {
  try {
    return JSON.parse(window.localStorage.getItem(CMS_SESSION_KEY) || "null");
  } catch {
    return null;
  }
}

function saveLocalLead(lead) {
  const saved = JSON.parse(window.localStorage.getItem(LOCAL_LEADS_KEY) || "[]");
  saved.unshift({ ...lead, createdAt: new Date().toISOString() });
  window.localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(saved.slice(0, 100)));
}

function AppButton({ href, children, variant = "primary", icon: Icon = ArrowRight, onClick, type }) {
  const className = `btn btn-${variant}`;
  if (href) {
    return (
      <a className={className} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        <span>{children}</span>
        {Icon ? <Icon size={18} weight="bold" /> : null}
      </a>
    );
  }

  return (
    <button className={className} type={type || "button"} onClick={onClick}>
      <span>{children}</span>
      {Icon ? <Icon size={18} weight="bold" /> : null}
    </button>
  );
}

function FullscreenMenu({ open, onClose, header, contacts }) {
  return (
    <div className={`site-menu ${open ? "open" : ""}`} aria-hidden={!open}>
      <div className="menu-top">
        <button className="icon-button menu-close" type="button" aria-label="Закрыть меню" onClick={onClose}>
          <X size={26} weight="bold" />
        </button>
        <a className="menu-brand" href="#top" onClick={onClose}>
          {header.logoText}
        </a>
      </div>

      <div className="menu-grid">
        <figure className="menu-photo">
          <img src={header.menuImage} alt="Витрина Kylinarinni" />
          <figcaption>СОБИРАЮ ВАШ РЕФЕРЕНС В РЕАЛЬНЫЙ ТОРТ</figcaption>
        </figure>

        <nav className="menu-links" aria-label="Меню сайта">
          {header.menuItems?.map((item) => (
            <a key={item.id} href={item.href} onClick={onClose}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="menu-contacts">
          <span>Контакт</span>
          <a href={contacts.whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>
          <a href={contacts.telegramUrl} target="_blank" rel="noreferrer">Telegram</a>
          <a href={`tel:+${phoneDigits}`}>{contacts.phone}</a>
        </div>
      </div>
    </div>
  );
}

function Header({ header, contacts, setMenuOpen }) {
  return (
    <header className="site-header">
      <button className="icon-button" type="button" aria-label="Открыть меню" onClick={() => setMenuOpen(true)}>
        <List size={28} weight="bold" />
      </button>
      <a className="wordmark" href="#top">
        {header.logoText}
      </a>
      <div className="header-actions">
        <a className="phone-pill" href={`tel:+${phoneDigits}`}>
          <Phone size={17} weight="bold" />
          <span>{header.phone}</span>
        </a>
      </div>
    </header>
  );
}

function Hero({ hero, contacts }) {
  return (
    <section className="hero-wrap" id="top">
      <div className="hero-card" style={{ backgroundImage: `linear-gradient(90deg, rgba(18, 6, 8, .86), rgba(18, 6, 8, .52) 45%, rgba(18, 6, 8, .12)), url(${hero.image})` }}>
        <div className="hero-copy">
          <p className="micro">{hero.overline}</p>
          <h1>
            <span className="outline">{hero.outlineTitle}</span>
            {" "}
            <span>{hero.solidTitle}</span>
            {" "}
            <span>{hero.afterTitle}</span>
          </h1>
          <p>{hero.subtitle}</p>
          <div className="hero-actions">
            <AppButton href={contacts.whatsappUrl || waLink(fallbackMessage)} icon={null}>
              {hero.primaryButtonText}
            </AppButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services({ services }) {
  return (
    <section className="section services-section" id="services">
      <div className="container section-intro">
        <h2>{services.title}</h2>
        <p>{services.text}</p>
      </div>
      <div className="service-rows container">
        {services.items?.map((item) => (
          <article className="service-row" key={item.id}>
            <span>{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Price({ price, contacts }) {
  const categories = price.categories?.length
    ? price.categories
    : [{
        id: "legacy-price",
        eyebrow: "РАСЧЕТ",
        title: price.title || "Расчет по референсу",
        price: "По запросу",
        description: price.text || "Пришлите референс, дату и примерный вес.",
        images: price.image ? [price.image] : [],
      }];
  const [activeId, setActiveId] = useState(categories[0]?.id);
  const [imageIndex, setImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const activeIndex = Math.max(0, categories.findIndex((item) => item.id === activeId));
  const active = categories[activeIndex] || categories[0];
  const images = active?.images || [];
  const image = images[imageIndex] || images[0];
  const activeTitle = active?.id === "antigravity" ? "Антигравитация" : active?.title || "Торт";

  useEffect(() => {
    setImageIndex(0);
  }, [active?.id]);

  useEffect(() => {
    if (!lightboxOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowLeft") setImageIndex((current) => (current - 1 + images.length) % images.length);
      if (event.key === "ArrowRight") setImageIndex((current) => (current + 1) % images.length);
    };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [images.length, lightboxOpen]);

  function selectCategory(id) {
    setActiveId(id);
    setImageIndex(0);
  }

  function shiftImage(direction) {
    if (images.length < 2) return;
    setImageIndex((current) => (current + direction + images.length) % images.length);
  }

  const message = `Здравствуйте! Хочу заказать ${activeTitle}. ${active?.price || "Нужен расчет"}.`;

  return (
    <section className="price-section" id="price">
      <div className="container price-intro-grid">
        <div className="price-intro">
          <p className="micro price-kicker">ПРАЙС / НАЧИНКИ / ФОРМАТЫ</p>
          <h2>{price.title}</h2>
          <p>{price.text}</p>
          <div className="price-points">
            <span>Торты от 2 кг</span>
            <span>Декор рассчитывается отдельно</span>
          </div>
        </div>
        <div className="price-intro-note">
          <strong>01—{String(categories.length).padStart(2, "0")}</strong>
          <span>Выберите подходящую категорию, а страницу прайса можно рассмотреть крупно.</span>
        </div>
      </div>

      <div className="container price-tabs" role="tablist" aria-label="Категории прайса">
        {categories.map((category, index) => (
          <button
            key={category.id}
            className={category.id === active?.id ? "active" : ""}
            type="button"
            role="tab"
            aria-selected={category.id === active?.id}
            onClick={() => selectCategory(category.id)}
          >
            <small>{String(index + 1).padStart(2, "0")}</small>
            <span>{category.tabLabel || category.title}</span>
            <strong>{category.price}</strong>
          </button>
        ))}
      </div>

      <div className="container price-viewer">
        <div className="price-sheet-wrap">
          {image ? (
            <button className="price-sheet-button" type="button" onClick={() => setLightboxOpen(true)} aria-label={`Открыть прайс: ${active.title}`}>
              <img className="price-sheet" src={image} alt={`${activeTitle}. ${active.description || "Прайс"}`} />
              <span className="price-sheet-hint"><MagnifyingGlass size={18} weight="bold" /> Открыть крупнее</span>
            </button>
          ) : null}
          {images.length > 1 ? (
            <div className="price-sheet-controls">
              <button type="button" onClick={() => shiftImage(-1)} aria-label="Предыдущая страница прайса"><CaretLeft size={20} weight="bold" /></button>
              <span>{String(imageIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
              <button type="button" onClick={() => shiftImage(1)} aria-label="Следующая страница прайса"><CaretRight size={20} weight="bold" /></button>
            </div>
          ) : null}
        </div>

        <aside className="price-details">
          <div className="price-details-top">
            <span>{active.eyebrow}</span>
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          </div>
          <h3>{activeTitle}</h3>
          <strong className="price-details-value">{active.price}</strong>
          <p>{active.description}</p>
          <div className="delivery-line">
            <Truck size={22} weight="duotone" />
            <span>От 5 кг доставляю лично в охлаждающих контейнерах.</span>
          </div>
          <AppButton href={waLink(message)} icon={WhatsappLogo}>
            Обсудить заказ
          </AppButton>
        </aside>
      </div>

      {lightboxOpen && image ? (
        <div className="price-lightbox" role="dialog" aria-modal="true" aria-label={`Прайс: ${activeTitle}`} onClick={() => setLightboxOpen(false)}>
          <button className="lightbox-close" type="button" onClick={() => setLightboxOpen(false)} aria-label="Закрыть прайс"><X size={24} weight="bold" /></button>
          {images.length > 1 ? <button className="lightbox-arrow lightbox-arrow-left" type="button" onClick={(event) => { event.stopPropagation(); shiftImage(-1); }} aria-label="Предыдущая страница"><CaretLeft size={28} weight="bold" /></button> : null}
          <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <img src={image} alt={`${activeTitle}. Увеличенный прайс`} />
            <span>{activeTitle} / {String(imageIndex + 1).padStart(2, "0")} из {String(images.length).padStart(2, "0")}</span>
          </div>
          {images.length > 1 ? <button className="lightbox-arrow lightbox-arrow-right" type="button" onClick={(event) => { event.stopPropagation(); shiftImage(1); }} aria-label="Следующая страница"><CaretRight size={28} weight="bold" /></button> : null}
        </div>
      ) : null}
    </section>
  );
}

function Portfolio({ portfolio }) {
  return (
    <section className="section portfolio-section" id="portfolio">
      <div className="container section-intro compact">
        <h2>{portfolio.title}</h2>
        <p>{portfolio.text}</p>
      </div>
      <div className="portfolio-strip">
        {portfolio.items?.map((item) => (
          <article className="work-card" key={item.id}>
            <img src={item.image} alt={item.title} />
            <div>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Masterclass({ block, contacts }) {
  return (
    <section className="masterclass-section" id="masterclass">
      <div className="container masterclass-grid">
        <img src={block.image} alt={block.imageAlt} />
        <div>
          <h2>{block.title}</h2>
          <p>{block.text}</p>
          <div className="fact-pills">
            {block.facts?.map((fact) => <span key={fact}>{fact}</span>)}
          </div>
          <AppButton href={contacts.whatsappUrl} icon={WhatsappLogo}>
            Обсудить МК
          </AppButton>
        </div>
      </div>
    </section>
  );
}

function Trust({ trust }) {
  return (
    <section className="section trust-section">
      <div className="container trust-grid">
        <div>
          <h2>{trust.title}</h2>
          <p>{trust.text}</p>
        </div>
        <div className="stats-grid">
          {trust.stats?.map((item) => (
            <div className="stat-card" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq({ faq }) {
  const [active, setActive] = useState(0);
  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-grid">
        <h2>{faq.title}</h2>
        <div className="faq-list">
          {faq.items?.map((item, index) => (
            <article className={`faq-item ${active === index ? "open" : ""}`} key={item.question}>
              <button type="button" onClick={() => setActive(active === index ? -1 : index)}>
                <span>{item.question}</span>
                <CaretDown size={22} weight="bold" />
              </button>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contacts({ contacts }) {
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [status, setStatus] = useState("idle");

  async function onSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    const lead = {
      name: form.name,
      contact: form.contact,
      message: form.message || "Заявка с формы Kylinarinni",
      source: "kylinarinni-site",
      fields: { brand: "Kylinarinni" },
    };
    try {
      await submitLead(lead);
      setStatus("sent");
      setForm({ name: "", contact: "", message: "" });
    } catch {
      saveLocalLead(lead);
      setStatus("local");
      setForm({ name: "", contact: "", message: "" });
    }
  }

  return (
    <section className="contacts-section" id="contacts">
      <div className="container contacts-grid">
        <div>
          <h2>{contacts.title}</h2>
          <p>{contacts.text}</p>
          <div className="contact-links">
            <a href={contacts.whatsappUrl} target="_blank" rel="noreferrer"><WhatsappLogo size={24} />WhatsApp</a>
            <a href={contacts.telegramUrl} target="_blank" rel="noreferrer"><TelegramLogo size={24} />Telegram</a>
            <a href={`tel:+${phoneDigits}`}><Phone size={24} />{contacts.phone}</a>
            <a href={contacts.instagramUrl} target="_blank" rel="noreferrer"><InstagramLogo size={24} />Instagram</a>
            <a className="vk-link" href={contacts.vkUrl} target="_blank" rel="noreferrer"><FaVk size={25} />VK</a>
            <span><MapPin size={24} />{contacts.city}</span>
          </div>
        </div>
        <form className="lead-form" onSubmit={onSubmit}>
          <label>
            <span>Имя</span>
            <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Как к вам обращаться" />
          </label>
          <label>
            <span>Контакт</span>
            <input required value={form.contact} onChange={(event) => setForm({ ...form, contact: event.target.value })} placeholder="Телефон или мессенджер" />
          </label>
          <label>
            <span>Что нужно</span>
            <textarea value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Дата, вес, повод, референс" />
          </label>
          <button className="btn btn-primary" type="submit" disabled={status === "loading"}>
            <span>{status === "loading" ? "Отправляю..." : "Рассчитать"}</span>
            <PaperPlaneTilt size={18} weight="bold" />
          </button>
          {status === "sent" ? <p className="form-status success"><CheckCircle size={18} />Заявка отправлена в CMS.</p> : null}
          {status === "local" ? <p className="form-status"><WarningCircle size={18} />Локальный режим: заявка сохранена в браузере.</p> : null}
        </form>
      </div>
    </section>
  );
}

function AdminPanel({ cms, setCms }) {
  const [open, setOpen] = useState(() => window.location.search.includes("admin=1") || window.location.hash === "#admin");
  const [user, setUser] = useState(loadLocalSession);
  const [login, setLogin] = useState(ADMIN_LOGIN);
  const [password, setPassword] = useState("");
  const [activeId, setActiveId] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const activeBlock = cms.page.blocks.find((block) => block.id === activeId) || cms.page.blocks[0];

  useEffect(() => {
    getRemoteSession().then((session) => {
      if (session) {
        setUser(session);
        window.localStorage.setItem(CMS_SESSION_KEY, JSON.stringify(session));
      }
    }).catch(() => {});
  }, []);

  async function onLogin(event) {
    event.preventDefault();
    setNotice("");
    try {
      const remoteUser = await loginRemote(login, password);
      setUser(remoteUser);
      window.localStorage.setItem(CMS_SESSION_KEY, JSON.stringify(remoteUser));
    } catch {
      const hash = await sha256(password);
      if ((login === ADMIN_LOGIN || login === "admin") && hash === ADMIN_PASSWORD_HASH) {
        const localUser = { name: "Admin", email: ADMIN_LOGIN, mode: "local" };
        setUser(localUser);
        window.localStorage.setItem(CMS_SESSION_KEY, JSON.stringify(localUser));
      } else {
        setNotice("Неверный логин или пароль.");
      }
    }
  }

  async function onLogout() {
    await logoutRemote().catch(() => {});
    window.localStorage.removeItem(CMS_SESSION_KEY);
    setUser(null);
  }

  function updateBlockContent(nextContent) {
    setCms((current) => ({
      ...current,
      page: {
        ...current.page,
        blocks: current.page.blocks.map((block) => block.id === activeBlock.id ? { ...block, content: nextContent } : block),
      },
    }));
  }

  async function save() {
    setSaving(true);
    setNotice("");
    const normalized = normalizeCmsData(cms);
    saveLocalCms(normalized);
    try {
      const remote = await saveRemoteCms(normalized);
      setCms(normalizeCmsData(remote));
      setNotice("Сохранено в CMS и локально.");
    } catch {
      setNotice("Сохранено локально. Для сервера нужен рабочий /api/cms.");
    } finally {
      setSaving(false);
    }
  }

  async function uploadImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setSaving(true);
    try {
      const path = await uploadRemoteImage(file);
      updateBlockContent({ ...activeBlock.content, image: path });
      setNotice("Изображение загружено.");
    } catch {
      setNotice("Загрузка изображений доступна после настройки серверного API.");
    } finally {
      setSaving(false);
    }
  }

  if (!open) {
    return null;
  }

  return (
    <aside className="admin-panel">
      <div className="admin-head">
        <strong>CMS</strong>
        <button type="button" onClick={() => setOpen(false)}><X size={20} /></button>
      </div>
      {!user ? (
        <form className="admin-login" onSubmit={onLogin}>
          <label>
            <span>Логин</span>
            <input value={login} onChange={(event) => setLogin(event.target.value)} />
          </label>
          <label>
            <span>Пароль</span>
            <input value={password} type="password" onChange={(event) => setPassword(event.target.value)} />
          </label>
          <button type="submit">Войти</button>
          {notice ? <p>{notice}</p> : null}
        </form>
      ) : (
        <>
          <div className="admin-user">
            <span>{user.email}</span>
            <button type="button" onClick={onLogout}><SignOut size={18} />Выйти</button>
          </div>
          <select value={activeId} onChange={(event) => setActiveId(event.target.value)}>
            {cms.page.blocks.map((block) => <option key={block.id} value={block.id}>{block.title}</option>)}
          </select>
          <div className="admin-editor">
            {Object.entries(activeBlock.content).map(([key, value]) => {
              if (Array.isArray(value)) {
                return (
                  <label key={key}>
                    <span>{key}</span>
                    <textarea value={JSON.stringify(value, null, 2)} onChange={(event) => {
                      try {
                        updateBlockContent({ ...activeBlock.content, [key]: JSON.parse(event.target.value) });
                      } catch {
                        updateBlockContent({ ...activeBlock.content, [key]: event.target.value });
                      }
                    }} />
                  </label>
                );
              }
              if (typeof value === "object" && value !== null) return null;
              return (
                <label key={key}>
                  <span>{key}</span>
                  <textarea value={value ?? ""} onChange={(event) => updateBlockContent({ ...activeBlock.content, [key]: event.target.value })} />
                </label>
              );
            })}
            <label className="upload-control">
              <UploadSimple size={18} /> Загрузить image
              <input type="file" accept="image/*" onChange={uploadImage} />
            </label>
          </div>
          <button className="admin-save" type="button" disabled={saving} onClick={save}>
            <FloppyDisk size={18} /> {saving ? "Сохраняю..." : "Сохранить"}
          </button>
          {notice ? <p className="admin-notice">{notice}</p> : null}
        </>
      )}
    </aside>
  );
}

export function App() {
  const [cms, setCms] = useState(() => (typeof window === "undefined" ? clone(defaultCmsData) : loadLocalCms()));
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    loadRemoteCms()
      .then((remote) => {
        if (remote) {
          const normalized = normalizeCmsData(remote);
          setCms(normalized);
          saveLocalCms(normalized);
        }
      })
      .catch(() => {});
  }, []);

  const blocks = useMemo(() => ({
    header: getBlock(cms, "header"),
    hero: getBlock(cms, "hero"),
    services: getBlock(cms, "services"),
    price: getBlock(cms, "price"),
    portfolio: getBlock(cms, "portfolio"),
    masterclass: getBlock(cms, "masterclass"),
    trust: getBlock(cms, "trust"),
    faq: getBlock(cms, "faq"),
    contacts: getBlock(cms, "contacts"),
  }), [cms]);

  return (
    <div className="site-shell">
      <Header header={blocks.header} contacts={blocks.contacts} setMenuOpen={setMenuOpen} />
      <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} header={blocks.header} contacts={blocks.contacts} />
      <main>
        <Hero hero={blocks.hero} contacts={blocks.contacts} />
        <Services services={blocks.services} />
        <Price price={blocks.price} contacts={blocks.contacts} />
        <Portfolio portfolio={blocks.portfolio} />
        <Masterclass block={blocks.masterclass} contacts={blocks.contacts} />
        <Trust trust={blocks.trust} />
        <Faq faq={blocks.faq} />
        <Contacts contacts={blocks.contacts} />
      </main>
      <footer className="footer">
        <span>Kylinarinni</span>
        <a href={blocks.contacts.whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>
      </footer>
      <AdminPanel cms={cms} setCms={setCms} />
    </div>
  );
}
