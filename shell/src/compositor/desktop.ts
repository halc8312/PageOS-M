import { renderWindow, type AppWindow } from './window';

export interface DesktopSession {
  nowLabel: string;
  windows: readonly AppWindow[];
}

export function renderDesktop(session: DesktopSession): string {
  return `
    <section class="desktop-shell" data-testid="desktop-shell" aria-label="Desktop shell">
      <div class="desktop-shell__wallpaper crt-overlay"></div>
      <header class="desktop-shell__statusbar">
        <span>PageOS // desktop session</span>
        <span>${session.nowLabel}</span>
      </header>
      <div class="desktop-shell__workspace">
        ${session.windows.map((windowState) => renderWindow(windowState)).join('')}
      </div>
      <footer class="desktop-shell__dock">
        ${session.windows
          .map(
            (windowState) => `<button type="button" class="dock-item" data-dock-id="${windowState.id}">${windowState.title}</button>`,
          )
          .join('')}
      </footer>
    </section>
  `;
}
