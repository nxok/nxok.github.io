# 开始网络编程

## Linux
```bash
#include <sys/socket.h>

// 成功时返回套接字描述符,失败时返回-1。
int socket(int domain, int type, int protocol);
```

## Windows
```bash
#include <winsock2.h>
#pragma comment(lib,"ws2_32.lib")

// 成功时返回套接字句柄,失败时返回 INVALID_SOCKET。
SOCKET socket(int domain, int type, int protocol);
```

## 参数
<pre>
domain          套接字中使用的协议族( Protocol Family ) 信息。
type            套接字数据传输类型信息。
protocol        计算机间通信中使用的协议信息。
</pre>

## 协议族(Protocol Family)
<pre>
PF_INET         IPv4 互联网协议族
PF_INET6        IPv6 互联网协议族
PF_LOCAL        本地通信的UNIX协议族
PF_PACKET       底层套接字的协议族
PF_IPX          IPX Novell协议族
</pre>

## 套接字类型(Type)
<pre>
SOCK_STREAM     流式套接字(面向连接的套接字)
    * 传输过程中数据不会消失。
    * 按序传输数据。
    * 传输的数据不存在数据边界(Boundary)。

SOCK_DGRAM      数据报套接字(无连接的套接字)
    * 强调快速传输而非传输顺序。
    * 传输的数据可能丢失也可能损毁。
    * 传输的数据存在数据边界(Boundary)。
    * 传输的数据大小有限制。
</pre>

## 协议信息（protocol）

```bash
// IPv4协议族中面向连接的套接字
int tcp_socket = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);

// IPv4协议族中面向消息的套接字”
int tcp_socket = socket(PF_INET, SOCK_DGRAM, IPPROTO_UDP);
```
