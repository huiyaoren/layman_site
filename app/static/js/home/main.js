class HomeView extends View {
}

layui.use(['element']);

let home = new HomeView();

HomeView.prototype.getWeather = getWeather.bind(home);
HomeView.prototype.getDay = getDay.bind(home);
HomeView.prototype.getTime = getTime.bind(home);
// HomeView.prototype.getBitcoin = getBitcoin.bind(home);
HomeView.prototype.getGold = getGold.bind(home);
HomeView.prototype.getDollar = getDollar.bind(home);
HomeView.prototype.getblockMarket = getblockMarket.bind(home);
HomeView.prototype.getMyBalance = getMyBalance.bind(home);

home.getDay();
home.getTime();
home.getGold();
// home.getBitcoin();
home.getWeather();
home.getMyBalance();

setInterval(home.getDay, 10 * 1000);
setInterval(home.getTime, 10 * 1000);
setInterval(home.getWeather, 60 * 1000);
setInterval(home.getGold, 100 * 1000);
// setInterval(home.getBitcoin, 80 * 1000);