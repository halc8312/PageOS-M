#![cfg_attr(all(target_arch = "wasm32", not(test)), no_std)]
#![deny(clippy::all, clippy::pedantic)]

use pageos_abi::{WindowManifest, WindowRect};

#[unsafe(no_mangle)]
pub extern "C" fn server_init() -> u32 {
    0
}

#[must_use]
pub const fn manifest() -> WindowManifest {
    WindowManifest {
        id: 1,
        rect: WindowRect {
            x: 72,
            y: 96,
            width: 420,
            height: 280,
        },
        flags: 0,
    }
}

#[cfg(all(target_arch = "wasm32", not(test)))]
#[panic_handler]
fn panic(_info: &core::panic::PanicInfo<'_>) -> ! {
    loop {
        core::hint::spin_loop();
    }
}
