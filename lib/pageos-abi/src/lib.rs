#![no_std]

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
#[repr(u16)]
pub enum SyscallNumber {
    LogWrite = 0x0001,
    PortOpen = 0x0002,
    PortSend = 0x0003,
    PortReceive = 0x0004,
    WindowPublish = 0x0100,
    FsOpen = 0x0200,
    FsRead = 0x0201,
    FsWrite = 0x0202,
    TimeNow = 0x0300,
}

impl SyscallNumber {
    #[must_use]
    pub const fn as_u16(self) -> u16 {
        self as u16
    }
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
#[repr(u16)]
pub enum ErrorCode {
    Ok = 0,
    Unsupported = 1,
    InvalidArgument = 2,
    NotFound = 3,
    Busy = 4,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
#[repr(u8)]
pub enum ProcessState {
    Ready = 0,
    Running = 1,
    Blocked = 2,
    Idle = 3,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
#[repr(C)]
pub struct MessageHeader {
    pub source: u32,
    pub destination: u32,
    pub kind: u16,
    pub length: u16,
}

impl MessageHeader {
    #[must_use]
    pub const fn new(source: u32, destination: u32, kind: u16, length: u16) -> Self {
        Self {
            source,
            destination,
            kind,
            length,
        }
    }
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
#[repr(C)]
pub struct ProcessSnapshot {
    pub pid: u32,
    pub state: ProcessState,
    pub priority: u8,
    pub reserved: [u8; 3],
}

impl ProcessSnapshot {
    #[must_use]
    pub const fn new(pid: u32, state: ProcessState, priority: u8) -> Self {
        Self {
            pid,
            state,
            priority,
            reserved: [0; 3],
        }
    }
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
#[repr(C)]
pub struct WindowRect {
    pub x: i32,
    pub y: i32,
    pub width: u32,
    pub height: u32,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
#[repr(C)]
pub struct WindowManifest {
    pub id: u32,
    pub rect: WindowRect,
    pub flags: u32,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
#[repr(C)]
pub struct BootLogFrame {
    pub level: u8,
    pub reserved: [u8; 3],
    pub timestamp_millis: u32,
}

#[cfg(test)]
mod tests {
    use super::{MessageHeader, ProcessSnapshot, ProcessState, SyscallNumber};

    #[test]
    fn syscall_values_are_stable() {
        assert_eq!(SyscallNumber::WindowPublish.as_u16(), 0x0100);
    }

    #[test]
    fn process_snapshot_builds() {
        let snapshot = ProcessSnapshot::new(1, ProcessState::Ready, 7);
        assert_eq!(snapshot.pid, 1);
    }

    #[test]
    fn message_header_layout_constructor_works() {
        let header = MessageHeader::new(1, 2, 3, 4);
        assert_eq!(header.destination, 2);
    }
}
