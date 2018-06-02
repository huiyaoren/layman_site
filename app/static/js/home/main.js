class HomeView extends View {
}

layui.use(['element']);

let home = new HomeView();

HomeView.prototype.getWeather = getWeather.bind(home);
HomeView.prototype.getDay = getDay.bind(home);
HomeView.prototype.getTime = getTime.bind(home);
HomeView.prototype.getGold = getGold.bind(home);
HomeView.prototype.getDollar = getDollar.bind(home);
HomeView.prototype.getblockMarket = getblockMarket.bind(home);
HomeView.prototype.getMyBalance = getMyBalance.bind(home);
HomeView.prototype.getFutureWeather = getFutureWeather.bind(home);
HomeView.prototype.getZhihuDaily = getZhihuDaily.bind(home);

home.getDay();
home.getWeather();
home.getTime();
home.getGold();
home.getMyBalance();
home.getFutureWeather();
home.getZhihuDaily();

setInterval(home.getDay, 10 * 1000);
setInterval(home.getTime, 10 * 1000);
setInterval(home.getWeather, 60 * 1000);
setInterval(home.getGold, 100 * 1000);
setInterval(home.getMyBalance, 120 * 1000);
setInterval(home.getFutureWeather, 600 * 1000);
setInterval(home.getZhihuDaily, 900 * 1000);
setInterval(reload, 1799 * 1000);