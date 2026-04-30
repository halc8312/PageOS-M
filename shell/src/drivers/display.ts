export interface DisplayCapability {
  viewportWidth: number;
  viewportHeight: number;
  devicePixelRatio: number;
}

export function initializeDisplayDriver(): DisplayCapability {
  const capability = {
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio,
  };

  document.documentElement.style.setProperty('--pageos-vh', `${capability.viewportHeight}px`);
  return capability;
}
