(function(){
  const root=document.documentElement;
  const fsEl=()=>document.fullscreenElement||document.webkitFullscreenElement;
  const canFs=!!(root.requestFullscreen||root.webkitRequestFullscreen);
  function label(){ document.querySelectorAll('.fsbtn').forEach(b=>{ const ind=b.querySelector('.ind'); b.textContent=fsEl()?'EXIT FULLSCREEN':'FULLSCREEN'; if(ind) b.prepend(ind); }); }
  function openTab(){ try{ window.open(location.href,'_blank','noopener'); }catch(e){} }
  function toggle(){ try{ if (fsEl()){ (document.exitFullscreen||document.webkitExitFullscreen).call(document); return; } if (!canFs){ openTab(); return; } const r=(root.requestFullscreen||root.webkitRequestFullscreen).call(root); if (r&&r.catch) r.catch(openTab); }catch(e){ openTab(); } }
  document.querySelectorAll('.fsbtn').forEach(b=>b.addEventListener('click',toggle));
  document.addEventListener('fullscreenchange',()=>{ label(); dispatchEvent(new Event('resize')); });
  label();
  let inFrame=false; try{ inFrame=window.self!==window.top; }catch(e){ inFrame=true; }
  if (inFrame){
    const tip=document.createElement('div'); tip.id='embedtip';
    tip.innerHTML='Mouse lock blocked in this embed — hold click and drag to aim, or <a href="#" id="embedtip-open">play fullscreen</a>.';
    document.body.appendChild(tip);
    tip.querySelector('#embedtip-open').addEventListener('click',e=>{ e.preventDefault(); toggle(); });
    document.addEventListener('pointerlockerror',()=>{ tip.classList.add('on'); clearTimeout(tip._t); tip._t=setTimeout(()=>tip.classList.remove('on'),6000); });
  }
})();
