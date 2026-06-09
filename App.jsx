import { useState } from "react";

const W = "#7A3B3B";
const WD = "#5A2828";
const R = "#C9A0A0";
const RL = "#EDD9D9";
const CR = "#FAF7F4";
const WM = "#F5F0EC";
const MT = "#9E8C8C";
const TX = "#3A2E2E";
const BD = "#E0D0D0";

const LOGO = "/logo.jpeg";

const inp = {
  width:"100%", background:"#fff", border:`1px solid ${BD}`,
  borderRadius:8, padding:"10px 12px", fontFamily:"inherit",
  fontSize:14, color:TX, outline:"none", boxSizing:"border-box"
};
const ta = {...inp, resize:"vertical", minHeight:70};

function Lbl({t,s}){
  return <div style={{fontSize:s?12:13,fontWeight:500,color:s?MT:TX,marginBottom:6,lineHeight:1.5}}>{t}</div>;
}
function Field({label,sub,children}){
  return <div style={{marginBottom:sub?10:16}}>{label&&<Lbl t={label} s={sub}/>}{children}</div>;
}
function Pill({label,sel,onClick,radio}){
  return (
    <div onClick={onClick} style={{
      display:"flex",alignItems:"center",gap:9,
      background:sel?"#F7EDED":"#fff",
      border:`1.5px solid ${sel?W:BD}`,
      borderRadius:8,padding:"10px 13px",cursor:"pointer",
      fontSize:13,color:TX,fontWeight:sel?600:400,
      lineHeight:1.4,userSelect:"none",transition:"border 0.1s"
    }}>
      <span style={{
        width:15,height:15,minWidth:15,
        border:`1.5px solid ${sel?W:BD}`,
        borderRadius:radio?"50%":3,
        background:sel?W:"transparent",
        display:"flex",alignItems:"center",justifyContent:"center",
        fontSize:9,color:"#fff",flexShrink:0
      }}>{sel?"✓":""}</span>
      {label}
    </div>
  );
}
function PillGrid({opts,val,setVal,radio,cols=2}){
  const click=(v)=>{
    if(radio){setVal(v);return;}
    setVal(prev=>{const a=prev||[];return a.includes(v)?a.filter(x=>x!==v):[...a,v];});
  };
  return (
    <div style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap:7}}>
      {opts.map(o=>(
        <Pill key={o.v} label={o.l} radio={radio}
          sel={radio?val===o.v:(val||[]).includes(o.v)}
          onClick={()=>click(o.v)}/>
      ))}
    </div>
  );
}
function Sub({show,children}){
  if(!show) return null;
  return <div style={{marginTop:8,padding:"11px 13px",background:WM,borderLeft:`3px solid ${R}`,borderRadius:"0 8px 8px 0"}}>{children}</div>;
}
function SecBox({title,children}){
  return (
    <div style={{border:`1px solid ${BD}`,borderRadius:12,marginBottom:18,overflow:"hidden"}}>
      <div style={{background:RL,padding:"10px 16px"}}>
        <span style={{fontFamily:"Georgia,serif",fontSize:13,fontWeight:700,color:W}}>{title}</span>
      </div>
      <div style={{padding:"16px 16px 8px",background:"#fff"}}>{children}</div>
    </div>
  );
}
function NavRow({onBack,onNext,nextLabel="Próxima →",last}){
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:24,paddingTop:14,borderTop:`1px solid ${BD}`}}>
      {onBack
        ?<button onClick={onBack} style={{background:"transparent",border:`1px solid ${BD}`,borderRadius:8,padding:"11px 18px",fontSize:13,color:MT,cursor:"pointer",fontFamily:"inherit"}}>← Voltar</button>
        :<div/>}
      <button onClick={onNext} style={{background:last?WD:W,color:"#fff",border:"none",borderRadius:8,padding:"11px 24px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
        {nextLabel}
      </button>
    </div>
  );
}

