(self.webpackChunkquestionare=self.webpackChunkquestionare||[]).push([[268],{9268:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return nt}});var r=n(2791),i=n(9434),s=n(7689),a=n(5059),u=n(4917),c=n(4568),o="card_cardWrapper__Cm9tU",d="card_qaDiv__GGl7f",l="card_qaDivOne__nbqmn",h="card_one_QA_part__kEPYq",f="card_QA_question__vzQWf",_="card_QA_answers__78KkM",m="card_QA_answers_button_div__pd4vO",v="card_QA_answers_button_div_checked__B5-mr",p="card_QA_multilinetext_answer_div__VA9DD",$="card_appearance__Y0Kk3",x="card_supplierArea__xDj1v",g="card_label_title_1__Q06Kx",j="card_label_title_2__wErxz",y="card_supplierHeadDates__M-H2a",w="card_existedRisk__S4P6c",M="card_changeZoneDiv__4sCir",S="card_risks__HFSVd",D="card_low__cwQNh",b="card_medium__mCar8",O="card_high__MYC3T",C="card_commentLabel__-gwQk",N="card_formErrorDiv__m378M",k="card_changeZone_Risk__XG-s8",A="card_risk_width__DJUFC",T="card_changeZone_Commet__xuCfy",Z="card_changeZone_SaveButton__GHdXG",H="card_btn_padding__S34ef",F="card_delete_questionarie_error__AVV4x",Y=n(9439),q=n(9230),L=n(6780),G=n(5532),Q=n(1724),W=n(516),U="options_selectElement__UPGmt",E="options_error__5dkXV",I=n(184),V=function(t){return(0,I.jsx)("select",{className:t.error?U+" "+E:U,onChange:function(e){return function(e){t.onChangeEvent(e.currentTarget.value)}(e)},defaultValue:t.defaultOption,children:t.options.map((function(t,e){return(0,I.jsx)("option",{value:t.value,children:t.text},e)}))})},z=function(){var t=(0,u.T)(),e=(0,q.$G)().t,n=(0,i.v9)((function(t){return t.complited.riskLevel})),s=(0,r.useState)(""),a=(0,Y.Z)(s,2),c=a[0],o=a[1],d=(0,r.useState)(n),l=(0,Y.Z)(d,2),h=l[0],f=l[1],_=(0,r.useState)("321 _comment_"),m=(0,Y.Z)(_,2),v=m[0],p=m[1];return(0,I.jsxs)("div",{className:M+" "+$,children:[(0,I.jsxs)("div",{className:k+" "+A,children:[(0,I.jsx)("label",{children:e("supplierCard_risk")}),(0,I.jsx)(V,{options:[{text:"-",value:void 0},{text:"Low",value:G.fu},{text:"Medium",value:G.pO},{text:"High",value:G.ZF}],defaultOption:n||void 0,onChangeEvent:function(t){return function(t){if(t===G.fu||t===G.pO||t===G.ZF)f(t),o("");else{f(null);var n=e("required_field");o(n)}}(t)},error:c.length>0}),(0,I.jsx)("div",{className:N,children:c})]}),(0,I.jsxs)("div",{className:T,children:[(0,I.jsx)("label",{children:e("supplierCard_comment")}),(0,I.jsx)(W.Z,{text:v,onChangeFunction:function(t){return function(t){p(t)}(t)},autofocus:!0})]}),(0,I.jsx)("div",{className:Z,children:(0,I.jsx)("div",{className:H,children:(0,I.jsx)(Q.Z,{text:e("save"),onClickFunction:function(){if(h===G.fu||h===G.pO||h===G.ZF){var n={risk:h,comment:v};t((0,L.db)(n))}else{var r=e("required_field");o(r)}}})})})]})},J=n(6851),P=function(){var t=(0,s.s0)(),e=(0,u.T)(),n=(0,s.UO)().supplierId,r=(0,q.$G)().t,a=(0,i.v9)((function(t){return t.complited.errors.deleteError}));return(0,I.jsxs)(I.Fragment,{children:[a.length>0&&(0,I.jsxs)("div",{className:F,children:[" ",a," "]}),(0,I.jsx)(Q.T,{text:r("supplierCard_delete_this_questionare"),onClickFunction:function(){if(n){var r={companyId:n,navigate:t};e((0,J.S)(r))}}})]})},B=n(7892),K=n.n(B),R=function(t){return(0,I.jsxs)(I.Fragment,{children:["checkbox"===t.type&&t.options&&t.options.map((function(e,n){return(0,I.jsx)("div",{className:t.answers&&t.answers.some((function(t){return t===e}))?m+" "+v:m,children:e},e+"_"+String(n))})),"radiobutton"===t.type&&t.options&&t.options.map((function(e,n){return(0,I.jsx)("div",{className:t.answer&&t.answer===e?m+" "+v:m,children:e},e+"_"+String(n))})),"text"===t.type&&(0,I.jsx)("div",{className:p,children:t.answer||"---- \u043e\u0442\u0432\u0435\u0442 \u043d\u0435 \u043f\u0440\u0435\u0434\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d. \u0427\u0442\u043e \u0434\u0435\u043b\u0430\u0442\u044c \u0441 \u043f\u0443\u0441\u0442\u044b\u043c \u043f\u043e\u043b\u0435\u043c? ----"}),"multiline"===t.type&&(0,I.jsx)("div",{className:p,children:t.answer||"---- \u043e\u0442\u0432\u0435\u0442 \u043d\u0435 \u043f\u0440\u0435\u0434\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d. \u0427\u0442\u043e \u0434\u0435\u043b\u0430\u0442\u044c \u0441 \u043f\u0443\u0441\u0442\u044b\u043c \u043f\u043e\u043b\u0435\u043c? ----"})]})},X=function(){(0,q.$G)().t;var t=(0,i.v9)((function(t){return t.complited.parts})),e=Object.keys(t),n=(0,i.v9)((function(t){return t.auth.userSettings.date_format}));return(0,I.jsx)("div",{className:d+" "+$,children:e.map((function(e,r){return(0,I.jsxs)("div",{className:l,children:[(0,I.jsxs)("h3",{children:["\u0427\u0430\u0441\u0442\u044c ",e]}),t[e].map((function(t,e){return(0,I.jsxs)("div",{className:h,children:[(0,I.jsxs)("div",{className:f,children:[(0,I.jsx)("label",{children:t.question}),t.is_required?(0,I.jsx)("label",{children:"\u041e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u0435\u043d"}):(0,I.jsx)("label",{children:"\u041d\u0435 \u041e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u0435\u043d"}),(0,I.jsx)("label",{children:t.type}),(0,I.jsx)("label",{children:K()(t.created_at).format(n)})]}),(0,I.jsx)("div",{className:_,children:(0,I.jsx)(R,{options:t.options,answer:t.answer,answers:t.answers,type:t.type})})]},"Second_"+String(e))}))]},"first_"+String(r))}))})},tt=function(){var t=(0,q.$G)().t,e=(0,i.v9)((function(t){return t.complited.riskLevel}));return(0,I.jsxs)("div",{className:w+" "+$,children:[(0,I.jsx)("div",{className:S,children:(0,I.jsx)("h1",{className:e===G.fu?D:e===G.pO?b:e===G.ZF?O:"",children:e})}),(0,I.jsxs)("div",{className:C,children:[(0,I.jsx)("label",{className:j,children:t("supplierCard_comment")}),(0,I.jsx)("p",{children:"-----\u0422\u0443\u0442 \u0434\u043e\u043b\u0436\u0435\u043d \u0431\u044b\u0442\u044c \u0442\u0435\u043a\u0441\u0442 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u044f. \u0427\u0442\u043e \u043e\u0442\u043e\u0431\u0440\u0430\u0437\u0438\u0442\u044c, \u0435\u0441\u043b\u0438 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u044f \u043d\u0435\u0442?-----"})]})]})},et=function(){var t=(0,q.$G)().t,e=(0,i.v9)((function(t){return t.complited.company})),n=(0,i.v9)((function(t){return t.auth.userSettings.date_format})),r=K()((0,i.v9)((function(t){return t.complited.createdAt}))).format(n),s=(0,i.v9)((function(t){return t.complited.filledAt}))||"",a=(0,i.v9)((function(t){return t.complited.checkedAt}))||"";return(0,I.jsxs)("div",{className:x+" "+$,children:[(0,I.jsx)("label",{className:g,children:e}),(0,I.jsxs)("div",{className:y,children:[(0,I.jsxs)("label",{children:[t("supplierCard_creation_date")," ",r]}),s.length>0?(0,I.jsxs)("label",{children:[t("supplierCard_complited_date")," ",s]}):(0,I.jsxs)("label",{children:[t("supplierCard_complited_date")," &mdash"]}),(0,I.jsxs)("label",{children:[t("supplierCard_checked_date")," ",a]})]})]})},nt=function(){var t=(0,s.UO)().supplierId,e=(0,u.T)();(0,r.useEffect)((function(){e((0,a.a)(t||""))}),[]);var n=(0,i.v9)((function(t){return t.complited.isLoading}));return(0,I.jsxs)("div",{className:o,children:["supplier CARD #",t,n?(0,I.jsx)(c.Z,{}):(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(et,{})," ",(0,I.jsx)(tt,{}),(0,I.jsx)(X,{}),(0,I.jsx)(z,{}),(0,I.jsx)(P,{})]})]})}},7892:function(t){t.exports=function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",a="hour",u="day",c="week",o="month",d="quarter",l="year",h="date",f="Invalid Date",_=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,m=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},p=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},$={s:p,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+p(r,2,"0")+":"+p(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,o),s=n-i<0,a=e.clone().add(r+(s?-1:1),o);return+(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:o,y:l,w:c,d:u,D:h,h:a,m:s,s:i,ms:r,Q:d}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},x="en",g={};g[x]=v;var j=function(t){return t instanceof S},y=function t(e,n,r){var i;if(!e)return x;if("string"==typeof e){var s=e.toLowerCase();g[s]&&(i=s),n&&(g[s]=n,i=s);var a=e.split("-");if(!i&&a.length>1)return t(a[0])}else{var u=e.name;g[u]=e,i=u}return!r&&i&&(x=i),i||!r&&x},w=function(t,e){if(j(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},M=$;M.l=y,M.i=j,M.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function v(t){this.$L=y(t.locale,null,!0),this.parse(t)}var p=v.prototype;return p.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(M.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(_);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},p.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},p.$utils=function(){return M},p.isValid=function(){return!(this.$d.toString()===f)},p.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},p.isAfter=function(t,e){return w(t)<this.startOf(e)},p.isBefore=function(t,e){return this.endOf(e)<w(t)},p.$g=function(t,e,n){return M.u(t)?this[e]:this.set(n,t)},p.unix=function(){return Math.floor(this.valueOf()/1e3)},p.valueOf=function(){return this.$d.getTime()},p.startOf=function(t,e){var n=this,r=!!M.u(e)||e,d=M.p(t),f=function(t,e){var i=M.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(u)},_=function(t,e){return M.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},m=this.$W,v=this.$M,p=this.$D,$="set"+(this.$u?"UTC":"");switch(d){case l:return r?f(1,0):f(31,11);case o:return r?f(1,v):f(0,v+1);case c:var x=this.$locale().weekStart||0,g=(m<x?m+7:m)-x;return f(r?p-g:p+(6-g),v);case u:case h:return _($+"Hours",0);case a:return _($+"Minutes",1);case s:return _($+"Seconds",2);case i:return _($+"Milliseconds",3);default:return this.clone()}},p.endOf=function(t){return this.startOf(t,!1)},p.$set=function(t,e){var n,c=M.p(t),d="set"+(this.$u?"UTC":""),f=(n={},n[u]=d+"Date",n[h]=d+"Date",n[o]=d+"Month",n[l]=d+"FullYear",n[a]=d+"Hours",n[s]=d+"Minutes",n[i]=d+"Seconds",n[r]=d+"Milliseconds",n)[c],_=c===u?this.$D+(e-this.$W):e;if(c===o||c===l){var m=this.clone().set(h,1);m.$d[f](_),m.init(),this.$d=m.set(h,Math.min(this.$D,m.daysInMonth())).$d}else f&&this.$d[f](_);return this.init(),this},p.set=function(t,e){return this.clone().$set(t,e)},p.get=function(t){return this[M.p(t)]()},p.add=function(r,d){var h,f=this;r=Number(r);var _=M.p(d),m=function(t){var e=w(f);return M.w(e.date(e.date()+Math.round(t*r)),f)};if(_===o)return this.set(o,this.$M+r);if(_===l)return this.set(l,this.$y+r);if(_===u)return m(1);if(_===c)return m(7);var v=(h={},h[s]=e,h[a]=n,h[i]=t,h)[_]||1,p=this.$d.getTime()+r*v;return M.w(p,this)},p.subtract=function(t,e){return this.add(-1*t,e)},p.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=M.z(this),s=this.$H,a=this.$m,u=this.$M,c=n.weekdays,o=n.months,d=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},l=function(t){return M.s(s%12||12,t,"0")},h=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},_={YY:String(this.$y).slice(-2),YYYY:this.$y,M:u+1,MM:M.s(u+1,2,"0"),MMM:d(n.monthsShort,u,o,3),MMMM:d(o,u),D:this.$D,DD:M.s(this.$D,2,"0"),d:String(this.$W),dd:d(n.weekdaysMin,this.$W,c,2),ddd:d(n.weekdaysShort,this.$W,c,3),dddd:c[this.$W],H:String(s),HH:M.s(s,2,"0"),h:l(1),hh:l(2),a:h(s,a,!0),A:h(s,a,!1),m:String(a),mm:M.s(a,2,"0"),s:String(this.$s),ss:M.s(this.$s,2,"0"),SSS:M.s(this.$ms,3,"0"),Z:i};return r.replace(m,(function(t,e){return e||_[t]||i.replace(":","")}))},p.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},p.diff=function(r,h,f){var _,m=M.p(h),v=w(r),p=(v.utcOffset()-this.utcOffset())*e,$=this-v,x=M.m(this,v);return x=(_={},_[l]=x/12,_[o]=x,_[d]=x/3,_[c]=($-p)/6048e5,_[u]=($-p)/864e5,_[a]=$/n,_[s]=$/e,_[i]=$/t,_)[m]||$,f?x:M.a(x)},p.daysInMonth=function(){return this.endOf(o).$D},p.$locale=function(){return g[this.$L]},p.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=y(t,e,!0);return r&&(n.$L=r),n},p.clone=function(){return M.w(this.$d,this)},p.toDate=function(){return new Date(this.valueOf())},p.toJSON=function(){return this.isValid()?this.toISOString():null},p.toISOString=function(){return this.$d.toISOString()},p.toString=function(){return this.$d.toUTCString()},v}(),D=S.prototype;return w.prototype=D,[["$ms",r],["$s",i],["$m",s],["$H",a],["$W",u],["$M",o],["$y",l],["$D",h]].forEach((function(t){D[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,S,w),t.$i=!0),w},w.locale=y,w.isDayjs=j,w.unix=function(t){return w(1e3*t)},w.en=g[x],w.Ls=g,w.p={},w}()}}]);
//# sourceMappingURL=268.6a60a584.chunk.js.map