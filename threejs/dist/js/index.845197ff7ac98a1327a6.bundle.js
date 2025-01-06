"use strict";(self.webpackChunkwebpack_project=self.webpackChunkwebpack_project||[]).push([[826],{615:function(e,i,n){var t=n(477),a=n(365),o=(new(n(376).XS),document.querySelector("canvas.webgl")),r=new t.xsS,w=(new t.dpR,new t._12(1,1,32,32)),d=new t.FIo({vertexShader:"\n    uniform mat4 projectionMatrix;\n    uniform mat4 viewMatrix;\n    uniform mat4 modelMatrix;\n\n    attribute vec3 position;\n\n    void main() {\n      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);\n    }\n  ",fragmentShader:" \n    precision mediump float;\n\n    void main() {\n      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n    }\n  "}),h=new t.Kj0(w,d);r.add(h);var c={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",(function(){c.width=window.innerWidth,c.height=window.innerHeight,s.aspect=c.width/c.height,s.updateProjectionMatrix(),p.setSize(c.width,c.height),p.setPixelRatio(Math.min(window.devicePixelRatio,2))}));var s=new t.cPb(75,c.width/c.height,.1,100);s.position.set(.25,-.25,1),r.add(s);var m=new a.z(s,o);m.enableDamping=!0;var p=new t.CP7({canvas:o,antialias:!0});p.setSize(c.width,c.height),p.setPixelRatio(Math.min(window.devicePixelRatio,2));var u=new t.SUY;!function e(){u.getElapsedTime();m.update(),p.render(r,s),window.requestAnimationFrame(e)}()}},function(e){e.O(0,[216],(function(){return i=615,e(e.s=i);var i}));e.O()}]);