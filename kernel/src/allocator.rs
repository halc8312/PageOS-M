#[cfg(target_arch = "wasm32")]
use core::ptr::addr_of_mut;
#[cfg(target_arch = "wasm32")]
use core::sync::atomic::{AtomicBool, Ordering};
#[cfg(target_arch = "wasm32")]
use linked_list_allocator::LockedHeap;

#[cfg(target_arch = "wasm32")]
const HEAP_SIZE: usize = 64 * 1024;

#[cfg(target_arch = "wasm32")]
#[global_allocator]
static ALLOCATOR: LockedHeap = LockedHeap::empty();
#[cfg(target_arch = "wasm32")]
static INITIALIZED: AtomicBool = AtomicBool::new(false);
#[cfg(target_arch = "wasm32")]
static mut HEAP: [u8; HEAP_SIZE] = [0; HEAP_SIZE];

pub fn init() {
    #[cfg(target_arch = "wasm32")]
    if !INITIALIZED.swap(true, Ordering::SeqCst) {
        unsafe {
            ALLOCATOR
                .lock()
                .init(addr_of_mut!(HEAP) as *mut u8, HEAP_SIZE);
        }
    }
}
