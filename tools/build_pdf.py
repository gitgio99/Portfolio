"""Build a deliberately paginated, Korean portfolio from shared website content."""
import json
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from draw_diagram_pdf import draw_scene

ROOT=Path(__file__).resolve().parent.parent
DATA=json.loads((ROOT/'tools/portfolio-data.json').read_text(encoding='utf-8'))
SCENES=json.loads((ROOT/'tools/diagram-scenes.json').read_text(encoding='utf-8'))
DIAGRAM_IDS={'display','linux','integration','pipeline'}
PAGE_MAP={};next_page=3
for project in DATA['projects']:
 PAGE_MAP[project['id']]=next_page;next_page+=2 if project['id'] in DIAGRAM_IDS else 1
PROFILE_PAGE=next_page;AWARDS_PAGE=next_page+1;TOTAL=AWARDS_PAGE
OUT=ROOT/'output/pdf/Jioh_Jeon_Portfolio_KO.pdf'
OUT.parent.mkdir(parents=True,exist_ok=True)
pdfmetrics.registerFont(TTFont('KR','C:/Windows/Fonts/malgun.ttf'))
pdfmetrics.registerFont(TTFont('KRB','C:/Windows/Fonts/malgunbd.ttf'))
pdfmetrics.registerFontFamily('KR',normal='KR',bold='KRB',italic='KR',boldItalic='KRB')
W,H=595.276,841.89
INK=HexColor('#172c32'); MUTED=HexColor('#53686b'); GREEN=HexColor('#126b59'); SOFT=HexColor('#e8eee7'); BG=HexColor('#f7f6f0'); LINE=HexColor('#ced8d2'); ORANGE=HexColor('#a95232')
c=canvas.Canvas(str(OUT),pagesize=(W,H))
c.setTitle('전지오 | Embedded & System Software Portfolio')
c.setAuthor('Jioh Jeon')
c.setSubject('STM32, Linux, real-time interfaces and system integration')
def text(s,x,y,size=10,font='KR',color=INK):
 c.setFillColor(color);c.setFont(font,size);c.drawString(x,H-y-size,s)
def line(y,x=43,w=W-86):
 c.setStrokeColor(LINE);c.setLineWidth(.6);c.line(x,H-y,x+w,H-y)
def rect(x,y,w,h,color):
 c.setFillColor(color);c.rect(x,H-y-h,w,h,fill=1,stroke=0)
def para(s,x,y,w,size=10,leading=16,color=INK,bold=False):
 style=ParagraphStyle('p',fontName='KRB' if bold else 'KR',fontSize=size,leading=leading,textColor=color,wordWrap='CJK')
 p=Paragraph(s,style);_,height=p.wrap(w,H);p.drawOn(c,x,H-y-height);return y+height
def bullet(s,y,size=9.6):
 lead,sep,rest=s.partition(': ')
 formatted=f'<b>{escape(lead)}:</b> {escape(rest)}' if sep else escape(s)
 text('•',48,y+1,size,color=GREEN)
 return para(formatted,61,y,W-109,size,15.2,color=MUTED)+6
def base(page,section):
 rect(0,0,W,H,BG);text('JIOH JEON',43,25,9,'KRB');text('EMBEDDED & SYSTEM SOFTWARE',310,27,7,'KR',MUTED)
 line(48);line(H-45);text(section,43,H-34,7,'KR',MUTED);text(f'{page:02d} / {TOTAL}',508,H-34,7,'KR',MUTED)
def end(y=None):
 if y is not None and y>H- sixty: raise RuntimeError(f'Page content overflow: {y}')
 c.showPage()
sixty=60

# Cover
base(1,'PORTFOLIO / SEPTEMBER 2026')
text('ENTRY-LEVEL APPLICATION',43,91,9,'KRB',GREEN)
text('하드웨어의 동작을 이해하고,',43,133,26,'KRB')
text('소프트웨어로 연결합니다.',43,176,26,'KRB',GREEN)
text('전지오',43,244,24,'KRB');text('Jioh Jeon',141,256,12,'KR',MUTED)
text('임베디드 · 시스템 소프트웨어',43,288,13,'KRB')
text('IPG Automotive Korea 재직 중 · 신입 지원',43,316,10,'KR',MUTED)
rect(43,369,W-86,225,INK)
for i,(title,sub) in enumerate([
 ('Hardware control','STM32 · GPIO · UART · TIM1 / DMA'),
 ('System software','C / C++ · Linux · Threads · TCP'),
 ('System integration','Interfaces · Lifecycle · Validation')]):
 y=392+i*63;text(f'0{i+1}',61,y,11,'KR',HexColor('#91bba8'));text(title,99,y-3,15,'KRB',BG);text(sub,99,y+22,9,'KR',HexColor('#c3d4c9'))
