import os

def calculate_levenshtein_distance(input):
    print(input)
    with open("checker/text1.txt", "w") as text1:
        text1.write(input['text1'])
    with open("checker/text2.txt", "w") as text2:
        text2.write(input['text2'])
    with open("checker/settings", "w") as settings:
        settings.write(input['swap-cost'] + '\n')
        settings.write(input['delete-cost'] + '\n')
        settings.write(input['insert-cost'] + '\n')
        
    os.system('checker\levenshtein_distance.exe')
    