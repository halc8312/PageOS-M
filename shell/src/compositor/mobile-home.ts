import type { AppWindow } from './window';

export interface MobileSession {
  apps: readonly AppWindow[];
  activeAppId: string | null;
}

export function renderMobileHome(session: MobileSession): string {
  const activeApp = session.apps.find((app) => app.id === session.activeAppId) ?? null;

  return `
    <section class="mobile-shell" data-testid="mobile-shell" aria-label="Mobile shell">
      <header class="mobile-shell__header">
        <div>
          <p>PageOS</p>
          <h1>Home</h1>
        </div>
        <span>${session.apps.length} apps</span>
      </header>
      <div class="mobile-shell__launcher">
        ${session.apps
          .map(
            (app) => `
              <button type="button" class="launcher-card" data-launch-app="${app.id}">
                <strong>${app.title}</strong>
                <span>${app.subtitle}</span>
              </button>
            `,
          )
          .join('')}
      </div>
      <section class="mobile-shell__app ${activeApp === null ? 'is-hidden' : ''}" data-testid="mobile-active-app">
        <div class="mobile-shell__app-header">
          <button type="button" data-mobile-close>Back</button>
          <strong>${activeApp?.title ?? 'Launcher'}</strong>
        </div>
        <div class="mobile-shell__app-body">${activeApp?.content ?? '<p>Select an app to continue.</p>'}</div>
      </section>
    </section>
  `;
}
