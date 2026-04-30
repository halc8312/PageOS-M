# System Calls

Phase 0 freezes the first syscall number block so kernel, servers, and apps share one ABI.

## Core calls

- `LogWrite`
- `PortOpen`
- `PortSend`
- `PortReceive`
- `WindowPublish`
- `FsOpen`
- `FsRead`
- `FsWrite`
- `TimeNow`

The current implementation returns placeholder results for most calls while preserving argument and result shapes.
