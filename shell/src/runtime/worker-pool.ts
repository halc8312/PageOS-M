export interface WorkerDescriptor {
  id: string;
  status: 'idle' | 'reserved';
}

export class WorkerPool {
  #workers: WorkerDescriptor[] = [];

  reserve(id: string): WorkerDescriptor {
    const descriptor: WorkerDescriptor = { id, status: 'reserved' };
    this.#workers.push(descriptor);
    return descriptor;
  }

  list(): readonly WorkerDescriptor[] {
    return this.#workers;
  }
}
