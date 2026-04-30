#![cfg_attr(not(test), no_std)]
#![deny(clippy::all, clippy::pedantic)]

use pageos_fs::Metadata;

#[unsafe(no_mangle)]
pub extern "C" fn server_init() -> u32 {
    0
}

#[must_use]
pub const fn root_metadata() -> Metadata {
    Metadata::directory(1)
}
