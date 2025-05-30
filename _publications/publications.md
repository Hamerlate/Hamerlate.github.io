---
title: "Publications"
permalink: /publications/
---

<style>
.pub-entry {
  display: flex;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px 16px;
  margin-bottom: 12px;
  align-items: center;
  font-size: 0.95em;
  line-height: 1.4;
}
.pub-venue {
  min-width: 70px;
  font-weight: bold;
  color: #fff;
  background: #444;
  border-radius: 5px;
  padding: 6px 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.pub-content {
  flex: 1;
  padding: 0 16px;
}
.pub-year {
  min-width: 60px;
  color: #888;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<div>
{% for pub in site.data.publications %}
  <div class="pub-entry">
    <div class="pub-venue">
      {{ pub.venue_short }}
    </div>
    <div class="pub-content">
      <div><strong>{{ pub.title }}</strong></div>
      <div>{{ pub.authors | markdownify }}</div>
      <div><em>{{ pub.venue_full }}</em></div>
    </div>
    <div class="pub-year">
      {{ pub.year }}
    </div>
  </div>
{% endfor %}
</div>
