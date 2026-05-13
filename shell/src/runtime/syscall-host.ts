export interface SyscallHostResult {
  code: number;
  value: number;
}

export function invokeHostSyscall(number: number): SyscallHostResult {
  return {
    code: 0,
    value: number,
  };
}
