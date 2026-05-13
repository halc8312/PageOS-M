#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct Port {
    pub id: u32,
}

impl Port {
    #[must_use]
    pub const fn new(id: u32) -> Self {
        Self { id }
    }
}
