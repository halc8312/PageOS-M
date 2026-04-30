use pageos_abi::{ProcessSnapshot, ProcessState};

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct ProcessControlBlock {
    pub pid: u32,
    pub state: ProcessState,
    pub priority: u8,
}

impl ProcessControlBlock {
    #[must_use]
    pub const fn new(pid: u32, state: ProcessState, priority: u8) -> Self {
        Self { pid, state, priority }
    }

    #[must_use]
    pub const fn snapshot(self) -> ProcessSnapshot {
        ProcessSnapshot::new(self.pid, self.state, self.priority)
    }
}
