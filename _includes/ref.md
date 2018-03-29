{% for p in site.pages -%}
{% assign nameparts = p.name | split: "." -%}
{% if p.id -%}
{% assign name = p.id -%}
{% else -%}
{% assign name = nameparts[0] | replace: "-", " " | replace: "_", " " -%}
{% endif -%}
{% assign ext = nameparts[1] -%}
{% if ext == "md" -%}
[{{name}}]: {{p.url}}
{:class="passage-link"}
{% endif -%}
{% endfor -%}
