pub mod numbers;

use pageos_abi::{ErrorCode, SyscallNumber};

#[must_use]
pub fn dispatch(number: u32, _arg0: u32, _arg1: u32, _arg2: u32) -> u32 {
    match number as u16 {
        value if value == SyscallNumber::LogWrite.as_u16() => ErrorCode::Ok as u32,
        value if value == SyscallNumber::TimeNow.as_u16() => 128,
        _ => ErrorCode::Unsupported as u32,
    }
}
