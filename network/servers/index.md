# 服务器搭建

## **更新软件列表**

```bash
sudo apt update && sudo apt upgrade -y
```


## **申请证书**

1. 在 Cloudflare 中创建一个 token 令牌：
 - 权限：
   - DNS 读取
   - DNS 写入


2. 安装 certbot
```bash
apt install certbot python3-certbot-dns-cloudflare

# 创建一个文件 /etc/letsencrypt/cloudflare.ini , 写入：
dns_cloudflare_api_token = 你的CF_API_TOKEN
```


3. 设置 cloudflare.ini 文件权限：
```bash
chmod 600 /etc/letsencrypt/cloudflare.ini
```


4. 修改命令中的域名，开始申请证书并等待自动完成：
```bash
certbot certonly --dns-cloudflare --dns-cloudflare-credentials /etc/letsencrypt/cloudflare.ini -d example.com -d "*.example.com"
```


## **部署 Nginx**

1. 安装 Nginx:
```bash
apt install nginx -y
```


2. 将准备好的 Nginx 配置文件放入 Nginx 目录下:
```bash
cp /root/default /etc/nginx/sites-available/default
nginx -t
nginx -s reload
```
::: tip # 配置文件：
```bash
server {
	listen 80;
	listen [::]:80;
	server_name xx.example.com yy.example.com;

	return 301 https://$host:8443$request_uri;
}

server {
	listen 8443 ssl;
	listen [::]:8443 ssl;
	server_name xx.example.com;

	ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
	ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
	
	location / {
		return 301 https://$host:8443/BasePath/;
	}
	
	location /BasePath/ {
		proxy_pass http://127.0.0.1:8192/BasePath/;
		
		proxy_set_header Host $http_host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;

		# WebSocket 支持
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "upgrade";
	}
}

server {
	listen 8443 ssl;
	listen [::]:8443 ssl;
	server_name yy.example.com;

	ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
	ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

	location / {
		proxy_pass http://127.0.0.1:8193/;
		
		proxy_set_header Host $http_host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;

		# WebSocket 支持
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "upgrade";
	}
}
```
:::


## **部署 Komari**

```bash
curl -fsSL https://raw.githubusercontent.com/komari-monitor/komari/main/install-komari.sh -o install-komari.sh
chmod +x install-komari.sh
sudo ./install-komari.sh
```


## **部署 3x-ui**

```bash
bash <(curl -Ls https://raw.githubusercontent.com/mhsanaei/3x-ui/master/install.sh)
```


## **配置 domain**

1. RealiTLScanner
> 目标网站扫描工具 [Github](https://github.com/XTLS/RealiTLScanner/releases)

```bash
RealiTLScanner-windows-64 -addr VPS -port 443 -thread 20 -timeout 5 -out file.csv
```

2. RealityChecker
> 目标网站检查工具 [Github](https://github.com/V2RaySSR/RealityChecker/releases)

```bash
unzip reality-checker-linux-amd64.zip
chmod +x reality-checker
./reality-checker csv file.csv
```
