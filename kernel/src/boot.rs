use pageos_abi::ProcessState;

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct BootSummary {
    pub platform_ready: bool,
    pub initial_process_state: ProcessState,
}

impl BootSummary {
    #[must_use]
    pub const fn phase_zero() -> Self {
        Self {
            platform_ready: true,
            initial_process_state: ProcessState::Ready,
        }
    }
}
