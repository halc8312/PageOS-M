use super::pcb::ProcessControlBlock;

#[derive(Debug)]
pub struct ProcessTable<const N: usize> {
    entries: [ProcessControlBlock; N],
}

impl<const N: usize> ProcessTable<N> {
    #[must_use]
    pub const fn new(entries: [ProcessControlBlock; N]) -> Self {
        Self { entries }
    }

    #[must_use]
    pub const fn len(&self) -> usize {
        N
    }

    #[must_use]
    pub fn get(&self, index: usize) -> Option<ProcessControlBlock> {
        self.entries.get(index).copied()
    }
}

#[cfg(test)]
mod tests {
    use super::ProcessTable;
    use crate::process::pcb::ProcessControlBlock;
    use pageos_abi::ProcessState;

    #[test]
    fn table_returns_entries() {
        let table = ProcessTable::new([ProcessControlBlock::new(1, ProcessState::Ready, 1)]);
        assert_eq!(table.get(0).map(|entry| entry.pid), Some(1));
    }
}
