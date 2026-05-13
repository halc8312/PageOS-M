export interface AppWindow {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  accent: 'amber' | 'green';
}

export function renderWindow(windowState: AppWindow): string {
  return `
    <article
      class="pageos-window pageos-window--${windowState.accent}"
      data-window-id="${windowState.id}"
      style="left:${windowState.x}px;top:${windowState.y}px;width:${windowState.width}px;height:${windowState.height}px"
    >
      <header class="pageos-window__header" data-drag-handle>
        <div>
          <h2>${windowState.title}</h2>
          <p>${windowState.subtitle}</p>
        </div>
        <button type="button" class="pageos-window__close" aria-label="Close ${windowState.title}">×</button>
      </header>
      <div class="pageos-window__body">${windowState.content}</div>
    </article>
  `;
}

export function enableWindowDragging(root: HTMLElement): void {
  let activeWindow: HTMLElement | null = null;
  let offsetX = 0;
  let offsetY = 0;

  root.addEventListener('pointerdown', (event) => {
    const handle = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-drag-handle]');
    const windowElement = handle?.closest<HTMLElement>('[data-window-id]') ?? null;
    if (windowElement === null) {
      return;
    }

    activeWindow = windowElement;
    const bounds = windowElement.getBoundingClientRect();
    offsetX = event.clientX - bounds.left;
    offsetY = event.clientY - bounds.top;
    windowElement.setPointerCapture(event.pointerId);
  });

  root.addEventListener('pointermove', (event) => {
    if (activeWindow === null) {
      return;
    }

    activeWindow.style.left = `${Math.max(16, event.clientX - offsetX)}px`;
    activeWindow.style.top = `${Math.max(16, event.clientY - offsetY)}px`;
  });

  root.addEventListener('pointerup', (event) => {
    if (activeWindow === null) {
      return;
    }

    activeWindow.releasePointerCapture(event.pointerId);
    activeWindow = null;
  });
}
