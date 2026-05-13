#![no_std]

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
#[repr(u8)]
pub enum NodeKind {
    File = 0,
    Directory = 1,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
#[repr(C)]
pub struct Metadata {
    pub inode: u64,
    pub size: u64,
    pub kind: NodeKind,
    pub reserved: [u8; 7],
}

impl Metadata {
    #[must_use]
    pub const fn directory(inode: u64) -> Self {
        Self {
            inode,
            size: 0,
            kind: NodeKind::Directory,
            reserved: [0; 7],
        }
    }
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
#[repr(C)]
pub struct DirEntry {
    pub inode: u64,
    pub kind: NodeKind,
    pub name_len: u8,
    pub reserved: [u8; 6],
}

#[cfg(test)]
mod tests {
    use super::{Metadata, NodeKind};

    #[test]
    fn directory_helper_marks_kind() {
        let metadata = Metadata::directory(7);
        assert_eq!(metadata.kind, NodeKind::Directory);
    }
}
