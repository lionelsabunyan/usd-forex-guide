import { useEffect } from "react";

type GoogleAnalyticsProps = {
  gaId?: string;
  gtmId?: string;
  uetId?: string; // Bing UET Tag ID
  ymId?: string; // Yandex.Metrica Counter ID
};

const GoogleAnalytics = ({ gaId, gtmId, uetId, ymId }: GoogleAnalyticsProps) => {
  useEffect(() => {
    // Google Analytics 4 (GA4) — uses separate "gtagLayer" to isolate from GTM's dataLayer
    if (gaId) {
      // GA4 script with custom dataLayer name to prevent GTM conflict
      const script1 = document.createElement("script");
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}&l=gtagLayer`;
      document.head.appendChild(script1);

      const script2 = document.createElement("script");
      script2.innerHTML = `
        window.gtagLayer = window.gtagLayer || [];
        function gtag(){gtagLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `;
      document.head.appendChild(script2);
    }

    // Google Tag Manager (GTM)
    if (gtmId) {
      // GTM script
      const script1 = document.createElement("script");
      script1.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `;
      document.head.appendChild(script1);

      // GTM noscript
      const noscript = document.createElement("noscript");
      noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
      document.body.insertBefore(noscript, document.body.firstChild);
    }

    // Bing UET Tag
    if (uetId) {
      const script = document.createElement("script");
      script.innerHTML = `
        (function(w,d,t,r,u){
          var f,n,i;
          w[u]=w[u]||[],f=function(){
            var o={ti:"${uetId}", enableAutoSpaTracking: true};
            o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")
          },
          n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){
            var s=this.readyState;
            s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)
          },
          i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)
        })(window,document,"script","//bat.bing.com/bat.js","uetq");
      `;
      document.head.appendChild(script);

      // UTM Auto-Inject: Bing msclkid varsa GA4'e Bing paid search olarak kaydet
      const uetScript2 = document.createElement("script");
      uetScript2.innerHTML = `
        (function() {
          try {
            var params = new URLSearchParams(window.location.search);
            var msclkid = params.get('msclkid');
            if (msclkid) {
              sessionStorage.setItem('bing_msclkid', msclkid);
              if (window.gtag) {
                window.gtag('set', {'campaign': {source:'bing', medium:'cpc'}});
              }
            }
            if ((msclkid || sessionStorage.getItem('bing_msclkid')) && !params.get('utm_source')) {
              var sep = window.location.href.includes('?') ? '&' : '?';
              history.replaceState(null, '', window.location.href + sep + 'utm_source=bing&utm_medium=cpc');
            }
          } catch(e) {}
        })();
      `;
      document.head.appendChild(uetScript2);
    }

    // Yandex.Metrica
    if (ymId) {
      const script = document.createElement("script");
      script.innerHTML = `
        (function(m,e,t,r,i,k,a){
          m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],
          k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
        })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(${ymId}, "init", {
          clickmap:true,
          trackLinks:true,
          accurateTrackBounce:true,
          webvisor:false,
          trackHash:true,
          ecommerce:"dataLayer"
        });
      `;
      document.head.appendChild(script);

      // Yandex.Metrica noscript
      const noscript = document.createElement("noscript");
      noscript.innerHTML = `<div><img src="https://mc.yandex.ru/watch/${ymId}" style="position:absolute; left:-9999px;" alt="" /></div>`;
      document.body.insertBefore(noscript, document.body.firstChild);
    }
  }, [gaId, gtmId, uetId, ymId]);

  return null;
};

export default GoogleAnalytics;
