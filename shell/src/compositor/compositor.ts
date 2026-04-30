import { renderDesktop } from './desktop';
import { renderMobileHome } from './mobile-home';
import { enableWindowDragging, type AppWindow } from './window';
import { getShellMode, type ShellMode } from './responsive';

export interface ShellSession {
  windows: AppWindow[];
  mode: ShellMode;
}

export class Compositor {
  readonly #root: HTMLElement;
  #session: ShellSession;

  constructor(root: HTMLElement, session: ShellSession) {
    this.#root = root;
    this.#session = session;
  }

  render(): void {
    if (this.#session.mode === 'desktop') {
      this.#root.innerHTML = renderDesktop({
        windows: this.#session.windows,
        nowLabel: new Intl.DateTimeFormat('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }).format(new Date()),
      });
      enableWindowDragging(this.#root);
      this.#wireDesktopInteractions();
      return;
    }

    this.#root.innerHTML = renderMobileHome({
      apps: this.#session.windows,
      activeAppId: null,
    });
    this.#wireMobileInteractions();
  }

  updateMode(width: number): void {
    const nextMode = getShellMode(width);
    if (nextMode !== this.#session.mode) {
      this.#session.mode = nextMode;
      this.render();
    }
  }

  #wireDesktopInteractions(): void {
    for (const closeButton of this.#root.querySelectorAll<HTMLButtonElement>('.pageos-window__close')) {
      closeButton.addEventListener('click', () => {
        const windowElement = closeButton.closest<HTMLElement>('[data-window-id]');
        windowElement?.classList.add('is-minimized');
      });
    }

    for (const dockButton of this.#root.querySelectorAll<HTMLButtonElement>('[data-dock-id]')) {
      dockButton.addEventListener('click', () => {
        const windowId = dockButton.dataset["dockId"];
        if (typeof windowId !== 'string') {
          return;
        }

        const windowElement = this.#root.querySelector<HTMLElement>(`[data-window-id="${windowId}"]`);
        windowElement?.classList.remove('is-minimized');
      });
    }
  }

  #wireMobileInteractions(): void {
    const appPanel = this.#root.querySelector<HTMLElement>('[data-testid="mobile-active-app"]');
    if (!(appPanel instanceof HTMLElement)) {
      return;
    }

    for (const launchButton of this.#root.querySelectorAll<HTMLButtonElement>('[data-launch-app]')) {
      launchButton.addEventListener('click', () => {
        const appId = launchButton.dataset["launchApp"];
        const app = this.#session.windows.find((entry) => entry.id === appId);
        if (app === undefined) {
          return;
        }

        appPanel.classList.remove('is-hidden');
        appPanel.querySelector('.mobile-shell__app-body')?.replaceChildren();
        appPanel.querySelector('.mobile-shell__app-body')?.insertAdjacentHTML('afterbegin', app.content);
        const title = appPanel.querySelector('.mobile-shell__app-header strong');
        if (title instanceof HTMLElement) {
          title.textContent = app.title;
        }
      });
    }

    const closeButton = this.#root.querySelector<HTMLButtonElement>('[data-mobile-close]');
    closeButton?.addEventListener('click', () => {
      appPanel.classList.add('is-hidden');
    });
  }
}
