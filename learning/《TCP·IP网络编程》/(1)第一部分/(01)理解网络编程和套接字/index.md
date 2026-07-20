# 开始网络编程

## 基础知识
大端字节序：某些老式服务器 CPU、路由器芯片。
<br/>
小端字节序：大多数个人电脑的 CPU（如 Intel、AMD、ARM）。
<br/>
网络字节序：网线上传输的多字节整数，一律采用“大端字节序”
<br/>

```bash
# 将主机字节序转换为网络字节序
uint32_t htonl(uint32_t hostlong);
uint16_t htons(uint16_t hostshort);

# 将网络字节序转换为主机字节序
uint32_t ntohl(uint32_t netlong);
uint16_t ntohs(uint16_t netshort);
```


```bash
# 结构体：存储套接字地址信息
struct sockaddr_in {

	# 协议： AF_INET
	sa_family_t     sin_family;
	
	# 端口： Port number （网络字节序）
	in_port_t       sin_port;
	
	# 地址： IPv4 address（网络字节序）
	struct in_addr  sin_addr;
};
```

## Linux

```bash
# 临时解决：允许 GDB 调试器接管并调试系统进程（解决远程调试报 127 错误）。
sudo sysctl -w kernel.yama.ptrace_scope=0
```

::: details Linux 服务器端
```bash
#include <stdio.h>
#include <netinet/in.h>
#include <stdlib.h>
#include <unistd.h>
void error_handling(char* message);

int main(int argc, char* argv[])
{
	int serv_sock = 0;
	int clnt_sock = 0;

	struct sockaddr_in serv_addr = { 0 };
	struct sockaddr_in clnt_addr = { 0 };
	socklen_t clnt_addr_size = 0;

	char message[] = "Hello World";

	// 判断参数是否传入
	if (argc != 2)
	{
		printf("Usage : %s <port>\n", argv[0]);
		exit(1);
	}

	// 创建套接字
	serv_sock = socket(AF_INET, SOCK_STREAM, 0);
	if (serv_sock == -1)
	{
		error_handling("socket() err");
	}

	// 设置网络协议族
	serv_addr.sin_family = AF_INET;
	serv_addr.sin_port = htons((uint16_t)atoi(argv[1]));
	serv_addr.sin_addr.s_addr = htonl(INADDR_ANY);

	// 绑定网络地址和端口
	if (bind(serv_sock, (struct sockaddr*)&serv_addr, sizeof(serv_addr)) == -1)
	{
		error_handling("bind() err");
	}

	// 开始监听
	if (listen(serv_sock, 5) == -1)
	{
		error_handling("listen() err");
	}

	// 等待客户端连接
	clnt_addr_size = sizeof(clnt_addr);
	clnt_sock = accept(serv_sock, (struct sockaddr*)&clnt_addr, &clnt_addr_size);
	if (clnt_sock == -1)
	{
		error_handling("accept() err");
	}

	// 发送数据
	write(clnt_sock, message, sizeof(message));
	printf("数据发送完毕\n");

	close(clnt_sock);
	close(serv_sock);

	return 0;
}

void error_handling(char* message)
{
	fprintf(stderr, "%s\n", message);
	exit(1);
}
```
:::

::: details Linux 客户端
```bash
#include <netinet/in.h>
#include <stdio.h>
#include <stdlib.h>
#include <arpa/inet.h>
#include <unistd.h>
void error_handling(char* message);

int main(int argc, char* argv[])
{
	int sock = 0;
	struct sockaddr_in serv_addr = { 0 };
	char message[30] = { 0 };
	ssize_t str_len = 0;

	// 判断参数是否传入
	if (argc != 3)
	{
		printf("Usage : %s <IP> <port>\n", argv[0]);
		exit(1);
	}

	// 创建套接字
	sock = socket(AF_INET, SOCK_STREAM, 0);
	if (sock == -1)
	{
		error_handling("socket() err");
	}

	// 设置网络协议族
	serv_addr.sin_family = AF_INET;
	serv_addr.sin_port = htons((uint16_t)atoi(argv[2]));
	if (inet_pton(AF_INET, argv[1], &serv_addr.sin_addr) != 1)
	{
		error_handling("inet_pton() err");
	}

	// 连接服务器
	if (connect(sock, (struct sockaddr*)&serv_addr, sizeof(serv_addr)) == -1)
	{
		error_handling("connect() err");
	}

	// 接收数据
	str_len = read(sock, message, sizeof(message) - 1);
	if (str_len == -1)
	{
		error_handling("read() err");
	}

	printf("Message form server : %s \n", message);

	close(sock);
	return 0;
}

void error_handling(char* message)
{
	fprintf(stderr, "%s\n", message);
	exit(1);
}
```
:::

