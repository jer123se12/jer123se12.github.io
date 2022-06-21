from os import walk
mypath="root"
f = []
for (dirpath, dirnames, filenames) in walk(mypath):
    print(dirpath,dirnames,filenames)
