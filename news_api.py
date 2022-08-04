from pygooglenews import GoogleNews

class NewsParser:
    def __init__(self, lang, country):
        self.lang = lang
        self.country = country

    def _get_gn_object(self):
        gn = GoogleNews(lang = self.lang, country = self.country)
        return gn

    def top_news(self):
        gn = self._get_gn_object()
        top_n = gn.top_news()
        return [entry.title for entry in top_n['entries']]


    def geo_news_headlines(self, city):
        gn = self._get_gn_object()
        top_geo_news = gn.geo_headlines(city)
        return [entry.title for entry in top_geo_news['entries']]



np = NewsParser('bn', 'BD')

print(np.top_news())
# print(np.geo_news_headlines('Dhaka'))