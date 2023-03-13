import re

def verificaSenha(senha):
    if (len(senha)<8): 
        return False
    elif not re.search("[a-z]", senha): 
        return False
    elif not re.search("[A-Z]", senha): 
        return False
    elif not re.search("[0-9]", senha): 
        return False
    elif not re.search("['!.@#$%¨&*(_+§¬¢£|°ºª^~]", senha): 
        return False
    elif re.search("\s", senha): 
        return False
    else: 
        return True