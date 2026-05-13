export const DESKTOP_BREAKPOINT = 768;

export type ShellMode = 'desktop' | 'mobile';

export function getShellMode(width: number): ShellMode {
  return width >= DESKTOP_BREAKPOINT ? 'desktop' : 'mobile';
}
