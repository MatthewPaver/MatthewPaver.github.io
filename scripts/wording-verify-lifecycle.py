from pathlib import Path
import subprocess,json
r=Path(__file__).resolve().parent;b=r.parent;results=[]
def run(name,cmd,repo=None):
 with (r/(name+'.log')).open('w')as f:p=subprocess.run(cmd,cwd=(b/repo if repo else b.parent),stdout=f,stderr=subprocess.STDOUT)
 results.append({'check':name,'exit':p.returncode});(r/'local-checks.json').write_text(json.dumps(results,indent=2)+'\n');print(name,p.returncode,flush=True)
 if p.returncode:raise SystemExit(p.returncode)
run('policy-build',['npm','run','build:demo'],'iam-policy-auditor')
run('ui-and-captures',[str(b/'browser-venv/bin/python'),str(r/'check-ui.py')])
run('portfolio-verify',['npm','run','verify'],'portfolio')
run('policy-static',['npx','playwright','test','-c','playwright.static.config.js'],'iam-policy-auditor')
run('projectlens-browser',[str(b/'browser-venv/bin/python'),'scripts/run_browser_tests.py'],'ProjectLens')
