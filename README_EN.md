# LaymanSite - Full-stack Data Visualization & Gaming Platform

## Overview

LaymanSite is a full-stack web application built with Flask backend and React frontend, originally designed to run on Raspberry Pi and display real-time data on iPad, now evolved into a comprehensive platform with data visualization and gaming capabilities.

**Core Features:**
- Real-time data display (weather, finance, blockchain etc.)
- Interactive game module
- Extensible modular architecture

**Environment:**
- Dev Environment: Raspberry Pi 3 + iPad 2
- Supported: Linux/Windows servers + modern browsers

## Tech Stack

### Backend
- **Framework**: Flask (Python)
- **Web Server**: uWSGI + Nginx (managed by supervisor)
- **Database**: SQLite/MySQL (based on config)
- **API**: RESTful design

### Frontend
- **Main UI**: React.js (web/src)
- **Game UI**: Vanilla JavaScript (app/static/js/game)
- **UI Library**: LayUI (app/static/layui)
- **Charts**: QRCode.js

### Deployment
- Shell scripts (deploy.sh)
- Windows batch (deploy.bat)
- uWSGI config (uwsgi.ini)
- Supervisor config (supervisor.conf)

## Modules

### Data Display
1. **Date & Time** - Real-time display
2. **Weather**
   - Current weather (China Meteorological Administration)
   - 3-day forecast
3. **Financial Data**
   - Gold price (Bank of China)
   - Blockchain currency prices
4. **Content**
   - Zhihu Daily selections

### Game Module
- Canvas-based interactive game
- Multiple scenes (title, main game, end)
- Physics engine for paddle and block interaction

### Admin Features
- Auth system (app/auth)
- Data parsers (app/parsers)
- Config management (config/)

## Installation

### Development
```bash
# Install dependencies
pip install -r requirements.txt
cd web && npm install

# Run dev servers
python run.py  # backend
cd web && npm start  # frontend
```

### Production
```bash
# Use deployment scripts
./deploy.sh  # Linux
deploy.bat   # Windows

# Or manual deployment
uwsgi --ini uwsgi.ini
supervisord -c supervisor.conf
```

## Roadmap

- [ ] New data: Lativ special offers
- [ ] Search trend visualization
- [ ] SMZDM content integration
- [ ] Modular UI theme system
- [ ] Data unit toggle control