## Windows

::: details Windows 服务器端
```bash
#include <winsock2.h>
#include <stdio.h>
#pragma comment(lib,"ws2_32.lib")
void ErrorHandling(char* message);

int main(int argc, char* argv[])
{
	WSADATA wsaData = { 0 };
	SOCKET hServSock = INVALID_SOCKET;
	SOCKET hClntSock = INVALID_SOCKET;
	SOCKADDR_IN servAddr = { 0 };
	SOCKADDR_IN clntAddr = { 0 };
	int szClntAddr = 0;
	char message[] = "Hello World";

	// 判断参数是否传入
	if (argc != 2)
	{
		printf("Usage: %s <port>\n", argv[0]);
		exit(1);
	}

	// 初始化网络环境
	if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0)
	{
		ErrorHandling("WSAStartup() err");
	}

	// 创建套接字
	hServSock = socket(AF_INET, SOCK_STREAM, 0);
	if (hServSock == INVALID_SOCKET)
	{
		ErrorHandling("socket() err");
	}

	// 设置网络协议族
	servAddr.sin_family = AF_INET;
	servAddr.sin_port = htons((u_short)atoi(argv[1]));
	servAddr.sin_addr.s_addr = htonl(INADDR_ANY);

	// 绑定网络地址和端口
	if (bind(hServSock, (SOCKADDR*)&servAddr, sizeof(servAddr)) == SOCKET_ERROR)
	{
		ErrorHandling("bind() err");
	}

	// 开始监听
	if (listen(hServSock, 5) == SOCKET_ERROR)
	{
		ErrorHandling("listen() err");
	}

	// 等待客户端连接
	szClntAddr = sizeof(clntAddr);
	hClntSock = accept(hServSock, (SOCKADDR*)&clntAddr, &szClntAddr);
	if (hClntSock == INVALID_SOCKET)
	{
		ErrorHandling("accept() err");
	}

	// 发送数据
	send(hClntSock, message, sizeof(message), 0);
	printf("数据发送完毕\n");

	closesocket(hClntSock);
	closesocket(hServSock);

	// 注销网络环境
	WSACleanup();

	system("pause");
	return 0;
}

void ErrorHandling(char* message)
{
	fprintf(stderr, "%s \n", message);
	exit(1);
}
```
:::

::: details Windows 客户端
```bash
#include <winsock2.h>
#include <stdio.h>
#include <ws2tcpip.h>
#pragma comment(lib,"ws2_32.lib")

void ErrorHandling(char* message);

int main(int argc, char* argv[])
{
	WSADATA wsaData = { 0 };
	SOCKET hSocket = INVALID_SOCKET;
	SOCKADDR_IN servAddr = { 0 };
	char message[30] = { 0 };
	int strlen = 0;

	// 判断参数是否传入
	if (argc != 3)
	{
		printf("Usage : %s <IP> <port>\n", argv[0]);
		exit(1);
	}

	// 初始化网络环境
	if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0)
	{
		ErrorHandling("WSAStartup() err");
	}

	// 创建套接字
	hSocket = socket(AF_INET, SOCK_STREAM, 0);
	if (hSocket == INVALID_SOCKET)
	{
		ErrorHandling("socket() err");
	}


	// 设置网络协议族
	servAddr.sin_family = AF_INET;
	servAddr.sin_port = htons((u_short)atoi(argv[2]));
	inet_pton(AF_INET, argv[1], &servAddr.sin_addr);

	// 连接服务器
	if (connect(hSocket, (struct sockaddr*)&servAddr, sizeof(servAddr)) == SOCKET_ERROR)
	{
		ErrorHandling("connect() err");
	}

	// 接收数据
	strlen = recv(hSocket, message, sizeof(message) - 1, 0);
	if (strlen == SOCKET_ERROR)
	{
		ErrorHandling("recv() err");
	}

	printf("%s \n", message);
	closesocket(hSocket);
	WSACleanup();
	system("pause");
	return 0;
}

void ErrorHandling(char* message)
{
	fprintf(stderr, "%s \n", message);
	exit(1);
}
```
:::
