import sqlite3

def read_txt_file(file_path):
    users_info = []
    user_info = {}
    with open(file_path, 'r', encoding='utf-8') as file:
        for line in file:
            line = line.strip()
            if line.startswith("Caducidad Membresía:"):
                user_info['Caducidad Membresía'] = line.split(":", 1)[1].strip()
            elif line.startswith("Cédula:"):
                user_info['Cédula'] = line.split(":", 1)[1].strip()
            elif line.startswith("Nombre:"):
                user_info['Nombre'] = line.split(":", 1)[1].strip()
            elif line.startswith("Apellido:"):
                user_info['Apellido'] = line.split(":", 1)[1].strip()
            elif line.startswith("Fecha Nacimiento:"):
                user_info['Fecha Nacimiento'] = line.split(":", 1)[1].strip()
            elif line.startswith("Contacto Emeergencia:"):
                user_info['Contacto Emergencia'] = line.split(":", 1)[1].strip()
            elif line.startswith("Teléfono:"):
                user_info['Teléfono'] = line.split(":", 1)[1].strip()
            elif line.startswith("Tipo plan:"):
                user_info['Tipo plan'] = line.split(":", 1)[1].strip()
            elif not line and user_info:
                # Add user to list if there's an empty line
                users_info.append(user_info)
                user_info = {}
        if user_info:
            users_info.append(user_info)  # Append the last user info if any
    return users_info

def get_db_value(db_path, cedula):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT membership_expiration FROM users_user WHERE national_id = ?", (cedula,))
    result = cursor.fetchone()
    conn.close()
    return result[0] if result else None

def update_db_value(db_path, cedula, new_value):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("UPDATE users_user SET membership_expiration = ? WHERE national_id = ?", (new_value, cedula))
    conn.commit()
    conn.close()

def add_user_to_db(db_path, user_info):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO users_user (last_login, national_id, first_name, last_name, emergency_contact, phone_number, active, membership_expiration, password, is_active, is_admin, plan_type) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        None,  # Assuming last_login is None
        user_info.get('Cédula', ''),
        user_info.get('Nombre', ''),
        user_info.get('Apellido', ''),
        user_info.get('Contacto Emergencia', ''),
        user_info.get('Teléfono', ''),
        1,  # Assuming active is 1 (true)
        user_info.get('Caducidad Membresía', ''),
        '',  # Assuming password is empty or set to a default value
        1,  # Assuming is_active is 1 (true)
        0,  # Assuming is_admin is 0 (false)
        user_info.get('Tipo plan', '')
    ))
    conn.commit()
    conn.close()

def main():
    txt_file_path = 'gym info.txt'
    db_path = 'db.sqlite3'
    
    users_info = read_txt_file(txt_file_path)
    print(f"Users info extracted: {users_info}")  # Debug statement
    
    for user_info in users_info:
        if 'Cédula' in user_info and 'Caducidad Membresía' in user_info and user_info['Caducidad Membresía']:
            cedula = user_info['Cédula']
            caducidad_txt = user_info['Caducidad Membresía']
            caducidad_db = get_db_value(db_path, cedula)
            
            if caducidad_db:
                if caducidad_db != caducidad_txt:
                    print(f"Updating Caducidad Membresía for Cédula {cedula} from {caducidad_db} to {caducidad_txt}")
                    update_db_value(db_path, cedula, caducidad_txt)
                else:
                    print(f"No update necessary for Cédula {cedula}. Caducidad Membresía is up-to-date.")
            else:
                print(f"Adding new user with Cédula {cedula}")
                add_user_to_db(db_path, user_info)
        else:
            print("Cédula or Caducidad Membresía field not found or is empty in the text file for a user.")

if __name__ == "__main__":
    main()
