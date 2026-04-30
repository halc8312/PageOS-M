#![cfg_attr(all(target_arch = "wasm32", not(test)), no_std)]
#![deny(clippy::all, clippy::pedantic)]

extern crate alloc;

pub mod allocator;
pub mod boot;
pub mod ipc;
pub mod log;
pub mod mm;
#[cfg(all(target_arch = "wasm32", not(test)))]
pub mod panic;
pub mod process;
pub mod sched;
pub mod syscall;
pub mod time;

use core::sync::atomic::{AtomicBool, AtomicU32, Ordering};
use pageos_abi::{ErrorCode, ProcessSnapshot, ProcessState};
use spin::Mutex;

static INITIALIZED: AtomicBool = AtomicBool::new(false);
static TICKS: AtomicU32 = AtomicU32::new(0);
static PROCESS_TABLE: Mutex<process::table::ProcessTable<3>> = Mutex::new(process::table::ProcessTable::new([
    process::pcb::ProcessControlBlock::new(0, ProcessState::Idle, 0),
    process::pcb::ProcessControlBlock::new(1, ProcessState::Ready, 8),
    process::pcb::ProcessControlBlock::new(2, ProcessState::Ready, 6),
]));

const BOOT_LOGS: [&str; 8] = [
    "[    0.000] PageOS v0.1.0-alpha booting...",
    "[    0.012] Detecting platform: browser-hosted wasm32",
    "[    0.027] Initializing kernel heap allocator",
    "[    0.043] Registering system servers: window, vfs, device, network",
    "[    0.061] Preparing compositor handshake channel",
    "[    0.079] Loading shell session manifest",
    "[    0.103] Scheduling init process and idle task",
    "[    0.128] Boot complete. Entering desktop session.",
];

#[unsafe(no_mangle)]
pub extern "C" fn kernel_init() -> u32 {
    if !INITIALIZED.swap(true, Ordering::SeqCst) {
        allocator::init();
        TICKS.store(0, Ordering::SeqCst);
    }
    ErrorCode::Ok as u32
}

#[unsafe(no_mangle)]
pub extern "C" fn kernel_tick() -> u32 {
    TICKS.fetch_add(1, Ordering::SeqCst) + 1
}

#[unsafe(no_mangle)]
pub extern "C" fn syscall_dispatch(number: u32, arg0: u32, arg1: u32, arg2: u32) -> u32 {
    syscall::dispatch(number, arg0, arg1, arg2)
}

#[unsafe(no_mangle)]
pub extern "C" fn boot_log_count() -> u32 {
    saturating_u32(BOOT_LOGS.len())
}

#[unsafe(no_mangle)]
pub extern "C" fn boot_log_ptr(index: u32) -> *const u8 {
    BOOT_LOGS
        .get(index as usize)
        .map_or(core::ptr::null(), |entry| entry.as_ptr())
}

#[unsafe(no_mangle)]
pub extern "C" fn boot_log_len(index: u32) -> u32 {
    BOOT_LOGS.get(index as usize).map_or(0, |entry| saturating_u32(entry.len()))
}

#[unsafe(no_mangle)]
pub extern "C" fn process_count() -> u32 {
    saturating_u32(PROCESS_TABLE.lock().len())
}

#[unsafe(no_mangle)]
pub extern "C" fn process_snapshot(index: u32) -> ProcessSnapshot {
    PROCESS_TABLE
        .lock()
        .get(index as usize)
        .map_or(ProcessSnapshot::new(0, ProcessState::Idle, 0), process::pcb::ProcessControlBlock::snapshot)
}

#[must_use]
fn saturating_u32(value: usize) -> u32 {
    u32::try_from(value).unwrap_or(u32::MAX)
}

#[cfg(test)]
mod tests {
    use super::{boot_log_count, boot_log_len, kernel_init, kernel_tick, process_count};

    #[test]
    fn init_and_tick_are_callable() {
        assert_eq!(kernel_init(), 0);
        assert_eq!(kernel_tick(), 1);
    }

    #[test]
    fn boot_logs_are_exposed() {
        assert_eq!(boot_log_count(), 8);
        assert!(boot_log_len(0) > 10);
    }

    #[test]
    fn process_table_has_entries() {
        assert_eq!(process_count(), 3);
    }
}
