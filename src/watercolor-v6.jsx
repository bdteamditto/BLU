import React,{useEffect,useRef} from 'react';import {gsap} from 'gsap';import {ScrollTrigger} from 'gsap/ScrollTrigger';import './watercolor-v6.css';
gsap.registerPlugin(ScrollTrigger);const asset=s=>new URL((document.body.dataset.previewBase||'./')+s,location.href).href;
export function WatercolorLanding(){const root=useRef(),stage=useRef(),object=useRef(),hand=useRef(),coin=useRef(),landscape=useRef();
 useEffect(()=>{document.body.classList.add('blu-watercolor-v6');const copy=document.getElementById('blu-landing-copy');stage.current.append(copy);const overview=new URLSearchParams(location.search).has('overview');if(overview)document.body.classList.add('wc-overview');
 const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches,ctx=gsap.context(()=>{
  gsap.set(hand.current,{opacity:0,xPercent:60,yPercent:-65});
  if(reduced||overview)return;
  const float=gsap.to(coin.current,{y:-10,rotation:1.5,duration:2.6,yoyo:true,repeat:-1,ease:'sine.inOut'});
  const tl=gsap.timeline({scrollTrigger:{trigger:root.current,pin:stage.current,pinType:'fixed',pinSpacing:false,start:'top top',end:'bottom bottom',scrub:.6,onUpdate:s=>{if(s.progress>.12){float.pause();}else{float.resume();}}}});
  tl.to(coin.current,{y:0,rotation:0,duration:.12},0)
    .to(hand.current,{opacity:1,duration:.12},.12)
    .to(hand.current,{xPercent:18,yPercent:-24,duration:.28,ease:'power2.out'},.12)
    .to(object.current,{y:-innerHeight*.65,x:innerWidth*.2,scale:.78,rotation:8,duration:.4,ease:'power2.in'},.5)
    .to(landscape.current,{y:-20,scale:1.035,duration:.9},0)
    .to(stage.current,{opacity:0,duration:.1},.9);
 },stage);return()=>{ctx.revert();root.current?.before(copy);};},[]);
 return <section ref={root} className="wc-landing"><div ref={stage} className="wc-stage"><div ref={landscape} className="wc-landscape" style={{backgroundImage:`url("${asset('art/watercolor-landscape-v6.png')}")`}} aria-hidden="true"/><div className="wc-lettering" aria-hidden="true">BLU</div><div ref={object} className="wc-hand-coin" aria-hidden="true"><img ref={coin} className="wc-blue-coin" src={asset('art/blue-coin-v7.png')} alt=""/><img ref={hand} className="wc-pickup-hand" src={asset('art/pinching-hand-v7.png')} alt=""/></div><div className="wc-scroll" aria-hidden="true">↓</div></div></section>;
}
export function WatercolorCoast(){return <div className="wc-coast" style={{backgroundImage:`url("${asset('art/watercolor-footer-v6.png')}")`}}><div className="wc-water"/>{[0,1,2,3,4].map(i=><div key={i} className={'wc-crab wc-crab-'+i} style={{backgroundImage:`url("${asset('art/watercolor-crab-v6.png')}")`}}/>)}</div>;}
