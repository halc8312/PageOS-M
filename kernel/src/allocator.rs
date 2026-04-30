use core::ptr::addr_of_mut;
use core::sync::atomic::{AtomicBool, Ordering};
use linked_list_allocator::LockedHeap;

const HEAP_SIZE: usize = 64 * 1024;

#[global_allocator]
static ALLOCATOR: LockedHeap = LockedHeap::empty();
static INITIALIZED: AtomicBool = AtomicBool::new(false);
static mut HEAP: [u8; HEAP_SIZE] = [0; HEAP_SIZE];

pub fn init() {
    if !INITIALIZED.swap(true, Ordering::SeqCst) {
        unsafe {
            ALLOCATOR
                .lock()
                .init(addr_of_mut!(HEAP) as *mut u8, HEAP_SIZE);
        }
    }
}
