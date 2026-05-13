import { showSplash } from './splash';
import { playKernelLog } from './kernel-log';
import { KernelHost } from '../runtime/kernel-host';
import { WorkerPool } from '../runtime/worker-pool';
import { invokeHostSyscall } from '../runtime/syscall-host';
import { initializeAudioDriver } from '../drivers/audio';
import { initializeDiskDriver } from '../drivers/disk-indexeddb';
import { initializeDisplayDriver } from '../drivers/display';
import { initializeInputDriver } from '../drivers/input';
import { Compositor, type ShellSession } from '../compositor/compositor';
import { getShellMode } from '../compositor/responsive';
import type { AppWindow } from '../compositor/window';

const WINDOW_MANIFEST: AppWindow[] = [
  {
    id: 'shell',
    title: 'Shell',
    subtitle: 'session://tty0',
    content: '<p>PageOS shell is ready.</p><p>Try Phase 1 to attach real process workers.</p>',
    x: 72,
    y: 108,
    width: 420,
    height: 260,
    accent: 'amber',
  },
  {
    id: 'sysmon',
    title: 'System Monitor',
    subtitle: 'kernel://scheduler',
    content: '<p>Scheduler: round-robin</p><p>Servers: window · vfs · device · network</p>',
    x: 328,
    y: 180,
    width: 360,
    height: 240,
    accent: 'green',
  },
  {
    id: 'filemgr',
    title: 'Files',
    subtitle: 'vfs://root',
    content: '<ul><li>/apps</li><li>/home</li><li>/system</li></ul>',
    x: 188,
    y: 62,
    width: 300,
    height: 220,
    accent: 'amber',
  },
];

export async function bootPageOS(root: HTMLElement): Promise<void> {
  const kernelHost = new KernelHost();
  const workerPool = new WorkerPool();
  workerPool.reserve('shell');

  await showSplash(root);

  const [disk, input, display, kernelBoot] = await Promise.all([
    initializeDiskDriver(),
    Promise.resolve(initializeInputDriver()),
    Promise.resolve(initializeDisplayDriver()),
    kernelHost.boot(),
  ]);
  const audio = initializeAudioDriver();
  invokeHostSyscall(0x0001);

  const lines = [
    ...kernelBoot.logs,
    `[    0.151] Input ready: pointer=${String(input.pointer)} touch=${String(input.touch)} keyboard=${String(input.keyboard)}`,
    `[    0.176] Display ready: ${display.viewportWidth}x${display.viewportHeight} @ ${display.devicePixelRatio.toFixed(1)}x`,
    `[    0.201] Disk ready: ${disk.backend}`,
    `[    0.224] Audio ready: ${audio.available ? 'available' : 'deferred'}`,
    `[    0.248] Worker pool reserved: ${workerPool.list().length}`,
    `[    0.272] Kernel tick counter: ${kernelBoot.tickCount}`,
    '[    0.301] Launching compositor session... ',
  ];

  await playKernelLog(root, lines);

  const session: ShellSession = {
    windows: WINDOW_MANIFEST,
    mode: getShellMode(window.innerWidth),
  };
  const compositor = new Compositor(root, session);
  compositor.render();

  window.addEventListener('resize', () => {
    compositor.updateMode(window.innerWidth);
  });
}
