export interface InputCapability {
  pointer: boolean;
  touch: boolean;
  keyboard: boolean;
}

export function initializeInputDriver(): InputCapability {
  return {
    pointer: 'PointerEvent' in window,
    touch: navigator.maxTouchPoints > 0,
    keyboard: true,
  };
}
