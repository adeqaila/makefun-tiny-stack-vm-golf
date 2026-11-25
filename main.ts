import{readdirSync as A,readFileSync as B,mkdirSync as C,writeFileSync as D}from"node:fs";
const E=process.env,I=E.MAKEFUN_INPUT_DIR??"/input",O=E.MAKEFUN_OUTPUT_DIR??"/output";
const T="12257bcg00000000aaaaaaa6aaa6aaa0aaa0000000000000155110000000000069000000000000005525";
const F=[(a,b)=>a+b|0,(a,b)=>a-b|0,(a,b)=>Math.imul(a,b),(a,b)=>a/b|0,(a,b)=>a%b|0,(a,b)=>(a>>>0)/(b>>>0)|0,(a,b)=>(a>>>0)%(b>>>0)|0,,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,,(a,b)=>a<<b,(a,b)=>a>>b,(a,b)=>a>>>b|0,,(a,b)=>+(a==b),(a,b)=>+(a<b),(a,b)=>+(a>>>0<b>>>0)];
for(const d of A(I)){
 const P=B(I+"/"+d+"/program.bin"),J=B(I+"/"+d+"/input.bin");
 let S=[],K=[],M=[],o=[],i=0,pc=0,s=0,e;
 try{L:for(;;){
   if(s++==1e6)throw 10;
   if(P[pc]==null)throw 9;
   const op=P[pc],v=parseInt(T[op]||"",36);
   if(!v)throw 5;
   const m=op==1?1:op==2?4:op>47&&op<52?2:0;
   if(pc+m>=P.length)throw 9;
   const p=v-1>>2,w=v-1&3,n=pc+1;
   pc=n+m;
   if(S.length<p)throw 2;
   if(S.length-p+w>256)throw 3;
   if(F[op-16]){
    if(!S.at(-1)&&op>18&&op<23)throw 4;
    const b=S.pop(),a=S.pop();
    S.push(F[op-16](a,b));
   }else if(op>47&&op<52){
    if(op<49)pc+=P.readInt16LE(n);
    else if(op>50){if(K.length==64)throw 7;K.push(pc);pc=P[n]|P[n+1]<<8}
    else if(!S.pop()==(op<50))pc+=P.readInt16LE(n);
   }else if(op>63&&op<66){
    const a=S.pop();
    if(a<0|a>255)throw 6;
    op==64?S.push(M[a]||0):M[a]=S.pop();
   }else if(op>0&&op<8){
    if(op<3)S.push(op==1?P.readInt8(n):P.readInt32LE(n));
    else if(op==3)S.pop();
    else if(op==4||op==6)S.push(S.at(1-op/2));
    else S.push(S.splice(-(op-1)/2,1)[0]);
   }else if(op==23||op==27)S[S.length-1]=op==23?-S.at(-1)|0:~S.at(-1);
   else switch(op){
    case 0:e=0;break L;
    case 52:if(!K.length)throw 8;pc=K.pop();break;
    case 80:{const t=""+S.pop();if(o.length+t.length>65536)throw 11;o.push(...Buffer.from(t));break;}
    case 81:if(o.length>65535)throw 11;o.push(S.pop()&255);break;
    case 82:S.push(i<J.length?J[i++]:-1);break;
    case 83:e=S.pop()&255;break L;
   }
 }}catch(t){e=t}
 C(O+"/"+d,{recursive:true});
 D(O+"/"+d+"/stdout.bin",Buffer.from(o));
 D(O+"/"+d+"/exit.txt",e+"");
}
