from reportlab.lib.colors import HexColor
def draw_scene(c,scene,x,y,width,page_height):
 """Place vector geometry using a top-left origin."""
 scale=width/scene['width'];c.saveState();c.translate(x,page_height-y);c.scale(scale,scale)
 c.setFillColor(HexColor('#ffffff'));c.rect(0,-scene['height'],scene['width'],scene['height'],fill=1,stroke=0)
 for e in scene['items']:
  k=e['kind']
  if k=='text':
   c.setFillColor(HexColor(e['color']));c.setFont('KRB' if e['bold'] else 'KR',e['size']);c.drawString(e['x'],-e['y'],e['text'])
  elif k=='rect':
   c.setFillColor(HexColor(e['fill']));c.setStrokeColor(HexColor(e['stroke']));c.setLineWidth(1.5);c.setDash();c.roundRect(e['x'],-e['y']-e['h'],e['w'],e['h'],e['r'],fill=1,stroke=1)
  else:
   p=c.beginPath();p.moveTo(e['pts'][0][0],-e['pts'][0][1])
   for a,b in e['pts'][1:]:p.lineTo(a,-b)
   c.setStrokeColor(HexColor(e['color']));c.setFillColor(HexColor(e['color']));c.setLineWidth(2.5)
   if k=='polygon':p.close();c.drawPath(p,fill=1,stroke=0)
   else:c.setDash([7,5] if e['dashed'] else []);c.drawPath(p,fill=0,stroke=1)
 c.restoreState()
