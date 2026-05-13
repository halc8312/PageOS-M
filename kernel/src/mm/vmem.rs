#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct VirtualMemoryDescriptor {
    pub pages: u32,
    pub shared_pages: u32,
}

impl VirtualMemoryDescriptor {
    #[must_use]
    pub const fn new(pages: u32, shared_pages: u32) -> Self {
        Self { pages, shared_pages }
    }
}
