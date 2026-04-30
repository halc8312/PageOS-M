export interface AudioCapability {
  available: boolean;
}

export function initializeAudioDriver(): AudioCapability {
  return {
    available: 'AudioContext' in window || 'webkitAudioContext' in window,
  };
}
