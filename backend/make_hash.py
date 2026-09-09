"""Generate ADMIN_PASSWORD_HASH.  Usage:  python make_hash.py 'your password'"""

import sys

import bcrypt

if len(sys.argv) != 2:
    sys.exit("usage: python make_hash.py 'your password'")

print(bcrypt.hashpw(sys.argv[1].encode(), bcrypt.gensalt()).decode())