function gerarPDF(d){
  const df = d.data ? d.data.split("-").reverse().join("/") : "__/__/______";
  const logoUrl = window.location.origin + "/logo.jpeg";

  const sec=(t)=>`<div style="background:#EDD9D9;border-radius:6px 6px 0 0;padding:8px 14px;margin-top:20px;">
    <span style="font-family:Georgia,serif;font-size:12px;font-weight:700;color:#7A3B3B;">${t}</span></div>
    <div style="border:1px solid #E0D0D0;border-top:none;border-radius:0 0 8px 8px;padding:14px 16px;background:#fff;">`;
  const end=`</div>`;

  const linha=(label,val)=>val?`<div style="padding:5px 0;border-bottom:1px solid #F5F0EC;font-size:12px;display:flex;gap:8px;">
    <span style="color:#9E8C8C;min-width:170px;flex-shrink:0;">${label}</span>
    <span style="color:#3A2E2E;font-weight:500;">${val}</span></div>`:"";

  const bloco=(label,val)=>val?`<div style="padding:6px 0;border-bottom:1px solid #F5F0EC;">
    <div style="font-size:11px;color:#9E8C8C;margin-bottom:2px;">${label}</div>
    <div style="font-size:12px;color:#3A2E2E;line-height:1.6;">${val}</div></div>`:"";

  const cabecalho = `
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
    <div style="display:flex;align-items:center;gap:14px;">
      <img src="${logoUrl}" style="width:48px;height:48px;object-fit:contain;" alt="Logo"/>
      <div>
        <div style="font-size:16px;font-weight:700;letter-spacing:2px;color:#3A2E2E;">KARINA MAZZAROTTO</div>
        <div style="font-size:10px;letter-spacing:2px;color:#9E8C8C;">ESTÉTICA INTEGRATIVA</div>
      </div>
    </div>
    <div style="font-size:12px;color:#9E8C8C;">DATA: ${df}</div>
  </div>`;

  const html=`<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"/>
  <title>Anamnese — ${d.nome||"Paciente"}</title>
  <style>*{box-sizing:border-box;margin:0;padding:0;}body{font-family:'DM Sans',sans-serif;background:#fff;color:#3A2E2E;}
  @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact;}.no-print{display:none!important;}.pgbreak{page-break-before:always;}}</style>
  </head><body><div style="max-width:720px;margin:0 auto;padding:28px 28px 48px;">

  ${cabecalho}

  <div style="text-align:center;background:#EDD9D9;border-radius:8px;padding:10px;margin:16px 0 20px;">
    <span style="font-family:Georgia,serif;font-size:15px;font-weight:700;color:#7A3B3B;letter-spacing:1px;">ANAMNESE FACIAL INTEGRATIVA</span>
  </div>

  ${sec("Informações Pessoais")}
  ${linha("Nome",d.nome)}
  ${linha("Idade",d.idade?d.idade+" anos":"")}
  ${linha("Gênero",d.genero)}
  ${linha("Profissão",d.prof)}
  ${linha("CPF",d.cpf)}
  ${linha("Telefone",d.tel)}
  ${linha("Endereço",d.end)}
  ${linha("Estado civil",d.ecivil)}
  ${linha("Filhos",d.filhos==="sim"?"Sim"+(d.qtdF?" ("+d.qtdF+")":""):d.filhos==="nao"?"Não":"")}
  ${linha("Como chegou",d.como)}
  ${end}

  ${sec("Queixas e Objetivos")}
  ${bloco("Queixa principal",d.queixa)}
  ${linha("Duração da queixa",d.tempo)}
  ${bloco("Tratamentos anteriores",d.tratAntes)}
  ${bloco("Expectativa",d.expect)}
  ${linha("Como quer se sentir",d.sentir)}
  ${linha("Regiões de interesse",d.regioes.length>0?d.regioes.join(", "):"")}
  ${end}

  ${sec("Histórico da Pele")}
  ${linha("Tipo de pele",d.tipoPele)}
  ${linha("Problemas anteriores",[...d.probs,d.probsO].filter(Boolean).join(", "))}
  ${bloco("Tratamentos estéticos",d.tratEst)}
  ${linha("Reações adversas",d.reac)}
  ${linha("Filtro solar",d.fps==="sim"?"Sim — "+d.fpsDet:d.fps==="nao"?"Não":"")}
  ${linha("Maquiagem diária",d.maquiagem==="sim"?"Sim":"Não")}
  ${end}

  ${sec("Rotina de Skincare")}
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:4px;">
    <div style="background:#FAF7F4;border-radius:8px;padding:10px;">
      <div style="font-size:11px;font-weight:700;color:#7A3B3B;margin-bottom:6px;">MANHÃ</div>
      ${linha("Limpeza",d.mLimp)}${linha("Hidratante",d.mHid)}${linha("Protetor solar",d.mFPS)}${linha("Outros",d.mOut)}
    </div>
    <div style="background:#FAF7F4;border-radius:8px;padding:10px;">
      <div style="font-size:11px;font-weight:700;color:#7A3B3B;margin-bottom:6px;">NOITE</div>
      ${linha("Limpeza",d.nLimp)}${linha("Hidratante",d.nHid)}${linha("Outros",d.nOut)}
    </div>
  </div>
  ${end}

  ${sec("Hábitos e Estilo de Vida")}
  ${linha("Água por dia",d.agua?d.agua+"L":"")}
  ${linha("Qualidade do sono",d.sono)}
  ${linha("Intestino",d.intest)}
  ${linha("Refeições regulares",d.ref==="sim"?"Sim":d.ref==="nao"?"Não":"")}
  ${linha("Consome",d.consome.join(", "))}
  ${linha("Atividade física",d.atv==="sim"?"Sim"+(d.atvDet?" — "+d.atvDet:""):d.atv==="nao"?"Não":"")}
  ${linha("Nível de estresse",d.stress)}
  ${bloco("Impacto emocional na pele",d.emoc)}
  ${end}

  ${sec("Saúde Geral")}
  ${bloco("Condição médica importante",d.condMed)}
  ${linha("Medicação contínua",d.med==="sim"?d.medDet||"Sim":"Não")}
  ${linha("Cirurgia",d.cir==="sim"?d.cirDet||"Sim":"")}
  ${linha("Tratamento hormonal",d.horm==="sim"?d.hormDet||"Sim":"")}
  ${linha("Isotretinoína (Roacutan)",d.iso==="sim"?d.isoDet||"Sim":"")}
  ${linha("Lentes de contato",d.lentes==="sim"?"Sim":"Não")}
  ${linha("Epilepsia/convulsões",d.epil==="sim"?"Sim":"Não")}
  ${linha("Prótese",d.prot==="sim"?"Sim":"Não")}
  ${linha("Grávida/amamentando",d.grav==="sim"?"Sim":"Não")}
  ${linha("Marcapasso",d.marca==="sim"?d.marcaDet||"Sim":"")}
  ${linha("Alergias",d.alerg==="sim"?d.alergDet||"Sim":"Não")}
  ${linha("Reação a ácidos/anestésicos",d.racido==="sim"?d.racidoDet||"Sim":"")}
  ${end}

  ${sec("Ciclos Hormonais")}
  ${linha("Menstruação regular",d.menstr==="sim"?"Sim":d.menstr==="nao"?"Não":d.menstr==="na"?"N/A":"")}
  ${linha("Anticoncepcional",d.anticonc==="sim"?d.anticoncDet||"Sim":"Não")}
  ${linha("SOP",d.sop==="sim"?"Sim":"Não")}
  ${linha("Menopausa",d.meno==="sim"?"Sim":"Não")}
  ${linha("Reposição hormonal",d.repos==="sim"?"Sim":"Não")}
  ${end}

  <div class="pgbreak"></div>

  ${cabecalho}
  <div style="border:1.5px solid #E0D0D0;border-radius:10px;padding:20px;margin-top:16px;">
    <div style="background:#EDD9D9;border-radius:6px;padding:8px 12px;margin-bottom:16px;">
      <span style="font-size:12px;font-weight:700;color:#7A3B3B;">TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO PARA PROCEDIMENTOS ESTÉTICOS</span>
    </div>
    <p style="font-size:12px;line-height:1.8;color:#3A2E2E;">
      Eu, <span style="border-bottom:1px solid #9E8C8C;display:inline-block;min-width:280px;">&nbsp;${d.nome||""}&nbsp;</span>,
      portadora do CPF nº <span style="border-bottom:1px solid #9E8C8C;display:inline-block;min-width:160px;">&nbsp;${d.cpf||""}&nbsp;</span>,
      declaro que fui devidamente informada pela profissional Karina Mazzarotto, CPF nº 010.8799.44-1, sobre o(s) seguinte(s) procedimento(s) estético(s):
    </p>
    <div style="border-bottom:1px solid #E0D0D0;margin:8px 0;padding-bottom:8px;min-height:60px;font-size:12px;"></div>
    <ul style="font-size:12px;line-height:2;color:#3A2E2E;padding-left:16px;margin:12px 0;">
      <li>A natureza e objetivo do tratamento;</li>
      <li>Produtos, técnicas e equipamentos utilizados;</li>
      <li>Riscos, reações adversas e complicações possíveis;</li>
      <li>Cuidados necessários antes, durante e após o procedimento;</li>
      <li>A necessidade de manutenções periódicas e adesão a cuidados domiciliares;</li>
      <li>A individualidade dos resultados, que podem variar de acordo com fatores biológicos;</li>
      <li>A importância de comunicar, de forma honesta, o uso de medicamentos, histórico de alergias e condições de saúde relevantes.</li>
    </ul>
    <p style="font-size:12px;line-height:1.8;color:#3A2E2E;margin-top:10px;"><strong>Declaro que:</strong></p>
    <ul style="font-size:12px;line-height:2;color:#3A2E2E;padding-left:16px;margin:6px 0;">
      <li>Compreendi todas as informações prestadas;</li>
      <li>Esclareci todas as minhas dúvidas;</li>
      <li>Aceito, por minha livre vontade, a realização do(s) procedimento(s);</li>
      <li>Estou ciente dos riscos envolvidos e dos limites dos resultados.</li>
    </ul>
    <div style="margin-top:20px;font-size:12px;color:#3A2E2E;">
      <p>Local e Data: <span style="border-bottom:1px solid #9E8C8C;display:inline-block;min-width:300px;">&nbsp;</span></p>
      <p style="margin-top:16px;">Assinatura da paciente: <span style="border-bottom:1px solid #9E8C8C;display:inline-block;min-width:260px;">&nbsp;</span></p>
      <p style="margin-top:12px;">Assinatura da profissional: <span style="border-bottom:1px solid #9E8C8C;display:inline-block;min-width:248px;">&nbsp;</span></p>
    </div>
  </div>

  <div class="pgbreak"></div>

  ${cabecalho}
  <div style="border:1.5px solid #E0D0D0;border-radius:10px;padding:20px;margin-top:16px;">
    <div style="background:#EDD9D9;border-radius:6px;padding:8px 12px;margin-bottom:16px;">
      <span style="font-size:12px;font-weight:700;color:#7A3B3B;">AUTORIZAÇÃO PARA USO DE IMAGEM</span>
    </div>
    <p style="font-size:12px;line-height:1.8;color:#3A2E2E;">
      Eu, <span style="border-bottom:1px solid #9E8C8C;display:inline-block;min-width:280px;">&nbsp;${d.nome||""}&nbsp;</span>,
      portadora do CPF nº <span style="border-bottom:1px solid #9E8C8C;display:inline-block;min-width:160px;">&nbsp;${d.cpf||""}&nbsp;</span>,
      autorizo, de forma livre, informada e inequívoca, o uso da minha imagem (fotos e vídeos), captada durante atendimentos estéticos realizados na ESTÉTICA da profissional Karina Mazzarotto, CNPJ 24.558.580/0001-03, para:
    </p>
    <div style="margin:14px 0;font-size:12px;line-height:2.2;color:#3A2E2E;">
      <div>( &nbsp;) &nbsp;Acompanhamento da evolução do tratamento</div>
      <div>( &nbsp;) &nbsp;Divulgação em redes sociais da profissional</div>
      <div>( &nbsp;) &nbsp;Divulgação em materiais informativos e didáticos</div>
      <div>( &nbsp;) &nbsp;Apresentação de resultados (antes e depois), inclusive com finalidade publicitária</div>
      <div>( &nbsp;) &nbsp;Publicação em site, mídia impressa e campanhas de marketing da clínica</div>
    </div>
    <ul style="font-size:12px;line-height:2;color:#3A2E2E;padding-left:16px;margin:6px 0;">
      <li>A utilização ocorrerá de forma ética e respeitosa, sem distorções, montagens pejorativas ou exposição vexatória;</li>
      <li>A finalidade inclui divulgação e promoção dos serviços prestados pela profissional em ambiente físico ou digital;</li>
      <li>A autorização é válida por tempo indeterminado, podendo ser revogada a qualquer momento mediante solicitação por escrito;</li>
      <li>O uso das imagens respeita as disposições da Lei 13.709/2018 (LGPD) e do art. 20 do Código Civil Brasileiro.</li>
    </ul>
    <div style="margin-top:20px;font-size:12px;color:#3A2E2E;">
      <p>Local e Data: <span style="border-bottom:1px solid #9E8C8C;display:inline-block;min-width:300px;">&nbsp;</span></p>
      <p style="margin-top:16px;">Assinatura da paciente: <span style="border-bottom:1px solid #9E8C8C;display:inline-block;min-width:260px;">&nbsp;</span></p>
      <p style="margin-top:12px;">Assinatura da profissional: <span style="border-bottom:1px solid #9E8C8C;display:inline-block;min-width:248px;">&nbsp;</span></p>
    </div>
  </div>

  <div style="margin-top:28px;padding-top:12px;border-top:1px solid #E0D0D0;text-align:center;">
    <div style="font-size:10px;color:#9E8C8C;letter-spacing:1px;">Dra. Karina Mazzarotto · Estética Integrativa · @esteticakarinamazzarotto</div>
    <div style="font-size:10px;color:#C9A0A0;margin-top:3px;font-style:italic;">Menos maquiagem, mais pele de verdade.</div>
  </div>

  </div>
  <div class="no-print" style="position:fixed;bottom:20px;right:20px;">
    <button onclick="window.print()" style="background:#7A3B3B;color:#fff;border:none;border-radius:10px;padding:14px 22px;font-size:14px;font-weight:600;cursor:pointer;box-shadow:0 4px 14px rgba(122,59,59,0.3);">🖨️ Salvar / Imprimir PDF</button>
  </div>
  </body></html>`;

  const j=window.open("","_blank");
  j.document.write(html);
  j.document.close();
  setTimeout(()=>j.print(),800);
}

