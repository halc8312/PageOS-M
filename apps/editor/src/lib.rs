#![cfg_attr(not(test), no_std)]
#![deny(clippy::all, clippy::pedantic)]

#[unsafe(no_mangle)]
pub extern "C" fn app_entry() -> u32 {
    pageos_runtime::log_write_code() as u32
}
