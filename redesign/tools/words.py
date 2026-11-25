import sys
from collections import Counter
NAME = Counter('patrickbranigan')
ok = lambda w: not (Counter(w) - NAME)
curated = """act air ant apt arc ark art bag ban bar bat big bin bit bra cab can cap car cat gab gap gin git gnat
grr ink inn irk kin kit nab nag nap nib nip pan par pat pig pin pit rag ran rap rat rib rig rip tab tag tan tap tar tic tin tip pic npc gta png cig
agar akin anti aria back bait bang bank bark barn bran brag brat brig brit cant carp cart crab crag crap crib gain gait garb grab grin grip grit
king knit naan nick pack pact pain pair pang pant park part pick pita ping pink pint prat rack rain rang rank rant rapt ring rink tack tang tank tarp
tick tiki ting trap trig trip nana kart pica rani
aback again antic apart batik brain briar brick bring brink cabin cairn carat cigar crank giant grain grant icing inapt pagan paint panic parka prank
prick print taiga tapir tiara tibia track train trick karat naira pinta atari
acting airing angina arcana arnica arcing baking banana baring biting cabana catkin catnip napkin nitric patina paring pining racing raking rating
taking tannic tiring tragic pacing caring bating pinata niacin baiting
arabica arraign backing banking bargain barking barrack barring bracing cantina canting captain ingrain kingpin paining panting parking racking ranting
tacking ticking tracing carping tanking ranking parting carting tarring pairing raining karting inking pricing pinking
cranking pranking tricking bricking pricking painting printing training prancing brainpan cinnabar agrarian patrick branigan""".split()
bad = set('nig bint raping rape'.split())
raw = set()
for p in ['/usr/share/dict/words', '/usr/share/dict/web2a']:
    for w in open(p, errors='ignore'):
        w = w.strip()
        if w.isalpha() and w.islower() and len(w) >= 4 and ok(w): raw.add(w)
miss = [w for w in curated if not ok(w)]
print('curated words not spellable (dropped):', miss)
words = sorted((set(w for w in curated if ok(w)) | raw) - bad)
open(sys.argv[1], 'w').write(' '.join(words))
print(len(words), 'words,', sum(map(len, words)) + len(words), 'bytes')
fx = 'rain banana brick panic train paint nap big ink prank trick king art bargain pink nag atari grain bang crap prick'.split()
print('effect words missing:', [w for w in fx if w not in words])
