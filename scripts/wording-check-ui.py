from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from threading import Thread
from playwright.sync_api import sync_playwright,expect
import subprocess,json,os,re
r=Path(__file__).resolve().parent;b=r.parent
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
class Server(ThreadingHTTPServer):request_queue_size=64
servers={};checks=[]
for name,directory in [('projectlens',b/'ProjectLens/docs'),('policylens',b/'iam-policy-auditor/site'),('rag',b/'rag-retrieval-gate/web')]:
 s=Server(('127.0.0.1',0),partial(Quiet,directory=str(directory)));Thread(target=s.serve_forever,daemon=True).start();servers[name]=s
origins={n:f'http://127.0.0.1:{s.server_port}'for n,s in servers.items()};(r/'captures').mkdir(exist_ok=True)
try:
 env={**os.environ,'PROJECTLENS_CAPTURE_URL':origins['projectlens']+'/change-assurance.html','POLICYLENS_CAPTURE_URL':origins['policylens']+'/','RAG_CAPTURE_URL':origins['rag']+'/'}
 subprocess.run(['node','scripts/capture-project-evidence.mjs','2026-10-24','terms'],cwd=b/'portfolio',env=env,check=True)
 with sync_playwright()as p:
  browser=p.chromium.launch()
  for size,width,height in [('desktop',1280,800),('phone',375,812)]:
   page=browser.new_page(viewport={'width':width,'height':height},reduced_motion='reduce')
   for name,path in [('projectlens','/change-assurance.html'),('policylens','/'),('rag','/')]:
    page.goto(origins[name]+path);page.evaluate('document.fonts.ready')
    if name=='projectlens':
     expect(page.locator('#example-finish')).to_be_enabled();faq=page.get_by_text('Does a flagged change mean the project is delayed?',exact=True);expect(faq.locator('..')).not_to_have_attribute('open','');faq.click();expect(faq.locator('..')).to_contain_text('difference that needs review');faq.click()
     hero=page.locator('.product-hero')
    elif name=='policylens':
     expect(page.locator('#demoAfter')).to_have_text('Allow');e=page.locator('#demoEvidence');expect(e).not_to_have_attribute('open','');e.locator('summary').click();expect(e).to_contain_text('does not grant this request');e.locator('summary').click()
     page.get_by_role('button',name='Check correction',exact=True).click();page.locator('#verifyDemoCorrection').click();expect(page.locator('#demoVerification')).to_contain_text('These checks cover the listed requests');expect(page.locator('.verification-evidence')).not_to_have_attribute('open','')
     page.locator('#chapterRisk').click();hero=page.locator('.landing-intro')
    else:
     expect(page.locator('#switch-result')).to_be_enabled();expect(page.locator('.source-state.superseded')).to_have_text(['Unapproved proposal','Unapproved proposal'])
     faq=page.get_by_text('What does this test tell us?',exact=True);expect(faq.locator('..')).not_to_have_attribute('open','');faq.click();expect(faq.locator('..')).to_contain_text('retrieval-augmented generation');faq.click()
     page.get_by_label('Choose a staff question').select_option('3');expect(page.locator('.source-state.superseded')).to_have_text(['Ended pilot','Ended pilot']);page.get_by_label('Choose a staff question').select_option('2');hero=page.locator('.intro')
    page.evaluate('scrollTo(0,0)');page.screenshot(path=str(r/'captures'/f'{name}-{size}.png'))
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth + 1'),(name,size,'overflow')
    # No extra introduction sections or paragraphs were added; explanations stay in disclosures/results.
    count=hero.locator('p').count();assert count== (1 if name=='rag' else 2),(name,count)
    evidence=page.get_by_role('link',name='Technical evidence' if name!='rag' else 'Technical evidence and reproducible tests',exact=True);assert evidence.get_attribute('href').endswith('#results')
    checks.append({'product':name,'size':size,'intro_paragraphs':count,'definitions_disclosed_on_demand':True,'evidence_link':True,'no_overflow':True})
   page.close()
  browser.close()
finally:
 for s in servers.values():s.shutdown();s.server_close()
(r/'ui-checks.json').write_text(json.dumps(checks,indent=2)+'\n');print('PASS: six term/scope journeys, collapsed help, unchanged intro counts, evidence links and widths.')
