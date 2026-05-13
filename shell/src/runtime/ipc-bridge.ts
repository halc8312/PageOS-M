export interface ServiceWorkerRequest<TPayload> {
  type: string;
  requestId: string;
  payload: TPayload;
}

export async function sendServiceWorkerCommand<TPayload, TResponse>(
  registration: ServiceWorkerRegistration,
  type: string,
  payload: TPayload,
): Promise<TResponse> {
  const target = registration.active ?? registration.waiting ?? registration.installing;
  if (!(target instanceof ServiceWorker)) {
    throw new Error('No active service worker available.');
  }

  const request: ServiceWorkerRequest<TPayload> = {
    type,
    requestId: crypto.randomUUID(),
    payload,
  };

  return new Promise<TResponse>((resolve, reject) => {
    const channel = new MessageChannel();
    channel.port1.onmessage = ({ data }) => {
      if (typeof data !== 'object' || data === null) {
        reject(new Error('Service worker returned an invalid response.'));
        return;
      }

      if ('error' in data && typeof data.error === 'string') {
        reject(new Error(data.error));
        return;
      }

      resolve((data as { response: TResponse }).response);
    };

    target.postMessage(request, [channel.port2]);
  });
}
