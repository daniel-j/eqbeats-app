function hex_md5(e) {
	return rstr2hex(rstr_md5(str2rstr_utf8(e)))
}

function b64_md5(e) {
	return rstr2b64(rstr_md5(str2rstr_utf8(e)))
}

function any_md5(e, t) {
	return rstr2any(rstr_md5(str2rstr_utf8(e)), t)
}

function hex_hmac_md5(e, t) {
	return rstr2hex(rstr_hmac_md5(str2rstr_utf8(e), str2rstr_utf8(t)))
}

function b64_hmac_md5(e, t) {
	return rstr2b64(rstr_hmac_md5(str2rstr_utf8(e), str2rstr_utf8(t)))
}

function any_hmac_md5(e, t, n) {
	return rstr2any(rstr_hmac_md5(str2rstr_utf8(e), str2rstr_utf8(t)), n)
}

function md5_vm_test() {
	return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72"
}

function rstr_md5(e) {
	return binl2rstr(binl_md5(rstr2binl(e), e.length * 8))
}

function rstr_hmac_md5(e, t) {
	var n = rstr2binl(e);
	n.length > 16 && (n = binl_md5(n, e.length * 8));
	var r = Array(16),
		i = Array(16);
	for (var s = 0; s < 16; s++)
		r[s] = n[s] ^ 909522486, i[s] = n[s] ^ 1549556828;
	var o = binl_md5(r.concat(rstr2binl(t)), 512 + t.length * 8);
	return binl2rstr(binl_md5(i.concat(o), 640))
}

function rstr2hex(e) {
	try {
		hexcase
	} catch (t) {
		hexcase = 0
	}
	var n = hexcase ? "0123456789ABCDEF" : "0123456789abcdef",
		r = "",
		i;
	for (var s = 0; s < e.length; s++)
		i = e.charCodeAt(s), r += n.charAt(i >>> 4 & 15) + n.charAt(i & 15);
	return r
}

function rstr2b64(e) {
	try {
		b64pad
	} catch (t) {
		b64pad = ""
	}
	var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
		r = "",
		i = e.length;
	for (var s = 0; s < i; s += 3) {
		var o = e.charCodeAt(s) << 16 | (s + 1 < i ? e.charCodeAt(s + 1) << 8 : 0) | (s + 2 < i ? e.charCodeAt(s + 2) : 0);
		for (var u = 0; u < 4; u++)
			s * 8 + u * 6 > e.length * 8 ? r += b64pad : r += n.charAt(o >>> 6 * (3 - u) & 63)
	}
	return r
}

function rstr2any(e, t) {
	var n = t.length,
		r, i, s, o, u, a = Array(Math.ceil(e.length / 2));
	for (r = 0; r < a.length; r++)
		a[r] = e.charCodeAt(r * 2) << 8 | e.charCodeAt(r * 2 + 1);
	var f = Math.ceil(e.length * 8 / (Math.log(t.length) / Math.log(2))),
		l = Array(f);
	for (i = 0; i < f; i++) {
		u = Array(), o = 0;
		for (r = 0; r < a.length; r++) {
			o = (o << 16) + a[r], s = Math.floor(o / n), o -= s * n;
			if (u.length > 0 || s > 0)
				u[u.length] = s
		}
		l[i] = o, a = u
	}
	var c = "";
	for (r = l.length - 1; r >= 0; r--)
		c += t.charAt(l[r]);
	return c
}

function str2rstr_utf8(e) {
	e = e.toString();
	var t = "",
		n = -1,
		r, i;
	while (++n < e.length)
		r = e.charCodeAt(n), i = n + 1 < e.length ? e.charCodeAt(n + 1) : 0, 55296 <= r && r <= 56319 && 56320 <= i && i <= 57343 && (r = 65536 + ((r & 1023) << 10) + (i & 1023), n++), r <= 127 ? t += String.fromCharCode(r) : r <= 2047 ? t += String.fromCharCode(192 | r >>> 6 & 31, 128 | r & 63) : r <= 65535 ? t += String.fromCharCode(224 | r >>> 12 & 15, 128 | r >>> 6 & 63, 128 | r & 63) : r <= 2097151 && (t += String.fromCharCode(240 | r >>> 18 & 7, 128 | r >>> 12 & 63, 128 | r >>> 6 & 63, 128 | r & 63));
	return t
}

function str2rstr_utf16le(e) {
	var t = "";
	for (var n = 0; n < e.length; n++)
		t += String.fromCharCode(e.charCodeAt(n) & 255, e.charCodeAt(n) >>> 8 & 255);
	return t
}

function str2rstr_utf16be(e) {
	var t = "";
	for (var n = 0; n < e.length; n++)
		t += String.fromCharCode(e.charCodeAt(n) >>> 8 & 255, e.charCodeAt(n) & 255);
	return t
}

function rstr2binl(e) {
	var t = Array(e.length >> 2);
	for (var n = 0; n < t.length; n++)
		t[n] = 0;
	for (var n = 0; n < e.length * 8; n += 8)
		t[n >> 5] |= (e.charCodeAt(n / 8) & 255) << n % 32;
	return t
}

function binl2rstr(e) {
	var t = "";
	for (var n = 0; n < e.length * 32; n += 8)
		t += String.fromCharCode(e[n >> 5] >>> n % 32 & 255);
	return t
}

function binl_md5(e, t) {
	e[t >> 5] |= 128 << t % 32, e[(t + 64 >>> 9 << 4) + 14] = t;
	var n = 1732584193,
		r = -271733879,
		i = -1732584194,
		s = 271733878;
	for (var o = 0; o < e.length; o += 16) {
		var u = n,
			a = r,
			f = i,
			l = s;
		n = md5_ff(n, r, i, s, e[o + 0], 7, -680876936), s = md5_ff(s, n, r, i, e[o + 1], 12, -389564586), i = md5_ff(i, s, n, r, e[o + 2], 17, 606105819), r = md5_ff(r, i, s, n, e[o + 3], 22, -1044525330), n = md5_ff(n, r, i, s, e[o + 4], 7, -176418897), s = md5_ff(s, n, r, i, e[o + 5], 12, 1200080426), i = md5_ff(i, s, n, r, e[o + 6], 17, -1473231341), r = md5_ff(r, i, s, n, e[o + 7], 22, -45705983), n = md5_ff(n, r, i, s, e[o + 8], 7, 1770035416), s = md5_ff(s, n, r, i, e[o + 9], 12, -1958414417), i = md5_ff(i, s, n, r, e[o + 10], 17, -42063), r = md5_ff(r, i, s, n, e[o + 11], 22, -1990404162), n = md5_ff(n, r, i, s, e[o + 12], 7, 1804603682), s = md5_ff(s, n, r, i, e[o + 13], 12, -40341101), i = md5_ff(i, s, n, r, e[o + 14], 17, -1502002290), r = md5_ff(r, i, s, n, e[o + 15], 22, 1236535329), n = md5_gg(n, r, i, s, e[o + 1], 5, -165796510), s = md5_gg(s, n, r, i, e[o + 6], 9, -1069501632), i = md5_gg(i, s, n, r, e[o + 11], 14, 643717713), r = md5_gg(r, i, s, n, e[o + 0], 20, -373897302), n = md5_gg(n, r, i, s, e[o + 5], 5, -701558691), s = md5_gg(s, n, r, i, e[o + 10], 9, 38016083), i = md5_gg(i, s, n, r, e[o + 15], 14, -660478335), r = md5_gg(r, i, s, n, e[o + 4], 20, -405537848), n = md5_gg(n, r, i, s, e[o + 9], 5, 568446438), s = md5_gg(s, n, r, i, e[o + 14], 9, -1019803690), i = md5_gg(i, s, n, r, e[o + 3], 14, -187363961), r = md5_gg(r, i, s, n, e[o + 8], 20, 1163531501), n = md5_gg(n, r, i, s, e[o + 13], 5, -1444681467), s = md5_gg(s, n, r, i, e[o + 2], 9, -51403784), i = md5_gg(i, s, n, r, e[o + 7], 14, 1735328473), r = md5_gg(r, i, s, n, e[o + 12], 20, -1926607734), n = md5_hh(n, r, i, s, e[o + 5], 4, -378558), s = md5_hh(s, n, r, i, e[o + 8], 11, -2022574463), i = md5_hh(i, s, n, r, e[o + 11], 16, 1839030562), r = md5_hh(r, i, s, n, e[o + 14], 23, -35309556), n = md5_hh(n, r, i, s, e[o + 1], 4, -1530992060), s = md5_hh(s, n, r, i, e[o + 4], 11, 1272893353), i = md5_hh(i, s, n, r, e[o + 7], 16, -155497632), r = md5_hh(r, i, s, n, e[o + 10], 23, -1094730640), n = md5_hh(n, r, i, s, e[o + 13], 4, 681279174), s = md5_hh(s, n, r, i, e[o + 0], 11, -358537222), i = md5_hh(i, s, n, r, e[o + 3], 16, -722521979), r = md5_hh(r, i, s, n, e[o + 6], 23, 76029189), n = md5_hh(n, r, i, s, e[o + 9], 4, -640364487), s = md5_hh(s, n, r, i, e[o + 12], 11, -421815835), i = md5_hh(i, s, n, r, e[o + 15], 16, 530742520), r = md5_hh(r, i, s, n, e[o + 2], 23, -995338651), n = md5_ii(n, r, i, s, e[o + 0], 6, -198630844), s = md5_ii(s, n, r, i, e[o + 7], 10, 1126891415), i = md5_ii(i, s, n, r, e[o + 14], 15, -1416354905), r = md5_ii(r, i, s, n, e[o + 5], 21, -57434055), n = md5_ii(n, r, i, s, e[o + 12], 6, 1700485571), s = md5_ii(s, n, r, i, e[o + 3], 10, -1894986606), i = md5_ii(i, s, n, r, e[o + 10], 15, -1051523), r = md5_ii(r, i, s, n, e[o + 1], 21, -2054922799), n = md5_ii(n, r, i, s, e[o + 8], 6, 1873313359), s = md5_ii(s, n, r, i, e[o + 15], 10, -30611744), i = md5_ii(i, s, n, r, e[o + 6], 15, -1560198380), r = md5_ii(r, i, s, n, e[o + 13], 21, 1309151649), n = md5_ii(n, r, i, s, e[o + 4], 6, -145523070), s = md5_ii(s, n, r, i, e[o + 11], 10, -1120210379), i = md5_ii(i, s, n, r, e[o + 2], 15, 718787259), r = md5_ii(r, i, s, n, e[o + 9], 21, -343485551), n = safe_add(n, u), r = safe_add(r, a), i = safe_add(i, f), s = safe_add(s, l)
	}
	return Array(n, r, i, s)
}

function md5_cmn(e, t, n, r, i, s) {
	return safe_add(bit_rol(safe_add(safe_add(t, e), safe_add(r, s)), i), n)
}

function md5_ff(e, t, n, r, i, s, o) {
	return md5_cmn(t & n | ~t & r, e, t, i, s, o)
}

function md5_gg(e, t, n, r, i, s, o) {
	return md5_cmn(t & r | n & ~r, e, t, i, s, o)
}

function md5_hh(e, t, n, r, i, s, o) {
	return md5_cmn(t ^ n ^ r, e, t, i, s, o)
}

function md5_ii(e, t, n, r, i, s, o) {
	return md5_cmn(n ^ (t | ~r), e, t, i, s, o)
}

function safe_add(e, t) {
	var n = (e & 65535) + (t & 65535),
		r = (e >> 16) + (t >> 16) + (n >> 16);
	return r << 16 | n & 65535
}

function bit_rol(e, t) {
	return e << t | e >>> 32 - t
}

function hex_sha1(e) {
	return rstr2hex(rstr_sha1(str2rstr_utf8(e)))
}

function b64_sha1(e) {
	return rstr2b64(rstr_sha1(str2rstr_utf8(e)))
}

function any_sha1(e, t) {
	return rstr2any(rstr_sha1(str2rstr_utf8(e)), t)
}

function hex_hmac_sha1(e, t) {
	return rstr2hex(rstr_hmac_sha1(str2rstr_utf8(e), str2rstr_utf8(t)))
}

function b64_hmac_sha1(e, t) {
	return rstr2b64(rstr_hmac_sha1(str2rstr_utf8(e), str2rstr_utf8(t)))
}

function any_hmac_sha1(e, t, n) {
	return rstr2any(rstr_hmac_sha1(str2rstr_utf8(e), str2rstr_utf8(t)), n)
}

function sha1_vm_test() {
	return hex_sha1("abc").toLowerCase() == "a9993e364706816aba3e25717850c26c9cd0d89d"
}

function rstr_sha1(e) {
	return binb2rstr(binb_sha1(rstr2binb(e), e.length * 8))
}

function rstr_hmac_sha1(e, t) {
	var n = rstr2binb(e);
	n.length > 16 && (n = binb_sha1(n, e.length * 8));
	var r = Array(16),
		i = Array(16);
	for (var s = 0; s < 16; s++)
		r[s] = n[s] ^ 909522486, i[s] = n[s] ^ 1549556828;
	var o = binb_sha1(r.concat(rstr2binb(t)), 512 + t.length * 8);
	return binb2rstr(binb_sha1(i.concat(o), 672))
}

function rstr2hex(e) {
	try {
		hexcase
	} catch (t) {
		hexcase = 0
	}
	var n = hexcase ? "0123456789ABCDEF" : "0123456789abcdef",
		r = "",
		i;
	for (var s = 0; s < e.length; s++)
		i = e.charCodeAt(s), r += n.charAt(i >>> 4 & 15) + n.charAt(i & 15);
	return r
}

function rstr2b64(e) {
	try {
		b64pad
	} catch (t) {
		b64pad = ""
	}
	var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
		r = "",
		i = e.length;
	for (var s = 0; s < i; s += 3) {
		var o = e.charCodeAt(s) << 16 | (s + 1 < i ? e.charCodeAt(s + 1) << 8 : 0) | (s + 2 < i ? e.charCodeAt(s + 2) : 0);
		for (var u = 0; u < 4; u++)
			s * 8 + u * 6 > e.length * 8 ? r += b64pad : r += n.charAt(o >>> 6 * (3 - u) & 63)
	}
	return r
}

