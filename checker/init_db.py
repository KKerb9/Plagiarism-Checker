import sqlite3

connection = sqlite3.connect('checker/levenshtein_distance_database.db')


with open('checker/schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO dist (text1, text2, distance_0, distance_1, distance_2, distance_3) VALUES (?, ?, ?, ?, ?, ?)",
            ('aboba\n', 'abob\n', 1, 1, 1, 1)
            )

connection.commit()
connection.close()