---
id: <% tp.file.title %>
titulo: "<% tp.file.title.replace(/^m\d{2}-[e]?\d{2}-/, '').replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()) %>"
modulo: <% tp.file.folder(true).match(/modulo-(\d{2})/)?.[1] || "" %>
orden: 
tags: []
---

# <% tp.file.title.replace(/^m\d{2}-[e]?\d{2}-/, '').replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()) %>

#teoria

