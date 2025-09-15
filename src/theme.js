document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.querySelector('.theme-toggle');
  if (!themeToggle) return;

  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Применяем тему при загрузке
  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.add('theme-dark');
      themeToggle.setAttribute('aria-pressed', 'true');
    } else {
      document.body.classList.remove('theme-dark');
      themeToggle.setAttribute('aria-pressed', 'false');
    }
  }

  // Проверяем сохранённую тему или системные настройки
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    applyTheme(true);
  } else {
    applyTheme(false);
  }

  // Обработчик клика по кнопке
  themeToggle.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('theme-dark');
    applyTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Слушаем изменения системной темы
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches);
    }
  });
});