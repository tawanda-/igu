(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{188:function(e,a,t){e.exports=t(457)},457:function(e,a,t){"use strict";t.r(a);t(189),t(390);var n=t(1),r=t.n(n),l=t(184),o=t.n(l),s=t(57),i=t(58),c=t(62),u=t(59),m=t(61),p=t(30),d=t(60),h=function(e){function a(e){var t;return Object(s.a)(this,a),(t=Object(c.a)(this,Object(u.a)(a).call(this,e))).state={searchTerm:""},t.searchTerm="",t.handleChange=t.handleChange.bind(Object(p.a)(Object(p.a)(t))),t}return Object(m.a)(a,e),Object(i.a)(a,[{key:"handleChange",value:function(e){this.setState({searchTerm:e.target.value})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"input-group search col-md-8"},r.a.createElement("input",{className:"form-control",type:"text",style:{borderRadius:"4px",fontFamily:"Roboto Condensed",fontWeight:40,height:"100%"},placeholder:"SEARCH BY JOURNAL NAME",value:this.state.searchTerm,onChange:this.handleChange}),r.a.createElement("div",{className:"input-group col-md-3"},r.a.createElement("button",{style:{borderRadius:"4px"},type:"button",className:"btn",value:this.state.searchTerm,onClick:function(){return e.props.onSearchJournalsByName(e.state.searchTerm)}},"CLICK SEARCH")))))}}]),a}(n.Component),g=Object(d.b)(null,function(e){return{onSearchJournalsByName:function(a){return e({type:"SEARCH_JOURNALS_BY_NAME",payload:a})}}})(h),f="https://igu-online.org/wp-admin/admin-ajax.php",E="the_ajax_hook",y=function(e){return r.a.createElement("div",null,r.a.createElement("div",{className:"result-view"},r.a.createElement("div",null,r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"results_section col-md-12"},e.journal.website?r.a.createElement("h3",null,r.a.createElement("a",{className:"header-link",href:e.journal.website,rel:"noreferrer noopener",target:"_blank"},e.journal.name_of_journal)):r.a.createElement("h3",null,e.journal.name_of_journal)),r.a.createElement("div",{className:"results_info col-lg-8"},r.a.createElement("span",null,r.a.createElement("a",{className:"print",href:"#",role:"button"},"Country.")," ",e.journal.country," "),e.journal.print_issn&&r.a.createElement("span",null,r.a.createElement("a",{className:"print",href:"#"},"Print ISSN.")," ",e.journal.print_issn," "),e.journal.e_issn&&r.a.createElement("span",null,r.a.createElement("a",{className:"print",href:"#"},"e ISSN.")," ",e.journal.e_issn," "),e.journal.city_of_publication&&r.a.createElement("span",null,r.a.createElement("a",{className:"print",href:"#"},"City Published.")," ",e.journal.city_of_publication," "),e.journal.name_of_publishing_company&&r.a.createElement("span",null," ",r.a.createElement("a",{className:"print",href:"#"},"Publisher.")," ",e.journal.name_of_publishing_company,"  "),e.journal.editor&&r.a.createElement("span",null,r.a.createElement("a",{className:"print",href:"#"},"Editor.")," ",e.journal.editor," "),e.journal.editor_info&&r.a.createElement("span",null,r.a.createElement("a",{className:"print",href:"#"},"Editor Information.")," ",e.journal.editor_info," "),e.journal.language&&r.a.createElement("span",null,r.a.createElement("a",{className:"print",href:"#"},"Language.")," ",e.journal.language," "),e.journal.since&&r.a.createElement("span",null,r.a.createElement("a",{className:"print",href:"#"},"Since.")," ",e.journal.since," "),e.journal.isi&&r.a.createElement("span",null,r.a.createElement("a",{className:"print",href:"#"},"ISI.")," ",e.journal.isi," "),e.journal.isi_category&&r.a.createElement("span",null,r.a.createElement("a",{className:"print",href:"#"},"ISI Category.")," ",e.journal.isi_category," "),e.journal[12]&&r.a.createElement("span",null,r.a.createElement("a",{className:"print",href:"#"},"5 Year Impact Factor.")," ",e.journal[12]," ")))))),r.a.createElement("br",null),r.a.createElement("div",{className:"mr-sm-2"}))},L=function(e){function a(){return Object(s.a)(this,a),Object(c.a)(this,Object(u.a)(a).apply(this,arguments))}return Object(m.a)(a,e),Object(i.a)(a,[{key:"render",value:function(){var e=this.props.results.map(function(e){return r.a.createElement(y,{key:e.id,journal:e})});return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"results"},"Results section")),e)}}]),a}(n.Component),j=t(187),b=t.n(j),C=function(e){function a(){var e,n;Object(s.a)(this,a);for(var r=arguments.length,l=new Array(r),o=0;o<r;o++)l[o]=arguments[o];return(n=Object(c.a)(this,(e=Object(u.a)(a)).call.apply(e,[this].concat(l)))).state={selectedLang:"All Languages",selectedCountry:"",languages:[]},n.initialDataLoad=function(){var e=t(454),a={action:E,name:"all",filter:"all"},r=Object(p.a)(Object(p.a)(n)),l=new Request(f,{method:"POST",headers:{Accept:"*/*","Content-Type":"application/x-www-form-urlencoded"},body:e.stringify(a)});return fetch(l).then(function(e){r.props.onResultsLoading(!0),r.props.onStoreResult(e.json)}).catch(function(e){return e})},n.handleCountryChange=function(e){n.setState({selectedCountry:e.target.value,selectedLang:""}),n.props.onResultsLoading(!0),n.props.onFilterJournalsByCountry(e.target.value)},n.handleLanguageChange=function(e){n.setState({selectedLang:e.target.value}),n.props.onResultsLoading(!0),n.props.onFilterJournalsByLanguage(n.state.selectedCountry,e.target.value),n.handleJournalNameFilterClicked=n.handleJournalNameFilterClicked.bind(Object(p.a)(Object(p.a)(n)))},n.onItemClick=function(e){e.preventDefault(),n.props.onResultsLoading(!0),n.props.onFilterJournalsByName(e.target.id)},n}return Object(m.a)(a,e),Object(i.a)(a,[{key:"componentDidMount",value:function(){this.initialDataLoad()}},{key:"render",value:function(){var e=this,a=[],t=[];return a=this.props.filterList,t=this.props.languageList,r.a.createElement("section",{id:"about"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-lg-8 welcome"},r.a.createElement("h2",null,r.a.createElement("b",null,"WELCOME TO")," IGU UGI JOURNAL DATABASE")),r.a.createElement("div",{className:"col-lg-8 info_line lead"},r.a.createElement("p",null,"This is the IGU\u2019s extensive list of Geography or Geography-related journals of the world. You can search by country, journal name, key word or other attributes."),r.a.createElement("p",null,"The database is periodically updated but if you have new journals to add or would like to update the entry for any journal, please contact us."),r.a.createElement("p",null,"Database compiled initially by the University of Amsterdam."),r.a.createElement("p",null,"See Ton Dietz\u2019s analysis of the the database presented at its launch at the IGC Cologne, click ",r.a.createElement("a",{href:"https://igu-online.org/wp-content/uploads/2014/08/IGU-JOURNAL-PROJECT.pdf",className:"nav-toggle read"},"Here")),r.a.createElement("p",null,"In listing titles in this database, IGU is in no way endorsing the contents therein, which remain entirely the responsibility of the editors of the journals in question.  Users are alerted to the problem of so-called \u2018predatory\u2019 journals and are directed to",r.a.createElement("br",null)," ",r.a.createElement("a",{href:"https://beallslist.weebly.com/standalone-journals.html",target:"_blank",rel:"noopener noreferrer"},"Beall\u2019s list of Predatory Journals and Publishers")," to check credibility of the entries.")))),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-12"},r.a.createElement("form",null,r.a.createElement(g,null),r.a.createElement("div",{className:"form-row align-items-center"},r.a.createElement("div",{className:"col-auto my-1 col-md-2"},r.a.createElement("select",{className:"custom-select mr-sm-2",id:"inlineFormCustomSelect",onChange:this.handleCountryChange,style:{borderRadius:"4px"}},r.a.createElement("option",null," ALL COUNTRIES"),a.map(function(e,a){return r.a.createElement("option",{key:e},e)}))),r.a.createElement("div",{className:"col-auto my-1 col-md-2"},r.a.createElement("select",{className:"custom-select mr-sm-2",id:"inlineFormCustomSelect",value:this.state.selectedLang,onChange:this.handleLanguageChange,style:{borderRadius:"4px"}},r.a.createElement("option",null," ALL LANGUAGES"),t.map(function(e,a){return r.a.createElement("option",{key:a},e)})))),r.a.createElement("ul",{className:"pagination table-responsive mb-2"},this.props.paginationList.map(function(a,t){return r.a.createElement("li",{className:"page-item",key:t},r.a.createElement("a",{className:"page-link",href:"#",id:a,onClick:e.onItemClick},a))})))))),this.props.isResultsLoading?r.a.createElement(b.a,{type:"Oval",color:"#4285f4",height:60,width:60}):r.a.createElement(L,{results:this.props.data}))}}]),a}(n.Component),v=Object(d.b)(function(e){return{data:e.tempJournals,paginationList:e.paginationChars,filterList:e.filterTerms,languageList:e.languageTerms,selectedPaginationChar:e.topicFilter,isResultsLoading:e.resultsLoading}},function(e){return{onFilterJournalsByLanguage:function(a,t){return e(function(e,a){return{type:"FILTER_JOURNALS_BY_LANGUAGE",country:e,language:a}}(a,t))},onFilterJournalsByName:function(a){return e({type:"FILTER_JOURNALS_BY_NAME",payload:a})},onFilterJournalsByCountry:function(a){return e({type:"FILTER_JOURNALS_BY_COUNTRY",payload:a})},onStoreResult:function(a){return e(function(e){return{type:"STORE_RESULT",payload:e}}(a))},onResultsLoading:function(a){return e({type:"LOADING_STATUS",payload:a})}}})(C);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var N=t(92),_=t(50),w={resultsLoading:!1,journals:[],filterResults:[],tempJournals:[],paginationChars:[],filterTerms:[],languageTerms:[],topicFilter:""},R=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"STORE_RESULT":for(var t=[],n=[],r=[],l=a.payload,o=0;o<l.length;o++){var s=l[o].name_of_journal.trim().charAt(0);!n.includes(s)&&s.length>0&&n.push(s);var i=l[o].country.trim();i.length>0&&(i=i.charAt(0).toUpperCase()+i.substring(1),t.includes(i)||t.push(i));var c=l[o].language.trim();c.length>0&&(r.includes(c)||r.push(c))}return n.sort(),t.sort(),r.sort(),Object(_.a)({},e,{journals:a.payload,filterResults:a.payload,tempJournals:a.payload,paginationChars:n,filterTerms:t,languageTerms:r,resultsLoading:!1});case"FILTER_JOURNALS_BY_NAME":for(var u=e.filterResults.filter(function(e){return e.name_of_journal.trim().toLowerCase().startsWith(a.payload.toLowerCase())}),m=[],p=0;p<u.length;p++){var d=u[p].language.trim();d.length>0&&(m.includes(d)||m.push(d))}return m.sort(),Object(_.a)({},e,{tempJournals:u,topicFilter:a.payload,languageTerms:m,resultsLoading:!1});case"FILTER_JOURNALS_BY_COUNTRY":var h=[];h="all countries"===a.payload.toLowerCase()?e.journals:e.journals.filter(function(e){return e.country.trim().toLowerCase().includes(a.payload.trim().toLowerCase())});for(var g=[],f=[],E=0;E<h.length;E++){var y=h[E].name_of_journal.trim().charAt(0);!g.includes(y)&&y.length>0&&g.push(y);var L=h[E].language.trim();L.length>0&&(f.includes(L)||f.push(L))}return g.sort(),f.sort(),Object(_.a)({},e,{filterResults:h,tempJournals:h,paginationChars:g,languageTerms:f,topicFilter:"",resultsLoading:!1});case"FILTER_JOURNALS_BY_LANGUAGE":var j=[],b=[];"all languages"===a.language.toLowerCase()?j=e.filterResults:""===a.country&&""===e.topicFilter?j=e.filterResults.filter(function(e){return e.language.trim().toLowerCase()===a.language.trim().toLowerCase()}):""===a.country&&""!==e.topicFilter?(console.log("Condition 2 "),j=e.filterResults.filter(function(t){return t.name_of_journal.trim().toLowerCase().startsWith(e.topicFilter.toLowerCase())&&t.language.trim().toLowerCase()===a.language.trim().toLowerCase()})):j=e.filterResults.filter(function(t){return t.name_of_journal.trim().toLowerCase().startsWith(e.topicFilter.toLowerCase())&&t.country.trim().toLowerCase().includes(a.country.trim().toLowerCase())&&t.language.trim().toLowerCase()===a.language.trim().toLowerCase()});for(var C=0;C<j.length;C++){var v=j[C].name_of_journal.trim().charAt(0);!b.includes(v)&&v.length>0&&b.push(v)}return b.sort(),Object(_.a)({},e,{tempJournals:j,paginationChars:b,topicFilter:"",resultsLoading:!1});case"SEARCH_JOURNALS_BY_NAME":var N=e.filterResults.filter(function(t){return t.name_of_journal.trim().toLowerCase().startsWith(e.topicFilter.toLowerCase())&&t.name_of_journal.trim().toLowerCase().includes(a.payload.trim().toLowerCase())});return Object(_.a)({},e,{tempJournals:N,resultsLoading:!1});case"LOADING_STATUS":return Object(_.a)({},e,{resultsLoading:!0});default:return e}},O=Object(N.b)(R),A=r.a.createElement(d.a,{store:O},r.a.createElement(v,null));o.a.render(A,document.getElementById("journals")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[188,2,1]]]);
//# sourceMappingURL=main.6c24b275.chunk.js.map