export default function App(){
  const [step,setStep]=useState(0);
  const [done,setDone]=useState(false);

  const [nome,setNome]=useState("");
  const [data,setData]=useState(new Date().toISOString().split("T")[0]);
  const [idade,setIdade]=useState("");
  const [genero,setGenero]=useState("");
  const [prof,setProf]=useState("");
  const [cpf,setCpf]=useState("");
  const [tel,setTel]=useState("");
  const [end,setEnd]=useState("");
  const [ecivil,setEcivil]=useState("");
  const [filhos,setFilhos]=useState("");
  const [qtdF,setQtdF]=useState("");
  const [como,setComo]=useState("");
  const [queixa,setQueixa]=useState("");
  const [tempo,setTempo]=useState("");
  const [tratAntes,setTratAntes]=useState("");
  const [expect,setExpect]=useState("");
  const [sentir,setSentir]=useState("");
  const [regioes,setRegioes]=useState([]);
  const [tipoPele,setTipoPele]=useState("");
  const [probs,setProbs]=useState([]);
  const [probsO,setProbsO]=useState("");
  const [tratEst,setTratEst]=useState("");
  const [reac,setReac]=useState("");
  const [fps,setFps]=useState("");
  const [fpsDet,setFpsDet]=useState("");
  const [maquiagem,setMaquiagem]=useState("");
  const [mLimp,setMLimp]=useState("");
  const [mHid,setMHid]=useState("");
  const [mFPS,setMFPS]=useState("");
  const [mOut,setMOut]=useState("");
  const [nLimp,setNLimp]=useState("");
  const [nHid,setNHid]=useState("");
  const [nOut,setNOut]=useState("");
  const [agua,setAgua]=useState("");
  const [sono,setSono]=useState("");
  const [intest,setIntest]=useState("");
  const [ref,setRef]=useState("");
  const [consome,setConsome]=useState([]);
  const [atv,setAtv]=useState("");
  const [atvDet,setAtvDet]=useState("");
  const [stress,setStress]=useState("");
  const [emoc,setEmoc]=useState("");
  const [condMed,setCondMed]=useState("");
  const [med,setMed]=useState("");
  const [medDet,setMedDet]=useState("");
  const [cir,setCir]=useState("");
  const [cirDet,setCirDet]=useState("");
  const [horm,setHorm]=useState("");
  const [hormDet,setHormDet]=useState("");
  const [iso,setIso]=useState("");
  const [isoDet,setIsoDet]=useState("");
  const [lentes,setLentes]=useState("");
  const [epil,setEpil]=useState("");
  const [prot,setProt]=useState("");
  const [marca,setMarca]=useState("");
  const [marcaDet,setMarcaDet]=useState("");
  const [grav,setGrav]=useState("");
  const [alerg,setAlerg]=useState("");
  const [alergDet,setAlergDet]=useState("");
  const [racido,setRacido]=useState("");
  const [racidoDet,setRacidoDet]=useState("");
  const [menstr,setMenstr]=useState("");
  const [anticonc,setAnticonc]=useState("");
  const [anticoncDet,setAnticoncDet]=useState("");
  const [sop,setSop]=useState("");
  const [meno,setMeno]=useState("");
  const [repos,setRepos]=useState("");

  const go=(n)=>{setStep(n);window.scrollTo(0,0);};
  const pct=done?100:Math.round((step/4)*100);

  const exportar=()=>gerarPDF({
    nome,data,idade,genero,prof,cpf,tel,end,ecivil,filhos,qtdF,como,
    queixa,tempo,tratAntes,expect,sentir,regioes,
    tipoPele,probs,probsO,tratEst,reac,fps,fpsDet,maquiagem,
    mLimp,mHid,mFPS,mOut,nLimp,nHid,nOut,
    agua,sono,intest,ref,consome,atv,atvDet,stress,emoc,
    condMed,med,medDet,cir,cirDet,horm,hormDet,iso,isoDet,
    lentes,epil,prot,marca,marcaDet,grav,alerg,alergDet,racido,racidoDet,
    menstr,anticonc,anticoncDet,sop,meno,repos
  });

  const hdr={background:W,padding:"18px 18px 14px"};
  const prog={background:WD,padding:"9px 18px",display:"flex",alignItems:"center",gap:10,position:"sticky",top:0,zIndex:50};
  const main={maxWidth:640,margin:"0 auto",padding:"22px 15px 56px"};

  const SHdr=({n,t})=>(
    <div style={{marginBottom:20}}>
      <div style={{fontSize:10,letterSpacing:3,textTransform:"uppercase",color:R,fontWeight:600,marginBottom:3}}>{n}</div>
      <div style={{fontFamily:"Georgia,serif",fontSize:18,fontWeight:400,color:W,lineHeight:1.35}}>{t}</div>
    </div>
  );

  const Header = () => (
    <div style={hdr}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14}}>
        <img src={LOGO} alt="Logo" style={{width:48,height:48,objectFit:"contain",background:"#fff",borderRadius:"50%",padding:3}}/>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:9,letterSpacing:3,color:RL,textTransform:"uppercase"}}>Karina Mazzarotto</div>
          <div style={{fontFamily:"Georgia,serif",fontSize:17,color:"#fff",fontWeight:400}}>Anamnese Facial Integrativa</div>
        </div>
      </div>
    </div>
  );

  if(done){
    return (
      <div style={{fontFamily:"'DM Sans','Helvetica Neue',sans-serif",background:CR,minHeight:"100vh",color:TX}}>
        <Header/>
        <div style={main}>
          <div style={{textAlign:"center",padding:"28px 20px",background:"#fff",borderRadius:14,border:`1px solid ${BD}`,marginBottom:20}}>
            <div style={{fontSize:36,marginBottom:12}}>✅</div>
            <div style={{fontFamily:"Georgia,serif",fontSize:18,color:W,marginBottom:8}}>Ficha enviada com sucesso!</div>
            <div style={{fontSize:13,color:MT,lineHeight:1.8}}>
              Obrigada, <strong style={{color:TX}}>{nome||"paciente"}</strong>!<br/>
              Suas informações foram registradas.<br/>
              Nos vemos em breve. 🌸
            </div>
          </div>
          <button onClick={exportar} style={{width:"100%",background:W,color:"#fff",border:"none",borderRadius:10,padding:15,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",marginBottom:10}}>
            📄 Baixar minha ficha em PDF
          </button>
          <div style={{fontSize:11,color:MT,textAlign:"center",fontStyle:"italic"}}>
            O PDF inclui a anamnese + Termo de Consentimento + Autorização de Imagem.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{fontFamily:"'DM Sans','Helvetica Neue',sans-serif",background:CR,minHeight:"100vh",color:TX}}>
      <Header/>
      <div style={prog}>
        <div style={{flex:1,height:3,background:"rgba(255,255,255,0.2)",borderRadius:2,overflow:"hidden"}}>
          <div style={{width:`${pct}%`,height:"100%",background:RL,borderRadius:2,transition:"width 0.4s"}}/>
        </div>
        <div style={{fontSize:11,color:RL,whiteSpace:"nowrap",letterSpacing:1}}>Etapa {step+1} de 5</div>
      </div>
      <div style={main}>

        {step===0&&(<div>
          <SHdr n="Etapa 1" t="Informações Pessoais"/>
          <SecBox title="Informações Pessoais">
            <Field label="Nome completo"><input style={inp} value={nome} onChange={e=>setNome(e.target.value)} placeholder="Seu nome completo"/></Field>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <Field label="Data de hoje"><input type="date" style={inp} value={data} onChange={e=>setData(e.target.value)}/></Field>
              <Field label="Idade"><input type="number" style={inp} value={idade} onChange={e=>setIdade(e.target.value)} placeholder="Ex: 32"/></Field>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <Field label="Gênero"><input style={inp} value={genero} onChange={e=>setGenero(e.target.value)} placeholder="Feminino / Masculino"/></Field>
              <Field label="Profissão"><input style={inp} value={prof} onChange={e=>setProf(e.target.value)} placeholder="Ex: Professora"/></Field>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <Field label="CPF"><input style={inp} value={cpf} onChange={e=>setCpf(e.target.value)} placeholder="000.000.000-00"/></Field>
              <Field label="Telefone"><input style={inp} value={tel} onChange={e=>setTel(e.target.value)} placeholder="(81) 99999-9999"/></Field>
            </div>
            <Field label="Endereço"><input style={inp} value={end} onChange={e=>setEnd(e.target.value)} placeholder="Rua, número, bairro…"/></Field>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <Field label="Estado civil"><input style={inp} value={ecivil} onChange={e=>setEcivil(e.target.value)} placeholder="Ex: Casada"/></Field>
              <Field label="Filhos">
                <PillGrid opts={[{v:"sim",l:"Sim"},{v:"nao",l:"Não"}]} val={filhos} setVal={setFilhos} radio/>
                <Sub show={filhos==="sim"}><Field label="Quantos?" sub><input type="number" style={inp} value={qtdF} onChange={e=>setQtdF(e.target.value)} placeholder="Ex: 2"/></Field></Sub>
              </Field>
            </div>
            <Field label="Como chegou até a estética?"><input style={inp} value={como} onChange={e=>setComo(e.target.value)} placeholder="Indicação, Instagram, Google…"/></Field>
          </SecBox>
          <SecBox title="Queixas e Objetivos">
            <Field label="Qual a sua principal queixa em relação à pele hoje?"><textarea style={ta} value={queixa} onChange={e=>setQueixa(e.target.value)} placeholder="Descreva com suas palavras…"/></Field>
            <Field label="Há quanto tempo essa queixa está presente?"><input style={inp} value={tempo} onChange={e=>setTempo(e.target.value)} placeholder="Ex: 2 anos, desde a gravidez…"/></Field>
            <Field label="Já buscou tratamentos antes? Quais foram os resultados?"><textarea style={ta} value={tratAntes} onChange={e=>setTratAntes(e.target.value)} placeholder="Tratamentos e resultados…"/></Field>
            <Field label="O que você espera melhorar com esse acompanhamento?"><textarea style={ta} value={expect} onChange={e=>setExpect(e.target.value)} placeholder="Suas expectativas…"/></Field>
            <Field label="Como você gostaria de se sentir com a sua pele?"><input style={inp} value={sentir} onChange={e=>setSentir(e.target.value)} placeholder="Ex: mais confiante, sem maquiagem…"/></Field>
            <Field label="Região que mais te incomoda ou deseja transformar:">
              <PillGrid cols={2} opts={[
                {v:"Testa",l:"Testa"},{v:"Olheiras",l:"Olheiras"},
                {v:"Bochechas",l:"Bochechas"},{v:"Nariz",l:"Nariz"},
                {v:"Lábios/bigode",l:"Lábios / bigode"},{v:"Queixo",l:"Queixo"},
                {v:"Mandíbula",l:"Mandíbula"},{v:"Pescoço",l:"Pescoço"},
                {v:"Rosto todo",l:"Rosto todo"},
              ]} val={regioes} setVal={setRegioes}/>
            </Field>
          </SecBox>
          <NavRow onNext={()=>go(1)}/>
        </div>)}

        {step===1&&(<div>
          <SHdr n="Etapa 2" t="Histórico da Pele e Skincare"/>
          <SecBox title="Histórico da Pele">
            <Field label="Como você definiria sua pele atualmente?">
              <PillGrid opts={[{v:"Oleosa",l:"Oleosa"},{v:"Seca",l:"Seca"},{v:"Mista",l:"Mista"},{v:"Sensível",l:"Sensível"},{v:"Acnéica",l:"Acnéica"},{v:"Madura",l:"Madura"}]} val={tipoPele} setVal={setTipoPele} radio/>
            </Field>
            <Field label="Já teve problemas como:">
              <PillGrid opts={[{v:"Acne",l:"Acne"},{v:"Melasma",l:"Melasma"},{v:"Rosácea",l:"Rosácea"},{v:"Dermatite",l:"Dermatite"},{v:"Alergias",l:"Alergias"}]} val={probs} setVal={setProbs}/>
              <div style={{marginTop:7}}><input style={inp} value={probsO} onChange={e=>setProbsO(e.target.value)} placeholder="Outros…"/></div>
            </Field>
            <Field label="Já realizou tratamentos estéticos? Quais?"><textarea style={ta} value={tratEst} onChange={e=>setTratEst(e.target.value)} placeholder="Ex: peeling, microagulhamento…"/></Field>
            <Field label="Já teve reações adversas com cosméticos ou procedimentos?"><input style={inp} value={reac} onChange={e=>setReac(e.target.value)} placeholder="Descreva se houver…"/></Field>
            <Field label="Usa filtro solar?">
              <PillGrid opts={[{v:"sim",l:"Sim"},{v:"nao",l:"Não"}]} val={fps} setVal={setFps} radio/>
              <Sub show={fps==="sim"}><Field label="Qual FPS e com que frequência?" sub><input style={inp} value={fpsDet} onChange={e=>setFpsDet(e.target.value)} placeholder="Ex: FPS 50, todo dia de manhã"/></Field></Sub>
            </Field>
            <Field label="Usa maquiagem no dia a dia?">
              <PillGrid opts={[{v:"sim",l:"Sim"},{v:"nao",l:"Não"}]} val={maquiagem} setVal={setMaquiagem} radio/>
            </Field>
          </SecBox>
          <SecBox title="Rotina de Skincare Atual">
            <div style={{background:WM,borderRadius:9,padding:"12px 12px 6px",marginBottom:10}}>
              <div style={{fontSize:13,fontWeight:600,color:W,marginBottom:8}}>🌅 Pela manhã</div>
              <Field label="Limpeza" sub><input style={inp} value={mLimp} onChange={e=>setMLimp(e.target.value)} placeholder="Nome do produto"/></Field>
              <Field label="Hidratante" sub><input style={inp} value={mHid} onChange={e=>setMHid(e.target.value)} placeholder="Nome do produto"/></Field>
              <Field label="Protetor solar" sub><input style={inp} value={mFPS} onChange={e=>setMFPS(e.target.value)} placeholder="Nome e FPS"/></Field>
              <Field label="Outros" sub><input style={inp} value={mOut} onChange={e=>setMOut(e.target.value)} placeholder="Sérum, vitamina C…"/></Field>
            </div>
            <div style={{background:WM,borderRadius:9,padding:"12px 12px 6px"}}>
              <div style={{fontSize:13,fontWeight:600,color:W,marginBottom:8}}>🌙 À noite</div>
              <Field label="Limpeza" sub><input style={inp} value={nLimp} onChange={e=>setNLimp(e.target.value)} placeholder="Nome do produto"/></Field>
              <Field label="Hidratante" sub><input style={inp} value={nHid} onChange={e=>setNHid(e.target.value)} placeholder="Nome do produto"/></Field>
              <Field label="Outros" sub><input style={inp} value={nOut} onChange={e=>setNOut(e.target.value)} placeholder="Retinol, ácido, sérum…"/></Field>
            </div>
          </SecBox>
          <NavRow onBack={()=>go(0)} onNext={()=>go(2)}/>
        </div>)}

        {step===2&&(<div>
          <SHdr n="Etapa 3" t="Hábitos e Estilo de Vida"/>
          <SecBox title="Hábitos e Estilo de Vida">
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <Field label="Água por dia (litros)"><input type="number" style={inp} value={agua} onChange={e=>setAgua(e.target.value)} placeholder="Ex: 1.5" step="0.5"/></Field>
              <Field label="Qualidade do sono"><input style={inp} value={sono} onChange={e=>setSono(e.target.value)} placeholder="Ex: boa, insônia…"/></Field>
            </div>
            <Field label="Como está seu intestino?">
              <PillGrid cols={3} opts={[{v:"Regular",l:"Regular"},{v:"Prende",l:"Prende"},{v:"Solto",l:"Solto"}]} val={intest} setVal={setIntest} radio/>
            </Field>
            <Field label="Refeições regulares?">
              <PillGrid opts={[{v:"sim",l:"Sim"},{v:"nao",l:"Não"}]} val={ref} setVal={setRef} radio/>
            </Field>
            <Field label="Consome:">
              <PillGrid opts={[{v:"Café",l:"Café"},{v:"Álcool",l:"Álcool"},{v:"Cigarro",l:"Cigarro"},{v:"Doces em excesso",l:"Doces em excesso"}]} val={consome} setVal={setConsome}/>
            </Field>
            <Field label="Pratica atividade física?">
              <PillGrid opts={[{v:"sim",l:"Sim"},{v:"nao",l:"Não"}]} val={atv} setVal={setAtv} radio/>
              <Sub show={atv==="sim"}><Field label="Qual e com que frequência?" sub><input style={inp} value={atvDet} onChange={e=>setAtvDet(e.target.value)} placeholder="Ex: caminhada 3×/semana"/></Field></Sub>
            </Field>
            <Field label="Nível de estresse">
              <PillGrid cols={3} opts={[{v:"Baixo",l:"Baixo"},{v:"Moderado",l:"Moderado"},{v:"alto",l:"Alto"}]} val={stress} setVal={setStress} radio/>
            </Field>
            <Field label="Sente impacto emocional na sua pele?"><input style={inp} value={emoc} onChange={e=>setEmoc(e.target.value)} placeholder="Ex: piora em períodos de estresse…"/></Field>
          </SecBox>
          <NavRow onBack={()=>go(1)} onNext={()=>go(3)}/>
        </div>)}

        {step===3&&(<div>
          <SHdr n="Etapa 4" t="Saúde Geral e Ciclos Hormonais"/>
          <SecBox title="Saúde Geral">
            <Field label="Tem alguma condição médica importante:"><input style={inp} value={condMed} onChange={e=>setCondMed(e.target.value)} placeholder="Descreva se houver…"/></Field>
            {[
              {lbl:"Faz uso de medicamentos contínuos?",st:med,setSt:setMed,dk:medDet,setDk:setMedDet,ph:"Nome, dosagem, frequência…",multi:true},
              {lbl:"Já fez alguma cirurgia?",st:cir,setSt:setCir,dk:cirDet,setDk:setCirDet,ph:"Qual e quando?"},
              {lbl:"Faz tratamento hormonal?",st:horm,setSt:setHorm,dk:hormDet,setDk:setHormDet,ph:"Qual?"},
              {lbl:"Já usou isotretinoína (Roacutan)?",st:iso,setSt:setIso,dk:isoDet,setDk:setIsoDet,ph:"Quando?"},
            ].map((item,i)=>(
              <Field key={i} label={item.lbl}>
                <PillGrid opts={[{v:"sim",l:"Sim"},{v:"nao",l:"Não"}]} val={item.st} setVal={item.setSt} radio/>
                <Sub show={item.st==="sim"}>
                  <Field label="Detalhes:" sub>
                    {item.multi
                      ?<textarea style={ta} value={item.dk} onChange={e=>item.setDk(e.target.value)} placeholder={item.ph}/>
                      :<input style={inp} value={item.dk} onChange={e=>item.setDk(e.target.value)} placeholder={item.ph}/>}
                  </Field>
                </Sub>
              </Field>
            ))}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <Field label="Lentes de contato?"><PillGrid opts={[{v:"sim",l:"Sim"},{v:"nao",l:"Não"}]} val={lentes} setVal={setLentes} radio/></Field>
              <Field label="Epilepsia/convulsões?"><PillGrid opts={[{v:"sim",l:"Sim"},{v:"nao",l:"Não"}]} val={epil} setVal={setEpil} radio/></Field>
              <Field label="Possui prótese?"><PillGrid opts={[{v:"sim",l:"Sim"},{v:"nao",l:"Não"}]} val={prot} setVal={setProt} radio/></Field>
              <Field label="Grávida/amamentando?"><PillGrid opts={[{v:"sim",l:"Sim"},{v:"nao",l:"Não"}]} val={grav} setVal={setGrav} radio/></Field>
            </div>
            <Field label="Marcapasso ou alterações cardíacas?">
              <PillGrid opts={[{v:"sim",l:"Sim"},{v:"nao",l:"Não"}]} val={marca} setVal={setMarca} radio/>
              <Sub show={marca==="sim"}><Field label="Qual?" sub><input style={inp} value={marcaDet} onChange={e=>setMarcaDet(e.target.value)} placeholder="Descreva…"/></Field></Sub>
            </Field>
            <Field label="Alergias conhecidas?">
              <PillGrid opts={[{v:"sim",l:"Sim"},{v:"nao",l:"Não"}]} val={alerg} setVal={setAlerg} radio/>
              <Sub show={alerg==="sim"}><Field label="Quais?" sub><input style={inp} value={alergDet} onChange={e=>setAlergDet(e.target.value)} placeholder="Ex: dipirona, fragrâncias…"/></Field></Sub>
            </Field>
            <Field label="Já teve reação a ácidos ou anestésicos tópicos?">
              <PillGrid opts={[{v:"sim",l:"Sim"},{v:"nao",l:"Não"}]} val={racido} setVal={setRacido} radio/>
              <Sub show={racido==="sim"}><Field label="Qual?" sub><input style={inp} value={racidoDet} onChange={e=>setRacidoDet(e.target.value)} placeholder="Descreva a reação…"/></Field></Sub>
            </Field>
          </SecBox>
          <SecBox title="Ciclos Hormonais">
            <Field label="Menstruação regular?">
              <PillGrid cols={3} opts={[{v:"sim",l:"Sim"},{v:"nao",l:"Não"},{v:"na",l:"N/A"}]} val={menstr} setVal={setMenstr} radio/>
            </Field>
            <Field label="Uso de anticoncepcional?">
              <PillGrid opts={[{v:"sim",l:"Sim"},{v:"nao",l:"Não"}]} val={anticonc} setVal={setAnticonc} radio/>
              <Sub show={anticonc==="sim"}><Field label="Qual e há quanto tempo?" sub><input style={inp} value={anticoncDet} onChange={e=>setAnticoncDet(e.target.value)} placeholder="Nome, há quanto tempo…"/></Field></Sub>
            </Field>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
              <Field label="SOP?"><PillGrid opts={[{v:"sim",l:"Sim"},{v:"nao",l:"Não"}]} val={sop} setVal={setSop} radio/></Field>
              <Field label="Menopausa?"><PillGrid opts={[{v:"sim",l:"Sim"},{v:"nao",l:"Não"}]} val={meno} setVal={setMeno} radio/></Field>
              <Field label="Reposição hormonal?"><PillGrid opts={[{v:"sim",l:"Sim"},{v:"nao",l:"Não"}]} val={repos} setVal={setRepos} radio/></Field>
            </div>
          </SecBox>
          <NavRow onBack={()=>go(2)} onNext={()=>go(4)}/>
        </div>)}

        {step===4&&(<div>
          <SHdr n="Etapa 5" t="Termos e Confirmação"/>
          <div style={{background:"#fff",border:`1px solid ${BD}`,borderRadius:12,padding:16,marginBottom:16}}>
            <div style={{background:RL,borderRadius:6,padding:"8px 12px",marginBottom:12}}>
              <span style={{fontFamily:"Georgia,serif",fontSize:13,fontWeight:700,color:W}}>Termo de Consentimento</span>
            </div>
            <p style={{fontSize:13,color:TX,lineHeight:1.8}}>
              Declaro que fui devidamente informada sobre os procedimentos, riscos e cuidados envolvidos.
              Compreendi todas as informações, esclareci minhas dúvidas e aceito, por livre vontade, a realização dos procedimentos.
            </p>
          </div>
          <div style={{background:"#fff",border:`1px solid ${BD}`,borderRadius:12,padding:16,marginBottom:16}}>
            <div style={{background:RL,borderRadius:6,padding:"8px 12px",marginBottom:12}}>
              <span style={{fontFamily:"Georgia,serif",fontSize:13,fontWeight:700,color:W}}>Autorização de Imagem</span>
            </div>
            <p style={{fontSize:13,color:TX,lineHeight:1.8,marginBottom:12}}>
              Autorizo o uso das minhas imagens captadas durante os atendimentos para fins de acompanhamento, divulgação e materiais educativos, respeitando a LGPD e o Código Civil Brasileiro.
            </p>
          </div>
          <div style={{background:"#FFF8F8",border:`1.5px solid ${W}`,borderRadius:10,padding:14,marginBottom:18}}>
            <p style={{fontSize:13,color:TX,lineHeight:1.7,fontWeight:500}}>
              ✅ Ao confirmar, declaro que li e concordo com o Termo de Consentimento e a Autorização de Imagem.
              As assinaturas físicas serão coletadas presencialmente na consulta.
            </p>
          </div>
          <NavRow onBack={()=>go(3)} onNext={()=>setDone(true)} nextLabel="Confirmar e Enviar ✓" last/>
        </div>)}

      </div>
    </div>
  );
}
