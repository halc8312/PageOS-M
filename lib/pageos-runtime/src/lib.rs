#![no_std]

use pageos_abi::{ErrorCode, MessageHeader, SyscallNumber};

pub type SyscallReturn = u32;

#[must_use]
pub const fn pack_result(code: ErrorCode, value: u16) -> SyscallReturn {
    ((code as u32) << 16) | value as u32
}

#[must_use]
pub const fn build_message(source: u32, destination: u32, kind: u16, length: u16) -> MessageHeader {
    MessageHeader::new(source, destination, kind, length)
}

#[must_use]
pub const fn log_write_code() -> u16 {
    SyscallNumber::LogWrite.as_u16()
}

#[cfg(test)]
mod tests {
    use super::{build_message, log_write_code, pack_result};
    use pageos_abi::ErrorCode;

    #[test]
    fn pack_result_encodes_error_and_value() {
        assert_eq!(pack_result(ErrorCode::Unsupported, 9), 0x0001_0009);
    }

    #[test]
    fn message_builder_matches_fields() {
        let header = build_message(1, 2, 3, 4);
        assert_eq!(header.kind, 3);
    }

    #[test]
    fn syscall_constant_passthrough() {
        assert_eq!(log_write_code(), 0x0001);
    }
}
