use pageos_abi::MessageHeader;

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct KernelMessage {
    pub header: MessageHeader,
}

impl KernelMessage {
    #[must_use]
    pub const fn new(header: MessageHeader) -> Self {
        Self { header }
    }
}
