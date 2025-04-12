# LaymanSite - 全栈数据可视化与游戏平台

![项目截图](./doc/20180607135046.png)

## 项目概述

LaymanSite 是一个基于 Flask 后端和 React 前端的全栈 Web 应用，最初设计用于在树莓派上运行并在 iPad 上展示各类实时数据，现已发展为包含数据可视化和游戏功能的综合平台。

**核心功能：**
- 实时数据展示（天气、金融、区块链等）
- 互动游戏模块
- 可扩展的模块化架构

**运行环境：**
- 开发环境：Raspberry Pi 3 + iPad 2
- 支持环境：Linux/Windows 服务器 + 现代浏览器

## 技术栈

### 后端
- **框架**: Flask (Python)
- **Web服务器**: uWSGI + Nginx (通过 supervisor 管理)
- **数据库**: (根据配置文件推测为SQLite或MySQL)
- **API**: RESTful 设计

### 前端
- **主界面**: React.js (web/src)
- **游戏界面**: 原生JavaScript (app/static/js/game)
- **UI库**: LayUI (app/static/layui)
- **图表**: QRCode.js (二维码生成)

### 部署工具
- Shell脚本 (deploy.sh)
- Windows批处理 (deploy.bat)
- uWSGI配置 (uwsgi.ini)
- Supervisor配置 (supervisor.conf)

## 功能模块

### 数据展示模块
1. **日期时间** - 实时显示
2. **天气预报** 
   - 实时天气（中国气象局）
   - 未来三天短时预报
3. **金融数据**
   - 黄金中间价（中国银行）
   - 区块链货币价格
4. **内容聚合**
   - 知乎日报精选

### 游戏模块
- 基于Canvas的互动游戏
- 包含多个游戏场景（标题、主游戏、结束）
- 物理引擎实现球拍和方块互动

### 管理功能
- 用户认证系统 (app/auth)
- 数据解析器 (app/parsers)
- 配置管理系统 (config/)

## 安装与部署

### 开发环境
```bash
# 安装依赖
pip install -r requirements.txt
cd web && npm install

# 运行开发服务器
python run.py  # 后端
cd web && npm start  # 前端
```

### 生产部署
```bash
# 使用部署脚本
./deploy.sh  # Linux
deploy.bat   # Windows

# 或手动部署
uwsgi --ini uwsgi.ini
supervisord -c supervisor.conf
```

## 项目结构

```
layman_site/
├── app/                # Flask应用核心
│   ├── static/         # 静态资源
│   ├── templates/      # 模板文件
│   ├── auth/           # 认证模块
│   └── parsers/        # 数据解析器
├── config/             # 配置文件
├── web/                # React前端
├── doc/                # 文档资源
└── *.py                # 入口和管理脚本
```

## 路线图

- [ ] 新增数据源：Lativ限时特惠
- [ ] 关键字搜索热度展示
- [ ] 什么值得买内容集成
- [ ] 模块化UI主题系统
- [ ] 数据单元开关控制
