#![cfg_attr(all(target_arch = "wasm32", not(test)), no_std)]
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

#[cfg(all(target_arch = "wasm32", not(test)))]
#[panic_handler]
fn panic(_info: &core::panic::PanicInfo<'_>) -> ! {
    loop {
        core::hint::spin_loop();
    }
}
