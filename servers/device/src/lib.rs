#![cfg_attr(all(target_arch = "wasm32", not(test)), no_std)]
#![deny(clippy::all, clippy::pedantic)]

#[unsafe(no_mangle)]
pub extern "C" fn server_init() -> u32 {
    0
}

#[cfg(all(target_arch = "wasm32", not(test)))]
#[panic_handler]
fn panic(_info: &core::panic::PanicInfo<'_>) -> ! {
    loop {
        core::hint::spin_loop();
    }
}
