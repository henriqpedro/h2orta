import pandas as pd
import numpy as np
import mysql.connector

def database_insert(row, cursor):
    insert_query = '''
    INSERT INTO planta (deletado, descricao, familia, habitat, imagem, max_altura, max_temperatura, max_umidade, min_altura, min_temperatura, min_umidade, nome)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    '''
    try:    
          data_to_insert = (
               False,
               row.get("Descrição", None),
               row.get("Família", None),
               row.get("Biomas", None),
               f"https://drive.google.com/thumbnail?id={row.get('ID Drive', '')}",
               row.get("Altura Máxima", None),
               row.get("T° Máxima", None),
               row.get("max_umidade", None),
               row.get("Altura mínima", None),
               row.get("T° Mínima", None),
               row.get("min_umidade", None),
               row.get("Nome da Planta", None)
          )

          cursor.execute(insert_query, data_to_insert)

          print(f'{row["Nome da Planta"]} inserida com sucesso')
    except Exception as e:
        print(f'Não foi possível inserir a planta {row["Nome da Planta"]}: {e}')
        

database_connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="h2orta"
)
cursor = database_connection.cursor()

data = pd.read_excel("./Plantas.xlsx")
columns = data.columns
rows = len(data.index)

for i in range(rows):
    new_json = {}
    for col in columns:
        value = data.at[i, col]
        if col == "Umidade Ideal":
            match value:
                case "Baixa": 
                    new_json["max_umidade"] = 30
                    new_json["min_umidade"] = 0
                case "Moderada": 
                    new_json["max_umidade"] = 60
                    new_json["min_umidade"] = 30
                case "Alta": 
                    new_json["max_umidade"] = 100
                    new_json["min_umidade"] = 60
                case "Baixa a moderada": 
                    new_json["max_umidade"] = 40
                    new_json["min_umidade"] = 20
                case "Moderada a alta": 
                    new_json["max_umidade"] = 80
                    new_json["min_umidade"] = 40
        elif isinstance(value, np.int64):
            new_json[col] = int(value)
        elif isinstance(value, np.float64):
            new_json[col] = float(value)
        else:
            new_json[col] = value


    database_insert(new_json, cursor)
    database_connection.commit()

cursor.close()
database_connection.close()

print("Inserção concluída com sucesso!")
