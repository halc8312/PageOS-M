export async function showSplash(root: HTMLElement): Promise<void> {
  root.innerHTML = `
    <section class="boot-stage boot-stage--splash" aria-label="PageOS splash screen">
      <div class="boot-splash__logo" data-testid="pageos-logo">PageOS</div>
      <p class="boot-splash__subtitle">Browser-hosted microkernel shell</p>
    </section>
  `;

  await wait(500);
}

function wait(duration: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
}