function rstr2any(e, t) {
	var n = t.length,
		r = Array(),
		i, s, o, u, a = Array(Math.ceil(e.length / 2));
	for (i = 0; i < a.length; i++)
		a[i] = e.charCodeAt(i * 2) << 8 | e.charCodeAt(i * 2 + 1);
	while (a.length > 0) {
		u = Array(), o = 0;
		for (i = 0; i < a.length; i++) {
			o = (o << 16) + a[i], s = Math.floor(o / n), o -= s * n;
			if (u.length > 0 || s > 0)
				u[u.length] = s
		}
		r[r.length] = o, a = u
	}
	var f = "";
	for (i = r.length - 1; i >= 0; i--)
		f += t.charAt(r[i]);
	var l = Math.ceil(e.length * 8 / (Math.log(t.length) / Math.log(2)));
	for (i = f.length; i < l; i++)
		f = t[0] + f;
	return f
}

function str2rstr_utf8(e) {
	var t = "",
		n = -1,
		r, i;
	while (++n < e.length)
		r = e.charCodeAt(n), i = n + 1 < e.length ? e.charCodeAt(n + 1) : 0, 55296 <= r && r <= 56319 && 56320 <= i && i <= 57343 && (r = 65536 + ((r & 1023) << 10) + (i & 1023), n++), r <= 127 ? t += String.fromCharCode(r) : r <= 2047 ? t += String.fromCharCode(192 | r >>> 6 & 31, 128 | r & 63) : r <= 65535 ? t += String.fromCharCode(224 | r >>> 12 & 15, 128 | r >>> 6 & 63, 128 | r & 63) : r <= 2097151 && (t += String.fromCharCode(240 | r >>> 18 & 7, 128 | r >>> 12 & 63, 128 | r >>> 6 & 63, 128 | r & 63));
	return t
}

function str2rstr_utf16le(e) {
	var t = "";
	for (var n = 0; n < e.length; n++)
		t += String.fromCharCode(e.charCodeAt(n) & 255, e.charCodeAt(n) >>> 8 & 255);
	return t
}

function str2rstr_utf16be(e) {
	var t = "";
	for (var n = 0; n < e.length; n++)
		t += String.fromCharCode(e.charCodeAt(n) >>> 8 & 255, e.charCodeAt(n) & 255);
	return t
}

function rstr2binb(e) {
	var t = Array(e.length >> 2);
	for (var n = 0; n < t.length; n++)
		t[n] = 0;
	for (var n = 0; n < e.length * 8; n += 8)
		t[n >> 5] |= (e.charCodeAt(n / 8) & 255) << 24 - n % 32;
	return t
}

function binb2rstr(e) {
	var t = "";
	for (var n = 0; n < e.length * 32; n += 8)
		t += String.fromCharCode(e[n >> 5] >>> 24 - n % 32 & 255);
	return t
}

function binb_sha1(e, t) {
	e[t >> 5] |= 128 << 24 - t % 32, e[(t + 64 >> 9 << 4) + 15] = t;
	var n = Array(80),
		r = 1732584193,
		i = -271733879,
		s = -1732584194,
		o = 271733878,
		u = -1009589776;
	for (var a = 0; a < e.length; a += 16) {
		var f = r,
			l = i,
			c = s,
			h = o,
			p = u;
		for (var d = 0; d < 80; d++) {
			d < 16 ? n[d] = e[a + d] : n[d] = bit_rol(n[d - 3] ^ n[d - 8] ^ n[d - 14] ^ n[d - 16], 1);
			var v = safe_add(safe_add(bit_rol(r, 5), sha1_ft(d, i, s, o)), safe_add(safe_add(u, n[d]), sha1_kt(d)));
			u = o, o = s, s = bit_rol(i, 30), i = r, r = v
		}
		r = safe_add(r, f), i = safe_add(i, l), s = safe_add(s, c), o = safe_add(o, h), u = safe_add(u, p)
	}
	return Array(r, i, s, o, u)
}

function sha1_ft(e, t, n, r) {
	return e < 20 ? t & n | ~t & r : e < 40 ? t ^ n ^ r : e < 60 ? t & n | t & r | n & r : t ^ n ^ r
}

function sha1_kt(e) {
	return e < 20 ? 1518500249 : e < 40 ? 1859775393 : e < 60 ? -1894007588 : -899497514
}

function safe_add(e, t) {
	var n = (e & 65535) + (t & 65535),
		r = (e >> 16) + (t >> 16) + (n >> 16);
	return r << 16 | n & 65535
}

