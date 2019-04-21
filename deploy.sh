mkdir ~/Project
cd ~/Project
git clone https://github.com/huiyaoren/layman_site.git
cd ~/Project/layman_site
sudo apt-get install -y libxml2 libxslt1.1 libxml2-dev libxslt1-dev
sudo apt-get install -y python-libxml2 python-libxslt1 python-dev python-setuptools
python3 -m pip install pip --upgrade -i https://pypi.douban.com/simple
sudo python3 -m pip install -r requirements.txt -i https://pypi.douban.com/simple
python3 manage.py