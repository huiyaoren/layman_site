from datetime import datetime

food_list = [
    {'brand': '', 'name': '五香黄花鱼', 'count': 1, 'expiration_data': '2021-08-16', },
    {'brand': '', 'name': '五香带鱼', 'count': 2, 'expiration_data': '2022-07-17', },
    {'brand': '北戴河', 'name': '午餐肉', 'count': 5, 'expiration_data': '2023-08-01', },
    {'brand': '', 'name': '香菇挂面', 'count': 2, 'expiration_data': '2021-03-22', },
    {'brand': 'aka', 'name': '白砂糖', 'count': 1, 'expiration_data': '2021-09-10', },
    {'brand': 'aka', 'name': '冰糖', 'count': 1, 'expiration_data': '2022-04-09', },
    {'brand': '馋味佬', 'name': '热干面', 'count': 2, 'expiration_data': '2022-02-12', },
    {'brand': '', 'name': '肉酱米线', 'count': 2, 'expiration_data': '2020-09-21', },
    {'brand': '异人家', 'name': '南昌拌粉', 'count': 1, 'expiration_data': '2021-04-28', },
    {'brand': '水之缘', 'name': '南昌拌粉', 'count': 3, 'expiration_data': '2021-02-23', },
    {'brand': '古龙', 'name': '花生汤', 'count': 5, 'expiration_data': '2023-05-27', },
    {'brand': '甘竹', 'name': '豆鼓鲮鱼', 'count': 2, 'expiration_data': '2021-11-08', },
    {'brand': '梅林', 'name': '午餐肉', 'count': 2, 'expiration_data': '2022-12-17', },
    {'brand': '蔡林记', 'name': '热干面', 'count': 2, 'expiration_data': '2022-03-14', },
    {'brand': '中粮', 'name': '黄桃', 'count': 24, 'expiration_data': '2022-04-01', },
    {'brand': '康师傅', 'name': '火鸡拌面', 'count': 10, 'expiration_data': '2020-05-26', },
    {'brand': '惠尔康', 'name': '牛奶花生', 'count': 8, 'expiration_data': '2022-10-23', },
    {'brand': '', 'name': '柳州螺蛳粉', 'count': 4, 'expiration_data': '2021-05-30', },
    {'brand': '', 'name': '可口可乐', 'count': 12, 'expiration_data': '2021-04-04', },
    {'brand': '小猪呵呵', 'name': '午餐肉', 'count': 3, 'expiration_data': '2023-11-09', },
    {'brand': '罗锦记', 'name': '热干面', 'count': 1, 'expiration_data': '2021-05-06', },
    {'brand': '高人一筹', 'name': '鲷鱼', 'count': 3, 'expiration_data': '2023-12-05', },
    {'brand': '四季宝', 'name': '颗粒花生酱', 'count': 1, 'expiration_data': '2022-02-08', },
    {'brand': '四季宝', 'name': '柔滑花生酱', 'count': 1, 'expiration_data': '2022-02-24', },
    {'brand': '惠尔康', 'name': '牛奶花生', 'count': 12, 'expiration_data': '2022-08-30', },
    {'brand': '四季宝', 'name': '柔滑花生酱', 'count': 1, 'expiration_data': '2020-04-24', },
    {'brand': '霸蛮', 'name': '猪油拌粉', 'count': 9, 'expiration_data': '2021-09-19', },
]

get_date = lambda expiration_data: datetime(*[int(i) for i in expiration_data.split('-')])

if __name__ == '__main__':
    r = sorted(food_list, key=lambda x: x['expiration_data'])
    for i in r:
        delta = get_date(i['expiration_data']) - datetime.now()
        print('{} | {} |{}{} * {}'.format(i['expiration_data'], delta.days, i['brand'], i['name'], i['count']))
