﻿(function (h) {
    function k(a, b) { var c = a[1], d = new h.format.utils.flagObj(a[3] || ""), f = parseInt(a[4]), e = Boolean(a[5]), g = parseInt(a[6]); a = a[7]; for (var i = h.format.converters, j = i[a]; j; ) if (typeof j == "function") return j(b, c, d, f, e, g, a); else if (typeof j == "string") { j = i[j]; if (j == a) break } return c } h.format = function (a, b, c) {
        if (!(a && b)) return a; var d = {}; for (var f in h.format.defaults) d[f] = h.format.defaults[f]; for (f in c) d[f] = c[f]; c = d; d = []; for (var e in h.format.converters) d.push(e); d = "(?:[^%]|^)(%(?:\\(([^\\)]+)\\))?([\\#0\\- \\+]+)?(\\d+)?(\\.)?(\\d+)?([" +
d.join("") + "]))"; e = new RegExp(d); switch (c.style) { case "named": c = Object; break; case "positional": c = Array; break; case "single": c = null; break; default: c = b.constructor; break } switch (c) { case Array: for (d = f = b.length; (c = a.match(e)) && d; ) a = a.replace(c[1], k(c, b[f - d--])); break; case Object: var g = a.match(new RegExp(d, "g")); for (d = g.length; d--; ) { c = g[d].match(e); f = c[2]; if (b[f] !== undefined) a = a.replace(c[1], k(c, b[f])) } break; default: if (c = a.match(e)) a = a.replace(c[1], k(c, b)); break } return a
    }; h.format.defaults = { toSource: null,
        style: null
    }; h.format.converters = { s: function (a, b, c, d, f, e, g) { b = a.toString(); var i = h.format.utils.pad; if (g == "r") { g = h.format.defaults.toSource; if (g !== null) b = g(a); else if (a.toSource) b = a.toSource() } if (f) b = isNaN(e) ? "" : b.substr(0, e); a = i(b, d); return c.has("-") ? b + a : a + b }, r: "s", d: function (a, b, c, d, f, e, g) {
        b = ""; a = parseInt(a) || 0; var i = a < 0; f = h.format.utils.pad; a = i ? -a : a; if (g == "o") { a = a.toString(8); if (c.has("#")) b = "0" } else if (g.toLowerCase() == "x") { a = a.toString(16); if (c.has("#")) b = "0" + g; if (g == "X") a = a.toUpperCase() } a =
a.toString(); if (!isNaN(e)) for (e -= a.length; e-- > 0; ) a = "0" + a; e = i ? "-" : c.has("+") ? "+" : c.has(" ") ? " " : ""; d = f(a, d); d = d.substr(b.length + e.length); if (c.has("0")) { d = d.replace(/ /g, "0"); a = e + b + d + a } else a = c.has("-") ? e + b + a + d : d + e + b + a; return a
    }, i: "d", u: "d", o: "d", x: "d", X: "d", f: function (a, b, c, d, f, e) {
        a = parseFloat(a); var g = a < 0; b = h.format.utils.pad; var i = h.format.utils.round; a = g ? -a : a; if (isNaN(e)) e = f ? 0 : 6; a = i(a, e).toString(); if (a.indexOf(".") == -1) if (e > 0) a += ".0"; else if (c.has("#")) a += "."; tail = a.replace(/^\d+/, ""); if (e > 0) for (f =
e - tail.length + 1; f--; ) a += "0"; f = g ? "-" : c.has("+") ? "+" : c.has(" ") ? " " : ""; a = f + a; pad = b(a, d); if (c.has("0")) { pad = pad.replace(/ /g, "0"); a = f ? a.replace(/^(.)/, "$1" + pad) : pad + a } else a = c.has("-") ? a + pad : pad + a; return a
    }, F: "f", c: function (a, b, c, d) { res = typeof a == "number" ? String.fromCharCode(a) : a.substr(0, 1); pad = h.format.utils.pad(res, d); return c.has("-") ? res + pad : pad + res } 
    }; h.format.utils = { pad: function (a, b) { var c = ""; if (!isNaN(b)) { b -= a.length; if (b > 0) for (; b--; ) c += " " } return c }, flagObj: function (a) {
        this.toString = function () { return a };
        this.has = function (b) { return a.indexOf(b) != -1 }; if (this.has("0") && this.has("-")) a = a.replace(/0/g, ""); if (this.has(" ") && this.has("+")) a = a.replace(/ /g, ""); return this
    }, round: function (a, b) { b = Math.pow(10, b); return parseInt(a * b + 0.5) / b } 
    }
})(jQuery);
