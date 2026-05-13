#[derive(Debug, Default)]
pub struct RoundRobinScheduler {
    cursor: usize,
}

impl RoundRobinScheduler {
    #[must_use]
    pub const fn new() -> Self {
        Self { cursor: 0 }
    }

    #[must_use]
    pub fn next(&mut self, process_count: usize) -> usize {
        if process_count == 0 {
            return 0;
        }
        let current = self.cursor % process_count;
        self.cursor = (self.cursor + 1) % process_count;
        current
    }
}

#[cfg(test)]
mod tests {
    use super::RoundRobinScheduler;

    #[test]
    fn scheduler_cycles() {
        let mut scheduler = RoundRobinScheduler::new();
        assert_eq!(scheduler.next(3), 0);
        assert_eq!(scheduler.next(3), 1);
        assert_eq!(scheduler.next(3), 2);
        assert_eq!(scheduler.next(3), 0);
    }
}
