use kernel::{boot_log_count, kernel_init, process_count};

#[test]
fn kernel_boot_exports_are_available() {
    assert_eq!(kernel_init(), 0);
    assert_eq!(boot_log_count(), 8);
    assert_eq!(process_count(), 3);
}
