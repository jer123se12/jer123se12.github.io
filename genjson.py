import os
import json

def path_to_dict(path):
    d={} 
    if os.path.isdir(path):
        d[os.path.basename(path)] = {k: v for d in [path_to_dict(os.path.join(path,x)) for x in os.listdir\
(path)]for k, v in d.items()}
    else:
        tempname=input("name for '" +os.path.basename(path)+"' : ")
        if tempname=="":
            tempname=os.path.basename(path)
        d[tempname] = os.path.basename(path)
    return d

with open("filesystem.js",'w')as f:
    f.write("let filesystem="+json.dumps(path_to_dict('./root')['root']))
