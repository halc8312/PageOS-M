export async function playKernelLog(root: HTMLElement, lines: readonly string[]): Promise<void> {
  root.innerHTML = `
    <section class="boot-stage boot-stage--terminal crt-overlay" aria-live="polite" aria-label="Kernel boot log">
      <div class="boot-terminal__chrome">
        <span>kernel://boot</span>
        <span>TTY0</span>
      </div>
      <pre class="boot-terminal__log" data-testid="boot-log"></pre>
    </section>
  `;

  const logElement = root.querySelector<HTMLElement>('[data-testid="boot-log"]');
  if (!(logElement instanceof HTMLElement)) {
    throw new Error('Missing boot log element.');
  }

  for (const line of lines) {
    await typeLine(logElement, line);
    logElement.append('\n');
    await wait(140);
  }
}

async function typeLine(target: HTMLElement, line: string): Promise<void> {
  for (const character of line) {
    target.append(character);
    await wait(8);
  }
}

function wait(duration: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
}