y=626
for s in ['STM32 주변장치 제어부터 Linux 장치 모듈까지의 구현 경험','모델·통신·실장비 사이의 문제를 분석하고 연결한 실무 경험','프로젝트별 본인 기여, 설계 판단, 결과와 확인 범위 정리']:y=bullet(s,y,10)
text(DATA['email'],43,735,9,'KR',GREEN);c.linkURL('mailto:'+DATA['email'],(43,H-751,260,H-732),relative=0)
text('github.com/gitgio99',360,735,9,'KR',GREEN);c.linkURL(DATA['github'],(350,H-751,550,H-732),relative=0)
c.showPage()

# Reading map
base(2,'PROJECT MAP')
text('프로젝트 한눈에 보기',43,76,25,'KRB')
para('관심 기술에서 출발해, 역할과 구현 근거까지 확인할 수 있는 8개 프로젝트',43,119,W-86,10,16,MUTED)
for i,p in enumerate(DATA['projects']):
 y=168+i*62
 text(p['no'],43,y,20,'KR',GREEN);text(p['title'][0],87,y,13,'KRB')
 para(escape(p['relevance'][0]),87,y+26,400,9,14,MUTED)
 text(f"{PAGE_MAP[p['id']]:02d}",526,y+5,10,'KRB',GREEN);line(y+55)
 c.linkRect('',p['id'],(43,H-y-54,W-43,H-y+3),relative=0,thickness=0)
rect(43,693,W-86,61,SOFT)
para('<b>읽는 순서</b>  요약과 역할 → 처리 흐름 → 본인 기여 → 문제 해결 → 성장과 결과',57,706,W-114,9.4,16)
para('개발 경험과 교육 이수 항목을 구분하고, 팀 성과에는 팀 기여 범위 표시',57,730,W-114,8.5,13,MUTED)
c.showPage()

for i,p in enumerate(DATA['projects']):
 base(PAGE_MAP[p['id']],f"PROJECT {p['no']} / {p['year']}");c.bookmarkPage(p['id']);c.addOutlineEntry(p['title'][0],p['id'],0)
 text(p['no'],43,69,28,'KR',GREEN)
 y=para(escape(p['title'][0]),92,73,W-135,20,27,bold=True)
 y=para(escape(p['subtitle'][0]),43,max(112,y+9),W-86,8.5,13,MUTED)
 y=para(escape(p['period'][0]+'  |  '+p['role'][0]),43,y+7,W-86,8.3,13,MUTED)
 y=para(escape(p['summary'][0]),43,y+13,W-86,10.3,17,bold=True)
 y=para(escape('  /  '.join(p['tags'])),43,y+9,W-86,8.2,13,GREEN)+14
 # Vector architecture, crisp at any zoom.
 rect(43,y,W-86,81,SOFT)
 text('PROCESS FLOW',55,y+8,7,'KRB',GREEN)
 if p.get('branched'):
  for label,x,dy in [(p['flow'][0],55,22),(p['flow'][1],55,43),(p['flow'][2],226,30),(p['flow'][3],397,30)]:
   rect(x,y+dy,142,18,HexColor('#fffefa'));para(escape(label),x+7,y+dy+3,128,7.5,10)
  text('→',203,y+25,9,'KR',GREEN);text('→',203,y+44,9,'KR',GREEN);text('→',374,y+33,9,'KR',GREEN)
 else:
  boxw=109; gap=14
  for j,label in enumerate(p['flow']):
   x=55+j*(boxw+gap);rect(x,y+27,boxw,26,HexColor('#fffefa'))
   para(escape(label),x+5,y+34,boxw-10,7.3,10)
   if j<3:text('→',x+boxw+2,y+33,9,'KR',GREEN)
 para(escape(p['flowNote'][0]),55,y+64 if p.get('branched') else y+60,W-110,7.3,11,MUTED)
 y+=97
 for j,(heading,items) in enumerate(p['sections']):
  text(f'0{j+1}',43,y+2,8,'KRB',ORANGE);text(heading[0],65,y,11,'KRB');y+=24
  for item in items:y=bullet(item[0],y)
  y+=7
 if p.get('repo'):
  text(p['repo'],43,y,8,'KR',GREEN);c.linkURL(p['repo'],(43,H-y-14,400,H-y),relative=0);y+=18
 if y>H-60:raise RuntimeError(f"Overflow {p['id']}: {y:.1f}")
 print(p['id'],f'content bottom {y:.1f}')
 c.showPage()
 if p['id'] in DIAGRAM_IDS:
  base(PAGE_MAP[p['id']]+1,f"SYSTEM ARCHITECTURE / {p['no']}")
  c.bookmarkPage(p['id']+'-architecture');c.addOutlineEntry(p['title'][0]+' 구성도',p['id']+'-architecture',1)
  text('시스템 구성도',43,77,23,'KRB');text(p['title'][0],43,119,12,'KRB',GREEN)
  scene=SCENES[p['id']+'-ko'];draw_scene(c,scene,43,159,W-86,H)
  y=159+scene['height']*(W-86)/1000+28
  notes={
   'display':['팀 시스템: CCTV 메타데이터 → 서버 위험 판단 → STM32 경고 출력','본인 담당: UART 프로토콜·수신 FSM·CRC16·HUB75 제어','후속 확장: TIM1 트리거·DMA 전송·멀티버퍼 상태 관리'],
   'linux':['통신 계층: TCP 요청과 응답, 클라이언트별 스레드 처리','모듈 계층: 장치별 공유 라이브러리와 동적 함수 연결','장치 계층: wiringPi 기반 GPIO 제어 및 부저 재생 스레드'],
   'integration':['명령 흐름: 모델의 토크·목표 속도를 장비 제어 입력으로 연결','피드백 흐름: 실제 토크 측정값을 모델 입력에 반영','본인 기여: 신호 매핑·단위 정합·상태 초기화·통합 결과 분석'],
   'pipeline':['이미지 경로: GPU RGB를 nvJPEG로 인코딩하고 센서 cycleNumber로 파일명 생성','라벨 경로: 3D 객체를 2D로 투영하고 SimCore.Time 기반 프레임 인덱스 적용','동기화 기준: 물리 계산·이미지 저장 시점의 차이를 보정해 프레임 대응 정렬']
  }
  text('구성도에서 확인할 핵심 역량',43,y,12,'KRB',GREEN);y+=30
  for note in notes[p['id']]:y=bullet(note,y)
  if y>H-60:raise RuntimeError('Architecture overflow')
  c.showPage()

