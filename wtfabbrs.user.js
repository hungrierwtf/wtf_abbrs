'use strict';

// ==UserScript==
// @name wtdwtf abbr shower
// @namespace WTDWTF
// @grant none
// @match https://what.thedailywtf.com/*
// @match http://what.thedailywtf.com/*
// @description shows abbrs 
// @author hungrier
// @version 2.1.1
// @downloadURL https://github.com/hungrierwtf/wtf_abbrs/raw/master/wtfabbrs.user.js
// @homepageURL https://github.com/hungrierwtf/wtf_abbrs
// ==/UserScript==
(function() {
  
  // TODO clean up code, maybe use less jquery (not sure if it can be entirely removed)
  
  let hideTimer = void 0;
  
  const $body = $('body');
  
  const stopHide = function stopHide() {
    clearTimeout(hideTimer);
  };
  
  const startHide = function startHide() {
    hideTimer = setTimeout(function() {
      $thinger.hide();
      setTimeout(function() {
        $body.append($thinger);
      }, 100);
    }, 100);
  };

  
  

  /*
  const $thinger = $('<div/>').css({
    border: '1px solid white',
    'background-color': 'black',
    padding: '8px 14px',
    'border-radius': '8px',
    position: 'fixed',
    display: 'none',
    'max-width': '300px',
    'z-index': 100
  }).appendTo($body);
  
  */
  
  const $thinger = $('<div/>').css({
    border: '1px solid white',
    'background-color': 'black',
    padding: '6px 10px',
    'border-radius': '4px',
    position: 'absolute',
    display: 'none',
    'min-width': '80px',
    'max-width': '500px',
    'z-index': 100
  });
  
  $thinger.append($('<span/>'));
  $thinger.append($('<hr/>').css({'border-color': 'white', margin: '6px 0'}));
  $thinger.append($('<span/>'));
  
  /*
  let htimer = (function(fn) {
    let ht = void 0;
    
    let st = function(ff, tt) {
      ht = setTimeout(ff, tt);
    }
    
    let stop = function() {
      clearTimeout(ht);
    }
    
    let start = function() {
      st(fn, 100);
    }
    
    return ({
      ht: ht,
      stop: stop,
      start: start
    });
  })(function(){
    $thinger.hide();
    setTimeout(function() {
      document.body.appendChild($thinger[0])
    }, 1000);
  });
  */
  
  
  $thinger.on('mouseover', stopHide);
  $thinger.on('mouseout', startHide);
  $thinger.on('click', startHide);

  //let $thinger = $('<div>', {'style': 'position: fixed; top: 90px!important; left: 40px!important; z-index: 100000; width: 270px; background-color: black; padding: 8px 14px; border-radius: 8px;'});

  //$thinger.click(function(){
//    $thinger.hide();
//  })

  //$thinger.appendTo($body);
  //$thinger.hide();
  
  function setThingerText(th, title, bottomText) {
    let spans = $thinger.find('span');
    //console.log(spans);
    spans[0].innerText = title;
    spans[1].innerText = bottomText;
  }
  
  $body.on('mouseover', 'abbr', function(evt) {
    console.log('mouseing');
    
    let target = $(evt.target);
    let abbr = target.closest('abbr');
    let postContent = abbr.closest('[component="post/content"]');
    let text = abbr.attr('title');
    let abbrText = abbr.text();
    
    //console.log('hey',target,abbr,postContent);
    //
    //find the closest edge
    //whether left or right, set that pos
    //bingo mcbango
    //if it's the right edge it should right align

    let abbrel = abbr[0];
    let offsetL = abbrel.offsetLeft;
    let offsetR = offsetL + abbrel.offsetWidth;
    let offsetX = evt.offsetX + evt.relatedTarget.offsetLeft; //YOLO this dereference, and all the rest
    
    let leftAligned = (offsetX - offsetL) < (offsetR - offsetX);
    //console.log('left',offsetL,'x',offsetX,'right',offsetR,'left aligned',leftAligned);
    
    
    let y = abbr.position().top - 9;
    
    let x = leftAligned? offsetL - 10: evt.relatedTarget.offsetLeft + evt.relatedTarget.offsetWidth - (offsetR + 10);
    
    let cssObj = ({'top': y, 'left': '', 'right': ''});
    let almt = leftAligned? 'left': 'right';
    cssObj[almt] = x;
    cssObj['text-align'] = almt;
    
    setThingerText($thinger, abbrText, text);

    postContent[0].appendChild($thinger[0]);
    
    $thinger.css(cssObj);
    $thinger.show();
    stopHide();
  });
  
  $body.on('mouseout', 'abbr', startHide);
  
})();
