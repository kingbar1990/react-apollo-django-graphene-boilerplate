import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: {
        login: "login",
        Users: "Users",
        Home: "Home",
        Profile: "Profile",
        Tasks: "Tasks",
        About: "About",
        Landing: "Landing",
        Dashboard: "Dashboard",
        "Full name": "Full name",
        Avatar: "Avatar",
        Email: "Email",
        "Email address": "Email address",
        "Task list": "Task list",
        General: "General",
        Title: "Title",
        Description: "Description",
        Info: "Info",
        Status: "Status",
        "Due date": "Due date",
        "Estimated time": "Estimated time",
        Responsibility: "Responsibility",
        "Assigned to": "Assigned to",
        Actions: "Actions",
        Previous: "Previous",
        Page: "Page",
        Next: "Next",
        Projects: "Projects",
        Budget: "Budget",
        Deadline: "Deadline",
        Developer: "Developer",
        Project: "Project",
        "Project list": "Project list"
      }
    },

    ru: {
      translations: {
        login: "Вход",
        Users: "Пользователи",
        Home: "Главная",
        Profile: "Профиль",
        Tasks: "Задачи",
        About: "О нас",
        Landing: "Лэндинг",
        Dashboard: "Управление",
        "Full name": "Полное имя",
        Avatar: "Аватар",
        Email: "Электронный адрес",
        "Email address": "Электронный адрес",
        "Task list": "Список задач",
        General: "Общее",
        Title: "Название",
        Description: "Описание",
        Info: "Инфо",
        Status: "Статус",
        "Due date": "Текущее время",
        "Estimated time": "Указанное время",
        Responsibility: "Ответственность",
        "Assigned to": "Выполняет",
        Actions: "Действия",
        Previous: "Предыдущая",
        Page: "Страница",
        Next: "Следующая",
        Projects: "Проекты",
        Budget: "Бюджет",
        Deadline: "Окончание проекта",
        Developer: "Разработчик",
        Project: "Проект",
        "Project list": "Список проектов"
      }
    }
  },
  lng: "ru",
  fallbackLng: "ru",
  debug: true,

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ","
  },

  react: {
    wait: true
  }
});

export default i18n;
