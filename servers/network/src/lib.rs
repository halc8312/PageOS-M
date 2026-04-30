#![cfg_attr(not(test), no_std)]
#![deny(clippy::all, clippy::pedantic)]

#[unsafe(no_mangle)]
pub extern "C" fn server_init() -> u32 {
    0
}
