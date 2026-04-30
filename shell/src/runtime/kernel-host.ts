import { sendServiceWorkerCommand } from './ipc-bridge';

export interface BootReport {
  logs: string[];
  tickCount: number;
}

export class KernelHost {
  private registrationPromise: Promise<ServiceWorkerRegistration> | null = null;

  async boot(): Promise<BootReport> {
    const registration = await this.getRegistration();
    return sendServiceWorkerCommand<undefined, BootReport>(registration, 'PAGEOS_BOOT', undefined);
  }

  async tick(): Promise<number> {
    const registration = await this.getRegistration();
    const response = await sendServiceWorkerCommand<undefined, { tick: number }>(registration, 'PAGEOS_TICK', undefined);
    return response.tick;
  }

  private async getRegistration(): Promise<ServiceWorkerRegistration> {
    if (!('serviceWorker' in navigator)) {
      throw new Error('Service workers are not supported in this browser.');
    }

    if (this.registrationPromise === null) {
      this.registrationPromise = this.register();
    }

    return this.registrationPromise;
  }

  private async register(): Promise<ServiceWorkerRegistration> {
    const workerUrl = new URL('./kernel-sw.js', window.location.href);
    const registration = await navigator.serviceWorker.register(workerUrl);
    await navigator.serviceWorker.ready;
    return registration;
  }
}
