---
layout: page
title: Gentle Glow
description: Adium message style with cute & unseemly JavaScript magic. It's a thing.
group: projects
permalink: ./
---
{% include JB/setup %}
{% assign gg_category = "gentleglow" %}
{% assign gg_releases = site.categories[gg_category] %}
{% assign gg_release_limit = 3 %}

<div style="float: right; margin: 0 0 1em 1em" markdown="yes">
  ![Gentle Glow Icon](gentleglow.png)
</div>

Gentle Glow is a message style for Adium that adds thumbnails and metadata for supported links, including YouTube, Imgur and other popular image and video sites. If a site has a public API or an [oEmbed endpoint][oembed], chances are Gentle Glow supports it; if not, [let me know][issues] and I'll probably add it.

There's also built-in support for [Embed.ly][embedly], but it requires an API key to be provided at compile time. Consider it experimental until I find a reasonable way to obscure my own API key.

As always, you can download the [latest version][download], or check out the [source code][source] from GitHub.

---
# News & Releases

{% for release in gg_releases limit:gg_release_limit %}
  <h2>{{release.title}}</h2>
  <article>
    {{ release.content }}
  </article>
{% endfor %}

## Older news
{% for release in gg_releases offset:gg_release_limit %}
  <li>
    <a href="{{ release.url }}">{{ release.title }}</a>
    {% if release.version %}[{{ release.version }}]{% endif %}
    {% if release.description %}{{ release.dscription }}{% endif %}
  </li>
{% endfor %}
  
[more…]({{ BASE_PATH }}{{ site.JB.categories_path }}#{{ gg_category }}-ref)

# License
License is [CC-BY-NC-SA][].

# Gallery
Screen shots come later! For now, here's a screen shot of mockup.html in Safari.

<div class="gallery" markdown="yes">
  ![mockup screen shot](mockup.png)
</div>


[download]: http://goo.gl/dbE1E
[issues]: https://github.com/erisdiscord/adium-gentleglow/issues
[source]: https://github.com/erisdiscord/adium-gentleglow

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/3.0/
[embedly]: http://embed.ly/
[oembed]: http://www.oembed.com/