base(PROFILE_PAGE,'PROFILE / CONTACT')
text('경험의 기반',43,76,25,'KRB')
text('경력 · 교육',43,135,12,'KRB',GREEN)
y=164
for title,date,items in [
 ('IPG Automotive Korea','2025.12 - 현재',[
 'Application팀 연구원 (HIL / ADAS)',
 'C 제어 로직·실시간 신호 매핑·HW/SW 통합 검증',
 '시뮬레이션 플랫폼 업그레이드 및 현장 기술지원']),
 ('Vision’s Edge Device Academy','2025.03 - 2025.08',[
 '임베디드 Linux·디바이스 드라이버·ARM·Buildroot·Yocto 교육 이수',
 '한화비전 최종 프로젝트 최우수상(1위) 및 우수 훈련생상']),
 ('강원대학교 전기전자공학과','2018.03 - 2025.02',[
 '졸업 · 학점 3.55 / 4.5 · 전공 3.64 / 4.5',
 '학부연구생 (2024.03 - 12): 센서 퓨전 연구용 데이터 처리'])]:
 text(title,43,y,12,'KRB');text(date,390,y+3,8,'KR',MUTED);y+=27
 for s in items:y=bullet(s,y)
 y+=14
line(y);y+=21;text('자격 · 어학',43,y,12,'KRB',GREEN);y+=29
for s in [DATA['informationProcessingCertificate'][0],'ISTQB CTFL · 2026.06 취득','TOEIC Speaking IH · 2025.09 / TOEIC 820 · 2025.01']:y=bullet(s,y)
y+=16
rect(43,y,W-86,69,INK);text('LET’S CONNECT',58,y+11,8,'KRB',HexColor('#b3cdbd'));text(DATA['email'],58,y+32,12,'KR',BG);text('github.com/gitgio99',344,y+36,9,'KR',BG)
c.linkURL('mailto:'+DATA['email'],(58,H-y-55,300,H-y-30),relative=0);c.linkURL(DATA['github'],(340,H-y-55,545,H-y-30),relative=0)
if y+69>H-60:raise RuntimeError('Profile overflow')
c.showPage()
base(AWARDS_PAGE,'AWARDS')
text('수상 기록',43,77,25,'KRB')
text('기술 구현 · 협업 · 학습 성과',43,122,11,'KR',MUTED)
y=163
for a in DATA['awards']:
 text(a['date']+'  /  '+a['issuer'][0],43,y,8,'KR',MUTED)
 text(a['title'][0],43,y+20,12,'KRB')
 para(escape(a['topic'][0]),43,y+44,W-86,9.6,15)
 para(escape(a['description'][0]),43,y+65,W-86,9.6,15.2,MUTED)
 line(y+102);y+=122
if y>H-60:raise RuntimeError('Awards overflow')
c.showPage();c.save();print(OUT)

