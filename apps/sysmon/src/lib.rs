#![cfg_attr(all(target_arch = "wasm32", not(test)), no_std)]
#![deny(clippy::all, clippy::pedantic)]

#[unsafe(no_mangle)]
pub extern "C" fn app_entry() -> u32 {
    u32::from(pageos_runtime::log_write_code())
}

#[cfg(all(target_arch = "wasm32", not(test)))]
#[panic_handler]
fn panic(_info: &core::panic::PanicInfo<'_>) -> ! {
    loop {
        core::hint::spin_loop();
    }
}