function bit_rol(e, t) {
	return e << t | e >>> 32 - t
}
(function (e) {
	String.prototype.trim === e && (String.prototype.trim = function () {
		return this.replace(/^\s+/, "").replace(/\s+$/, "")
	}), Array.prototype.reduce === e && (Array.prototype.reduce = function (t) {
		if (this === void 0 || this === null)
			throw new TypeError;
		var n = Object(this),
			r = n.length >>> 0,
			i = 0,
			s;
		if (typeof t != "function")
			throw new TypeError;
		if (r == 0 && arguments.length == 1)
			throw new TypeError;
		if (arguments.length >= 2)
			s = arguments[1];
		else
			do {
				if (i in n) {
					s = n[i++];
					break
				}
				if (++i >= r)
					throw new TypeError
			} while (!0);
		while (i < r)
			i in n && (s = t.call(e, s, n[i], i, n)), i++;
		return s
	})
})();
var Zepto = function () {
	function E(e) {
		return {}.toString.call(e) == "[object Function]"
	}

	function S(e) {
		return e instanceof Object
	}

	function x(e) {
		return e instanceof Array
	}

	function T(e) {
		return typeof e.length == "number"
	}

	function N(t) {
		return t.filter(function (t) {
			return t !== e && t !== null
		})
	}

	function C(e) {
		return e.length > 0 ? [].concat.apply([], e) : e
	}

	function k(e) {
		return e.replace(/-+(.)?/g, function (e, t) {
			return t ? t.toUpperCase() : ""
		})
	}

	function L(e) {
		return e.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
	}

	function A(e) {
		return e.filter(function (e, t, n) {
			return n.indexOf(e) == t
		})
	}

	function O(e) {
		return e in a ? a[e] : a[e] = new RegExp("(^|\\s)" + e + "(\\s|$)")
	}

	function M(e, t) {
		return typeof t == "number" && !l[L(e)] ? t + "px" : t
	}

	function _(e) {
		var t, n;
		return u[e] || (t = o.createElement(e), o.body.appendChild(t), n = f(t, "").getPropertyValue("display"), t.parentNode.removeChild(t), n == "none" && (n = "block"), u[e] = n), u[e]
	}

	function D(t, n) {
		n === e && c.test(t) && RegExp.$1, n in m || (n = "*");
		var r = m[n];
		return r.innerHTML = "" + t, s.call(r.childNodes)
	}

	function P(e, t) {
		e = e || i, e.selector = t || "";
		if (!e.__proto__)
			for (var n in H.fn)
				H.fn.hasOwnProperty(n) && (e[n] = P.prototype[n]);
		return e.__proto__ = P.prototype, e
	}

	function H(t, r) {
		if (!t)
			return P();
		if (r !== e)
			return H(r).find(t);
		if (E(t))
			return H(o).ready(t);
		if (t instanceof P || t.__proto__ == P.prototype)
			return t;
		var i;
		return x(t) ? i = N(t) : h.indexOf(t.nodeType) >= 0 || t === window ? (i = [t], t = null) : c.test(t) ? (i = D(t.trim(), RegExp.$1), t = null) : t.nodeType && t.nodeType == 3 ? i = [t] : i = n(o, t), P(i, t)
	}

	function B(t, n) {
		return n === e ? H(t) : H(t).filter(n)
	}

	function j(e, t, n, r) {
		return E(t) ? t.call(e, n, r) : t
	}

	function F(e, t, n) {
		var r = e % 2 ? t : t.parentNode;
		r && r.insertBefore(n, e ? e == 1 ? r.firstChild : e == 2 ? t : null : t.nextSibling)
	}

	function I(e, t) {
		t(e);
		for (var n in e.childNodes)
			I(e.childNodes[n], t)
	}
	var e, t, n, r, i = [],
		s = i.slice,
		o = window.document,
		u = {}, a = {}, f = o.defaultView.getComputedStyle,
		l = {
			"column-count": 1,
			columns: 1,
			"font-weight": 1,
			"line-height": 1,
			opacity: 1,
			"z-index": 1,
			zoom: 1
		}, c = /^\s*<(\w+)[^>]*>/,
		h = [1, 9, 11],
		p = ["after", "prepend", "before", "append"],
		d = o.createElement("table"),
		v = o.createElement("tr"),
		m = {
			tr: o.createElement("tbody"),
			tbody: d,
			thead: d,
			tfoot: d,
			td: v,
			th: v,
			"*": o.createElement("div")
		}, g = /complete|loaded|interactive/,
		y = /^\.([\w-]+)$/,
		b = /^#([\w-]+)$/,
		w = /^[\w-]+$/;
	return H.extend = function (e) {
		return s.call(arguments, 1).forEach(function (n) {
			for (t in n)
				e[t] = n[t]
		}), e
	}, H.qsa = n = function (e, t) {
		var n;
		return typeof t != "string" ? i : e === o && b.test(t) ? (n = e.getElementById(RegExp.$1)) ? [n] : i : s.call(y.test(t) ? e.getElementsByClassName(RegExp.$1) : w.test(t) ? e.getElementsByTagName(t) : e.querySelectorAll(t))
	}, H.isFunction = E, H.isObject = S, H.isArray = x, H.map = function (e, t) {
		var n, r = [],
			i, s;
		if (T(e))
			for (i = 0; i < e.length; i++)
				n = t(e[i], i), n != null && r.push(n);
		else
			for (s in e)
				n = t(e[s], s), n != null && r.push(n);
		return C(r)
	}, H.each = function (e, t) {
		var n, r;
		if (T(e)) {
			for (n = 0; n < e.length; n++)
				if (t(n, e[n]) === !1)
					return e
		} else
			for (r in e)
				if (t(r, e[r]) === !1)
					return e;
		return e
	}, H.fn = {
		forEach: i.forEach,
		reduce: i.reduce,
		push: i.push,
		indexOf: i.indexOf,
		concat: i.concat,
		map: function (e) {
			return H.map(this, function (t, n) {
				return e.call(t, n, t)
			})
		},
		slice: function () {
			return H(s.apply(this, arguments))
		},
		ready: function (e) {
			return g.test(o.readyState) ? e(H) : o.addEventListener("DOMContentLoaded", function () {
				e(H)
			}, !1), this
		},
		get: function (t) {
			return t === e ? this : this[t]
		},
		size: function () {
			return this.length
		},
		remove: function () {
			return this.each(function () {
				this.parentNode != null && this.parentNode.removeChild(this)
			})
		},
		each: function (e) {
			return this.forEach(function (t, n) {
				e.call(t, n, t)
			}), this
		},
		filter: function (e) {
			return H([].filter.call(this, function (t) {
				return t.parentNode && n(t.parentNode, e).indexOf(t) >= 0
			}))
		},
		end: function () {
			return this.prevObject || H()
		},
		andSelf: function () {
			return this.add(this.prevObject || H())
		},
		add: function (e, t) {
			return H(A(this.concat(H(e, t))))
		},
		is: function (e) {
			return this.length > 0 && H(this[0]).filter(e).length > 0
		},
		not: function (t) {
			var n = [];
			if (E(t) && t.call !== e)
				this.each(function (e) {
					t.call(this, e) || n.push(this)
				});
			else {
				var r = typeof t == "string" ? this.filter(t) : T(t) && E(t.item) ? s.call(t) : H(t);
				this.forEach(function (e) {
					r.indexOf(e) < 0 && n.push(e)
				})
			}
			return H(n)
		},
		eq: function (e) {
			return e === -1 ? this.slice(e) : this.slice(e, +e + 1)
		},
		first: function () {
			var e = this[0];
			return e && !S(e) ? e : H(e)
		},
		last: function () {
			var e = this[this.length - 1];
			return e && !S(e) ? e : H(e)
		},
		find: function (e) {
			var t;
			return this.length == 1 ? t = n(this[0], e) : t = this.map(function () {
				return n(this, e)
			}), H(t)
		},
		closest: function (e, t) {
			var r = this[0],
				i = n(t || o, e);
			i.length || (r = null);
			while (r && i.indexOf(r) < 0)
				r = r !== t && r !== o && r.parentNode;
			return H(r)
		},
		parents: function (e) {
			var t = [],
				n = this;
			while (n.length > 0)
				n = H.map(n, function (e) {
					if ((e = e.parentNode) && e !== o && t.indexOf(e) < 0)
						return t.push(e), e
				});
			return B(t, e)
		},
		parent: function (e) {
			return B(A(this.pluck("parentNode")), e)
		},
		children: function (e) {
			return B(this.map(function () {
				return s.call(this.children)
			}), e)
		},
		siblings: function (e) {
			return B(this.map(function (e, t) {
				return s.call(t.parentNode.children).filter(function (e) {
					return e !== t
				})
			}), e)
		},
		empty: function () {
			return this.each(function () {
				this.innerHTML = ""
			})
		},
		pluck: function (e) {
			return this.map(function () {
				return this[e]
			})
		},
		show: function () {
			return this.each(function () {
				this.style.display == "none" && (this.style.display = null), f(this, "").getPropertyValue("display") == "none" && (this.style.display = _(this.nodeName))
			})
		},
		replaceWith: function (e) {
			return this.each(function () {
				H(this).before(e).remove()
			})
		},
		wrap: function (e) {
			return this.each(function () {
				H(this).wrapAll(H(e)[0].cloneNode(!1))
			})
		},
		wrapAll: function (e) {
			return this[0] && (H(this[0]).before(e = H(e)), e.append(this)), this
		},
		unwrap: function () {
			return this.parent().each(function () {
				H(this).replaceWith(H(this).children())
			}), this
		},
		hide: function () {
			return this.css("display", "none")
		},
		toggle: function (t) {
			return (t === e ? this.css("display") == "none" : t) ? this.show() : this.hide()
		},
		prev: function () {
			return H(this.pluck("previousElementSibling"))
		},
		next: function () {
			return H(this.pluck("nextElementSibling"))
		},
		html: function (t) {
			return t === e ? this.length > 0 ? this[0].innerHTML : null : this.each(function (e) {
				var n = this.innerHTML;
				H(this).empty().append(j(this, t, e, n))
			})
		},
		text: function (t) {
			return t === e ? this.length > 0 ? this[0].textContent : null : this.each(function () {
				this.textContent = t
			})
		},
		attr: function (n, r) {
			var i;
			return typeof n == "string" && r === e ? this.length == 0 ? e : n == "value" && this[0].nodeName == "INPUT" ? this.val() : !(i = this[0].getAttribute(n)) && n in this[0] ? this[0][n] : i : this.each(function (e) {
				if (S(n))
					for (t in n)
						this.setAttribute(t, n[t]);
				else
					this.setAttribute(n, j(this, r, e, this.getAttribute(n)))
			})
		},
		removeAttr: function (e) {
			return this.each(function () {
				this.removeAttribute(e)
			})
		},
		data: function (e, t) {
			return this.attr("data-" + e, t)
		},
		val: function (t) {
			return t === e ? this.length > 0 ? this[0].value : null : this.each(function (e) {
				this.value = j(this, t, e, this.value)
			})
		},
		offset: function () {
			if (this.length == 0)
				return null;
			var e = this[0].getBoundingClientRect();
			return {
				left: e.left + window.pageXOffset,
				top: e.top + window.pageYOffset,
				width: e.width,
				height: e.height
			}
		},
		css: function (n, r) {
			if (r === e && typeof n == "string")
				return this.length == 0 ? e : this[0].style[k(n)] || f(this[0], "").getPropertyValue(n);
			var i = "";
			for (t in n)
				i += L(t) + ":" + M(t, n[t]) + ";";
			return typeof n == "string" && (i = L(n) + ":" + M(n, r)), this.each(function () {
				this.style.cssText += ";" + i
			})
		},
		index: function (e) {
			return e ? this.indexOf(H(e)[0]) : this.parent().children().indexOf(this[0])
		},
		hasClass: function (e) {
			return this.length < 1 ? !1 : O(e).test(this[0].className)
		},
		addClass: function (e) {
			return this.each(function (t) {
				r = [];
				var n = this.className,
					i = j(this, e, t, n);
				i.split(/\s+/g).forEach(function (e) {
					H(this).hasClass(e) || r.push(e)
				}, this), r.length && (this.className += (n ? " " : "") + r.join(" "))
			})
		},
		removeClass: function (t) {
			return this.each(function (n) {
				if (t === e)
					return this.className = "";
				r = this.className, j(this, t, n, r).split(/\s+/g).forEach(function (e) {
					r = r.replace(O(e), " ")
				}), this.className = r.trim()
			})
		},
		toggleClass: function (t, n) {
			return this.each(function (r) {
				var i = j(this, t, r, this.className);
				(n === e ? !H(this).hasClass(i) : n) ? H(this).addClass(i) : H(this).removeClass(i)
			})
		}
	}, "filter,add,not,eq,first,last,find,closest,parents,parent,children,siblings".split(",").forEach(function (e) {
		var t = H.fn[e];
		H.fn[e] = function () {
			var e = t.apply(this, arguments);
			return e.prevObject = this, e
		}
	}), ["width", "height"].forEach(function (t) {
		H.fn[t] = function (n) {
			var r, i = t.replace(/./, function (e) {
					return e[0].toUpperCase()
				});
			return n === e ? this[0] == window ? window["inner" + i] : this[0] == o ? o.documentElement["offset" + i] : (r = this.offset()) && r[t] : this.each(function (e) {
				var r = H(this);
				r.css(t, j(this, n, e, r[t]()))
			})
		}
	}), p.forEach(function (e, t) {
		H.fn[e] = function (e) {
			var n = S(e) ? e : D(e);
			if (!("length" in n) || n.nodeType)
				n = [n];
			if (n.length < 1)
				return this;
			var r = this.length,
				i = r > 1,
				s = t < 2;
			return this.each(function (e, o) {
				for (var u = 0; u < n.length; u++) {
					var a = n[s ? n.length - u - 1 : u];
					I(a, function (e) {
						e.nodeName != null && e.nodeName.toUpperCase() === "SCRIPT" && (!e.type || e.type === "text/javascript") && window.eval.call(window, e.innerHTML)
					}), i && e < r - 1 && (a = a.cloneNode(!0)), F(t, o, a)
				}
			})
		};
		var n = t % 2 ? e + "To" : "insert" + (t ? "Before" : "After");
		H.fn[n] = function (t) {
			return H(t)[e](this), this
		}
	}), P.prototype = H.fn, H
}();
window.Zepto = Zepto, "$" in window || (window.$ = Zepto),
function (e) {
	function s(e) {
		return e._zid || (e._zid = r++)
	}

	function o(e, t, r, i) {
		t = u(t);
		if (t.ns)
			var o = a(t.ns);
		return (n[s(e)] || []).filter(function (e) {
			return e && (!t.e || e.e == t.e) && (!t.ns || o.test(e.ns)) && (!r || e.fn == r) && (!i || e.sel == i)
		})
	}

	function u(e) {
		var t = ("" + e).split(".");
		return {
			e: t[0],
			ns: t.slice(1).sort().join(" ")
		}
	}

	function a(e) {
		return new RegExp("(?:^| )" + e.replace(" ", " .* ?") + "(?: |$)")
	}

	function f(t, n, r) {
		e.isObject(t) ? e.each(t, r) : t.split(/\s/).forEach(function (e) {
			r(e, n)
		})
	}

	function l(t, r, i, o, a) {
		var l = s(t),
			c = n[l] || (n[l] = []);
		f(r, i, function (n, r) {
			var i = a && a(r, n),
				s = i || r,
				f = function (e) {
					var n = s.apply(t, [e].concat(e.data));
					return n === !1 && e.preventDefault(), n
				}, l = e.extend(u(n), {
					fn: r,
					proxy: f,
					sel: o,
					del: i,
					i: c.length
				});
			c.push(l), t.addEventListener(l.e, f, !1)
		})
	}

	function c(e, t, r, i) {
		var u = s(e);
		f(t || "", r, function (t, r) {
			o(e, t, r, i).forEach(function (t) {
				delete n[u][t.i], e.removeEventListener(t.e, t.proxy, !1)
			})
		})
	}

	function v(t) {
		var n = e.extend({
			originalEvent: t
		}, t);
		return e.each(d, function (e, r) {
			n[e] = function () {
				return this[r] = h, t[e].apply(t, arguments)
			}, n[r] = p
		}), n
	}

	function m(e) {
		if (!("defaultPrevented" in e)) {
			e.defaultPrevented = !1;
			var t = e.preventDefault;
			e.preventDefault = function () {
				this.defaultPrevented = !0, t.call(this)
			}
		}
	}
	var t = e.qsa,
		n = {}, r = 1,
		i = {};
	i.click = i.mousedown = i.mouseup = i.mousemove = "MouseEvents", e.event = {
		add: l,
		remove: c
	}, e.fn.bind = function (e, t) {
		return this.each(function () {
			l(this, e, t)
		})
	}, e.fn.unbind = function (e, t) {
		return this.each(function () {
			c(this, e, t)
		})
	}, e.fn.one = function (e, t) {
		return this.each(function (n, r) {
			l(this, e, t, null, function (e, t) {
				return function () {
					var n = e.apply(r, arguments);
					return c(r, t, e), n
				}
			})
		})
	};
	var h = function () {
		return !0
	}, p = function () {
			return !1
		}, d = {
			preventDefault: "isDefaultPrevented",
			stopImmediatePropagation: "isImmediatePropagationStopped",
			stopPropagation: "isPropagationStopped"
		};
	e.fn.delegate = function (t, n, r) {
		return this.each(function (i, s) {
			l(s, n, r, t, function (n) {
				return function (r) {
					var i, o = e(r.target).closest(t, s).get(0);
					if (o)
						return i = e.extend(v(r), {
							currentTarget: o,
							liveFired: s
						}), n.apply(o, [i].concat([].slice.call(arguments, 1)))
				}
			})
		})
	}, e.fn.undelegate = function (e, t, n) {
		return this.each(function () {
			c(this, t, n, e)
		})
	}, e.fn.live = function (t, n) {
		return e(document.body).delegate(this.selector, t, n), this
	}, e.fn.die = function (t, n) {
		return e(document.body).undelegate(this.selector, t, n), this
	}, e.fn.on = function (t, n, r) {
		return n === undefined || e.isFunction(n) ? this.bind(t, n) : this.delegate(n, t, r)
	}, e.fn.off = function (t, n, r) {
		return n === undefined || e.isFunction(n) ? this.unbind(t, n) : this.undelegate(n, t, r)
	}, e.fn.trigger = function (t, n) {
		return typeof t == "string" && (t = e.Event(t)), m(t), t.data = n, this.each(function () {
			this.dispatchEvent(t)
		})
	}, e.fn.triggerHandler = function (t, n) {
		var r, i;
		return this.each(function (s, u) {
			r = v(typeof t == "string" ? e.Event(t) : t), r.data = n, r.target = u, e.each(o(u, t.type || t), function (e, t) {
				i = t.proxy(r);
				if (r.isImmediatePropagationStopped())
					return !1
			})
		}), i
	}, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout change select keydown keypress keyup error".split(" ").forEach(function (t) {
		e.fn[t] = function (e) {
			return this.bind(t, e)
		}
	}), ["focus", "blur"].forEach(function (t) {
		e.fn[t] = function (e) {
			if (e)
				this.bind(t, e);
			else if (this.length)
				try {
					this.get(0)[t]()
				} catch (n) {}
			return this
		}
	}), e.Event = function (e, t) {
		var n = document.createEvent(i[e] || "Events"),
			r = !0;
		if (t)
			for (var s in t)
				s == "bubbles" ? r = !! t[s] : n[s] = t[s];
		return n.initEvent(e, r, !0, null, null, null, null, null, null, null, null, null, null, null, null), n
	}
}(Zepto),
function (e) {
	function t(e) {
		var t = this.os = {}, n = this.browser = {}, r = e.match(/WebKit\/([\d.]+)/),
			i = e.match(/(Android)\s+([\d.]+)/),
			s = e.match(/(iPad).*OS\s([\d_]+)/),
			o = !s && e.match(/(iPhone\sOS)\s([\d_]+)/),
			u = e.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
			a = u && e.match(/TouchPad/),
			f = e.match(/Kindle\/([\d.]+)/),
			l = e.match(/Silk\/([\d._]+)/),
			c = e.match(/(BlackBerry).*Version\/([\d.]+)/),
			h = e.match(/(BB10).*Version\/([\d.]+)/),
			p = e.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
			d = e.match(/PlayBook/),
			v = e.match(/Chrome\/([\d.]+)/) || e.match(/CriOS\/([\d.]+)/),
			m = e.match(/Firefox\/([\d.]+)/);
		if (n.webkit = !! r)
			n.version = r[1];
		i && (t.android = !0, t.version = i[2]), o && (t.ios = t.iphone = !0, t.version = o[2].replace(/_/g, ".")), s && (t.ios = t.ipad = !0, t.version = s[2].replace(/_/g, ".")), u && (t.webos = !0, t.version = u[2]), a && (t.touchpad = !0), c && (t.blackberry = !0, t.version = c[2]), h && (t.bb10 = !0, t.version = h[2]), p && (t.rimtabletos = !0, t.version = p[2]), d && (n.playbook = !0), f && (t.kindle = !0, t.version = f[1]), l && (n.silk = !0, n.version = l[1]), !l && t.android && e.match(/Kindle Fire/) && (n.silk = !0), v && (n.chrome = !0, n.version = v[1]), m && (n.firefox = !0, n.version = m[1]), t.tablet = !! (s || d || i && !e.match(/Mobile/) || m && e.match(/Tablet/)), t.phone = !t.tablet && !! (i || o || u || c || h || v && e.match(/Android/) || v && e.match(/CriOS\/([\d.]+)/) || m && e.match(/Mobile/))
	}
	t.call(e, navigator.userAgent), e.__detect = t
}(Zepto),
function (e, t) {
	function l(e) {
		return e.toLowerCase()
	}

	function c(e) {
		return r ? r + e : l(e)
	}
	var n = "",
		r, i, s, o = {
			Webkit: "webkit",
			Moz: "",
			O: "o",
			ms: "MS"
		}, u = window.document,
		a = u.createElement("div"),
		f = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;
	e.each(o, function (e, i) {
		if (a.style[e + "TransitionProperty"] !== t)
			return n = "-" + l(e) + "-", r = i, !1
	}), e.fx = {
		off: r === t && a.style.transitionProperty === t,
		cssPrefix: n,
		transitionEnd: c("TransitionEnd"),
		animationEnd: c("AnimationEnd")
	}, e.fn.animate = function (t, n, r, i) {
		return e.isObject(n) && (r = n.easing, i = n.complete, n = n.duration), n && (n /= 1e3), this.anim(t, n, r, i)
	}, e.fn.anim = function (r, i, s, o) {
		var u, a = {}, l, c = this,
			h, p = e.fx.transitionEnd;
		i === t && (i = .4), e.fx.off && (i = 0);
		if (typeof r == "string")
			a[n + "animation-name"] = r, a[n + "animation-duration"] = i + "s", p = e.fx.animationEnd;
		else {
			for (l in r)
				f.test(l) ? (u || (u = []), u.push(l + "(" + r[l] + ")")) : a[l] = r[l];
			u && (a[n + "transform"] = u.join(" ")), e.fx.off || (a[n + "transition"] = "all " + i + "s " + (s || ""))
		}
		return h = function () {
			var t = {};
			t[n + "transition"] = t[n + "animation-name"] = "none", e(this).css(t), o && o.call(this)
		}, i > 0 && this.one(p, h), setTimeout(function () {
			c.css(a), i <= 0 && setTimeout(function () {
				c.each(function () {
					h.call(this)
				})
			}, 0)
		}, 0), this
	}, a = null
}(Zepto),
function (e) {
	function o(t, n, r) {
		var i = e.Event(n);
		return e(t).trigger(i, r), !i.defaultPrevented
	}

	function u(e, t, n, i) {
		if (e.global)
			return o(t || r, n, i)
	}

	function a(t) {
		t.global && e.active++ === 0 && u(t, null, "ajaxStart")
	}

	function f(t) {
		t.global && !--e.active && u(t, null, "ajaxStop")
	}

	function l(e, t) {
		var n = t.context;
		if (t.beforeSend.call(n, e, t) === !1 || u(t, n, "ajaxBeforeSend", [e, t]) === !1)
			return !1;
		u(t, n, "ajaxSend", [e, t])
	}

	function c(e, t, n) {
		var r = n.context,
			i = "success";
		n.success.call(r, e, i, t), u(n, r, "ajaxSuccess", [t, n, e]), p(i, t, n)
	}

	function h(e, t, n, r) {
		var i = r.context;
		r.error.call(i, n, t, e), u(r, i, "ajaxError", [n, r, e]), p(t, n, r)
	}

	function p(e, t, n) {
		var r = n.context;
		n.complete.call(r, t, e), u(n, r, "ajaxComplete", [t, n]), f(n)
	}

	function d() {}

	function m(t, r, i, s) {
		var o = e.isArray(r);
		e.each(r, function (r, u) {
			s && (r = i ? s : s + "[" + (o ? "" : r) + "]"), !s && o ? t.add(u.name, u.value) : (i ? e.isArray(u) : n(u)) ? m(t, u, i, r) : t.add(r, u)
		})
	}
	var t = 0,
		n = e.isObject,
		r = window.document,
		i, s;
	e.active = 0, e.ajaxJSONP = function (n) {
		var i = n.callbackName || "jsonp" + ++t,
			s = r.createElement("script"),
			o = function () {
				e(s).remove(), i in window && (window[i] = d), p(u, n, "abort")
			}, u = {
				abort: o
			}, a;
		return window[i] = function (t) {
			clearTimeout(a), e(s).remove(), delete window[i], c(t, u, n)
		}, s.src = n.url.replace(/=\?/, "=" + i), e("head").append(s), n.timeout > 0 && (a = setTimeout(function () {
			u.abort(), p(u, n, "timeout")
		}, n.timeout)), u
	}, e.ajaxSettings = {
		type: "GET",
		beforeSend: d,
		success: d,
		error: d,
		complete: d,
		context: null,
		global: !0,
		xhr: function (e) {
			return e && e.crossDomain && window.XDomainRequest ? new window.XDomainRequest : new window.XMLHttpRequest
		},
		accepts: {
			script: "text/javascript, application/javascript",
			json: "application/json",
			xml: "application/xml, text/xml",
			html: "text/html",
			text: "text/plain"
		},
		crossDomain: !1,
		timeout: 0
	}, e.ajax = function (t) {
		var r = e.extend({}, t || {});
		for (i in e.ajaxSettings)
			r[i] === undefined && (r[i] = e.ajaxSettings[i]);
		a(r), r.crossDomain || (r.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(r.url) && RegExp.$2 != window.location.host);
		if (/=\?/.test(r.url))
			return e.ajaxJSONP(r);
		r.url || (r.url = window.location.toString()), r.data && !r.contentType && (r.contentType = "application/x-www-form-urlencoded"), n(r.data) && (r.data = e.param(r.data));
		if (r.type.match(/get/i) && r.data) {
			var o = r.data;
			r.url.match(/\?.*=/) ? o = "&" + o : o[0] != "?" && (o = "?" + o), r.url += o
		}
		var u = r.accepts[r.dataType],
			f = {}, p = /^([\w-]+:)\/\//.test(r.url) ? RegExp.$1 : window.location.protocol,
			v = e.ajaxSettings.xhr(r),
			m;
		u && (f.Accept = u), r.headers = e.extend(f, r.headers || {}), window.XDomainRequest && v instanceof window.XDomainRequest ? (v.onload = function () {
			clearTimeout(m);
			var e, t = !1;
			if (u == "application/json" && !/^\s*$/.test(v.responseText))
				try {
					e = JSON.parse(v.responseText)
				} catch (n) {
					t = n
				} else
				e = v.responseText;
			t ? h(t, "parsererror", v, r) : c(e, v, r)
		}, v.onerror = v.ontimeout = function () {
			clearTimeout(m), h(null, "error", v, r)
		}) : v.onreadystatechange = function () {
			if (v.readyState == 4) {
				clearTimeout(m);
				var e, t = !1;
				if (v.status >= 200 && v.status < 300 || v.status == 0 && p == "file:") {
					if (u == "application/json" && !/^\s*$/.test(v.responseText))
						try {
							e = JSON.parse(v.responseText)
						} catch (n) {
							t = n
						} else
						e = v.responseText;
					t ? h(t, "parsererror", v, r) : c(e, v, r)
				} else
					h(null, "error", v, r)
			}
		}, v.open(r.type, r.url, !0), r.contentType && (r.headers["Content-Type"] = r.contentType);
		for (s in r.headers)
			v.setRequestHeader(s, r.headers[s]);
		return l(v, r) === !1 ? (v.abort(), !1) : (r.timeout > 0 && (m = setTimeout(function () {
			v.onreadystatechange = d, v.abort(), h(null, "timeout", v, r)
		}, r.timeout)), v.send(r.data), v)
	}, e.get = function (t, n) {
		return e.ajax({
			url: t,
			success: n
		})
	}, e.post = function (t, n, r, i) {
		return e.isFunction(n) && (i = i || r, r = n, n = null), e.ajax({
			type: "POST",
			url: t,
			data: n,
			success: r,
			dataType: i
		})
	}, e.getJSON = function (t, n) {
		return e.ajax({
			url: t,
			success: n,
			dataType: "json"
		})
	}, e.fn.load = function (t, n) {
		if (!this.length)
			return this;
		var i = this,
			s = t.split(/\s/),
			o;
		return s.length > 1 && (t = s[0], o = s[1]), e.get(t, function (t) {
			i.html(o ? e(r.createElement("div")).html(t).find(o).html() : t), n && n.call(i)
		}), this
	};
	var v = encodeURIComponent;
	e.param = function (e, t) {
		var n = [];
		return n.add = function (e, t) {
			this.push(v(e) + "=" + v(t))
		}, m(n, e, t), n.join("&").replace("%20", "+")
	}
}(Zepto),
function (e) {
	e.fn.serializeArray = function () {
		var t = [],
			n;
		return e(Array.prototype.slice.call(this.get(0).elements)).each(function () {
			n = e(this);
			var r = n.attr("type");
			!this.disabled && r != "submit" && r != "reset" && r != "button" && (r != "radio" && r != "checkbox" || this.checked) && t.push({
				name: n.attr("name"),
				value: n.val()
			})
		}), t
	}, e.fn.serialize = function () {
		var e = [];
		return this.serializeArray().forEach(function (t) {
			e.push(encodeURIComponent(t.name) + "=" + encodeURIComponent(t.value))
		}), e.join("&")
	}, e.fn.submit = function (t) {
		if (t)
			this.bind("submit", t);
		else if (this.length) {
			var n = e.Event("submit");
			this.eq(0).trigger(n), n.defaultPrevented || this.get(0).submit()
		}
		return this
	}
}(Zepto),
function (e) {
	function r(e) {
		return "tagName" in e ? e : e.parentNode
	}

	function i(e, t, n, r) {
		var i = Math.abs(e - t),
			s = Math.abs(n - r);
		return i >= s ? e - t > 0 ? "Left" : "Right" : n - r > 0 ? "Up" : "Down"
	}

	function o() {
		t.last && Date.now() - t.last >= s && (e(t.target).trigger("longTap"), t = {})
	}
	var t = {}, n, s = 750;
	e(document).ready(function () {
		e(document.body).bind("touchstart", function (e) {
			var i = Date.now(),
				u = i - (t.last || i);
			t.target = r(e.touches[0].target), n && clearTimeout(n), t.x1 = e.touches[0].pageX, t.y1 = e.touches[0].pageY, u > 0 && u <= 250 && (t.isDoubleTap = !0), t.last = i, setTimeout(o, s)
		}).bind("touchmove", function (e) {
			t.x2 = e.touches[0].pageX, t.y2 = e.touches[0].pageY
		}).bind("touchend", function (r) {
			t.isDoubleTap ? (e(t.target).trigger("doubleTap"), t = {}) : t.x2 > 0 || t.y2 > 0 ? ((Math.abs(t.x1 - t.x2) > 30 || Math.abs(t.y1 - t.y2) > 30) && e(t.target).trigger("swipe") && e(t.target).trigger("swipe" + i(t.x1, t.x2, t.y1, t.y2)), t.x1 = t.x2 = t.y1 = t.y2 = t.last = 0) : "last" in t && (n = setTimeout(function () {
				n = null, e(t.target).trigger("tap"), t = {}
			}, 250))
		}).bind("touchcancel", function () {
			t = {}
		})
	}), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "longTap"].forEach(function (t) {
		e.fn[t] = function (e) {
			return this.bind(t, e)
		}
	})
}(Zepto),
function () {
	function C(e, t, n) {
		if (e === t)
			return e !== 0 || 1 / e == 1 / t;
		if (e == null || t == null)
			return e === t;
		e._chain && (e = e._wrapped), t._chain && (t = t._wrapped);
		if (S.isFunction(e.isEqual))
			return e.isEqual(t);
		if (S.isFunction(t.isEqual))
			return t.isEqual(e);
		var r = typeof e;
		if (r != typeof t)
			return !1;
		if (!e != !t)
			return !1;
		if (S.isNaN(e))
			return S.isNaN(t);
		var i = S.isString(e),
			s = S.isString(t);
		if (i || s)
			return i && s && String(e) == String(t);
		var o = S.isNumber(e),
			u = S.isNumber(t);
		if (o || u)
			return o && u && +e == +t;
		var a = S.isBoolean(e),
			l = S.isBoolean(t);
		if (a || l)
			return a && l && +e == +t;
		var c = S.isDate(e),
			h = S.isDate(t);
		if (c || h)
			return c && h && e.getTime() == t.getTime();
		var p = S.isRegExp(e),
			d = S.isRegExp(t);
		if (p || d)
			return p && d && e.source == t.source && e.global == t.global && e.multiline == t.multiline && e.ignoreCase == t.ignoreCase;
		if (r != "object")
			return !1;
		if (e.length !== t.length)
			return !1;
		if (e.constructor !== t.constructor)
			return !1;
		var v = n.length;
		while (v--)
			if (n[v] == e)
				return !0;
		n.push(e);
		var m = 0,
			g = !0;
		for (var y in e)
			if (f.call(e, y)) {
				m++;
				if (!(g = f.call(t, y) && C(e[y], t[y], n)))
					break
			}
		if (g) {
			for (y in t)
				if (f.call(t, y) && !(m--))
					break;
			g = !m
		}
		return n.pop(), g
	}
	var e = this,
		t = e._,
		n = {}, r = Array.prototype,
		i = Object.prototype,
		s = Function.prototype,
		o = r.slice,
		u = r.unshift,
		a = i.toString,
		f = i.hasOwnProperty,
		l = r.forEach,
		c = r.map,
		h = r.reduce,
		p = r.reduceRight,
		d = r.filter,
		v = r.every,
		m = r.some,
		g = r.indexOf,
		y = r.lastIndexOf,
		b = Array.isArray,
		w = Object.keys,
		E = s.bind,
		S = function (e) {
			return new L(e)
		};
	typeof exports != "undefined" ? (typeof module != "undefined" && module.exports && (exports = module.exports = S), exports._ = S) : typeof define == "function" && define.amd ? define("underscore", function () {
		return S
	}) : e._ = S, S.VERSION = "1.2.1";
	var x = S.each = S.forEach = function (e, t, r) {
		if (e == null)
			return;
		if (l && e.forEach === l)
			e.forEach(t, r);
		else if (e.length === +e.length) {
			for (var i = 0, s = e.length; i < s; i++)
				if (i in e && t.call(r, e[i], i, e) === n)
					return
		} else
			for (var o in e)
				if (f.call(e, o) && t.call(r, e[o], o, e) === n)
					return
	};
	S.map = function (e, t, n) {
		var r = [];
		return e == null ? r : c && e.map === c ? e.map(t, n) : (x(e, function (e, i, s) {
			r[r.length] = t.call(n, e, i, s)
		}), r)
	}, S.reduce = S.foldl = S.inject = function (e, t, n, r) {
		var i = n !== void 0;
		e == null && (e = []);
		if (h && e.reduce === h)
			return r && (t = S.bind(t, r)), i ? e.reduce(t, n) : e.reduce(t);
		x(e, function (e, s, o) {
			i ? n = t.call(r, n, e, s, o) : (n = e, i = !0)
		});
		if (!i)
			throw new TypeError("Reduce of empty array with no initial value");
		return n
	}, S.reduceRight = S.foldr = function (e, t, n, r) {
		e == null && (e = []);
		if (p && e.reduceRight === p)
			return r && (t = S.bind(t, r)), n !== void 0 ? e.reduceRight(t, n) : e.reduceRight(t);
		var i = (S.isArray(e) ? e.slice() : S.toArray(e)).reverse();
		return S.reduce(i, t, n, r)
	}, S.find = S.detect = function (e, t, n) {
		var r;
		return T(e, function (e, i, s) {
			if (t.call(n, e, i, s))
				return r = e, !0
		}), r
	}, S.filter = S.select = function (e, t, n) {
		var r = [];
		return e == null ? r : d && e.filter === d ? e.filter(t, n) : (x(e, function (e, i, s) {
			t.call(n, e, i, s) && (r[r.length] = e)
		}), r)
	}, S.reject = function (e, t, n) {
		var r = [];
		return e == null ? r : (x(e, function (e, i, s) {
			t.call(n, e, i, s) || (r[r.length] = e)
		}), r)
	}, S.every = S.all = function (e, t, r) {
		var i = !0;
		return e == null ? i : v && e.every === v ? e.every(t, r) : (x(e, function (e, s, o) {
			if (!(i = i && t.call(r, e, s, o)))
				return n
		}), i)
	};
	var T = S.some = S.any = function (e, t, r) {
		t = t || S.identity;
		var i = !1;
		return e == null ? i : m && e.some === m ? e.some(t, r) : (x(e, function (e, s, o) {
			if (i |= t.call(r, e, s, o))
				return n
		}), !! i)
	};
	S.include = S.contains = function (e, t) {
		var n = !1;
		return e == null ? n : g && e.indexOf === g ? e.indexOf(t) != -1 : (n = T(e, function (e) {
			return e === t
		}), n)
	}, S.invoke = function (e, t) {
		var n = o.call(arguments, 2);
		return S.map(e, function (e) {
			return (t.call ? t || e : e[t]).apply(e, n)
		})
	}, S.pluck = function (e, t) {
		return S.map(e, function (e) {
			return e[t]
		})
	}, S.max = function (e, t, n) {
		if (!t && S.isArray(e))
			return Math.max.apply(Math, e);
		if (!t && S.isEmpty(e))
			return -Infinity;
		var r = {
			computed: -Infinity
		};
		return x(e, function (e, i, s) {
			var o = t ? t.call(n, e, i, s) : e;
			o >= r.computed && (r = {
				value: e,
				computed: o
			})
		}), r.value
	}, S.min = function (e, t, n) {
		if (!t && S.isArray(e))
			return Math.min.apply(Math, e);
		if (!t && S.isEmpty(e))
			return Infinity;
		var r = {
			computed: Infinity
		};
		return x(e, function (e, i, s) {
			var o = t ? t.call(n, e, i, s) : e;
			o < r.computed && (r = {
				value: e,
				computed: o
			})
		}), r.value
	}, S.shuffle = function (e) {
		var t = [],
			n;
		return x(e, function (e, r, i) {
			r == 0 ? t[0] = e : (n = Math.floor(Math.random() * (r + 1)), t[r] = t[n], t[n] = e)
		}), t
	}, S.sortBy = function (e, t, n) {
		return S.pluck(S.map(e, function (e, r, i) {
			return {
				value: e,
				criteria: t.call(n, e, r, i)
			}
		}).sort(function (e, t) {
			var n = e.criteria,
				r = t.criteria;
			return n < r ? -1 : n > r ? 1 : 0
		}), "value")
	}, S.groupBy = function (e, t) {
		var n = {}, r = S.isFunction(t) ? t : function (e) {
				return e[t]
			};
		return x(e, function (e, t) {
			var i = r(e, t);
			(n[i] || (n[i] = [])).push(e)
		}), n
	}, S.sortedIndex = function (e, t, n) {
		n || (n = S.identity);
		var r = 0,
			i = e.length;
		while (r < i) {
			var s = r + i >> 1;
			n(e[s]) < n(t) ? r = s + 1 : i = s
		}
		return r
	}, S.toArray = function (e) {
		return e ? e.toArray ? e.toArray() : S.isArray(e) ? o.call(e) : S.isArguments(e) ? o.call(e) : S.values(e) : []
	}, S.size = function (e) {
		return S.toArray(e).length
	}, S.first = S.head = function (e, t, n) {
		return t != null && !n ? o.call(e, 0, t) : e[0]
	}, S.initial = function (e, t, n) {
		return o.call(e, 0, e.length - (t == null || n ? 1 : t))
	}, S.last = function (e, t, n) {
		return t != null && !n ? o.call(e, e.length - t) : e[e.length - 1]
	}, S.rest = S.tail = function (e, t, n) {
		return o.call(e, t == null || n ? 1 : t)
	}, S.compact = function (e) {
		return S.filter(e, function (e) {
			return !!e
		})
	}, S.flatten = function (e, t) {
		return S.reduce(e, function (e, n) {
			return S.isArray(n) ? e.concat(t ? n : S.flatten(n)) : (e[e.length] = n, e)
		}, [])
	}, S.without = function (e) {
		return S.difference(e, o.call(arguments, 1))
	}, S.uniq = S.unique = function (e, t, n) {
		var r = n ? S.map(e, n) : e,
			i = [];
		return S.reduce(r, function (n, r, s) {
			if (0 == s || (t === !0 ? S.last(n) != r : !S.include(n, r)))
				n[n.length] = r, i[i.length] = e[s];
			return n
		}, []), i
	}, S.union = function () {
		return S.uniq(S.flatten(arguments, !0))
	}, S.intersection = S.intersect = function (e) {
		var t = o.call(arguments, 1);
		return S.filter(S.uniq(e), function (e) {
			return S.every(t, function (t) {
				return S.indexOf(t, e) >= 0
			})
		})
	}, S.difference = function (e, t) {
		return S.filter(e, function (e) {
			return !S.include(t, e)
		})
	}, S.zip = function () {
		var e = o.call(arguments),
			t = S.max(S.pluck(e, "length")),
			n = new Array(t);
		for (var r = 0; r < t; r++)
			n[r] = S.pluck(e, "" + r);
		return n
	}, S.indexOf = function (e, t, n) {
		if (e == null)
			return -1;
		var r, i;
		if (n)
			return r = S.sortedIndex(e, t), e[r] === t ? r : -1;
		if (g && e.indexOf === g)
			return e.indexOf(t);
		for (r = 0, i = e.length; r < i; r++)
			if (e[r] === t)
				return r;
		return -1
	}, S.lastIndexOf = function (e, t) {
		if (e == null)
			return -1;
		if (y && e.lastIndexOf === y)
			return e.lastIndexOf(t);
		var n = e.length;
		while (n--)
			if (e[n] === t)
				return n;
		return -1
	}, S.range = function (e, t, n) {
		arguments.length <= 1 && (t = e || 0, e = 0), n = arguments[2] || 1;
		var r = Math.max(Math.ceil((t - e) / n), 0),
			i = 0,
			s = new Array(r);
		while (i < r)
			s[i++] = e, e += n;
		return s
	};
	var N = function () {};
	S.bind = function (t, n) {
		var r, i;
		if (t.bind === E && E)
			return E.apply(t, o.call(arguments, 1));
		if (!S.isFunction(t))
			throw new TypeError;
		return i = o.call(arguments, 2), r = function () {
			if (this instanceof r) {
				N.prototype = t.prototype;
				var e = new N,
					s = t.apply(e, i.concat(o.call(arguments)));
				return Object(s) === s ? s : e
			}
			return t.apply(n, i.concat(o.call(arguments)))
		}
	}, S.bindAll = function (e) {
		var t = o.call(arguments, 1);
		return t.length == 0 && (t = S.functions(e)), x(t, function (t) {
			e[t] = S.bind(e[t], e)
		}), e
	}, S.memoize = function (e, t) {
		var n = {};
		return t || (t = S.identity),
		function () {
			var r = t.apply(this, arguments);
			return f.call(n, r) ? n[r] : n[r] = e.apply(this, arguments)
		}
	}, S.delay = function (e, t) {
		var n = o.call(arguments, 2);
		return setTimeout(function () {
			return e.apply(e, n)
		}, t)
	}, S.defer = function (e) {
		return S.delay.apply(S, [e, 1].concat(o.call(arguments, 1)))
	}, S.throttle = function (e, t) {
		var n, r, i, s, o, u = S.debounce(function () {
				o = s = !1
			}, t);
		return function () {
			n = this, r = arguments;
			var a = function () {
				i = null, o && e.apply(n, r), u()
			};
			i || (i = setTimeout(a, t)), s ? o = !0 : e.apply(n, r), u(), s = !0
		}
	}, S.debounce = function (e, t) {
		var n;
		return function () {
			var r = this,
				i = arguments,
				s = function () {
					n = null, e.apply(r, i)
				};
			clearTimeout(n), n = setTimeout(s, t)
		}
	}, S.once = function (e) {
		var t = !1,
			n;
		return function () {
			return t ? n : (t = !0, n = e.apply(this, arguments))
		}
	}, S.wrap = function (e, t) {
		return function () {
			var n = [e].concat(o.call(arguments));
			return t.apply(this, n)
		}
	}, S.compose = function () {
		var e = o.call(arguments);
		return function () {
			var t = o.call(arguments);
			for (var n = e.length - 1; n >= 0; n--)
				t = [e[n].apply(this, t)];
			return t[0]
		}
	}, S.after = function (e, t) {
		return function () {
			if (--e < 1)
				return t.apply(this, arguments)
		}
	}, S.keys = w || function (e) {
		if (e !== Object(e))
			throw new TypeError("Invalid object");
		var t = [];
		for (var n in e)
			f.call(e, n) && (t[t.length] = n);
		return t
	}, S.values = function (e) {
		return S.map(e, S.identity)
	}, S.functions = S.methods = function (e) {
		var t = [];
		for (var n in e)
			S.isFunction(e[n]) && t.push(n);
		return t.sort()
	}, S.extend = function (e) {
		return x(o.call(arguments, 1), function (t) {
			for (var n in t)
				t[n] !== void 0 && (e[n] = t[n])
		}), e
	}, S.defaults = function (e) {
		return x(o.call(arguments, 1), function (t) {
			for (var n in t)
				e[n] == null && (e[n] = t[n])
		}), e
	}, S.clone = function (e) {
		return S.isObject(e) ? S.isArray(e) ? e.slice() : S.extend({}, e) : e
	}, S.tap = function (e, t) {
		return t(e), e
	}, S.isEqual = function (e, t) {
		return C(e, t, [])
	}, S.isEmpty = function (e) {
		if (S.isArray(e) || S.isString(e))
			return e.length === 0;
		for (var t in e)
			if (f.call(e, t))
				return !1;
		return !0
	}, S.isElement = function (e) {
		return !!e && e.nodeType == 1
	}, S.isArray = b || function (e) {
		return a.call(e) == "[object Array]"
	}, S.isObject = function (e) {
		return e === Object(e)
	}, a.call(arguments) == "[object Arguments]" ? S.isArguments = function (e) {
		return a.call(e) == "[object Arguments]"
	} : S.isArguments = function (e) {
		return !!e && !! f.call(e, "callee")
	}, S.isFunction = function (e) {
		return a.call(e) == "[object Function]"
	}, S.isString = function (e) {
		return a.call(e) == "[object String]"
	}, S.isNumber = function (e) {
		return a.call(e) == "[object Number]"
	}, S.isNaN = function (e) {
		return e !== e
	}, S.isBoolean = function (e) {
		return e === !0 || e === !1 || a.call(e) == "[object Boolean]"
	}, S.isDate = function (e) {
		return a.call(e) == "[object Date]"
	}, S.isRegExp = function (e) {
		return a.call(e) == "[object RegExp]"
	}, S.isNull = function (e) {
		return e === null
	}, S.isUndefined = function (e) {
		return e === void 0
	}, S.noConflict = function () {
		return e._ = t, this
	}, S.identity = function (e) {
		return e
	}, S.times = function (e, t, n) {
		for (var r = 0; r < e; r++)
			t.call(n, r)
	}, S.escape = function (e) {
		return ("" + e).replace(/&(?!\w+;|#\d+;|#x[\da-f]+;)/gi, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
	}, S.mixin = function (e) {
		x(S.functions(e), function (t) {
			O(t, S[t] = e[t])
		})
	};
	var k = 0;
	S.uniqueId = function (e) {
		var t = k++;
		return e ? e + t : t
	}, S.templateSettings = {
		evaluate: /<%([\s\S]+?)%>/g,
		interpolate: /<%=([\s\S]+?)%>/g,
		escape: /<%-([\s\S]+?)%>/g
	}, S.template = function (e, t) {
		var n = S.templateSettings,
			r = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(n.escape, function (e, t) {
				return "',_.escape(" + t.replace(/\\'/g, "'") + "),'"
			}).replace(n.interpolate, function (e, t) {
				return "'," + t.replace(/\\'/g, "'") + ",'"
			}).replace(n.evaluate || null, function (e, t) {
				return "');" + t.replace(/\\'/g, "'").replace(/[\r\n\t]/g, " ") + "__p.push('"
			}).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');",
			i = new Function("obj", "_", r);
		return t ? i(t, S) : function (e) {
			return i(e, S)
		}
	};
	var L = function (e) {
		this._wrapped = e
	};
	S.prototype = L.prototype;
	var A = function (e, t) {
		return t ? S(e).chain() : e
	}, O = function (e, t) {
			L.prototype[e] = function () {
				var e = o.call(arguments);
				return u.call(e, this._wrapped), A(t.apply(S, e), this._chain)
			}
		};
	S.mixin(S), x(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (e) {
		var t = r[e];
		L.prototype[e] = function () {
			return t.apply(this._wrapped, arguments), A(this._wrapped, this._chain)
		}
	}), x(["concat", "join", "slice"], function (e) {
		var t = r[e];
		L.prototype[e] = function () {
			return A(t.apply(this._wrapped, arguments), this._chain)
		}
	}), L.prototype.chain = function () {
		return this._chain = !0, this
	}, L.prototype.value = function () {
		return this._wrapped
	}
}(), ! function (e, t) {
	"use strict";
	var n = t.prototype.trim,
		r = t.prototype.trimRight,
		i = t.prototype.trimLeft,
		s = function (e) {
			return e * 1 || 0
		}, o = function (e, t) {
			if (t < 1)
				return "";
			var n = "";
			while (t > 0)
				t & 1 && (n += e), t >>= 1, e += e;
			return n
		}, u = [].slice,
		a = function (e) {
			return e == null ? "\\s" : e.source ? e.source : "[" + p.escapeRegExp(e) + "]"
		}, f = {
			lt: "<",
			gt: ">",
			quot: '"',
			apos: "'",
			amp: "&"
		}, l = {};
	for (var c in f)
		l[f[c]] = c;
	var h = function () {
		function e(e) {
			return Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
		}
		var n = o,
			r = function () {
				return r.cache.hasOwnProperty(arguments[0]) || (r.cache[arguments[0]] = r.parse(arguments[0])), r.format.call(null, r.cache[arguments[0]], arguments)
			};
		return r.format = function (r, i) {
			var s = 1,
				o = r.length,
				u = "",
				a, f = [],
				l, c, p, d, v, m;
			for (l = 0; l < o; l++) {
				u = e(r[l]);
				if (u === "string")
					f.push(r[l]);
				else if (u === "array") {
					p = r[l];
					if (p[2]) {
						a = i[s];
						for (c = 0; c < p[2].length; c++) {
							if (!a.hasOwnProperty(p[2][c]))
								throw new Error(h('[_.sprintf] property "%s" does not exist', p[2][c]));
							a = a[p[2][c]]
						}
					} else
						p[1] ? a = i[p[1]] : a = i[s++];
					if (/[^s]/.test(p[8]) && e(a) != "number")
						throw new Error(h("[_.sprintf] expecting number but found %s", e(a)));
					switch (p[8]) {
					case "b":
						a = a.toString(2);
						break;
					case "c":
						a = t.fromCharCode(a);
						break;
					case "d":
						a = parseInt(a, 10);
						break;
					case "e":
						a = p[7] ? a.toExponential(p[7]) : a.toExponential();
						break;
					case "f":
						a = p[7] ? parseFloat(a).toFixed(p[7]) : parseFloat(a);
						break;
					case "o":
						a = a.toString(8);
						break;
					case "s":
						a = (a = t(a)) && p[7] ? a.substring(0, p[7]) : a;
						break;
					case "u":
						a = Math.abs(a);
						break;
					case "x":
						a = a.toString(16);
						break;
					case "X":
						a = a.toString(16).toUpperCase()
					}
					a = /[def]/.test(p[8]) && p[3] && a >= 0 ? "+" + a : a, v = p[4] ? p[4] == "0" ? "0" : p[4].charAt(1) : " ", m = p[6] - t(a).length, d = p[6] ? n(v, m) : "", f.push(p[5] ? a + d : d + a)
				}
			}
			return f.join("")
		}, r.cache = {}, r.parse = function (e) {
			var t = e,
				n = [],
				r = [],
				i = 0;
			while (t) {
				if ((n = /^[^\x25]+/.exec(t)) !== null)
					r.push(n[0]);
				else if ((n = /^\x25{2}/.exec(t)) !== null)
					r.push("%");
				else {
					if ((n = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(t)) === null)
						throw new Error("[_.sprintf] huh?");
					if (n[2]) {
						i |= 1;
						var s = [],
							o = n[2],
							u = [];
						if ((u = /^([a-z_][a-z_\d]*)/i.exec(o)) === null)
							throw new Error("[_.sprintf] huh?");
						s.push(u[1]);
						while ((o = o.substring(u[0].length)) !== "")
							if ((u = /^\.([a-z_][a-z_\d]*)/i.exec(o)) !== null)
								s.push(u[1]);
							else {
								if ((u = /^\[(\d+)\]/.exec(o)) === null)
									throw new Error("[_.sprintf] huh?");
								s.push(u[1])
							}
						n[2] = s
					} else
						i |= 2;
					if (i === 3)
						throw new Error("[_.sprintf] mixing positional and named placeholders is not (yet) supported");
					r.push(n)
				}
				t = t.substring(n[0].length)
			}
			return r
		}, r
	}(),
		p = {
			VERSION: "2.3.0",
			isBlank: function (e) {
				return e == null && (e = ""), /^\s*$/.test(e)
			},
			stripTags: function (e) {
				return e == null ? "" : t(e).replace(/<\/?[^>]+>/g, "")
			},
			capitalize: function (e) {
				return e = e == null ? "" : t(e), e.charAt(0).toUpperCase() + e.slice(1)
			},
			chop: function (e, n) {
				return e == null ? [] : (e = t(e), n = ~~n, n > 0 ? e.match(new RegExp(".{1," + n + "}", "g")) : [e])
			},
			clean: function (e) {
				return p.strip(e).replace(/\s+/g, " ")
			},
			count: function (e, n) {
				return e == null || n == null ? 0 : t(e).split(n).length - 1
			},
			chars: function (e) {
				return e == null ? [] : t(e).split("")
			},
			swapCase: function (e) {
				return e == null ? "" : t(e).replace(/\S/g, function (e) {
					return e === e.toUpperCase() ? e.toLowerCase() : e.toUpperCase()
				})
			},
			escapeHTML: function (e) {
				return e == null ? "" : t(e).replace(/[&<>"']/g, function (e) {
					return "&" + l[e] + ";"
				})
			},
			unescapeHTML: function (e) {
				return e == null ? "" : t(e).replace(/\&([^;]+);/g, function (e, n) {
					var r;
					return n in f ? f[n] : (r = n.match(/^#x([\da-fA-F]+)$/)) ? t.fromCharCode(parseInt(r[1], 16)) : (r = n.match(/^#(\d+)$/)) ? t.fromCharCode(~~r[1]) : e
				})
			},
			escapeRegExp: function (e) {
				return e == null ? "" : t(e).replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1")
			},
			splice: function (e, t, n, r) {
				var i = p.chars(e);
				return i.splice(~~t, ~~n, r), i.join("")
			},
			insert: function (e, t, n) {
				return p.splice(e, t, 0, n)
			},
			include: function (e, n) {
				return n === "" ? !0 : e == null ? !1 : t(e).indexOf(n) !== -1
			},
			join: function () {
				var e = u.call(arguments),
					t = e.shift();
				return t == null && (t = ""), e.join(t)
			},
			lines: function (e) {
				return e == null ? [] : t(e).split("\n")
			},
			reverse: function (e) {
				return p.chars(e).reverse().join("")
			},
			startsWith: function (e, n) {
				return n === "" ? !0 : e == null || n == null ? !1 : (e = t(e), n = t(n), e.length >= n.length && e.slice(0, n.length) === n)
			},
			endsWith: function (e, n) {
				return n === "" ? !0 : e == null || n == null ? !1 : (e = t(e), n = t(n), e.length >= n.length && e.slice(e.length - n.length) === n)
			},
			succ: function (e) {
				return e == null ? "" : (e = t(e), e.slice(0, -1) + t.fromCharCode(e.charCodeAt(e.length - 1) + 1))
			},
			titleize: function (e) {
				return e == null ? "" : t(e).replace(/(?:^|\s)\S/g, function (e) {
					return e.toUpperCase()
				})
			},
			camelize: function (e) {
				return p.trim(e).replace(/[-_\s]+(.)?/g, function (e, t) {
					return t.toUpperCase()
				})
			},
			underscored: function (e) {
				return p.trim(e).replace(/([a-z\d])([A-Z]+)/g, "$1_$2").replace(/[-\s]+/g, "_").toLowerCase()
			},
			dasherize: function (e) {
				return p.trim(e).replace(/([A-Z])/g, "-$1").replace(/[-_\s]+/g, "-").toLowerCase()
			},
			classify: function (e) {
				return p.titleize(t(e).replace(/_/g, " ")).replace(/\s/g, "")
			},
			humanize: function (e) {
				return p.capitalize(p.underscored(e).replace(/_id$/, "").replace(/_/g, " "))
			},
			trim: function (e, r) {
				return e == null ? "" : !r && n ? n.call(e) : (r = a(r), t(e).replace(new RegExp("^" + r + "+|" + r + "+$", "g"), ""))
			},
			ltrim: function (e, n) {
				return e == null ? "" : !n && i ? i.call(e) : (n = a(n), t(e).replace(new RegExp("^" + n + "+"), ""))
			},
			rtrim: function (e, n) {
				return e == null ? "" : !n && r ? r.call(e) : (n = a(n), t(e).replace(new RegExp(n + "+$"), ""))
			},
			truncate: function (e, n, r) {
				return e == null ? "" : (e = t(e), r = r || "...", n = ~~n, e.length > n ? e.slice(0, n) + r : e)
			},
			prune: function (e, n, r) {
				if (e == null)
					return "";
				e = t(e), n = ~~n, r = r != null ? t(r) : "...";
				if (e.length <= n)
					return e;
				var i = function (e) {
					return e.toUpperCase() !== e.toLowerCase() ? "A" : " "
				}, s = e.slice(0, n + 1).replace(/.(?=\W*\w*$)/g, i);
				return s.slice(s.length - 2).match(/\w\w/) ? s = s.replace(/\s*\S+$/, "") : s = p.rtrim(s.slice(0, s.length - 1)), (s + r).length > e.length ? e : e.slice(0, s.length) + r
			},
			words: function (e, t) {
				return p.isBlank(e) ? [] : p.trim(e, t).split(t || /\s+/)
			},
			pad: function (e, n, r, i) {
				e = e == null ? "" : t(e), n = ~~n;
				var s = 0;
				r ? r.length > 1 && (r = r.charAt(0)) : r = " ";
				switch (i) {
				case "right":
					return s = n - e.length, e + o(r, s);
				case "both":
					return s = n - e.length, o(r, Math.ceil(s / 2)) + e + o(r, Math.floor(s / 2));
				default:
					return s = n - e.length, o(r, s) + e
				}
			},
			lpad: function (e, t, n) {
				return p.pad(e, t, n)
			},
			rpad: function (e, t, n) {
				return p.pad(e, t, n, "right")
			},
			lrpad: function (e, t, n) {
				return p.pad(e, t, n, "both")
			},
			sprintf: h,
			vsprintf: function (e, t) {
				return t.unshift(e), h.apply(null, t)
			},
			toNumber: function (e, n) {
				if (e == null || e == "")
					return 0;
				e = t(e);
				var r = s(s(e).toFixed(~~n));
				return r === 0 && !e.match(/^0+$/) ? Number.NaN : r
			},
			numberFormat: function (e, t, n, r) {
				if (isNaN(e) || e == null)
					return "";
				e = e.toFixed(~~t), r = r || ",";
				var i = e.split("."),
					s = i[0],
					o = i[1] ? (n || ".") + i[1] : "";
				return s.replace(/(\d)(?=(?:\d{3})+$)/g, "$1" + r) + o
			},
			strRight: function (e, n) {
				if (e == null)
					return "";
				e = t(e), n = n != null ? t(n) : n;
				var r = n ? e.indexOf(n) : -1;
				return~ r ? e.slice(r + n.length, e.length) : e
			},
			strRightBack: function (e, n) {
				if (e == null)
					return "";
				e = t(e), n = n != null ? t(n) : n;
				var r = n ? e.lastIndexOf(n) : -1;
				return~ r ? e.slice(r + n.length, e.length) : e
			},
			strLeft: function (e, n) {
				if (e == null)
					return "";
				e = t(e), n = n != null ? t(n) : n;
				var r = n ? e.indexOf(n) : -1;
				return~ r ? e.slice(0, r) : e
			},
			strLeftBack: function (e, t) {
				if (e == null)
					return "";
				e += "", t = t != null ? "" + t : t;
				var n = e.lastIndexOf(t);
				return~ n ? e.slice(0, n) : e
			},
			toSentence: function (e, t, n, r) {
				t = t || ", ", n = n || " and ";
				var i = e.slice(),
					s = i.pop();
				return e.length > 2 && r && (n = p.rtrim(t) + n), i.length ? i.join(t) + n + s : s
			},
			toSentenceSerial: function () {
				var e = u.call(arguments);
				return e[3] = !0, p.toSentence.apply(p, e)
			},
			slugify: function (e) {
				if (e == null)
					return "";
				var n = "ąàáäâãåæćęèéëêìíïîłńòóöôõøùúüûñçżź",
					r = "aaaaaaaaceeeeeiiiilnoooooouuuunczz",
					i = new RegExp(a(n), "g");
				return e = t(e).toLowerCase().replace(i, function (e) {
					var t = n.indexOf(e);
					return r.charAt(t) || "-"
				}), p.dasherize(e.replace(/[^\w\s-]/g, ""))
			},
			surround: function (e, t) {
				return [t, e, t].join("")
			},
			quote: function (e) {
				return p.surround(e, '"')
			},
			exports: function () {
				var e = {};
				for (var t in this) {
					if (!this.hasOwnProperty(t) || t.match(/^(?:include|contains|reverse)$/))
						continue;
					e[t] = this[t]
				}
				return e
			},
			repeat: function (e, n, r) {
				if (e == null)
					return "";
				n = ~~n;
				if (r == null)
					return o(t(e), n);
				for (var i = []; n > 0; i[--n] = e)
				;
				return i.join(r)
			},
			levenshtein: function (e, n) {
				if (e == null && n == null)
					return 0;
				if (e == null)
					return t(n).length;
				if (n == null)
					return t(e).length;
				e = t(e), n = t(n);
				var r = [],
					i, s;
				for (var o = 0; o <= n.length; o++)
					for (var u = 0; u <= e.length; u++)
						o && u ? e.charAt(u - 1) === n.charAt(o - 1) ? s = i : s = Math.min(r[u], r[u - 1], i) + 1 : s = o + u, i = r[u], r[u] = s;
				return r.pop()
			}
		};
	p.strip = p.trim, p.lstrip = p.ltrim, p.rstrip = p.rtrim, p.center = p.lrpad, p.rjust = p.lpad, p.ljust = p.rpad, p.contains = p.include, p.q = p.quote, typeof exports != "undefined" ? (typeof module != "undefined" && module.exports && (module.exports = p), exports._s = p) : typeof define == "function" && define.amd ? define("underscore.string", [], function () {
		return p
	}) : (e._ = e._ || {}, e._.string = e._.str = p)
}(this, String),
function (e, t) {
	var n = {}, r = Array.prototype,
		i = Object.prototype,
		s = i.hasOwnProperty,
		o = i.toString,
		u = r.forEach,
		a = r.slice,
		f = function (e, t, r) {
			var i, o, a;
			if (e == null)
				return;
			if (u && e.forEach === u)
				e.forEach(t, r);
			else if (e.length === +e.length) {
				for (o = 0, a = e.length; o < a; o++)
					if (o in e && t.call(r, e[o], o, e) === n)
						return
			} else
				for (i in e)
					if (s.call(e, i) && t.call(r, e[i], i, e) === n)
						return
		}, l = function (e) {
			return !!(e && e.constructor && e.call && e.apply)
		}, c = function (e) {
			return f(a.call(arguments, 1), function (t) {
				var n;
				for (n in t)
					t[n] !== void 0 && (e[n] = t[n])
			}), e
		}, h = {
			"[object Array]": "array",
			"[object Function]": "function"
		}, p = function (e) {
			return e == null ? String(e) : h[o.call(e)] || "object"
		}, d = "done fail isResolved isRejected promise then always pipe".split(" "),
		v = {};
	v._Deferred = function () {
		var e = [],
			t, n, r, i = {
				done: function () {
					if (!r) {
						var n = arguments,
							s, o, u, a, f;
						t && (f = t, t = 0);
						for (s = 0, o = n.length; s < o; s++)
							u = n[s], a = p(u), a === "array" ? i.done.apply(i, u) : a === "function" && e.push(u);
						f && i.resolveWith(f[0], f[1])
					}
					return this
				},
				resolveWith: function (i, s) {
					if (!r && !t && !n) {
						s = s || [], n = 1;
						try {
							while (e[0])
								e.shift().apply(i, s)
						} finally {
							t = [i, s], n = 0
						}
					}
					return this
				},
				resolve: function () {
					return i.resolveWith(this, arguments), this
				},
				isResolved: function () {
					return !!n || !! t
				},
				cancel: function () {
					return r = 1, e = [], this
				}
			};
		return i
	}, v.Deferred = function (e) {
		var t = new v._Deferred,
			n = new v._Deferred,
			r;
		return c(t, {
			then: function (e, n) {
				return t.done(e).fail(n), this
			},
			always: function () {
				return t.done.apply(t, arguments).fail.apply(this, arguments)
			},
			fail: n.done,
			rejectWith: n.resolveWith,
			reject: n.resolve,
			isRejected: n.isResolved,
			pipe: function (e, n) {
				return v.Deferred(function (r) {
					f({
						done: [e, "resolve"],
						fail: [n, "reject"]
					}, function (e, n) {
						var i = e[0],
							s = e[1],
							o;
						l(i) ? t[n](function () {
							o = i.apply(this, arguments), o && l(o.promise) ? o.promise().then(r.resolve, r.reject) : r[s + "With"](this === t ? r : this, [o])
						}) : t[n](r[s])
					})
				}).promise()
			},
			promise: function (e) {
				var n;
				if (e == null) {
					if (r)
						return r;
					r = e = {}
				}
				n = d.length;
				while (n--)
					e[d[n]] = t[d[n]];
				return e
			}
		}), t.done(n.cancel).fail(t.cancel), delete t.cancel, e && e.call(t, t), t
	}, v.when = function (e) {
		function o(e) {
			return function (n) {
				t[e] = arguments.length > 1 ? a.call(arguments, 0) : n, --i || s.resolveWith(s, a.call(t, 0))
			}
		}
		var t = arguments,
			n = 0,
			r = t.length,
			i = r,
			s = r <= 1 && e && l(e.promise) ? e : v.Deferred();
		if (r > 1) {
			for (; n < r; n++)
				t[n] && l(t[n].promise) ? t[n].promise().then(o(n), s.reject) : --i;
			i || s.resolveWith(s, t)
		} else
			s !== e && s.resolveWith(s, r ? [e] : []);
		return s.promise()
	}, typeof t != "undefined" && t.exports ? t.exports = v : typeof e._ != "undefined" ? e._.mixin(v) : e._ = v
}(this, this.module),
function () {
	var e = this,
		t = e.Backbone,
		n;
	typeof exports != "undefined" ? n = exports : n = e.Backbone = {}, n.VERSION = "0.5.3";
	var r = e._;
	!r && typeof require != "undefined" && (r = require("underscore")._);
	var i = e.jQuery || e.Zepto;
	n.noConflict = function () {
		return e.Backbone = t, this
	}, n.emulateHTTP = !1, n.emulateJSON = !1, n.Events = {
		bind: function (e, t, n) {
			var r = this._callbacks || (this._callbacks = {}),
				i = r[e] || (r[e] = []);
			return i.push([t, n]), this
		},
		unbind: function (e, t) {
			var n;
			if (!e)
				this._callbacks = {};
			else if (n = this._callbacks)
				if (!t)
					n[e] = [];
				else {
					var r = n[e];
					if (!r)
						return this;
					for (var i = 0, s = r.length; i < s; i++)
						if (r[i] && t === r[i][0]) {
							r[i] = null;
							break
						}
				}
			return this
		},
		trigger: function (e) {
			var t, n, r, i, s, o = 2;
			if (!(n = this._callbacks))
				return this;
			while (o--) {
				r = o ? e : "all";
				if (t = n[r])
					for (var u = 0, a = t.length; u < a; u++)
						(i = t[u]) ? (s = o ? Array.prototype.slice.call(arguments, 1) : arguments, i[0].apply(i[1] || this, s)) : (t.splice(u, 1), u--, a--)
			}
			return this
		}
	}, n.Model = function (e, t) {
		var n;
		e || (e = {});
		if (n = this.defaults)
			r.isFunction(n) && (n = n.call(this)), e = r.extend({}, n, e);
		this.attributes = {}, this._escapedAttributes = {}, this.cid = r.uniqueId("c"), this.set(e, {
			silent: !0
		}), this._changed = !1, this._previousAttributes = r.clone(this.attributes), t && t.collection && (this.collection = t.collection), this.initialize(e, t)
	}, r.extend(n.Model.prototype, n.Events, {
		_previousAttributes: null,
		_changed: !1,
		idAttribute: "id",
		initialize: function () {},
		toJSON: function () {
			return r.clone(this.attributes)
		},
		get: function (e) {
			return this.attributes[e]
		},
		escape: function (e) {
			var t;
			if (t = this._escapedAttributes[e])
				return t;
			var n = this.attributes[e];
			return this._escapedAttributes[e] = x(n == null ? "" : "" + n)
		},
		has: function (e) {
			return this.attributes[e] != null
		},
		set: function (e, t) {
			t || (t = {});
			if (!e)
				return this;
			e.attributes && (e = e.attributes);
			var n = this.attributes,
				i = this._escapedAttributes;
			if (!t.silent && this.validate && !this._performValidation(e, t))
				return !1;
			this.idAttribute in e && (this.id = e[this.idAttribute]);
			var s = this._changing;
			this._changing = !0;
			for (var o in e) {
				var u = e[o];
				r.isEqual(n[o], u) || (n[o] = u, delete i[o], this._changed = !0, t.silent || this.trigger("change:" + o, this, u, t))
			}
			return !s && !t.silent && this._changed && this.change(t), this._changing = !1, this
		},
		unset: function (e, t) {
			if (e in this.attributes) {
				t || (t = {});
				var n = this.attributes[e],
					r = {};
				return r[e] = void 0, !t.silent && this.validate && !this._performValidation(r, t) ? !1 : (delete this.attributes[e], delete this._escapedAttributes[e], e == this.idAttribute && delete this.id, this._changed = !0, t.silent || (this.trigger("change:" + e, this, void 0, t), this.change(t)), this)
			}
			return this
		},
		clear: function (e) {
			e || (e = {});
			var t, n = this.attributes,
				r = {};
			for (t in n)
				r[t] = void 0;
			if (!e.silent && this.validate && !this._performValidation(r, e))
				return !1;
			this.attributes = {}, this._escapedAttributes = {}, this._changed = !0;
			if (!e.silent) {
				for (t in n)
					this.trigger("change:" + t, this, void 0, e);
				this.change(e)
			}
			return this
		},
		fetch: function (e) {
			e || (e = {});
			var t = this,
				r = e.success;
			return e.success = function (n, i, s) {
				if (!t.set(t.parse(n, s), e))
					return !1;
				r && r(t, n)
			}, e.error = S(e.error, t, e), (this.sync || n.sync).call(this, "read", this, e)
		},
		save: function (e, t) {
			t || (t = {});
			if (e && !this.set(e, t))
				return !1;
			var r = this,
				i = t.success;
			t.success = function (e, n, s) {
				if (!r.set(r.parse(e, s), t))
					return !1;
				i && i(r, e, s)
			}, t.error = S(t.error, r, t);
			var s = this.isNew() ? "create" : "update";
			return (this.sync || n.sync).call(this, s, this, t)
		},
		destroy: function (e) {
			e || (e = {});
			if (this.isNew())
				return this.trigger("destroy", this, this.collection, e);
			var t = this,
				r = e.success;
			return e.success = function (n) {
				t.trigger("destroy", t, t.collection, e), r && r(t, n)
			}, e.error = S(e.error, t, e), (this.sync || n.sync).call(this, "delete", this, e)
		},
		url: function () {
			var e = w(this.collection) || this.urlRoot || E();
			return this.isNew() ? e : e + (e.charAt(e.length - 1) == "/" ? "" : "/") + encodeURIComponent(this.id)
		},
		parse: function (e, t) {
			return e
		},
		clone: function () {
			return new this.constructor(this)
		},
		isNew: function () {
			return this.id == null
		},
		change: function (e) {
			this.trigger("change", this, e), this._previousAttributes = r.clone(this.attributes), this._changed = !1
		},
		hasChanged: function (e) {
			return e ? this._previousAttributes[e] != this.attributes[e] : this._changed
		},
		changedAttributes: function (e) {
			e || (e = this.attributes);
			var t = this._previousAttributes,
				n = !1;
			for (var i in e)
				r.isEqual(t[i], e[i]) || (n = n || {}, n[i] = e[i]);
			return n
		},
		previous: function (e) {
			return !e || !this._previousAttributes ? null : this._previousAttributes[e]
		},
		previousAttributes: function () {
			return r.clone(this._previousAttributes)
		},
		_performValidation: function (e, t) {
			var n = this.validate(e);
			return n ? (t.error ? t.error(this, n, t) : this.trigger("error", this, n, t), !1) : !0
		}
	}), n.Collection = function (e, t) {
		t || (t = {}), t.comparator && (this.comparator = t.comparator), r.bindAll(this, "_onModelEvent", "_removeReference"), this._reset(), e && this.reset(e, {
			silent: !0
		}), this.initialize.apply(this, arguments)
	}, r.extend(n.Collection.prototype, n.Events, {
		model: n.Model,
		initialize: function () {},
		toJSON: function () {
			return this.map(function (e) {
				return e.toJSON()
			})
		},
		add: function (e, t) {
			if (r.isArray(e))
				for (var n = 0, i = e.length; n < i; n++)
					this._add(e[n], t);
			else
				this._add(e, t);
			return this
		},
		remove: function (e, t) {
			if (r.isArray(e))
				for (var n = 0, i = e.length; n < i; n++)
					this._remove(e[n], t);
			else
				this._remove(e, t);
			return this
		},
		get: function (e) {
			return e == null ? null : this._byId[e.id != null ? e.id : e]
		},
		getByCid: function (e) {
			return e && this._byCid[e.cid || e]
		},
		at: function (e) {
			return this.models[e]
		},
		sort: function (e) {
			e || (e = {});
			if (!this.comparator)
				throw new Error("Cannot sort a set without a comparator");
			return this.models = this.sortBy(this.comparator), e.silent || this.trigger("reset", this, e), this
		},
		pluck: function (e) {
			return r.map(this.models, function (t) {
				return t.get(e)
			})
		},
		reset: function (e, t) {
			return e || (e = []), t || (t = {}), this.each(this._removeReference), this._reset(), this.add(e, {
				silent: !0
			}), t.silent || this.trigger("reset", this, t), this
		},
		fetch: function (e) {
			e || (e = {});
			var t = this,
				r = e.success;
			return e.success = function (n, i, s) {
				t[e.add ? "add" : "reset"](t.parse(n, s), e), r && r(t, n)
			}, e.error = S(e.error, t, e), (this.sync || n.sync).call(this, "read", this, e)
		},
		create: function (e, t) {
			var n = this;
			t || (t = {}), e = this._prepareModel(e, t);
			if (!e)
				return !1;
			var r = t.success;
			return t.success = function (e, i, s) {
				n.add(e, t), r && r(e, i, s)
			}, e.save(null, t), e
		},
		parse: function (e, t) {
			return e
		},
		chain: function () {
			return r(this.models).chain()
		},
		_reset: function (e) {
			this.length = 0, this.models = [], this._byId = {}, this._byCid = {}
		},
		_prepareModel: function (e, t) {
			if (e instanceof n.Model)
				e.collection || (e.collection = this);
			else {
				var r = e;
				e = new this.model(r, {
					collection: this
				}), e.validate && !e._performValidation(r, t) && (e = !1)
			}
			return e
		},
		_add: function (e, t) {
			t || (t = {}), e = this._prepareModel(e, t);
			if (!e)
				return !1;
			var n = this.getByCid(e);
			if (n)
				throw new Error(["Can't add the same model to a set twice", n.id]);
			this._byId[e.id] = e, this._byCid[e.cid] = e;
			var r = t.at != null ? t.at : this.comparator ? this.sortedIndex(e, this.comparator) : this.length;
			return this.models.splice(r, 0, e), e.bind("all", this._onModelEvent), this.length++, t.silent || e.trigger("add", e, this, t), e
		},
		_remove: function (e, t) {
			return t || (t = {}), e = this.getByCid(e) || this.get(e), e ? (delete this._byId[e.id], delete this._byCid[e.cid], this.models.splice(this.indexOf(e), 1), this.length--, t.silent || e.trigger("remove", e, this, t), this._removeReference(e), e) : null
		},
		_removeReference: function (e) {
			this == e.collection && delete e.collection, e.unbind("all", this._onModelEvent)
		},
		_onModelEvent: function (e, t, n, r) {
			if ((e == "add" || e == "remove") && n != this)
				return;
			e == "destroy" && this._remove(t, r), t && e === "change:" + t.idAttribute && (delete this._byId[t.previous(t.idAttribute)], this._byId[t.id] = t), this.trigger.apply(this, arguments)
		}
	});
	var s = ["forEach", "each", "map", "reduce", "reduceRight", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "sortBy", "sortedIndex", "toArray", "size", "first", "rest", "last", "without", "indexOf", "lastIndexOf", "isEmpty", "groupBy"];
	r.each(s, function (e) {
		n.Collection.prototype[e] = function () {
			return r[e].apply(r, [this.models].concat(r.toArray(arguments)))
		}
	}), n.Router = function (e) {
		e || (e = {}), e.routes && (this.routes = e.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
	};
	var o = /:([\w\d]+)/g,
		u = /\*([\w\d]+)/g,
		a = /[-[\]{}()+?.,\\^$|#\s]/g;
	r.extend(n.Router.prototype, n.Events, {
		initialize: function () {},
		route: function (e, t, i) {
			n.history || (n.history = new n.History), r.isRegExp(e) || (e = this._routeToRegExp(e)), n.history.route(e, r.bind(function (n) {
				var r = this._extractParameters(e, n);
				i.apply(this, r), this.trigger.apply(this, ["route:" + t].concat(n, r))
			}, this))
		},
		navigate: function (e, t) {
			n.history.navigate(e, t)
		},
		_bindRoutes: function () {
			if (!this.routes)
				return;
			var e = [];
			for (var t in this.routes)
				e.unshift([t, this.routes[t]]);
			for (var n = 0, r = e.length; n < r; n++)
				this.route(e[n][0], e[n][1], this[e[n][1]])
		},
		_routeToRegExp: function (e) {
			return e = e.replace(a, "\\$&").replace(o, "([^/]*)").replace(u, "(.*?)"), new RegExp("^" + e + "$")
		},
		_extractParameters: function (e, t) {
			return e.exec(t).slice(1)
		}
	}), n.History = function () {
		this.handlers = [], r.bindAll(this, "checkUrl")
	};
	var f = /^#*/,
		l = /\?.*/,
		c = /msie [\w.]+/,
		h = !1;
	r.extend(n.History.prototype, {
		interval: 50,
		getFragment: function (e, t) {
			if (e == null)
				if (this._hasPushState || t) {
					e = window.location.pathname;
					var n = window.location.search;
					n && (e += n), e.indexOf(this.options.root) == 0 && (e = e.substr(this.options.root.length))
				} else
					e = window.location.hash;
			return decodeURIComponent(e.replace(f, "").replace(l, ""))
		},
		start: function (e) {
			if (h)
				throw new Error("Backbone.history has already been started");
			this.options = r.extend({}, {
				root: "/"
			}, this.options, e), this._wantsPushState = !! this.options.pushState, this._hasPushState = !! (this.options.pushState && window.history && window.history.pushState);
			var t = this.getFragment(),
				n = document.documentMode,
				s = c.exec(navigator.userAgent.toLowerCase()) && (!n || n <= 7);
			s && (this.iframe = i('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(t)), this._hasPushState ? i(window).bind("popstate", this.checkUrl) : "onhashchange" in window && !s ? i(window).bind("hashchange", this.checkUrl) : setInterval(this.checkUrl, this.interval), this.fragment = t, h = !0;
			var o = window.location,
				u = o.pathname == this.options.root;
			if (this._wantsPushState && !this._hasPushState && !u)
				return this.fragment = this.getFragment(null, !0), window.location.replace(this.options.root + "#" + this.fragment), !0;
			this._wantsPushState && this._hasPushState && u && o.hash && (this.fragment = o.hash.replace(f, ""), window.history.replaceState({}, document.title, o.protocol + "//" + o.host + this.options.root + this.fragment));
			if (!this.options.silent)
				return this.loadUrl()
		},
		route: function (e, t) {
			this.handlers.unshift({
				route: e,
				callback: t
			})
		},
		checkUrl: function (e) {
			var t = this.getFragment();
			t == this.fragment && this.iframe && (t = this.getFragment(this.iframe.location.hash));
			if (t == this.fragment || t == decodeURIComponent(this.fragment))
				return !1;
			this.iframe && this.navigate(t), this.loadUrl() || this.loadUrl(window.location.hash)
		},
		loadUrl: function (e) {
			var t = this.fragment = this.getFragment(e),
				n = r.any(this.handlers, function (e) {
					if (e.route.test(t))
						return e.callback(t), !0
				});
			return n
		},
		navigate: function (e, t) {
			var n = (e || "").replace(l, "").replace(f, "");
			if (this.fragment == n || this.fragment == decodeURIComponent(n))
				return;
			if (this._hasPushState) {
				var r = window.location;
				n.indexOf(this.options.root) != 0 && (n = this.options.root + n), this.fragment = n, window.history.pushState({}, document.title, r.protocol + "//" + r.host + n)
			} else
				window.location.hash = this.fragment = n, this.iframe && n != this.getFragment(this.iframe.location.hash) && (this.iframe.document.open().close(), this.iframe.location.hash = n);
			t && this.loadUrl(e)
		}
	}), n.View = function (e) {
		this.cid = r.uniqueId("view"), this._configure(e || {}), this._ensureElement(), this.delegateEvents(), this.initialize.apply(this, arguments)
	};
	var p = function (e) {
		return i(e, this.el)
	}, d = /^(\S+)\s*(.*)$/,
		v = ["model", "collection", "el", "id", "attributes", "className", "tagName"];
	r.extend(n.View.prototype, n.Events, {
		tagName: "div",
		$: p,
		initialize: function () {},
		render: function () {
			return this
		},
		remove: function () {
			return i(this.el).remove(), this
		},
		make: function (e, t, n) {
			var r = document.createElement(e);
			return t && i(r).attr(t), n && i(r).html(n), r
		},
		delegateEvents: function (e) {
			if (!e && !(e = this.events))
				return;
			r.isFunction(e) && (e = e.call(this)), i(this.el).unbind(".delegateEvents" + this.cid);
			for (var t in e) {
				var n = this[e[t]];
				if (!n)
					throw new Error('Event "' + e[t] + '" does not exist');
				var s = t.match(d),
					o = s[1],
					u = s[2];
				n = r.bind(n, this), o += ".delegateEvents" + this.cid, u === "" ? i(this.el).bind(o, n) : i(this.el).delegate(u, o, n)
			}
		},
		_configure: function (e) {
			this.options && (e = r.extend({}, this.options, e));
			for (var t = 0, n = v.length; t < n; t++) {
				var i = v[t];
				e[i] && (this[i] = e[i])
			}
			this.options = e
		},
		_ensureElement: function () {
			if (!this.el) {
				var e = this.attributes || {};
				this.id && (e.id = this.id), this.className && (e["class"] = this.className), this.el = this.make(this.tagName, e)
			} else
				r.isString(this.el) && (this.el = i(this.el).get(0))
		}
	});
	var m = function (e, t) {
		var n = b(this, e, t);
		return n.extend = this.extend, n
	};
	n.Model.extend = n.Collection.extend = n.Router.extend = n.View.extend = m;
	var g = {
		create: "POST",
		update: "PUT",
		"delete": "DELETE",
		read: "GET"
	};
	n.sync = function (e, t, s) {
		var o = g[e],
			u = r.extend({
				type: o,
				dataType: "json"
			}, s);
		return u.url || (u.url = w(t) || E()), !u.data && t && (e == "create" || e == "update") && (u.contentType = "application/json", u.data = JSON.stringify(t.toJSON())), n.emulateJSON && (u.contentType = "application/x-www-form-urlencoded", u.data = u.data ? {
			model: u.data
		} : {}), n.emulateHTTP && (o === "PUT" || o === "DELETE") && (n.emulateJSON && (u.data._method = o), u.type = "POST", u.beforeSend = function (e) {
			e.setRequestHeader("X-HTTP-Method-Override", o)
		}), u.type !== "GET" && !n.emulateJSON && (u.processData = !1), i.ajax(u)
	};
	var y = function () {}, b = function (e, t, n) {
			var i;
			return t && t.hasOwnProperty("constructor") ? i = t.constructor : i = function () {
				return e.apply(this, arguments)
			}, r.extend(i, e), y.prototype = e.prototype, i.prototype = new y, t && r.extend(i.prototype, t), n && r.extend(i, n), i.prototype.constructor = i, i.__super__ = e.prototype, i
		}, w = function (e) {
			return !e || !e.url ? null : r.isFunction(e.url) ? e.url() : e.url
		}, E = function () {
			throw new Error('A "url" property or function must be specified')
		}, S = function (e, t, n) {
			return function (r) {
				e ? e(t, r, n) : t.trigger("error", t, r, n)
			}
		}, x = function (e) {
			return e.replace(/&(?!\w+;|#\d+;|#x[\da-f]+;)/gi, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
		}
}.call(this),
function (e, t) {
	var n = e.parse,
		r = [1, 4, 5, 6, 7, 10, 11];
	e.parse = function (i) {
		var s, o, u = 0;
		if (o = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/.exec(i)) {
			for (var a = 0, f; f = r[a]; ++a)
				o[f] = +o[f] || 0;
			o[2] = (+o[2] || 1) - 1, o[3] = +o[3] || 1, o[8] !== "Z" && o[9] !== t && (u = o[10] * 60 + o[11], o[9] === "+" && (u = 0 - u)), s = e.UTC(o[1], o[2], o[3], o[4], o[5] + u, o[6], o[7])
		} else
			s = n ? n(i) : NaN;
		return s
	}
}(Date);
var hexcase = 0,
	b64pad = "",
	hexcase = 0,
	b64pad = "";
(function (e) {
	function i(e) {
		return e || (e = "en-US"), e = e.replace(/_/, "-").toLowerCase(), e.length > 3 && (e = e.substring(0, 3) + e.substring(3).toUpperCase()), e
	}
	var t = {}, n = {};
	e.localize = function (r, s) {
		function f(t, n, r) {
			r = r || 1;
			var i;
			s && s.loadBase && r == 1 ? (u = {}, i = t + ".json" + e.localize.cachebuster, l(i, t, n, r)) : r == 1 ? (u = {}, f(t, n, 2)) : r == 2 && n.length >= 2 ? (i = t + "-" + n.substring(0, 2) + ".json" + e.localize.cachebuster, l(i, t, n, r)) : r == 3 && n.length >= 5 && (i = t + "-" + n.substring(0, 5) + ".json" + e.localize.cachebuster, l(i, t, n, r))
		}

		function l(r, i, o, f) {
			function l(n, i, s) {
				!e.localize.defaultLang && o === "en" && (e.localize.defaultLang = "en", e.localize.defaultLangData = n), u = e.extend({}, e.localize.defaultLangData, u, n), t[r] = u, p(u)
			}

			function c(e, t, i) {
				delete n[r], a.reject(e, t, i)
			}
			s.pathPrefix && (r = s.pathPrefix + "/" + r);
			if (t[r])
				p(t[r]);
			else if (!n[r])
				if (e.localize.jsonpCallback) {
					var h = e.localize.jsonpCallback + o;
					n[r] = e.ajax({
						url: window.GS.config.assetHost + r,
						async: !0,
						dataType: "jsonp",
						jsonp: !1,
						jsonpCallback: h,
						data: null,
						success: l,
						error: c
					})
				} else
					n[r] = e.ajax({
						url: r,
						async: !0,
						dataType: "json",
						data: null,
						success: l,
						error: c
					})
		}

		function c(t) {
			e.localize.data[r] = t;
			var n, i, s = e([1]);
			e(o).each(function () {
				s[0] = this, n = s.attr("data-translate-text"), i = d(n, t), s.data("localize-text") !== i && (s[0].tagName == "INPUT" ? s.val(i) : s[0].innerHTML = i, s.data("localize-text", i))
			})
		}

		function h(t) {
			e.localize.data[r] = t;
			var n, i, s = e([1]);
			e(o).each(function () {
				s[0] = this, n = s.attr("data-translate-title"), i = d(n, t), s.data("localize-title") !== i && (s.attr("title", i), s.data("localize-text", i))
			})
		}

		function p(e) {
			s.callback ? s.callback === "titleCallback" ? h(e) : s.callback(e, c) : c(e), a.resolve(e)
		}

		function d(e, t) {
			var n = e.split(/\./),
				r = t;
			while (n.length > 0) {
				if (!r)
					return null;
				r = r[n.shift()]
			}
			return r
		}

		function v(e) {
			if (typeof e == "string")
				return "^" + e + "$";
			if (e.length) {
				var t = [],
					n = e.length;
				while (n--)
					t.push(v(e[n]));
				return t.join("|")
			}
			return e
		}
		var o = this.selector,
			u = {}, a = _.Deferred();
		s = s || {}, s.pathPrefix = "/locales";
		var m = i(s && s.language ? s.language : "en");
		if (s.skipLanguage && m.match(v(s.skipLanguage)))
			return;
		return f(r, m, 1), a.promise()
	};
	var r = _.Deferred();
	e.fn.localize = e.localize, e.localize.data = {}, e.localize.defaultLangData = {}, e.localize.defaultLang = "", e.localize.cachebuster = "", e.localize.ready = r.promise(), window.GS.config && (GS.config.localeVersion && (e.localize.cachebuster = "?v=" + GS.config.localeVersion), GS.config.localeJSONP ? e.localize.jsonpCallback = GS.config.localeJSONP : e.localize.jsonpCallback = !1, GS.config.lang && GS.locales[GS.config.lang] && (e.localize.data.gs = e.extend({}, GS.locales[GS.config.lang]), e.localize.defaultLangData = e.extend({}, GS.locales[GS.config.lang]), e.localize.defaultLang = GS.config.lang, t["/locales/gs-" + GS.config.lang + ".json" + e.localize.cachebuster] = e.localize.defaultLangData)), e.localize.getString = function (e) {
		return this.data.gs[e] || this.defaultLangData[e]
	}
})(Zepto)